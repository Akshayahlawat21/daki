// ==============================================================================
// Mock Enterprise CRM Database & Analytics Initial Data
// ==============================================================================

export const initialAnalyticsData = {
  kpis: {
    closedQuarter: '18k',
    closedQuarterValue: '$18.4M',
    quarterTarget: '15k',
    quarterGrowth: '+18.2%',
    averageDealAge: '267',
    averageDealAgeUnit: 'days',
    dealAgeTrend: '-12 days vs LY',
    closedMonth: '7.8k',
    closedMonthValue: '$7.8M',
    monthGrowth: '+24.5%',
    completedActivities: '1.5k',
    activitiesGoal: '1.2k goal',
    activitiesGrowth: '+14%'
  },
  
  segments: [
    { id: 'smb', name: 'SMB', label: 'Small-Medium Business', count: 840, value: 3200000, color: '#00a4e4', percentage: 29 },
    { id: 'mm', name: 'MM', label: 'Mid-Market', count: 620, value: 4500000, color: '#00396b', percentage: 21 },
    { id: 'esmb', name: 'ESMB', label: 'Emerging SMB', count: 490, value: 1800000, color: '#2bd0d0', percentage: 17 },
    { id: 'comm', name: 'COMM', label: 'Commercial', count: 410, value: 3100000, color: '#48c3b5', percentage: 14 },
    { id: 'gb', name: 'GB', label: 'Growth Business', count: 310, value: 2900000, color: '#e6b800', percentage: 11 },
    { id: 'ent', name: 'ENT', label: 'Enterprise', count: 230, value: 5800000, color: '#e87b1c', percentage: 8 }
  ],
  
  monthlyComparison: [
    { year: '2024', target: 750, actual: 540, label: 'Target: $750k | Actual: $540k' },
    { year: '2025', target: 760, actual: 550, label: 'Target: $760k | Actual: $550k' },
    { year: '2026', target: 790, actual: 590, label: 'Target: $790k | Actual: $590k' }
  ],

  salesEvolution: [
    { date: 'October 2026', evolution: '+1,372', trend: 'up', amount: '$1.37M' },
    { date: 'November 2026', evolution: '+178', trend: 'up', amount: '$420K' },
    { date: 'August 2026', evolution: '+149', trend: 'up', amount: '$310K' },
    { date: 'March 2026', evolution: '+74', trend: 'up', amount: '$190K' },
    { date: 'July 2026', evolution: '+43', trend: 'up', amount: '$120K' },
    { date: 'February 2026', evolution: '+32', trend: 'up', amount: '$95K' },
    { date: 'June 2026', evolution: '+5', trend: 'up', amount: '$40K' },
    { date: 'April 2026', evolution: '-37', trend: 'down', amount: '-$80K' },
    { date: 'May 2026', evolution: '-59', trend: 'down', amount: '-$140K' }
  ]
};

export const initialAccounts = [
  { id: '1', name: 'Northern Trail Outfitters', industry: 'Retail & Apparel', website: 'https://nto-apparel.com', tier: 'Enterprise', annualRevenue: '$240M', status: 'active', contactsCount: 14, dealsCount: 3, totalDealValue: 480000, health: 'High' },
  { id: '2', name: 'Tech Horizon Inc', industry: 'Information Technology', website: 'https://techhorizon.io', tier: 'Enterprise', annualRevenue: '$180M', status: 'active', contactsCount: 8, dealsCount: 2, totalDealValue: 125000, health: 'High' },
  { id: '3', name: 'CyberCore Systems', industry: 'Cybersecurity', website: 'https://cybercore.net', tier: 'Mid-Market', annualRevenue: '$65M', status: 'active', contactsCount: 5, dealsCount: 1, totalDealValue: 120000, health: 'Medium' },
  { id: '4', name: 'CloudScale AI', industry: 'Artificial Intelligence', website: 'https://cloudscale.ai', tier: 'Growth Business', annualRevenue: '$32M', status: 'active', contactsCount: 4, dealsCount: 2, totalDealValue: 85000, health: 'High' },
  { id: '5', name: 'FinFlow Global', industry: 'Financial Services', website: 'https://finflow.co', tier: 'Commercial', annualRevenue: '$90M', status: 'active', contactsCount: 6, dealsCount: 1, totalDealValue: 210000, health: 'High' },
  { id: '6', name: 'Nexus Healthcare Tech', industry: 'Healthcare Tech', website: 'https://nexushealth.com', tier: 'Mid-Market', annualRevenue: '$45M', status: 'active', contactsCount: 3, dealsCount: 1, totalDealValue: 95000, health: 'Medium' }
];

