import { Card, CardHeader, StatCard } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Badge, statusBadge } from '@/components/Badge';
import { BarChart } from '@/components/Charts';
import { DollarSign, TrendingDown, RefreshCcw, AlertCircle, Download } from 'lucide-react';
import { transactions, revenueData } from '@/data';
import type { Transaction } from '@/types';

export function FinancialsPage() {
  const revenue = transactions.filter((t) => t.type === 'payment' && t.status === 'completed').reduce((s, t) => s + t.amount, 0);
  const refunds = transactions.filter((t) => t.type === 'refund').reduce((s, t) => s + Math.abs(t.amount), 0);
  const chargebacks = transactions.filter((t) => t.type === 'chargeback').reduce((s, t) => s + Math.abs(t.amount), 0);
  const disputed = transactions.filter((t) => t.status === 'disputed' || t.status === 'failed').length;

  const typeColors: Record<string, string> = {
    payment: 'text-emerald-600',
    refund: 'text-amber-600',
    chargeback: 'text-rose-600',
    payout: 'text-sky-600',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue (sample)" value={`$${revenue.toFixed(2)}`} delta="6.3%" trend="up" icon={<DollarSign size={20} />} accent="emerald" />
        <StatCard label="Refunds" value={`$${refunds.toFixed(2)}`} delta="1.2%" trend="down" icon={<RefreshCcw size={20} />} accent="amber" />
        <StatCard label="Chargebacks" value={`$${chargebacks.toFixed(2)}`} icon={<TrendingDown size={20} />} accent="rose" />
        <StatCard label="Disputed/Failed" value={disputed} icon={<AlertCircle size={20} />} accent="sky" />
      </div>

      <Card>
        <CardHeader title="Revenue Trend" subtitle="Monthly revenue from all payment sources" />
        <div className="p-5">
          <BarChart data={revenueData} color="#10b981" height={180} formatValue={(v) => `$${v.toLocaleString()}`} />
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        <Card className="p-5 lg:col-span-1">
          <p className="text-xs font-semibold uppercase text-slate-400">Revenue Breakdown</p>
          <div className="mt-4 space-y-3">
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Payments</span>
                <span className="font-bold text-emerald-600">${revenue.toFixed(2)}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-emerald-500" style={{ width: '85%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Refunds</span>
                <span className="font-bold text-amber-600">${refunds.toFixed(2)}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-amber-500" style={{ width: '8%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Chargebacks</span>
                <span className="font-bold text-rose-600">${chargebacks.toFixed(2)}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-rose-500" style={{ width: '7%' }} />
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-lg bg-slate-50 p-3">
            <p className="text-xs text-slate-400">Net Revenue</p>
            <p className="text-2xl font-bold text-slate-900">${(revenue - refunds - chargebacks).toFixed(2)}</p>
          </div>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader
            title="Transaction History"
            subtitle="All payments, refunds, and chargebacks"
            action={
              <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50">
                <Download size={14} /> Export CSV
              </button>
            }
          />
          <div className="p-5">
            <DataTable<Transaction>
              data={transactions}
              searchKeys={['id', 'user', 'email', 'description', 'status', 'type']}
              columns={[
                { key: 'id', label: 'ID', sortable: true, width: '90px',
                  render: (t) => <span className="font-mono text-xs text-slate-500">{t.id}</span> },
                { key: 'user', label: 'Customer', sortable: true,
                  render: (t) => (
                    <div>
                      <p className="font-medium text-slate-800">{t.user}</p>
                      <p className="text-xs text-slate-400">{t.email}</p>
                    </div>
                  ) },
                { key: 'description', label: 'Description', sortable: true,
                  render: (t) => <span className="text-slate-600">{t.description}</span> },
                { key: 'type', label: 'Type', sortable: true,
                  render: (t) => <span className={`font-semibold capitalize ${typeColors[t.type]}`}>{t.type}</span> },
                { key: 'amount', label: 'Amount', sortable: true,
                  render: (t) => (
                    <span className={`font-bold ${t.amount < 0 ? 'text-rose-600' : 'text-slate-800'}`}>
                      {t.amount < 0 ? '-' : ''}${Math.abs(t.amount).toFixed(2)}
                    </span>
                  ) },
                { key: 'status', label: 'Status', sortable: true,
                  render: (t) => { const sb = statusBadge(t.status); return <Badge status={sb.status} variant={sb.variant} />; } },
                { key: 'method', label: 'Method', sortable: true,
                  render: (t) => <span className="text-xs text-slate-500">{t.method}</span> },
                { key: 'date', label: 'Date', sortable: true,
                  render: (t) => <span className="text-xs text-slate-500">{t.date}</span> },
              ]}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
