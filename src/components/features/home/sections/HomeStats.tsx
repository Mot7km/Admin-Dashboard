import type { FC } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { useTranslation } from '../../../../../app/context/LanguageContext';
import type { HomeStat } from '../home.types';

type HomeStatsProps = {
  stats: HomeStat[];
};

const HomeStats: FC<HomeStatsProps> = ({ stats }) => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.titleKey}
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-3.5 sm:p-5 shadow-lg transition-all duration-300 hover:border-[var(--primary)]/40 hover:-translate-y-0.5"
        >
          <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${stat.haloColor} opacity-70 transition-opacity group-hover:opacity-100`} />

          <div className="relative z-10">
            <div className="flex items-center justify-between text-xs font-medium text-[var(--text-muted)]">
              <span>{t(stat.titleKey)}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] ring-1 ring-[var(--primary)]/20">
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl lg:text-3xl">
                {stat.value}
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[var(--primary)]">
                {stat.changeKey ? t(stat.changeKey) : stat.change}
              </span>
            </div>
          </div>

          <div className="relative z-10 mt-4 h-14 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stat.data} margin={{ top: 4, right: 4, left: 4, bottom: 2 }}>
                <defs>
                  <linearGradient id={`grad-${stat.titleKey}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--color-border)',
                    borderRadius: '8px',
                    padding: '4px 8px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  }}
                  labelStyle={{ color: 'var(--text-muted)', fontSize: '10px' }}
                  formatter={(val: unknown) => [stat.formatVal(Number(val)), t(stat.titleKey)]}
                />
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill={`url(#grad-${stat.titleKey})`}
                  activeDot={{ r: 5, fill: 'var(--primary)', stroke: '#FFFFFF', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeStats;