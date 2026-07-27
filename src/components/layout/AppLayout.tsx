import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../context/LanguageContext';
import Footer from './Footer';
import {
  Menu,
  X,
  Home,
  LayoutDashboard,
  Sun,
  Moon,
  Globe,
} from 'lucide-react';

const AppLayout = () => {
  const { t, locale, toggleLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { to: '/', label: t('nav.home'), icon: Home },
    { to: '/mock', label: t('nav.mock'), icon: LayoutDashboard },
  ];

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text-primary)] transition-colors duration-200 lg:grid lg:grid-cols-[280px_1fr]">
      {/* Mobile Header (visible only on small screens) */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)]/80 px-4 py-3 backdrop-blur-md lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 hover:bg-[var(--color-primary-50)]"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5 text-[var(--color-text-primary)]" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-[var(--color-primary)]">
            {t('layout.brand')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 hover:bg-[var(--color-primary-50)]"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-[var(--color-text-secondary)]" />
            ) : (
              <Moon className="h-4 w-4 text-[var(--color-text-secondary)]" />
            )}
          </button>
          <button
            onClick={toggleLocale}
            className="rounded-lg p-2 hover:bg-[var(--color-primary-50)]"
            aria-label="Toggle language"
          >
            <Globe className="h-4 w-4 text-[var(--color-text-secondary)]" />
          </button>
        </div>
      </header>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - on desktop it's static (no transform), on mobile it slides */}
      <aside
        className={`glass-card fixed inset-y-0 left-0 z-50 w-[280px] border-r border-[var(--color-border)] bg-[var(--color-surface)] p-6 transition-transform duration-300 ease-in-out lg:static lg:z-auto lg:min-h-screen lg:translate-x-0 lg:rounded-none lg:border-r lg:bg-[var(--color-surface)] lg:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col justify-between">
          {/* Brand Area */}
          <div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-text-muted)]">
                  {t('layout.brandLabel')}
                </p>
                <h2 className="mt-1 text-2xl font-bold gradient-text">
                  {t('layout.brand')}
                </h2>
                <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                  {t('layout.tagline')}
                </p>
              </div>
              <button
                onClick={closeSidebar}
                className="rounded-lg p-2 hover:bg-[var(--color-primary-50)] lg:hidden"
              >
                <X className="h-5 w-5 text-[var(--color-text-primary)]" />
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />

            {/* Navigation */}
            <nav className="flex flex-col gap-1" aria-label="Primary navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-[var(--color-primary)] text-[var(--color-text-on-primary)] shadow-glow-primary active'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-primary)]'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  <span>{item.label}</span>
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-white/70 opacity-0 transition-opacity group-[.active]:opacity-100" />
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Bottom Controls */}
          <div className="space-y-2 border-t border-[var(--color-border)] pt-4">
            <button
              onClick={toggleTheme}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-primary)]"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              <span>{t('layout.theme')}</span>
            </button>
            <button
              onClick={toggleLocale}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition hover:bg-[var(--color-primary-50)] hover:text-[var(--color-text-primary)]"
            >
              <Globe className="h-4 w-4" />
              <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - on desktop it sits next to the sidebar, on mobile it's full width */}
      <div className="flex min-h-screen flex-col lg:col-start-2">
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;