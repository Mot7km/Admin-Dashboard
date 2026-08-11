import React from 'react';
import { useTranslation } from '../../../../context/LanguageContext';
import { Printer, Server, Send, Save, Bell, Key, Copy } from 'lucide-react';

type PrinterConfig = {
  name: string;
  ipPort: string;
  paperWidth: string;
  footerText: string;
};

type NotificationsState = {
  emailNotif: boolean;
  smsNotif: boolean;
  pushNotif: boolean;
  dailySummary: boolean;
};

type IntegrationsTabProps = {
  printerConfig: PrinterConfig;
  setPrinterConfig: React.Dispatch<React.SetStateAction<PrinterConfig>>;
  notifications: NotificationsState;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationsState>>;
  apiKey: string;
  webhookUrl: string;
  setWebhookUrl: (val: string) => void;
  onSavePrinter: (e: React.FormEvent) => void;
  onTestPrint: () => void;
  onCopyApiKey: () => void;
};

const IntegrationsTab: React.FC<IntegrationsTabProps> = ({
  printerConfig,
  setPrinterConfig,
  notifications,
  setNotifications,
  apiKey,
  webhookUrl,
  setWebhookUrl,
  onSavePrinter,
  onTestPrint,
  onCopyApiKey,
}) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Thermal Printer Config */}
      <form onSubmit={onSavePrinter} className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
          <Printer className="h-5 w-5 text-[var(--primary)]" />
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            {t('settings.integrations.printerTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)]">
              {t('settings.integrations.printerName')}
            </label>
            <input
              type="text"
              value={printerConfig.name}
              onChange={(e) => setPrinterConfig({ ...printerConfig, name: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)]">
              {t('settings.integrations.printerIp')}
            </label>
            <div className="relative mt-1.5">
              <Server className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                value={printerConfig.ipPort}
                onChange={(e) => setPrinterConfig({ ...printerConfig, ipPort: e.target.value })}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] py-2.5 pl-9 pr-3 text-xs font-mono font-medium focus:border-[var(--primary)] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)]">
              {t('settings.integrations.paperWidth')}
            </label>
            <select
              value={printerConfig.paperWidth}
              onChange={(e) => setPrinterConfig({ ...printerConfig, paperWidth: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
            >
              <option value="80mm">80mm (Standard POS Thermal)</option>
              <option value="58mm">58mm (Compact Portable Thermal)</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <label className="text-xs font-semibold text-[var(--text-secondary)]">
              {t('settings.integrations.footerTextLabel')}
            </label>
            <input
              type="text"
              value={printerConfig.footerText}
              onChange={(e) => setPrinterConfig({ ...printerConfig, footerText: e.target.value })}
              className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium focus:border-[var(--primary)] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onTestPrint}
            className="flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] px-4 py-2.5 text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--elevated)] transition"
          >
            <Send className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span>{t('settings.integrations.testPrint')}</span>
          </button>

          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-[var(--primary)] px-5 py-2.5 text-xs font-bold text-white shadow hover:bg-[var(--primary-dark)] transition"
          >
            <Save className="h-3.5 w-3.5" />
            <span>{t('settings.integrations.savePrinter')}</span>
          </button>
        </div>
      </form>

      {/* Notifications Preferences */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
          <Bell className="h-5 w-5 text-[var(--primary)]" />
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            {t('settings.integrations.notifTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] bg-[var(--surface)]">
            <span className="text-xs font-medium text-[var(--text-primary)]">
              {t('settings.integrations.emailNotif')}
            </span>
            <input
              type="checkbox"
              checked={notifications.emailNotif}
              onChange={(e) => setNotifications({ ...notifications, emailNotif: e.target.checked })}
              className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--primary)] focus:ring-[var(--primary)]"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] bg-[var(--surface)]">
            <span className="text-xs font-medium text-[var(--text-primary)]">
              {t('settings.integrations.smsNotif')}
            </span>
            <input
              type="checkbox"
              checked={notifications.smsNotif}
              onChange={(e) => setNotifications({ ...notifications, smsNotif: e.target.checked })}
              className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--primary)] focus:ring-[var(--primary)]"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] bg-[var(--surface)]">
            <span className="text-xs font-medium text-[var(--text-primary)]">
              {t('settings.integrations.pushNotif')}
            </span>
            <input
              type="checkbox"
              checked={notifications.pushNotif}
              onChange={(e) => setNotifications({ ...notifications, pushNotif: e.target.checked })}
              className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--primary)] focus:ring-[var(--primary)]"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] bg-[var(--surface)]">
            <span className="text-xs font-medium text-[var(--text-primary)]">
              {t('settings.integrations.dailySummary')}
            </span>
            <input
              type="checkbox"
              checked={notifications.dailySummary}
              onChange={(e) => setNotifications({ ...notifications, dailySummary: e.target.checked })}
              className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--primary)] focus:ring-[var(--primary)]"
            />
          </div>
        </div>
      </div>

      {/* API Keys & Webhooks */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
        <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
          <Key className="h-5 w-5 text-[var(--primary)]" />
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            {t('settings.integrations.apiTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)]">
              {t('settings.integrations.apiKeyLabel')}
            </label>
            <div className="flex items-center gap-2 mt-1.5">
              <input
                type="password"
                readOnly
                value={apiKey}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-mono text-xs text-[var(--text-primary)] focus:outline-none"
              />
              <button
                type="button"
                onClick={onCopyApiKey}
                className="flex items-center gap-1 shrink-0 rounded-xl bg-[var(--primary)]/10 px-3 py-2.5 text-xs font-bold text-[var(--primary)] hover:bg-[var(--primary)]/20 transition"
              >
                <Copy className="h-3.5 w-3.5" />
                <span>{t('settings.integrations.copyKey')}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[var(--text-secondary)]">
              {t('settings.integrations.webhookUrl')}
            </label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-mono text-xs text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsTab;