import { useTranslation } from '../context/LanguageContext';
import { ShieldCheck, CreditCard } from 'lucide-react';

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          {t('nav.settings')}
        </h1>
        <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
          SaaS Subscription plan, business profile, system configurations, and notification preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-[var(--primary)]" />
            <h3 className="font-bold text-sm text-[var(--text-primary)]">Active SaaS Subscription Plan</h3>
          </div>
          <p className="text-xs text-[var(--text-muted)]">Current Plan: <span className="font-bold text-emerald-500">Plan 1 — Smart QR Menu Starter</span></p>
          <button className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow hover:bg-[var(--primary-dark)] transition">
            Upgrade to Plan 2 (Ordering + POS)
          </button>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-[var(--primary)]" />
            <h3 className="font-bold text-sm text-[var(--text-primary)]">Account Security & Roles</h3>
          </div>
          <p className="text-xs text-[var(--text-muted)]">Tenant ID: <span className="font-mono text-[var(--text-primary)]">MOT7KM-TENANT-8821</span></p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
