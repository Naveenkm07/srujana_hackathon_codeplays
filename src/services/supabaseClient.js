import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://demo-project.supabase.co'
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Demo mode check
export const isDemo = !process.env.REACT_APP_SUPABASE_URL

// Learning Modules Service
export class LearningService {
  // Get all subjects
  static async getSubjects() {
    if (isDemo) {
      return {
        data: [
          { id: 1, name: 'Mathematics', icon: '🔢', modules: 12, difficulty: 'Intermediate' },
          { id: 2, name: 'Science', icon: '🧪', modules: 10, difficulty: 'Beginner' },
          { id: 3, name: 'English', icon: '📚', modules: 8, difficulty: 'Advanced' },
          { id: 4, name: 'History', icon: '🏛️', modules: 6, difficulty: 'Intermediate' }
        ],
        error: null
      }
    }

    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('name')

    return { data, error }
  }

  // Get user progress
  static async getUserProgress(userId) {
    if (isDemo) {
      return {
        data: {
          'Mathematics': 65,
          'Science': 40,
          'English': 80,
          'History': 25
        },
        error: null
      }
    }

    const { data, error } = await supabase
      .from('user_progress')
      .select('subject_name, progress_percentage')
      .eq('user_id', userId)

    if (error) return { data: null, error }

    const progressMap = {}
    data.forEach(item => {
      progressMap[item.subject_name] = item.progress_percentage
    })

    return { data: progressMap, error: null }
  }

  // Get lessons for a subject
  static async getLessons(subjectId) {
    if (isDemo) {
      return {
        data: [
          { id: 1, title: 'Introduction & Basics', status: 'completed', duration: 20 },
          { id: 2, title: 'Core Concepts', status: 'completed', duration: 25 },
          { id: 3, title: 'Practice Problems', status: 'in-progress', duration: 30 },
          { id: 4, title: 'Advanced Topics', status: 'locked', duration: 35 },
          { id: 5, title: 'Final Assessment', status: 'locked', duration: 40 }
        ],
        error: null
      }
    }

    const { data, error } = await supabase
      .from('lessons')
      .select('*')
      .eq('subject_id', subjectId)
      .order('order_index')

    return { data, error }
  }

  // Update lesson progress
  static async updateLessonProgress(userId, lessonId, status) {
    if (isDemo) {
      console.log('Demo: Updated lesson progress', { userId, lessonId, status })
      return { data: true, error: null }
    }

    const { data, error } = await supabase
      .from('lesson_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        status,
        updated_at: new Date().toISOString()
      })

    return { data, error }
  }

  // Update user progress
  static async updateUserProgress(userId, lessonId, progress) {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        lesson_id: lessonId,
        progress_percentage: progress,
        completed: progress >= 100,
        completed_at: progress >= 100 ? new Date().toISOString() : null
      });

    if (error) throw error;
    return data;
  }

  // Admin functions
  static async getAllUsers() {
    if (isDemo) {
      // Return demo users in demo mode
      return [
        {
          id: 'demo-user-1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'student',
          grade: '10',
          class: 'A',
          phone: '9876543210',
          school: 'Demo High School',
          status: 'active',
          last_login: new Date().toISOString(),
          login_count: 5,
          total_lessons_completed: 12,
          total_time_spent: 240,
          performance_score: 85,
          created_at: new Date().toISOString()
        }
      ];
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase getAllUsers error:', error);
        throw error;
      }
      
      console.log('Real users data from Supabase:', data);
      return data || [];
    } catch (error) {
      console.error('Failed to fetch users from Supabase:', error);
      throw error;
    }
  }

  static async getAllLessons() {
    const { data, error } = await supabase
      .from('lessons')
      .select('*, subjects(name)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }

  static async updateUserRole(userId, role) {
    const { data, error } = await supabase
      .from('users')
      .update({ role: role })
      .eq('id', userId);
    
    if (error) throw error;
    return data;
  }

  static async deleteUser(userId) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', userId);
    
    if (error) throw error;
  }

  static async createSubject(subject) {
    const { data, error } = await supabase
      .from('subjects')
      .insert(subject);
    
    if (error) throw error;
    return data;
  }

  static async updateSubject(id, updates) {
    const { data, error } = await supabase
      .from('subjects')
      .update(updates)
      .eq('id', id);
    
    if (error) throw error;
    return data;
  }

  static async deleteSubject(id) {
    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }

  static async getUserByEmail(email) {
    if (isDemo) {
      return null; // No existing users in demo mode
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 = not found
        console.error('getUserByEmail error:', error);
        throw error;
      }
      
      return data;
    } catch (error) {
      console.error('Failed to get user by email:', error);
      return null;
    }
  }

  static async createUser(userData) {
    if (isDemo) {
      const user = { id: 'demo-user', ...userData };
      return user;
    }

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([userData])
        .select()
        .single();
      
      if (error) {
        console.error('createUser error:', error);
        throw error;
      }
      
      console.log('Created new user:', data);
      return data;
    } catch (error) {
      console.error('Failed to create user:', error);
      throw error;
    }
  }

  static async updateUserLastLogin(userId) {
    if (isDemo) {
      return;
    }

    try {
      const { error } = await supabase
        .from('users')
        .update({ 
          last_login: new Date().toISOString(),
          login_count: supabase.raw('login_count + 1')
        })
        .eq('id', userId);
      
      if (error) {
        console.error('updateUserLastLogin error:', error);
      }
    } catch (error) {
      console.error('Failed to update user last login:', error);
    }
  }

  // User Authentication Service
  static async signUp(email, password, userData) {
    if (isDemo) {
      const user = { id: 'demo-user', email, ...userData }
      localStorage.setItem('supabase-demo-user', JSON.stringify(user))
      return { data: { user }, error: null }
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })

    return { data, error }
  }

  static async signIn(email, password) {
    if (isDemo) {
      const demoUsers = {
        'admin@smarttutor.com': { id: 'admin', email, role: 'admin', name: 'Admin User' },
        'teacher@smarttutor.com': { id: 'teacher', email, role: 'teacher', name: 'Sarah Johnson' },
        'student@smarttutor.com': { id: 'student', email, role: 'student', name: 'John Student' }
      }
      
      if (demoUsers[email] && password.length >= 6) {
        const user = demoUsers[email]
        localStorage.setItem('supabase-demo-user', JSON.stringify(user))
        return { data: { user }, error: null }
      }
      
      return { data: null, error: { message: 'Invalid credentials' } }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    return { data, error }
  }

  static async signOut() {
    if (isDemo) {
      localStorage.removeItem('supabase-demo-user')
      return { error: null }
    }

    const { error } = await supabase.auth.signOut()
    return { error }
  }

  static async getCurrentUser() {
    if (isDemo) {
      const user = localStorage.getItem('supabase-demo-user')
      return { data: { user: user ? JSON.parse(user) : null }, error: null }
    }

    const { data, error } = await supabase.auth.getUser()
    return { data, error }
  }
}
