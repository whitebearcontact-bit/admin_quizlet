interface BadgeProps {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
}

const variantStyles: Record<string, string> = {
  default: 'bg-slate-100 text-slate-700 ring-slate-200',
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  warning: 'bg-amber-50 text-amber-700 ring-amber-200',
  error: 'bg-rose-50 text-rose-700 ring-rose-200',
  info: 'bg-sky-50 text-sky-700 ring-sky-200',
  neutral: 'bg-slate-100 text-slate-500 ring-slate-200',
};

export function Badge({ status, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${variantStyles[variant]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}

export function statusBadge(status: string): { status: string; variant: BadgeProps['variant'] } {
  const map: Record<string, BadgeProps['variant']> = {
    active: 'success',
    operational: 'success',
    resolved: 'success',
    published: 'success',
    actioned: 'success',
    pending: 'warning',
    reviewing: 'warning',
    pending_review: 'warning',
    degraded: 'warning',
    trialing: 'info',
    partial_outage: 'error',
    major_outage: 'error',
    banned: 'error',
    removed: 'error',
    expired: 'neutral',
    dismissed: 'neutral',
    closed: 'neutral',
    canceled: 'neutral',
    maintenance: 'info',
    suspended: 'error',
    flagged: 'error',
    past_due: 'error',
  };
  const formatted = status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  return { status: formatted, variant: map[status] ?? 'default' };
}