export const initialOpportunities = [
  { id: '1', name: 'Northern Trail Global E-Commerce Overhaul', accountId: '1', accountName: 'Northern Trail Outfitters', amount: 350000, stage: 'Closing', probability: 90, closeDate: '2026-10-31', owner: 'Alex Johnson', segment: 'ENT' },
  { id: '2', name: 'Tech Horizon Enterprise Cloud Expansion', accountId: '2', accountName: 'Tech Horizon Inc', amount: 65000, stage: 'Closing', probability: 85, closeDate: '2026-11-15', owner: 'Sarah Miller', segment: 'SMB' },
  { id: '3', name: 'CyberCore Global Zero-Trust Migration', accountId: '3', accountName: 'CyberCore Systems', amount: 120000, stage: 'Negotiation', probability: 70, closeDate: '2026-11-30', owner: 'David Chen', segment: 'MM' },
  { id: '4', name: 'CloudScale AI 500-Seat Infrastructure', accountId: '4', accountName: 'CloudScale AI', amount: 45000, stage: 'Proposal', probability: 60, closeDate: '2026-12-10', owner: 'Alex Johnson', segment: 'GB' },
  { id: '5', name: 'FinFlow High-Volume Payment Gateway', accountId: '5', accountName: 'FinFlow Global', amount: 210000, stage: 'Qualification', probability: 40, closeDate: '2026-12-20', owner: 'Sarah Miller', segment: 'COMM' },
  { id: '6', name: 'Nexus Health HIPAA Compliant Vault', accountId: '6', accountName: 'Nexus Healthcare Tech', amount: 95000, stage: 'Prospecting', probability: 25, closeDate: '2027-01-15', owner: 'David Chen', segment: 'ESMB' },
  { id: '7', name: 'Northern Trail Mobile App Loyalty Journey', accountId: '1', accountName: 'Northern Trail Outfitters', amount: 130000, stage: 'Closed Won', probability: 100, closeDate: '2026-10-04', owner: 'Alex Johnson', segment: 'ENT' }
];

export const initialLeads = [
  { id: '1', name: 'Emily Davis', email: 'emily@techhorizon.io', company: 'Tech Horizon Inc', phone: '+1-555-0199', industry: 'SaaS / Cloud', score: 94, status: 'qualified', source: 'Inbound Web Form', signals: 'Viewed Enterprise Pricing 4x', created_at: '2026-10-06' },
  { id: '2', name: 'David Smith', email: 'david.smith@cybercore.net', company: 'CyberCore Systems', phone: '+1-555-0244', industry: 'Cybersecurity', score: 91, status: 'qualified', source: 'LinkedIn Inbound', signals: 'Downloaded Whitepaper', created_at: '2026-10-05' },
  { id: '3', name: 'Marcus Vance', email: 'marcus.v@northerntrail.com', company: 'Northern Trail Outfitters', phone: '+1-555-0811', industry: 'Retail Tech', score: 88, status: 'contacted', source: 'Dreamforce Wave Session', signals: 'Requested Executive Demo', created_at: '2026-10-05' },
  { id: '4', name: 'Sarah Miller', email: 'sarah.m@cloudscale.ai', company: 'CloudScale AI', phone: '+1-555-0377', industry: 'Artificial Intelligence', score: 79, status: 'contacted', source: 'TechCrunch Summit', signals: 'Attended Keynote', created_at: '2026-10-04' },
  { id: '5', name: 'Alex Johnson', email: 'alex.j@finflow.co', company: 'FinFlow Global', phone: '+1-555-0411', industry: 'Fintech', score: 68, status: 'new', source: 'Partner Referral', signals: 'New Signup', created_at: '2026-10-03' },
  { id: '6', name: 'Elena Rostova', email: 'elena@vortexrobotics.com', company: 'Vortex Robotics', phone: '+1-555-0722', industry: 'Industrial IoT', score: 72, status: 'new', source: 'Organic Search', signals: 'API Doc Reader', created_at: '2026-10-02' }
];

