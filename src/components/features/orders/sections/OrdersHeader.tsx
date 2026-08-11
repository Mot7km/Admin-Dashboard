import { ChefHat } from 'lucide-react';

type OrdersHeaderProps = {
  title: string;
  subtitle: string;
  kdsBadge: string;
};

const OrdersHeader = ({ title, subtitle, kdsBadge }: OrdersHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl lg:text-3xl">
            {title}
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-500 ring-1 ring-blue-500/20">
            <ChefHat className="h-3.5 w-3.5" />
            {kdsBadge}
          </span>
        </div>
        <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

export default OrdersHeader;