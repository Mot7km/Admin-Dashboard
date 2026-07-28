import { useTranslation } from '../context/LanguageContext';

const InventoryPage = () => {
  const { t } = useTranslation();

  const inventoryItems = [
    { name: 'Espresso Beans (Arabica)', stock: '45 kg', status: 'In Stock' },
    { name: 'Full Cream Milk', stock: '8 L', status: 'Low Stock' },
    { name: 'Truffle Oil', stock: '2.5 L', status: 'In Stock' },
  ];

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          {t('nav.inventory')}
        </h1>
        <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
          Raw ingredients, stock levels, low-stock alerts, and expense management.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg space-y-4">
        {inventoryItems.map((item) => (
          <div key={item.name} className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 last:border-0 text-xs">
            <span className="font-bold text-[var(--text-primary)]">{item.name}</span>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-[var(--text-secondary)]">{item.stock}</span>
              <span className={`rounded-md px-2 py-0.5 font-semibold text-[11px] ${
                item.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
              }`}>
                {item.status}
              </span>
            </div>
      
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryPage;
