import type {
  User,
  Ticket,
  Subscription,
  ServiceHealth,
  ContentItem,
  Report,
  AuditLog,
  Notification,
  ChartPoint,
  AnalyticsEvent,
  ClassGroup,
  Transaction,
  Role,
  FeatureFlag,
  EmailTemplate,
  Achievement,
  Feedback,
  ActivityFeedItem,
} from '@/types';

export const users: User[] = [
  { id: 'U-1001', name: 'Sarah Chen', email: 'sarah.chen@email.com', avatar: 'SC', status: 'active', plan: 'pro', joinedAt: '2024-01-15', lastActive: '2026-10-13 08:42', studySets: 47, country: 'USA' },
  { id: 'U-1002', name: 'Marcus Johnson', email: 'marcus.j@email.com', avatar: 'MJ', status: 'active', plan: 'plus', joinedAt: '2024-03-22', lastActive: '2026-10-12 22:10', studySets: 23, country: 'UK' },
  { id: 'U-1003', name: 'Aisha Patel', email: 'aisha.patel@email.com', avatar: 'AP', status: 'active', plan: 'teacher', joinedAt: '2023-11-08', lastActive: '2026-10-13 09:15', studySets: 112, country: 'India' },
  { id: 'U-1004', name: 'Diego Ramirez', email: 'diego.ramirez@email.com', avatar: 'DR', status: 'suspended', plan: 'free', joinedAt: '2024-06-30', lastActive: '2026-10-08 14:33', studySets: 5, country: 'Mexico' },
  { id: 'U-1005', name: 'Emma Wilson', email: 'emma.wilson@email.com', avatar: 'EW', status: 'active', plan: 'plus', joinedAt: '2024-02-14', lastActive: '2026-10-13 07:58', studySets: 38, country: 'Canada' },
  { id: 'U-1006', name: 'Liam O\'Brien', email: 'liam.obrien@email.com', avatar: 'LO', status: 'pending', plan: 'free', joinedAt: '2026-10-12', lastActive: '2026-10-12 18:20', studySets: 0, country: 'Ireland' },
  { id: 'U-1007', name: 'Yuki Tanaka', email: 'yuki.tanaka@email.com', avatar: 'YT', status: 'active', plan: 'pro', joinedAt: '2023-09-01', lastActive: '2026-10-13 06:45', studySets: 89, country: 'Japan' },
  { id: 'U-1008', name: 'Olivia Brown', email: 'olivia.brown@email.com', avatar: 'OB', status: 'banned', plan: 'free', joinedAt: '2024-05-10', lastActive: '2026-09-28 11:00', studySets: 2, country: 'Australia' },
  { id: 'U-1009', name: 'Noah Garcia', email: 'noah.garcia@email.com', avatar: 'NG', status: 'active', plan: 'teacher', joinedAt: '2023-08-19', lastActive: '2026-10-12 20:33', studySets: 156, country: 'Spain' },
  { id: 'U-1010', name: 'Zara Ahmed', email: 'zara.ahmed@email.com', avatar: 'ZA', status: 'active', plan: 'plus', joinedAt: '2024-07-25', lastActive: '2026-10-13 05:12', studySets: 31, country: 'UAE' },
  { id: 'U-1011', name: 'Ethan Lee', email: 'ethan.lee@email.com', avatar: 'EL', status: 'active', plan: 'free', joinedAt: '2025-01-03', lastActive: '2026-10-11 19:44', studySets: 12, country: 'South Korea' },
  { id: 'U-1012', name: 'Sofia Rossi', email: 'sofia.rossi@email.com', avatar: 'SR', status: 'suspended', plan: 'plus', joinedAt: '2024-04-17', lastActive: '2026-10-05 10:22', studySets: 19, country: 'Italy' },
];

