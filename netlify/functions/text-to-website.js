const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google AI
let genAI;

try {
  genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
} catch (error) {
  console.error('Error initializing Google AI:', error);
}

// Generate website from text using Gemini
async function generateWebsite(text) {
  try {
    console.log('Generating website from text:', text);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = `You are a web development expert. Create a complete, modern website based on this description: ${text}

Rules:
1. Return a complete HTML file with embedded CSS and JavaScript
2. Use modern design principles and a clean layout
3. Make it fully responsive for all devices
4. Include all necessary styles in <style> tag
5. Include all JavaScript in <script> tag
6. Use semantic HTML5 elements
7. Add smooth animations and transitions
8. Ensure the code is complete and ready to run
9. Include proper meta tags and viewport settings
10. Use modern CSS features like Flexbox or Grid
11. Add comments in the code for better understanding
12. Ensure all interactive elements work properly
13. Include a header with navigation
14. Add a footer with contact information
15. Make sure all sections are properly styled and responsive
16. Use beautiful color schemes and typography
17. Add hover effects and micro-interactions
18. Include placeholder content that matches the theme
19. Ensure accessibility with proper ARIA labels
20. Use CSS custom properties for consistent theming`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedCode = response.text();

    console.log('Successfully generated website code, length:', generatedCode.length);

    if (!generatedCode || generatedCode.trim() === '') {
      throw new Error('Generated code is empty');
    }

    return generatedCode;
  } catch (error) {
    console.error('Error generating website:', error);
    throw new Error('Failed to generate website: ' + error.message);
  }
}

// Main handler
exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'CORS preflight' })
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Check if required environment variables are set
    if (!process.env.GOOGLE_AI_API_KEY) {
      throw new Error('GOOGLE_AI_API_KEY environment variable is not set');
    }

    // Parse request body
    let requestBody;
    try {
      requestBody = JSON.parse(event.body);
    } catch (parseError) {
      throw new Error('Invalid JSON in request body');
    }

    const { text } = requestBody;

    if (!text || text.trim() === '') {
      throw new Error('No text description provided');
    }

    console.log('Processing text description, length:', text.length);

    // Generate website from text description
    const generatedCode = await generateWebsite(text);

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        generatedCode: generatedCode
      })
    };

  } catch (error) {
    console.error('Error in text-to-website handler:', error);
    
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: error.message || 'Internal server error',
        success: false
      })
    };
  }
};
