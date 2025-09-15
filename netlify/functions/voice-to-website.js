const speech = require('@google-cloud/speech');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer');

// Configure multer for serverless environment
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// Initialize clients
let speechClient;
let genAI;

try {
  // Initialize speech client with credentials from environment
  speechClient = new speech.SpeechClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
  });
  
  // Initialize Google AI
  genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
} catch (error) {
  console.error('Error initializing services:', error);
}

// Convert speech to text
async function speechToText(audioBuffer) {
  console.log('Starting speech to text conversion...');
  const audio = {
    content: audioBuffer.toString('base64'),
  };
  
  const config = {
    encoding: 'WEBM_OPUS',
    sampleRateHertz: 48000,
    languageCode: 'en-US',
    model: 'default',
    useEnhanced: true,
    audioChannelCount: 1,
    enableAutomaticPunctuation: true
  };
  
  const request = {
    audio: audio,
    config: config,
  };

  try {
    const [response] = await speechClient.recognize(request);
    if (!response || !response.results || response.results.length === 0) {
      throw new Error('No speech detected in the audio');
    }
    
    const transcribedText = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    
    console.log('Successfully transcribed text:', transcribedText);
    return transcribedText;
  } catch (error) {
    console.error('Error in speech to text conversion:', error);
    throw new Error('Failed to convert speech to text: ' + error.message);
  }
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

    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is not set');
    }

    // Parse multipart form data for audio file
    const contentType = event.headers['content-type'] || event.headers['Content-Type'];
    if (!contentType || !contentType.includes('multipart/form-data')) {
      throw new Error('Content-Type must be multipart/form-data');
    }

    // For serverless, we need to parse the multipart data manually or use a different approach
    // For now, let's assume the audio data is in the body
    const audioBuffer = Buffer.from(event.body, 'base64');

    if (!audioBuffer || audioBuffer.length === 0) {
      throw new Error('No audio data received');
    }

    console.log('Processing audio file, size:', audioBuffer.length);

    // Convert speech to text
    const transcription = await speechToText(audioBuffer);

    if (!transcription || transcription.trim() === '') {
      throw new Error('Could not extract text from audio');
    }

    // Generate website from transcription
    const generatedCode = await generateWebsite(transcription);

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        success: true,
        transcription: transcription,
        generatedCode: generatedCode
      })
    };

  } catch (error) {
    console.error('Error in voice-to-website handler:', error);
    
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
