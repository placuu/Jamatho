import { useEffect, useState, type FC, type ReactNode } from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { Sidebar, type DashboardNavItem } from '../components/Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  activeNav: DashboardNavItem;
  displayName: string;
  roleLabel: string;
  streak: number;
  onNavigate: (item: DashboardNavItem) => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
}

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
  title,
  activeNav,
  displayName,
  roleLabel,
  streak,
  onNavigate,
  onLogout,
  onProfileClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Blokuje przewijanie strony pod mobilnym menu i przywraca pozycję po jego zamknięciu.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const scrollY = window.scrollY;
    const bodyStyles = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
    };

    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = bodyStyles.position;
      document.body.style.top = bodyStyles.top;
      document.body.style.width = bodyStyles.width;
      document.body.style.overflow = bodyStyles.overflow;
      window.scrollTo(0, scrollY);
    };
  }, [mobileMenuOpen]);

  const initials = displayName.slice(0, 2).toUpperCase();
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen w-full flex font-sans text-ink">
      {/* Stały pasek boczny na dużych ekranach. */}
      <aside className="hidden lg:block w-64 shrink-0 border-r-[3px] border-ink bg-white sticky top-0 h-screen">
        <Sidebar
          activeNav={activeNav}
          displayName={displayName}
          roleLabel={roleLabel}
          streak={streak}
          onNavigate={onNavigate}
          onClose={closeMobileMenu}
          onLogout={onLogout}
        />
      </aside>

      {/* Mobilne menu przewija się niezależnie od zablokowanej strony. */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <button
            type="button"
            className="fixed inset-0 bg-ink/40 backdrop-blur-xs"
            onClick={closeMobileMenu}
            aria-label="Zamknij menu"
          />
          <div className="relative w-72 max-w-[85vw] h-full overflow-y-auto overscroll-contain border-r-[3px] border-ink bg-white z-10">
            <Sidebar
              activeNav={activeNav}
              displayName={displayName}
              roleLabel={roleLabel}
              streak={streak}
              onNavigate={onNavigate}
              onClose={closeMobileMenu}
              onLogout={onLogout}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        {/* Wspólny nagłówek strony z przyciskiem mobilnego menu. */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b-[3px] border-ink px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl border-2 border-ink bg-paper text-ink"
              aria-label="Otwórz menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <span className="text-ink font-extrabold">{title}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:flex items-center">
              <Search className="w-4 h-4 text-content-muted absolute left-3.5 pointer-events-none" />
              <input
                id="global-search"
                name="search"
                aria-label="Szukaj tematu lub zadania"
                autoComplete="off"
                type="text"
                placeholder="Szukaj tematu lub zadania"
                className="w-64 xl:w-72 h-10 pl-10 pr-12 rounded-xl bg-paper border-2 border-ink text-xs font-bold text-ink placeholder:text-content-muted focus:outline-none focus:bg-white focus:shadow-pop-sm transition-all"
              />
            </div>

            <button
              type="button"
              className="relative w-10 h-10 rounded-xl border-2 border-ink bg-white hover:bg-paper flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Powiadomienia"
            >
              <Bell className="w-4 h-4 text-ink" />
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-pink border border-ink" />
            </button>

            <button
              type="button"
              onClick={onProfileClick}
              className="relative w-10 h-10 rounded-full border-2 border-ink bg-white hover:bg-paper flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Otwórz mój profil"
            >
              {initials}
            </button>
          </div>
        </header>

        {/* Zawartość strony jest przekazywana do layoutu jako children. */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
          {children}
        </main>
      </div>
    </div>
  );
};