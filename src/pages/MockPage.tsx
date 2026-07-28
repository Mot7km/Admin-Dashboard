import { useTranslation } from '../context/LanguageContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  BarChart3,
} from 'lucide-react';

const MockPage = () => {
  const { t } = useTranslation();

  // Mock data for bar chart
  const barData = [
    { name: 'Jan', value: 120 },
    { name: 'Feb', value: 180 },
    { name: 'Mar', value: 150 },
    { name: 'Apr', value: 200 },
    { name: 'May', value: 170 },
    { name: 'Jun', value: 250 },
  ];

  // Mock data for pie chart
  const pieData = [
    { name: 'Category A', value: 400 },
    { name: 'Category B', value: 300 },
    { name: 'Category C', value: 200 },
    { name: 'Category D', value: 100 },
  ];
  const COLORS = [
    'var(--color-primary)',
    'var(--color-secondary)',
    'var(--color-accent)',
    'var(--color-warning)',
  ];

  // Stats cards
  const stats = [
    {
      label: t('mock.stats.total'),
      value: '1,247',
      change: '+14%',
      icon: Activity,
    },
    {
      label: t('mock.stats.pending'),
      value: '83',
      change: '-2%',
      icon: Clock,
      changeColor: 'var(--color-warning)',
    },
    {
      label: t('mock.stats.completed'),
      value: '1,164',
      change: '+18%',
      icon: CheckCircle,
      changeColor: 'var(--color-success)',
    },
    {
      label: t('mock.stats.issues'),
      value: '12',
      change: '+3%',
      icon: AlertTriangle,
      changeColor: 'var(--color-error)',
    },
  ];

  // Recent mock items
  const recentItems = [
    { id: 1, name: 'Mock Item A', status: 'Completed', date: '2026-07-27' },
    { id: 2, name: 'Mock Item B', status: 'Processing', date: '2026-07-26' },
    { id: 3, name: 'Mock Item C', status: 'Pending', date: '2026-07-25' },
    { id: 4, name: 'Mock Item D', status: 'Completed', date: '2026-07-24' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="card-premium rounded-xl p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-primary)]">
            {t('mock.eyebrow')}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-[var(--color-text-primary)] sm:text-4xl">
            {t('mock.title')}
          </h1>
          <p className="mt-3 max-w-3xl text-[var(--color-text-secondary)]">
            {t('mock.description')}
          </p>
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
                <span
                  className="text-sm font-medium"
                  style={{
                    color: stat.changeColor || 'var(--color-success)',
                  }}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Bar Chart */}
          <div className="card-premium rounded-xl p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
                {t('mock.barChartTitle')}
              </h2>
              <BarChart3 className="h-5 w-5 text-[var(--color-text-muted)]" />
            </div>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis dataKey="name" stroke="var(--color-text-muted)" />
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
                  <Legend />
                  <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="card-premium rounded-xl p-5">
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {t('mock.pieChartTitle')}
            </h2>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      borderRadius: '8px',
                      boxShadow: 'var(--shadow-md)',
                    }}
                    labelStyle={{ color: 'var(--color-text-primary)' }}
                  />
                  <Legend wrapperStyle={{ color: 'var(--color-text-secondary)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Items Table */}
        <div className="card-premium rounded-xl p-5">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
            {t('mock.recentItems')}
          </h2>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-[var(--color-border)]">
              <thead>
                <tr>
                  <th className="py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t('mock.table.id')}
                  </th>
                  <th className="py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t('mock.table.name')}
                  </th>
                  <th className="py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t('mock.table.status')}
                  </th>
                  <th className="py-2 text-left text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                    {t('mock.table.date')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {recentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 text-sm text-[var(--color-text-secondary)]">
                      {item.id}
                    </td>
                    <td className="py-3 text-sm text-[var(--color-text-primary)]">
                      {item.name}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-block rounded-full px-2 py-1 text-xs font-medium ${
                          item.status === 'Completed'
                            ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                            : item.status === 'Processing'
                            ? 'bg-[var(--color-warning)]/10 text-[var(--color-warning)]'
                            : 'bg-[var(--color-primary-50)] text-[var(--color-primary)]'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-[var(--color-text-muted)]">
                      {item.date}
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

export default MockPage;