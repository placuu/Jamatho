import { useState, useEffect, type FC } from 'react';
import { User, ShieldCheck, Link, Lock, Check, ArrowRight, ArrowLeft, RefreshCw, Eye } from 'lucide-react';
import { usersService, type UserProfile, type UpdateUserProfileDto } from '../services/usersService';

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const authHeaders = (): Record<string, string> => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

interface ProfilePageProps {
  onClose: () => void;
  onLogout?: () => void;
}

export const ProfilePage: FC<ProfilePageProps> = ({ onClose }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Tryb edycji danych osobowych
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<{ username: string; email: string }>({ username: '', email: '' });
  const [editError, setEditError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Hasło
  const [passwordValues, setPasswordValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Token dla rodzica
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);

  // Połączenie z kontem opiekuna
  const [linkCode, setLinkCode] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  const [linkError, setLinkError] = useState<string | null>(null);

  const initials = user?.username.slice(0, 2).toUpperCase() ?? '??';
  const isStudent = user?.role === 'Student';
  const roleLabel = isStudent ? 'Konto ucznia' : 'Konto rodzica';

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await usersService.getMe();
        setUser(data);
        setEditValues({ username: data.username, email: data.email });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Nie udało się wczytać profilu użytkownika.');
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditError(null);
    setSaveSuccess(false);
    setIsSaving(true);

    try {
      const dto: UpdateUserProfileDto = {};
      if (editValues.username !== user?.username) dto.username = editValues.username.trim();
      if (editValues.email !== user?.email) dto.email = editValues.email.trim();

      if (Object.keys(dto).length === 0) {
        setIsEditing(false);
        setIsSaving(false);
        return;
      }

      const updated = await usersService.updateMe(dto);
      setUser(updated);
      setEditValues({ username: updated.username, email: updated.email });

      // Synchronizacja z localStorage
      const saved = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          const merged = { ...parsed, username: updated.username, email: updated.email };
          const storage = localStorage.getItem('token') ? localStorage : sessionStorage;
          storage.setItem('user', JSON.stringify(merged));
        } catch {
          // ignore
        }
      }

      setSaveSuccess(true);
      setIsEditing(false);
    } catch (err) {
      setEditError(err instanceof Error ? err.message : 'Wystąpił błąd podczas zapisu.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditValues({ username: user?.username ?? '', email: user?.email ?? '' });
    setEditError(null);
    setIsEditing(false);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setIsChangingPassword(true);

    try {
      // Placeholder – endpoint zmiany hasła do zaimplementowania w backendzie
      await new Promise((resolve) => setTimeout(resolve, 800));
      setPasswordValues({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : 'Nie udało się zmienić hasła.');
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleGenerateInviteCode = async () => {
    setCodeError(null);
    setIsGeneratingCode(true);

    try {
      const response = await fetch(`${API_URL}/api/parentstudent/invite-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(),
        },
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Nie udało się wygenerować kodu zaproszenia.');
      }

      const data = await response.json();
      setGeneratedCode(data.code);
    } catch (err) {
      setCodeError(err instanceof Error ? err.message : 'Nie udało się wygenerować kodu.');
    } finally {
      setIsGeneratingCode(false);
    }
  };

  const handleLinkChild = async (e: React.FormEvent) => {
    e.preventDefault();
    setLinkError(null);
    setIsLinking(true);

    try {
      const response = await fetch(`${API_URL}/api/parentstudent/link`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...authHeaders(),
        },
        body: JSON.stringify({ code: linkCode.trim() }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Nie udało się połączyć kont.');
      }

      setLinkCode('');
    } catch (err) {
      setLinkError(err instanceof Error ? err.message : 'Nie udało się połączyć kont.');
    } finally {
      setIsLinking(false);
    }
  };

  const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'Brak danych';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Brak danych';
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-content-muted">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
        <p className="mt-4 text-sm font-extrabold">Ładowanie profilu…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="rounded-3xl border-2 border-ink bg-white p-8 text-center">
        <p className="text-sm font-extrabold text-ink">
          {error ?? 'Nie udało się wczytać profilu użytkownika.'}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-brand px-4 py-2 text-sm font-extrabold text-white hover:bg-brand-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Powrót
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Mój profil
          </h1>
          <p className="mt-2 text-sm font-bold text-content-secondary">
            Zarządzaj swoimi danymi, bezpieczeństwem konta oraz połączeniem z kontem rodzica.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-white px-4 py-2 text-sm font-extrabold text-ink shadow-pop-sm hover:bg-paper transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Powrót do pulpitu
        </button>
      </header>

      {/* ===================== LEWA KOLUMNA ===================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">

          {/* Karta użytkownika */}
          <section className="rounded-3xl border-[3px] border-ink bg-white shadow-pop p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-brand border-3 border-ink flex items-center justify-center font-display font-extrabold text-2xl text-white shadow-pop-sm">
                  {initials}
                </div>
                <div>
                  <h2 className="font-display text-2xl font-extrabold text-ink">
                    {user?.username ?? 'Użytkownik'}
                  </h2>
                  <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper px-3 py-1 text-[11px] font-extrabold text-ink">
                    {roleLabel} • Klasa 8
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-brand px-4 py-2 font-display font-extrabold text-sm text-white hover:bg-brand-hover transition-colors active:translate-y-0.5"
              >
                <User className="w-4 h-4" /> Edytuj dane
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                {isEditing ? (
                  <label htmlFor="profile-username" className="text-xs font-extrabold uppercase tracking-wider text-content-muted">
                    Imię i nazwisko
                  </label>
                ) : (
                  <span className="text-xs font-extrabold uppercase tracking-wider text-content-muted">
                    Imię i nazwisko
                  </span>
                )}
                {isEditing ? (
                  <input
                    id="profile-username"
                    name="username"
                    autoComplete="username"
                    type="text"
                    value={editValues.username}
                    onChange={(e) => setEditValues((prev) => ({ ...prev, username: e.target.value }))}
                    disabled={isSaving}
                    className="w-full h-12 px-4 rounded-xl border-2 border-ink bg-white text-ink font-bold focus:ring-0"
                  />
                ) : (
                  <div className="w-full h-12 px-4 rounded-xl border-2 border-ink bg-paper flex items-center text-ink font-bold">
                    {user?.username ?? '—'}
                  </div>
                )}
                {editError && <p className="text-xs font-bold text-red-600">{editError}</p>}
              </div>

              <div className="space-y-2">
                {isEditing ? (
                  <label htmlFor="profile-email" className="text-xs font-extrabold uppercase tracking-wider text-content-muted">
                    Adres e-mail
                  </label>
                ) : (
                  <span className="text-xs font-extrabold uppercase tracking-wider text-content-muted">
                    Adres e-mail
                  </span>
                )}
                {isEditing ? (
                  <input
                    id="profile-email"
                    name="email"
                    autoComplete="email"
                    type="email"
                    value={editValues.email}
                    onChange={(e) => setEditValues((prev) => ({ ...prev, email: e.target.value }))}
                    disabled={isSaving}
                    className="w-full h-12 px-4 rounded-xl border-2 border-ink bg-white text-ink font-bold focus:ring-0"
                  />
                ) : (
                  <div className="w-full h-12 px-4 rounded-xl border-2 border-ink bg-paper flex items-center text-ink font-bold">
                    {user?.email ?? '—'}
                  </div>
                )}
                {editError && <p className="text-xs font-bold text-red-600">{editError}</p>}
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-content-muted">
                  Data dołączenia do Yamatho
                </span>
                <div className="w-full h-12 px-4 rounded-xl border-2 border-ink bg-paper flex items-center text-ink font-bold">
                  {formatDate(user?.createdAt)}
                </div>
              </div>

              <div className="space-y-2 flex items-end">
                <span className="text-xs font-extrabold uppercase tracking-wider text-content-muted">
                  Status konta
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-mint bg-mint/10 px-3 py-1 text-[11px] font-extrabold text-emerald-700">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  Konto aktywne
                </span>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 pt-4 border-t-2 border-dashed border-border-light flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                  className="flex-1 rounded-xl border-2 border-ink bg-white px-4 py-2 font-display font-extrabold text-sm text-ink hover:bg-paper transition-colors disabled:opacity-60"
                >
                  Anuluj
                </button>
                <button
                  type="submit"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="flex-1 rounded-xl border-2 border-ink bg-brand px-4 py-2 font-display font-extrabold text-sm text-white hover:bg-brand-hover transition-colors disabled:opacity-60 active:translate-y-0.5"
                >
                  {isSaving ? 'Zapisywanie…' : 'Zapisz zmiany'}
                </button>
              </div>
            )}

            {saveSuccess && (
              <div className="mt-4 rounded-xl border-2 border-mint bg-mint/10 px-4 py-3 text-xs font-extrabold text-emerald-700 flex items-center gap-2">
                <Check className="w-4 h-4 stroke-[2.5]" />
                Dane zostały zaktualizowane pomyślnie.
              </div>
            )}
          </section>

          {/* Połączenie z kontem rodzica */}
          <section className="space-y-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-display text-xl font-extrabold text-ink">
                  Połączenie z kontem rodzica
                </h2>
                <p className="text-xs font-bold text-content-secondary">
                  Udostępnij swój postęp rodzicowi lub opiekunowi.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full border-2 border-ink bg-paper px-3 py-1 text-[11px] font-extrabold text-ink">
                Brak połączenia
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Karta 1: wygeneruj token */}
              <div className="rounded-3xl border-[2.5px] border-ink bg-white shadow-pop-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-xl border-2 border-ink bg-brand-light flex items-center justify-center font-display font-extrabold text-sm text-brand">
                    1
                  </span>
                  <h3 className="font-display font-extrabold text-lg text-ink">Wygeneruj token dla rodzica</h3>
                </div>
                <p className="text-xs sm:text-sm font-bold text-content-secondary leading-relaxed mb-4">
                  Utwórz jednorazowy kod i przekaż go rodzicowi, aby połączył Twoje konta. Kod ważny jest 24 godziny.
                </p>
                {generatedCode && (
                  <div className="mb-4 p-3 rounded-xl border-2 border-brand bg-brand-light text-center">
                    <span className="font-display font-extrabold text-brand">{generatedCode}</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleGenerateInviteCode}
                  disabled={isGeneratingCode}
                  className="w-full h-12 rounded-xl border-2 border-ink bg-brand font-display font-extrabold text-sm text-white hover:bg-brand-hover transition-colors disabled:opacity-60 active:translate-y-0.5"
                >
                  {isGeneratingCode ? 'Generowanie…' : 'Wygeneruj nowy token'}
                </button>
                {codeError && (
                  <p role="alert" className="mt-3 text-xs font-bold text-red-600">{codeError}</p>
                )}
              </div>

              {/* Karta 2: wpisz token od rodzica */}
              <div className="rounded-3xl border-[2.5px] border-ink bg-white shadow-pop-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-xl border-2 border-ink bg-brand-light flex items-center justify-center font-display font-extrabold text-sm text-brand">
                    2
                  </span>
                  <h3 className="font-display font-extrabold text-lg text-ink">Wpisz token od rodzica</h3>
                </div>
                <p className="text-xs sm:text-sm font-bold text-content-secondary leading-relaxed mb-4">
                  Masz już kod wygenerowany przez rodzica? Wpisz go poniżej, aby połączyć konta.
                </p>
                <form onSubmit={handleLinkChild} className="space-y-3">
                  <div>
                    <label htmlFor="link-code" className="block text-xs font-extrabold uppercase tracking-wider text-content-muted mb-1.5">
                      Kod połączenia (np. PAR-7319-AK)
                    </label>
                    <input
                      id="link-code"
                      name="code"
                      autoComplete="one-time-code"
                      type="text"
                      value={linkCode}
                      onChange={(e) => setLinkCode(e.target.value.toUpperCase())}
                      placeholder="PAR-7319-AK"
                      disabled={isLinking}
                      className="w-full h-12 px-4 rounded-xl border-2 border-ink bg-white text-ink font-bold focus:ring-0 uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLinking || !linkCode}
                    className="w-full h-12 rounded-xl border-2 border-ink bg-white font-display font-extrabold text-sm text-ink hover:bg-paper transition-colors disabled:opacity-60 active:translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    Połącz konto
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </form>
                {linkError && (
                  <p role="alert" className="mt-3 text-xs font-bold text-red-600">{linkError}</p>
                )}
              </div>
            </div>
          </section>

          {/* Połączenie konta opiekunów */}
          <section className="rounded-3xl border-[2.5px] border-dashed border-border-light bg-white p-6 sm:p-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <Link className="w-10 h-10 text-content-muted" />
              <h3 className="font-display font-extrabold text-lg text-ink">Połączenie konta opiekunów</h3>
              <p className="text-sm font-bold text-content-secondary max-w-xs">
                Nie masz powiązanych kont opiekunów. Skorzystaj z tokena powyżej, aby połączyć się z kontem rodzica.
              </p>
            </div>
          </section>

          {/* Bezpieczeństwo i hasło */}
          <section className="rounded-3xl border-[3px] border-ink bg-white shadow-pop p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Lock className="w-6 h-6 text-brand" />
                <h2 className="font-display text-xl font-extrabold text-ink">Bezpieczeństwo i hasło</h2>
              </div>
              <p className="text-xs font-bold text-content-muted">
                Zaktualizuj swoje hasło do logowania lub wyślij link resetujący na adres e-mail.
              </p>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label htmlFor="current-password" className="text-xs font-extrabold uppercase tracking-wider text-content-muted">
                    Obecne hasło
                  </label>
                  <div className="relative">
                    <input
                      id="current-password"
                      name="currentPassword"
                      autoComplete="current-password"
                      type="password"
                      value={passwordValues.currentPassword}
                      onChange={(e) =>
                        setPasswordValues((prev) => ({ ...prev, currentPassword: e.target.value }))
                      }
                      placeholder="Wpisz obecne hasło"
                      disabled={isChangingPassword}
                      className="w-full h-12 pl-4 pr-12 rounded-xl border-2 border-ink bg-white text-ink font-bold focus:ring-0"
                    />
                    <button
                      type="button"
                      aria-label="Pokaż/ukryj hasło"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-content-muted hover:text-ink"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="new-password" className="text-xs font-extrabold uppercase tracking-wider text-content-muted">
                    Nowe hasło
                  </label>
                  <input
                    id="new-password"
                    name="newPassword"
                    autoComplete="new-password"
                    type="password"
                    value={passwordValues.newPassword}
                    onChange={(e) =>
                      setPasswordValues((prev) => ({ ...prev, newPassword: e.target.value }))
                    }
                    placeholder="Minimum 8 znaków"
                    disabled={isChangingPassword}
                    className="w-full h-12 rounded-xl border-2 border-ink bg-white text-ink font-bold focus:ring-0"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirm-password" className="text-xs font-extrabold uppercase tracking-wider text-content-muted">
                    Powtórz nowe hasło
                  </label>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    autoComplete="new-password"
                    type="password"
                    value={passwordValues.confirmPassword}
                    onChange={(e) =>
                      setPasswordValues((prev) => ({ ...prev, confirmPassword: e.target.value }))
                    }
                    placeholder="Wpisz ponownie nowe hasło"
                    disabled={isChangingPassword}
                    className="w-full h-12 rounded-xl border-2 border-ink bg-white text-ink font-bold focus:ring-0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <label htmlFor="rule-min-length" className="flex items-center gap-2 cursor-select-none">
                  <input
                    id="rule-min-length"
                    name="ruleMinLength"
                    type="checkbox"
                    className="w-4 h-4 rounded accent-brand border-2 border-ink"
                    readOnly
                  />
                  <span className="font-extrabold text-ink">Minimum 8 znaków</span>
                </label>
                <label htmlFor="rule-has-digit" className="flex items-center gap-2 cursor-select-none">
                  <input
                    id="rule-has-digit"
                    name="ruleHasDigit"
                    type="checkbox"
                    className="w-4 h-4 rounded accent-brand border-2 border-ink"
                    readOnly
                  />
                  <span className="font-extrabold text-ink">Co najmniej jedna cyfra</span>
                </label>
                <label htmlFor="rule-passwords-match" className="flex items-center gap-2 cursor-select-none">
                  <input
                    id="rule-passwords-match"
                    name="rulePasswordsMatch"
                    type="checkbox"
                    className="w-4 h-4 rounded accent-brand border-2 border-ink"
                    readOnly
                  />
                  <span className="font-extrabold text-ink">Hasła są identyczne</span>
                </label>
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold text-brand cursor-pointer hover:underline">
                  Nie pamiętasz hasła? Wyślij link resetujący e-mailem
                </p>
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="rounded-xl border-2 border-ink bg-brand px-5 py-2.5 font-display font-extrabold text-sm text-white hover:bg-brand-hover transition-colors disabled:opacity-60 active:translate-y-0.5 flex items-center gap-2"
                >
                  Zresetuj i zapisz hasło
                  <RefreshCw className="w-4 h-4 stroke-[2.5]" />
                </button>
              </div>

              {passwordError && (
                <p role="alert" className="text-xs font-bold text-red-600">{passwordError}</p>
              )}
            </form>
          </section>

        </div>

        {/* ===================== PRAWA KOLUMNA ===================== */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Twoja nauka w skrócie */}
          <div className="rounded-3xl border-[3px] border-ink bg-white shadow-pop p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-extrabold text-ink">Twoja nauka w skrócie</h2>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-content-muted">
                Podsumowanie postępów
              </span>
            </div>

            <div className="mb-6">
              <div className="flex items-end justify-between mb-2">
                <span className="font-display text-4xl font-extrabold text-ink">60%</span>
                <span className="text-xs font-bold text-content-muted">29 z 48 lekcji</span>
              </div>
              <div className="w-full h-2 bg-paper rounded-full border border-ink overflow-hidden">
                <div className="h-full bg-brand rounded-full" style={{ width: '60%' }} />
              </div>
              <p className="text-xs font-bold text-content-secondary mt-2">
                Dobry rytm, tak trzymaj! Jeszcze 19 lekcji do końca planu.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-content-secondary">Seria systematycznej nauki</span>
                <span className="font-extrabold text-ink">5 dni z rzędu</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-content-secondary">Czas nauki w tym tygodniu</span>
                <span className="font-extrabold text-ink">85 / 100 min</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-content-secondary">Ostatni arkusz próbny</span>
                <span className="font-extrabold text-ink">80% (24/30 pkt)</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-content-secondary">Zapisane zadania</span>
                <span className="font-extrabold text-ink">12 zadań</span>
              </div>
            </div>
          </div>

          {/* Bezpieczeństwo konta */}
          <div className="rounded-3xl border-[2.5px] border-ink bg-sun/30 p-5 shadow-pop-sm">
            <div className="flex items-start gap-3 mb-4">
              <ShieldCheck className="w-5 h-5 text-brand shrink-0" />
              <div>
                <h3 className="font-display font-extrabold text-lg text-ink">Bezpieczeństwo konta</h3>
                <p className="text-xs font-bold text-content-secondary mt-1">
                  Token jest jednorazowy i wygasa automatycznie po 15 minutach od wygenerowania.
                </p>
              </div>
            </div>
            <ul className="space-y-3 text-xs font-bold text-ink">
              <li className="flex items-start gap-2">
                <span className="text-[10px] font-extrabold text-brand">•</span>
                Połączenie rodzi widzicie wyłączenie Twojej postaci i wykonki — nie ma dostępu do Twojego hasła ani budyniówów.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};
