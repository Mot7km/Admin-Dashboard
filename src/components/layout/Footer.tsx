import { useTranslation } from '../../context/LanguageContext'

const Footer = () => {
  const { t } = useTranslation()

  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[color:rgba(15,23,42,0.08)] bg-[var(--surface)] px-4 py-4 text-sm text-[var(--text-muted)] sm:px-6 lg:px-8">
      <p>{t('layout.footerText')}</p>
      <p>{t('layout.footerNote')}</p>
    </footer>
  )
}

export default Footer
