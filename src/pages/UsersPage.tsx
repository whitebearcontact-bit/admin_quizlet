import { useState } from 'react';
import { Card, CardHeader, StatCard } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Badge, statusBadge } from '@/components/Badge';
import { Modal } from '@/components/Modal';
import { Users, UserCheck, UserX, UserPlus, Ban, Mail, Trash2, Edit } from 'lucide-react';
import { users } from '@/data';
import type { User } from '@/types';

export function UsersPage() {
  const [selected, setSelected] = useState<User | null>(null);

  const planColors: Record<string, string> = {
    free: 'text-slate-500',
    plus: 'text-blue-600',
    pro: 'text-sky-600',
    teacher: 'text-emerald-600',
  };

  const counts = {
    total: users.length,
    active: users.filter((u) => u.status === 'active').length,
    suspended: users.filter((u) => u.status === 'suspended' || u.status === 'banned').length,
    pending: users.filter((u) => u.status === 'pending').length,
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Users" value={counts.total} icon={<Users size={20} />} accent="blue" />
        <StatCard label="Active" value={counts.active} delta="82%" trend="up" icon={<UserCheck size={20} />} accent="emerald" />
        <StatCard label="Suspended/Banned" value={counts.suspended} icon={<UserX size={20} />} accent="rose" />
        <StatCard label="Pending Approval" value={counts.pending} icon={<UserPlus size={20} />} accent="amber" />
      </div>

      <Card>
        <CardHeader title="All Users" subtitle="Manage user accounts, roles, and permissions" />
        <div className="p-5">
          <DataTable<User>
            data={users}
            searchKeys={['name', 'email', 'id', 'country']}
            columns={[
              { key: 'id', label: 'ID', sortable: true, width: '90px',
                render: (u) => <span className="font-mono text-xs text-slate-500">{u.id}</span> },
              { key: 'name', label: 'User', sortable: true,
                render: (u) => (
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-xs font-bold text-slate-600">
                      {u.avatar}
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{u.name}</p>
                      <p className="text-xs text-slate-400">{u.email}</p>
                    </div>
                  </div>
                ) },
              { key: 'status', label: 'Status', sortable: true,
                render: (u) => { const sb = statusBadge(u.status); return <Badge status={sb.status} variant={sb.variant} />; } },
              { key: 'plan', label: 'Plan', sortable: true,
                render: (u) => <span className={`font-semibold capitalize ${planColors[u.plan]}`}>{u.plan}</span> },
              { key: 'studySets', label: 'Study Sets', sortable: true,
                render: (u) => <span className="text-slate-600">{u.studySets}</span> },
              { key: 'country', label: 'Country', sortable: true,
                render: (u) => <span className="text-slate-600">{u.country}</span> },
              { key: 'lastActive', label: 'Last Active', sortable: true,
                render: (u) => <span className="text-xs text-slate-500">{u.lastActive}</span> },
            ]}
            onRowClick={(u) => setSelected(u)}
          />
        </div>
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="User Details"
        footer={
          <>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              <Mail size={15} /> Email
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              <Edit size={15} /> Edit
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-100">
              <Ban size={15} /> Suspend
            </button>
            <button className="flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 transition-colors hover:bg-rose-100">
              <Trash2 size={15} /> Delete
            </button>
          </>
        }
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-xl font-bold text-slate-600">
                {selected.avatar}
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">{selected.name}</p>
                <p className="text-sm text-slate-500">{selected.email}</p>
                <div className="mt-1 flex items-center gap-2">
                  {(() => { const sb = statusBadge(selected.status); return <Badge status={sb.status} variant={sb.variant} />; })()}
                  <span className={`text-xs font-semibold capitalize ${planColors[selected.plan]}`}>{selected.plan} plan</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">User ID</p>
                <p className="font-mono text-sm text-slate-700">{selected.id}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Country</p>
                <p className="text-sm text-slate-700">{selected.country}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Joined</p>
                <p className="text-sm text-slate-700">{selected.joinedAt}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Last Active</p>
                <p className="text-sm text-slate-700">{selected.lastActive}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Study Sets</p>
                <p className="text-sm text-slate-700">{selected.studySets}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Plan</p>
                <p className="text-sm capitalize text-slate-700">{selected.plan}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
