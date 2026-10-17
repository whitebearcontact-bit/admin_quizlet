import { Card, CardHeader, StatCard } from '@/components/Card';
import { Badge, statusBadge } from '@/components/Badge';
import {
  Trophy,
  Footprints,
  Flame,
  Moon,
  Award,
  Users as UsersIcon,
  Zap,
  Languages,
  Crown,
  PenTool,
  Plus,
  Star,
} from 'lucide-react';
import { achievements } from '@/data';
import type { Achievement } from '@/types';

const iconMap: Record<string, typeof Trophy> = {
  Footprints,
  Flame,
  Trophy,
  Moon,
  Award,
  Users: UsersIcon,
  Zap,
  Languages,
  Crown,
  PenTool,
};

const tierConfig: Record<string, { bg: string; text: string; ring: string; label: string }> = {
  bronze: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-200', label: 'Bronze' },
  silver: { bg: 'bg-slate-100', text: 'text-slate-700', ring: 'ring-slate-300', label: 'Silver' },
  gold: { bg: 'bg-yellow-50', text: 'text-yellow-700', ring: 'ring-yellow-200', label: 'Gold' },
  platinum: { bg: 'bg-sky-50', text: 'text-sky-700', ring: 'ring-sky-200', label: 'Platinum' },
  diamond: { bg: 'bg-blue-50', text: 'text-blue-700', ring: 'ring-blue-200', label: 'Diamond' },
};

export function AchievementsPage() {
  const active = achievements.filter((a) => a.active).length;
  const totalEarners = achievements.reduce((s, a) => s + a.earners, 0);
  const totalXp = achievements.reduce((s, a) => s + a.xpReward, 0);
  const tiers = new Set(achievements.map((a) => a.tier)).size;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Achievements" value={achievements.length} icon={<Trophy size={20} />} accent="blue" />
        <StatCard label="Active" value={active} delta="90%" trend="up" icon={<Award size={20} />} accent="emerald" />
        <StatCard label="Total Earners" value={totalEarners.toLocaleString()} delta="15%" trend="up" icon={<UsersIcon size={20} />} accent="amber" />
        <StatCard label="XP Pool" value={totalXp.toLocaleString()} icon={<Zap size={20} />} accent="sky" />
      </div>

      <Card>
        <CardHeader
          title="Gamification — Achievements"
          subtitle="Manage badges, XP rewards, and achievement tiers"
          action={
            <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700">
              <Plus size={14} /> New Achievement
            </button>
          }
        />
        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((ach) => {
            const Icon = iconMap[ach.icon] ?? Trophy;
            const tier = tierConfig[ach.tier];
            return (
              <div
                key={ach.id}
                className={`rounded-xl border border-slate-200 p-5 transition-all hover:shadow-md ${ach.active ? '' : 'opacity-60'}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ring-2 ${tier.bg} ${tier.text} ring-inset ${tier.ring}`}>
                    <Icon size={24} />
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${tier.bg} ${tier.text} ring-1 ring-inset ${tier.ring}`}>
                    <Star size={10} /> {tier.label}
                  </span>
                </div>
                <p className="mt-3 text-sm font-bold text-slate-900">{ach.name}</p>
                <p className="mt-1 text-xs text-slate-500">{ach.description}</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                  <div>
                    <p className="text-xs text-slate-400">Earned by</p>
                    <p className="text-sm font-bold text-slate-800">{ach.earners.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">XP Reward</p>
                    <p className="flex items-center gap-1 text-sm font-bold text-blue-600">
                      <Zap size={12} /> {ach.xpReward}
                    </p>
                  </div>
                  <Badge status={ach.active ? 'Active' : 'Inactive'} variant={ach.active ? 'success' : 'neutral'} />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
        {(['bronze', 'silver', 'gold', 'platinum', 'diamond'] as const).map((tier) => {
          const count = achievements.filter((a) => a.tier === tier).length;
          const cfg = tierConfig[tier];
          return (
            <Card key={tier} className="p-4">
              <div className={`mb-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${cfg.bg} ${cfg.text} ring-1 ring-inset ${cfg.ring}`}>
                <Star size={10} /> {cfg.label}
              </div>
              <p className="text-2xl font-bold text-slate-900">{count}</p>
              <p className="text-xs text-slate-400">achievements</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
