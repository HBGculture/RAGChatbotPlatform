// backend/src/services/paymentService.js

const Stripe = require('stripe');
const stripe = Stripe('your_stripe_secret_key'); // Replace with your actual Stripe secret key

exports.chargePayment = async (amount, currency = 'usd', source, description = '') => {
  try {
    // Create a charge: this will charge the user's card
    const charge = await stripe.charges.create({
      amount, // in cents, so for $1, amount = 100
      currency,
      source,
      description,
    });
    return charge;
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};