export const tickets: Ticket[] = [
  { id: 'TK-501', subject: 'Cannot export flashcards to PDF', user: 'Sarah Chen', email: 'sarah.chen@email.com', status: 'open', priority: 'medium', category: 'Bug Report', createdAt: '2026-10-13 08:30', messages: 3 },
  { id: 'TK-502', subject: 'Billing charged twice for Plus plan', user: 'Marcus Johnson', email: 'marcus.j@email.com', status: 'pending', priority: 'high', category: 'Billing', createdAt: '2026-10-12 14:20', messages: 5 },
  { id: 'TK-503', subject: 'Account suspended without reason', user: 'Diego Ramirez', email: 'diego.ramirez@email.com', status: 'open', priority: 'urgent', category: 'Account', createdAt: '2026-10-13 09:00', messages: 1 },
  { id: 'TK-504', subject: 'Request: Dark mode for mobile app', user: 'Emma Wilson', email: 'emma.wilson@email.com', status: 'open', priority: 'low', category: 'Feature Request', createdAt: '2026-10-11 11:45', messages: 2 },
  { id: 'TK-505', subject: 'Audio pronunciation not working', user: 'Yuki Tanaka', email: 'yuki.tanaka@email.com', status: 'resolved', priority: 'medium', category: 'Bug Report', createdAt: '2026-10-09 07:15', messages: 7 },
  { id: 'TK-506', subject: 'Cannot invite students to class', user: 'Aisha Patel', email: 'aisha.patel@email.com', status: 'pending', priority: 'high', category: 'Feature Issue', createdAt: '2026-10-12 16:30', messages: 4 },
  { id: 'TK-507', subject: 'Subscription cancellation not processed', user: 'Sofia Rossi', email: 'sofia.rossi@email.com', status: 'closed', priority: 'medium', category: 'Billing', createdAt: '2026-10-05 09:10', messages: 8 },
  { id: 'TK-508', subject: 'Inappropriate content in study set', user: 'Noah Garcia', email: 'noah.garcia@email.com', status: 'open', priority: 'high', category: 'Content Report', createdAt: '2026-10-13 07:50', messages: 2 },
  { id: 'TK-509', subject: 'Login with Google not redirecting', user: 'Liam O\'Brien', email: 'liam.obrien@email.com', status: 'pending', priority: 'medium', category: 'Authentication', createdAt: '2026-10-12 19:00', messages: 3 },
  { id: 'TK-510', subject: 'Practice test timer incorrect', user: 'Zara Ahmed', email: 'zara.ahmed@email.com', status: 'resolved', priority: 'low', category: 'Bug Report', createdAt: '2026-10-08 13:25', messages: 6 },
];

export const subscriptions: Subscription[] = [
  { id: 'SUB-2001', user: 'Sarah Chen', email: 'sarah.chen@email.com', plan: 'pro', status: 'active', amount: 9.99, billingCycle: 'monthly', startedAt: '2024-01-20', renewsAt: '2026-11-20' },
  { id: 'SUB-2002', user: 'Marcus Johnson', email: 'marcus.j@email.com', plan: 'plus', status: 'past_due', amount: 5.99, billingCycle: 'monthly', startedAt: '2024-03-25', renewsAt: '2026-10-25' },
  { id: 'SUB-2003', user: 'Aisha Patel', email: 'aisha.patel@email.com', plan: 'teacher', status: 'active', amount: 35.99, billingCycle: 'annual', startedAt: '2023-11-10', renewsAt: '2026-11-10' },
  { id: 'SUB-2004', user: 'Emma Wilson', email: 'emma.wilson@email.com', plan: 'plus', status: 'active', amount: 59.99, billingCycle: 'annual', startedAt: '2024-02-15', renewsAt: '2026-02-15' },
  { id: 'SUB-2005', user: 'Yuki Tanaka', email: 'yuki.tanaka@email.com', plan: 'pro', status: 'trialing', amount: 9.99, billingCycle: 'monthly', startedAt: '2026-10-01', renewsAt: '2026-10-15' },
  { id: 'SUB-2006', user: 'Noah Garcia', email: 'noah.garcia@email.com', plan: 'teacher', status: 'active', amount: 35.99, billingCycle: 'annual', startedAt: '2023-08-20', renewsAt: '2026-08-20' },
  { id: 'SUB-2007', user: 'Zara Ahmed', email: 'zara.ahmed@email.com', plan: 'plus', status: 'active', amount: 5.99, billingCycle: 'monthly', startedAt: '2024-07-26', renewsAt: '2026-11-26' },
  { id: 'SUB-2008', user: 'Sofia Rossi', email: 'sofia.rossi@email.com', plan: 'plus', status: 'canceled', amount: 5.99, billingCycle: 'monthly', startedAt: '2024-04-18', renewsAt: '2026-10-18' },
  { id: 'SUB-2009', user: 'Ethan Lee', email: 'ethan.lee@email.com', plan: 'free', status: 'expired', amount: 0, billingCycle: 'monthly', startedAt: '2025-01-04', renewsAt: '2025-02-04' },
  { id: 'SUB-2010', user: 'Liam O\'Brien', email: 'liam.obrien@email.com', plan: 'free', status: 'trialing', amount: 0, billingCycle: 'monthly', startedAt: '2026-10-12', renewsAt: '2026-10-26' },
];

