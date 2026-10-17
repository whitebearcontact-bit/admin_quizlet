import { Card, CardHeader, StatCard } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Badge, statusBadge } from '@/components/Badge';
import { Modal } from '@/components/Modal';
import { BookOpen, FileText, FileCheck, Flag, Eye, Star } from 'lucide-react';
import { contentItems } from '@/data';
import { useState } from 'react';
import type { ContentItem } from '@/types';

const typeIcon: Record<string, typeof BookOpen> = {
  flashcard: BookOpen,
  practice_test: FileText,
  study_guide: FileCheck,
};

export function ContentPage() {
  const [selected, setSelected] = useState<ContentItem | null>(null);

  const published = contentItems.filter((c) => c.status === 'published').length;
  const pending = contentItems.filter((c) => c.status === 'pending_review').length;
  const flagged = contentItems.filter((c) => c.status === 'flagged').length;
  const removed = contentItems.filter((c) => c.status === 'removed').length;
  const totalViews = contentItems.reduce((s, c) => s + c.views, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Published" value={published} delta="12%" trend="up" icon={<BookOpen size={20} />} accent="emerald" />
        <StatCard label="Pending Review" value={pending} icon={<FileCheck size={20} />} accent="amber" />
        <StatCard label="Flagged" value={flagged} icon={<Flag size={20} />} accent="rose" />
        <StatCard label="Total Views" value={totalViews.toLocaleString()} delta="8.2%" trend="up" icon={<Eye size={20} />} accent="blue" />
      </div>

      <Card>
        <CardHeader title="Content Library" subtitle="Review, approve, and moderate study materials" />
        <div className="p-5">
          <DataTable<ContentItem>
            data={contentItems}
            searchKeys={['id', 'title', 'creator', 'type', 'status']}
            columns={[
              { key: 'id', label: 'ID', sortable: true, width: '80px',
                render: (c) => <span className="font-mono text-xs text-slate-500">{c.id}</span> },
              { key: 'title', label: 'Title', sortable: true,
                render: (c) => {
                  const Icon = typeIcon[c.type];
                  return (
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Icon size={15} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{c.title}</p>
                        <p className="text-xs text-slate-400 capitalize">{c.type.replace(/_/g, ' ')}</p>
                      </div>
                    </div>
                  );
                } },
              { key: 'creator', label: 'Creator', sortable: true,
                render: (c) => <span className="text-slate-600">{c.creator}</span> },
              { key: 'status', label: 'Status', sortable: true,
                render: (c) => { const sb = statusBadge(c.status); return <Badge status={sb.status} variant={sb.variant} />; } },
              { key: 'views', label: 'Views', sortable: true,
                render: (c) => <span className="text-slate-600">{c.views.toLocaleString()}</span> },
              { key: 'rating', label: 'Rating', sortable: true,
                render: (c) => (
                  <span className="flex items-center gap-1 text-slate-600">
                    <Star size={13} className="text-amber-400" />
                    {c.rating > 0 ? c.rating.toFixed(1) : '—'}
                  </span>
                ) },
              { key: 'createdAt', label: 'Created', sortable: true,
                render: (c) => <span className="text-xs text-slate-500">{c.createdAt}</span> },
            ]}
            onRowClick={(c) => setSelected(c)}
          />
        </div>
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Content Details"
        footer={
          <>
            <button className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-100">Remove</button>
            <button className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100">Flag</button>
            <button className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 transition-colors hover:bg-emerald-100">Approve</button>
          </>
        }
      >
        {selected && (
          <div className="space-y-4">
            <div>
              <p className="font-mono text-xs text-slate-400">{selected.id}</p>
              <p className="text-lg font-bold text-slate-900">{selected.title}</p>
              <p className="text-sm text-slate-500">by {selected.creator}</p>
            </div>
            <div className="flex items-center gap-2">
              {(() => { const sb = statusBadge(selected.status); return <Badge status={sb.status} variant={sb.variant} />; })()}
              <span className="text-xs capitalize text-slate-500">{selected.type.replace(/_/g, ' ')}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-slate-50 p-3 text-center">
                <p className="text-xs text-slate-400">Views</p>
                <p className="text-sm font-bold text-slate-800">{selected.views.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 text-center">
                <p className="text-xs text-slate-400">Rating</p>
                <p className="text-sm font-bold text-slate-800">{selected.rating > 0 ? selected.rating.toFixed(1) : '—'}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 text-center">
                <p className="text-xs text-slate-400">Created</p>
                <p className="text-sm font-bold text-slate-800">{selected.createdAt}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
