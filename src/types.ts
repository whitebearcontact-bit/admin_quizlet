export type Page =
  | 'dashboard'
  | 'users'
  | 'tickets'
  | 'subscriptions'
  | 'health'
  | 'content'
  | 'reports'
  | 'audit'
  | 'notifications'
  | 'settings'
  | 'analytics'
  | 'classes'
  | 'financials'
  | 'roles'
  | 'feature_flags'
  | 'email_templates'
  | 'achievements'
  | 'feedback';

export type UserStatus = 'active' | 'suspended' | 'banned' | 'pending';
export type UserPlan = 'free' | 'plus' | 'pro' | 'teacher';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  status: UserStatus;
  plan: UserPlan;
  joinedAt: string;
  lastActive: string;
  studySets: number;
  country: string;
}

export type TicketStatus = 'open' | 'pending' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Ticket {
  id: string;
  subject: string;
  user: string;
  email: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  createdAt: string;
  messages: number;
}

export type SubStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'expired';

export interface Subscription {
  id: string;
  user: string;
  email: string;
  plan: UserPlan;
  status: SubStatus;
  amount: number;
  billingCycle: 'monthly' | 'annual';
  startedAt: string;
  renewsAt: string;
}

export type ServiceStatus = 'operational' | 'degraded' | 'partial_outage' | 'major_outage' | 'maintenance';

export interface ServiceHealth {
  id: string;
  name: string;
  status: ServiceStatus;
  uptime: number;
  latency: number;
  description: string;
  incidents: number;
}

export interface StudySet {
  id: string;
  title: string;
  author: string;
  cards: number;
  visibility: 'public' | 'private' | 'class';
  subject: string;
  createdAt: string;
  reports: number;
}

export type ContentType = 'flashcard' | 'practice_test' | 'study_guide';

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  creator: string;
  status: 'published' | 'pending_review' | 'flagged' | 'removed';
  views: number;
  rating: number;
  createdAt: string;
}

export interface Report {
  id: string;
  reporter: string;
  target: string;
  targetType: 'study_set' | 'comment' | 'user';
  reason: string;
  status: 'reviewing' | 'actioned' | 'dismissed';
  createdAt: string;
}

export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  target: string;
  ip: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  channel: 'email' | 'push' | 'in_app' | 'sms';
  sentAt: string;
  recipients: number;
  openRate: number;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface AnalyticsEvent {
  id: string;
  event: string;
  category: 'engagement' | 'learning' | 'monetization' | 'retention';
  count: number;
  trend: number;
  uniqueUsers: number;
}

export interface ClassGroup {
  id: string;
  name: string;
  teacher: string;
  students: number;
  studySets: number;
  subject: string;
  visibility: 'public' | 'private' | 'school';
  createdAt: string;
  active: boolean;
}

export interface Transaction {
  id: string;
  user: string;
  email: string;
  description: string;
  amount: number;
  type: 'payment' | 'refund' | 'chargeback' | 'payout';
  status: 'completed' | 'pending' | 'failed' | 'disputed';
  method: string;
  date: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  members: number;
  permissions: string[];
  color: string;
  system: boolean;
}

export interface FeatureFlag {
  id: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
  rollout: number;
  environment: 'production' | 'staging' | 'development';
  variants: string[];
  createdAt: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  trigger: string;
  status: 'active' | 'draft' | 'disabled';
  sentCount: number;
  openRate: number;
  lastEdited: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  earners: number;
  xpReward: number;
  active: boolean;
}

export interface Feedback {
  id: string;
  user: string;
  email: string;
  rating: number;
  category: string;
  message: string;
  status: 'new' | 'reviewed' | 'implemented' | 'archived';
  createdAt: string;
}

export interface ActivityFeedItem {
  id: string;
  type: 'user_join' | 'ticket' | 'payment' | 'report' | 'content' | 'system';
  message: string;
  timestamp: string;
}