export const services: ServiceHealth[] = [
  { id: 'SVC-1', name: 'API Gateway', status: 'operational', uptime: 99.98, latency: 45, description: 'Main REST/GraphQL entry point', incidents: 0 },
  { id: 'SVC-2', name: 'Authentication Service', status: 'operational', uptime: 99.95, latency: 120, description: 'OAuth, JWT, session management', incidents: 0 },
  { id: 'SVC-3', name: 'Flashcard Engine', status: 'degraded', uptime: 98.72, latency: 380, description: 'Card creation, review scheduling (SRS)', incidents: 2 },
  { id: 'SVC-4', name: 'Search & Indexing', status: 'operational', uptime: 99.89, latency: 90, description: 'Full-text search across study sets', incidents: 0 },
  { id: 'SVC-5', name: 'Payment Processing', status: 'operational', uptime: 99.99, latency: 210, description: 'Stripe integration for subscriptions', incidents: 0 },
  { id: 'SVC-6', name: 'Real-time Sync', status: 'partial_outage', uptime: 95.30, latency: 850, description: 'WebSocket collaboration on study sets', incidents: 5 },
  { id: 'SVC-7', name: 'Media Storage (CDN)', status: 'operational', uptime: 99.97, latency: 35, description: 'Audio pronunciations & image hosting', incidents: 0 },
  { id: 'SVC-8', name: 'Notification Queue', status: 'maintenance', uptime: 99.50, latency: 150, description: 'Email, push, and in-app notifications', incidents: 1 },
  { id: 'SVC-9', name: 'Analytics Pipeline', status: 'operational', uptime: 99.92, latency: 300, description: 'Event tracking & learning insights', incidents: 0 },
  { id: 'SVC-10', name: 'AI Study Assistant', status: 'major_outage', uptime: 87.15, latency: 5000, description: 'GPT-powered study recommendations', incidents: 8 },
];

export const contentItems: ContentItem[] = [
  { id: 'C-3001', title: 'Spanish Vocabulary — Chapter 5', type: 'flashcard', creator: 'Aisha Patel', status: 'published', views: 12450, rating: 4.8, createdAt: '2026-09-01' },
  { id: 'C-3002', title: 'AP Biology Practice Exam 2026', type: 'practice_test', creator: 'Noah Garcia', status: 'published', views: 8930, rating: 4.6, createdAt: '2026-09-15' },
  { id: 'C-3003', title: 'Organic Chemistry Reactions', type: 'study_guide', creator: 'Yuki Tanaka', status: 'flagged', views: 5610, rating: 3.2, createdAt: '2026-08-20' },
  { id: 'C-3004', title: 'World War II Timeline', type: 'flashcard', creator: 'Emma Wilson', status: 'published', views: 15600, rating: 4.9, createdAt: '2026-09-10' },
  { id: 'C-3005', title: 'Calculus Derivatives Cheat Sheet', type: 'study_guide', creator: 'Sarah Chen', status: 'pending_review', views: 0, rating: 0, createdAt: '2026-10-12' },
  { id: 'C-3006', title: 'Japanese Hiragana Practice', type: 'flashcard', creator: 'Yuki Tanaka', status: 'published', views: 22300, rating: 4.7, createdAt: '2026-07-05' },
  { id: 'C-3007', title: 'SAT Math Practice Set #12', type: 'practice_test', creator: 'Zara Ahmed', status: 'published', views: 9800, rating: 4.5, createdAt: '2026-09-28' },
  { id: 'C-3008', title: 'Suspicious Content Pack', type: 'flashcard', creator: 'Diego Ramirez', status: 'removed', views: 340, rating: 1.1, createdAt: '2026-08-15' },
  { id: 'C-3009', title: 'French Grammar Essentials', type: 'study_guide', creator: 'Sofia Rossi', status: 'published', views: 7100, rating: 4.3, createdAt: '2026-08-30' },
  { id: 'C-3010', title: 'Python Basics — Variables & Loops', type: 'flashcard', creator: 'Ethan Lee', status: 'pending_review', views: 0, rating: 0, createdAt: '2026-10-11' },
];

export const reports: Report[] = [
  { id: 'RPT-4001', reporter: 'Emma Wilson', target: 'Organic Chemistry Reactions', targetType: 'study_set', reason: 'Copyright infringement', status: 'reviewing', createdAt: '2026-10-13 08:00' },
  { id: 'RPT-4002', reporter: 'Noah Garcia', target: 'U-1004 (Diego Ramirez)', targetType: 'user', reason: 'Spam flashcards with ads', status: 'actioned', createdAt: '2026-10-12 15:30' },
  { id: 'RPT-4003', reporter: 'Sarah Chen', target: 'Suspicious Content Pack', targetType: 'study_set', reason: 'Inappropriate content', status: 'actioned', createdAt: '2026-10-10 09:15' },
  { id: 'RPT-4004', reporter: 'Aisha Patel', target: 'Comment on Spanish Ch.5', targetType: 'comment', reason: 'Harassment', status: 'reviewing', createdAt: '2026-10-13 07:45' },
  { id: 'RPT-4005', reporter: 'Yuki Tanaka', target: 'U-1008 (Olivia Brown)', targetType: 'user', reason: 'Cheating — sharing test answers', status: 'dismissed', createdAt: '2026-10-08 14:00' },
];

export const auditLogs: AuditLog[] = [
  { id: 'AL-9001', actor: 'admin@quizlet.app', action: 'Banned user U-1008', target: 'Olivia Brown', ip: '10.0.1.24', timestamp: '2026-10-13 09:30:12', severity: 'critical' },
  { id: 'AL-9002', actor: 'admin@quizlet.app', action: 'Suspended user U-1004', target: 'Diego Ramirez', ip: '10.0.1.24', timestamp: '2026-10-12 16:45:08', severity: 'warning' },
  { id: 'AL-9003', actor: 'support@quizlet.app', action: 'Resolved ticket TK-505', target: 'Audio pronunciation', ip: '10.0.1.30', timestamp: '2026-10-09 18:20:33', severity: 'info' },
  { id: 'AL-9004', actor: 'admin@quizlet.app', action: 'Removed content C-3008', target: 'Suspicious Content Pack', ip: '10.0.1.24', timestamp: '2026-10-10 10:15:00', severity: 'warning' },
  { id: 'AL-9005', actor: 'system', action: 'Payment retry failed for SUB-2002', target: 'Marcus Johnson', ip: 'internal', timestamp: '2026-10-12 03:00:00', severity: 'critical' },
  { id: 'AL-9006', actor: 'support@quizlet.app', action: 'Refund issued for TK-507', target: 'Sofia Rossi', ip: '10.0.1.30', timestamp: '2026-10-07 14:30:45', severity: 'info' },
  { id: 'AL-9007', actor: 'admin@quizlet.app', action: 'Updated notification settings', target: 'Global config', ip: '10.0.1.24', timestamp: '2026-10-11 11:00:22', severity: 'info' },
  { id: 'AL-9008', actor: 'system', action: 'Scheduled maintenance for SVC-8', target: 'Notification Queue', ip: 'internal', timestamp: '2026-10-13 02:00:00', severity: 'warning' },
];

export const notifications: Notification[] = [
  { id: 'N-7001', title: 'New Feature: AI Study Assistant', message: 'We just launched AI-powered study recommendations!', type: 'success', channel: 'email', sentAt: '2026-10-10 10:00', recipients: 125000, openRate: 42.5 },
  { id: 'N-7002', title: 'Scheduled Maintenance', message: 'Notification service will be down Oct 13 2-4 AM UTC', type: 'warning', channel: 'in_app', sentAt: '2026-10-12 18:00', recipients: 125000, openRate: 38.2 },
  { id: 'N-7003', title: 'Your Plus trial expires soon', message: 'Upgrade to Pro for unlimited features', type: 'info', channel: 'push', sentAt: '2026-10-11 08:00', recipients: 3200, openRate: 55.1 },
  { id: 'N-7004', title: 'Payment Failed', message: 'Your subscription payment could not be processed', type: 'error', channel: 'email', sentAt: '2026-10-12 03:15', recipients: 87, openRate: 68.9 },
  { id: 'N-7005', title: 'Weekly Study Streak', message: 'You\'ve studied 7 days in a row. Keep it up!', type: 'success', channel: 'push', sentAt: '2026-10-13 06:00', recipients: 45000, openRate: 61.3 },
];

export const userGrowthData: ChartPoint[] = [
  { label: 'Apr', value: 82000 },
  { label: 'May', value: 88500 },
  { label: 'Jun', value: 94200 },
  { label: 'Jul', value: 101800 },
  { label: 'Aug', value: 108300 },
  { label: 'Sep', value: 116900 },
  { label: 'Oct', value: 125000 },
];

export const revenueData: ChartPoint[] = [
  { label: 'Apr', value: 42100 },
  { label: 'May', value: 45800 },
  { label: 'Jun', value: 48200 },
  { label: 'Jul', value: 51900 },
  { label: 'Aug', value: 55300 },
  { label: 'Sep', value: 58700 },
  { label: 'Oct', value: 62400 },
];

export const studyActivityData: ChartPoint[] = [
  { label: 'Mon', value: 45 },
  { label: 'Tue', value: 52 },
  { label: 'Wed', value: 48 },
  { label: 'Thu', value: 61 },
  { label: 'Fri', value: 73 },
  { label: 'Sat', value: 82 },
  { label: 'Sun', value: 68 },
];

export const planDistribution: { label: string; value: number; color: string }[] = [
  { label: 'Free', value: 78, color: '#94a3b8' },
  { label: 'Plus', value: 14, color: '#2563eb' },
  { label: 'Pro', value: 6, color: '#0ea5e9' },
  { label: 'Teacher', value: 2, color: '#10b981' },
];

export const analyticsEvents: AnalyticsEvent[] = [
  { id: 'AE-1', event: 'Flashcard Created', category: 'engagement', count: 48230, trend: 12.5, uniqueUsers: 18200 },
  { id: 'AE-2', event: 'Study Session Started', category: 'learning', count: 95400, trend: 8.3, uniqueUsers: 42100 },
  { id: 'AE-3', event: 'Practice Test Completed', category: 'learning', count: 23100, trend: 15.2, uniqueUsers: 12400 },
  { id: 'AE-4', event: 'Subscription Upgraded', category: 'monetization', count: 1820, trend: 22.1, uniqueUsers: 1820 },
  { id: 'AE-5', event: 'Day 1 Retention', category: 'retention', count: 38400, trend: -2.1, uniqueUsers: 38400 },
  { id: 'AE-6', event: 'Day 7 Retention', category: 'retention', count: 22100, trend: 3.4, uniqueUsers: 22100 },
  { id: 'AE-7', event: 'Class Joined', category: 'engagement', count: 8200, trend: 18.7, uniqueUsers: 6400 },
  { id: 'AE-8', event: 'AI Assistant Query', category: 'engagement', count: 31200, trend: 45.3, uniqueUsers: 14800 },
];

export const learningProgressData: ChartPoint[] = [
  { label: 'Apr', value: 62 },
  { label: 'May', value: 65 },
  { label: 'Jun', value: 68 },
  { label: 'Jul', value: 71 },
  { label: 'Aug', value: 74 },
  { label: 'Sep', value: 78 },
  { label: 'Oct', value: 82 },
];

export const subjectPopularity: { label: string; value: number; color: string }[] = [
  { label: 'Languages', value: 32, color: '#2563eb' },
  { label: 'Science', value: 24, color: '#0ea5e9' },
  { label: 'Math', value: 18, color: '#10b981' },
  { label: 'History', value: 12, color: '#f59e0b' },
  { label: 'Arts', value: 8, color: '#ef4444' },
  { label: 'Other', value: 6, color: '#94a3b8' },
];

export const classes: ClassGroup[] = [
  { id: 'CLS-6001', name: 'AP Spanish 2026', teacher: 'Aisha Patel', students: 142, studySets: 28, subject: 'Languages', visibility: 'school', createdAt: '2026-08-15', active: true },
  { id: 'CLS-6002', name: 'Organic Chemistry 201', teacher: 'Noah Garcia', students: 89, studySets: 15, subject: 'Science', visibility: 'public', createdAt: '2026-09-01', active: true },
  { id: 'CLS-6003', name: 'Calculus AB — Period 3', teacher: 'Sarah Chen', students: 34, studySets: 12, subject: 'Math', visibility: 'private', createdAt: '2026-08-20', active: true },
  { id: 'CLS-6004', name: 'World History Survey', teacher: 'Emma Wilson', students: 210, studySets: 22, subject: 'History', visibility: 'public', createdAt: '2026-07-10', active: true },
  { id: 'CLS-6005', name: 'Japanese N3 Prep', teacher: 'Yuki Tanaka', students: 56, studySets: 18, subject: 'Languages', visibility: 'public', createdAt: '2026-06-05', active: true },
  { id: 'CLS-6006', name: 'SAT Prep Bootcamp', teacher: 'Zara Ahmed', students: 178, studySets: 31, subject: 'Test Prep', visibility: 'school', createdAt: '2026-09-15', active: true },
  { id: 'CLS-6007', name: 'Intro to Python', teacher: 'Ethan Lee', students: 67, studySets: 8, subject: 'Computer Science', visibility: 'public', createdAt: '2026-09-20', active: false },
  { id: 'CLS-6008', name: 'French A1 Beginners', teacher: 'Sofia Rossi', students: 45, studySets: 10, subject: 'Languages', visibility: 'private', createdAt: '2026-08-01', active: true },
];

