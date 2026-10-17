import { Card, CardHeader } from '@/components/Card';
import { Globe, Bell, Shield, Database, Palette, Mail } from 'lucide-react';
import { useState } from 'react';

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-200'}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`}
      />
    </button>
  );
}

export function SettingsPage() {
  const [toggles, setToggles] = useState({
    emailNotif: true,
    pushNotif: true,
    twoFactor: true,
    maintenanceMode: false,
    autoBackup: true,
    publicSignup: true,
    darkMode: false,
    weeklyReports: true,
  });

  const toggle = (key: keyof typeof toggles) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  const sections = [
    {
      icon: Globe,
      title: 'General Settings',
      settings: [
        { key: 'publicSignup' as const, label: 'Public Sign-up', desc: 'Allow new users to create accounts' },
        { key: 'maintenanceMode' as const, label: 'Maintenance Mode', desc: 'Temporarily restrict access to the app' },
      ],
    },
    {
      icon: Bell,
      title: 'Notifications',
      settings: [
        { key: 'emailNotif' as const, label: 'Email Notifications', desc: 'Receive email alerts for critical events' },
        { key: 'pushNotif' as const, label: 'Push Notifications', desc: 'Browser push for new tickets and reports' },
        { key: 'weeklyReports' as const, label: 'Weekly Summary Reports', desc: 'Automated weekly performance digest' },
      ],
    },
    {
      icon: Shield,
      title: 'Security',
      settings: [
        { key: 'twoFactor' as const, label: 'Two-Factor Authentication', desc: 'Require 2FA for all admin accounts' },
      ],
    },
    {
      icon: Database,
      title: 'Data & Backup',
      settings: [
        { key: 'autoBackup' as const, label: 'Automatic Backups', desc: 'Daily database backup at 2:00 AM UTC' },
      ],
    },
    {
      icon: Palette,
      title: 'Appearance',
      settings: [
        { key: 'darkMode' as const, label: 'Dark Mode', desc: 'Use dark color scheme across the admin panel' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title}>
              <CardHeader title={section.title} subtitle="Configure preferences" />
              <div className="divide-y divide-slate-50">
                {section.settings.map((setting) => (
                  <div key={setting.key} className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <Icon size={17} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{setting.label}</p>
                        <p className="text-xs text-slate-400">{setting.desc}</p>
                      </div>
                    </div>
                    <Toggle enabled={toggles[setting.key]} onChange={() => toggle(setting.key)} />
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader title="Platform Configuration" subtitle="API keys and integration settings" />
        <div className="p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Platform Name</label>
              <input
                type="text"
                defaultValue="Quizlet"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Support Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  defaultValue="support@quizlet.app"
                  className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Max Study Sets (Free Plan)</label>
              <input
                type="number"
                defaultValue={5}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-slate-600">Max Study Sets (Pro Plan)</label>
              <input
                type="number"
                defaultValue={999}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
