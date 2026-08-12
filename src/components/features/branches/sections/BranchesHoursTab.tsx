import { useTranslation } from '../../../../../app/context/LanguageContext';

const BranchesHoursTab = () => {
  const { t } = useTranslation();

  return (
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
  );
};

export default BranchesHoursTab;