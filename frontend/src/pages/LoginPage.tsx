import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  Check,
  Eye,
  EyeOff,
  Flame,
  HelpCircle,
  Sparkles,
  Star,
} from 'lucide-react';
import { MathView } from '../components/MathView';

interface LoginPageProps {
  onLoginSuccess?: () => void;
}

/** Maskotka – przyjazny bobek, który mruga. */
const Mascot: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 96 88"
    className={className}
    aria-hidden="true"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M12 70c-4-24 6-52 36-52s40 28 36 52c-1 6-6 9-12 9H24c-6 0-11-3-12-9Z"
      fill="#FFD43B"
      stroke="#1E1B4B"
      strokeWidth="4"
    />
    <path d="M40 18c-2-7 0-12 6-14M56 18c1-6 5-9 11-9" stroke="#1E1B4B" strokeWidth="4" />
    <ellipse className="blink" cx="35" cy="48" rx="5" ry="6.5" fill="#1E1B4B" />
    <ellipse className="blink" cx="61" cy="48" rx="5" ry="6.5" fill="#1E1B4B" />
    <circle cx="33.5" cy="45.5" r="1.8" fill="#fff" />
    <circle cx="59.5" cy="45.5" r="1.8" fill="#fff" />
    <circle cx="23" cy="60" r="5" fill="#FF8AC0" opacity="0.85" />
    <circle cx="73" cy="60" r="5" fill="#FF8AC0" opacity="0.85" />
    <path d="M41 62c4 6 10 6 14 0" stroke="#1E1B4B" strokeWidth="4" />
  </svg>
);

