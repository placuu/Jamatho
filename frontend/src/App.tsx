import { useState } from 'react';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // if (isLoggedIn) {
  //   return <DashboardPage onLogout={() => setIsLoggedIn(false)} />;
  // }
//return <DashboardPage onLogout={() => setIsLoggedIn(true)} />;
  return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
}