export const transactions: Transaction[] = [
  { id: 'TX-8001', user: 'Sarah Chen', email: 'sarah.chen@email.com', description: 'Pro Plan — Monthly', amount: 9.99, type: 'payment', status: 'completed', method: 'Visa •• 4242', date: '2026-10-13 08:00' },
  { id: 'TX-8002', user: 'Marcus Johnson', email: 'marcus.j@email.com', description: 'Plus Plan — Monthly', amount: 5.99, type: 'payment', status: 'failed', method: 'Mastercard •• 5555', date: '2026-10-12 03:00' },
  { id: 'TX-8003', user: 'Aisha Patel', email: 'aisha.patel@email.com', description: 'Teacher Plan — Annual', amount: 35.99, type: 'payment', status: 'completed', method: 'Visa •• 1234', date: '2026-10-10 12:30' },
  { id: 'TX-8004', user: 'Sofia Rossi', email: 'sofia.rossi@email.com', description: 'Refund — Canceled subscription', amount: -5.99, type: 'refund', status: 'completed', method: 'Visa •• 7890', date: '2026-10-07 14:30' },
  { id: 'TX-8005', user: 'Emma Wilson', email: 'emma.wilson@email.com', description: 'Plus Plan — Annual', amount: 59.99, type: 'payment', status: 'completed', method: 'Amex •• 0001', date: '2026-10-05 09:15' },
  { id: 'TX-8006', user: 'Diego Ramirez', email: 'diego.ramirez@email.com', description: 'Chargeback — Unauthorized', amount: -5.99, type: 'chargeback', status: 'disputed', method: 'Visa •• 3333', date: '2026-10-03 16:45' },
  { id: 'TX-8007', user: 'Noah Garcia', email: 'noah.garcia@email.com', description: 'Teacher Plan — Annual', amount: 35.99, type: 'payment', status: 'completed', method: 'Mastercard •• 8800', date: '2026-10-01 11:00' },
  { id: 'TX-8008', user: 'Zara Ahmed', email: 'zara.ahmed@email.com', description: 'Plus Plan — Monthly', amount: 5.99, type: 'payment', status: 'completed', method: 'Visa •• 6776', date: '2026-09-26 08:20' },
  { id: 'TX-8009', user: 'Yuki Tanaka', email: 'yuki.tanaka@email.com', description: 'Pro Plan — Monthly (Trial)', amount: 0.00, type: 'payment', status: 'pending', method: 'Visa •• 9090', date: '2026-10-12 10:00' },
  { id: 'TX-8010', user: 'Ethan Lee', email: 'ethan.lee@email.com', description: 'Payout — Affiliate Referral', amount: -120.00, type: 'payout', status: 'completed', method: 'PayPal', date: '2026-10-02 15:00' },
];

export const roles: Role[] = [
  { id: 'R-1', name: 'Super Admin', description: 'Full access to all features and settings', members: 2, permissions: ['*'], color: '#dc2626', system: true },
  { id: 'R-2', name: 'Admin', description: 'Manage users, content, and operations', members: 5, permissions: ['users.*', 'content.*', 'tickets.*', 'reports.*', 'health.read'], color: '#2563eb', system: true },
  { id: 'R-3', name: 'Support Agent', description: 'Handle tickets and basic user management', members: 12, permissions: ['tickets.*', 'users.read', 'reports.read'], color: '#0ea5e9', system: false },
  { id: 'R-4', name: 'Content Moderator', description: 'Review and moderate user-generated content', members: 8, permissions: ['content.*', 'reports.*'], color: '#f59e0b', system: false },
  { id: 'R-5', name: 'Finance Manager', description: 'View financial reports and manage billing', members: 3, permissions: ['financials.*', 'subscriptions.*'], color: '#10b981', system: false },
  { id: 'R-6', name: 'Analyst', description: 'Read-only access to analytics and reports', members: 6, permissions: ['analytics.read', 'health.read'], color: '#8b5cf6', system: false },
];

export const allPermissions: { module: string; actions: string[] }[] = [
  { module: 'users', actions: ['read', 'create', 'update', 'delete', 'ban', 'export'] },
  { module: 'content', actions: ['read', 'review', 'approve', 'remove', 'feature'] },
  { module: 'tickets', actions: ['read', 'assign', 'resolve', 'close'] },
  { module: 'reports', actions: ['read', 'action', 'dismiss'] },
  { module: 'financials', actions: ['read', 'refund', 'export'] },
  { module: 'subscriptions', actions: ['read', 'update', 'cancel'] },
  { module: 'analytics', actions: ['read', 'export'] },
  { module: 'health', actions: ['read', 'restart'] },
  { module: 'settings', actions: ['read', 'update'] },
  { module: 'notifications', actions: ['read', 'create', 'send'] },
];

