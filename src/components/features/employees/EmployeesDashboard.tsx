import { useState } from 'react';
import { useTranslation } from '../../../context/LanguageContext';
import { useToast } from '../../common/Toast';
import { QrCode, X } from 'lucide-react';
import EmployeesHeader from './sections/EmployeesHeader';
import EmployeesTabs from './sections/EmployeesTabs';
import EmployeesStaffTab from './sections/EmployeesStaffTab';
import EmployeesPermissionsTab from './sections/EmployeesPermissionsTab';
import EmployeesShiftsTab from './sections/EmployeesShiftsTab';

const EmployeesDashboard = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'staff' | 'permissions' | 'shifts'>('staff');
  const [showAttendanceQrModal, setShowAttendanceQrModal] = useState(false);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);

  const [staffName, setStaffName] = useState('');
  const [staffRole, setStaffRole] = useState('Cashier');
  const [staffBranch, setStaffBranch] = useState('Main Branch');

  const [staff, setStaff] = useState<Array<{
    id: string;
    name: string;
    role: string;
    branch: string;
    status: 'Clocked In' | 'Clocked Out';
    shift: string;
  }>>([
    { id: 'e-1', name: 'Ahmed Hassan', role: 'Branch Manager', branch: 'Main Branch', status: 'Clocked In', shift: '09:00 AM - 05:00 PM' },
    { id: 'e-2', name: 'Mahmoud Ali', role: 'Head Cashier', branch: 'Main Branch', status: 'Clocked In', shift: '01:00 PM - 09:00 PM' },
    { id: 'e-3', name: 'Nour El-Din', role: 'Kitchen Chef', branch: 'Mall Branch', status: 'Clocked Out', shift: '04:00 PM - 12:00 AM' },
  ]);

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
      <EmployeesHeader
        title={t('employees.title')}
        subtitle={t('employees.subtitle')}
        onAddStaff={() => setShowAddStaffModal(true)}
        onOpenQr={() => setShowAttendanceQrModal(true)}
        addLabel={t('employees.addStaff')}
        qrLabel={t('employees.qrAttendance')}
      />

      <EmployeesTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        staffLabel={t('employees.tabs.staffList')}
        permissionsLabel={t('employees.tabs.permissionsMatrix')}
        shiftsLabel={t('employees.tabs.shiftGrid')}
      />

      {activeTab === 'staff' && (
        <EmployeesStaffTab
          employees={staff}
          nameLabel={t('employees.table.name')}
          roleLabel={t('employees.table.role')}
          branchLabel={t('employees.table.branch')}
          statusLabel={t('employees.table.status')}
          shiftLabel={t('employees.table.shift')}
          clockedInLabel={t('employees.statusClockedIn')}
          clockedOutLabel={t('employees.statusClockedOut')}
        />
      )}

      {activeTab === 'permissions' && (
        <EmployeesPermissionsTab
          permissions={permissions}
          title={t('employees.permissionsTitle')}
          subtitle={t('employees.permissionsSubtitle')}
          featureLabel={t('employees.headers.feature')}
          ownerLabel={t('employees.headers.owner')}
          managerLabel={t('employees.headers.manager')}
          cashierLabel={t('employees.headers.cashier')}
          kitchenLabel={t('employees.headers.kitchen')}
          onTogglePermission={togglePermission}
        />
      )}

      {activeTab === 'shifts' && (
        <EmployeesShiftsTab
          title={t('employees.tabs.shiftGrid')}
          members={staff.map(({ id, name, role, shift }) => ({ id, name, role, shift }))}
        />
      )}

      {showAttendanceQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4 text-center">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">{t('employees.qrModalTitle')}</h3>
              <button
                onClick={() => setShowAttendanceQrModal(false)}
                className="cursor-pointer"
              >
                <X className="h-5 w-5 text-[var(--text-muted)]" />
              </button>
            </div>
            <div className="p-6 bg-slate-900 rounded-xl inline-block text-white"><QrCode className="h-32 w-32 mx-auto" /></div>
            <p className="text-xs text-[var(--text-muted)]">{t('employees.qrModalSub')}</p>
          </div>
        </div>
      )}

      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-base text-[var(--text-primary)]">{t('employees.addStaffModalTitle')}</h3>
              <button
                onClick={() => setShowAddStaffModal(false)}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div><label className="font-semibold text-[var(--text-secondary)]">{t('employees.form.name')}</label><input value={staffName} onChange={(e) => setStaffName(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none" /></div>
              <div><label className="font-semibold text-[var(--text-secondary)]">{t('employees.form.role')}</label><select value={staffRole} onChange={(e) => setStaffRole(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"><option>Cashier</option><option>Branch Manager</option><option>Kitchen Chef</option></select></div>
              <div><label className="font-semibold text-[var(--text-secondary)]">{t('employees.form.branch')}</label><select value={staffBranch} onChange={(e) => setStaffBranch(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"><option>Main Branch</option><option>Mall Branch</option><option>Downtown Branch</option></select></div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddStaffModal(false)}
                className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] cursor-pointer"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleAddStaff}
                className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow cursor-pointer"
              >
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeesDashboard;