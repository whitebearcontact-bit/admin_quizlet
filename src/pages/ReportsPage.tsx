import { Card, CardHeader, StatCard } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Badge, statusBadge } from '@/components/Badge';
import { Flag, CheckCircle, Eye, XCircle, BookOpen, MessageSquare, User } from 'lucide-react';
import { reports } from '@/data';
import type { Report } from '@/types';

const targetIcon: Record<string, typeof BookOpen> = {
  study_set: BookOpen,
  comment: MessageSquare,
  user: User,
};

export function ReportsPage() {
  const reviewing = reports.filter((r) => r.status === 'reviewing').length;
  const actioned = reports.filter((r) => r.status === 'actioned').length;
  const dismissed = reports.filter((r) => r.status === 'dismissed').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Reports" value={reports.length} icon={<Flag size={20} />} accent="rose" />
        <StatCard label="Reviewing" value={reviewing} icon={<Eye size={20} />} accent="amber" />
        <StatCard label="Actioned" value={actioned} delta="68%" trend="up" icon={<CheckCircle size={20} />} accent="emerald" />
        <StatCard label="Dismissed" value={dismissed} icon={<XCircle size={20} />} accent="slate" />
      </div>

      <Card>
        <CardHeader title="Reported Content" subtitle="User-submitted reports of inappropriate or policy-violating content" />
        <div className="p-5">
          <DataTable<Report>
            data={reports}
            searchKeys={['id', 'reporter', 'target', 'reason', 'status']}
            columns={[
              { key: 'id', label: 'ID', sortable: true, width: '90px',
                render: (r) => <span className="font-mono text-xs text-slate-500">{r.id}</span> },
              { key: 'target', label: 'Reported Target', sortable: true,
                render: (r) => {
                  const Icon = targetIcon[r.targetType];
                  return (
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Icon size={15} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{r.target}</p>
                        <p className="text-xs capitalize text-slate-400">{r.targetType.replace(/_/g, ' ')}</p>
                      </div>
                    </div>
                  );
                } },
              { key: 'reporter', label: 'Reported By', sortable: true,
                render: (r) => <span className="text-slate-600">{r.reporter}</span> },
              { key: 'reason', label: 'Reason', sortable: true,
                render: (r) => <span className="text-slate-600">{r.reason}</span> },
              { key: 'status', label: 'Status', sortable: true,
                render: (r) => { const sb = statusBadge(r.status); return <Badge status={sb.status} variant={sb.variant} />; } },
              { key: 'createdAt', label: 'Filed', sortable: true,
                render: (r) => <span className="text-xs text-slate-500">{r.createdAt}</span> },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}
