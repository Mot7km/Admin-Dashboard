import React, { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { useToast } from '../components/common/Toast';
import {
  Store,
  Zap,
  Printer,
  ShieldCheck,
  Check,
  Search,
  Building2,
  Clock,
  Share2,
  CreditCard,
  Download,
  Bell,
  Key,
  Copy,
  Mail,
  Phone,
  CheckCircle2,
  Send,
  Save,
  Server,
  FileText,
} from 'lucide-react';

interface AuditLog {
  id: number;
  action: string;
  user: string;
  type: 'price' | 'stock' | 'staff' | 'auth' | 'delete';
  time: string;
}

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'profile' | 'plans' | 'integrations' | 'audit'>('profile');

  // --- TAB 1: Profile Form State ---
  const [profileData, setProfileData] = useState({
    name: 'Mot7km Restaurant & Cafe',
    tagline: 'Authentic Gourmet & Specialty Coffee',
    phone: '+966 50 123 4567',
    email: 'contact@mot7km.com',
    website: 'https://www.mot7km.com',
    address: 'King Fahd Road, Olaya District, Building 402',
    cityCountry: 'Riyadh, Saudi Arabia',
    timezone: 'Asia/Riyadh (UTC+3)',
    currency: 'SAR — Saudi Riyal',
    taxRate: '15',
    instagram: '@mot7km_cafe',
    twitter: '@mot7km_sa',
    snapchat: 'mot7km.official',
    tiktok: '@mot7km_sa',
  });

  const [workingHours, setWorkingHours] = useState([
    { day: 'Sunday', isOpen: true, open: '10:00', close: '00:00' },
    { day: 'Monday', isOpen: true, open: '10:00', close: '00:00' },
    { day: 'Tuesday', isOpen: true, open: '10:00', close: '00:00' },
    { day: 'Wednesday', isOpen: true, open: '10:00', close: '00:00' },
    { day: 'Thursday', isOpen: true, open: '10:00', close: '01:00' },
    { day: 'Friday', isOpen: true, open: '13:00', close: '01:00' },
    { day: 'Saturday', isOpen: true, open: '10:00', close: '00:00' },
  ]);

  // --- TAB 2: Plans & Billing State ---
  const plans = [
    {
      id: 'p-1',
      name: 'Plan 1 — Starter QR Menu',
      price: '$29 / mo',
      isActive: false,
      features: ['Digital QR Menu', 'Bilingual Support', 'Customer Reviews Widget', '1 Branch Included'],
    },
    {
      id: 'p-2',
      name: 'Plan 2 — Ordering & POS Pro',
      price: '$79 / mo',
      isActive: true,
      features: ['All Starter Features', 'Live Kitchen KDS Display', 'Table Ordering & POS', '3 Branches Included'],
    },
    {
      id: 'p-3',
      name: 'Plan 3 — Operations Enterprise',
      price: '$149 / mo',
      isActive: false,
      features: ['All POS Features', 'Inventory & Recipe Links', 'Staff Attendance QR', 'Unlimited Branches'],
    },
  ];

  const invoices = [
    { id: 'INV-2025-003', date: 'Feb 01, 2025', amount: '$79.00', status: 'paid' },
    { id: 'INV-2025-002', date: 'Jan 01, 2025', amount: '$79.00', status: 'paid' },
    { id: 'INV-2024-012', date: 'Dec 01, 2024', amount: '$79.00', status: 'paid' },
  ];

  // --- TAB 3: Integrations & Printer State ---
  const [printerConfig, setPrinterConfig] = useState({
    name: 'Main Kitchen Thermal POS Printer #1',
    ipPort: '192.168.1.150 : 9100',
    paperWidth: '80mm',
    footerText: 'Thank you for visiting Mot7km Restaurant! www.mot7km.com',
  });

  const [notifications, setNotifications] = useState({
    emailNotif: true,
    smsNotif: true,
    pushNotif: true,
    dailySummary: false,
  });

  const [apiKey] = useState('sk_live_mot7km_9f8a3c4b5e6d7e8f9a0b1c2d3e4f5a6b');
  const [webhookUrl, setWebhookUrl] = useState('https://api.mot7km.com/v1/webhooks/orders');

  // --- TAB 4: Audit Logs State ---
  const [auditQuery, setAuditQuery] = useState('');
  const [auditTypeFilter, setAuditTypeFilter] = useState('all');

  const auditLogs: AuditLog[] = [
    { id: 1, action: 'Updated Dish Price (Smoked Truffle Burger -> $14.50)', user: 'Ahmed Hassan (Owner)', type: 'price', time: 'Today at 11:20 AM' },
    { id: 2, action: 'Marked Spanish Iced Latte as Sold Out', user: 'Mahmoud Ali (Cashier)', type: 'stock', time: 'Today at 09:45 AM' },
    { id: 3, action: 'Generated Staff Attendance QR Code', user: 'Ahmed Hassan (Owner)', type: 'staff', time: 'Yesterday at 04:15 PM' },
    { id: 4, action: 'Updated Thermal Receipt Footer Text', user: 'Sami Mansour (Manager)', type: 'price', time: 'Yesterday at 02:30 PM' },
    { id: 5, action: 'Added New Staff Account: Tariq Khaled (Kitchen Chef)', user: 'Ahmed Hassan (Owner)', type: 'staff', time: 'Feb 26, 2025 at 05:10 PM' },
    { id: 6, action: 'System Backup Completed & Cloud Sync Verified', user: 'System Auto-Task', type: 'auth', time: 'Feb 26, 2025 at 03:00 AM' },
    { id: 7, action: 'Adjusted Raw Material Recipe Deduction for Smoked Burger', user: 'Sami Mansour (Manager)', type: 'stock', time: 'Feb 25, 2025 at 01:20 PM' },
    { id: 8, action: 'User Login Session Started from IP 192.168.1.45', user: 'Mahmoud Ali (Cashier)', type: 'auth', time: 'Feb 25, 2025 at 08:00 AM' },
    { id: 9, action: 'Deleted Expired Promotional Banner from QR Simulator', user: 'Ahmed Hassan (Owner)', type: 'delete', time: 'Feb 24, 2025 at 06:45 PM' },
    { id: 10, action: 'Regenerated Developer API Webhook Key', user: 'Ahmed Hassan (Owner)', type: 'auth', time: 'Feb 24, 2025 at 11:15 AM' },
  ];

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch = log.action.toLowerCase().includes(auditQuery.toLowerCase()) || log.user.toLowerCase().includes(auditQuery.toLowerCase());
    const matchesType = auditTypeFilter === 'all' || log.type === auditTypeFilter;
    return matchesSearch && matchesType;
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(t('settings.profile.saveProfile'), 'success');
  };

  const handleSavePrinter = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(t('settings.integrations.savePrinter'), 'success');
  };

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    showToast('API Key copied to clipboard', 'info');
  };

  const getTypeBadge = (type: AuditLog['type']) => {
    switch (type) {
      case 'price':
        return <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500 ring-1 ring-emerald-500/20">Menu & Prices</span>;
      case 'stock':
        return <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-500 ring-1 ring-amber-500/20">Stock & Recipes</span>;
      case 'staff':
        return <span className="rounded-md bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-500 ring-1 ring-sky-500/20">Staff & Roles</span>;
      case 'auth':
        return <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-500 ring-1 ring-purple-500/20">Auth & Security</span>;
      case 'delete':
        return <span className="rounded-md bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-500 ring-1 ring-rose-500/20">Deletion</span>;
      default:
        return null;
    }
  };

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

      {/* 4 Main Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'profile'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Store className="h-4 w-4" />
          <span>{t('settings.tabs.profile')}</span>
        </button>

        <button
          onClick={() => setActiveTab('plans')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'plans'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Zap className="h-4 w-4" />
          <span>{t('settings.tabs.plans')}</span>
        </button>

        <button
          onClick={() => setActiveTab('integrations')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'integrations'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Printer className="h-4 w-4" />
          <span>{t('settings.tabs.integrations')}</span>
        </button>

        <button
          onClick={() => setActiveTab('audit')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition whitespace-nowrap ${
            activeTab === 'audit'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>{t('settings.tabs.auditLog')}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: RESTAURANT PROFILE & IDENTITY */}
      {/* ========================================================================= */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Identity Card */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-6">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
              <Store className="h-5 w-5 text-[var(--primary)]" />
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                {t('settings.profile.identityTitle')}
              </h2>
            </div>

            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              {/* Logo Asset Card */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] shrink-0">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--primary)]/10 p-3 ring-1 ring-[var(--primary)]/20 shadow">
                  <img
                    src="/assets/logo/Mot7km_Logo.png"
                    alt="Mot7km Logo"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">Mot7km ERP Official Logo</h3>
                  <p className="text-xs text-[var(--text-muted)]">assets/logo/Mot7km_Logo.png</p>
                  <span className="inline-block rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                    Active System Asset
                  </span>
                </div>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">
                    {t('settings.profile.restName')}
                  </label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">
                    {t('settings.profile.tagline')}
                  </label>
                  <input
                    type="text"
                    value={profileData.tagline}
                    onChange={(e) => setProfileData({ ...profileData, tagline: e.target.value })}
                    className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">
                    {t('settings.profile.phone')}
                  </label>
                  <div className="relative mt-1.5">
                    <Phone className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] py-2.5 pl-9 pr-3 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[var(--text-secondary)]">
                    {t('settings.profile.email')}
                  </label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] py-2.5 pl-9 pr-3 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Regional Settings */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
              <Building2 className="h-5 w-5 text-[var(--primary)]" />
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                {t('settings.profile.locationTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t('settings.profile.address')}
                </label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t('settings.profile.cityCountry')}
                </label>
                <input
                  type="text"
                  value={profileData.cityCountry}
                  onChange={(e) => setProfileData({ ...profileData, cityCountry: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t('settings.profile.timezone')}
                </label>
                <select
                  value={profileData.timezone}
                  onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                >
                  <option value="Asia/Riyadh (UTC+3)">Asia/Riyadh (UTC+3)</option>
                  <option value="Asia/Dubai (UTC+4)">Asia/Dubai (UTC+4)</option>
                  <option value="Africa/Cairo (UTC+2)">Africa/Cairo (UTC+2)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t('settings.profile.currency')}
                </label>
                <select
                  value={profileData.currency}
                  onChange={(e) => setProfileData({ ...profileData, currency: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                >
                  <option value="SAR — Saudi Riyal">SAR — Saudi Riyal (ر.س)</option>
                  <option value="USD — US Dollar">USD — US Dollar ($)</option>
                  <option value="AED — UAE Dirham">AED — UAE Dirham (د.إ)</option>
                  <option value="EGP — Egyptian Pound">EGP — Egyptian Pound (ج.م)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t('settings.profile.taxRate')}
                </label>
                <input
                  type="number"
                  value={profileData.taxRate}
                  onChange={(e) => setProfileData({ ...profileData, taxRate: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Working Hours Schedule Grid */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
              <Clock className="h-5 w-5 text-[var(--primary)]" />
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                {t('settings.profile.hoursTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {workingHours.map((item, idx) => (
                <div
                  key={item.day}
                  className="flex flex-col justify-between rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[var(--text-primary)]">{item.day}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...workingHours];
                        updated[idx].isOpen = !updated[idx].isOpen;
                        setWorkingHours(updated);
                      }}
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold transition ${
                        item.isOpen
                          ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20'
                      }`}
                    >
                      {item.isOpen ? t('settings.profile.open') : t('settings.profile.closed')}
                    </button>
                  </div>

                  {item.isOpen ? (
                    <div className="flex items-center gap-1.5 text-xs">
                      <input
                        type="time"
                        value={item.open}
                        onChange={(e) => {
                          const updated = [...workingHours];
                          updated[idx].open = e.target.value;
                          setWorkingHours(updated);
                        }}
                        className="rounded-lg border border-[var(--color-border)] bg-[var(--card)] px-1.5 py-1 text-[11px] font-medium"
                      />
                      <span className="text-[var(--text-muted)]">-</span>
                      <input
                        type="time"
                        value={item.close}
                        onChange={(e) => {
                          const updated = [...workingHours];
                          updated[idx].close = e.target.value;
                          setWorkingHours(updated);
                        }}
                        className="rounded-lg border border-[var(--color-border)] bg-[var(--card)] px-1.5 py-1 text-[11px] font-medium"
                      />
                    </div>
                  ) : (
                    <span className="text-[11px] text-[var(--text-muted)] italic">Day Off / Closed</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Social Profiles */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
              <Share2 className="h-5 w-5 text-[var(--primary)]" />
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                {t('settings.profile.socialTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Instagram Handle</label>
                <input
                  type="text"
                  value={profileData.instagram}
                  onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Twitter / X Handle</label>
                <input
                  type="text"
                  value={profileData.twitter}
                  onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Snapchat Username</label>
                <input
                  type="text"
                  value={profileData.snapchat}
                  onChange={(e) => setProfileData({ ...profileData, snapchat: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">TikTok Handle</label>
                <input
                  type="text"
                  value={profileData.tiktok}
                  onChange={(e) => setProfileData({ ...profileData, tiktok: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 font-bold text-white shadow-lg hover:bg-[var(--primary-dark)] transition"
            >
              <Save className="h-4 w-4" />
              <span>{t('settings.profile.saveProfile')}</span>
            </button>
          </div>
        </form>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SAAS SUBSCRIPTION & BILLING */}
      {/* ========================================================================= */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          {/* Resource Usage Meters */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              {t('settings.plans.usageTitle')}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[var(--text-secondary)]">{t('settings.plans.branchesUsed')}</span>
                  <span className="text-[var(--primary)] font-bold">2 / 3</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div className="h-full bg-[var(--primary)] w-[66%]" />
                </div>
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[var(--text-secondary)]">{t('settings.plans.staffUsed')}</span>
                  <span className="text-[var(--primary)] font-bold">8 / 15</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div className="h-full bg-[var(--primary)] w-[53%]" />
                </div>
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[var(--text-secondary)]">{t('settings.plans.scansUsed')}</span>
                  <span className="text-[var(--primary)] font-bold">4,200 / 10,000</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div className="h-full bg-emerald-500 w-[42%]" />
                </div>
              </div>

              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-4 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-[var(--text-secondary)]">{t('settings.plans.storageUsed')}</span>
                  <span className="text-[var(--primary)] font-bold">1.2 GB / 5 GB</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
                  <div className="h-full bg-sky-500 w-[24%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Subscription Tiers */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <div
                key={p.id}
                className={`rounded-2xl border p-6 shadow-lg space-y-4 flex flex-col justify-between relative ${
                  p.isActive
                    ? 'border-[var(--primary)] bg-[var(--card)] ring-2 ring-[var(--primary)]/30'
                    : 'border-[var(--color-border)] bg-[var(--card)]'
                }`}
              >
                {p.isActive && (
                  <span className="absolute -top-3 right-4 rounded-full bg-[var(--primary)] px-3 py-1 text-[10px] font-bold text-white shadow">
                    {t('settings.plans.currentPlan')}
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
                  type="button"
                  onClick={() =>
                    showToast(
                      `${p.name}: ${p.isActive ? t('settings.plans.currentPlan') : t('settings.plans.upgradeBtn')}`,
                      'info'
                    )
                  }
                  className={`w-full mt-4 rounded-xl py-2.5 text-xs font-bold transition ${
                    p.isActive
                      ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20 cursor-default'
                      : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] shadow-md'
                  }`}
                >
                  {p.isActive ? t('settings.plans.currentPlan') : t('settings.plans.upgradeBtn')}
                </button>
              </div>
            ))}
          </div>

          {/* Billing & Invoice Details */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Billing Card */}
            <div className="lg:col-span-5 rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
                <CreditCard className="h-5 w-5 text-[var(--primary)]" />
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  {t('settings.plans.billingTitle')}
                </h2>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[var(--color-border)]">
                  <span className="text-[var(--text-muted)]">{t('settings.plans.currentCycle')}</span>
                  <span className="font-semibold text-[var(--text-primary)]">Feb 01 → Feb 28, 2025</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--color-border)]">
                  <span className="text-[var(--text-muted)]">{t('settings.plans.nextPayment')}</span>
                  <span className="font-semibold text-[var(--text-primary)]">March 01, 2025</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[var(--color-border)]">
                  <span className="text-[var(--text-muted)]">{t('settings.plans.paymentMethod')}</span>
                  <span className="font-semibold text-[var(--text-primary)]">Visa ending in •••• 4242</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[var(--text-muted)]">{t('settings.plans.monthlyCost')}</span>
                  <span className="font-bold text-[var(--primary)] text-sm">$79.00 / mo</span>
                </div>
              </div>
            </div>

            {/* Invoices Table */}
            <div className="lg:col-span-7 rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
              <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
                <FileText className="h-5 w-5 text-[var(--primary)]" />
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  {t('settings.plans.invoicesTitle')}
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[var(--color-border)] text-[var(--text-muted)]">
                      <th className="py-2">{t('settings.plans.invNumber')}</th>
                      <th className="py-2">{t('settings.plans.invDate')}</th>
                      <th className="py-2">{t('settings.plans.invAmount')}</th>
                      <th className="py-2">{t('settings.plans.invStatus')}</th>
                      <th className="py-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-[var(--surface)] transition">
                        <td className="py-2.5 font-bold font-mono text-[var(--text-primary)]">{inv.id}</td>
                        <td className="py-2.5 text-[var(--text-secondary)]">{inv.date}</td>
                        <td className="py-2.5 font-semibold text-[var(--text-primary)]">{inv.amount}</td>
                        <td className="py-2.5">
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                            <CheckCircle2 className="h-3 w-3" />
                            {t('settings.plans.paid')}
                          </span>
                        </td>
                        <td className="py-2.5 text-right">
                          <button
                            type="button"
                            onClick={() => showToast(`Downloaded Invoice ${inv.id}`, 'info')}
                            className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-[var(--primary)] hover:bg-[var(--primary)]/10 transition"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>{t('settings.plans.downloadPdf')}</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PRINTERS & INTEGRATIONS */}
      {/* ========================================================================= */}
      {activeTab === 'integrations' && (
        <div className="space-y-6">
          {/* Thermal Receipt Printer Form */}
          <form onSubmit={handleSavePrinter} className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
              <Printer className="h-5 w-5 text-[var(--primary)]" />
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                {t('settings.integrations.printerTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t('settings.integrations.printerName')}
                </label>
                <input
                  type="text"
                  value={printerConfig.name}
                  onChange={(e) => setPrinterConfig({ ...printerConfig, name: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t('settings.integrations.printerIp')}
                </label>
                <div className="relative mt-1.5">
                  <Server className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
                  <input
                    type="text"
                    value={printerConfig.ipPort}
                    onChange={(e) => setPrinterConfig({ ...printerConfig, ipPort: e.target.value })}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] py-2.5 pl-9 pr-3 text-xs font-mono font-medium focus:border-[var(--primary)] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t('settings.integrations.paperWidth')}
                </label>
                <select
                  value={printerConfig.paperWidth}
                  onChange={(e) => setPrinterConfig({ ...printerConfig, paperWidth: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                >
                  <option value="80mm">80mm (Standard POS Thermal)</option>
                  <option value="58mm">58mm (Compact Portable Thermal)</option>
                </select>
              </div>

              <div className="sm:col-span-3">
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t('settings.integrations.footerTextLabel')}
                </label>
                <input
                  type="text"
                  value={printerConfig.footerText}
                  onChange={(e) => setPrinterConfig({ ...printerConfig, footerText: e.target.value })}
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => showToast('Test receipt sent to printer', 'info')}
                className="flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--elevated)] transition"
              >
                <Send className="h-3.5 w-3.5 text-[var(--primary)]" />
                <span>{t('settings.integrations.testPrint')}</span>
              </button>

              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-[var(--primary-dark)] transition"
              >
                <Save className="h-3.5 w-3.5" />
                <span>{t('settings.integrations.savePrinter')}</span>
              </button>
            </div>
          </form>

          {/* Notifications Preferences */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
              <Bell className="h-5 w-5 text-[var(--primary)]" />
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                {t('settings.integrations.notifTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] bg-[var(--surface)]">
                <span className="text-xs font-medium text-[var(--text-primary)]">
                  {t('settings.integrations.emailNotif')}
                </span>
                <input
                  type="checkbox"
                  checked={notifications.emailNotif}
                  onChange={(e) => setNotifications({ ...notifications, emailNotif: e.target.checked })}
                  className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] bg-[var(--surface)]">
                <span className="text-xs font-medium text-[var(--text-primary)]">
                  {t('settings.integrations.smsNotif')}
                </span>
                <input
                  type="checkbox"
                  checked={notifications.smsNotif}
                  onChange={(e) => setNotifications({ ...notifications, smsNotif: e.target.checked })}
                  className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] bg-[var(--surface)]">
                <span className="text-xs font-medium text-[var(--text-primary)]">
                  {t('settings.integrations.pushNotif')}
                </span>
                <input
                  type="checkbox"
                  checked={notifications.pushNotif}
                  onChange={(e) => setNotifications({ ...notifications, pushNotif: e.target.checked })}
                  className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] bg-[var(--surface)]">
                <span className="text-xs font-medium text-[var(--text-primary)]">
                  {t('settings.integrations.dailySummary')}
                </span>
                <input
                  type="checkbox"
                  checked={notifications.dailySummary}
                  onChange={(e) => setNotifications({ ...notifications, dailySummary: e.target.checked })}
                  className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
              </div>
            </div>
          </div>

          {/* API Keys & Webhooks */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
            <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
              <Key className="h-5 w-5 text-[var(--primary)]" />
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                {t('settings.integrations.apiTitle')}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t('settings.integrations.apiKeyLabel')}
                </label>
                <div className="flex items-center gap-2 mt-1.5">
                  <input
                    type="password"
                    readOnly
                    value={apiKey}
                    className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-mono text-xs text-[var(--text-primary)] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleCopyApiKey}
                    className="flex items-center gap-1 shrink-0 rounded-xl bg-[var(--primary)]/10 px-3 py-2.5 text-xs font-bold text-[var(--primary)] hover:bg-[var(--primary)]/20 transition"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    <span>{t('settings.integrations.copyKey')}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">
                  {t('settings.integrations.webhookUrl')}
                </label>
                <input
                  type="text"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-mono text-xs text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: SECURITY AUDIT LOG */}
      {/* ========================================================================= */}
      {activeTab === 'audit' && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-[var(--color-border)]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[var(--primary)]" />
              <h2 className="text-base font-bold text-[var(--text-primary)]">
                {t('settings.audit.title')}
              </h2>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <select
                value={auditTypeFilter}
                onChange={(e) => setAuditTypeFilter(e.target.value)}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold focus:outline-none"
              >
                <option value="all">{t('settings.audit.filterActionType')}</option>
                <option value="price">{t('settings.audit.filterPrice')}</option>
                <option value="stock">{t('settings.audit.filterStock')}</option>
                <option value="staff">{t('settings.audit.filterStaff')}</option>
                <option value="auth">{t('settings.audit.filterAuth')}</option>
                <option value="delete">{t('settings.audit.filterDelete')}</option>
              </select>

              <div className="relative w-full sm:w-56">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
                <input
                  type="text"
                  value={auditQuery}
                  onChange={(e) => setAuditQuery(e.target.value)}
                  placeholder={t('settings.audit.searchPlaceholder')}
                  className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] py-1.5 pl-8 pr-3 text-xs font-medium focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Log Entries List */}
          <div className="space-y-2.5 text-xs">
            {filteredLogs.length === 0 ? (
              <p className="text-center py-8 text-[var(--text-muted)]">{t('common.noResults')}</p>
            ) : (
              filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex flex-col gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-3 sm:flex-row sm:items-center sm:justify-between hover:border-[var(--primary)]/30 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--card)] font-bold text-[var(--primary)] ring-1 ring-[var(--color-border)]">
                      {log.user.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-[var(--text-primary)]">{log.action}</h4>
                        {getTypeBadge(log.type)}
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] mt-0.5">By {log.user}</p>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-[var(--text-muted)] whitespace-nowrap self-end sm:self-auto">
                    {log.time}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
