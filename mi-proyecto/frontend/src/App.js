import React from 'react';
import AppRouter from './router/AppRouter';
import { NotificationProvider } from './notifications/NotificationContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <NotificationProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </NotificationProvider>
  );
}

export default App;
