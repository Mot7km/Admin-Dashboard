import { useState } from 'react';
import { useTranslation } from '../../../../app/context/LanguageContext';
import { useToast } from '../../common/Toast';
import EmployeesHeader from './sections/EmployeesHeader';
import EmployeesTabs from './sections/EmployeesTabs';
import EmployeesStaffTab from './sections/EmployeesStaffTab';
import EmployeesPermissionsTab from './sections/EmployeesPermissionsTab';
import EmployeesShiftsTab from './sections/EmployeesShiftsTab';
import AttendanceQrModal from './components/AttendanceQrModal';
import AddStaffModal from './components/AddStaffModal';

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
        <AttendanceQrModal onClose={() => setShowAttendanceQrModal(false)} />
      )}

      {showAddStaffModal && (
        <AddStaffModal
          staffName={staffName}
          staffRole={staffRole}
          staffBranch={staffBranch}
          onChangeName={setStaffName}
          onChangeRole={setStaffRole}
          onChangeBranch={setStaffBranch}
          onClose={() => setShowAddStaffModal(false)}
          onSave={handleAddStaff}
        />
      )}
    </div>
  );
};

export default EmployeesDashboard;