export const initialContacts = [
  { id: '1', firstName: 'Emily', lastName: 'Davis', title: 'VP of Engineering', email: 'emily@techhorizon.io', phone: '+1-555-0199', accountName: 'Tech Horizon Inc', department: 'Engineering', isKeyDecisionMaker: true },
  { id: '2', firstName: 'David', lastName: 'Smith', title: 'Chief Technology Officer', email: 'david.smith@cybercore.net', phone: '+1-555-0244', accountName: 'CyberCore Systems', department: 'Executive', isKeyDecisionMaker: true },
  { id: '3', firstName: 'Marcus', lastName: 'Vance', title: 'Head of Digital Channels', email: 'marcus.v@northerntrail.com', phone: '+1-555-0811', accountName: 'Northern Trail Outfitters', department: 'E-Commerce', isKeyDecisionMaker: true },
  { id: '4', firstName: 'Sarah', lastName: 'Miller', title: 'Director of Product', email: 'sarah.m@cloudscale.ai', phone: '+1-555-0377', accountName: 'CloudScale AI', department: 'Product', isKeyDecisionMaker: false },
  { id: '5', firstName: 'James', lastName: 'Wilson', title: 'Chief Information Officer', email: 'jwilson@finflow.co', phone: '+1-555-0422', accountName: 'FinFlow Global', department: 'Executive', isKeyDecisionMaker: true }
];

export const initialInvoices = [
  { id: '1', invoiceNumber: 'INV-2026-108', accountName: 'Northern Trail Outfitters', issueDate: '2026-10-01', dueDate: '2026-10-31', amount: 130000, status: 'paid', paymentMethod: 'ACH Direct' },
  { id: '2', invoiceNumber: 'INV-2026-109', accountName: 'Tech Horizon Inc', issueDate: '2026-10-06', dueDate: '2026-11-06', amount: 65000, status: 'issued', paymentMethod: 'Net-30 Wire' },
  { id: '3', invoiceNumber: 'INV-2026-110', accountName: 'CyberCore Systems', issueDate: '2026-10-04', dueDate: '2026-11-04', amount: 120000, status: 'pending', paymentMethod: 'Net-30 Wire' },
  { id: '4', invoiceNumber: 'INV-2026-105', accountName: 'CloudScale AI', issueDate: '2026-09-15', dueDate: '2026-10-15', amount: 45000, status: 'paid', paymentMethod: 'Credit Card' }
];

export const initialSalesReps = [
  { id: '1', name: 'Alex Johnson', role: 'Enterprise Account Exec', quota: 1200000, achieved: 1040000, percentage: 86.6, dealsWon: 14, winRate: '68%' },
  { id: '2', name: 'Sarah Miller', role: 'Senior Strategic AE', quota: 1000000, achieved: 920000, percentage: 92.0, dealsWon: 12, winRate: '75%' },
  { id: '3', name: 'David Chen', role: 'Commercial Sales Lead', quota: 850000, achieved: 680000, percentage: 80.0, dealsWon: 18, winRate: '62%' },
  { id: '4', name: 'Jessica Taylor', role: 'Mid-Market Account Exec', quota: 700000, achieved: 590000, percentage: 84.2, dealsWon: 15, winRate: '65%' }
];

export const mobileJourneys = [
  { id: '1', title: 'Loyal Customer Journey', version: 'V2', date: '10/20/26', totalEntries: 6477, goal: '40%', metGoal: '49.92%', status: 'Running', color: '#10b981' },
  { id: '2', title: 'Post Purchase Upsell', version: 'V1', date: '11/18/26', totalEntries: 12413, goal: '30%', metGoal: '39.46%', status: 'Running', color: '#10b981' },
  { id: '3', title: 'Re-Engagement Campaign', version: 'V1', date: '01/07/27', totalEntries: 1219, goal: '40%', metGoal: '45.86%', status: 'Running', color: '#10b981' }
];
