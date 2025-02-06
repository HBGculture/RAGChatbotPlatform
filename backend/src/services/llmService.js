// backend/src/services/llmService.js

const axios = require('axios');

// Replace with your actual OpenAI API key or use environment variables
const OPENAI_API_KEY = 'your_openai_api_key';

exports.generateResponse = async (prompt) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt: prompt,
        max_tokens: 100,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
};
