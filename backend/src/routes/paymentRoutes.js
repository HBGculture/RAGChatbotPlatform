// backend/src/routes/paymentRoutes.js

const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

router.post('/charge', paymentController.processPayment);

module.exports = router;
