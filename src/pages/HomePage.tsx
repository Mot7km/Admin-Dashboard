import { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Calendar,
  ChevronDown,
  QrCode,
  Star,
  ShoppingBag,
  Utensils,
  AlertCircle,
  TrendingUp,
  Plus,
  Printer,
  Store,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation();
  const [timeFilter, setTimeFilter] = useState('thisMonth');
  const [productFilter, setProductFilter] = useState('byViews');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [isChimeMuted, setIsChimeMuted] = useState(false);

  // Sparkline mini data for KPI cards
  const sparklineData1 = [
    { v: 1200 }, { v: 1800 }, { v: 1600 }, { v: 2400 }, { v: 2100 }, { v: 3100 }, { v: 3850 }
  ];
  const sparklineData2 = [
    { v: 120 }, { v: 125 }, { v: 130 }, { v: 135 }, { v: 138 }, { v: 140 }, { v: 142 }
  ];
  const sparklineData3 = [
    { v: 4.5 }, { v: 4.6 }, { v: 4.7 }, { v: 4.8 }, { v: 4.8 }, { v: 4.9 }, { v: 4.9 }
  ];
  const sparklineData4 = [
    { v: 2100 }, { v: 2400 }, { v: 2800 }, { v: 2600 }, { v: 3100 }, { v: 3300 }, { v: 3420 }
  ];

  // Stats definition matching Mot7km PRD for Restaurant Business Owner
  const stats = [
    {
      titleKey: 'dashboard.stats.totalMenuViews',
      value: '24,850',
      change: '↑ 14.2%',
      icon: QrCode,
      haloColor: 'from-blue-500/10 to-cyan-500/5',
      data: sparklineData1,
    },
    {
      titleKey: 'dashboard.stats.activeProducts',
      value: '142',
      changeKey: 'dashboard.stats.soldOutBadge',
      icon: Utensils,
      haloColor: 'from-emerald-500/10 to-teal-500/5',
      data: sparklineData2,
    },
    {
      titleKey: 'dashboard.stats.averageRating',
      value: '4.9 ★',
      changeKey: 'dashboard.stats.reviewsBadge',
      icon: Star,
      haloColor: 'from-amber-500/10 to-yellow-500/5',
      data: sparklineData3,
    },
    {
      titleKey: 'dashboard.stats.todaySales',
      value: '$3,420',
      change: '↑ 8.6%',
      icon: TrendingUp,
      haloColor: 'from-sky-500/10 to-blue-500/5',
      data: sparklineData4,
    },
  ];

  // QR Traffic Chart Data
  const trafficOverviewData = [
    { name: t('dashboard.dates.feb1'), views: 2400 },
    { name: t('dashboard.dates.feb8'), views: 4100 },
    { name: t('dashboard.dates.feb15'), views: 3900 },
    { name: t('dashboard.dates.feb25'), views: 5800 },
    { name: t('dashboard.dates.feb28'), views: 8650 },
  ];

  // Side-by-Side Branch Performance Bar Chart Data
  const branchComparisonData = [
    { name: 'Week 1', mainBranchSales: 4200, mallBranchSales: 2800, mainBranchViews: 5400, mallBranchViews: 3200 },
    { name: 'Week 2', mainBranchSales: 5100, mallBranchSales: 3400, mainBranchViews: 6800, mallBranchViews: 4100 },
    { name: 'Week 3', mainBranchSales: 4900, mallBranchSales: 3900, mainBranchViews: 6200, mallBranchViews: 4800 },
    { name: 'Week 4', mainBranchSales: 6300, mallBranchSales: 4500, mainBranchViews: 8100, mallBranchViews: 5600 },
  ];

  // Top Products matching Mot7km Restaurant PRD
  const topProducts = [
    { nameKey: 'dashboard.products.truffleBurger', views: '4,820', percentage: 92 },
    { nameKey: 'dashboard.products.icedLatte', views: '3,950', percentage: 78 },
    { nameKey: 'dashboard.products.margheritaPizza', views: '3,120', percentage: 62 },
    { nameKey: 'dashboard.products.crispyChicken', views: '2,640', percentage: 50 },
    { nameKey: 'dashboard.products.pistachioPancake', views: '1,980', percentage: 38 },
  ];

  // Recent Customer Feedback matching PRD
  const recentReviews = [
    {
      id: 1,
      customer: 'Sami Al-Mansoor',
      rating: 5,
      dishKey: 'dashboard.products.truffleBurger',
      commentKey: 'dashboard.reviewsList.r1',
      timeKey: 'dashboard.timeAgo.m10',
    },
    {
      id: 2,
      customer: 'Laila H.',
      rating: 5,
      dishKey: 'dashboard.products.icedLatte',
      commentKey: 'dashboard.reviewsList.r2',
      timeKey: 'dashboard.timeAgo.m45',
    },
    {
      id: 3,
      customer: 'Tariq K.',
      rating: 4,
      dishKey: 'dashboard.products.margheritaPizza',
      commentKey: 'dashboard.reviewsList.r3',
      timeKey: 'dashboard.timeAgo.h2',
    },
  ];

  // Activity Feed matching Mot7km PRD
  const activityFeed = [
    {
      id: 1,
      icon: QrCode,
      titleKey: 'dashboard.activity.qrScanned',
      timeKey: 'dashboard.timeAgo.m2',
    },
    {
      id: 2,
      icon: Star,
      titleKey: 'dashboard.activity.reviewSubmitted',
      timeKey: 'dashboard.timeAgo.m10',
    },
    {
      id: 3,
      icon: AlertCircle,
      titleKey: 'dashboard.activity.itemSoldOut',
      timeKey: 'dashboard.timeAgo.h1',
    },
    {
      id: 4,
      icon: ShoppingBag,
      titleKey: 'dashboard.activity.newOrder',
      timeKey: 'dashboard.timeAgo.h2',
    },
  ];

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      {/* Top Header & Quick Toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
              {t('dashboard.title')}
            </h1>
            
            {/* Live Kitchen Badge with Chime Toggle */}
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-500 ring-1 ring-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{t('dashboard.liveKitchen')}</span>
              <button
                onClick={() => setIsChimeMuted(!isChimeMuted)}
                className="ml-1 text-slate-400 hover:text-emerald-400 transition"
                title={isChimeMuted ? t('dashboard.soundChimeMute') : t('dashboard.soundChimeOn')}
              >
                {isChimeMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-emerald-500" />}
              </button>
            </div>
          </div>
          <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
            {t('dashboard.subtitle')}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Branch Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="appearance-none rounded-xl border border-[var(--color-border)] bg-[var(--card)] py-2 pl-9 pr-8 text-xs font-semibold text-[var(--text-secondary)] focus:border-[var(--primary)] focus:outline-none shadow-sm cursor-pointer"
            >
              <option value="all">{t('dashboard.allBranches')}</option>
              <option value="main">{t('dashboard.mainBranch')}</option>
              <option value="mall">{t('dashboard.mallBranch')}</option>
            </select>
            <Store className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--primary)]" />
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
          </div>

          {/* Date Picker Button */}
          <button className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-semibold text-[var(--text-secondary)] shadow-sm transition hover:border-[var(--primary)] hover:text-[var(--text-primary)]">
            <Calendar className="h-4 w-4 text-[var(--text-muted)]" />
            <span>{t('dashboard.dateRange')}</span>
            <ChevronDown className="h-3.5 w-3.5 text-[var(--text-muted)]" />
          </button>
        </div>
      </div>

      {/* Floating Quick Action Shortcuts Bar */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-1 hide-scrollbar">
        <button className="flex items-center gap-2 shrink-0 rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[var(--primary)]/20 hover:bg-[var(--primary-dark)] transition">
          <Plus className="h-4 w-4" />
          <span>{t('dashboard.quickActions.addDish')}</span>
        </button>
        <button className="flex items-center gap-2 shrink-0 rounded-xl border border-[var(--color-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--elevated)] transition">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>{t('dashboard.quickActions.addBanner')}</span>
        </button>
        <button className="flex items-center gap-2 shrink-0 rounded-xl border border-[var(--color-border)] bg-[var(--card)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--elevated)] transition">
          <Printer className="h-4 w-4 text-[var(--primary)]" />
          <span>{t('dashboard.quickActions.downloadQr')}</span>
        </button>
      </div>

      {/* KPI Cards Grid with Performance Halo Overlays */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.titleKey}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg transition-all duration-300 hover:border-[var(--primary)]/40 hover:-translate-y-0.5"
          >
            {/* Halo Glow Overlay */}
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${stat.haloColor} opacity-70 transition-opacity group-hover:opacity-100`} />

            <div className="relative z-10">
              <div className="flex items-center justify-between text-xs font-medium text-[var(--text-muted)]">
                <span>{t(stat.titleKey)}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--primary)]/10 text-[var(--primary)] ring-1 ring-[var(--primary)]/20">
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  {stat.value}
                </span>
                <span className="inline-flex items-center gap-0.5 text-xs font-semibold text-[var(--primary)]">
                  {stat.changeKey ? t(stat.changeKey) : stat.change}
                </span>
              </div>
            </div>

            {/* Sparkline Wave Chart */}
            <div className="relative z-10 mt-4 h-11 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stat.data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={`grad-${stat.titleKey}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="v"
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill={`url(#grad-${stat.titleKey})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Section: QR Traffic & Branch Comparison */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* QR Menu Traffic */}
        <div className="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg lg:col-span-7 xl:col-span-7">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">{t('dashboard.trafficOverview')}</h2>
            <div className="relative">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--surface)] py-1.5 pl-3 pr-8 text-xs font-medium text-[var(--text-secondary)] focus:border-[var(--primary)] focus:outline-none"
              >
                <option value="thisMonth">{t('dashboard.thisMonth')}</option>
                <option value="lastMonth">{t('dashboard.lastMonth')}</option>
                <option value="thisYear">{t('dashboard.thisYear')}</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
            </div>
          </div>

          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={trafficOverviewData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="trafficGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="var(--text-muted)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--text-muted)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--color-border)',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                  }}
                  formatter={(value: any) => [`${Number(value || 0).toLocaleString()} Views`, t('dashboard.trafficOverview')]}
                />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#trafficGrad)"
                  dot={{ r: 4, fill: 'var(--primary)', stroke: 'var(--surface)', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: 'var(--accent)', stroke: '#FFFFFF', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch Performance Comparison Widget */}
        <div className="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg lg:col-span-5 xl:col-span-5">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
            <div>
              <h2 className="text-base font-semibold text-[var(--text-primary)]">{t('dashboard.branchComparison')}</h2>
              <p className="text-[11px] text-[var(--text-muted)]">{t('dashboard.salesVsViews')}</p>
            </div>
          </div>

          <div className="mt-4 h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--surface)',
                    borderColor: 'var(--color-border)',
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: 'var(--text-muted)' }} />
                <Bar dataKey="mainBranchSales" name="Downtown Sales ($)" fill="#1683C7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mallBranchSales" name="Mall Branch Sales ($)" fill="#0F766E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section: Popular Dishes & Recent Reviews & Activity Feed */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Popular Dishes */}
        <div className="flex flex-col justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg lg:col-span-6">
          <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
            <h2 className="text-base font-semibold text-[var(--text-primary)]">{t('dashboard.topProducts')}</h2>
            <div className="relative">
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="appearance-none rounded-lg border border-[var(--color-border)] bg-[var(--surface)] py-1.5 pl-3 pr-8 text-xs font-medium text-[var(--text-secondary)] focus:border-[var(--primary)] focus:outline-none"
              >
                <option value="byViews">{t('dashboard.byViews')}</option>
                <option value="byRating">{t('dashboard.byRating')}</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-muted)]" />
            </div>
          </div>

          <div className="mt-4 flex-1 space-y-4">
            {topProducts.map((prod) => (
              <div key={prod.nameKey} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-[var(--text-secondary)]">{t(prod.nameKey)}</span>
                  <span className="font-semibold text-[var(--text-primary)]">{prod.views} views</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--elevated)]">
                  <div
                    className="h-full rounded-full bg-[var(--primary)] transition-all duration-500"
                    style={{ width: `${prod.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Feedback & Activity Feed */}
        <div className="grid grid-cols-1 gap-6 lg:col-span-6">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
              <h2 className="text-base font-semibold text-[var(--text-primary)]">{t('dashboard.recentReviews')}</h2>
              <button className="text-xs font-medium text-[var(--primary)] hover:underline">
                {t('dashboard.viewAll')}
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {recentReviews.map((rev) => (
                <div key={rev.id} className="rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-3.5 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[var(--text-primary)]">{rev.customer}</span>
                      <span className="rounded-md bg-amber-500/10 px-1.5 py-0.5 font-semibold text-amber-500">
                        ★ {rev.rating}.0
                      </span>
                    </div>
                    <span className="text-[var(--text-muted)] text-[11px]">{t(rev.timeKey)}</span>
                  </div>
                  <p className="mt-1.5 font-medium text-[var(--text-secondary)]">"{t(rev.commentKey)}"</p>
                  <div className="mt-2 text-[11px] font-semibold text-[var(--primary)]">
                    {t(rev.dishKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Activity */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--color-border)]">
              <h2 className="text-base font-semibold text-[var(--text-primary)]">{t('dashboard.systemActivity')}</h2>
            </div>
            <div className="mt-4 space-y-3">
              {activityFeed.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] ring-1 ring-[var(--primary)]/20">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-[var(--text-primary)]">
                      {t(item.titleKey)}
                    </span>
                  </div>
                  <span className="shrink-0 text-[var(--text-muted)]">
                    {t(item.timeKey)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;