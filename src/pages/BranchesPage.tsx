import { useTranslation } from '../context/LanguageContext';
import { Plus, MapPin, Phone } from 'lucide-react';

const BranchesPage = () => {
  const { t } = useTranslation();

  const branches = [
    { id: 1, name: 'Main Branch — Downtown', location: 'Downtown Avenue, Building 14', phone: '+20 100 123 4567', status: 'Active' },
    { id: 2, name: 'Mall Branch — West Side', location: 'City Mall, Food Court 2nd Floor', phone: '+20 100 765 4321', status: 'Active' },
  ];

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {t('nav.branches')}
          </h1>
          <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
            Manage your restaurant locations and branch profiles.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-[var(--primary-dark)] transition">
          <Plus className="h-4 w-4" /> Add Branch
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {branches.map((b) => (
          <div key={b.id} className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-base text-[var(--text-primary)]">{b.name}</h3>
              <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-500">{b.status}</span>
            </div>
            <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
              <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-[var(--text-muted)]" /> {b.location}</div>
              <div className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-[var(--text-muted)]" /> {b.phone}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BranchesPage;
