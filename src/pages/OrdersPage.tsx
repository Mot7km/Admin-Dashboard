import { useTranslation } from '../context/LanguageContext';
import { ShoppingBag } from 'lucide-react';

const OrdersPage = () => {
  const { t } = useTranslation();

  const orders = [
    { id: '#ORD-2049', type: 'Dine-In (Table 4)', total: '$34.50', status: 'Completed', time: '10m ago' },
    { id: '#ORD-2048', type: 'Takeaway', total: '$18.00', status: 'In Kitchen', time: '15m ago' },
    { id: '#ORD-2047', type: 'Dine-In (Table 12)', total: '$62.00', status: 'Completed', time: '35m ago' },
  ];

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          {t('nav.orders')}
        </h1>
        <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
          Live POS & QR menu orders, kitchen tickets, and sales logs.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg space-y-4">
        {orders.map((ord) => (
          <div key={ord.id} className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 last:border-0 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] font-bold">
                <ShoppingBag className="h-4 w-4" />
              </div>
              <div>
                <span className="font-bold text-[var(--text-primary)]">{ord.id}</span>
                <p className="text-[var(--text-muted)]">{ord.type}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-bold text-[var(--text-primary)]">{ord.total}</span>
              <p className="text-emerald-500 font-medium">{ord.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