export const featureFlags: FeatureFlag[] = [
  { id: 'FF-1', key: 'ai_study_assistant', name: 'AI Study Assistant', description: 'GPT-powered study recommendations and explanations', enabled: true, rollout: 100, environment: 'production', variants: ['control', 'treatment'], createdAt: '2026-08-01' },
  { id: 'FF-2', key: 'dark_mode_mobile', name: 'Dark Mode (Mobile)', description: 'Dark theme for mobile applications', enabled: true, rollout: 75, environment: 'production', variants: ['light', 'dark', 'auto'], createdAt: '2026-09-15' },
  { id: 'FF-3', key: 'collab_realtime', name: 'Real-time Collaboration', description: 'Live multi-user editing of study sets', enabled: false, rollout: 0, environment: 'staging', variants: ['off', 'on'], createdAt: '2026-10-01' },
  { id: 'FF-4', key: 'voice_flashcards', name: 'Voice Flashcards', description: 'Create flashcards by speaking', enabled: true, rollout: 50, environment: 'production', variants: ['control', 'voice'], createdAt: '2026-09-20' },
  { id: 'FF-5', key: 'gamification_v2', name: 'Gamification 2.0', description: 'Enhanced XP, badges, and leaderboard system', enabled: true, rollout: 100, environment: 'production', variants: ['v1', 'v2'], createdAt: '2026-07-10' },
  { id: 'FF-6', key: 'pdf_export_pro', name: 'PDF Export (Pro)', description: 'Export study sets to PDF — Pro only feature', enabled: true, rollout: 100, environment: 'production', variants: ['off', 'on'], createdAt: '2026-06-01' },
  { id: 'FF-7', key: 'new_onboarding', name: 'New Onboarding Flow', description: 'Redesigned sign-up and first-run experience', enabled: false, rollout: 10, environment: 'staging', variants: ['old', 'new'], createdAt: '2026-10-10' },
  { id: 'FF-8', key: 'class_marketplace', name: 'Class Marketplace', description: 'Browseable directory of public classes', enabled: true, rollout: 30, environment: 'production', variants: ['off', 'on'], createdAt: '2026-09-25' },
];

export const emailTemplates: EmailTemplate[] = [
  { id: 'ET-1', name: 'Welcome Email', subject: 'Welcome to Quizlet, {{name}}!', trigger: 'user.signup', status: 'active', sentCount: 125000, openRate: 68.2, lastEdited: '2026-09-01' },
  { id: 'ET-2', name: 'Trial Expiring', subject: 'Your free trial ends in 3 days', trigger: 'subscription.trial_expiring', status: 'active', sentCount: 3200, openRate: 55.1, lastEdited: '2026-08-15' },
  { id: 'ET-3', name: 'Payment Receipt', subject: 'Payment confirmation — ${{amount}}', trigger: 'payment.completed', status: 'active', sentCount: 89000, openRate: 72.4, lastEdited: '2026-07-20' },
  { id: 'ET-4', name: 'Payment Failed', subject: 'Action needed: Payment failed', trigger: 'payment.failed', status: 'active', sentCount: 1200, openRate: 78.9, lastEdited: '2026-08-10' },
  { id: 'ET-5', name: 'Weekly Study Report', subject: 'Your weekly study summary', trigger: 'schedule.weekly', status: 'active', sentCount: 450000, openRate: 48.3, lastEdited: '2026-09-28' },
  { id: 'ET-6', name: 'Password Reset', subject: 'Reset your password', trigger: 'auth.password_reset', status: 'active', sentCount: 5600, openRate: 85.2, lastEdited: '2026-06-01' },
  { id: 'ET-7', name: 'New Feature Announcement', subject: 'Introducing AI Study Assistant', trigger: 'manual.send', status: 'draft', sentCount: 0, openRate: 0, lastEdited: '2026-10-12' },
  { id: 'ET-8', name: 'Account Suspended', subject: 'Your account has been suspended', trigger: 'user.suspended', status: 'active', sentCount: 87, openRate: 91.5, lastEdited: '2026-05-15' },
];

export const achievements: Achievement[] = [
  { id: 'ACH-1', name: 'First Steps', description: 'Complete your first study session', icon: 'Footprints', tier: 'bronze', earners: 98400, xpReward: 50, active: true },
  { id: 'ACH-2', name: 'Streak Starter', description: 'Study 3 days in a row', icon: 'Flame', tier: 'bronze', earners: 71200, xpReward: 100, active: true },
  { id: 'ACH-3', name: 'Century Club', description: 'Complete 100 flashcards', icon: 'Trophy', tier: 'silver', earners: 45800, xpReward: 250, active: true },
  { id: 'ACH-4', name: 'Night Owl', description: 'Study after midnight 10 times', icon: 'Moon', tier: 'silver', earners: 23100, xpReward: 300, active: true },
  { id: 'ACH-5', name: 'Test Master', description: 'Score 90%+ on 10 practice tests', icon: 'Award', tier: 'gold', earners: 12400, xpReward: 500, active: true },
  { id: 'ACH-6', name: 'Social Learner', description: 'Join 5 classes', icon: 'Users', tier: 'gold', earners: 8900, xpReward: 500, active: true },
  { id: 'ACH-7', name: 'Streak Legend', description: 'Study 100 days in a row', icon: 'Zap', tier: 'platinum', earners: 2300, xpReward: 2000, active: true },
  { id: 'ACH-8', name: 'Polyglot', description: 'Study 5 different languages', icon: 'Languages', tier: 'platinum', earners: 1800, xpReward: 2000, active: true },
  { id: 'ACH-9', name: 'Quizlet Legend', description: 'Reach 10,000 XP', icon: 'Crown', tier: 'diamond', earners: 412, xpReward: 5000, active: true },
  { id: 'ACH-10', name: 'Content Creator', description: 'Create 50 study sets', icon: 'PenTool', tier: 'gold', earners: 6700, xpReward: 750, active: false },
];

