import { Card, CardHeader, StatCard } from '@/components/Card';
import { Badge, statusBadge } from '@/components/Badge';
import { LineChart } from '@/components/Charts';
import {
  Activity,
  Server,
  Zap,
  CheckCircle,
  AlertTriangle,
  Wrench,
  XCircle,
} from 'lucide-react';
import { services } from '@/data';
import type { ServiceStatus } from '@/types';

const statusIcon: Record<ServiceStatus, typeof CheckCircle> = {
  operational: CheckCircle,
  degraded: AlertTriangle,
  partial_outage: AlertTriangle,
  major_outage: XCircle,
  maintenance: Wrench,
};

const statusColor: Record<ServiceStatus, string> = {
  operational: 'bg-emerald-500',
  degraded: 'bg-amber-500',
  partial_outage: 'bg-orange-500',
  major_outage: 'bg-rose-500',
  maintenance: 'bg-sky-500',
};

export function HealthPage() {
  const operational = services.filter((s) => s.status === 'operational').length;
  const issues = services.filter((s) => s.status !== 'operational').length;
  const avgUptime = (services.reduce((s, svc) => s + svc.uptime, 0) / services.length).toFixed(2);
  const avgLatency = Math.round(services.reduce((s, svc) => s + svc.latency, 0) / services.length);

  const uptimeData = [
    { label: 'Oct 7', value: 99.95 },
    { label: 'Oct 8', value: 99.91 },
    { label: 'Oct 9', value: 99.88 },
    { label: 'Oct 10', value: 99.96 },
    { label: 'Oct 11', value: 99.92 },
    { label: 'Oct 12', value: 98.45 },
    { label: 'Oct 13', value: Number(avgUptime) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Operational" value={`${operational}/${services.length}`} icon={<CheckCircle size={20} />} accent="emerald" />
        <StatCard label="Issues" value={issues} icon={<AlertTriangle size={20} />} accent="amber" />
        <StatCard label="Avg Uptime (7d)" value={`${avgUptime}%`} delta="0.3%" trend="down" icon={<Activity size={20} />} accent="blue" />
        <StatCard label="Avg Latency" value={`${avgLatency}ms`} icon={<Zap size={20} />} accent="sky" />
      </div>

      <Card>
        <CardHeader title="Uptime History" subtitle="Last 7 days overall uptime %" />
        <div className="p-5">
          <LineChart data={uptimeData} color="#10b981" height={180} formatValue={(v) => `${v}%`} />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {services.map((s) => {
          const Icon = statusIcon[s.status];
          const sb = statusBadge(s.status);
          return (
            <Card key={s.id} className="p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg ${
                    s.status === 'operational' ? 'bg-emerald-50 text-emerald-600' :
                    s.status === 'maintenance' ? 'bg-sky-50 text-sky-600' :
                    'bg-rose-50 text-rose-600'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{s.name}</p>
                    <p className="text-xs text-slate-400">{s.description}</p>
                  </div>
                </div>
                <Badge status={sb.status} variant={sb.variant} />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-slate-50 p-2.5 text-center">
                  <p className="text-xs text-slate-400">Uptime</p>
                  <p className="text-sm font-bold text-slate-800">{s.uptime}%</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5 text-center">
                  <p className="text-xs text-slate-400">Latency</p>
                  <p className="text-sm font-bold text-slate-800">{s.latency}ms</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5 text-center">
                  <p className="text-xs text-slate-400">Incidents</p>
                  <p className="text-sm font-bold text-slate-800">{s.incidents}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${statusColor[s.status]}`}>
                  <span className={`block h-2 w-2 animate-pulse-ring rounded-full ${statusColor[s.status]}`} />
                </span>
                <span className="text-xs text-slate-500">
                  {s.status === 'operational' ? 'All systems normal' :
                   s.status === 'maintenance' ? 'Scheduled maintenance in progress' :
                   s.status === 'major_outage' ? 'Service is down — engineering engaged' :
                   'Performance issues detected'}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
