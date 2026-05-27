import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AdminAuthProvider } from './context/AdminAuthContext';
import { ManagedContentProvider } from './context/ManagedContentContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ManagedContentProvider>
      <AdminAuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AdminAuthProvider>
    </ManagedContentProvider>
  </React.StrictMode>,
);
