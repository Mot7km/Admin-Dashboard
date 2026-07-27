import { Link } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Users,
  Download,
} from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation();

  // Mock data for the chart
  const chartData = [
    { month: 'Jan', revenue: 4200, orders: 240 },
    { month: 'Feb', revenue: 3800, orders: 210 },
    { month: 'Mar', revenue: 5100, orders: 290 },
    { month: 'Apr', revenue: 4600, orders: 270 },
    { month: 'May', revenue: 5400, orders: 310 },
    { month: 'Jun', revenue: 6000, orders: 350 },
  ];

  // Stats data
  const stats = [
    {
      label: t('dashboard.stats.revenue'),
      value: '$48,295',
      change: '+12.5%',
      icon: DollarSign,
    },
    {
      label: t('dashboard.stats.orders'),
      value: '1,284',
      change: '+8.2%',
      icon: ShoppingBag,
    },
    {
      label: t('dashboard.stats.users'),
      value: '3,240',
      change: '+5.4%',
      icon: Users,
    },
    {
      label: t('dashboard.stats.trend'),
      value: '24.7%',
      change: '+2.1%',
      icon: TrendingUp,
    },
  ];

  // Recent activity items
  const activities = [
    { id: 1, title: t('dashboard.activity.1.title'), time: t('dashboard.activity.1.time') },
    { id: 2, title: t('dashboard.activity.2.title'), time: t('dashboard.activity.2.time') },
    { id: 3, title: t('dashboard.activity.3.title'), time: t('dashboard.activity.3.time') },
    { id: 4, title: t('dashboard.activity.4.title'), time: t('dashboard.activity.4.time') },
  ];

  // Recent orders mock
  const orders = [
    { id: '#ORD-001', customer: 'Alice Johnson', total: 249.99, status: 'Completed' },
    { id: '#ORD-002', customer: 'Bob Smith', total: 129.50, status: 'Processing' },
    { id: '#ORD-003', customer: 'Carol White', total: 89.75, status: 'Shipped' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header with welcome and action */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] sm:text-3xl">
              {t('dashboard.welcome')}
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)] sm:text-base">
              {t('dashboard.subtitle')}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-3 sm:mt-0">
            <Link
              to="/mock"
              className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-text-on-primary)] transition hover:opacity-90"
            >
              <Download className="mr-2 h-4 w-4" />
              {t('dashboard.exportButton')}
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card-premium rounded-xl p-5 transition-all hover:border-[var(--color-primary)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--color-text-muted)]">
                  {stat.label}
                </span>
                <stat.icon className="h-5 w-5 text-[var(--color-primary)]" />
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-[var(--color-success)]">
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Chart and Activity Feed */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Chart */}
          <div className="card-premium rounded-xl p-5 lg:col-span-2">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {t('dashboard.revenueChart')}
            </h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis dataKey="month" stroke="var(--color-text-muted)" />
                  <YAxis stroke="var(--color-text-muted)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      borderRadius: '8px',
                      boxShadow: 'var(--shadow-md)',
                    }}
                    labelStyle={{ color: 'var(--color-text-primary)' }}
                  />
                  <Legend
                    wrapperStyle={{ color: 'var(--color-text-secondary)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#1683C7" // --color-primary
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#0F766E" // --color-secondary
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="card-premium rounded-xl p-5">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {t('dashboard.recentActivity')}
            </h2>
            <div className="mt-4 space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 border-b border-[var(--color-border)] pb-3 last:border-0"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary-50)] text-xs font-bold text-[var(--color-primary)]">
                    {activity.id}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">
                      {activity.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="card-premium rounded-xl p-5">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {t('dashboard.recentOrders')}
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--color-border)]">
              <thead>
                <tr>
                  <th className="py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t('dashboard.order.id')}
                  </th>
                  <th className="py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t('dashboard.order.customer')}
                  </th>
                  <th className="py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t('dashboard.order.total')}
                  </th>
                  <th className="py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t('dashboard.order.status')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3 text-sm text-[var(--color-text-secondary)]">
                      {order.id}
                    </td>
                    <td className="py-3 text-sm text-[var(--color-text-primary)]">
                      {order.customer}
                    </td>
                    <td className="py-3 text-sm text-[var(--color-text-secondary)]">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          order.status === 'Completed'
                            ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                            : order.status === 'Processing'
                            ? 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
                            : 'bg-[var(--color-primary-50)] text-[var(--color-primary)]'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;