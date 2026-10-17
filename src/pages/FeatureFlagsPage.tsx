import { Card, CardHeader, StatCard } from '@/components/Card';
import { Badge, statusBadge } from '@/components/Badge';
import { FlaskConical, Rocket, Beaker, CheckCircle, XCircle, Plus } from 'lucide-react';
import { featureFlags } from '@/data';
import type { FeatureFlag } from '@/types';

const envColors: Record<string, string> = {
  production: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  staging: 'bg-amber-50 text-amber-700 ring-amber-200',
  development: 'bg-sky-50 text-sky-700 ring-sky-200',
};

export function FeatureFlagsPage() {
  const enabled = featureFlags.filter((f) => f.enabled).length;
  const disabled = featureFlags.filter((f) => !f.enabled).length;
  const prodCount = featureFlags.filter((f) => f.environment === 'production').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Flags" value={featureFlags.length} icon={<FlaskConical size={20} />} accent="blue" />
        <StatCard label="Enabled" value={enabled} delta="62%" trend="up" icon={<CheckCircle size={20} />} accent="emerald" />
        <StatCard label="Disabled" value={disabled} icon={<XCircle size={20} />} accent="rose" />
        <StatCard label="In Production" value={prodCount} icon={<Rocket size={20} />} accent="amber" />
      </div>

      <Card>
        <CardHeader
          title="Feature Flags"
          subtitle="Toggle features, control rollout percentages, and manage A/B test variants"
          action={
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700">
              <Plus size={14} /> New Flag
            </button>
          }
        />
        <div className="divide-y divide-slate-50">
          {featureFlags.map((flag) => (
            <FlagRow key={flag.id} flag={flag} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function FlagRow({ flag }: { flag: FeatureFlag }) {
  return (
    <div className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-slate-50">
      <div className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
        flag.enabled ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
      }`}>
        {flag.enabled ? <Rocket size={18} /> : <Beaker size={18} />}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-slate-900">{flag.name}</p>
          <span className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold ring-1 ring-inset ${envColors[flag.environment]}`}>
            {flag.environment}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">{flag.description}</p>
        <p className="mt-1 font-mono text-[10px] text-slate-400">{flag.key}</p>

        {flag.enabled && flag.rollout < 100 && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Rollout: {flag.rollout}%</span>
              <span className="text-slate-400">Variants: {flag.variants.join(' vs ')}</span>
            </div>
            <div className="mt-1 h-1.5 rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${flag.rollout}%` }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-end gap-2">
        <ToggleSwitch enabled={flag.enabled} />
        <span className="text-[10px] text-slate-400">{flag.enabled ? 'ON' : 'OFF'}</span>
      </div>
    </div>
  );
}

function ToggleSwitch({ enabled }: { enabled: boolean }) {
  return (
    <div
      className={`relative h-6 w-11 rounded-full transition-colors ${enabled ? 'bg-blue-600' : 'bg-slate-200'}`}
      style={{ pointerEvents: 'none' }}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
          enabled ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </div>
  );
}
