import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Ensure the root element exists before rendering
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Create the root and render the App component
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