const STEPS = [
  { label: 'Krok 1 – odejmij 6 z obu stron', math: '3x = 15', bg: 'bg-sun', tilt: '-1.5deg' },
  { label: 'Krok 2 – podziel przez 3', math: 'x = 5', bg: 'bg-pink', tilt: '1.5deg' },
];

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('zosia.kowalska@example.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [step, setStep] = useState(0); // 0 = nic, 1 = krok 1, 2 = krok 2 + wynik

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess?.();
  };

  const nextStep = () => setStep((s) => (s >= 2 ? 0 : s + 1));
  const stepButtonLabel =
    step === 0 ? 'Pokaż krok 1' : step === 1 ? 'Pokaż krok 2' : 'Jeszcze raz';

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-10 font-sans">
      {/* Górny pasek */}
      <header className="w-full max-w-340 mx-auto flex items-center justify-between gap-3 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-brand border-[3px] border-ink shadow-pop-sm flex items-center justify-center text-white font-display font-extrabold text-2xl -rotate-6">
            Y
          </div>
          <span className="font-display text-2xl font-extrabold tracking-tight text-ink">
            Yamatho
          </span>
          <span className="hidden sm:inline-block chip text-xs font-bold text-ink bg-mint px-3 py-1 rounded-full rotate-2">
            Egzamin ósmoklasisty 2027
          </span>
        </div>

        <button
          type="button"
          className="chip inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-ink bg-white px-3.5 py-2 rounded-full hover:-translate-y-0.5 transition-transform cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 text-brand" />
          <span>Potrzebujesz pomocy?</span>
        </button>
      </header>

      {/* Główny układ */}
     <main className="w-full max-w-300 mx-auto flex-1 flex flex-col xl:grid xl:grid-cols-12 gap-14 xl:gap-12 items-center justify-center py-4">
        {/* LEWA STRONA */}
        <div className="w-full max-w-135 xl:max-w-none xl:col-span-7 xl:pl-12 2xl:pl-20 flex flex-col justify-center items-center xl:items-start text-center xl:text-left space-y-8 order-2 xl:order-1">
          <div className="space-y-4">
            <div className="chip inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sun text-ink text-sm font-extrabold -rotate-2">
              <Flame className="w-4 h-4 text-orange-600 fill-orange-500" />
              <span>Małe kroki, duży wynik!</span>
            </div>

            <h1 className="font-display text-[40px] sm:text-5xl lg:text-[58px] font-extrabold text-ink tracking-tight leading-[1.02]">
              Twój cel.
              <br />
              Twój rytm.
              <br />
              <span className="inline-block mt-2 px-4 py-0.5 bg-brand text-white rounded-2xl border-[3px] border-ink shadow-pop -rotate-1">
                Twój dobry wynik.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-content-secondary font-semibold max-w-md leading-relaxed mx-auto lg:mx-0">
              Wróć do nauki dokładnie tam, gdzie skończyłaś. Jedna lekcja, kilka zadań i kolejny krok do celu.
            </p>
          </div>

          {/* Karta zadania */}
          <div className="relative w-full max-w-120">
            {/* naklejki */}
            <div
              className="bob chip absolute -top-5 -right-1 sm:-right-6 z-10 flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-sm font-extrabold text-ink"
              style={{ ['--tilt' as string]: '6deg' }}
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              5 dni z rzędu
            </div>
            <div
              className="bob chip absolute -bottom-5 -left-1 sm:-left-6 z-10 flex items-center gap-1.5 bg-lilac px-3 py-1.5 rounded-full text-sm font-extrabold text-ink"
              style={{ ['--tilt' as string]: '-5deg', animationDelay: '-1.4s' }}
            >
              <Star className="w-4 h-4 fill-sun text-ink" />
              +20 XP
            </div>

            <div className="graph-paper rounded-3xl border-[3px] border-ink shadow-pop-lg overflow-hidden text-left">
              <div className="bg-brand text-white px-5 py-3 flex items-center justify-between gap-3 border-b-[3px] border-ink">
                <div className="flex items-center gap-2.5">
                  <span className="font-display text-lg font-bold leading-none">
                    Równania
                  </span>
                  <span className="text-xs font-bold bg-white/20 rounded-full px-2.5 py-0.5">
                    Zadanie 3 z 6
                  </span>
                </div>
                <div className="flex gap-1" aria-hidden="true">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={`h-2.5 w-4 rounded-full border-2 border-ink ${
                        i < 3 ? 'bg-sun' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-sm font-bold text-content-secondary text-center">
                  Ile wynosi x?
                </p>
                <div className="py-3 text-center font-display text-4xl sm:text-5xl font-bold text-ink">
                  <MathView math="\sqrt{a^2 + b^2} x = \frac{15}{3}" />
                </div>

                <div className="grid grid-cols-2 gap-3 min-h-22">
                  {STEPS.map((s, i) =>
                    step > i ? (
                      <div
                        key={s.math}
                        className={`pop-in ${s.bg} border-[3px] border-ink rounded-2xl p-3 shadow-pop-sm`}
                        style={{ ['--tilt' as string]: s.tilt, transform: `rotate(${s.tilt})` }}
                      >
                        <span className="block text-[11px] font-extrabold text-ink/80 leading-tight">
                          {s.label}
                        </span>
                        <div className="text-xl font-bold text-ink mt-1.5">
                          <MathView math={s.math} />
                        </div>
                      </div>
                    ) : (
                      <div
                        key={s.math}
                        className="border-[3px] border-dashed border-ink/30 rounded-2xl flex items-center justify-center text-xs font-bold text-ink/40"
                      >
                        Krok {i + 1}
                      </div>
                    )
                  )}
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div
                    className={`flex-1 flex items-center justify-center gap-2 rounded-2xl border-[3px] border-ink px-3 py-2.5 text-base font-extrabold transition-colors ${
                      step === 2 ? 'bg-mint text-ink' : 'bg-white text-ink/40'
                    }`}
                    aria-live="polite"
                  >
                    <span
                      className={`w-6 h-6 rounded-full border-2 border-ink flex items-center justify-center ${
                        step === 2 ? 'bg-white' : 'bg-transparent'
                      }`}
                    >
                      {step === 2 && <Check className="w-4 h-4 text-ink stroke-[3.5]" />}
                    </span>
                    <span>
                      {step === 2 ? (
                        <>
                          Wynik: <MathView math="x = 5" />
                        </>
                      ) : (
                        'Wynik pojawi się tutaj'
                      )}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="chip inline-flex items-center justify-center gap-1.5 bg-sun text-ink text-sm font-extrabold px-4 py-2.5 rounded-2xl hover:-translate-y-0.5 active:translate-y-0.5 transition-transform cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    {stepButtonLabel}
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-content-secondary">
                  <BookOpen className="w-4 h-4 text-brand shrink-0" />
                  <span>Nie tylko odpowiedź. Zrozum każdy krok rozwiązania.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PRAWA STRONA: formularz */}
        <div className="w-full xl:col-span-5 flex justify-center xl:justify-end order-1 xl:order-2 pt-10 xl:pt-0">
          <div className="relative w-full max-w-115 xl:-translate-x-10 2xl:-translate-x-16 yamatho-card p-6 sm:p-8">
            <Mascot className="absolute -top-14 right-6 w-24 h-22 hover:scale-130 transition-transform bob" />

            <div className="mb-6 pr-16">
              <h2 className="font-display text-3xl font-extrabold text-ink leading-tight">
                Dobrze Cię widzieć!
              </h2>
              <p className="text-sm text-content-secondary font-semibold mt-1">
                Zaloguj się i zrób kolejny krok do swojego wyniku.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-extrabold text-ink mb-1.5">
                  Adres e-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="zosia.kowalska@example.com"
                  autoComplete="email"
                  required
                  className="input-pop w-full h-12 px-4 text-ink text-sm font-bold placeholder:text-content-muted/60"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="password" className="text-sm font-extrabold text-ink">
                    Hasło
                  </label>
                  <a href="#forgot" className="text-xs text-brand hover:underline font-extrabold">
                    Nie pamiętam hasła
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    className="input-pop w-full h-12 pl-4 pr-12 text-ink text-sm font-bold placeholder:text-content-muted/60"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Ukryj hasło' : 'Pokaż hasło'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl flex items-center justify-center text-content-secondary hover:bg-brand-light cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center pt-1">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 rounded accent-brand cursor-pointer"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2.5 text-sm font-bold text-content-secondary cursor-pointer select-none"
                >
                  Zapamiętaj mnie
                </label>
              </div>

              <button
                type="submit"
                className="w-full h-14 text-white font-display font-extrabold text-lg rounded-2xl flex items-center justify-center gap-2 yamatho-btn cursor-pointer mt-3"
              >
                <span>Zaczynamy!</span>
                <ArrowRight className="w-5 h-5 stroke-3" />
              </button>
            </form>

            <div className="mt-7 pt-5 border-t-[3px] border-dashed border-border-light text-center text-sm font-semibold text-content-secondary">
              Jeszcze nie masz konta?{' '}
              <a href="#register" className="text-brand font-extrabold hover:underline">
                Załóż konto
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Stopka */}
      <footer className="w-full max-w-340 mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-content-secondary gap-4">
        <div className="flex flex-wrap items-center justify-center gap-2 font-extrabold text-ink">
          <span className="chip bg-sun px-3 py-1 rounded-full">Lekcje</span>
          <span className="chip bg-pink px-3 py-1 rounded-full">Zadania z wyjaśnieniami</span>
          <span className="chip bg-mint px-3 py-1 rounded-full">Arkusze</span>
        </div>
        <div className="flex items-center gap-4 font-bold">
          <span>© 2027 Yamatho</span>
          <a href="#rules" className="hover:text-ink hover:underline transition-colors">
            Regulamin
          </a>
          <a href="#privacy" className="hover:text-ink hover:underline transition-colors">
            Polityka prywatności
          </a>
        </div>
      </footer>
    </div>
  );
};