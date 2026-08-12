import { useTranslation } from '../../../../../app/context/LanguageContext';
import { X } from 'lucide-react';

type AddStaffModalProps = {
  staffName: string;
  staffRole: string;
  staffBranch: string;
  onChangeName: (value: string) => void;
  onChangeRole: (value: string) => void;
  onChangeBranch: (value: string) => void;
  onClose: () => void;
  onSave: () => void;
};

const AddStaffModal = ({
  staffName,
  staffRole,
  staffBranch,
  onChangeName,
  onChangeRole,
  onChangeBranch,
  onClose,
  onSave,
}: AddStaffModalProps) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
          <h3 className="font-bold text-base text-[var(--text-primary)]">{t('employees.addStaffModalTitle')}</h3>
          <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-3 text-xs">
          <div>
            <label className="font-semibold text-[var(--text-secondary)]">{t('employees.form.name')}</label>
            <input
              value={staffName}
              onChange={(e) => onChangeName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"
            />
          </div>
          <div>
            <label className="font-semibold text-[var(--text-secondary)]">{t('employees.form.role')}</label>
            <select
              value={staffRole}
              onChange={(e) => onChangeRole(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"
            >
              <option>Cashier</option>
              <option>Branch Manager</option>
              <option>Kitchen Chef</option>
            </select>
          </div>
          <div>
            <label className="font-semibold text-[var(--text-secondary)]">{t('employees.form.branch')}</label>
            <select
              value={staffBranch}
              onChange={(e) => onChangeBranch(e.target.value)}
              className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"
            >
              <option>Main Branch</option>
              <option>Mall Branch</option>
              <option>Downtown Branch</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] cursor-pointer"
          >
            {t('common.cancel')}
          </button>
          <button
            onClick={onSave}
            className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow cursor-pointer"
          >
            {t('common.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStaffModal;
