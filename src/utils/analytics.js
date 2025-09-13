// Analytics and performance tracking utilities

export class AnalyticsService {
  static trackEvent(event, properties = {}) {
    // In a real app, this would send to analytics service like Google Analytics
    console.log('Analytics Event:', event, properties);
    
    // Store locally for demo purposes
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push({
      event,
      properties,
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId()
    });
    
    // Keep only last 1000 events
    if (events.length > 1000) {
      events.splice(0, events.length - 1000);
    }
    
    localStorage.setItem('analytics_events', JSON.stringify(events));
  }

  static trackLearningProgress(userId, subject, lesson, action) {
    this.trackEvent('learning_progress', {
      userId,
      subject,
      lesson,
      action, // 'started', 'completed', 'skipped'
      timestamp: Date.now()
    });
  }

  static trackQuizAttempt(userId, quizId, score, timeSpent) {
    this.trackEvent('quiz_attempt', {
      userId,
      quizId,
      score,
      timeSpent,
      timestamp: Date.now()
    });
  }

  static trackUserEngagement(action, context = {}) {
    this.trackEvent('user_engagement', {
      action, // 'login', 'logout', 'navigation', 'interaction'
      context,
      timestamp: Date.now()
    });
  }

  static getSessionId() {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  static getAnalytics() {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    
    // Basic analytics summary
    const summary = {
      totalEvents: events.length,
      uniqueSessions: new Set(events.map(e => e.sessionId)).size,
      eventTypes: {},
      recentActivity: events.slice(-50)
    };

    events.forEach(event => {
      summary.eventTypes[event.event] = (summary.eventTypes[event.event] || 0) + 1;
    });

    return summary;
  }

  static getLearningAnalytics(userId) {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const learningEvents = events.filter(e => 
      e.event === 'learning_progress' && e.properties.userId === userId
    );

    const analytics = {
      totalLessons: 0,
      completedLessons: 0,
      subjectProgress: {},
      timeSpent: 0,
      streakDays: 0
    };

    learningEvents.forEach(event => {
      const { subject, action } = event.properties;
      
      if (!analytics.subjectProgress[subject]) {
        analytics.subjectProgress[subject] = { started: 0, completed: 0 };
      }
      
      if (action === 'started') {
        analytics.totalLessons++;
        analytics.subjectProgress[subject].started++;
      } else if (action === 'completed') {
        analytics.completedLessons++;
        analytics.subjectProgress[subject].completed++;
      }
    });

    return analytics;
  }
}

// Performance monitoring
export class PerformanceMonitor {
  static measurePageLoad() {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType('navigation')[0];
      
      const metrics = {
        pageLoadTime: navigation.loadEventEnd - navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        firstPaint: 0,
        firstContentfulPaint: 0
      };

      // Get paint timings if available
      const paintEntries = performance.getEntriesByType('paint');
      paintEntries.forEach(entry => {
        if (entry.name === 'first-paint') {
          metrics.firstPaint = entry.startTime;
        } else if (entry.name === 'first-contentful-paint') {
          metrics.firstContentfulPaint = entry.startTime;
        }
      });

      AnalyticsService.trackEvent('performance', metrics);
      return metrics;
    }
    return null;
  }

  static measureComponentRender(componentName, renderTime) {
    AnalyticsService.trackEvent('component_performance', {
      component: componentName,
      renderTime,
      timestamp: Date.now()
    });
  }
}

// User behavior tracking
export class UserBehaviorTracker {
  static trackButtonClick(buttonName, context = {}) {
    AnalyticsService.trackEvent('button_click', {
      button: buttonName,
      ...context
    });
  }

  static trackPageView(pageName, timeSpent = 0) {
    AnalyticsService.trackEvent('page_view', {
      page: pageName,
      timeSpent,
      timestamp: Date.now()
    });
  }

  static trackSearchQuery(query, results = 0) {
    AnalyticsService.trackEvent('search', {
      query,
      results,
      timestamp: Date.now()
    });
  }

  static trackFormSubmission(formName, success = true, errors = []) {
    AnalyticsService.trackEvent('form_submission', {
      form: formName,
      success,
      errors,
      timestamp: Date.now()
    });
  }
}
