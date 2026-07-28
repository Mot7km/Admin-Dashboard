import { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { useToast } from '../components/common/Toast';
import EmptyState from '../components/common/EmptyState';
import { Clock, AlertCircle, ChefHat, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface Order {
  id: string;
  type: string;
  items: string[];
  total: string;
  time: string;
  isUrgent: boolean;
  columnId: 'new' | 'preparing' | 'ready' | 'completed';
}

const OrdersPage = () => {
  const { t, locale } = useTranslation();
  const { showToast } = useToast();

  const [typeFilter, setTypeFilter] = useState<'all' | 'dinein' | 'takeaway'>('all');

  const [orders, setOrders] = useState<Order[]>([
    { id: '#ORD-2049', type: 'Dine-In (Table 4)', items: ['2x Smoked Truffle Burger', '2x Spanish Iced Latte'], total: '$42.00', time: '3m ago', isUrgent: false, columnId: 'new' },
    { id: '#ORD-2050', type: 'Takeaway', items: ['1x Margherita Pizza', '1x Iced Tea'], total: '$21.50', time: '1m ago', isUrgent: false, columnId: 'new' },
    { id: '#ORD-2048', type: 'Takeaway', items: ['1x Crispy Chicken Wrap', '1x Pistachio Pancake'], total: '$24.00', time: '14m ago', isUrgent: false, columnId: 'preparing' },
    { id: '#ORD-2045', type: 'Dine-In (Table 8)', items: ['3x Smoked Truffle Burger'], total: '$43.50', time: '18m ago', isUrgent: true, columnId: 'preparing' },
    { id: '#ORD-2046', type: 'Dine-In (Table 2)', items: ['2x Spanish Iced Latte'], total: '$13.00', time: '22m ago', isUrgent: false, columnId: 'ready' },
    { id: '#ORD-2044', type: 'Takeaway', items: ['1x Margherita Pizza'], total: '$18.00', time: '40m ago', isUrgent: false, columnId: 'completed' },
  ]);

  const moveOrder = (orderId: string, nextCol: 'new' | 'preparing' | 'ready' | 'completed') => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, columnId: nextCol } : o)));
    showToast(`${orderId} moved to ${t(`orders.kanban.${nextCol}`)}`, 'info');
  };

  const filteredOrders = orders.filter((o) => {
    if (typeFilter === 'dinein') return o.type.toLowerCase().includes('dine-in');
    if (typeFilter === 'takeaway') return o.type.toLowerCase().includes('takeaway');
    return true;
  });

  const kanbanColumns = [
    {
      id: 'new',
      titleKey: 'orders.kanban.new',
      borderColor: 'border-blue-500/40',
      badgeColor: 'bg-blue-500/10 text-blue-500 ring-blue-500/20',
      nextAction: 'preparing' as const,
      actionLabelKey: 'orders.actions.markPreparing',
    },
    {
      id: 'preparing',
      titleKey: 'orders.kanban.preparing',
      borderColor: 'border-amber-500/40',
      badgeColor: 'bg-amber-500/10 text-amber-500 ring-amber-500/20',
      nextAction: 'ready' as const,
      actionLabelKey: 'orders.actions.markReady',
    },
    {
      id: 'ready',
      titleKey: 'orders.kanban.ready',
      borderColor: 'border-emerald-500/40',
      badgeColor: 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/20',
      nextAction: 'completed' as const,
      actionLabelKey: 'orders.actions.complete',
    },
    {
      id: 'completed',
      titleKey: 'orders.kanban.completed',
      borderColor: 'border-[var(--color-border)]',
      badgeColor: 'bg-[var(--elevated)] text-[var(--text-secondary)] ring-[var(--color-border)]',
      nextAction: null,
      actionLabelKey: '',
    },
  ];

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
              {t('orders.title')}
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-500 ring-1 ring-blue-500/20">
              <ChefHat className="h-3.5 w-3.5" />
              {t('orders.kdsBadge')}
            </span>
          </div>
          <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
            {t('orders.subtitle')}
          </p>
        </div>

        {/* Order Type Filters */}
        <div className="flex items-center gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--card)] p-1">
          <button
            onClick={() => setTypeFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              typeFilter === 'all' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-muted)]'
            }`}
          >
            {t('orders.filterAll')}
          </button>
          <button
            onClick={() => setTypeFilter('dinein')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              typeFilter === 'dinein' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-muted)]'
            }`}
          >
            {t('orders.filterDineIn')}
          </button>
          <button
            onClick={() => setTypeFilter('takeaway')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              typeFilter === 'takeaway' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-muted)]'
            }`}
          >
            {t('orders.filterTakeaway')}
          </button>
        </div>
      </div>

      {/* KDS Kanban Board Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kanbanColumns.map((col) => {
          const colOrders = filteredOrders.filter((o) => o.columnId === col.id);

          return (
            <div key={col.id} className="flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-4 shadow-lg h-full">
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)] mb-4">
                <h3 className="font-bold text-sm text-[var(--text-primary)]">{t(col.titleKey)}</h3>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ring-1 ${col.badgeColor}`}>
                  {colOrders.length}
                </span>
              </div>

              {/* Orders Stack */}
              <div className="space-y-3.5 flex-1 overflow-y-auto hide-scrollbar">
                {colOrders.length === 0 ? (
                  <EmptyState icon={ChefHat} titleKey="common.noResults" />
                ) : (
                  colOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className={`rounded-xl border ${col.borderColor} bg-[var(--surface)] p-4 shadow-md space-y-3 relative group transition hover:border-[var(--primary)]`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-sm text-[var(--text-primary)]">{ord.id}</span>
                        <span className="flex items-center gap-1 text-[var(--text-muted)] text-[11px]">
                          <Clock className="h-3 w-3" />
                          {ord.time}
                        </span>
                      </div>

                      <div className="text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/10 px-2 py-1 rounded-md w-max">
                        {ord.type}
                      </div>

                      <ul className="text-xs text-[var(--text-secondary)] space-y-1 pt-1 border-t border-[var(--color-border)]">
                        {ord.items.map((item, idx) => (
                          <li key={idx} className="font-medium">• {item}</li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)] text-xs">
                        <span className="font-bold text-[var(--text-primary)]">{ord.total}</span>
                        {ord.isUrgent && (
                          <span className="flex items-center gap-1 text-[11px] font-bold text-rose-500 animate-pulse">
                            <AlertCircle className="h-3 w-3" /> {t('orders.delayed')}
                          </span>
                        )}
                      </div>

                      {/* Action Move Button */}
                      {col.nextAction && (
                        <button
                          onClick={() => moveOrder(ord.id, col.nextAction!)}
                          className="w-full mt-2 flex items-center justify-center gap-1.5 rounded-lg bg-[var(--primary)] py-2 text-xs font-bold text-white shadow hover:bg-[var(--primary-dark)] transition"
                        >
                          <span>{t(col.actionLabelKey)}</span>
                          {locale === 'ar' ? <ArrowLeft className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
                        </button>
                      )}
                      {col.id === 'completed' && (
                        <div className="flex items-center justify-center gap-1 text-emerald-500 font-bold text-xs pt-1">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Order Complete</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrdersPage;
