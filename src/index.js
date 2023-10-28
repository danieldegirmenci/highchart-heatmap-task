import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SalesProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SalesProvider>
    <App />
    </SalesProvider>
  </React.StrictMode>
);