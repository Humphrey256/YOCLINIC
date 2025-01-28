import React from 'react'; 
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

console.log('Rendering App component'); // This should confirm rendering

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />  {/* Corrected the space here */}
        </BrowserRouter>
    </React.StrictMode>
);
