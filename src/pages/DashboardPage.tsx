import { Card, CardHeader, StatCard } from '@/components/Card';
import { BarChart, LineChart, DonutChart } from '@/components/Charts';
import { Badge, statusBadge } from '@/components/Badge';
import {
  Users,
  DollarSign,
  BookOpen,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  UserPlus,
  CreditCard,
  FileText,
  Flag,
  Server,
  Zap,
} from 'lucide-react';
import {
  userGrowthData,
  revenueData,
  studyActivityData,
  planDistribution,
  services,
  tickets,
  activityFeed,
  geoDistribution,
} from '@/data';
import type { ActivityFeedItem } from '@/types';

const feedIcon: Record<ActivityFeedItem['type'], typeof UserPlus> = {
  user_join: UserPlus,
  ticket: Flag,
  payment: CreditCard,
  report: Flag,
  content: FileText,
  system: Server,
};

const feedColor: Record<ActivityFeedItem['type'], string> = {
  user_join: 'bg-emerald-50 text-emerald-600',
  ticket: 'bg-amber-50 text-amber-600',
  payment: 'bg-blue-50 text-blue-600',
  report: 'bg-rose-50 text-rose-600',
  content: 'bg-sky-50 text-sky-600',
  system: 'bg-slate-100 text-slate-500',
};

export function DashboardPage() {
  const openTickets = tickets.filter((t) => t.status === 'open' || t.status === 'pending').length;
  const degradedServices = services.filter((s) => s.status !== 'operational').length;
  const maxGeo = geoDistribution[0].users;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Users" value="125,000" delta="7.3%" trend="up" icon={<Users size={20} />} accent="blue" />
        <StatCard label="Monthly Revenue" value="$62,400" delta="6.3%" trend="up" icon={<DollarSign size={20} />} accent="emerald" />
        <StatCard label="Active Study Sets" value="48,200" delta="4.1%" trend="up" icon={<BookOpen size={20} />} accent="sky" />
        <StatCard label="Avg. Response Time" value="2.4h" delta="12%" trend="down" icon={<Activity size={20} />} accent="amber" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="User Growth"
            subtitle="New registrations over the last 7 months"
            action={<Badge status="+23,000" variant="success" />}
          />
          <div className="p-5">
            <LineChart data={userGrowthData} color="#2563eb" height={200} formatValue={(v) => `${v.toLocaleString()} users`} />
          </div>
        </Card>

        <Card>
          <CardHeader title="Plan Distribution" subtitle="Active subscription breakdown" />
          <div className="flex items-center justify-center p-5">
            <DonutChart data={planDistribution} size={170} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Revenue Trend" subtitle="Monthly recurring revenue (USD)" />
          <div className="p-5">
            <BarChart data={revenueData} color="#10b981" height={180} formatValue={(v) => `${v.toLocaleString()}`} />
          </div>
        </Card>

        <Card>
          <CardHeader title="Study Activity" subtitle="Active sessions by day of week (%)" />
          <div className="p-5">
            <BarChart data={studyActivityData} color="#0ea5e9" height={180} formatValue={(v) => `${v}%`} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader title="Recent Support Tickets" subtitle="Latest open and pending tickets" />
          <div className="divide-y divide-slate-50">
            {tickets.slice(0, 5).map((t) => {
              const sb = statusBadge(t.status);
              return (
                <div key={t.id} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-slate-50">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    t.priority === 'urgent' ? 'bg-rose-50 text-rose-600' :
                    t.priority === 'high' ? 'bg-amber-50 text-amber-600' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {t.priority === 'urgent' ? <AlertTriangle size={16} /> : <Clock size={16} />}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium text-slate-800">{t.subject}</p>
                    <p className="text-xs text-slate-400">{t.id} · {t.user}</p>
                  </div>
                  <Badge status={sb.status} variant={sb.variant} />
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <CardHeader title="System Status" subtitle={`${services.length} services monitored`} />
          <div className="divide-y divide-slate-50">
            {services.slice(0, 6).map((s) => {
              const sb = statusBadge(s.status);
              return (
                <div key={s.id} className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-slate-50">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    s.status === 'operational' ? 'bg-emerald-50 text-emerald-600' :
                    s.status === 'maintenance' ? 'bg-sky-50 text-sky-600' :
                    'bg-rose-50 text-rose-600'
                  }`}>
                    {s.status === 'operational' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium text-slate-800">{s.name}</p>
                    <p className="text-xs text-slate-400">{s.uptime}% uptime · {s.latency}ms</p>
                  </div>
                  <Badge status={sb.status} variant={sb.variant} />
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <CardHeader title="Live Activity Feed" subtitle="Real-time platform events" />
          <div className="divide-y divide-slate-50">
            {activityFeed.map((item) => {
              const Icon = feedIcon[item.type];
              return (
                <div key={item.id} className="flex items-start gap-3 px-5 py-3 transition-colors hover:bg-slate-50">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${feedColor[item.type]}`}>
                    <Icon size={15} />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm text-slate-700">{item.message}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{item.timestamp}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Top Countries" subtitle="User distribution by geography" />
          <div className="space-y-3 p-5">
            {geoDistribution.slice(0, 6).map((g, i) => {
              const pct = (g.users / maxGeo) * 100;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-7 w-9 items-center justify-center rounded-md bg-slate-100 text-[10px] font-bold text-slate-600">
                    {g.flag}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-700">{g.country}</span>
                      <span className="text-sm font-bold text-slate-900">{g.users.toLocaleString()}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <AlertTriangle size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{openTickets}</p>
                <p className="text-xs text-slate-500">Open Tickets</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                <Activity size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{degradedServices}</p>
                <p className="text-xs text-slate-500">Degraded Services</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Zap size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">42.1K</p>
                <p className="text-xs text-slate-500">Active Today</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
