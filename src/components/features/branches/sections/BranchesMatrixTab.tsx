import { Check, X } from 'lucide-react';
import { useTranslation } from '../../../../../app/context/LanguageContext';
import type { AvailabilityMatrixRow } from '../branches.types';

type BranchesMatrixTabProps = {
  matrix: AvailabilityMatrixRow[];
  onToggleMatrix: (idx: number, branchKey: 'mainBranch' | 'mallBranch') => void;
};

const BranchesMatrixTab = ({ matrix, onToggleMatrix }: BranchesMatrixTabProps) => {
  const { t } = useTranslation();

  return (
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
                    onClick={() => onToggleMatrix(idx, 'mainBranch')}
                    className={`p-2 rounded-xl border transition cursor-pointer ${
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
                    onClick={() => onToggleMatrix(idx, 'mallBranch')}
                    className={`p-2 rounded-xl border transition cursor-pointer ${
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
  );
};

export default BranchesMatrixTab;