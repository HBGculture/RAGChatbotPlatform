// frontend/src/pages/LLMTest.js

import React, { useState } from 'react';

function LLMTest() {
  const [prompt, setPrompt] = useState('');
  const [responseData, setResponseData] = useState(null);

  const submitPrompt = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/llm/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>LLM Test</h2>
      <textarea
        placeholder="Enter a prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      /><br/>
      <button onClick={submitPrompt}>Generate Response</button>
      {responseData && (
        <pre>{JSON.stringify(responseData, null, 2)}</pre>
      )}
    </div>
  );
}

export default LLMTest;
