import { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { Package, AlertTriangle, FileText, Plus, X, Link } from 'lucide-react';

const InventoryPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'stock' | 'recipes' | 'po'>('stock');
  const [showRecipeModal, setShowRecipeModal] = useState(false);

  // Ingredients Data matching Mot7km ERP
  const ingredients = [
    { id: 'i-1', name: 'Angus Beef Patties (180g)', category: 'Meat & Poultry', currentStock: 45, maxStock: 300, unit: 'pcs', supplier: 'Al-Watania Meats', lastRestock: 'Feb 24, 2025' },
    { id: 'i-2', name: 'Truffle Oil Sauce', category: 'Sauces & Spices', currentStock: 12, maxStock: 100, unit: 'Liters', supplier: 'Gourmet Imports', lastRestock: 'Feb 20, 2025' },
    { id: 'i-3', name: 'Spanish Condensed Milk', category: 'Dairy & Coffee', currentStock: 8, maxStock: 120, unit: 'Cans', supplier: 'Delta Dairy', lastRestock: 'Feb 15, 2025' },
    { id: 'i-4', name: 'Brioche Burger Buns', category: 'Bakery', currentStock: 160, maxStock: 250, unit: 'pcs', supplier: 'El-Makhabez', lastRestock: 'Feb 26, 2025' },
  ];

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {t('inventory.title')}
          </h1>
          <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
            {t('inventory.subtitle')}
          </p>
        </div>

        <button className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[var(--primary-dark)] transition">
          <FileText className="h-4 w-4" />
          <span>{t('inventory.exportPo')}</span>
        </button>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('stock')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'stock'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Package className="h-4 w-4" />
          <span>{t('inventory.tabs.stockLevels')}</span>
        </button>

        <button
          onClick={() => setActiveTab('recipes')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'recipes'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Link className="h-4 w-4" />
          <span>{t('inventory.tabs.recipeLink')}</span>
        </button>
      </div>

      {/* TAB 1: Ingredient Stock Levels with Threshold Progress Bars */}
      {activeTab === 'stock' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[var(--text-primary)]">Raw Ingredient Inventory & Thresholds</h2>
              <span className="text-xs font-semibold text-rose-500 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                {t('inventory.lowStockAlert')}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[var(--color-border)] bg-[var(--surface)] font-semibold text-[var(--text-muted)]">
                  <tr>
                    <th className="p-3">Ingredient</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Supplier Tag</th>
                    <th className="p-3">Stock Threshold Gauge</th>
                    <th className="p-3">Current Stock</th>
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
                              <span className={isLow ? 'text-rose-500' : 'text-[var(--text-muted)]'}>{percentage}% Stock Remaining</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--elevated)]">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${isLow ? 'bg-rose-500' : 'bg-emerald-500'}`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="p-3 font-bold text-[var(--text-primary)]">
                          {ing.currentStock} / {ing.maxStock} {ing.unit}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Dish Recipe Builder */}
      {activeTab === 'recipes' && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Automatic Dish Recipe Ingredient Deductions</h2>
            <button onClick={() => setShowRecipeModal(true)} className="flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] border border-[var(--color-border)] px-3 py-1.5 rounded-xl hover:bg-[var(--elevated)]">
              <Plus className="h-4 w-4" /> Link Recipe
            </button>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-4 text-xs space-y-2">
            <h4 className="font-bold text-[var(--primary)]">1x Smoked Truffle Burger automatically deducts:</h4>
            <ul className="list-disc pl-5 space-y-1 text-[var(--text-secondary)]">
              <li>1x Brioche Burger Bun</li>
              <li>1x Angus Beef Patty (180g)</li>
              <li>15 ml Truffle Oil Sauce</li>
            </ul>
          </div>
        </div>
      )}

      {/* MODAL: Recipe Link Builder Modal */}
      {showRecipeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">Link Dish to Raw Ingredients</h3>
              <button onClick={() => setShowRecipeModal(false)}><X className="h-5 w-5 text-[var(--text-muted)]" /></button>
            </div>
            <p className="text-xs text-[var(--text-muted)]">Select dish and assign deduction quantities per sale</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
