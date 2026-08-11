import React from 'react';
import { useTranslation } from '../../../../context/LanguageContext';
import { ShieldCheck, Search } from 'lucide-react';
import type { AuditLog } from '../settings.types';

type AuditTabProps = {
  logs: AuditLog[];
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  typeFilter: string;
  setTypeFilter: (val: string) => void;
};

const getTypeBadge = (type: AuditLog['type']) => {
  switch (type) {
    case 'price':
      return <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-500 ring-1 ring-emerald-500/20">Menu & Prices</span>;
    case 'stock':
      return <span className="rounded-md bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-500 ring-1 ring-amber-500/20">Stock & Recipes</span>;
    case 'staff':
      return <span className="rounded-md bg-sky-500/10 px-2 py-0.5 text-[10px] font-bold text-sky-500 ring-1 ring-sky-500/20">Staff & Roles</span>;
    case 'auth':
      return <span className="rounded-md bg-purple-500/10 px-2 py-0.5 text-[10px] font-bold text-purple-500 ring-1 ring-purple-500/20">Auth & Security</span>;
    case 'delete':
      return <span className="rounded-md bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-500 ring-1 ring-rose-500/20">Deletion</span>;
    default:
      return null;
  }
};

const AuditTab: React.FC<AuditTabProps> = ({
  logs,
  searchQuery,
  setSearchQuery,
  typeFilter,
  setTypeFilter,
}) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-3 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-[var(--primary)]" />
          <h2 className="text-base font-bold text-[var(--text-primary)]">
            {t('settings.audit.title')}
          </h2>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold focus:outline-none cursor-pointer"
          >
            <option value="all">{t('settings.audit.filterActionType')}</option>
            <option value="price">{t('settings.audit.filterPrice')}</option>
            <option value="stock">{t('settings.audit.filterStock')}</option>
            <option value="staff">{t('settings.audit.filterStaff')}</option>
            <option value="auth">{t('settings.audit.filterAuth')}</option>
            <option value="delete">{t('settings.audit.filterDelete')}</option>
          </select>

          <div className="relative w-full sm:w-56">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('settings.audit.searchPlaceholder')}
              className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] py-1.5 pl-8 pr-3 text-xs font-medium focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2.5 text-xs">
        {logs.length === 0 ? (
          <p className="text-center py-8 text-[var(--text-muted)]">{t('common.noResults')}</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex flex-col gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-3 sm:flex-row sm:items-center sm:justify-between hover:border-[var(--primary)]/30 transition"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--card)] font-bold text-[var(--primary)] ring-1 ring-[var(--color-border)]">
                  {log.user.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-[var(--text-primary)]">{log.action}</h4>
                    {getTypeBadge(log.type)}
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] mt-0.5">By {log.user}</p>
                </div>
              </div>

              <span className="text-[11px] font-mono text-[var(--text-muted)] whitespace-nowrap self-end sm:self-auto">
                {log.time}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AuditTab;