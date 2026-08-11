import type { FC } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../../context/LanguageContext';
import { useToast } from '../../../common/Toast';
import type { HomeActivityItem, HomeProduct, HomeReview } from '../home.types';

type HomeLowerPanelsProps = {
  topProducts: HomeProduct[];
  recentReviews: HomeReview[];
  activityFeed: HomeActivityItem[];
  productFilter: string;
  onProductFilterChange: (value: string) => void;
};

const HomeLowerPanels: FC<HomeLowerPanelsProps> = ({ topProducts, recentReviews, activityFeed, productFilter, onProductFilterChange }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg lg:col-span-6">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">{t('dashboard.topProducts')}</h2>
          <div className="relative">
            <select
              value={productFilter}
              onChange={(e) => onProductFilterChange(e.target.value)}
              className="appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--surface)] py-1.5 pl-3 pr-8 text-xs font-medium text-[var(--text-secondary)] focus:border-[var(--primary)] focus:outline-none"
            >
              <option value="byViews">{t('dashboard.byViews')}</option>
              <option value="byRating">{t('dashboard.byRating')}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
          </div>
        </div>

        <div className="mt-4 flex-1 space-y-4">
          {topProducts.map((prod) => (
            <div key={prod.nameKey} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium">
                <span className="text-[var(--text-secondary)]">{t(prod.nameKey)}</span>
                <span className="font-semibold text-[var(--text-primary)]">{prod.views} {t('common.views')}</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--elevated)]">
                <div
                  className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
                  style={{ width: `${prod.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-[var(--color-border)] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold tracking-wide text-[var(--text-muted)] uppercase">
              {t('dashboard.categorySales')}
            </h3>
            <span className="text-[11px] font-bold text-[var(--primary)]">$3,420 Total</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-[var(--text-secondary)]">{t('dashboard.catBurgers')}</span>
                <span className="text-[var(--text-primary)] font-bold">42%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--elevated)]">
                <div className="h-full bg-blue-500 w-[42%]" />
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-[var(--text-secondary)]">{t('dashboard.catDrinks')}</span>
                <span className="text-[var(--text-primary)] font-bold">28%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--elevated)]">
                <div className="h-full bg-teal-500 w-[28%]" />
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-[var(--text-secondary)]">{t('dashboard.catDesserts')}</span>
                <span className="text-[var(--text-primary)] font-bold">18%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--elevated)]">
                <div className="h-full bg-amber-500 w-[18%]" />
              </div>
            </div>

            <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 space-y-1">
              <div className="flex justify-between font-semibold">
                <span className="text-[var(--text-secondary)]">{t('dashboard.catSides')}</span>
                <span className="text-[var(--text-primary)] font-bold">12%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--elevated)]">
                <div className="h-full bg-sky-500 w-[12%]" />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-[var(--primary)]/30 bg-[var(--primary)]/5 p-3 text-xs">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)] text-white shadow">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="font-bold text-[var(--text-primary)]">{t('dashboard.aiRecommendation')}</div>
              <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                {t('dashboard.aiText')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                showToast('Night Offer Banner Activated!', 'success');
                navigate('/menu?tab=sliders');
              }}
              className="shrink-0 rounded-lg bg-[var(--primary)] px-2.5 py-1.5 text-[11px] font-bold text-white shadow hover:bg-[var(--primary-dark)] transition"
            >
              {t('dashboard.activateOffer')}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:col-span-6">
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">{t('dashboard.recentReviews')}</h2>
            <button
              onClick={() => navigate('/menu')}
              className="text-xs font-medium text-[var(--primary)] hover:underline bg-transparent border-0 p-0"
            >
              {t('dashboard.viewAll')}
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {recentReviews.map((rev) => (
              <div key={rev.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-3.5 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--text-primary)]">{rev.customer}</span>
                    <span className="rounded-md bg-amber-500/10 px-1.5 py-0.5 font-semibold text-amber-500">
                      ★ {rev.rating}.0
                    </span>
                  </div>
                  <span className="text-[var(--text-muted)] text-[11px]">{t(rev.timeKey)}</span>
                </div>
                <p className="mt-1.5 font-medium text-[var(--text-secondary)]">"{t(rev.commentKey)}"</p>
                <div className="mt-2 text-[11px] font-semibold text-[var(--primary)]">
                  {t(rev.dishKey)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">{t('dashboard.systemActivity')}</h2>
          </div>
          <div className="mt-4 space-y-3">
            {activityFeed.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] ring-1 ring-[var(--primary)]/20">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium text-[var(--text-primary)]">
                    {t(item.titleKey)}
                  </span>
                </div>
                <span className="shrink-0 text-[var(--text-muted)]">
                  {t(item.timeKey)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLowerPanels;
