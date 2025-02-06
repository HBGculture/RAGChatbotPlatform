// backend/src/app.js

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;
const llmRoutes = require('./routes/llmRoutes');
app.use('/api/llm', llmRoutes);
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payment', paymentRoutes);

// Middleware
app.use(express.json());
app.use(cors());

// Import and use authentication routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Existing sample endpoints (health check and chatbot config)
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend API is running!' });
});

app.post('/api/chatbot/config', (req, res) => {
  const config = req.body;
  res.json({
    message: 'Chatbot configuration received!',
    config: config,
  });
});

app.listen(PORT, () => {
  console.log(`Backend API is listening on port ${PORT}`);
});
