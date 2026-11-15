import React, { useState } from 'react';
import {
  LayoutGrid,
  BookOpen,
  FileEdit,
  FileText,
  BarChart2,
  Bookmark,
  Sigma,
  Search,
  Bell,
  ChevronDown,
  Flame,
  HelpCircle,
  ChevronsUpDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Shuffle,
  Info,
  Menu,
  X,
} from 'lucide-react';
import { MathView } from '../components/MathView';

interface DashboardPageProps {
  onLogout?: () => void;
}

const TOPICS_PREVIEW = [
  {
    id: 1,
    title: 'Liczby naturalne',
    completed: 8,
    total: 8,
    percent: 100,
    status: 'completed' as const,
  },
  {
    id: 2,
    title: 'Przekształcenia wyrażeń',
    completed: 6,
    total: 8,
    percent: 75,
    status: 'default' as const,
  },
  {
    id: 3,
    title: 'Prędkość droga czas',
    completed: 5,
    total: 8,
    percent: 63,
    status: 'default' as const,
  },
  {
    id: 4,
    title: 'Układ współrzędnych',
    completed: 4,
    total: 8,
    percent: 50,
    status: 'active' as const,
  },
  {
    id: 5,
    title: 'Statystyka',
    completed: 4,
    total: 8,
    percent: 50,
    status: 'default' as const,
  },
  {
    id: 6,
    title: 'Stereometria',
    completed: 2,
    total: 8,
    percent: 25,
    status: 'default' as const,
  },
];

const WEEK_DAYS = [
  { label: 'P', done: true },
  { label: 'W', done: true },
  { label: 'Ś', done: true },
  { label: 'C', done: true },
  { label: 'P', done: true },
  { label: 'S', done: false },
  { label: 'N', done: false },
];



