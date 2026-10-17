import { useState } from 'react';
import type { Page } from '@/types';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { DashboardPage } from '@/pages/DashboardPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { UsersPage } from '@/pages/UsersPage';
import { ClassesPage } from '@/pages/ClassesPage';
import { TicketsPage } from '@/pages/TicketsPage';
import { SubscriptionsPage } from '@/pages/SubscriptionsPage';
import { FinancialsPage } from '@/pages/FinancialsPage';
import { ContentPage } from '@/pages/ContentPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { FeedbackPage } from '@/pages/FeedbackPage';
import { RolesPage } from '@/pages/RolesPage';
import { FeatureFlagsPage } from '@/pages/FeatureFlagsPage';
import { EmailTemplatesPage } from '@/pages/EmailTemplatesPage';
import { AchievementsPage } from '@/pages/AchievementsPage';
import { HealthPage } from '@/pages/HealthPage';
import { NotificationsPage } from '@/pages/NotificationsPage';
import { AuditPage } from '@/pages/AuditPage';
import { SettingsPage } from '@/pages/SettingsPage';

const pageMeta: Record<Page, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of platform metrics and activity' },
  analytics: { title: 'Analytics', subtitle: 'Deep insights into user behavior and learning patterns' },
  users: { title: 'User Management', subtitle: 'Manage accounts, roles, and permissions' },
  classes: { title: 'Classes & Groups', subtitle: 'Manage class rooms, teachers, and student enrollment' },
  tickets: { title: 'Support Tickets', subtitle: 'Track and resolve customer support requests' },
  subscriptions: { title: 'Subscriptions', subtitle: 'Billing, plans, and revenue management' },
  financials: { title: 'Financial Reports', subtitle: 'Transactions, refunds, and revenue analytics' },
  content: { title: 'Content Review', subtitle: 'Moderate and approve user-generated content' },
  reports: { title: 'Reports & Flags', subtitle: 'Handle user-submitted content reports' },
  feedback: { title: 'User Feedback', subtitle: 'Collect and triage feature requests and feedback' },
  roles: { title: 'Roles & Permissions', subtitle: 'Manage admin roles and access control' },
  feature_flags: { title: 'Feature Flags', subtitle: 'Toggle features and manage A/B test rollouts' },
  email_templates: { title: 'Email Templates', subtitle: 'Automated email campaigns and triggers' },
  achievements: { title: 'Achievements', subtitle: 'Gamification, badges, and XP rewards' },
  health: { title: 'System Health', subtitle: 'Monitor service status and uptime' },
  notifications: { title: 'Notifications', subtitle: 'Manage campaigns and communication' },
  audit: { title: 'Audit Logs', subtitle: 'Administrative action history and system events' },
  settings: { title: 'Settings', subtitle: 'Configure platform preferences and integrations' },
};

function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const meta = pageMeta[page];

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar current={page} onNavigate={setPage} collapsed={sidebarCollapsed} />
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-60'}`}>
        <Header
          title={meta.title}
          subtitle={meta.subtitle}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="animate-fade-in p-5 lg:p-6">
          {page === 'dashboard' && <DashboardPage />}
          {page === 'analytics' && <AnalyticsPage />}
          {page === 'users' && <UsersPage />}
          {page === 'classes' && <ClassesPage />}
          {page === 'tickets' && <TicketsPage />}
          {page === 'subscriptions' && <SubscriptionsPage />}
          {page === 'financials' && <FinancialsPage />}
          {page === 'content' && <ContentPage />}
          {page === 'reports' && <ReportsPage />}
          {page === 'feedback' && <FeedbackPage />}
          {page === 'roles' && <RolesPage />}
          {page === 'feature_flags' && <FeatureFlagsPage />}
          {page === 'email_templates' && <EmailTemplatesPage />}
          {page === 'achievements' && <AchievementsPage />}
          {page === 'health' && <HealthPage />}
          {page === 'notifications' && <NotificationsPage />}
          {page === 'audit' && <AuditPage />}
          {page === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}

export default App;
