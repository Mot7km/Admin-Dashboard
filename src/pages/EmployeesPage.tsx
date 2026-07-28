import { useTranslation } from '../context/LanguageContext';
import { UserCheck } from 'lucide-react';

const EmployeesPage = () => {
  const { t } = useTranslation();

  const staff = [
    { name: 'Alex Morgan', role: 'Owner / General Manager', branch: 'All Branches', status: 'Active' },
    { name: 'Khaled Hassan', role: 'Branch Manager', branch: 'Main Branch', status: 'Active' },
    { name: 'Youssef Ali', role: 'Head Cashier', branch: 'Main Branch', status: 'Active' },
  ];

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          {t('nav.employees')}
        </h1>
        <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
          Staff management, roles & permissions, QR attendance, and shift schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {staff.map((s) => (
          <div key={s.name} className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] font-bold">
              <UserCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-[var(--text-primary)]">{s.name}</h3>
            <p className="text-xs text-[var(--primary)] font-semibold">{s.role}</p>
            <p className="text-[11px] text-[var(--text-muted)]">{s.branch}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeesPage;