export const feedback: Feedback[] = [
  { id: 'FB-1', user: 'Sarah Chen', email: 'sarah.chen@email.com', rating: 5, category: 'Feature Request', message: 'Would love to see spaced repetition scheduling built into flashcards. The current system is okay but could be smarter.', status: 'reviewed', createdAt: '2026-10-12 14:20' },
  { id: 'FB-2', user: 'Marcus Johnson', email: 'marcus.j@email.com', rating: 2, category: 'Bug', message: 'The mobile app crashes every time I try to export my study set. Using iPhone 15 Pro with latest iOS.', status: 'new', createdAt: '2026-10-13 09:00' },
  { id: 'FB-3', user: 'Aisha Patel', email: 'aisha.patel@email.com', rating: 5, category: 'Praise', message: 'The new class management feature is amazing! My students love it and engagement has gone up significantly.', status: 'implemented', createdAt: '2026-10-10 11:30' },
  { id: 'FB-4', user: 'Yuki Tanaka', email: 'yuki.tanaka@email.com', rating: 4, category: 'Feature Request', message: 'Please add support for right-to-left languages like Arabic and Hebrew in flashcards.', status: 'new', createdAt: '2026-10-13 06:15' },
  { id: 'FB-5', user: 'Emma Wilson', email: 'emma.wilson@email.com', rating: 3, category: 'UX', message: 'The dashboard feels cluttered on mobile. Would prefer a simpler layout with tabs.', status: 'reviewed', createdAt: '2026-10-11 18:45' },
  { id: 'FB-6', user: 'Noah Garcia', email: 'noah.garcia@email.com', rating: 5, category: 'Praise', message: 'AI Study Assistant is incredible. It explains concepts better than my textbook!', status: 'archived', createdAt: '2026-10-08 10:00' },
  { id: 'FB-7', user: 'Zara Ahmed', email: 'zara.ahmed@email.com', rating: 4, category: 'Feature Request', message: 'Would be great to have a timer for self-paced study sessions with Pomodoro mode.', status: 'new', createdAt: '2026-10-13 07:30' },
];

export const activityFeed: ActivityFeedItem[] = [
  { id: 'AF-1', type: 'user_join', message: 'Liam O\'Brien joined the platform from Ireland', timestamp: '2 min ago' },
  { id: 'AF-2', type: 'payment', message: 'Sarah Chen renewed Pro plan ($9.99)', timestamp: '15 min ago' },
  { id: 'AF-3', type: 'ticket', message: 'New urgent ticket: Account suspended without reason', timestamp: '32 min ago' },
  { id: 'AF-4', type: 'content', message: 'Aisha Patel published "Spanish Vocabulary — Chapter 6"', timestamp: '1 hour ago' },
  { id: 'AF-5', type: 'report', message: 'New report: Copyright infringement on study set', timestamp: '2 hours ago' },
  { id: 'AF-6', type: 'system', message: 'AI Study Assistant service went into major outage', timestamp: '3 hours ago' },
  { id: 'AF-7', type: 'user_join', message: '1,240 new users signed up today', timestamp: '5 hours ago' },
  { id: 'AF-8', type: 'payment', message: 'Marcus Johnson payment failed — retry scheduled', timestamp: '8 hours ago' },
];

export const churnData: ChartPoint[] = [
  { label: 'Apr', value: 4.2 },
  { label: 'May', value: 3.8 },
  { label: 'Jun', value: 3.5 },
  { label: 'Jul', value: 3.1 },
  { label: 'Aug', value: 2.9 },
  { label: 'Sep', value: 2.6 },
  { label: 'Oct', value: 2.4 },
];

export const geoDistribution: { country: string; users: number; flag: string }[] = [
  { country: 'United States', users: 38400, flag: 'US' },
  { country: 'United Kingdom', users: 12500, flag: 'UK' },
  { country: 'India', users: 18200, flag: 'IN' },
  { country: 'Japan', users: 9800, flag: 'JP' },
  { country: 'Brazil', users: 8600, flag: 'BR' },
  { country: 'Germany', users: 7200, flag: 'DE' },
  { country: 'Canada', users: 6400, flag: 'CA' },
  { country: 'Australia', users: 5100, flag: 'AU' },
];
