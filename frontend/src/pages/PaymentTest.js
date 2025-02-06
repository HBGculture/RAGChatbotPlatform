// frontend/src/pages/PaymentTest.js

import React, { useState } from 'react';

function PaymentTest() {
  const [amount, setAmount] = useState(500);
  const [source, setSource] = useState('tok_visa'); // For testing, Stripe provides test tokens like 'tok_visa'
  const [description, setDescription] = useState('');
  const [paymentResponse, setPaymentResponse] = useState(null);

  const processPayment = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/payment/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, source, description }),
      });
      const data = await response.json();
      setPaymentResponse(data);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      <h2>Payment Test</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        placeholder="Amount in cents"
      /><br/>
      <input
        type="text"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        placeholder="Payment source (token)"
      /><br/>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      /><br/>
      <button onClick={processPayment}>Process Payment</button>
      {paymentResponse && (
        <pre>{JSON.stringify(paymentResponse, null, 2)}</pre>
      )}
    </div>
  );
}

export default PaymentTest;
