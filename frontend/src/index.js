import React from 'react';
import ReactDOM from 'react-dom'; // Import from 'react-dom' (not 'react-dom/client')
import './index.css';
import App from './App';

// Use ReactDOM.render instead of createRoot
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);