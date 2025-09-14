exports.handler = async function(event) {
  try{
    const body = JSON.parse(event.body || '{}');
    const message = body.message;
    
    // TODO: Replace with actual OpenAI API call
    // For now, return demo responses based on message content
    const demoResponse = generateDemoResponse(message);
    
    return { 
      statusCode: 200, 
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify(demoResponse) 
    };
  }catch(err){
    return { 
      statusCode: 500, 
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: err.message }) 
    };
  }
}

function generateDemoResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Student progress/performance queries
  if (lowerMessage.includes('progress') || lowerMessage.includes('performance') || lowerMessage.includes('marks') || lowerMessage.includes('scores')) {
    return {
      chart_spec: {
        type: 'bar',
        xKey: 'subject', 
        yKey: 'avg_score',
        title: 'Average Scores by Subject',
        query_params: { 
          start_date: '2025-01-01', 
          end_date: '2025-12-31',
          class_id: 'all'
        }
      },
      data: [
        { subject: 'Python', avg_score: 85 },
        { subject: 'JavaScript', avg_score: 78 },
        { subject: 'Java', avg_score: 82 },
        { subject: 'C++', avg_score: 79 },
        { subject: 'React', avg_score: 76 },
        { subject: 'Node.js', avg_score: 81 }
      ],
      explanation: 'This chart shows the average scores across different programming subjects. Python has the highest average score at 85%, while React has the lowest at 76%.',
      raw_data: { query_spec: { table: 'student_results', filters: ['subject', 'date_range'] } }
    };
  }
  
  // Attendance queries
  if (lowerMessage.includes('attendance') || lowerMessage.includes('present')) {
    return {
      chart_spec: {
        type: 'line',
        xKey: 'month',
        yKey: 'attendance_pct',
        title: 'Attendance Trend Over Time',
        query_params: {
          start_date: '2025-06-01',
          end_date: '2025-12-31'
        }
      },
      data: [
        { month: 'Jun', attendance_pct: 92 },
        { month: 'Jul', attendance_pct: 88 },
        { month: 'Aug', attendance_pct: 90 },
        { month: 'Sep', attendance_pct: 85 },
        { month: 'Oct', attendance_pct: 87 },
        { month: 'Nov', attendance_pct: 89 }
      ],
      explanation: 'Student attendance percentage by month. There was a slight dip in September (85%) but it recovered in subsequent months.',
      raw_data: { query_spec: { table: 'attendance', aggregation: 'monthly' } }
    };
  }
  
  // Time/activity queries
  if (lowerMessage.includes('time') || lowerMessage.includes('activity') || lowerMessage.includes('hours')) {
    return {
      chart_spec: {
        type: 'area',
        xKey: 'day',
        yKey: 'study_hours',
        title: 'Daily Study Hours',
        query_params: {
          period: 'last_week'
        }
      },
      data: [
        { day: 'Mon', study_hours: 3.5 },
        { day: 'Tue', study_hours: 2.8 },
        { day: 'Wed', study_hours: 4.2 },
        { day: 'Thu', study_hours: 3.1 },
        { day: 'Fri', study_hours: 2.9 },
        { day: 'Sat', study_hours: 5.1 },
        { day: 'Sun', study_hours: 4.7 }
      ],
      explanation: 'Daily study hours over the past week. Weekend shows higher engagement with 5+ hours on Saturday.',
      raw_data: { query_spec: { table: 'study_sessions', timeframe: 'daily' } }
    };
  }
  
  // Grade distribution
  if (lowerMessage.includes('grade') || lowerMessage.includes('distribution')) {
    return {
      chart_spec: {
        type: 'pie',
        xKey: 'grade',
        yKey: 'count',
        title: 'Grade Distribution',
        query_params: {
          subject: 'all'
        }
      },
      data: [
        { grade: 'A', count: 25 },
        { grade: 'B', count: 35 },
        { grade: 'C', count: 20 },
        { grade: 'D', count: 12 },
        { grade: 'F', count: 8 }
      ],
      explanation: 'Distribution of grades across all subjects. 60% of students achieved A or B grades.',
      raw_data: { query_spec: { table: 'grades', groupBy: 'grade' } }
    };
  }
  
  // Default response
  return {
    chart_spec: {
      type: 'bar',
      xKey: 'category',
      yKey: 'value',
      title: 'Sample Data Visualization',
      query_params: {}
    },
    data: [
      { category: 'Category A', value: 45 },
      { category: 'Category B', value: 62 },
      { category: 'Category C', value: 38 },
      { category: 'Category D', value: 71 }
    ],
    explanation: `I've generated a sample chart based on your query: "${message}". For more specific results, try queries like "show student progress by subject" or "display attendance trends".`,
    raw_data: { query_spec: { table: 'demo_data' } }
  };
}
