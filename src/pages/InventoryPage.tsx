import { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { useToast } from '../components/common/Toast';
import { Package, AlertTriangle, FileText, Plus, X, Link, RefreshCw } from 'lucide-react';

const InventoryPage = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'stock' | 'recipes' | 'po'>('stock');
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showAddIngredientModal, setShowAddIngredientModal] = useState(false);

  // Form State
  const [ingName, setIngName] = useState('');
  const [ingCategory, setIngCategory] = useState('Meat & Poultry');
  const [ingSupplier, setIngSupplier] = useState('Al-Watania Meats');
  const [ingStock, setIngStock] = useState('100');

  // Recipe Form State
  const [selectedRecipeDish, setSelectedRecipeDish] = useState('Smoked Truffle Burger');

  // Ingredients Data matching Mot7km ERP
  const [ingredients, setIngredients] = useState([
    { id: 'i-1', name: 'Angus Beef Patties (180g)', category: 'Meat & Poultry', currentStock: 45, maxStock: 300, unit: 'pcs', supplier: 'Al-Watania Meats', lastRestock: 'Feb 24, 2025' },
    { id: 'i-2', name: 'Truffle Oil Sauce', category: 'Sauces & Spices', currentStock: 12, maxStock: 100, unit: 'Liters', supplier: 'Gourmet Imports', lastRestock: 'Feb 20, 2025' },
    { id: 'i-3', name: 'Spanish Condensed Milk', category: 'Dairy & Coffee', currentStock: 8, maxStock: 120, unit: 'Cans', supplier: 'Delta Dairy', lastRestock: 'Feb 15, 2025' },
    { id: 'i-4', name: 'Brioche Burger Buns', category: 'Bakery', currentStock: 160, maxStock: 250, unit: 'pcs', supplier: 'El-Makhabez', lastRestock: 'Feb 26, 2025' },
  ]);

  const handleRestock = (ingId: string) => {
    setIngredients(
      ingredients.map((ing) => (ing.id === ingId ? { ...ing, currentStock: ing.maxStock } : ing))
    );
    showToast(t('common.success'), 'success');
  };

  const handleAddIngredient = () => {
    if (!ingName.trim()) return;
    setIngredients([
      ...ingredients,
      {
        id: `i-${Date.now()}`,
        name: ingName,
        category: ingCategory,
        currentStock: Number(ingStock) || 50,
        maxStock: 200,
        unit: 'pcs',
        supplier: ingSupplier,
        lastRestock: 'Today',
      },
    ]);
    setIngName('');
    setShowAddIngredientModal(false);
    showToast(t('common.success'), 'success');
  };

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

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddIngredientModal(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--surface)] border border-[var(--color-border)] px-3.5 py-2.5 text-xs font-bold text-[var(--text-primary)] hover:bg-[var(--elevated)] transition"
          >
            <Plus className="h-4 w-4 text-[var(--primary)]" />
            <span>{t('inventory.addIngredient')}</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('po');
              showToast(t('inventory.exportPo'), 'info');
            }}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[var(--primary-dark)] transition"
          >
            <FileText className="h-4 w-4" />
            <span>{t('inventory.exportPo')}</span>
          </button>
        </div>
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

        <button
          onClick={() => setActiveTab('po')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'po'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>{t('inventory.tabs.restockPo')}</span>
        </button>
      </div>

      {/* TAB 1: Ingredient Stock Levels with Threshold Progress Bars */}
      {activeTab === 'stock' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-[var(--text-primary)]">{t('inventory.title')}</h2>
              <span className="text-xs font-semibold text-rose-500 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                {t('inventory.lowStockAlert')}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[var(--color-border)] bg-[var(--surface)] font-semibold text-[var(--text-muted)]">
                  <tr>
                    <th className="p-3">{t('inventory.table.ingredient')}</th>
                    <th className="p-3">{t('inventory.table.category')}</th>
                    <th className="p-3">{t('inventory.table.supplierTag')}</th>
                    <th className="p-3">{t('inventory.table.stockGauge')}</th>
                    <th className="p-3">{t('inventory.table.currentStock')}</th>
                    <th className="p-3 text-right">{t('common.actions')}</th>
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
                              <span className={isLow ? 'text-rose-500' : 'text-[var(--text-muted)]'}>{percentage}% {t('inventory.stockRemaining')}</span>
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
                        <td className="p-3 text-right">
                          <button
                            onClick={() => handleRestock(ing.id)}
                            className="inline-flex items-center gap-1 rounded-lg bg-[var(--primary)]/10 px-2.5 py-1 text-[11px] font-bold text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition"
                          >
                            <RefreshCw className="h-3 w-3" />
                            <span>Restock</span>
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
      )}

      {/* TAB 2: Dish Recipe Builder */}
      {activeTab === 'recipes' && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[var(--text-primary)]">{t('inventory.recipeTitle')}</h2>
            <button onClick={() => setShowRecipeModal(true)} className="flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] border border-[var(--color-border)] px-3 py-1.5 rounded-xl hover:bg-[var(--elevated)]">
              <Plus className="h-4 w-4" /> {t('inventory.linkRecipe')}
            </button>
          </div>
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-4 text-xs space-y-2">
            <h4 className="font-bold text-[var(--primary)]">{t('inventory.deductsHeader')}</h4>
            <ul className="list-disc pl-5 space-y-1 text-[var(--text-secondary)]">
              <li>1x Brioche Burger Bun</li>
              <li>1x Angus Beef Patty (180g)</li>
              <li>15 ml Truffle Oil Sauce</li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 3: Restock PO */}
      {activeTab === 'po' && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
          <h2 className="text-base font-bold text-[var(--text-primary)]">{t('inventory.tabs.restockPo')}</h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl border border-[var(--color-border)] bg-[var(--surface)]">
              <div>
                <h4 className="font-bold text-[var(--text-primary)]">PO #2025-084 — Al-Watania Meats</h4>
                <p className="text-[11px] text-[var(--text-muted)]">300x Angus Beef Patties • Total: $1,200.00</p>
              </div>
              <span className="rounded-md bg-amber-500/10 px-2 py-1 font-bold text-amber-500">Pending Delivery</span>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Recipe Link Builder Modal */}
      {showRecipeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">{t('inventory.linkRecipe')}</h3>
              <button onClick={() => setShowRecipeModal(false)}><X className="h-5 w-5 text-[var(--text-muted)]" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[var(--text-secondary)]">Select Dish</label>
                <select
                  value={selectedRecipeDish}
                  onChange={(e) => setSelectedRecipeDish(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"
                >
                  <option value="Smoked Truffle Burger">Smoked Truffle Burger</option>
                  <option value="Spanish Iced Latte">Spanish Iced Latte</option>
                  <option value="Neapolitan Margherita">Neapolitan Margherita</option>
                </select>
              </div>
              <div>
                <label className="font-semibold text-[var(--text-secondary)]">Linked Ingredients</label>
                <div className="mt-1 space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-xl border border-[var(--color-border)] bg-[var(--surface)]">
                    <span>Angus Beef Patty (180g)</span>
                    <span className="font-bold text-[var(--primary)]">1 pcs</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl border border-[var(--color-border)] bg-[var(--surface)]">
                    <span>Truffle Oil Sauce</span>
                    <span className="font-bold text-[var(--primary)]">15 ml</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
              <button onClick={() => setShowRecipeModal(false)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-xs font-semibold">
                {t('common.cancel')}
              </button>
              <button onClick={() => { setShowRecipeModal(false); showToast(t('common.success'), 'success'); }} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow">
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Raw Ingredient */}
      {showAddIngredientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-sm text-[var(--text-primary)]">{t('inventory.addIngredient')}</h3>
              <button onClick={() => setShowAddIngredientModal(false)}><X className="h-5 w-5 text-[var(--text-muted)]" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-[var(--text-secondary)]">Ingredient Name</label>
                <input
                  type="text"
                  value={ingName}
                  onChange={(e) => setIngName(e.target.value)}
                  placeholder="e.g. Cheddar Cheese Slices"
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-[var(--text-secondary)]">Category</label>
                <input
                  type="text"
                  value={ingCategory}
                  onChange={(e) => setIngCategory(e.target.value)}
                  placeholder="e.g. Dairy"
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-[var(--text-secondary)]">Supplier Tag</label>
                <input
                  type="text"
                  value={ingSupplier}
                  onChange={(e) => setIngSupplier(e.target.value)}
                  placeholder="e.g. Al-Watania Meats"
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"
                />
              </div>
              <div>
                <label className="font-semibold text-[var(--text-secondary)]">Initial Stock Quantity</label>
                <input
                  type="number"
                  value={ingStock}
                  onChange={(e) => setIngStock(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
              <button onClick={() => setShowAddIngredientModal(false)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-xs font-semibold">
                {t('common.cancel')}
              </button>
              <button onClick={handleAddIngredient} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow">
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryPage;
