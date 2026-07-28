import { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Store, MapPin, Phone, Clock, Plus, Check, X, ShieldCheck } from 'lucide-react';

const BranchesPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'locations' | 'matrix' | 'hours'>('locations');

  // Branch data matching Mot7km ERP
  const branches = [
    {
      id: 'b-1',
      name: 'Main Branch — Downtown',
      status: 'Operational',
      statusColor: 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/20',
      address: 'Downtown, 15 El-Tahrir Square, Cairo',
      phone: '+20 100 123 4567',
      hours: '10:00 AM - 02:00 AM',
      todaySales: '$2,450',
      activeCashiers: 3,
      topDishKey: 'dashboard.products.truffleBurger',
    },
    {
      id: 'b-2',
      name: 'Mall Branch — Sheikh Zayed',
      status: 'Busy Peak Hours',
      statusColor: 'bg-amber-500/10 text-amber-500 ring-amber-500/20',
      address: 'Arkan Plaza, Sheikh Zayed, Giza',
      phone: '+20 101 987 6543',
      hours: '11:00 AM - 12:00 AM',
      todaySales: '$1,980',
      activeCashiers: 2,
      topDishKey: 'dashboard.products.icedLatte',
    },
  ];

  // Dish Availability Matrix
  const [matrix, setMatrix] = useState([
    { dishKey: 'dashboard.products.truffleBurger', mainBranch: true, mallBranch: true },
    { dishKey: 'dashboard.products.icedLatte', mainBranch: true, mallBranch: true },
    { dishKey: 'dashboard.products.margheritaPizza', mainBranch: true, mallBranch: false },
    { dishKey: 'dashboard.products.crispyChicken', mainBranch: false, mallBranch: true },
  ]);

  const toggleMatrix = (idx: number, branchKey: 'mainBranch' | 'mallBranch') => {
    const updated = [...matrix];
    updated[idx][branchKey] = !updated[idx][branchKey];
    setMatrix(updated);
  };

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {t('branches.title')}
          </h1>
          <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
            {t('branches.subtitle')}
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[var(--primary-dark)] transition">
          <Plus className="h-4 w-4" />
          <span>+ Add New Branch</span>
        </button>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('locations')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'locations'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Store className="h-4 w-4" />
          <span>{t('branches.tabs.locations')}</span>
        </button>

        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'matrix'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>{t('branches.tabs.availabilityMatrix')}</span>
        </button>

        <button
          onClick={() => setActiveTab('hours')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'hours'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>{t('branches.tabs.workingHours')}</span>
        </button>
      </div>

      {/* TAB 1: Branch Locations & Cards */}
      {activeTab === 'locations' && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {branches.map((b) => (
            <div key={b.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] font-bold">
                    <Store className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[var(--text-primary)]">{b.name}</h3>
                    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ring-1 mt-1 ${b.statusColor}`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[var(--text-muted)] shrink-0" />
                  <span>{b.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[var(--text-muted)] shrink-0" />
                  <span>{b.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[var(--text-muted)] shrink-0" />
                  <span>{b.hours}</span>
                </div>
              </div>

              {/* Branch Quick Stats Bar */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--color-border)] text-center text-xs">
                <div className="rounded-xl bg-[var(--surface)] p-2">
                  <span className="text-[10px] text-[var(--text-muted)] block">Today Sales</span>
                  <strong className="text-[var(--primary)] font-extrabold">{b.todaySales}</strong>
                </div>
                <div className="rounded-xl bg-[var(--surface)] p-2">
                  <span className="text-[10px] text-[var(--text-muted)] block">Active POS</span>
                  <strong className="text-[var(--text-primary)] font-bold">{b.activeCashiers} Cashiers</strong>
                </div>
                <div className="rounded-xl bg-[var(--surface)] p-2">
                  <span className="text-[10px] text-[var(--text-muted)] block">Top Dish</span>
                  <strong className="text-amber-500 font-bold truncate block">{t(b.topDishKey)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: Branch Dish Availability Matrix */}
      {activeTab === 'matrix' && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">{t('branches.matrixTitle')}</h2>
            <p className="text-xs text-[var(--text-muted)]">{t('branches.matrixSubtitle')}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[var(--color-border)] bg-[var(--surface)] font-semibold text-[var(--text-muted)]">
                <tr>
                  <th className="p-3">Dish / Menu Item</th>
                  <th className="p-3 text-center">Main Branch (Downtown)</th>
                  <th className="p-3 text-center">Mall Branch (Sheikh Zayed)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {matrix.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[var(--elevated)]/40 transition">
                    <td className="p-3 font-bold text-[var(--text-primary)]">{t(item.dishKey)}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleMatrix(idx, 'mainBranch')}
                        className={`p-2 rounded-xl border transition ${
                          item.mainBranch
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                        }`}
                      >
                        {item.mainBranch ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => toggleMatrix(idx, 'mallBranch')}
                        className={`p-2 rounded-xl border transition ${
                          item.mallBranch
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                        }`}
                      >
                        {item.mallBranch ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Working Hours Schedule */}
      {activeTab === 'hours' && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">{t('branches.scheduleTitle')}</h2>
          <div className="space-y-2 text-xs">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-3">
                <span className="font-bold text-[var(--text-primary)]">{day}</span>
                <span className="text-[var(--text-secondary)] font-medium">10:00 AM — 02:00 AM (Midnight Shift Active)</span>
                <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-emerald-500 font-bold text-[10px]">Open</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchesPage;