export const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout }) => {
  const [activeNav, setActiveNav] = useState('pulpit');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Obliczenia dla kołowego wykresu SVG (60%)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (60 / 100) * circumference;

  const navItems = [
    { id: 'pulpit', label: 'Mój pulpit', icon: LayoutGrid },
    { id: 'tematy', label: 'Tematy', icon: BookOpen },
    { id: 'baza', label: 'Baza zadań', icon: FileEdit },
    { id: 'arkusze', label: 'Arkusze egzaminacyjne', icon: FileText },
    { id: 'postepy', label: 'Moje postępy', icon: BarChart2 },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full justify-between p-4 bg-white">
      <div>
        {/* Logo */}
        <div className="flex items-center justify-between px-2 pt-1 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand border-[3px] border-ink shadow-pop-sm flex items-center justify-center text-white font-display font-extrabold text-xl -rotate-3">
              Y
            </div>
            <span className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Yamatho
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-xl border-2 border-ink bg-paper text-ink"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selektor kursu */}
        <button
          type="button"
          className="w-full text-left bg-paper hover:bg-brand-light/60 border-[2.5px] border-ink shadow-pop-sm rounded-2xl p-3 mb-6 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-sm text-ink">
              Matematyka
            </span>
            <ChevronDown className="w-4 h-4 text-ink group-hover:translate-y-0.5 transition-transform" />
          </div>
          <span className="block text-xs font-bold text-content-secondary mt-0.5">
            Egzamin ósmoklasisty 2027
          </span>
        </button>

        {/* Główna nawigacja */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveNav(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-extrabold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-light text-brand border-2 border-ink shadow-pop-sm'
                    : 'text-content-secondary hover:text-ink hover:bg-paper border-2 border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-brand stroke-[2.5]' : ''}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Twoja biblioteczka */}
        <div className="mt-7 pt-5 border-t-2 border-dashed border-border-light">
          <span className="px-3 text-[11px] font-extrabold uppercase tracking-wider text-content-muted">
            Twoja biblioteczka
          </span>
          <div className="mt-2.5 space-y-1.5">
            <button
              type="button"
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-bold text-content-secondary hover:text-ink hover:bg-paper transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <Bookmark className="w-4 h-4" />
                <span>Zapisane zadania</span>
              </span>
              <span className="text-xs font-extrabold bg-lilac/50 text-ink border border-ink px-2 py-0.5 rounded-full">
                12
              </span>
            </button>
            <button
              type="button"
              className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-sm font-bold text-content-secondary hover:text-ink hover:bg-paper transition-colors cursor-pointer"
            >
              <Sigma className="w-4 h-4" />
              <span>Wzory i definicje</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dół paska bocznego */}
      <div className="space-y-3 pt-4">
        {/* Karta serii */}
        <div className="bg-sun/35 border-[2.5px] border-ink shadow-pop-sm rounded-2xl p-3.5">
          <div className="flex items-center gap-1.5 font-display font-extrabold text-sm text-ink">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>5 dni z rzędu!</span>
          </div>
          <p className="text-xs font-semibold text-ink/80 mt-1 leading-snug">
            Małe kroki, duży wynik. Tak trzymaj, Zosia.
          </p>
        </div>

        {/* Pomoc */}
        <button
          type="button"
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-extrabold text-content-secondary hover:text-ink hover:bg-paper transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Potrzebujesz pomocy?</span>
        </button>

        {/* Profil ucznia */}
        <button
          type="button"
          onClick={onLogout}
          title="Kliknij, aby wylogować"
          className="w-full flex items-center justify-between p-2.5 rounded-2xl border-2 border-ink bg-white hover:bg-paper transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-sun border-2 border-ink flex items-center justify-center font-display font-extrabold text-xs text-ink shrink-0">
              ZK
            </div>
            <div className="text-left truncate">
              <div className="text-xs font-extrabold text-ink truncate">
                Zosia Kowalska
              </div>
              <div className="text-[11px] font-bold text-content-muted truncate">
                Konto ucznia
              </div>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-content-muted shrink-0" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full flex font-sans text-ink">
      {/* STAŁY SIDEBAR (Desktop) */}
      <aside className="hidden lg:block w-64 shrink-0 border-r-[3px] border-ink bg-white sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* MOBILNY DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-ink/40 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[85vw] h-full border-r-[3px] border-ink bg-white z-10">
            <SidebarContent />
          </div>
        </div>
      )}

      {/* PRAWA CZĘŚĆ (Topbar + Treść) */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* TOPBAR */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-[3px] border-ink px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl border-2 border-ink bg-paper text-ink"
              aria-label="Otwórz menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <span className="text-content-muted hidden sm:inline">Twoja przestrzeń</span>
              <span className="text-content-muted hidden sm:inline">›</span>
              <span className="text-ink font-extrabold">Mój pulpit</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Wyszukiwarka */}
            <div className="relative hidden md:flex items-center">
              <Search className="w-4 h-4 text-content-muted absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Szukaj tematu lub zadania"
                className="w-64 xl:w-72 h-10 pl-10 pr-12 rounded-xl bg-paper border-2 border-ink text-xs font-bold text-ink placeholder:text-content-muted focus:outline-none focus:bg-white focus:shadow-pop-sm transition-all"
              />
            </div>

            {/* Powiadomienia */}
            <button
              type="button"
              className="relative w-10 h-10 rounded-xl border-2 border-ink bg-white hover:bg-paper flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Powiadomienia"
            >
              <Bell className="w-4 h-4 text-ink" />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-pink border border-ink" />
            </button>

            {/* Avatar w topbarze */}
            <div className="w-10 h-10 rounded-full bg-sun border-2 border-ink shadow-pop-sm flex items-center justify-center font-display font-extrabold text-xs text-ink">
              ZK
            </div>
          </div>
        </header>

        {/* GŁÓWNY OBSZAR ROBOCZY */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
          {/* Nagłówek powitalny */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Cześć, Zosia! Dobrze Cię widzieć.
              </h1>
              <p className="text-sm font-bold text-content-secondary mt-1">
                Kolejne 15 minut to kolejny krok do Twojego wyniku.
              </p>
            </div>
            <div className="text-xs font-extrabold text-content-secondary bg-white border-2 border-ink px-3 py-1.5 rounded-full self-start sm:self-auto">
              Piątek, 12 marca 2027
            </div>
          </div>

          {/* SIATKA DWUKOLUMNOWA (Lewa główna + Prawa boczna) */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            
            {/* LEWA KOLUMNA (8/12) */}
            <div className="xl:col-span-8 space-y-8">
              
              {/* HERO BANNER: Twój kolejny krok */}
              <section className="bg-brand rounded-3xl border-[3px] border-ink shadow-pop-lg p-6 sm:p-7 text-white relative overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Lewa część baneru */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-blue-100">
                      <span className="w-2 h-2 rounded-full bg-sun" />
                      <span>Twój kolejny krok</span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold leading-tight">
                      Równania z jedną niewiadomą
                    </h2>

                    <p className="text-xs sm:text-sm font-bold text-blue-100">
                      Lekcja 5 z 8 • 15 min • 6 zadań
                    </p>

                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <button
                        type="button"
                        className="bg-white hover:bg-sun text-ink font-display font-extrabold text-sm sm:text-base px-5 py-3 rounded-2xl border-[3px] border-ink shadow-pop-sm hover:-translate-y-0.5 active:translate-y-0.5 transition-all inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>Kontynuuj naukę</span>
                        <ArrowRight className="w-4 h-4 stroke-3" />
                      </button>
                      <span className="text-xs font-extrabold text-blue-100">
                        Zadanie 3 z 6
                      </span>
                    </div>
                  </div>

                  {/* Prawa część baneru: Krok po kroku */}
                  <div className="md:col-span-5">
                    <div className="graph-paper text-ink rounded-2xl border-[3px] border-ink shadow-pop-sm p-4 text-center">
                      <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-content-muted mb-2">
                        <span>Krok po kroku</span>
                        <span className="bg-sun border border-ink text-ink px-1.5 py-0.5 rounded-md">
                          +15 XP
                        </span>
                      </div>

                      <div className="font-display text-xl font-extrabold text-ink">
                        <MathView math="3x + 6 = 21" />
                      </div>

                      <div className="my-1.5 flex items-center justify-center gap-2">
                        <div className="h-0.5 flex-1 bg-border-light" />
                        <span className="text-[11px] font-extrabold text-brand bg-brand-light px-2 py-0.5 rounded-md border border-ink">
                          −6
                        </span>
                        <div className="h-0.5 flex-1 bg-border-light" />
                      </div>

                      <div className="font-display text-lg font-extrabold text-ink mb-2.5">
                        <MathView math="3x = 15" />
                      </div>

                      <div className="inline-flex items-center justify-center gap-1.5 bg-mint border-2 border-ink rounded-xl px-4 py-1 text-sm font-extrabold text-ink shadow-2xs">
                        <MathView math="x = 5" />
                        <Check className="w-4 h-4 stroke-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SEKCJA: Twoje tematy */}
              <section>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <h2 className="font-display text-xl font-extrabold text-ink">
                      Twoje tematy
                    </h2>
                    <p className="text-xs font-bold text-content-secondary">
                      Wszystko, czego potrzebujesz na egzaminie. Krok po kroku.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-extrabold text-brand hover:underline cursor-pointer"
                  >
                    <span>Pełny plan nauki</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Siatka 6 kart tematów */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {TOPICS_PREVIEW.map((topic) => {
                    const isActive = topic.status === 'active';
                    const isCompleted = topic.status === 'completed';

                    return (
                      <div
                        key={topic.id}
                        className={`bg-white rounded-2xl border-[2.5px] p-4 flex flex-col justify-between transition-all hover:-translate-y-1 cursor-pointer ${
                          isActive
                            ? 'border-brand shadow-[4px_4px_0_0_#3157D5]'
                            : 'border-ink shadow-pop-sm'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <span
                              className={`w-8 h-8 rounded-xl border-2 border-ink flex items-center justify-center font-display font-extrabold text-sm ${
                                isCompleted
                                  ? 'bg-mint text-ink'
                                  : isActive
                                  ? 'bg-brand text-white'
                                  : 'bg-paper text-ink'
                              }`}
                            >
                              {topic.id}
                            </span>

                            {isCompleted ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold bg-mint/40 text-ink border border-ink px-2 py-0.5 rounded-full">
                                <Check className="w-3 h-3 stroke-3" />
                                Ukończono
                              </span>
                            ) : isActive ? (
                              <span className="text-[11px] font-extrabold bg-brand-light text-brand border border-brand px-2.5 py-0.5 rounded-full">
                                W trakcie
                              </span>
                            ) : (
                              <ArrowUpRight className="w-4 h-4 text-content-muted" />
                            )}
                          </div>

                          <h3 className="font-display font-extrabold text-base text-ink mt-3.5 leading-snug">
                            {topic.title}
                          </h3>
                        </div>

                        <div className="mt-5">
                          <div className="flex items-center justify-between text-xs font-extrabold mb-1.5">
                            <span className="text-content-secondary">
                              {topic.completed} z {topic.total} lekcji
                            </span>
                            <span className={isCompleted ? 'text-emerald-700' : 'text-ink'}>
                              {topic.percent}%
                            </span>
                          </div>
                          <div className="w-full h-2.5 bg-paper rounded-full border border-ink overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                isCompleted ? 'bg-mint' : 'bg-brand'
                              }`}
                              style={{ width: `${topic.percent}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* SEKCJA: Sprawdź się na arkuszu */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-xl font-extrabold text-ink">
                    Sprawdź się na arkuszu
                  </h2>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-extrabold text-brand hover:underline cursor-pointer"
                  >
                    <span>Wszystkie arkusze</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Arkusz CKE 2026 */}
                  <div className="bg-white rounded-2xl border-[2.5px] border-ink shadow-pop-sm p-5 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-brand-light border-2 border-ink flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5 text-brand" />
                        </div>
                        <div>
                          <h3 className="font-display font-extrabold text-base text-ink">
                            Arkusz CKE 2026
                          </h3>
                          <p className="text-xs font-bold text-content-secondary mt-0.5">
                            Termin główny • 125 min • 30 pkt
                          </p>
                        </div>
                      </div>
                      <span className="chip bg-sun text-ink text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                        Polecany
                      </span>
                    </div>

                    <div className="mt-5 pt-3.5 border-t-2 border-dashed border-border-light flex items-center justify-between">
                      <span className="text-xs font-bold text-content-muted">
                        Nie rozpoczęto
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-brand hover:underline cursor-pointer"
                      >
                        <span>Rozwiąż arkusz</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Arkusz CKE 2025 */}
                  <div className="bg-white rounded-2xl border-[2.5px] border-ink shadow-pop-sm p-5 flex flex-col justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-paper border-2 border-ink flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-content-secondary" />
                      </div>
                      <div>
                        <h3 className="font-display font-extrabold text-base text-ink">
                          Arkusz CKE 2025
                        </h3>
                        <p className="text-xs font-bold text-content-secondary mt-0.5">
                          Termin główny • 125 min • 30 pkt
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t-2 border-dashed border-border-light flex items-center justify-between">
                      <span className="text-xs font-bold text-content-muted">
                        Nie rozpoczęto
                      </span>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-brand hover:underline cursor-pointer"
                      >
                        <span>Rozwiąż arkusz</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* PRAWA KOLUMNA WIDŻETÓW (4/12) */}
            <aside className="xl:col-span-4 space-y-6">
              
              {/* WIDŻET 1: Twój postęp (Koło 60%) */}
              <div className="bg-white rounded-3xl border-[2.5px] border-ink shadow-pop p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg font-extrabold text-ink">
                    Twój postęp
                  </h2>
                  <Info className="w-4 h-4 text-content-muted" />
                </div>

                <div className="flex items-center gap-5">
                  {/* Donut Chart SVG */}
                  <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                    <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        fill="none"
                        stroke="#E6ECFF"
                        strokeWidth="10"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r={radius}
                        fill="none"
                        stroke="#3157D5"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-display text-xl font-extrabold text-ink leading-none">
                        60%
                      </span>
                      <span className="text-[10px] font-bold text-content-muted mt-0.5">
                        planu nauki
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="font-display text-xl font-extrabold text-ink">
                      29 z 48
                    </div>
                    <div className="text-xs font-bold text-content-secondary">
                      lekcji ukończonych
                    </div>
                    <span className="inline-block mt-2 bg-mint/45 text-ink border border-ink text-[11px] font-extrabold px-2.5 py-0.5 rounded-lg">
                      Dobry rytm, tak trzymaj!
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t-2 border-dashed border-border-light flex items-center justify-between text-xs font-extrabold text-content-secondary">
                  <span>Jeszcze 19 lekcji do końca planu</span>
                  <ArrowRight className="w-4 h-4 text-brand" />
                </div>
              </div>

              {/* WIDŻET 2: Twój tydzień (85 / 100 min) */}
              <div className="bg-white rounded-3xl border-[2.5px] border-ink shadow-pop p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-display text-lg font-extrabold text-ink">
                    Twój tydzień
                  </h2>
                  <span className="text-xs font-bold text-content-muted">
                    8–14 marca
                  </span>
                </div>

                {/* Dni tygodnia P W Ś C P S N */}
                <div className="grid grid-cols-7 gap-1.5 text-center mb-5">
                  {WEEK_DAYS.map((day, idx) => (
                    <div key={idx} className="flex flex-col items-center gap-1.5">
                      <span className="text-[11px] font-extrabold text-content-muted">
                        {day.label}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-full border-2 border-ink flex items-center justify-center text-xs font-extrabold ${
                          day.done
                            ? 'bg-brand text-white shadow-2xs'
                            : 'bg-paper text-content-muted'
                        }`}
                      >
                        {day.done ? <Check className="w-4 h-4 stroke-3" /> : '–'}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-baseline justify-between mb-1.5">
                  <div>
                    <span className="font-display text-xl font-extrabold text-ink">85</span>
                    <span className="text-xs font-bold text-content-secondary"> / 100 min</span>
                  </div>
                  <span className="text-[11px] font-bold text-content-muted">
                    cel tygodniowy
                  </span>
                </div>

                <div className="w-full h-3 bg-paper rounded-full border-2 border-ink overflow-hidden">
                  <div className="h-full bg-brand rounded-full" style={{ width: '85%' }} />
                </div>

                <p className="text-xs font-bold text-content-secondary mt-2.5">
                  Jeszcze 15 minut i cel osiągnięty!
                </p>
              </div>

              {/* WIDŻET 3: Szybki trening */}
              <div className="bg-white rounded-3xl border-[2.5px] border-ink shadow-pop p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-xl bg-lilac border-2 border-ink flex items-center justify-center text-ink font-extrabold">
                    ⚡
                  </div>
                  <h2 className="font-display text-lg font-extrabold text-ink">
                    Szybki trening
                  </h2>
                </div>

                <p className="text-xs sm:text-sm font-bold text-content-secondary leading-relaxed mb-4">
                  10 zadań z różnych tematów. Sprawdź, co już umiesz.
                </p>

                <button
                  type="button"
                  className="w-full h-12 rounded-2xl text-white font-display font-extrabold text-base flex items-center justify-center gap-2 yamatho-btn cursor-pointer"
                >
                  <span>Losuj zadania</span>
                  <Shuffle className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>
            </aside>

          </div>
        </main>
      </div>
    </div>
  );
};