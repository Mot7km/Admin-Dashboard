import { useTranslation } from '../context/LanguageContext';
import { CheckCircle } from 'lucide-react';

const ReviewsPage = () => {
  const { t } = useTranslation();

  const reviews = [
    {
      id: 1,
      customer: 'Sami Al-Mansoor',
      rating: 5,
      dish: 'Smoked Truffle Burger',
      comment: 'Best truffle burger in town! Amazing quality and smoked flavor.',
      date: 'Feb 26, 2025',
      status: 'Approved',
    },
    {
      id: 2,
      customer: 'Laila H.',
      rating: 5,
      dish: 'Spanish Iced Latte',
      comment: 'Perfect sweetness and great espresso shot.',
      date: 'Feb 25, 2025',
      status: 'Approved',
    },
    {
      id: 3,
      customer: 'Tariq K.',
      rating: 4,
      dish: 'Neapolitan Margherita',
      comment: 'Fresh ingredients and authentic dough.',
      date: 'Feb 24, 2025',
      status: 'Approved',
    },
  ];

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          {t('nav.reviews')}
        </h1>
        <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
          Product-level customer feedback, ratings, and review moderation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-sm">
          <span className="text-xs text-[var(--text-muted)]">Average Product Rating</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-[var(--text-primary)]">4.9</span>
            <span className="text-amber-500 font-semibold text-sm">★★★★★</span>
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-sm">
          <span className="text-xs text-[var(--text-muted)]">Total Feedback Submitted</span>
          <div className="mt-2 text-3xl font-bold text-[var(--text-primary)]">328</div>
        </div>
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-sm">
          <span className="text-xs text-[var(--text-muted)]">Pending Moderation</span>
          <div className="mt-2 text-3xl font-bold text-emerald-500">0</div>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((rev) => (
          <div key={rev.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 font-bold">
                  ★ {rev.rating}
                </div>
                <div>
                  <h3 className="font-bold text-[var(--text-primary)]">{rev.customer}</h3>
                  <span className="text-xs text-[var(--primary)] font-medium">{rev.dish}</span>
                </div>
              </div>
              <span className="text-xs text-[var(--text-muted)]">{rev.date}</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)]">"{rev.comment}"</p>
            <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)] text-xs">
              <span className="inline-flex items-center gap-1 text-emerald-500 font-medium">
                <CheckCircle className="h-3.5 w-3.5" /> Approved
              </span>
              <button className="text-[var(--text-muted)] hover:text-rose-500 transition">
                Hide Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
