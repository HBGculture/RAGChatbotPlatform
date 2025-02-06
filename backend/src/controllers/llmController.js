// backend/src/controllers/llmController.js

const llmService = require('../services/llmService');

exports.generateLLMResponse = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ message: 'Prompt is required' });
  }
  try {
    const llmResponse = await llmService.generateResponse(prompt);
    res.json({ message: 'LLM response generated', data: llmResponse });
  } catch (error) {
    res.status(500).json({ message: 'Error generating LLM response' });
  }
};
