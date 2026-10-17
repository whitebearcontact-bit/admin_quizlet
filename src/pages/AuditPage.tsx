import { Card, CardHeader, StatCard } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Badge } from '@/components/Badge';
import { ScrollText, Info, AlertTriangle, ShieldAlert } from 'lucide-react';
import { auditLogs } from '@/data';
import type { AuditLog } from '@/types';

const severityConfig: Record<string, { variant: 'info' | 'warning' | 'error'; icon: typeof Info }> = {
  info: { variant: 'info', icon: Info },
  warning: { variant: 'warning', icon: AlertTriangle },
  critical: { variant: 'error', icon: ShieldAlert },
};

export function AuditPage() {
  const info = auditLogs.filter((l) => l.severity === 'info').length;
  const warnings = auditLogs.filter((l) => l.severity === 'warning').length;
  const critical = auditLogs.filter((l) => l.severity === 'critical').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Events" value={auditLogs.length} icon={<ScrollText size={20} />} accent="blue" />
        <StatCard label="Info" value={info} icon={<Info size={20} />} accent="sky" />
        <StatCard label="Warnings" value={warnings} icon={<AlertTriangle size={20} />} accent="amber" />
        <StatCard label="Critical" value={critical} icon={<ShieldAlert size={20} />} accent="rose" />
      </div>

      <Card>
        <CardHeader title="Audit Trail" subtitle="All administrative actions and system events" />
        <div className="p-5">
          <DataTable<AuditLog>
            data={auditLogs}
            searchKeys={['id', 'actor', 'action', 'target', 'ip']}
            columns={[
              { key: 'id', label: 'ID', sortable: true, width: '90px',
                render: (l) => <span className="font-mono text-xs text-slate-500">{l.id}</span> },
              { key: 'timestamp', label: 'Timestamp', sortable: true,
                render: (l) => <span className="font-mono text-xs text-slate-500">{l.timestamp}</span> },
              { key: 'actor', label: 'Actor', sortable: true,
                render: (l) => (
                  <span className={`font-medium ${l.actor === 'system' ? 'text-slate-400 italic' : 'text-slate-800'}`}>
                    {l.actor}
                  </span>
                ) },
              { key: 'action', label: 'Action', sortable: true,
                render: (l) => {
                  const cfg = severityConfig[l.severity];
                  const Icon = cfg.icon;
                  return (
                    <div className="flex items-center gap-2">
                      <Icon size={14} className={
                        l.severity === 'critical' ? 'text-rose-500' :
                        l.severity === 'warning' ? 'text-amber-500' :
                        'text-sky-500'
                      } />
                      <span className="text-slate-700">{l.action}</span>
                    </div>
                  );
                } },
              { key: 'target', label: 'Target', sortable: true,
                render: (l) => <span className="text-slate-600">{l.target}</span> },
              { key: 'ip', label: 'IP Address', sortable: true,
                render: (l) => <span className="font-mono text-xs text-slate-500">{l.ip}</span> },
              { key: 'severity', label: 'Severity', sortable: true,
                render: (l) => {
                  const cfg = severityConfig[l.severity];
                  return <Badge status={l.severity} variant={cfg.variant} />;
                } },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}
