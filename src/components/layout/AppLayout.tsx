import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from '../../context/LanguageContext';
import Footer from './Footer';
import {
  Menu as MenuIcon,
  X,
  LayoutDashboard,
  Utensils,
  Store,
  ShoppingBag,
  Users,
  Boxes,
  Settings,
  Sun,
  Moon,
  Globe,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

const AppLayout = () => {
  const { t, locale, toggleLocale } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { to: '/', labelKey: 'nav.dashboard', icon: LayoutDashboard },
    { to: '/menu', labelKey: 'nav.menu', icon: Utensils },
    { to: '/branches', labelKey: 'nav.branches', icon: Store },
    { to: '/orders', labelKey: 'nav.orders', icon: ShoppingBag },
    { to: '/employees', labelKey: 'nav.employees', icon: Users },
    { to: '/inventory', labelKey: 'nav.inventory', icon: Boxes },
    { to: '/settings', labelKey: 'nav.settings', icon: Settings },
  ];

  const closeMobileSidebar = () => setMobileSidebarOpen(false);

  return (
    <div className="h-screen w-screen overflow-hidden bg-[var(--background)] text-[var(--text-primary)] flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--surface)]/90 px-4 py-3 backdrop-blur-md lg:hidden shrink-0">
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--elevated)]"
          aria-label="Toggle mobile menu"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-2">
          <img
            src="/assets/logo/Mot7km_Logo.png"
            alt="Mot7km Logo"
            className="h-7 w-auto object-contain"
          />
          <span className="text-base font-bold tracking-tight text-[var(--text-primary)]">
            Mot7km <span className="text-[var(--primary)] font-semibold">ERP</span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-[var(--text-primary)]"
            title={t('layout.theme')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={toggleLocale}
            className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-[var(--text-primary)]"
            title={t('layout.language')}
          >
            <Globe className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar: Fixed height 100vh on Desktop */}
      <aside
        className={`fixed inset-y-0 z-50 flex flex-col border-e border-[var(--color-border)] bg-[var(--surface)] p-4 transition-all duration-300 ease-in-out lg:static lg:z-auto lg:h-screen lg:shrink-0 lg:overflow-y-auto hide-scrollbar ${
          locale === 'ar' ? 'right-0' : 'left-0'
        } ${
          mobileSidebarOpen ? 'translate-x-0 w-[260px]' : (locale === 'ar' ? 'translate-x-full' : '-translate-x-full') + ' lg:translate-x-0'
        } ${isCollapsed ? 'lg:w-[76px] lg:px-2.5' : 'lg:w-[260px] lg:px-4'}`}
      >
        {/* Brand Area */}
        <div className="flex items-center justify-between pb-5 pt-1 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--primary)]/10 p-1.5 ring-1 ring-[var(--primary)]/20">
              <img
                src="/assets/logo/Mot7km_Logo.png"
                alt="Mot7km Logo"
                className="h-full w-full object-contain"
              />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-base font-bold tracking-tight text-[var(--text-primary)]">
                  Mot7km <span className="text-[var(--primary)] font-semibold">ERP</span>
                </span>
                <span className="text-[10px] font-medium text-[var(--text-muted)] truncate">
                  {t('layout.slogan')}
                </span>
              </div>
            )}
          </div>

          {/* Collapse Toggle Button (Desktop) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden rounded-lg p-1.5 text-[var(--text-muted)] transition hover:bg-[var(--elevated)] hover:text-[var(--text-primary)] lg:flex"
            title={isCollapsed ? t('layout.expandSidebar') : t('layout.collapseSidebar')}
          >
            {isCollapsed ? (
              <PanelLeftOpen className={`h-5 w-5 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            ) : (
              <PanelLeftClose className={`h-5 w-5 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            )}
          </button>

          {/* Close Mobile Sidebar */}
          <button
            onClick={closeMobileSidebar}
            className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--elevated)] lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="mt-2 flex flex-1 flex-col gap-1.5 overflow-y-auto hide-scrollbar" aria-label="Main Navigation">
          {navItems.map((item) => {
            const label = t(item.labelKey);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={closeMobileSidebar}
                title={isCollapsed ? label : undefined}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200 ${
                    isCollapsed ? 'justify-center px-0' : ''
                  } ${
                    isActive
                      ? 'bg-[var(--elevated)] text-[var(--text-primary)] shadow-sm ring-1 ring-[var(--color-border)]'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--elevated)]/60 hover:text-[var(--text-primary)]'
                  }`
                }
              >
                <item.icon className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105" />
                {!isCollapsed && <span className="truncate">{label}</span>}
                {isCollapsed && (
                  <div className={`pointer-events-none absolute hidden rounded-md bg-[var(--card)] px-2.5 py-1 text-xs font-semibold text-[var(--text-primary)] shadow-lg ring-1 ring-[var(--color-border)] group-hover:block ${
                    locale === 'ar' ? 'right-full mr-3' : 'left-full ml-3'
                  }`}>
                    {label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* User Profile & Footer Controls */}
        <div className="mt-auto border-t border-[var(--color-border)] pt-4 shrink-0">
          <div
            className={`flex items-center gap-3 rounded-xl bg-[var(--elevated)]/50 p-2.5 ring-1 ring-[var(--color-border)] ${
              isCollapsed ? 'justify-center p-1.5' : ''
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Alex Morgan"
              className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-[var(--primary)]/30"
            />
            {!isCollapsed && (
              <div className="flex flex-1 flex-col truncate">
                <span className="truncate text-sm font-semibold text-[var(--text-primary)]">
                  Alex Morgan
                </span>
                <span className="text-xs text-[var(--text-muted)]">{t('layout.admin')}</span>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <div className="mt-3 flex items-center justify-between px-1">
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[var(--text-secondary)] transition hover:bg-[var(--elevated)] hover:text-[var(--text-primary)]"
              >
                {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                <span>{t('layout.theme')}</span>
              </button>
              <button
                onClick={toggleLocale}
                className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-[var(--text-secondary)] transition hover:bg-[var(--elevated)] hover:text-[var(--text-primary)]"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{locale === 'ar' ? 'English' : 'العربية'}</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col scroll-smooth">
        <main className="flex-1 p-4 sm:p-6 lg:p-7">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;