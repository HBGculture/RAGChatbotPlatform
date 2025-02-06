// frontend/src/App.js

import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [healthMessage, setHealthMessage] = useState('');
  const [configResponse, setConfigResponse] = useState(null);
  const [configInput, setConfigInput] = useState('');

  // Function to call the backend health check endpoint
  const fetchHealth = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/health');
      const data = await response.json();
      setHealthMessage(data.status);
    } catch (error) {
      console.error('Error fetching health status:', error);
    }
  };

  // Function to submit chatbot configuration
  const submitConfig = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/chatbot/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ config: configInput }),
      });
      const data = await response.json();
      setConfigResponse(data);
    } catch (error) {
      console.error('Error submitting configuration:', error);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>RAG Chatbot Platform MVP</h1>
        <p>{healthMessage}</p>
      </header>
      <main>
        <section>
          <h2>Chatbot Configuration</h2>
          <input
            type="text"
            placeholder="Enter configuration details"
            value={configInput}
            onChange={(e) => setConfigInput(e.target.value)}
          />
          <button onClick={submitConfig}>Submit Configuration</button>
          {configResponse && (
            <div>
              <h3>Response:</h3>
              <pre>{JSON.stringify(configResponse, null, 2)}</pre>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
