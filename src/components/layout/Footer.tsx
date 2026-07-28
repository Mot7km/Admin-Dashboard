import { useTranslation } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--color-border)] bg-[var(--surface)] px-4 py-4 text-xs text-[var(--text-muted)] sm:px-6 lg:px-8">
      <div className="flex items-center gap-2">
        <img
          src="/assets/logo/Mot7km_Logo.png"
          alt="Mot7km Logo"
          className="h-5 w-auto object-contain"
        />
        <p>{t('layout.footerText')}</p>
      </div>
      <p>{t('layout.footerNote')}</p>
    </footer>
  );
};

export default Footer;
