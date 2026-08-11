import { useTranslation } from '../../../../context/LanguageContext';

const ReviewsSection = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-sm">
          <span className="text-xs text-[var(--text-muted)]">{t('menu.reviews.avgRating')}</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[var(--text-primary)]">4.9</span>
            <span className="text-amber-500 font-semibold text-sm">★★★★★</span>
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-sm">
          <span className="text-xs text-[var(--text-muted)]">{t('menu.reviews.totalFeedback')}</span>
          <div className="mt-2 text-3xl font-bold text-[var(--text-primary)]">328</div>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-sm">
          <span className="text-xs text-[var(--text-muted)]">{t('menu.reviews.pendingModeration')}</span>
          <div className="mt-2 text-3xl font-bold text-emerald-500">0</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;