import React from 'react';
import { useTranslation } from '../../../../context/LanguageContext';
import { Check, CreditCard, FileText, CheckCircle2, Download } from 'lucide-react';

type Plan = {
  id: string;
  name: string;
  price: string;
  isActive: boolean;
  features: string[];
};

type Invoice = {
  id: string;
  date: string;
  amount: string;
  status: string;
};

type PlansTabProps = {
  plans: Plan[];
  invoices: Invoice[];
  onSelectPlan: (plan: Plan) => void;
  onDownloadInvoice: (id: string) => void;
};

const PlansTab: React.FC<PlansTabProps> = ({ plans, invoices, onSelectPlan, onDownloadInvoice }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Resource Usage Meters */}
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
        <h2 className="text-base font-bold text-[var(--text-primary)]">
          {t('settings.plans.usageTitle')}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[var(--text-secondary)]">{t('settings.plans.branchesUsed')}</span>
              <span className="text-[var(--primary)] font-bold">2 / 3</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
              <div className="h-full bg-[var(--primary)] w-[66%]" />
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[var(--text-secondary)]">{t('settings.plans.staffUsed')}</span>
              <span className="text-[var(--primary)] font-bold">8 / 15</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
              <div className="h-full bg-[var(--primary)] w-[53%]" />
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[var(--text-secondary)]">{t('settings.plans.scansUsed')}</span>
              <span className="text-[var(--primary)] font-bold">4,200 / 10,000</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
              <div className="h-full bg-emerald-500 w-[42%]" />
            </div>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-[var(--text-secondary)]">{t('settings.plans.storageUsed')}</span>
              <span className="text-[var(--primary)] font-bold">1.2 GB / 5 GB</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--color-border)]">
              <div className="h-full bg-sky-500 w-[24%]" />
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Tiers */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`rounded-2xl border p-6 shadow-lg space-y-4 flex flex-col justify-between relative ${
              p.isActive
                ? 'border-[var(--primary)] bg-[var(--card)] ring-2 ring-[var(--primary)]/30'
                : 'border-[var(--color-border)] bg-[var(--card)]'
            }`}
          >
            {p.isActive && (
              <span className="absolute -top-3 right-4 rounded-full bg-[var(--primary)] px-3 py-1 text-[10px] font-bold text-white shadow">
                {t('settings.plans.currentPlan')}
              </span>
            )}
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">{p.name}</h3>
              <div className="text-2xl font-extrabold text-[var(--primary)]">{p.price}</div>
              <ul className="space-y-2 text-xs text-[var(--text-secondary)] pt-4 border-t border-[var(--color-border)]">
                {p.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => onSelectPlan(p)}
              className={`w-full mt-4 rounded-xl py-2.5 text-xs font-bold transition cursor-pointer ${
                p.isActive
                  ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20 cursor-default'
                  : 'bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] shadow-md'
              }`}
            >
              {p.isActive ? t('settings.plans.currentPlan') : t('settings.plans.upgradeBtn')}
            </button>
          </div>
        ))}
      </div>

      {/* Billing & Invoices */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
            <CreditCard className="h-5 w-5 text-[var(--primary)]" />
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              {t('settings.plans.billingTitle')}
            </h2>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-[var(--color-border)]">
              <span className="text-[var(--text-muted)]">{t('settings.plans.currentCycle')}</span>
              <span className="font-semibold text-[var(--text-primary)]">Feb 01 → Feb 28, 2025</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[var(--color-border)]">
              <span className="text-[var(--text-muted)]">{t('settings.plans.nextPayment')}</span>
              <span className="font-semibold text-[var(--text-primary)]">March 01, 2025</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-[var(--color-border)]">
              <span className="text-[var(--text-muted)]">{t('settings.plans.paymentMethod')}</span>
              <span className="font-semibold text-[var(--text-primary)]">Visa ending in •••• 4242</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[var(--text-muted)]">{t('settings.plans.monthlyCost')}</span>
              <span className="font-bold text-[var(--primary)] text-sm">$79.00 / mo</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
          <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-3">
            <FileText className="h-5 w-5 text-[var(--primary)]" />
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              {t('settings.plans.invoicesTitle')}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--color-border)] text-[var(--text-muted)]">
                  <th className="py-2">{t('settings.plans.invNumber')}</th>
                  <th className="py-2">{t('settings.plans.invDate')}</th>
                  <th className="py-2">{t('settings.plans.invAmount')}</th>
                  <th className="py-2">{t('settings.plans.invStatus')}</th>
                  <th className="py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {invoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[var(--surface)] transition">
                    <td className="py-2.5 font-bold font-mono text-[var(--text-primary)]">{inv.id}</td>
                    <td className="py-2.5 text-[var(--text-secondary)]">{inv.date}</td>
                    <td className="py-2.5 font-semibold text-[var(--text-primary)]">{inv.amount}</td>
                    <td className="py-2.5">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500">
                        <CheckCircle2 className="h-3 w-3" />
                        {t('settings.plans.paid')}
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        type="button"
                        onClick={() => onDownloadInvoice(inv.id)}
                        className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-[var(--primary)] hover:bg-[var(--primary)]/10 transition cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>{t('settings.plans.downloadPdf')}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansTab;