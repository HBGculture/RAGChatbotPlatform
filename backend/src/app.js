// backend/src/app.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

// Import route modules
const llmRoutes = require('./routes/llmRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const authRoutes = require('./routes/authRoutes');

// Use middleware to parse JSON and enable CORS
app.use(express.json());
app.use(cors());

// Set up the routes
app.use('/api/llm', llmRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend API is running!' });
});

// Chatbot configuration endpoint
app.post('/api/chatbot/config', (req, res) => {
  const config = req.body;
  res.json({
    message: 'Chatbot configuration received!',
    config: config,
  });
});

// Only start the server if this module is being run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Backend API is listening on port ${PORT}`);
  });
}

// Export the app for serverless deployment (e.g., on Vercel)
module.exports = app;
