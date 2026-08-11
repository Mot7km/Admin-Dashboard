import { Zap } from 'lucide-react';

type MenuHeaderProps = {
  title: string;
  subtitle: string;
  peakHourLabel: string;
  isPeakHour: boolean;
  onTogglePeak: () => void;
};

const MenuHeader = ({ title, subtitle, peakHourLabel, isPeakHour, onTogglePeak }: MenuHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl lg:text-3xl">{title}</h1>
        <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">{subtitle}</p>
      </div>

      <button
        onClick={onTogglePeak}
        className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition shadow-sm ${
          isPeakHour ? 'bg-amber-500 text-white ring-2 ring-amber-500/30' : 'border border-[var(--color-border)] bg-[var(--card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
      >
        <Zap className="h-4 w-4" />
        <span>{peakHourLabel}</span>
      </button>
    </div>
  );
};

export default MenuHeader;
