import { useState } from 'react';
import { useTranslation } from '../../../context/LanguageContext';
import { useToast } from '../../common/Toast';
import InventoryHeader from './sections/InventoryHeader';
import InventoryPoTab from './sections/InventoryPoTab';
import InventoryRecipeTab from './sections/InventoryRecipeTab';
import InventoryStockTab from './sections/InventoryStockTab';
import InventoryTabs from './sections/InventoryTabs';
import { X } from 'lucide-react';

const InventoryDashboard = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'stock' | 'recipes' | 'po'>('stock');
  const [showRecipeModal, setShowRecipeModal] = useState(false);
  const [showAddIngredientModal, setShowAddIngredientModal] = useState(false);
  const [ingName, setIngName] = useState('');
  const [ingCategory, setIngCategory] = useState('Meat & Poultry');
  const [ingSupplier, setIngSupplier] = useState('Al-Watania Meats');
  const [ingStock, setIngStock] = useState('100');
  const [selectedRecipeDish, setSelectedRecipeDish] = useState('Smoked Truffle Burger');

  const [ingredients, setIngredients] = useState([
    { id: 'i-1', name: 'Angus Beef Patties (180g)', category: 'Meat & Poultry', currentStock: 45, maxStock: 300, unit: 'pcs', supplier: 'Al-Watania Meats', lastRestock: 'Feb 24, 2025' },
    { id: 'i-2', name: 'Truffle Oil Sauce', category: 'Sauces & Spices', currentStock: 12, maxStock: 100, unit: 'Liters', supplier: 'Gourmet Imports', lastRestock: 'Feb 20, 2025' },
    { id: 'i-3', name: 'Spanish Condensed Milk', category: 'Dairy & Coffee', currentStock: 8, maxStock: 120, unit: 'Cans', supplier: 'Delta Dairy', lastRestock: 'Feb 15, 2025' },
    { id: 'i-4', name: 'Brioche Burger Buns', category: 'Bakery', currentStock: 160, maxStock: 250, unit: 'pcs', supplier: 'El-Makhabez', lastRestock: 'Feb 26, 2025' },
  ]);

  const handleRestock = (ingId: string) => {
    setIngredients(ingredients.map((ing) => (ing.id === ingId ? { ...ing, currentStock: ing.maxStock } : ing)));
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
      <InventoryHeader
        title={t('inventory.title')}
        subtitle={t('inventory.subtitle')}
        addIngredientLabel={t('inventory.addIngredient')}
        exportPoLabel={t('inventory.exportPo')}
        onAddIngredient={() => setShowAddIngredientModal(true)}
        onExportPo={() => {
          setActiveTab('po');
          showToast(t('inventory.exportPo'), 'info');
        }}
      />

      <InventoryTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        stockLabel={t('inventory.tabs.stockLevels')}
        recipesLabel={t('inventory.tabs.recipeLink')}
        poLabel={t('inventory.tabs.restockPo')}
      />

      {activeTab === 'stock' && (
        <InventoryStockTab
          ingredients={ingredients}
          onRestock={handleRestock}
          titleLabel={t('inventory.title')}
          lowStockLabel={t('inventory.lowStockAlert')}
          ingredientLabel={t('inventory.table.ingredient')}
          categoryLabel={t('inventory.table.category')}
          supplierLabel={t('inventory.table.supplierTag')}
          stockGaugeLabel={t('inventory.table.stockGauge')}
          currentStockLabel={t('inventory.table.currentStock')}
          actionsLabel={t('common.actions')}
          stockRemainingLabel={t('inventory.stockRemaining')}
          restockLabel="Restock"
        />
      )}

      {activeTab === 'recipes' && (
        <InventoryRecipeTab
          title={t('inventory.recipeTitle')}
          linkRecipeLabel={t('inventory.linkRecipe')}
          deductsHeader={t('inventory.deductsHeader')}
          onOpenRecipe={() => setShowRecipeModal(true)}
        />
      )}

      {activeTab === 'po' && <InventoryPoTab title={t('inventory.tabs.restockPo')} />}

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
                <select value={selectedRecipeDish} onChange={(e) => setSelectedRecipeDish(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none">
                  <option value="Smoked Truffle Burger">Smoked Truffle Burger</option>
                  <option value="Spanish Iced Latte">Spanish Iced Latte</option>
                  <option value="Neapolitan Margherita">Neapolitan Margherita</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2"><button onClick={() => setShowRecipeModal(false)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)]">{t('common.cancel')}</button><button onClick={() => setShowRecipeModal(false)} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow">{t('common.save')}</button></div>
          </div>
        </div>
      )}

      {showAddIngredientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-base text-[var(--text-primary)]">{t('inventory.addIngredient')}</h3>
              <button onClick={() => setShowAddIngredientModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-3 text-xs">
              <div><label className="font-semibold text-[var(--text-secondary)]">Ingredient Name</label><input type="text" value={ingName} onChange={(e) => setIngName(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none" /></div>
              <div><label className="font-semibold text-[var(--text-secondary)]">Category</label><select value={ingCategory} onChange={(e) => setIngCategory(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none"><option>Meat & Poultry</option><option>Sauces & Spices</option><option>Dairy & Coffee</option><option>Bakery</option></select></div>
              <div><label className="font-semibold text-[var(--text-secondary)]">Supplier</label><input type="text" value={ingSupplier} onChange={(e) => setIngSupplier(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none" /></div>
              <div><label className="font-semibold text-[var(--text-secondary)]">Current Stock</label><input type="text" value={ingStock} onChange={(e) => setIngStock(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 font-medium focus:outline-none" /></div>
            </div>
            <div className="flex justify-end gap-2 pt-2"><button onClick={() => setShowAddIngredientModal(false)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)]">{t('common.cancel')}</button><button onClick={handleAddIngredient} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow">{t('common.save')}</button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryDashboard;
