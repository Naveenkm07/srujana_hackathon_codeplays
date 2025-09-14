import React, { useState } from 'react';

export default function ChatPanel({ onChartGenerated }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Mock AI response for local development
  const mockAiChatResponse = async (message) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const lowerMessage = message.toLowerCase();
    
    let chartSpec = null;
    let querySpec = null;
    let response = '';

    if (lowerMessage.includes('subject') || lowerMessage.includes('performance') || lowerMessage.includes('score')) {
      chartSpec = {
        type: 'bar',
        title: 'Student Performance by Subject',
        xKey: 'subject',
        yKey: 'avg_score',
        color: '#3498db'
      };
      querySpec = {
        type: 'bar',
        xKey: 'subject',
        yKey: 'avg_score',
        query_params: {}
      };
      response = "I've created a bar chart showing student performance across programming subjects. Python leads with 85%, Java at 82%.";
    } else if (lowerMessage.includes('time') || lowerMessage.includes('trend') || lowerMessage.includes('attendance')) {
      chartSpec = {
        type: 'line',
        title: 'Attendance Trends Over Time',
        xKey: 'month',
        yKey: 'attendance_pct',
        color: '#27ae60'
      };
      querySpec = {
        type: 'line',
        xKey: 'month',
        yKey: 'attendance_pct',
        query_params: {}
      };
      response = "Here's a line chart showing attendance trends. There was a dip in September but it's recovering well.";
    } else if (lowerMessage.includes('compare') || lowerMessage.includes('class')) {
      chartSpec = {
        type: 'area',
        title: 'Class Performance Comparison',
        xKey: 'week',
        yKey: 'performance',
        color: '#e74c3c'
      };
      querySpec = {
        type: 'area',
        xKey: 'week',
        yKey: 'performance',
        query_params: {}
      };
      response = "This area chart compares class performance over recent weeks. Steady improvement across all modules.";
    } else {
      response = `I can help you create charts! Try asking for:\n\n• "Show student performance by subject"\n• "Display attendance trends over time"\n• "Compare class performance"\n\nWhat would you like to visualize?`;
    }

    return {
      chartSpec,
      querySpec,
      response,
      explanation: chartSpec ? `This chart shows ${chartSpec.title.toLowerCase()} with ${chartSpec.type} visualization.` : null
    };
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    
    try {
      // Use local mock for development since Netlify functions aren't available
      const data = await mockAiChatResponse(userMessage);
      
      if (data.chartSpec) {
        onChartGenerated(data.chartSpec, data.querySpec, data.explanation);
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.response || 'Chart generated successfully!'
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h3>Ask about your data</h3>
        <p>Try: "Show student progress by subject" or "Compare attendance trends"</p>
      </div>
      
      <div className="conv">
        {messages.length === 0 && (
          <div className="msg assistant">
            <div className="msg-content">
              👋 Hi! I can help you create charts from your data. Ask me questions like:
              <ul>
                <li>"Show average scores by subject"</li>
                <li>"Display attendance trends over time"</li>
                <li>"Compare performance across classes"</li>
              </ul>
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <div className="msg-content">{m.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="msg assistant loading">
            <div className="msg-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              Generating chart...
            </div>
          </div>
        )}
      </div>
      
      <form className="input-row" onSubmit={handleSubmit}>
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask: Show student performance by subject" 
          disabled={isLoading}
        />
        <button type="submit" disabled={!input.trim() || isLoading}>
          {isLoading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
