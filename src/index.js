import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/App';
import "../src/index.css";
import { AuthProvider } from './components/utils/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);


