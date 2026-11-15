import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return Boolean(
      localStorage.getItem('token') || sessionStorage.getItem('token')
    );
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <DashboardPage onLogout={handleLogout} />;
  }

  return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
}