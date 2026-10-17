import { useState } from 'react';
import { Card, CardHeader, StatCard } from '@/components/Card';
import { Modal } from '@/components/Modal';
import { Shield, Users, Lock, Plus, Check, X } from 'lucide-react';
import { roles, allPermissions } from '@/data';
import type { Role } from '@/types';

export function RolesPage() {
  const [selected, setSelected] = useState<Role | null>(null);
  const totalMembers = roles.reduce((s, r) => s + r.members, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Roles" value={roles.length} icon={<Shield size={20} />} accent="blue" />
        <StatCard label="System Roles" value={roles.filter((r) => r.system).length} icon={<Lock size={20} />} accent="amber" />
        <StatCard label="Custom Roles" value={roles.filter((r) => !r.system).length} icon={<Plus size={20} />} accent="sky" />
        <StatCard label="Total Members" value={totalMembers} delta="4" trend="up" icon={<Users size={20} />} accent="emerald" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id} className="p-5 cursor-pointer hover:shadow-md transition-all" onClick={() => setSelected(role)}>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: role.color }}
                >
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{role.name}</p>
                  {role.system && (
                    <span className="text-[10px] font-semibold uppercase text-slate-400">System Role</span>
                  )}
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                {role.members} members
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-500">{role.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {role.permissions.slice(0, 4).map((p, i) => (
                <span key={i} className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] text-slate-600">
                  {p}
                </span>
              ))}
              {role.permissions.length > 4 && (
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-400">
                  +{role.permissions.length - 4} more
                </span>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Role Permissions"
        footer={
          <>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              Duplicate
            </button>
            <button className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
              Edit Permissions
            </button>
          </>
        }
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg text-white"
                style={{ backgroundColor: selected.color }}
              >
                <Shield size={22} />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">{selected.name}</p>
                <p className="text-sm text-slate-500">{selected.description}</p>
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Members assigned</span>
                <span className="text-sm font-bold text-slate-900">{selected.members}</span>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase text-slate-400">Permission Matrix</p>
              <div className="space-y-2">
                {allPermissions.map((perm) => {
                  const hasAll = selected.permissions.includes('*');
                  const hasModule = selected.permissions.some((p) => p.startsWith(`${perm.module}.`) || p === '*');
                  return (
                    <div key={perm.module} className="flex items-center justify-between rounded-lg border border-slate-100 p-3">
                      <span className="text-sm font-medium text-slate-700 capitalize">{perm.module}</span>
                      <div className="flex gap-1">
                        {perm.actions.map((action) => {
                          const granted = hasAll || selected.permissions.includes(`${perm.module}.${action}`) || selected.permissions.includes(`${perm.module}.*`);
                          return (
                            <span
                              key={action}
                              className={`flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
                                granted ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-400'
                              }`}
                            >
                              {granted ? <Check size={10} /> : <X size={10} />}
                              {action}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
