import { useState } from 'react';
import { Card, CardHeader, StatCard } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Badge, statusBadge } from '@/components/Badge';
import { Modal } from '@/components/Modal';
import { Mail, Eye, MousePointerClick, FileText, Edit, Copy, Send } from 'lucide-react';
import { emailTemplates } from '@/data';
import type { EmailTemplate } from '@/types';

export function EmailTemplatesPage() {
  const [selected, setSelected] = useState<EmailTemplate | null>(null);

  const active = emailTemplates.filter((t) => t.status === 'active').length;
  const drafts = emailTemplates.filter((t) => t.status === 'draft').length;
  const totalSent = emailTemplates.reduce((s, t) => s + t.sentCount, 0);
  const avgOpen = (emailTemplates.filter((t) => t.openRate > 0).reduce((s, t) => s + t.openRate, 0) / emailTemplates.filter((t) => t.openRate > 0).length).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Templates" value={active} icon={<Mail size={20} />} accent="blue" />
        <StatCard label="Drafts" value={drafts} icon={<FileText size={20} />} accent="amber" />
        <StatCard label="Total Sent" value={totalSent.toLocaleString()} delta="12%" trend="up" icon={<Send size={20} />} accent="sky" />
        <StatCard label="Avg Open Rate" value={`${avgOpen}%`} delta="3.2%" trend="up" icon={<Eye size={20} />} accent="emerald" />
      </div>

      <Card>
        <CardHeader
          title="Email Templates"
          subtitle="Automated email templates triggered by platform events"
          action={
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700">
              <FileText size={14} /> New Template
            </button>
          }
        />
        <div className="p-5">
          <DataTable<EmailTemplate>
            data={emailTemplates}
            searchKeys={['id', 'name', 'subject', 'trigger', 'status']}
            columns={[
              { key: 'id', label: 'ID', sortable: true, width: '70px',
                render: (t) => <span className="font-mono text-xs text-slate-500">{t.id}</span> },
              { key: 'name', label: 'Template Name', sortable: true,
                render: (t) => (
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                      <Mail size={15} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{t.name}</p>
                      <p className="font-mono text-[10px] text-slate-400">{t.trigger}</p>
                    </div>
                  </div>
                ) },
              { key: 'subject', label: 'Subject Line', sortable: true,
                render: (t) => <span className="text-slate-600">{t.subject}</span> },
              { key: 'status', label: 'Status', sortable: true,
                render: (t) => { const sb = statusBadge(t.status); return <Badge status={sb.status} variant={sb.variant} />; } },
              { key: 'sentCount', label: 'Sent', sortable: true,
                render: (t) => <span className="text-slate-600">{t.sentCount.toLocaleString()}</span> },
              { key: 'openRate', label: 'Open Rate', sortable: true,
                render: (t) => (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-700">{t.openRate > 0 ? `${t.openRate}%` : '—'}</span>
                    {t.openRate > 0 && (
                      <div className="h-1.5 w-16 rounded-full bg-slate-100">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${t.openRate}%` }} />
                      </div>
                    )}
                  </div>
                ) },
              { key: 'lastEdited', label: 'Last Edited', sortable: true,
                render: (t) => <span className="text-xs text-slate-500">{t.lastEdited}</span> },
            ]}
            onRowClick={(t) => setSelected(t)}
          />
        </div>
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Email Template"
        footer={
          <>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              <Copy size={15} /> Duplicate
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              <Edit size={15} /> Edit
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
              <Send size={15} /> Send Test
            </button>
          </>
        }
      >
        {selected && (
          <div className="space-y-4">
            <div>
              <p className="font-mono text-xs text-slate-400">{selected.id} · Trigger: {selected.trigger}</p>
              <p className="text-lg font-bold text-slate-900">{selected.name}</p>
            </div>
            <div className="rounded-lg border border-slate-200 p-4">
              <p className="mb-1 text-xs font-semibold uppercase text-slate-400">Subject</p>
              <p className="text-sm text-slate-700">{selected.subject}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-slate-50 p-3 text-center">
                <p className="text-xs text-slate-400">Sent</p>
                <p className="text-sm font-bold text-slate-800">{selected.sentCount.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 text-center">
                <p className="text-xs text-slate-400">Open Rate</p>
                <p className="text-sm font-bold text-slate-800">{selected.openRate > 0 ? `${selected.openRate}%` : '—'}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 text-center">
                <p className="text-xs text-slate-400">Status</p>
                <div className="mt-0.5 flex justify-center">
                  {(() => { const sb = statusBadge(selected.status); return <Badge status={sb.status} variant={sb.variant} />; })()}
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <p className="mb-2 text-xs font-semibold uppercase text-slate-400">Email Preview</p>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-900">Hi {{ name: 'Student' }},</p>
                <p className="mt-2 text-sm text-slate-600">
                  Welcome to Quizlet! We're excited to have you on board. Start by creating your first study set or joining a class to get going.
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  Happy studying!
                </p>
                <p className="mt-3 text-xs text-slate-400">— The Quizlet Team</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
