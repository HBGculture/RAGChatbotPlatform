// backend/src/controllers/paymentController.js

const paymentService = require('../services/paymentService');

exports.processPayment = async (req, res) => {
  const { amount, source, description } = req.body;
  
  // Enforce a minimum token purchase (example: amount must be at least 500 cents)
  if (amount < 500) {
    return res.status(400).json({ message: 'Minimum purchase amount not met' });
  }
  
  try {
    const charge = await paymentService.chargePayment(amount, 'usd', source, description);
    res.json({ message: 'Payment successful', charge });
  } catch (error) {
    res.status(500).json({ message: 'Payment processing failed' });
  }
};
