import { Plus } from 'lucide-react';

type InventoryRecipeTabProps = {
  title: string;
  linkRecipeLabel: string;
  deductsHeader: string;
  onOpenRecipe: () => void;
};

const InventoryRecipeTab = ({ title, linkRecipeLabel, deductsHeader, onOpenRecipe }: InventoryRecipeTabProps) => {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-[var(--text-primary)]">{title}</h2>
        <button onClick={onOpenRecipe} className="flex items-center gap-1.5 text-xs font-bold text-[var(--primary)] border border-[var(--color-border)] px-3 py-1.5 rounded-xl hover:bg-[var(--elevated)]">
          <Plus className="h-4 w-4" /> {linkRecipeLabel}
        </button>
      </div>
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-4 text-xs space-y-2">
        <h4 className="font-bold text-[var(--primary)]">{deductsHeader}</h4>
        <ul className="list-disc pl-5 space-y-1 text-[var(--text-secondary)]">
          <li>1x Brioche Burger Bun</li>
          <li>1x Angus Beef Patty (180g)</li>
          <li>15 ml Truffle Oil Sauce</li>
        </ul>
      </div>
    </div>
  );
};

export default InventoryRecipeTab;
