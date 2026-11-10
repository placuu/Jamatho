import './App.css'

import { LoginPage } from './pages/LoginPage';

export default function App() {
  return (
    <LoginPage
      onLoginSuccess={() => {
        alert('Zalogowano! Przechodzimy do pulpitu...');
      }}
    />
  );
}