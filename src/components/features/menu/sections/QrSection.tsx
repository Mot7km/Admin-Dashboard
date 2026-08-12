import { QrCode, Download, Share2 } from 'lucide-react';
import { useTranslation } from '../../../../../app/context/LanguageContext';

type QrSectionProps = {
  onDownloadQr: () => void;
  onShareQr: () => void;
};

const QrSection = ({ onDownloadQr, onShareQr }: QrSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-8 text-center shadow-lg space-y-4">
        <div className="rounded-2xl bg-white p-6 shadow-inner ring-1 ring-black/5">
          <div className="h-48 w-48 flex items-center justify-center bg-slate-900 rounded-xl p-4 text-white">
            <QrCode className="h-36 w-36 text-white" />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-base text-[var(--text-primary)]">{t('menu.qr.title')}</h3>
          <p className="text-xs text-[var(--text-muted)] mt-1">{t('menu.qr.url')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onDownloadQr}
            className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-[var(--primary-dark)] transition cursor-pointer"
          >
            <Download className="h-4 w-4" /> {t('menu.qr.downloadBtn')}
          </button>
          <button
            onClick={onShareQr}
            className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition cursor-pointer"
          >
            <Share2 className="h-4 w-4" /> {t('menu.qr.shareBtn')}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-5">
        <h2 className="text-base font-bold text-[var(--text-primary)]">{t('menu.qr.brandingTitle')}</h2>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t('menu.qr.themeColor')}</label>
            <div className="mt-2 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[#1683C7] ring-2 ring-white cursor-pointer" />
              <div className="h-8 w-8 rounded-full bg-[#0F766E] ring-2 ring-white cursor-pointer" />
              <div className="h-8 w-8 rounded-full bg-[#E11D48] ring-2 ring-white cursor-pointer" />
              <div className="h-8 w-8 rounded-full bg-[#D97706] ring-2 ring-white cursor-pointer" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)]">{t('menu.qr.logoLabel')}</label>
            <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-3">
              <img
                src="/assets/logo/Mot7km_Logo.png"
                alt="Mot7km Brand Logo"
                className="h-8 w-8 object-contain rounded-lg bg-[var(--primary)]/10 p-1 ring-1 ring-[var(--primary)]/20"
              />
              <span className="text-xs font-bold text-[var(--text-primary)]">Mot7km_Logo.png</span>
              <span className="ml-auto text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">Primary Logo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrSection;