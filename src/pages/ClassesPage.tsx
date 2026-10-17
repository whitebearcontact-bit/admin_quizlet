import { useState } from 'react';
import { Card, CardHeader, StatCard } from '@/components/Card';
import { DataTable } from '@/components/DataTable';
import { Badge, statusBadge } from '@/components/Badge';
import { Modal } from '@/components/Modal';
import { Users, School, BookOpen, GraduationCap, Plus, Archive } from 'lucide-react';
import { classes } from '@/data';
import type { ClassGroup } from '@/types';

export function ClassesPage() {
  const [selected, setSelected] = useState<ClassGroup | null>(null);

  const totalStudents = classes.reduce((s, c) => s + c.students, 0);
  const totalSets = classes.reduce((s, c) => s + c.studySets, 0);
  const active = classes.filter((c) => c.active).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Classes" value={classes.length} icon={<School size={20} />} accent="blue" />
        <StatCard label="Total Students" value={totalStudents.toLocaleString()} delta="12%" trend="up" icon={<Users size={20} />} accent="emerald" />
        <StatCard label="Study Sets in Classes" value={totalSets} icon={<BookOpen size={20} />} accent="sky" />
        <StatCard label="Active Classes" value={active} delta="5%" trend="up" icon={<GraduationCap size={20} />} accent="amber" />
      </div>

      <Card>
        <CardHeader
          title="All Classes"
          subtitle="Manage class groups, teachers, and enrollment"
          action={
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700">
              <Plus size={14} /> New Class
            </button>
          }
        />
        <div className="p-5">
          <DataTable<ClassGroup>
            data={classes}
            searchKeys={['id', 'name', 'teacher', 'subject']}
            columns={[
              { key: 'id', label: 'ID', sortable: true, width: '100px',
                render: (c) => <span className="font-mono text-xs text-slate-500">{c.id}</span> },
              { key: 'name', label: 'Class Name', sortable: true,
                render: (c) => (
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-sky-400 text-white">
                      <GraduationCap size={15} />
                    </div>
                    <div>
                      <p className="font-medium text-slate-800">{c.name}</p>
                      <p className="text-xs text-slate-400">{c.subject}</p>
                    </div>
                  </div>
                ) },
              { key: 'teacher', label: 'Teacher', sortable: true,
                render: (c) => <span className="text-slate-600">{c.teacher}</span> },
              { key: 'students', label: 'Students', sortable: true,
                render: (c) => <span className="font-medium text-slate-700">{c.students}</span> },
              { key: 'studySets', label: 'Study Sets', sortable: true,
                render: (c) => <span className="text-slate-600">{c.studySets}</span> },
              { key: 'visibility', label: 'Visibility', sortable: true,
                render: (c) => <span className="capitalize text-slate-600">{c.visibility}</span> },
              { key: 'active', label: 'Status', sortable: true,
                render: (c) => <Badge status={c.active ? 'Active' : 'Archived'} variant={c.active ? 'success' : 'neutral'} /> },
            ]}
            onRowClick={(c) => setSelected(c)}
          />
        </div>
      </Card>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Class Details"
        footer={
          <>
            <button className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              <Archive size={15} /> Archive
            </button>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              Edit Class
            </button>
          </>
        }
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 text-white">
                <GraduationCap size={26} />
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">{selected.name}</p>
                <p className="text-sm text-slate-500">Taught by {selected.teacher}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Class ID</p>
                <p className="font-mono text-sm text-slate-700">{selected.id}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Subject</p>
                <p className="text-sm text-slate-700">{selected.subject}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Students Enrolled</p>
                <p className="text-sm font-bold text-slate-700">{selected.students}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Study Sets</p>
                <p className="text-sm font-bold text-slate-700">{selected.studySets}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Visibility</p>
                <p className="text-sm capitalize text-slate-700">{selected.visibility}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-400">Created</p>
                <p className="text-sm text-slate-700">{selected.createdAt}</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
