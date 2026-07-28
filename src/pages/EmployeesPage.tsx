import { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { useToast } from '../components/common/Toast';
import { UserCheck, QrCode, Shield, Clock, Check, X, Plus } from 'lucide-react';

const EmployeesPage = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'staff' | 'permissions' | 'shifts'>('staff');
  const [showAttendanceQrModal, setShowAttendanceQrModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);

  // Add Staff Form
  const [staffName, setStaffName] = useState('');
  const [staffRole, setStaffRole] = useState('Cashier');
  const [staffBranch, setStaffBranch] = useState('Main Branch');

  // Staff members matching Mot7km ERP
  const [staff, setStaff] = useState([
    { id: 'e-1', name: 'Ahmed Hassan', role: 'Branch Manager', branch: 'Main Branch', status: 'Clocked In', shift: '09:00 AM - 05:00 PM' },
    { id: 'e-2', name: 'Mahmoud Ali', role: 'Head Cashier', branch: 'Main Branch', status: 'Clocked In', shift: '01:00 PM - 09:00 PM' },
    { id: 'e-3', name: 'Nour El-Din', role: 'Kitchen Chef', branch: 'Mall Branch', status: 'Clocked Out', shift: '04:00 PM - 12:00 AM' },
  ]);

  // Role Permissions Checklist Matrix
  const [permissions, setPermissions] = useState([
    { page: 'Dashboard Analytics', owner: true, manager: true, cashier: false, kitchen: false },
    { page: 'Menu & QR Control', owner: true, manager: true, cashier: false, kitchen: false },
    { page: 'POS & Kitchen Orders (KDS)', owner: true, manager: true, cashier: true, kitchen: true },
    { page: 'Financial Sales & Revenue', owner: true, manager: false, cashier: false, kitchen: false },
    { page: 'Inventory & Stock Restock', owner: true, manager: true, cashier: false, kitchen: true },
  ]);

  const togglePermission = (idx: number, roleKey: 'manager' | 'cashier' | 'kitchen') => {
    const updated = [...permissions];
    updated[idx][roleKey] = !updated[idx][roleKey];
    setPermissions(updated);
    showToast(t('common.success'), 'info');
  };

  const handleAddStaff = () => {
    if (!staffName.trim()) return;
    setStaff([
      ...staff,
      {
        id: `e-${Date.now()}`,
        name: staffName,
        role: staffRole,
        branch: staffBranch,
        status: 'Clocked Out',
        shift: '09:00 AM - 05:00 PM',
      },
    ]);
    setStaffName('');
    setShowAddStaffModal(false);
    showToast(t('common.success'), 'success');
  };

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {t('employees.title')}
          </h1>
          <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
            {t('employees.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddStaffModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--surface)] border border-[var(--color-border)] px-3.5 py-2.5 text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--elevated)] transition"
          >
            <Plus className="h-4 w-4 text-[var(--primary)]" />
            <span>{t('employees.addStaff')}</span>
          </button>
          <button
            onClick={() => setShowAttendanceQrModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[var(--primary-dark)] transition"
          >
            <QrCode className="h-4 w-4" />
            <span>{t('employees.qrAttendance')}</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('staff')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'staff'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <UserCheck className="h-4 w-4" />
          <span>{t('employees.tabs.staffList')}</span>
        </button>

        <button
          onClick={() => setActiveTab('permissions')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'permissions'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Shield className="h-4 w-4" />
          <span>{t('employees.tabs.permissionsMatrix')}</span>
        </button>

        <button
          onClick={() => setActiveTab('shifts')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'shifts'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>{t('employees.tabs.shiftGrid')}</span>
        </button>
      </div>

      {/* TAB 1: Staff & Clock-In Status */}
      {activeTab === 'staff' && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[var(--color-border)] bg-[var(--surface)] font-semibold text-[var(--text-muted)]">
                <tr>
                  <th className="p-3">{t('employees.table.name')}</th>
                  <th className="p-3">{t('employees.table.role')}</th>
                  <th className="p-3">{t('employees.table.branch')}</th>
                  <th className="p-3">{t('employees.table.status')}</th>
                  <th className="p-3">{t('employees.table.shift')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {staff.map((s) => (
                  <tr key={s.id} className="hover:bg-[var(--elevated)]/40 transition">
                    <td className="p-3 font-bold text-[var(--text-primary)] flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] font-bold flex items-center justify-center text-xs">
                        {s.name.charAt(0)}
                      </div>
                      <span>{s.name}</span>
                    </td>
                    <td className="p-3 text-[var(--text-secondary)] font-medium">{s.role}</td>
                    <td className="p-3 text-[var(--text-muted)]">{s.branch}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          s.status === 'Clocked In'
                            ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20'
                            : 'bg-slate-500/10 text-slate-400'
                        }`}
                      >
                        <span className={`h-2 w-2 rounded-full ${s.status === 'Clocked In' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}></span>
                        {s.status === 'Clocked In' ? t('employees.statusClockedIn') : t('employees.statusClockedOut')}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-[var(--text-muted)]">{s.shift}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Role Permissions Checklist */}
      {activeTab === 'permissions' && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">{t('employees.permissionsTitle')}</h2>
            <p className="text-xs text-[var(--text-muted)]">{t('employees.permissionsSubtitle')}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[var(--color-border)] bg-[var(--surface)] font-semibold text-[var(--text-muted)]">
                <tr>
                  <th className="p-3">{t('employees.headers.feature')}</th>
                  <th className="p-3 text-center">{t('employees.headers.owner')}</th>
                  <th className="p-3 text-center">{t('employees.headers.manager')}</th>
                  <th className="p-3 text-center">{t('employees.headers.cashier')}</th>
                  <th className="p-3 text-center">{t('employees.headers.kitchen')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {permissions.map((p, idx) => (
                  <tr key={idx} className="hover:bg-[var(--elevated)]/40 transition">
                    <td className="p-3 font-bold text-[var(--text-primary)]">{p.page}</td>
                    <td className="p-3 text-center"><Check className="h-4 w-4 text-emerald-500 mx-auto" /></td>
                    <td className="p-3 text-center">
                      <button onClick={() => togglePermission(idx, 'manager')} className="p-1 rounded hover:bg-[var(--elevated)]">
                        {p.manager ? <Check className="h-4 w-4 text-emerald-500 mx-auto" /> : <X className="h-4 w-4 text-rose-500 mx-auto" />}
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button onClick={() => togglePermission(idx, 'cashier')} className="p-1 rounded hover:bg-[var(--elevated)]">
                        {p.cashier ? <Check className="h-4 w-4 text-emerald-500 mx-auto" /> : <X className="h-4 w-4 text-rose-500 mx-auto" />}
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <button onClick={() => togglePermission(idx, 'kitchen')} className="p-1 rounded hover:bg-[var(--elevated)]">
                        {p.kitchen ? <Check className="h-4 w-4 text-emerald-500 mx-auto" /> : <X className="h-4 w-4 text-rose-500 mx-auto" />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Interactive Shift Timeline Grid */}
      {activeTab === 'shifts' && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">{t('employees.tabs.shiftGrid')}</h2>
          <div className="space-y-3 text-xs">
            {staff.map((s) => (
              <div key={s.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[var(--text-primary)]">{s.name} ({s.role})</span>
                  <span className="font-mono text-[var(--primary)] font-bold">{s.shift}</span>
                </div>
                <div className="h-3 w-full bg-[var(--elevated)] rounded-full overflow-hidden relative">
                  <div className="absolute top-0 bottom-0 left-[20%] right-[30%] bg-[var(--primary)] rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: Attendance QR Code Generator */}
      {showAttendanceQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4 text-center">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">{t('employees.qrModalTitle')}</h3>
              <button onClick={() => setShowAttendanceQrModal(false)}><X className="h-5 w-5 text-[var(--text-muted)]" /></button>
            </div>
            <div className="p-6 bg-slate-900 rounded-xl inline-block text-white">
              <QrCode className="h-32 w-32 mx-auto" />
            </div>
            <p className="text-xs text-[var(--text-muted)]">{t('employees.qrModalSub')}</p>
          </div>
        </div>
      )}

      {/* MODAL: Add Staff Member */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">{t('employees.addStaff')}</h3>
              <button onClick={() => setShowAddStaffModal(false)}><X className="h-5 w-5 text-[var(--text-muted)]" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[var(--text-secondary)]">Staff Full Name</label>
                <input
                  type="text"
                  value={staffName}
                  onChange={(e) => setStaffName(e.target.value)}
                  placeholder="e.g. Khaled Ibrahim"
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-[var(--text-secondary)]">Role</label>
                <select
                  value={staffRole}
                  onChange={(e) => setStaffRole(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"
                >
                  <option value="Branch Manager">Branch Manager</option>
                  <option value="Head Cashier">Head Cashier</option>
                  <option value="Kitchen Chef">Kitchen Chef</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-[var(--text-secondary)]">Assigned Branch</label>
                <select
                  value={staffBranch}
                  onChange={(e) => setStaffBranch(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"
                >
                  <option value="Main Branch">Main Branch</option>
                  <option value="Mall Branch">Mall Branch</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
              <button onClick={() => setShowAddStaffModal(false)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-xs font-semibold">
                {t('common.cancel')}
              </button>
              <button onClick={handleAddStaff} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow">
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesPage;
