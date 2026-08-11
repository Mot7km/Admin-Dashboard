import { Calendar, ChevronDown, Plus, Printer, Sparkles, Store, Volume2, VolumeX } from 'lucide-react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../../../context/LanguageContext';
import { useToast } from '../../../common/Toast';

type HomeHeaderProps = {
  selectedBranch: string;
  isChimeMuted: boolean;
  onBranchChange: (value: string) => void;
  onToggleChime: () => void;
};

const HomeHeader: FC<HomeHeaderProps> = ({ selectedBranch, isChimeMuted, onBranchChange, onToggleChime }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
              {t('dashboard.title')}
            </h1>

            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-500 ring-1 ring-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{t('dashboard.liveKitchen')}</span>
              <button
                onClick={onToggleChime}
                className="ml-1 text-slate-400 hover:text-emerald-400 transition"
                title={isChimeMuted ? t('dashboard.soundChimeMute') : t('dashboard.soundChimeOn')}
                aria-label="Toggle chime sound"
              >
                {isChimeMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-emerald-500" />}
              </button>
            </div>
          </div>
          <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
            {t('dashboard.subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <select
              value={selectedBranch}
              onChange={(e) => onBranchChange(e.target.value)}
              className="appearance-none rounded-xl border border-[var(--color-border)] bg-[var(--card)] py-2 pl-9 pr-8 text-xs font-semibold text-[var(--text-secondary)] focus:border-[var(--primary)] focus:outline-none shadow-sm cursor-pointer"
            >
              <option value="all">{t('dashboard.allBranches')}</option>
              <option value="main">{t('dashboard.mainBranch')}</option>
              <option value="mall">{t('dashboard.mallBranch')}</option>
            </select>
            <Store className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--primary)]" />
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
          </div>

          <button
            onClick={() => showToast(t('dashboard.dateRange'), 'info')}
            className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-semibold text-[var(--text-secondary)] shadow-sm transition hover:border-[var(--primary)] hover:text-[var(--text-primary)]"
          >
            <Calendar className="h-4 w-4 text-[var(--text-muted)]" />
            <span>{t('dashboard.dateRange')}</span>
            <ChevronDown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 hide-scrollbar mobile-scroll-snap">
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center gap-2 shrink-0 rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[var(--primary)]/20 hover:bg-[var(--primary-dark)] transition"
        >
          <Plus className="h-4 w-4" />
          <span>{t('dashboard.quickActions.addDish')}</span>
        </button>
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center gap-2 shrink-0 rounded-xl border border-[var(--color-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--elevated)] transition"
        >
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>{t('dashboard.quickActions.addBanner')}</span>
        </button>
        <button
          onClick={() => navigate('/menu')}
          className="flex items-center gap-2 shrink-0 rounded-xl border border-[var(--color-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--elevated)] transition"
        >
          <Printer className="h-4 w-4 text-[var(--primary)]" />
          <span>{t('dashboard.quickActions.downloadQr')}</span>
        </button>
      </div>
    </>
  );
};

export default HomeHeader;
