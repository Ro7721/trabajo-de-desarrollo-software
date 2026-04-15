import React from 'react';
import AppRouter from './router/AppRouter';
import { NotificationProvider } from './notifications/NotificationContext';
function App() {
  return (
    <NotificationProvider>
      <AppRouter />
    </NotificationProvider>

  );
}

export default App;
