import { Card, CardHeader, StatCard } from '@/components/Card';
import { LineChart, BarChart, DonutChart } from '@/components/Charts';
import { Badge } from '@/components/Badge';
import { BarChart3, TrendingUp, Users2, GraduationCap, Globe, Zap, ArrowUp, ArrowDown } from 'lucide-react';
import {
  analyticsEvents,
  learningProgressData,
  subjectPopularity,
  churnData,
  geoDistribution,
  studyActivityData,
} from '@/data';

export function AnalyticsPage() {
  const totalEvents = analyticsEvents.reduce((s, e) => s + e.count, 0);
  const totalUnique = analyticsEvents.reduce((s, e) => s + e.uniqueUsers, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Events (30d)" value={totalEvents.toLocaleString()} delta="14.2%" trend="up" icon={<BarChart3 size={20} />} accent="blue" />
        <StatCard label="Unique Active Users" value="42,100" delta="8.5%" trend="up" icon={<Users2 size={20} />} accent="emerald" />
        <StatCard label="Avg Session Duration" value="18m 42s" delta="5.1%" trend="up" icon={<Zap size={20} />} accent="amber" />
        <StatCard label="Churn Rate" value="2.4%" delta="0.2%" trend="down" icon={<TrendingUp size={20} />} accent="rose" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Learning Progress Index" subtitle="Avg mastery score across all users (0-100)" />
          <div className="p-5">
            <LineChart data={learningProgressData} color="#10b981" height={200} formatValue={(v) => `${v}/100`} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Subject Popularity" subtitle="Distribution of study activity" />
          <div className="flex items-center justify-center p-5">
            <DonutChart data={subjectPopularity} size={170} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Churn Rate Trend" subtitle="Monthly customer churn %" />
          <div className="p-5">
            <LineChart data={churnData} color="#ef4444" height={180} formatValue={(v) => `${v}%`} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Weekly Study Activity" subtitle="Active study sessions by day (%)" />
          <div className="p-5">
            <BarChart data={studyActivityData} color="#0ea5e9" height={180} formatValue={(v) => `${v}%`} />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Top Events" subtitle="Most tracked user actions (30 days)" />
          <div className="divide-y divide-slate-50">
            {analyticsEvents.map((e) => (
              <div key={e.id} className="flex items-center gap-4 px-5 py-3">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{e.event}</p>
                  <p className="text-xs capitalize text-slate-400">{e.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">{e.count.toLocaleString()}</p>
                  <p className="text-xs text-slate-400">{e.uniqueUsers.toLocaleString()} users</p>
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-semibold ${e.trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {e.trend > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                  {Math.abs(e.trend)}%
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Geographic Distribution" subtitle="Top countries by user count" />
          <div className="divide-y divide-slate-50">
            {geoDistribution.map((g, i) => {
              const maxUsers = geoDistribution[0].users;
              const pct = (g.users / maxUsers) * 100;
              return (
                <div key={i} className="flex items-center gap-3 px-5 py-3">
                  <div className="flex h-8 w-10 items-center justify-center rounded-md bg-slate-100 text-xs font-bold text-slate-600">
                    {g.flag}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-slate-800">{g.country}</p>
                      <p className="text-sm font-bold text-slate-900">{g.users.toLocaleString()}</p>
                    </div>
                    <div className="mt-1.5 h-1.5 rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-blue-500 transition-all" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
