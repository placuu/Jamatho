import type { FC } from 'react';
import {
  BookOpen,
  Bookmark,
  FileEdit,
  FileText,
  Flame,
  HelpCircle,
  LayoutGrid,
  LogOut,
  Sigma,
  X,
} from 'lucide-react';

export type DashboardNavItem =
  | 'pulpit'
  | 'tematy'
  | 'baza'
  | 'arkusze';

interface SidebarProps {
  activeNav: DashboardNavItem;
  displayName: string;
  roleLabel: string;
  streak: number;
  onNavigate: (item: DashboardNavItem) => void;
  onClose: () => void;
  onLogout?: () => void;
}

const navItems: { id: DashboardNavItem; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'pulpit', label: 'Mój pulpit', icon: LayoutGrid },
  { id: 'tematy', label: 'Tematy', icon: BookOpen },
  { id: 'baza', label: 'Baza zadań', icon: FileEdit },
  { id: 'arkusze', label: 'Arkusze egzaminacyjne', icon: FileText },
];

export const Sidebar: FC<SidebarProps> = ({
  activeNav,
  displayName,
  roleLabel,
  streak,
  onNavigate,
  onClose,
  onLogout,
}) => {
  const intensity = Math.min(streak / 15, 1);
  const hue = Math.round(48 - intensity * 24);
  const lightness = Math.round(96 - intensity * 18);
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="flex flex-col min-h-full justify-between p-4 bg-white">
      <div>
        <div className="flex items-center justify-between px-2 pt-1 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-brand border-[3px] border-ink shadow-pop-sm flex items-center justify-center text-white font-display font-extrabold text-xl -rotate-3">
              J
            </div>
            <span className="font-display text-2xl font-extrabold tracking-tight text-ink">
              Jamatho
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-xl border-2 border-ink bg-paper text-ink"
            aria-label="Zamknij menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <button
          type="button"
          className="w-full text-left bg-paper hover:bg-brand-light/60 border-[2.5px] border-ink shadow-pop-sm rounded-2xl p-3 mb-6 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="font-display font-bold text-sm text-ink">
              Matematyka
            </span>
          </div>
          <span className="block text-xs font-bold text-content-secondary mt-0.5">
            Egzamin ósmoklasisty 2027
          </span>
        </button>

        <nav className="space-y-1.5" aria-label="Nawigacja główna">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                aria-current={isActive ? 'page' : undefined}
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

      <div className="space-y-3 pt-4">
        <div
          style={{
            backgroundColor: `hsl(${hue}, 95%, ${lightness}%)`,
            borderColor: `hsl(${hue}, 85%, ${lightness - 18}%)`,
          }}
          className="border rounded-2xl p-3.5 transition-colors duration-300 text-orange-950"
        >
          <div className="flex items-center gap-1.5 font-display font-extrabold text-sm text-ink">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span>
              {streak === 1 ? '1 dzień z rzędu!' : `${streak} dni z rzędu!`}
            </span>
          </div>
          <p className="text-xs font-semibold text-ink/80 mt-1 leading-snug">
            {streak === 0
              ? `Czas na pierwsze zadanie dzisiaj, ${displayName}!`
              : streak <= 3
                ? `Dobry początek, ${displayName}! Rozkręcasz się.`
                : streak <= 10
                  ? `Małe kroki, duży wynik. Tak trzymaj, ${displayName}.`
                  : `Niesamowita passa, ${displayName}! Jesteś nie do zatrzymania!`}
          </p>
        </div>

        <button
          type="button"
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-extrabold text-content-secondary hover:text-ink hover:bg-paper transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          <span>Potrzebujesz pomocy?</span>
        </button>

        <div className="w-full flex items-center justify-between gap-2 p-2.5 rounded-2xl border-2 border-ink bg-white">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-sun border-2 border-ink flex items-center justify-center font-display font-extrabold text-xs text-ink shrink-0">
              {initials}
            </div>
            <div className="text-left truncate">
              <div className="text-xs font-extrabold text-ink truncate">
                {displayName}
              </div>
              <div className="text-[11px] font-bold text-content-muted truncate">
                {roleLabel}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onLogout}
            title="Wyloguj się"
            aria-label="Wyloguj się"
            className="w-9 h-9 rounded-xl bg-red-500 hover:bg-red-600 active:translate-y-0.5 text-white border-2 border-ink shadow-pop-sm flex items-center justify-center shrink-0 transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};