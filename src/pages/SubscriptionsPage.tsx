import { Card, CardHeader, StatCard } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Badge, statusBadge } from '@/components/Badge';
import { BarChart } from '@/components/Charts';
import { CreditCard, TrendingUp, RefreshCw, XCircle, CheckCircle } from 'lucide-react';
import { subscriptions, revenueData } from '@/data';
import type { Subscription } from '@/types';

export function SubscriptionsPage() {
  const mrr = subscriptions.filter((s) => s.status === 'active').reduce((sum, s) => sum + s.amount, 0);
  const active = subscriptions.filter((s) => s.status === 'active').length;
  const trials = subscriptions.filter((s) => s.status === 'trialing').length;
  const canceled = subscriptions.filter((s) => s.status === 'canceled' || s.status === 'expired').length;

  const planColors: Record<string, string> = {
    free: 'text-slate-500',
    plus: 'text-blue-600',
    pro: 'text-sky-600',
    teacher: 'text-emerald-600',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="MRR (sample)" value={`$${mrr.toFixed(2)}`} delta="6.3%" trend="up" icon={<TrendingUp size={20} />} accent="emerald" />
        <StatCard label="Active Subs" value={active} delta="4.1%" trend="up" icon={<CreditCard size={20} />} accent="blue" />
        <StatCard label="Trialing" value={trials} icon={<RefreshCw size={20} />} accent="amber" />
        <StatCard label="Canceled/Expired" value={canceled} delta="2.8%" trend="down" icon={<XCircle size={20} />} accent="rose" />
      </div>

      <Card>
        <CardHeader title="Revenue Trend" subtitle="Monthly recurring revenue" />
        <div className="p-5">
          <BarChart data={revenueData} color="#10b981" height={180} formatValue={(v) => `$${v.toLocaleString()}`} />
        </div>
      </Card>

      <Card>
        <CardHeader title="All Subscriptions" subtitle="Manage billing, plans, and renewal cycles" />
        <div className="p-5">
          <DataTable<Subscription>
            data={subscriptions}
            searchKeys={['id', 'user', 'email', 'plan', 'status']}
            columns={[
              { key: 'id', label: 'ID', sortable: true, width: '90px',
                render: (s) => <span className="font-mono text-xs text-slate-500">{s.id}</span> },
              { key: 'user', label: 'Customer', sortable: true,
                render: (s) => (
                  <div>
                    <p className="font-medium text-slate-800">{s.user}</p>
                    <p className="text-xs text-slate-400">{s.email}</p>
                  </div>
                ) },
              { key: 'plan', label: 'Plan', sortable: true,
                render: (s) => <span className={`font-semibold capitalize ${planColors[s.plan]}`}>{s.plan}</span> },
              { key: 'status', label: 'Status', sortable: true,
                render: (s) => { const sb = statusBadge(s.status); return <Badge status={sb.status} variant={sb.variant} />; } },
              { key: 'amount', label: 'Amount', sortable: true,
                render: (s) => (
                  <span className="font-medium text-slate-700">
                    ${s.amount.toFixed(2)}<span className="text-xs text-slate-400">/{s.billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
                  </span>
                ) },
              { key: 'billingCycle', label: 'Cycle', sortable: true,
                render: (s) => <span className="capitalize text-slate-600">{s.billingCycle}</span> },
              { key: 'renewsAt', label: 'Renews', sortable: true,
                render: (s) => (
                  <span className="flex items-center gap-1 text-xs text-slate-500">
                    {s.status === 'active' ? <CheckCircle size={12} className="text-emerald-500" /> : null}
                    {s.renewsAt}
                  </span>
                ) },
            ]}
          />
        </div>
      </Card>
    </div>
  );
}
