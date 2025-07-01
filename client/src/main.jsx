import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Toaster } from 'react-hot-toast';

import { StateContextProvider } from './context'; // ✅ Import your context

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateContextProvider>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </StateContextProvider>
  </React.StrictMode>
);

