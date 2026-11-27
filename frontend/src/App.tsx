import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return Boolean(
      localStorage.getItem('token') || sessionStorage.getItem('token')
    );
  });

  const resetDashboardLocation = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('section');
    url.searchParams.delete('quizId');
    window.history.replaceState(
      window.history.state,
      '',
      `${url.pathname}${url.search}${url.hash}`
    );
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    resetDashboardLocation();
    setIsLoggedIn(false);
  };

  const handleLoginSuccess = () => {
    resetDashboardLocation();
    setIsLoggedIn(true);
  };

  if (isLoggedIn) {
    return <DashboardPage onLogout={handleLogout} />;
  }

  return <LoginPage onLoginSuccess={handleLoginSuccess} />;
}