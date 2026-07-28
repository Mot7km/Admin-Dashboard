import { useTranslation } from '../context/LanguageContext';
import { QrCode, Download, Share2, Image as ImageIcon } from 'lucide-react';

const QrControlPage = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          {t('nav.qrControl')}
        </h1>
        <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
          Generate, customize, and download QR codes for table tents, stickers, and digital menus.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* QR Preview Card */}
        <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-8 text-center shadow-lg space-y-4">
          <div className="rounded-2xl bg-white p-6 shadow-inner ring-1 ring-black/5">
            {/* Visual QR Code Representation */}
            <div className="h-48 w-48 flex items-center justify-center bg-slate-900 rounded-xl p-4 text-white">
              <QrCode className="h-36 w-36 text-white" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-base text-[var(--text-primary)]">Mot7km Smart QR Menu</h3>
            <p className="text-xs text-[var(--text-muted)] mt-1">/m/mot7km-restaurant/main-branch</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-[var(--primary-dark)] transition">
              <Download className="h-4 w-4" /> Download SVG / PNG
            </button>
            <button className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
              <Share2 className="h-4 w-4" /> Share Link
            </button>
          </div>
        </div>

        {/* Branding Configuration */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-5">
          <h2 className="text-base font-bold text-[var(--text-primary)]">Restaurant Branding Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Primary Theme Color</label>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#1683C7] ring-2 ring-white cursor-pointer" />
                <div className="h-8 w-8 rounded-full bg-[#0F766E] cursor-pointer" />
                <div className="h-8 w-8 rounded-full bg-[#E11D48] cursor-pointer" />
                <div className="h-8 w-8 rounded-full bg-[#D97706] cursor-pointer" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">Restaurant Logo</label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-3">
                <ImageIcon className="h-5 w-5 text-[var(--text-muted)]" />
                <span className="text-xs text-[var(--text-muted)]">Mot7km_Logo.png</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrControlPage;
