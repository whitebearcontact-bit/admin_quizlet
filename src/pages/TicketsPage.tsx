import { useState } from 'react';
import { Card, CardHeader, StatCard } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Badge, statusBadge } from '@/components/Badge';
import { Modal } from '@/components/Modal';
import { Ticket as TicketIcon, CheckCircle, Clock, AlertTriangle, MessageSquare } from 'lucide-react';
import { tickets } from '@/data';
import type { Ticket } from '@/types';

const priorityVariant: Record<string, 'low' | 'medium' | 'high' | 'urgent'> = {
  low: 'low',
  medium: 'medium',
  high: 'high',
  urgent: 'urgent',
};

export function TicketsPage() {
  const [selected, setSelected] = useState<Ticket | null>(null);

  const counts = {
    total: tickets.length,
    open: tickets.filter((t) => t.status === 'open').length,
    pending: tickets.filter((t) => t.status === 'pending').length,
    resolved: tickets.filter((t) => t.status === 'resolved' || t.status === 'closed').length,
  };

  const priorityColors: Record<string, string> = {
    low: 'bg-slate-100 text-slate-600',
    medium: 'bg-sky-100 text-sky-700',
    high: 'bg-amber-100 text-amber-700',
    urgent: 'bg-rose-100 text-rose-700',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Tickets" value={counts.total} icon={<TicketIcon size={20} />} accent="blue" />
        <StatCard label="Open" value={counts.open} icon={<Clock size={20} />} accent="amber" />
        <StatCard label="Pending" value={counts.pending} icon={<AlertTriangle size={20} />} accent="rose" />
        <StatCard label="Resolved" value={counts.resolved} delta="68%" trend="up" icon={<CheckCircle size={20} />} accent="emerald" />
      </div>

      <Card>
        <CardHeader title="Support Tickets" subtitle="Track and resolve customer support requests" />
        <div className="p-5">
          <DataTable<Ticket>
            data={tickets}
            searchKeys={['id', 'subject', 'user', 'email', 'category']}
            columns={[
              { key: 'id', label: 'ID', sortable: true, width: '80px',
                render: (t) => <span className="font-mono text-xs text-slate-500">{t.id}</span> },
              { key: 'subject', label: 'Subject', sortable: true,
                render: (t) => (
                  <div>
                    <p className="font-medium text-slate-800">{t.subject}</p>
                    <p className="text-xs text-slate-400">{t.category} · {t.user}</p>
                  </div>
                ) },
              { key: 'priority', label: 'Priority', sortable: true,
                render: (t) => (
                  <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${priorityColors[t.priority]}`}>
                    {t.priority}
                  </span>
                ) },
              { key: 'status', label: 'Status', sortable: true,
                render: (t) => { const sb = statusBadge(t.status); return <Badge status={sb.status} variant={sb.variant} />; } },
              { key: 'messages', label: 'Messages', sortable: true,
                render: (t) => (
                  <span className="flex items-center gap-1 text-slate-600">
                    <MessageSquare size={14} className="text-slate-400" /> {t.messages}
                  </span>
                ) },
              { key: 'createdAt', label: 'Created', sortable: true,
                render: (t) => <span className="text-xs text-slate-500">{t.createdAt}</span> },
            ]}
            onRowClick={(t) => setSelected(t)}
          />
        </div>
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Ticket Details"
        footer={
          <>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              Assign
            </button>
            <button className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100">
              Mark Pending
            </button>
            <button className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100">
              Resolve
            </button>
          </>
        }
      >
        {selected && (
          <div className="space-y-4">
            <div>
              <p className="font-mono text-xs text-slate-400">{selected.id}</p>
              <p className="text-lg font-bold text-slate-900">{selected.subject}</p>
            </div>
            <div className="flex items-center gap-2">
              {(() => { const sb = statusBadge(selected.status); return <Badge status={sb.status} variant={sb.variant} />; })()}
              <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${priorityColors[selected.priority]}`}>
                {selected.priority} priority
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Submitted by</p>
                <p className="text-sm text-slate-700">{selected.user}</p>
                <p className="text-xs text-slate-400">{selected.email}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Category</p>
                <p className="text-sm text-slate-700">{selected.category}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Created</p>
                <p className="text-sm text-slate-700">{selected.createdAt}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Messages</p>
                <p className="text-sm text-slate-700">{selected.messages} replies</p>
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="mb-2 text-xs font-semibold uppercase text-slate-400">Conversation</p>
              <div className="space-y-3">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-xs font-semibold text-slate-600">{selected.user}</p>
                  <p className="mt-1 text-sm text-slate-600">{selected.subject}. I need help resolving this issue as soon as possible.</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <p className="text-xs font-semibold text-blue-700">Support Agent</p>
                  <p className="mt-1 text-sm text-slate-600">Thank you for reaching out. We're looking into this and will get back to you shortly.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
