import type { Page } from '@/types';
import {
  LayoutDashboard,
  Users,
  Ticket,
  CreditCard,
  Activity,
  BookOpen,
  Flag,
  ScrollText,
  Bell,
  Settings,
  GraduationCap,
  BarChart3,
  School,
  DollarSign,
  Shield,
  FlaskConical,
  Mail,
  Trophy,
  MessageSquareText,
} from 'lucide-react';

interface SidebarProps {
  current: Page;
  onNavigate: (page: Page) => void;
  collapsed: boolean;
}

const navItems: { id: Page; label: string; icon: typeof LayoutDashboard; group: string }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, group: 'Overview' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, group: 'Overview' },
  { id: 'users', label: 'User Management', icon: Users, group: 'Management' },
  { id: 'classes', label: 'Classes & Groups', icon: School, group: 'Management' },
  { id: 'tickets', label: 'Support Tickets', icon: Ticket, group: 'Management' },
  { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard, group: 'Management' },
  { id: 'financials', label: 'Financial Reports', icon: DollarSign, group: 'Management' },
  { id: 'content', label: 'Content Review', icon: BookOpen, group: 'Management' },
  { id: 'reports', label: 'Reports & Flags', icon: Flag, group: 'Management' },
  { id: 'feedback', label: 'User Feedback', icon: MessageSquareText, group: 'Management' },
  { id: 'roles', label: 'Roles & Permissions', icon: Shield, group: 'Configuration' },
  { id: 'feature_flags', label: 'Feature Flags', icon: FlaskConical, group: 'Configuration' },
  { id: 'email_templates', label: 'Email Templates', icon: Mail, group: 'Configuration' },
  { id: 'achievements', label: 'Achievements', icon: Trophy, group: 'Configuration' },
  { id: 'health', label: 'System Health', icon: Activity, group: 'Operations' },
  { id: 'notifications', label: 'Notifications', icon: Bell, group: 'Operations' },
  { id: 'audit', label: 'Audit Logs', icon: ScrollText, group: 'Operations' },
  { id: 'settings', label: 'Settings', icon: Settings, group: 'Operations' },
];

export function Sidebar({ current, onNavigate, collapsed }: SidebarProps) {
  const groups = [...new Set(navItems.map((n) => n.group))];

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}
    >
      <div className="flex h-16 items-center gap-2.5 border-b border-slate-100 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-sky-500 text-white">
          <GraduationCap size={20} />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-900">Quizlet Admin</p>
            <p className="text-[10px] text-slate-400">Control Panel v2.0</p>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        {groups.map((group) => (
          <div key={group} className="mb-4">
            {!collapsed && (
              <p className="mb-1.5 px-4 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{group}</p>
            )}
            {navItems.filter((n) => n.group === group).map((item) => {
              const Icon = item.icon;
              const active = current === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`group relative flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                    active ? 'text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  {active && <span className="absolute left-0 top-0 h-full w-0.5 rounded-r bg-blue-600" />}
                  <Icon size={18} className={`shrink-0 ${active ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="border-t border-slate-100 p-4">
          <div className="rounded-lg bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-xs font-bold text-white">
                AD
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-xs font-semibold text-slate-900">Admin User</p>
                <p className="truncate text-[10px] text-slate-400">admin@quizlet.app</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
