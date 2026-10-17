import { Card, CardHeader, StatCard } from '@/components/Card';
import { Badge, statusBadge } from '@/components/Badge';
import { BarChart } from '@/components/Charts';
import { Bell, Mail, Smartphone, MessageSquare, Send, CheckCircle, Eye } from 'lucide-react';
import { notifications } from '@/data';

const channelIcon: Record<string, typeof Mail> = {
  email: Mail,
  push: Smartphone,
  in_app: MessageSquare,
  sms: Send,
};

const typeVariant: Record<string, 'info' | 'success' | 'warning' | 'error'> = {
  info: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
};

export function NotificationsPage() {
  const totalRecipients = notifications.reduce((s, n) => s + n.recipients, 0);
  const avgOpenRate = (notifications.reduce((s, n) => s + n.openRate, 0) / notifications.length).toFixed(1);

  const openRateData = notifications.map((n) => ({
    label: n.id.split('-')[1],
    value: n.openRate,
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Sent" value={notifications.length} icon={<Bell size={20} />} accent="blue" />
        <StatCard label="Total Recipients" value={totalRecipients.toLocaleString()} icon={<Send size={20} />} accent="sky" />
        <StatCard label="Avg Open Rate" value={`${avgOpenRate}%`} delta="3.2%" trend="up" icon={<Eye size={20} />} accent="emerald" />
        <StatCard label="Delivered" value="99.8%" delta="0.1%" trend="up" icon={<CheckCircle size={20} />} accent="amber" />
      </div>

      <Card>
        <CardHeader title="Open Rate by Campaign" subtitle="Percentage of recipients who opened each notification" />
        <div className="p-5">
          <BarChart data={openRateData} color="#2563eb" height={180} formatValue={(v) => `${v}%`} />
        </div>
      </Card>

      <Card>
        <CardHeader title="Notification History" subtitle="All campaigns sent across channels" />
        <div className="divide-y divide-slate-50">
          {notifications.map((n) => {
            const Icon = channelIcon[n.channel];
            return (
              <div key={n.id} className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-slate-50">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  n.type === 'success' ? 'bg-emerald-50 text-emerald-600' :
                  n.type === 'warning' ? 'bg-amber-50 text-amber-600' :
                  n.type === 'error' ? 'bg-rose-50 text-rose-600' :
                  'bg-sky-50 text-sky-600'
                }`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                    <Badge status={n.type} variant={typeVariant[n.type]} />
                  </div>
                  <p className="mt-0.5 text-sm text-slate-500">{n.message}</p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-slate-400">
                    <span className="capitalize">{n.channel.replace(/_/g, ' ')}</span>
                    <span>{n.recipients.toLocaleString()} recipients</span>
                    <span>{n.openRate}% open rate</span>
                    <span>{n.sentAt}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader title="Compose New Notification" subtitle="Send an announcement to all or targeted users" />
        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Title</label>
              <input
                type="text"
                placeholder="Notification title..."
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Channel</label>
              <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100">
                <option value="email">Email</option>
                <option value="push">Push Notification</option>
                <option value="in_app">In-App</option>
                <option value="sms">SMS</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Message</label>
              <textarea
                rows={3}
                placeholder="Write your message..."
                className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50">
              Save Draft
            </button>
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
              <Send size={15} /> Send Now
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
