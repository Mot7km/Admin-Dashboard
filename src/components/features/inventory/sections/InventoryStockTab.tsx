import { AlertTriangle, RefreshCw } from 'lucide-react';

type Ingredient = {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  maxStock: number;
  unit: string;
  supplier: string;
  lastRestock: string;
};

type InventoryStockTabProps = {
  ingredients: Ingredient[];
  onRestock: (id: string) => void;
  titleLabel: string;
  lowStockLabel: string;
  ingredientLabel: string;
  categoryLabel: string;
  supplierLabel: string;
  stockGaugeLabel: string;
  currentStockLabel: string;
  actionsLabel: string;
  stockRemainingLabel: string;
  restockLabel: string;
};

const InventoryStockTab = ({ ingredients, onRestock, titleLabel, lowStockLabel, ingredientLabel, categoryLabel, supplierLabel, stockGaugeLabel, currentStockLabel, actionsLabel, stockRemainingLabel, restockLabel }: InventoryStockTabProps) => {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[var(--text-primary)]">{titleLabel}</h2>
          <span className="text-xs font-semibold text-rose-500 flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            {lowStockLabel}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[var(--color-border)] bg-[var(--surface)] font-semibold text-[var(--text-muted)]">
              <tr>
                <th className="p-3">{ingredientLabel}</th>
                <th className="p-3">{categoryLabel}</th>
                <th className="p-3">{supplierLabel}</th>
                <th className="p-3">{stockGaugeLabel}</th>
                <th className="p-3">{currentStockLabel}</th>
                <th className="p-3 text-right">{actionsLabel}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {ingredients.map((ing) => {
                const percentage = Math.round((ing.currentStock / ing.maxStock) * 100);
                const isLow = percentage < 15;

                return (
                  <tr key={ing.id} className="hover:bg-[var(--elevated)]/40 transition">
                    <td className="p-3 font-bold text-[var(--text-primary)]">{ing.name}</td>
                    <td className="p-3 text-[var(--text-secondary)]">{ing.category}</td>
                    <td className="p-3">
                      <span className="rounded-md bg-[var(--surface)] border border-[var(--color-border)] px-2 py-0.5 font-medium text-[var(--text-muted)]">
                        {ing.supplier}
                      </span>
                    </td>
                    <td className="p-3 w-48">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold">
                          <span className={isLow ? 'text-rose-500' : 'text-[var(--text-muted)]'}>{percentage}% {stockRemainingLabel}</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--elevated)]">
                          <div className={`h-full rounded-full transition-all duration-500 ${isLow ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${percentage}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="p-3 font-bold text-[var(--text-primary)]">
                      {ing.currentStock} / {ing.maxStock} {ing.unit}
                    </td>
                    <td className="p-3 text-right">
                      <button onClick={() => onRestock(ing.id)} className="inline-flex items-center gap-1 rounded-lg bg-[var(--primary)]/10 px-2.5 py-1 text-[11px] font-bold text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition">
                        <RefreshCw className="h-3 w-3" />
                        <span>{restockLabel}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryStockTab;
