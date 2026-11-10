import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { MathView } from '../components/MathView';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('zosia.kowalska@example.com');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F5F7FB] flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 font-sans">
      {/* Górny pasek */}
      <header className="w-full max-w-[1360px] mx-auto flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight text-[#17243E]">
            Yamatho
          </span>
          <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-[#738097] bg-white border border-[#E5EAF2] px-2.5 py-1 rounded-md">
            Matematyka – Egzamin Ósmoklasisty
          </span>
        </div>
        <button
          type="button"
          className="text-xs sm:text-sm font-medium text-[#526079] hover:text-[#17243E] transition-colors"
        >
          Potrzebujesz pomocy?
        </button>
      </header>

      {/* Główny kontener - na tabletach (md) i mniejszych układa się centrowany w jednej kolumnie, od lg w dwóch */}
      <main className="w-full max-w-[1360px] mx-auto flex-1 flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12 items-center justify-center py-6">
        
        {/* LEWA STRONA (Branding & Karta z zadaniem) */}
        {/* Na tabletach/telefonach dostaje order-2 (formularz jest pierwszy lub pod tekstem), na desktopie order-1 */}
        <div className="w-full max-w-[540px] lg:max-w-none lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left space-y-6 order-2 lg:order-1">
          <div>
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#3157D5]">
              Matematyka • Egzamin 2027
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-[#17243E] tracking-tight mt-2 leading-[1.15]">
              Twój cel. Twój rytm. <br />
              <span className="font-semibold text-[#3157D5]">Twój dobry wynik.</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base text-[#526079] max-w-lg leading-relaxed mx-auto lg:mx-0">
              Wróć do nauki dokładnie tam, gdzie skończyłaś. Jedna lekcja, kilka zadań i kolejny krok do celu.
            </p>
          </div>

          {/* Niebieska karta prezentacyjna - idealnie wyśrodkowana na tablecie */}
          <div className="w-full max-w-[480px] bg-[#3157D5] rounded-[20px] p-6 text-white shadow-xl shadow-blue-500/10 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-200">
                Równania
              </span>
              <Sparkles className="w-5 h-5 text-blue-200" />
            </div>

            <div className="my-8 text-center">
              <div className="text-3xl sm:text-4xl font-semibold tracking-wide">
                <MathView math="3x + 6 = 21" />
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-center gap-2 text-xl font-medium text-blue-100">
                <MathView math="x = 5" />
                <span className="text-emerald-300 font-bold">✓</span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-[12px] p-3 text-xs sm:text-sm text-blue-100 text-center border border-white/10">
              Nie tylko odpowiedź. Zrozum każdy krok rozwiązania.
            </div>
          </div>
        </div>

        {/* PRAWA STRONA (Formularz logowania) */}
        {/* Na tabletach/telefonach wyśrodkowany, na lg dosunięty do prawej */}
        <div className="w-full max-w-[480px] lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="w-full bg-white rounded-[20px] border border-[#E5EAF2] p-6 sm:p-8 shadow-sm">
            <div className="mb-6 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#17243E]">
                Dobrze Cię widzieć!
              </h2>
              <p className="text-xs sm:text-sm text-[#526079] mt-1">
                Zaloguj się i zrób kolejny krok do swojego wyniku.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#17243E] mb-1.5 text-left">
                  Adres e-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="np. zosia@example.com"
                  required
                  className="w-full h-[50px] px-4 rounded-[10px] border border-[#E5EAF2] text-[#17243E] text-sm focus:outline-none focus:border-[#3157D5] focus:ring-2 focus:ring-[#3157D5]/10 transition-all bg-[#F5F7FB]/40"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-[#17243E]">
                    Hasło
                  </label>
                  <a
                    href="#forgot"
                    className="text-xs text-[#3157D5] hover:underline font-medium"
                  >
                    Nie pamiętam hasła
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-[50px] px-4 rounded-[10px] border border-[#E5EAF2] text-[#17243E] text-sm focus:outline-none focus:border-[#3157D5] focus:ring-2 focus:ring-[#3157D5]/10 transition-all bg-[#F5F7FB]/40"
                />
              </div>

              <div className="flex items-center pt-1">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#3157D5] focus:ring-[#3157D5] border-[#E5EAF2] cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-xs text-[#526079] cursor-pointer select-none"
                >
                  Zapamiętaj mnie
                </label>
              </div>

              <button
                type="submit"
                className="w-full h-[44px] bg-[#3157D5] hover:bg-[#2745aa] text-white font-medium text-sm rounded-[10px] flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <span>Zaloguj się</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-[#526079]">
              Jeszcze nie masz konta?{' '}
              <a href="#register" className="text-[#3157D5] font-semibold hover:underline">
                Załóż konto
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Stopka */}
      <footer className="w-full max-w-[1360px] mx-auto pt-6 border-t border-[#E5EAF2] flex flex-col sm:flex-row items-center justify-between text-xs text-[#738097] gap-3">
        <div className="flex items-center gap-4">
          <span>lekcje</span>
          <span>•</span>
          <span>zadania z wyjaśnieniami</span>
          <span>•</span>
          <span>arkusze</span>
        </div>
        <div className="flex items-center gap-4">
          <span>© 2027 Yamatho</span>
          <a href="#rules" className="hover:text-[#17243E] transition-colors">
            Regulamin
          </a>
          <a href="#privacy" className="hover:text-[#17243E] transition-colors">
            Polityka prywatności
          </a>
        </div>
      </footer>
    </div>
  );
};