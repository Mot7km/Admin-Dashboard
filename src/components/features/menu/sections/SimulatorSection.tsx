import { useTranslation } from '../../../../../app/context/LanguageContext';
import type { MenuProduct } from '../menu.types';

type SimulatorSectionProps = {
  simulatorLang: 'ar' | 'en';
  onLanguageChange: (lang: 'ar' | 'en') => void;
  products: MenuProduct[];
};

const SimulatorSection = ({ simulatorLang, onLanguageChange, products }: SimulatorSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold text-[var(--text-muted)]">{t('menu.simulator.langLabel')}</span>
        <button
          onClick={() => onLanguageChange('ar')}
          className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer ${
            simulatorLang === 'ar' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--card)] text-[var(--text-secondary)]'
          }`}
        >
          {t('menu.simulator.arabic')}
        </button>
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer ${
            simulatorLang === 'en' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--card)] text-[var(--text-secondary)]'
          }`}
        >
          {t('menu.simulator.english')}
        </button>
      </div>

      {/* Smartphone Frame */}
      <div className="w-80 h-[560px] rounded-[40px] border-8 border-slate-900 bg-[var(--background)] shadow-2xl overflow-hidden flex flex-col relative font-sans">
        {/* Notch Header */}
        <div className="bg-slate-900 h-6 w-full flex items-center justify-center">
          <div className="h-3 w-28 bg-slate-800 rounded-full" />
        </div>

        {/* Mobile Header Banner */}
        <div className="p-4 bg-[var(--card)] border-b border-[var(--color-border)] flex items-center gap-3">
          <img src="/assets/logo/Mot7km_Logo.png" alt="Logo" className="h-8 w-8 object-contain" />
          <div>
            <h4 className="font-bold text-xs text-[var(--text-primary)]">{t('menu.simulator.branchName')}</h4>
            <p className="text-[10px] text-[var(--text-muted)]">{t('menu.simulator.subText')}</p>
          </div>
        </div>

        {/* Mobile Body Content */}
        <div className="flex-1 p-3 overflow-y-auto space-y-3 hide-scrollbar">
          <div className="rounded-xl bg-gradient-to-r from-[var(--primary)] to-cyan-600 p-3 text-white">
            <span className="text-[10px] font-bold uppercase tracking-wider">{t('menu.simulator.promoBadge')}</span>
            <h5 className="font-extrabold text-xs">{t('menu.simulator.promoTitle')}</h5>
          </div>

          <div className="space-y-2">
            <h6 className="text-[11px] font-bold text-[var(--text-primary)]">{t('menu.simulator.popularHeader')}</h6>

            {products.map((p) => (
              <div key={p.id} className="flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--card)] p-2 shadow-sm">
                <img src={p.image} alt="Dish" className="h-12 w-12 rounded-lg object-cover" />
                <div className="flex-1 text-[11px]">
                  <h6 className="font-bold text-[var(--text-primary)]">
                    {p.nameKey.includes('.') ? t(p.nameKey) : p.nameKey}
                  </h6>
                  <span className="font-bold text-[var(--primary)]">{p.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulatorSection;