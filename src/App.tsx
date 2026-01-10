import React from 'react';
import './App.css';
import { AuthProvider } from './auth/AuthContext';
import AppRoutes from './app/routes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
