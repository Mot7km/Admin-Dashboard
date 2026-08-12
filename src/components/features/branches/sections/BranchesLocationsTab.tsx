import { useTranslation } from '../../../../../app/context/LanguageContext';
import { MapPin, Phone, Clock, Store, Edit, Trash2 } from 'lucide-react';
import type { Branch } from '../branches.types';

type BranchesLocationsTabProps = {
  branches: Branch[];
  onDeleteBranch: (branchId: string) => void;
  onEditBranch: (branch: Branch) => void;
};

const BranchesLocationsTab = ({ branches, onDeleteBranch, onEditBranch }: BranchesLocationsTabProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {branches.map((branch) => (
        <div key={branch.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] font-bold">
                  <Store className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[var(--text-primary)]">{branch.name}</h3>
                  <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold ring-1 mt-1 ${branch.statusColor}`}>{branch.status}</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditBranch(branch)}
                  className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDeleteBranch(branch.id)}
                  className="p-1.5 text-[var(--text-muted)] hover:text-rose-500 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-xs text-[var(--text-secondary)] pt-2 border-t border-[var(--color-border)]">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--text-muted)] shrink-0" />
                <span>{branch.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--text-muted)] shrink-0" />
                <span>{branch.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-[var(--text-muted)] shrink-0" />
                <span>{branch.hours}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--color-border)] text-center text-xs">
            <div className="rounded-xl bg-[var(--surface)] p-2">
              <span className="text-[10px] text-[var(--text-muted)] block">{t('branches.card.todaySales')}</span>
              <strong className="text-[var(--primary)] font-extrabold">{branch.todaySales}</strong>
            </div>
            <div className="rounded-xl bg-[var(--surface)] p-2">
              <span className="text-[10px] text-[var(--text-muted)] block">{t('branches.card.activePos')}</span>
              <strong className="text-[var(--text-primary)] font-bold">{branch.activeCashiers} {t('branches.card.cashiers')}</strong>
            </div>
            <div className="rounded-xl bg-[var(--surface)] p-2">
              <span className="text-[10px] text-[var(--text-muted)] block">{t('branches.card.topDish')}</span>
              <strong className="text-amber-500 font-bold truncate block">{t(branch.topDishKey)}</strong>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BranchesLocationsTab;