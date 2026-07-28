import { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { useToast } from '../components/common/Toast';
import ConfirmDialog from '../components/common/ConfirmDialog';
import { Store, MapPin, Phone, Clock, Plus, Check, X, ShieldCheck, Trash2, Edit } from 'lucide-react';

const BranchesPage = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'locations' | 'matrix' | 'hours'>('locations');
  const [showAddBranchModal, setShowAddBranchModal] = useState(false);
  const [deleteBranchId, setDeleteBranchId] = useState<string | null>(null);

  // Form State
  const [branchName, setBranchName] = useState('');
  const [branchAddress, setBranchAddress] = useState('');
  const [branchPhone, setBranchPhone] = useState('');

  // Branch data matching Mot7km ERP
  const [branches, setBranches] = useState([
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
  ]);

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
    showToast(t('common.success'), 'info');
  };

  const handleAddBranch = () => {
    if (!branchName.trim()) return;
    setBranches([
      ...branches,
      {
        id: `b-${Date.now()}`,
        name: branchName,
        status: 'Operational',
        statusColor: 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/20',
        address: branchAddress || 'Branch Address, Cairo',
        phone: branchPhone || '+20 100 000 0000',
        hours: '10:00 AM - 12:00 AM',
        todaySales: '$0',
        activeCashiers: 1,
        topDishKey: 'dashboard.products.truffleBurger',
      },
    ]);
    setBranchName('');
    setBranchAddress('');
    setBranchPhone('');
    setShowAddBranchModal(false);
    showToast(t('common.success'), 'success');
  };

  const handleConfirmDeleteBranch = () => {
    if (!deleteBranchId) return;
    setBranches(branches.filter((b) => b.id !== deleteBranchId));
    setDeleteBranchId(null);
    showToast(t('common.success'), 'info');
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

        <button
          onClick={() => setShowAddBranchModal(true)}
          className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[var(--primary-dark)] transition"
        >
          <Plus className="h-4 w-4" />
          <span>{t('branches.addBtn')}</span>
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
            <div key={b.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
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

                  <div className="flex items-center gap-1">
                    <button onClick={() => showToast(t('common.edit'), 'info')} className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => setDeleteBranchId(b.id)} className="p-1.5 text-[var(--text-muted)] hover:text-rose-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
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
              </div>

              {/* Branch Quick Stats Bar */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--color-border)] text-center text-xs">
                <div className="rounded-xl bg-[var(--surface)] p-2">
                  <span className="text-[10px] text-[var(--text-muted)] block">{t('branches.card.todaySales')}</span>
                  <strong className="text-[var(--primary)] font-extrabold">{b.todaySales}</strong>
                </div>
                <div className="rounded-xl bg-[var(--surface)] p-2">
                  <span className="text-[10px] text-[var(--text-muted)] block">{t('branches.card.activePos')}</span>
                  <strong className="text-[var(--text-primary)] font-bold">{b.activeCashiers} {t('branches.card.cashiers')}</strong>
                </div>
                <div className="rounded-xl bg-[var(--surface)] p-2">
                  <span className="text-[10px] text-[var(--text-muted)] block">{t('branches.card.topDish')}</span>
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
                  <th className="p-3">{t('branches.headers.dish')}</th>
                  <th className="p-3 text-center">{t('branches.headers.mainBranch')}</th>
                  <th className="p-3 text-center">{t('branches.headers.mallBranch')}</th>
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
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((dayKey) => (
              <div key={dayKey} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-3">
                <span className="font-bold text-[var(--text-primary)]">{t(`branches.days.${dayKey}`)}</span>
                <span className="text-[var(--text-secondary)] font-medium">{t('branches.shiftStatus')}</span>
                <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-emerald-500 font-bold text-[10px]">{t('branches.openBadge')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Branch Modal */}
      {showAddBranchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-base text-[var(--text-primary)]">{t('branches.addModalTitle')}</h3>
              <button onClick={() => setShowAddBranchModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Branch Name</label>
                <input
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="e.g. Nasr City Branch"
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium text-[var(--text-primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Address</label>
                <input
                  type="text"
                  value={branchAddress}
                  onChange={(e) => setBranchAddress(e.target.value)}
                  placeholder="e.g. Abbas El-Akkad St, Cairo"
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium text-[var(--text-primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Phone Number</label>
                <input
                  type="text"
                  value={branchPhone}
                  onChange={(e) => setBranchPhone(e.target.value)}
                  placeholder="e.g. +20 102 345 6789"
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium text-[var(--text-primary)] focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
              <button onClick={() => setShowAddBranchModal(false)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                {t('common.cancel')}
              </button>
              <button onClick={handleAddBranch} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow">
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Branch Dialog */}
      <ConfirmDialog
        isOpen={!!deleteBranchId}
        title={t('common.delete')}
        message="Are you sure you want to delete this branch?"
        onConfirm={handleConfirmDeleteBranch}
        onCancel={() => setDeleteBranchId(null)}
      />
    </div>
  );
};

export default BranchesPage;
