import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import en from '../locales/en.json'
import ar from '../locales/ar.json'

type Locale = 'en' | 'ar'
type TranslationDictionary = Record<string, unknown>

type LanguageContextValue = {
  locale: Locale
  t: (key: string) => string
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const dictionaries: Record<Locale, TranslationDictionary> = {
  en: en as TranslationDictionary,
  ar: ar as TranslationDictionary,
}

const getNestedValue = (dictionary: TranslationDictionary, key: string) => {
  return key.split('.').reduce<TranslationDictionary | string | undefined>((acc, part) => {
    if (typeof acc === 'object' && acc !== null && part in acc) {
      return acc[part] as TranslationDictionary | string | undefined
    }

    return undefined
  }, dictionary) as string | undefined
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'
  }, [locale])

  const t = (key: string) => {
    const value = getNestedValue(dictionaries[locale], key)
    return value ?? key
  }

  const toggleLocale = () => {
    setLocale((current) => (current === 'en' ? 'ar' : 'en'))
  }

  const value = useMemo(
    () => ({ locale, t, toggleLocale }),
    [locale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useTranslation = () => {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }

  return context
}
