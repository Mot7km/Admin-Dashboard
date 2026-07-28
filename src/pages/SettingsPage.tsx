import { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { ShieldCheck, Zap, Printer, History, Check } from 'lucide-react';

const SettingsPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'plans' | 'profile' | 'audit'>('plans');

  // SaaS Plans Matrix Data
  const plans = [
    {
      name: 'Plan 1 — Starter QR Menu',
      price: '$29 / mo',
      isActive: false,
      features: ['Digital QR Menu', 'Bilingual Support', 'Customer Reviews Widget', '1 Branch Included'],
    },
    {
      name: 'Plan 2 — Ordering & POS Pro',
      price: '$79 / mo',
      isActive: true,
      features: ['All Starter Features', 'Live Kitchen KDS Display', 'Table Ordering & POS', '3 Branches Included'],
    },
    {
      name: 'Plan 3 — Operations Enterprise',
      price: '$149 / mo',
      isActive: false,
      features: ['All POS Features', 'Inventory & Recipe Links', 'Staff Attendance QR', 'Unlimited Branches'],
    },
  ];

  // Audit Logs Data
  const auditLogs = [
    { id: 1, action: 'Updated Dish Price (Smoked Truffle Burger -> $14.50)', user: 'Ahmed Hassan (Owner)', time: 'Today at 11:20 AM' },
    { id: 2, action: 'Marked Spanish Iced Latte as Sold Out', user: 'Mahmoud Ali (Cashier)', time: 'Today at 09:45 AM' },
    { id: 3, action: 'Generated Staff Attendance QR Code', user: 'Ahmed Hassan (Owner)', time: 'Yesterday at 04:15 PM' },
  ];

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {t('settings.title')}
          </h1>
          <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
            {t('settings.subtitle')}
          </p>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'plans'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Zap className="h-4 w-4" />
          <span>{t('settings.tabs.plans')}</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'profile'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Printer className="h-4 w-4" />
          <span>{t('settings.tabs.profile')}</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'audit'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <History className="h-4 w-4" />
          <span>{t('settings.tabs.auditLog')}</span>
        </button>
      </div>

      {/* TAB 1: SaaS Subscription Plans Matrix */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((p, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border p-6 shadow-lg space-y-4 flex flex-col justify-between relative ${
                  p.isActive
                    ? 'border-[var(--primary)] bg-[var(--card)] ring-2 ring-[var(--primary)]/30'
                    : 'border-[var(--color-border)] bg-[var(--card)]'
                }`}
              >
                {p.isActive && (
                  <span className="absolute -top-3 right-4 rounded-full bg-[var(--primary)] px-3 py-1 text-[10px] font-bold text-white shadow">
                    {t('settings.currentPlan')}
                  </span>
                )}
                <div className="space-y-2">
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">{p.name}</h3>
                  <div className="text-2xl font-extrabold text-[var(--primary)]">{p.price}</div>
                  <ul className="space-y-2 text-xs text-[var(--text-secondary)] pt-4 border-t border-[var(--color-border)]">
                    {p.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  className={`w-full mt-4 rounded-xl py-2.5 text-xs font-bold transition ${
                    p.isActive
                      ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20'
                      : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]'
                  }`}
                >
                  {p.isActive ? 'Active Plan' : t('settings.upgradeBtn')}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Profile & Printers */}
      {activeTab === 'profile' && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Thermal Receipt Printer Configuration</h2>
          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-[var(--text-secondary)]">Thermal Receipt Footer Text</label>
              <input
                type="text"
                defaultValue="Thank you for visiting Mot7km Restaurant! www.mot7km.com"
                className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium text-[var(--text-primary)] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Team Security Audit Log */}
      {activeTab === 'audit' && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
            <h2 className="text-base font-bold text-[var(--text-primary)]">{t('settings.auditTitle')}</h2>
            <ShieldCheck className="h-5 w-5 text-[var(--primary)]" />
          </div>

          <div className="space-y-3 text-xs">
            {auditLogs.map((log) => (
              <div key={log.id} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-3">
                <div>
                  <h4 className="font-bold text-[var(--text-primary)]">{log.action}</h4>
                  <p className="text-[11px] text-[var(--text-muted)]">By {log.user}</p>
                </div>
                <span className="text-[11px] text-[var(--text-muted)] font-mono">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
