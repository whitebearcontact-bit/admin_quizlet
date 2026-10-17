import { useState } from 'react';
import { Card, CardHeader, StatCard } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Badge, statusBadge } from '@/components/Badge';
import { Modal } from '@/components/Modal';
import { Star, ThumbsUp, MessageSquareText, CheckCircle, Archive, Lightbulb } from 'lucide-react';
import { feedback } from '@/data';
import type { Feedback } from '@/types';

export function FeedbackPage() {
  const [selected, setSelected] = useState<Feedback | null>(null);

  const newCount = feedback.filter((f) => f.status === 'new').length;
  const reviewed = feedback.filter((f) => f.status === 'reviewed').length;
  const implemented = feedback.filter((f) => f.status === 'implemented').length;
  const avgRating = (feedback.reduce((s, f) => s + f.rating, 0) / feedback.length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Feedback" value={feedback.length} icon={<MessageSquareText size={20} />} accent="blue" />
        <StatCard label="Avg Rating" value={`${avgRating}/5`} delta="0.3" trend="up" icon={<Star size={20} />} accent="amber" />
        <StatCard label="Implemented" value={implemented} delta="15%" trend="up" icon={<CheckCircle size={20} />} accent="emerald" />
        <StatCard label="New" value={newCount} icon={<Lightbulb size={20} />} accent="sky" />
      </div>

      <Card>
        <CardHeader title="User Feedback & Feature Requests" subtitle="Collect, triage, and act on user feedback" />
        <div className="p-5">
          <DataTable<Feedback>
            data={feedback}
            searchKeys={['id', 'user', 'email', 'category', 'message', 'status']}
            columns={[
              { key: 'id', label: 'ID', sortable: true, width: '70px',
                render: (f) => <span className="font-mono text-xs text-slate-500">{f.id}</span> },
              { key: 'user', label: 'User', sortable: true,
                render: (f) => (
                  <div>
                    <p className="font-medium text-slate-800">{f.user}</p>
                    <p className="text-xs text-slate-400">{f.email}</p>
                  </div>
                ) },
              { key: 'rating', label: 'Rating', sortable: true,
                render: (f) => (
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star
                        key={n}
                        size={13}
                        className={n <= f.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}
                      />
                    ))}
                  </div>
                ) },
              { key: 'category', label: 'Category', sortable: true,
                render: (f) => (
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {f.category}
                  </span>
                ) },
              { key: 'message', label: 'Message', sortable: false,
                render: (f) => (
                  <p className="max-w-xs truncate text-sm text-slate-600">{f.message}</p>
                ) },
              { key: 'status', label: 'Status', sortable: true,
                render: (f) => { const sb = statusBadge(f.status); return <Badge status={sb.status} variant={sb.variant} />; } },
              { key: 'createdAt', label: 'Submitted', sortable: true,
                render: (f) => <span className="text-xs text-slate-500">{f.createdAt}</span> },
            ]}
            onRowClick={(f) => setSelected(f)}
          />
        </div>
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Feedback Detail"
        footer={
          <>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              <Archive size={15} /> Archive
            </button>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              Mark Reviewed
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100">
              <ThumbsUp size={15} /> Mark Implemented
            </button>
          </>
        }
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-slate-400">{selected.id}</p>
                <p className="text-sm font-bold text-slate-900">{selected.user}</p>
                <p className="text-xs text-slate-400">{selected.email}</p>
              </div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    size={18}
                    className={n <= selected.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                {selected.category}
              </span>
              {(() => { const sb = statusBadge(selected.status); return <Badge status={sb.status} variant={sb.variant} />; })()}
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Feedback Message</p>
              <p className="text-sm text-slate-700">{selected.message}</p>
            </div>
            <div className="rounded-lg bg-slate-50 p-3">
              <p className="text-xs text-slate-400">Submitted</p>
              <p className="text-sm text-slate-700">{selected.createdAt}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
