import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Globe,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';

const LoginPage = () => {
  const { t, locale, toggleLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage(t('login.fillRequired'));
      return;
    }

    setIsLoading(true);

    // Simulate login API call and redirect to dashboard
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 800);
  };

  const handleFillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('mot7km2025');
  };

  return (
    <div className="min-h-screen w-screen bg-[var(--background)] text-[var(--text-primary)] flex flex-col justify-between overflow-x-hidden font-sans transition-colors duration-300">
      {/* Top Navigation Bar */}
      <header className="flex items-center justify-between p-4 sm:p-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 p-1.5 ring-1 ring-[var(--primary)]/20">
            <img
              src="/assets/logo/Mot7km_Logo.png"
              alt="Mot7km Logo"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight text-[var(--text-primary)]">
              Mot7km <span className="text-[var(--primary)] font-semibold">ERP</span>
            </span>
            <span className="text-[10px] font-medium text-[var(--text-muted)]">
              {t('layout.slogan')}
            </span>
          </div>
        </div>

        {/* Controls: Theme & Language */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--card)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] shadow-sm hover:border-[var(--primary)] hover:text-[var(--text-primary)] transition"
          >
            {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
            <span className="hidden sm:inline">{t('layout.theme')}</span>
          </button>

          <button
            onClick={toggleLocale}
            className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--card)] px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] shadow-sm hover:border-[var(--primary)] hover:text-[var(--text-primary)] transition"
          >
            <Globe className="h-4 w-4 text-[var(--primary)]" />
            <span>{t('layout.otherLanguage')}</span>
          </button>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md space-y-6">
          {/* Card Wrapper */}
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--card)] p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                {t('login.welcomeBack')}
              </h1>
              <p className="text-xs text-[var(--text-muted)] sm:text-sm">
                {t('login.subtitle')}
              </p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs font-semibold text-rose-500 text-center">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t('login.emailLabel')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('login.emailPlaceholder')}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] py-3 pl-10 pr-4 text-xs font-medium text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t('login.passwordLabel')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('login.passwordPlaceholder')}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] py-3 pl-10 pr-10 text-xs font-medium text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between pt-1 text-xs">
                <label className="flex items-center gap-2 text-[var(--text-secondary)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-[var(--color-border)] bg-[var(--surface)] text-[var(--primary)] focus:ring-0"
                  />
                  <span>{t('login.rememberMe')}</span>
                </label>

                <a href="#forgot" onClick={(e) => e.preventDefault()} className="font-semibold text-[var(--primary)] hover:underline">
                  {t('login.forgotPassword')}
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] py-3 text-xs font-bold text-white shadow-lg shadow-[var(--primary)]/25 hover:bg-[var(--primary-dark)] active:scale-[0.99] transition-all disabled:opacity-70"
              >
                {isLoading ? (
                  <span>{t('login.signingIn')}</span>
                ) : (
                  <>
                    <span>{t('login.submitButton')}</span>
                    {locale === 'ar' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Sign-in Helper */}
            <div className="pt-3 border-t border-[var(--color-border)] space-y-2">
              <span className="text-[11px] font-semibold text-[var(--text-muted)] block text-center">
                {t('login.demoAccount')}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleFillDemo('owner@mot7km.com')}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2 text-[11px] font-semibold text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition text-center"
                >
                  {t('login.ownerDemo')}
                </button>
                <button
                  type="button"
                  onClick={() => handleFillDemo('manager@mot7km.com')}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2 text-[11px] font-semibold text-[var(--text-secondary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition text-center"
                >
                  {t('login.managerDemo')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="p-4 text-center text-xs text-[var(--text-muted)]">
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-[var(--primary)]" />
          <span>Mot7km SaaS Platform &copy; 2026. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
