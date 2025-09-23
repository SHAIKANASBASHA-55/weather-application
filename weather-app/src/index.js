import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import './index.css';
import App from './App';

// Get the root container
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Render the App
root.render(<App />);
