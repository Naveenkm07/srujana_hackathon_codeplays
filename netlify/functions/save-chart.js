exports.handler = async function(event){
  try{
    const body = JSON.parse(event.body || '{}');
    const { title, description, chartSpec, querySpec } = body;
    
    // Validate required fields
    if (!title || !chartSpec) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Title and chartSpec are required' })
      };
    }
    
    // In production, this would:
    // 1. Authenticate user
    // 2. Sanitize input data
    // 3. Save to database
    // 4. Return saved chart ID
    
    // For demo, simulate successful save
    const savedChart = {
      id: Date.now(), // Simple ID generation
      title: title.trim(),
      description: description?.trim() || '',
      chart_type: chartSpec.type,
      chart_spec: chartSpec,
      query_spec: querySpec,
      created_at: new Date().toISOString(),
      user_id: 1 // Demo user ID
    };
    
    // Log the save operation (in production, save to database)
    console.log('Chart saved:', savedChart);
    
    return { 
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ 
        success: true, 
        chartId: savedChart.id,
        message: 'Chart saved successfully'
      }) 
    };
  }catch(err){ 
    console.error('Save chart error:', err);
    return { 
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to save chart: ' + err.message }) 
    };
  }
}
