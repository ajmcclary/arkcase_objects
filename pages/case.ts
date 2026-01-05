/**
 * Case page generator.
 * Generates the content for Case.html (Case object wireframes).
 * @module pages/case
 */

import { html, raw, joinHtml } from '../src/utils/html';
import { SmallCard } from '../src/components/cards/SmallCard';
import { MediumCard } from '../src/components/cards/MediumCard';
import { LargeCard } from '../src/components/cards/LargeCard';
import { CardComparison } from '../src/components/ui/CardComparison';
import { StatusVariantCard } from '../src/components/ui/StatusVariantCard';
import { InteractionStateCard } from '../src/components/ui/InteractionStateCard';
import { SidebarDemo } from '../src/components/ui/SidebarDemo';
import { FilterPanel, FilterToggleButton } from '../src/components/ui/FilterPanel';
import { SectionHeader } from '../src/components/ui/SectionHeader';
import { SectionGroupHeader } from '../src/components/ui/SectionGroupHeader';
import type { Status, ColorScheme } from '../src/types';

// =============================================================================
// DATA DEFINITIONS
// =============================================================================

/**
 * Sample case data for small cards.
 */
const SMALL_CARD_DATA = [
  {
    title: 'Employee Misconduct Investigation',
    objectId: 'CASE-2024-0847',
    status: 'active' as Status,
    dueDate: 'Jan 28',
    assignee: 'J. Smith',
  },
  {
    title: 'Workplace Safety Complaint',
    objectId: 'CASE-2024-0846',
    status: 'pending' as Status,
    dueDate: 'Feb 5',
    assignee: 'M. Johnson',
  },
  {
    title: 'Discrimination Claim Review',
    objectId: 'CASE-2024-0845',
    status: 'in-review' as Status,
    dueDate: 'Jan 20',
    isOverdue: true,
    assignee: 'R. Williams',
  },
  {
    title: 'Contract Dispute Resolution',
    objectId: 'CASE-2024-0844',
    status: 'closed' as Status,
    dueDate: 'Jan 15',
    assignee: 'A. Brown',
  },
  {
    title: 'Vendor Compliance Audit',
    objectId: 'CASE-2024-0843',
    status: 'active' as Status,
    dueDate: 'Feb 10',
    assignee: 'C. Davis',
  },
  {
    title: 'Data Privacy Incident',
    objectId: 'CASE-2024-0842',
    status: 'urgent' as Status,
    dueDate: 'Jan 18',
    isOverdue: true,
    assignee: 'P. Miller',
  },
];

/**
 * Sample case data for medium cards.
 */
const MEDIUM_CARD_DATA = [
  {
    title: 'Employee Misconduct Investigation',
    objectId: 'CASE-2024-0847',
    status: 'active' as Status,
    priority: 'high' as const,
    showPriorityIcon: true,
    metadata: [
      { label: 'Priority', value: 'High' },
      { label: 'Queue', value: 'Investigations' },
      { label: 'Created', value: 'Dec 15, 2024' },
      { label: 'Due Date', value: 'Jan 28, 2025' },
    ],
    assignees: [
      { alt: 'John Smith', initials: 'JS', color: 'blue' as ColorScheme },
      { alt: 'Mary Johnson', initials: 'MJ', color: 'green' as ColorScheme },
      { alt: 'Robert Williams', initials: 'RW', color: 'purple' as ColorScheme },
    ],
    actionLabel: 'Open Case',
  },
  {
    title: 'Workplace Safety Complaint',
    objectId: 'CASE-2024-0846',
    status: 'pending' as Status,
    priority: 'medium' as const,
    metadata: [
      { label: 'Priority', value: 'Medium' },
      { label: 'Queue', value: 'Safety' },
      { label: 'Created', value: 'Dec 18, 2024' },
      { label: 'Due Date', value: 'Feb 5, 2025' },
    ],
    assignees: [
      { alt: 'Alice Brown', initials: 'AB', color: 'amber' as ColorScheme },
    ],
    actionLabel: 'Open Case',
  },
  {
    title: 'Discrimination Claim Review',
    objectId: 'CASE-2024-0845',
    status: 'in-review' as Status,
    priority: 'high' as const,
    showPriorityIcon: true,
    metadata: [
      { label: 'Priority', value: 'High' },
      { label: 'Queue', value: 'HR Review' },
      { label: 'Created', value: 'Dec 10, 2024' },
      { label: 'Due Date', value: 'Jan 20, 2025', highlight: 'danger' as const },
    ],
    assignees: [
      { alt: 'Chris Davis', initials: 'CD', color: 'cyan' as ColorScheme },
      { alt: 'Pat Miller', initials: 'PM', color: 'pink' as ColorScheme },
    ],
    actionLabel: 'Open Case',
  },
  {
    title: 'Contract Dispute Resolution',
    objectId: 'CASE-2024-0844',
    status: 'closed' as Status,
    priority: 'low' as const,
    metadata: [
      { label: 'Priority', value: 'Low' },
      { label: 'Queue', value: 'Legal' },
      { label: 'Created', value: 'Nov 20, 2024' },
      { label: 'Closed', value: 'Jan 15, 2025' },
    ],
    assignees: [
      { alt: 'Sam Wilson', initials: 'SW', color: 'slate' as ColorScheme },
    ],
    actionLabel: 'View Case',
  },
];

/**
 * Sample case data for large cards.
 */
const LARGE_CARD_DATA = [
  {
    title: 'Employee Misconduct Investigation',
    objectId: 'CASE-2024-0847',
    objectType: 'Case File',
    status: 'active' as Status,
    priority: 'high' as const,
    showPriorityIcon: true,
    description: 'Investigation into reported misconduct by an employee in the finance department. The case involves allegations of policy violations and requires thorough documentation and witness interviews.',
    metadata: [
      { label: 'Priority', value: 'High' },
      { label: 'Queue', value: 'Investigations' },
      { label: 'Case Type', value: 'HR Investigation' },
      { label: 'Created', value: 'Dec 15, 2024' },
      { label: 'Due Date', value: 'Jan 28, 2025' },
      { label: 'Responsible Org', value: 'Human Resources' },
    ],
    participants: [
      { name: 'John Smith', role: 'Senior Investigator', participantType: 'Lead', avatar: { alt: 'John Smith', initials: 'JS', color: 'blue' as ColorScheme } },
      { name: 'Mary Johnson', role: 'HR Manager', participantType: 'Reviewer', avatar: { alt: 'Mary Johnson', initials: 'MJ', color: 'green' as ColorScheme } },
      { name: 'Robert Williams', role: 'Legal Counsel', participantType: 'Advisor', avatar: { alt: 'Robert Williams', initials: 'RW', color: 'purple' as ColorScheme } },
      { name: 'Alice Brown', role: 'Witness Coordinator', participantType: 'Support', avatar: { alt: 'Alice Brown', initials: 'AB', color: 'amber' as ColorScheme } },
    ],
    relatedObjects: [
      { label: 'Documents', count: 12, icon: 'fa-file-alt', color: 'blue' as ColorScheme },
      { label: 'Tasks', count: 5, icon: 'fa-clipboard-check', color: 'orange' as ColorScheme },
      { label: 'Notes', count: 24, icon: 'fa-comment', color: 'purple' as ColorScheme },
      { label: 'Links', count: 5, icon: 'fa-link', color: 'orange' as ColorScheme },
    ],
    activities: [
      { title: 'Status changed to "Under Review"', user: 'Michael Chen', userInitials: 'MC', timestamp: '2 hours ago', icon: 'fa-circle', iconColor: 'green' as ColorScheme },
      { title: 'Comment added', description: 'Initial review completed. Scheduling witness interviews...', user: 'Sarah Williams', userInitials: 'SW', timestamp: '4 hours ago', icon: 'fa-comment', iconColor: 'blue' as ColorScheme },
      { title: 'Document uploaded', description: 'Policy_Handbook_v2.pdf', user: 'John Smith', userInitials: 'JS', timestamp: 'Yesterday', icon: 'fa-file', iconColor: 'purple' as ColorScheme },
      { title: 'Task assigned', description: 'Review submitted documentation', user: 'Mary Johnson', userInitials: 'MJ', timestamp: '2 days ago', icon: 'fa-clipboard-check', iconColor: 'orange' as ColorScheme },
    ],
    actions: [
      { label: 'Save', variant: 'primary' as const },
      { label: 'Cancel', variant: 'secondary' as const },
      { label: 'Delete', variant: 'danger' as const },
    ],
  },
  {
    title: 'Workplace Safety Compliance Audit',
    objectId: 'CASE-2024-0846',
    objectType: 'Case File',
    status: 'in-review' as Status,
    priority: 'medium' as const,
    showPriorityIcon: false,
    description: 'Comprehensive safety audit following reported incident in warehouse facility. Reviewing compliance with OSHA regulations and internal safety protocols. Requires facility inspection and employee interviews.',
    metadata: [
      { label: 'Priority', value: 'Medium' },
      { label: 'Queue', value: 'Safety Compliance' },
      { label: 'Case Type', value: 'Safety Audit' },
      { label: 'Created', value: 'Dec 18, 2024' },
      { label: 'Due Date', value: 'Feb 5, 2025' },
      { label: 'Responsible Org', value: 'Safety & Compliance' },
    ],
    participants: [
      { name: 'David Park', role: 'Safety Inspector', participantType: 'Lead', avatar: { alt: 'David Park', initials: 'DP', color: 'cyan' as ColorScheme } },
      { name: 'Lisa Chen', role: 'Compliance Officer', participantType: 'Reviewer', avatar: { alt: 'Lisa Chen', initials: 'LC', color: 'pink' as ColorScheme } },
    ],
    relatedObjects: [
      { label: 'Documents', count: 8, icon: 'fa-file-alt', color: 'blue' as ColorScheme },
      { label: 'Tasks', count: 3, icon: 'fa-clipboard-check', color: 'orange' as ColorScheme },
      { label: 'Photos', count: 15, icon: 'fa-image', color: 'green' as ColorScheme },
      { label: 'Findings', count: 6, icon: 'fa-flag', color: 'red' as ColorScheme },
    ],
    activities: [
      { title: 'Inspection completed', user: 'David Park', userInitials: 'DP', timestamp: 'Yesterday', icon: 'fa-check', iconColor: 'green' as ColorScheme },
      { title: 'Photos uploaded', description: '15 photos from facility walkthrough', user: 'David Park', userInitials: 'DP', timestamp: '2 days ago', icon: 'fa-image', iconColor: 'blue' as ColorScheme },
      { title: 'Case created', user: 'Lisa Chen', userInitials: 'LC', timestamp: '5 days ago', icon: 'fa-plus', iconColor: 'gray' as ColorScheme },
    ],
    actions: [
      { label: 'Submit Findings', variant: 'primary' as const },
      { label: 'Request Extension', variant: 'secondary' as const },
    ],
  },
];

/**
 * Status variants configuration.
 */
const STATUS_VARIANTS = [
  {
    status: 'active' as Status,
    title: 'Case currently active',
    description: 'Case is being actively investigated with ongoing work',
  },
  {
    status: 'pending' as Status,
    title: 'Case awaiting action',
    description: 'Case requires input or is waiting on external factors',
  },
  {
    status: 'in-review' as Status,
    title: 'Case under review',
    description: 'Case documentation and findings being reviewed',
  },
  {
    status: 'on-hold' as Status,
    badgeIcon: 'fa-pause',
    title: 'Case temporarily paused',
    description: 'Work suspended pending resolution of blocking issues',
  },
  {
    status: 'overdue' as Status,
    title: 'Case past due date',
    description: 'Requires immediate attention and priority action',
  },
  {
    status: 'urgent' as Status,
    title: 'High priority case',
    description: 'Flagged for immediate attention due to severity',
  },
  {
    status: 'closed' as Status,
    badgeIcon: 'fa-check',
    title: 'Case successfully closed',
    description: 'All requirements met, investigation complete',
  },
  {
    status: 'cancelled' as Status,
    title: 'Case cancelled',
    description: 'Case terminated before completion',
  },
];

/**
 * Interaction states configuration.
 */
const INTERACTION_STATES = [
  {
    state: 'default' as const,
    label: 'Default',
    description: 'Standard card appearance with no user interaction',
  },
  {
    state: 'hover' as const,
    label: 'Hover',
    description: 'Background shifts, border darkens, shadow appears on mouse hover',
  },
  {
    state: 'selected' as const,
    label: 'Selected',
    description: 'Blue tint background with prominent blue border for active selection',
  },
  {
    state: 'focus' as const,
    label: 'Focus (Keyboard)',
    description: 'Visible focus ring for keyboard navigation (WCAG 2.4.7 compliant)',
  },
  {
    state: 'disabled' as const,
    label: 'Disabled',
    description: 'Reduced opacity with not-allowed cursor for unavailable items',
  },
  {
    state: 'loading' as const,
    label: 'Loading Skeleton',
    description: 'Animated placeholder while content loads asynchronously',
  },
];

// =============================================================================
// SECTION COMPONENTS
// =============================================================================

/**
 * Generates the page header section.
 */
function PageHeader(): string {
  return html`
    <section id="case-card-overview" class="bg-white border-b border-gray-200 py-12">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="max-w-5xl">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <i class="fa-solid fa-briefcase text-blue-600 text-xl"></i>
            </div>
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Case Cards</h1>
              <p class="text-gray-600 mt-1">Card components for Case business objects</p>
            </div>
          </div>
          <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <p class="text-sm text-gray-700 leading-relaxed">
              These cards represent Case objects within ArkCase workflows. Each variant emphasizes different aspects like status, priority, and assignments optimized for case lists, dashboards, and detail panels.
            </p>
          </div>
          <div class="flex flex-wrap gap-2 mt-6">
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              <i class="fa-solid fa-cube mr-1.5"></i>
              Core Object
            </span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
              <i class="fa-solid fa-layer-group mr-1.5"></i>
              3 Variants
            </span>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
              <i class="fa-solid fa-check mr-1.5"></i>
              Production Ready
            </span>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates the small cards section.
 */
function SmallCardsSection(): string {
  const cards = SMALL_CARD_DATA.map((data) =>
    SmallCard({
      ...data,
      icon: 'fa-briefcase',
      iconColor: 'blue',
    })
  );

  return html`
    <section id="small-cards-section" class="py-12 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        ${raw(SectionHeader({ title: 'Small Cards', description: 'Compact variant optimized for case lists, queues, and high-density views', variant: 'page' }))}

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${joinHtml(cards)}
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates the medium cards section.
 */
function MediumCardsSection(): string {
  const cards = MEDIUM_CARD_DATA.map((data) =>
    MediumCard({
      ...data,
      icon: 'fa-briefcase',
      iconColor: 'blue',
      objectType: 'Case File',
    })
  );

  return html`
    <section id="medium-cards-section" class="py-12 bg-white">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        ${raw(SectionHeader({ title: 'Medium Cards', description: 'Dashboard-style cards with expanded metadata and team assignments', variant: 'page' }))}

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          ${joinHtml(cards)}
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates the large cards section.
 */
function LargeCardsSection(): string {
  const cards = LARGE_CARD_DATA.map((data) =>
    LargeCard({
      ...data,
      icon: 'fa-briefcase',
      iconColor: 'blue',
    })
  );

  return html`
    <section id="large-cards-section" class="py-12 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        ${raw(SectionHeader({ title: 'Large Cards', description: 'Detailed cards with collapsible sections, participants, activity timeline, and full information display', variant: 'page' }))}

        <!-- Cards -->
        <div class="space-y-8">
          ${joinHtml(cards)}
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates the card comparison section.
 */
function ComparisonSection(): string {
  // Generate sample cards for comparison
  const smallCardSample = SmallCard({
    title: 'Verify case documentation',
    objectId: 'CASE-2024-0850',
    status: 'pending' as Status,
    dueDate: 'Dec 25',
    assignee: 'L. Park',
    icon: 'fa-briefcase',
    iconColor: 'blue',
  });

  const mediumCardSample = MediumCard({
    title: 'Verify case documentation completeness',
    objectId: 'CASE-2024-0850',
    status: 'pending' as Status,
    priority: 'medium' as const,
    icon: 'fa-briefcase',
    iconColor: 'blue',
    objectType: 'Case File',
    metadata: [
      { label: 'Due Date', value: 'Dec 25, 2024' },
      { label: 'Assignee', value: 'Lisa Park' },
    ],
    assignees: [
      { alt: 'Lisa Park', initials: 'LP', color: 'cyan' as ColorScheme },
    ],
    actionLabel: 'Open',
  });

  const largeCardSample = LargeCard({
    title: 'Verify case documentation completeness',
    objectId: 'CASE-2024-0850',
    objectType: 'Case File',
    status: 'pending' as Status,
    priority: 'medium' as const,
    description: 'Review all submitted case documents and ensure completeness before proceeding to the next workflow stage.',
    icon: 'fa-briefcase',
    iconColor: 'blue',
    metadata: [
      { label: 'Due Date', value: 'Dec 25, 2024' },
      { label: 'Assignee', value: 'Lisa Park' },
      { label: 'Queue', value: 'Documentation Review' },
    ],
    participants: [
      { name: 'Lisa Park', role: 'Reviewer', avatar: { alt: 'Lisa Park', initials: 'LP', color: 'cyan' as ColorScheme } },
    ],
    relatedObjects: [
      { label: 'Documents', count: 8, icon: 'fa-file-alt', color: 'blue' as ColorScheme },
    ],
  });

  const comparisonContent = CardComparison({
    title: 'Card Comparison',
    description: 'Visual comparison of Small, Medium, and Large card variants showing progressive information disclosure',
    variants: [
      {
        name: 'Small Card',
        useCase: 'Case Lists & Queues',
        content: smallCardSample,
        colSpan: 1,
      },
      {
        name: 'Medium Card',
        useCase: 'Dashboards & Lists',
        content: mediumCardSample,
        colSpan: 2,
      },
      {
        name: 'Large Card',
        useCase: 'Inspector Panels',
        content: largeCardSample,
        colSpan: 3,
      },
    ],
  });

  return html`
    <section id="comparison-section" class="py-12 bg-white">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        ${raw(comparisonContent)}

        <!-- Feature comparison boxes -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-gray-900 text-sm mb-3">Small Card Features</h4>
            <ul class="space-y-2 text-xs text-gray-700">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-0.5"></i>
                <span>Minimal height footprint</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-0.5"></i>
                <span>Essential information only</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-0.5"></i>
                <span>Rapid scanning optimized</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-0.5"></i>
                <span>High density views</span>
              </li>
            </ul>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-gray-900 text-sm mb-3">Medium Card Features</h4>
            <ul class="space-y-2 text-xs text-gray-700">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-0.5"></i>
                <span>Balanced context display</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-0.5"></i>
                <span>Metadata grid layout</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-0.5"></i>
                <span>Team member avatars</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-0.5"></i>
                <span>Primary action visible</span>
              </li>
            </ul>
          </div>
          <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 class="font-semibold text-gray-900 text-sm mb-3">Large Card Features</h4>
            <ul class="space-y-2 text-xs text-gray-700">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-0.5"></i>
                <span>Full description text</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-0.5"></i>
                <span>Collapsible sections</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-0.5"></i>
                <span>Participant list with roles</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-0.5"></i>
                <span>Related object counts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates the sidebar items section.
 */
function SidebarItemsSection(): string {
  const relatedCasesPanel = SidebarDemo({
    title: 'Related Cases',
    titleIcon: 'fa-briefcase',
    count: 5,
    items: [
      { label: 'Investigation #2024-0848', sublabel: 'Active', icon: 'fa-briefcase', iconColor: 'blue' },
      { label: 'Follow-up Review', sublabel: 'Pending', icon: 'fa-briefcase', iconColor: 'amber' },
      { label: 'Initial Assessment', sublabel: 'Completed', icon: 'fa-briefcase', iconColor: 'green', isCompleted: true },
    ],
    viewAllText: 'View all cases',
    description: 'Appears when viewing related objects, showing linked cases',
  });

  const caseBrowserPanel = SidebarDemo({
    title: 'Cases',
    titleIcon: 'fa-sitemap',
    items: [
      { label: 'By Status', sublabel: '', icon: 'fa-layer-group', iconColor: 'gray' },
      { label: 'Active (18)', sublabel: '', icon: 'fa-spinner', iconColor: 'blue' },
      { label: 'Pending (12)', sublabel: '', icon: 'fa-clock', iconColor: 'amber' },
      { label: 'Closed (45)', sublabel: '', icon: 'fa-check-circle', iconColor: 'gray' },
    ],
    showAddButton: false,
    viewAllText: 'Manage views',
    description: 'Tree navigation for browsing cases by status or category',
  });

  const recentCasesPanel = SidebarDemo({
    title: 'Recent Cases',
    titleIcon: 'fa-clock-rotate-left',
    count: 3,
    items: [
      { label: 'Misconduct Investigation', sublabel: '2 hours ago', icon: 'fa-briefcase', iconColor: 'blue' },
      { label: 'Safety Complaint', sublabel: 'Yesterday', icon: 'fa-briefcase', iconColor: 'blue' },
      { label: 'Contract Dispute', sublabel: '3 days ago', icon: 'fa-briefcase', iconColor: 'blue' },
    ],
    viewAllText: 'View history',
    showAddButton: false,
    description: 'Recently accessed cases for quick navigation',
  });

  const assignedCasesPanel = SidebarDemo({
    title: 'My Cases',
    titleIcon: 'fa-user-check',
    count: 8,
    items: [
      { label: 'Review Documentation', sublabel: 'Due Today', icon: 'fa-briefcase', iconColor: 'red' },
      { label: 'Interview Witness', sublabel: 'Due Tomorrow', icon: 'fa-briefcase', iconColor: 'amber' },
      { label: 'Final Report', sublabel: 'Due Jan 30', icon: 'fa-briefcase', iconColor: 'blue' },
    ],
    viewAllText: 'View all my cases',
    description: 'Cases assigned to the current user with due dates',
  });

  // Activity Timeline - custom HTML since it has a unique structure
  const activityTimelineHtml = html`
    <div class="bg-gray-100 rounded-lg p-4">
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm w-64">
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-clock-rotate-left text-blue-600 text-sm"></i>
            <span class="text-sm font-semibold text-gray-900">Case Activity</span>
          </div>
          <a href="#" class="text-xs text-blue-600 hover:text-blue-800 font-medium">View All</a>
        </div>
        <div class="p-3">
          <!-- Today Section -->
          <div class="flex items-center gap-2 mb-3">
            <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Today</span>
            <div class="flex-1 h-px bg-gray-200"></div>
          </div>

          <!-- Today Timeline Items -->
          <div class="relative pl-4 border-l-2 border-gray-200 space-y-4 ml-0.5">
            <!-- Status Change -->
            <div class="relative">
              <div class="absolute -left-[23px] w-5 h-5 bg-green-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <i class="fa-solid fa-circle text-green-600 text-[10px]"></i>
              </div>
              <div class="pl-2">
                <p class="text-sm font-medium text-gray-900">Status → Under Review</p>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <div class="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span class="text-[8px] font-bold text-indigo-600">SM</span>
                  </div>
                  <span class="text-xs text-gray-500">Sarah M. · 2:34 PM</span>
                </div>
              </div>
            </div>

            <!-- Comment Added -->
            <div class="relative">
              <div class="absolute -left-[23px] w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <i class="fa-solid fa-comment text-blue-600 text-[10px]"></i>
              </div>
              <div class="pl-2">
                <p class="text-sm font-medium text-gray-900">Comment added</p>
                <p class="text-xs text-gray-600 italic truncate">"Waiting for client docs..."</p>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <div class="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center">
                    <span class="text-[8px] font-bold text-orange-600">JD</span>
                  </div>
                  <span class="text-xs text-gray-500">John D. · 11:15 AM</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Yesterday Section -->
          <div class="flex items-center gap-2 mt-4 mb-3">
            <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wide">Yesterday</span>
            <div class="flex-1 h-px bg-gray-200"></div>
          </div>

          <!-- Yesterday Timeline Items -->
          <div class="relative pl-4 border-l-2 border-gray-200 space-y-4 ml-0.5">
            <!-- Document Uploaded -->
            <div class="relative">
              <div class="absolute -left-[23px] w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <i class="fa-solid fa-file text-amber-600 text-[10px]"></i>
              </div>
              <div class="pl-2">
                <p class="text-sm font-medium text-gray-900">Document uploaded</p>
                <p class="text-xs text-gray-600 truncate">contract_v2.pdf</p>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <div class="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span class="text-[8px] font-bold text-indigo-600">SM</span>
                  </div>
                  <span class="text-xs text-gray-500">Sarah M. · 4:22 PM</span>
                </div>
              </div>
            </div>

            <!-- Case Assigned -->
            <div class="relative">
              <div class="absolute -left-[23px] w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <i class="fa-solid fa-user text-purple-600 text-[10px]"></i>
              </div>
              <div class="pl-2">
                <p class="text-sm font-medium text-gray-900">Case assigned</p>
                <p class="text-xs text-gray-600">Unassigned → Sarah M.</p>
                <div class="flex items-center gap-1.5 mt-0.5">
                  <div class="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                    <i class="fa-solid fa-robot text-gray-500 text-[6px]"></i>
                  </div>
                  <span class="text-xs text-gray-500">System · 9:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // My Assigned Cases panel
  const myAssignedCasesHtml = html`
    <div class="bg-gray-100 rounded-lg p-4">
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm w-64">
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-user-check text-blue-600 text-sm"></i>
            <span class="text-sm font-semibold text-gray-900">My Cases</span>
          </div>
          <span class="bg-blue-100 text-blue-600 text-xs font-medium px-1.5 py-0.5 rounded">8</span>
        </div>
        <div class="p-2 space-y-1">
          <a href="#" class="flex items-center gap-2 px-3 py-2 rounded bg-red-50 border-l-2 border-red-500">
            <div class="w-6 h-6 bg-red-100 rounded flex items-center justify-center flex-shrink-0">
              <i class="fa-solid fa-folder-open text-red-600 text-xs"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900 truncate">Review Documentation</div>
              <div class="text-xs text-red-600 font-medium">Due Today</div>
            </div>
          </a>
          <a href="#" class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50 transition-colors">
            <div class="w-6 h-6 bg-amber-100 rounded flex items-center justify-center flex-shrink-0">
              <i class="fa-solid fa-folder-open text-amber-600 text-xs"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900 truncate">Interview Witness</div>
              <div class="text-xs text-amber-600">Due Tomorrow</div>
            </div>
          </a>
          <a href="#" class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50 transition-colors">
            <div class="w-6 h-6 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
              <i class="fa-solid fa-folder-open text-blue-600 text-xs"></i>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900 truncate">Final Report</div>
              <div class="text-xs text-gray-500">Due Jan 30</div>
            </div>
          </a>
        </div>
        <div class="px-4 py-2 border-t border-gray-100">
          <a href="#" class="text-xs text-blue-600 hover:text-blue-800 font-medium">View all my cases</a>
        </div>
      </div>
    </div>
  `;

  // Pinned Cases panel
  const pinnedCasesHtml = html`
    <div class="bg-gray-100 rounded-lg p-4">
      <div class="bg-white rounded-lg border border-gray-200 shadow-sm w-64">
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-thumbtack text-amber-500 text-sm"></i>
            <span class="text-sm font-semibold text-gray-900">Pinned Cases</span>
          </div>
          <a href="#" class="text-xs text-blue-600 hover:text-blue-800 font-medium">Manage</a>
        </div>
        <div class="p-2 space-y-1">
          <a href="#" class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50 transition-colors">
            <i class="fa-solid fa-thumbtack text-amber-500 text-xs"></i>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900 truncate">Quarterly Review</div>
              <div class="text-xs text-gray-500">CASE-2024-0801</div>
            </div>
          </a>
          <a href="#" class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50 transition-colors">
            <i class="fa-solid fa-thumbtack text-amber-500 text-xs"></i>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900 truncate">Annual Compliance</div>
              <div class="text-xs text-gray-500">CASE-2024-0755</div>
            </div>
          </a>
          <a href="#" class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50 transition-colors">
            <i class="fa-solid fa-thumbtack text-amber-500 text-xs"></i>
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900 truncate">Priority Investigation</div>
              <div class="text-xs text-gray-500">CASE-2024-0820</div>
            </div>
          </a>
        </div>
        <div class="px-4 py-2 border-t border-gray-100">
          <button class="text-xs text-gray-500 hover:text-gray-700 font-medium flex items-center gap-1">
            <i class="fa-solid fa-plus text-[10px]"></i>
            Pin current case
          </button>
        </div>
      </div>
    </div>
  `;

  return html`
    <section id="sidebar-items-section" class="py-12 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        ${raw(SectionHeader({ title: 'Sidebar Items', description: 'How Case objects appear in various sidebar contexts throughout the application', variant: 'page' }))}

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Related Cases Panel</h3>
            ${raw(relatedCasesPanel)}
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Navigation Tree Item</h3>
            ${raw(caseBrowserPanel)}
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Access List</h3>
            ${raw(recentCasesPanel)}
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">My Assigned Cases</h3>
            ${raw(myAssignedCasesHtml)}
            <p class="text-xs text-gray-500 mt-3">Cases assigned to current user with due date highlighting</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Pinned Cases</h3>
            ${raw(pinnedCasesHtml)}
            <p class="text-xs text-gray-500 mt-3">User-pinned cases for quick access across sessions</p>
          </div>
          <div>
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
            ${raw(activityTimelineHtml)}
            <p class="text-xs text-gray-500 mt-3">Chronological activity feed showing status changes, comments, uploads, and assignments</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates the status variants section.
 */
function StatusVariantsSection(): string {
  const statusCards = STATUS_VARIANTS.map((variant) =>
    StatusVariantCard({
      ...variant,
      objectIcon: 'fa-briefcase',
    })
  );

  return html`
    <section id="status-variants-section" class="py-12 bg-white">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        ${raw(SectionHeader({ title: 'Status Variations', description: 'Comprehensive display of all case status states and their visual representations', variant: 'page' }))}

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          ${joinHtml(statusCards)}
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates the interaction states section.
 */
function InteractionStatesSection(): string {
  const stateCards = INTERACTION_STATES.map((state) =>
    InteractionStateCard({
      ...state,
      title: 'Review Case Documents',
      objectId: 'CASE-2024-0847',
      status: 'In Progress',
      icon: 'fa-briefcase',
      iconColor: 'blue',
    })
  );

  return html`
    <section id="interaction-states-section" class="py-12 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        ${raw(SectionHeader({ title: 'Interaction States', description: 'Visual reference for case card interaction states across the design system', variant: 'page' }))}

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${joinHtml(stateCards)}
        </div>
      </div>
    </section>
  `;
}


/**
 * Generates the dashboard view with filter panel section.
 */
function DashboardViewSection(): string {
  const filterPanelContent = FilterPanel({
    filterGroups: [
      {
        title: 'Status',
        options: [
          { label: 'Active', value: 'active', count: 24, isChecked: true },
          { label: 'Pending', value: 'pending', count: 8, isChecked: true },
          { label: 'In Review', value: 'in-review', count: 5 },
          { label: 'Closed', value: 'closed', count: 142 },
        ],
      },
      {
        title: 'Priority',
        options: [
          { label: 'Urgent', value: 'urgent', count: 3, isChecked: true, color: 'red' },
          { label: 'High', value: 'high', count: 12, isChecked: true },
          { label: 'Normal', value: 'normal', count: 18 },
        ],
      },
    ],
    sortOptions: [
      { label: 'Sort by Due Date', value: 'due-date', isSelected: true },
      { label: 'Sort by Created', value: 'created' },
      { label: 'Sort by Priority', value: 'priority' },
      { label: 'Sort by Title', value: 'title' },
    ],
    showClearAll: true,
    activeFilterCount: 4,
  });

  // Sample cards for the dashboard grid
  const dashboardCards = [
    { title: 'Employee Misconduct Investigation', id: 'CASE-2024-0847', status: 'Active', dueDate: 'Jan 28', assignee: 'J. Smith' },
    { title: 'Workplace Safety Complaint', id: 'CASE-2024-0846', status: 'Pending', dueDate: 'Feb 5', assignee: 'M. Johnson' },
    { title: 'Discrimination Claim Review', id: 'CASE-2024-0845', status: 'In Review', dueDate: 'Jan 20', assignee: 'R. Williams' },
    { title: 'Contract Dispute Resolution', id: 'CASE-2024-0844', status: 'Closed', dueDate: 'Jan 15', assignee: 'A. Brown' },
  ];

  const statusColors: Record<string, string> = {
    'Active': 'bg-green-100 text-green-700',
    'Pending': 'bg-amber-100 text-amber-700',
    'In Review': 'bg-blue-100 text-blue-700',
    'Closed': 'bg-gray-100 text-gray-700',
  };

  const cardsHtml = dashboardCards.map((card) => html`
    <div class="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
            <i class="fa-solid fa-folder-open text-blue-600 text-sm"></i>
          </div>
          <span class="text-xs text-gray-500 font-medium">${card.id}</span>
        </div>
        <span class="px-2 py-0.5 rounded text-xs font-medium ${statusColors[card.status]}">${card.status}</span>
      </div>
      <h4 class="text-sm font-semibold text-gray-900 mb-2">${card.title}</h4>
      <div class="flex items-center justify-between text-xs text-gray-500">
        <span><i class="fa-regular fa-calendar mr-1"></i>Due ${card.dueDate}</span>
        <span><i class="fa-regular fa-user mr-1"></i>${card.assignee}</span>
      </div>
    </div>
  `);

  return html`
    <section id="dashboard-view-section" class="py-12 bg-white">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        ${raw(SectionHeader({ title: 'Dashboard View with Filters', description: 'Case cards in a filterable dashboard layout with sidebar filters', variant: 'page' }))}

        <!-- Mobile Filter Toggle -->
        ${raw(FilterToggleButton({ activeCount: 4 }))}

        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
          <!-- Filter Sidebar -->
          <div id="filter-panel" class="hidden md:block col-span-1 md:col-span-3" aria-hidden="true">
            ${raw(filterPanelContent)}
          </div>

          <!-- Cases Grid -->
          <div class="col-span-1 md:col-span-9">
            <div class="mb-4 flex items-center justify-between">
              <div class="text-sm text-gray-600">
                Showing <span class="font-semibold">32</span> cases
              </div>
              <div class="flex items-center gap-2">
                <select class="text-sm border border-gray-300 rounded px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Sort by Due Date</option>
                  <option>Sort by Created</option>
                  <option>Sort by Priority</option>
                  <option>Sort by Title</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${joinHtml(cardsHtml)}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates the Dashboard Widgets section.
 * Shows My Cases, Overdue Cases, and Summary Statistics widgets.
 */
function DashboardWidgetsSection(): string {
  // My Cases Widget Data
  const myCasesData = [
    { title: 'Employee Misconduct Investigation', id: 'CASE-2024-0847', status: 'Active', statusColor: 'green', dueDate: 'Due Jan 28' },
    { title: 'Data Breach Incident Response', id: 'CASE-2024-0843', status: 'Urgent', statusColor: 'red', dueDate: 'Due Today', dueDateColor: 'red' },
    { title: 'Contract Dispute Resolution', id: 'CASE-2024-0845', status: 'In Review', statusColor: 'blue', dueDate: 'Due Feb 2' },
  ];

  // Overdue Cases Data
  const overdueCasesData = [
    { title: 'Workplace Safety Violation Review', id: 'CASE-2024-0846', assignee: 'Assigned to you', overdueDays: '3 days overdue', originalDue: 'Was due Jan 19', isLarge: true },
    { title: 'Compliance Audit Follow-up', id: 'CASE-2024-0839', assignee: 'Legal Team', overdueDays: '7 days overdue', originalDue: 'Was due Jan 15' },
  ];

  const myCasesItemsHtml = myCasesData.map((item) => html`
    <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
      <div class="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
        <i class="fa-solid fa-folder-open text-blue-600 text-sm"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-medium text-gray-900 truncate">${item.title}</div>
        <div class="text-xs text-gray-500">${item.id}</div>
      </div>
      <div class="flex flex-col items-end gap-1">
        <span class="px-2 py-0.5 rounded text-xs font-medium bg-${item.statusColor}-100 text-${item.statusColor}-700">${item.status}</span>
        <span class="text-xs ${item.dueDateColor === 'red' ? 'text-red-600 font-medium' : 'text-gray-500'}">${item.dueDate}</span>
      </div>
    </div>
  `);

  const overdueCasesItemsHtml = overdueCasesData.map((item) => html`
    <div class="flex items-center gap-3 ${item.isLarge ? 'p-4 min-h-[72px]' : 'p-3'} border border-red-100 bg-red-50/50 rounded-lg hover:bg-red-50 cursor-pointer transition-colors">
      <div class="${item.isLarge ? 'w-10 h-10 rounded-lg' : 'w-8 h-8 rounded'} bg-red-100 flex items-center justify-center flex-shrink-0">
        <i class="fa-solid fa-folder-open text-red-600 ${item.isLarge ? '' : 'text-sm'}"></i>
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-sm font-medium text-gray-900 truncate">${item.title}</div>
        <div class="text-xs text-gray-500">${item.id} • ${item.assignee}</div>
      </div>
      <div class="flex flex-col items-end gap-1">
        <span class="px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">${item.overdueDays}</span>
        <span class="text-xs text-red-600 font-medium">${item.originalDue}</span>
      </div>
    </div>
  `);

  return html`
    <section id="dashboard-widgets-section" class="py-12 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        ${raw(SectionHeader({ title: 'Dashboard Widgets', description: 'Case cards displayed in various dashboard widget contexts', variant: 'page' }))}

        <!-- My Cases Widget -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">My Cases Widget</h3>
          <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div class="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-briefcase text-blue-600"></i>
                <span class="font-semibold text-gray-900">My Cases</span>
                <span class="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full">12</span>
              </div>
              <div class="flex items-center gap-3">
                <!-- Status Pills for Quick Filter -->
                <div class="hidden sm:flex items-center gap-1">
                  <button class="px-3 py-1.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">All</button>
                  <button class="px-3 py-1.5 text-xs font-medium rounded-full text-gray-600 hover:bg-gray-100 transition-colors">Active</button>
                  <button class="px-3 py-1.5 text-xs font-medium rounded-full text-gray-600 hover:bg-gray-100 transition-colors">Pending</button>
                </div>
                <select class="sm:hidden text-xs border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[44px]">
                  <option>All Statuses</option>
                  <option>Active</option>
                  <option>Pending</option>
                </select>
                <a href="#" class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">View All <i class="fa-solid fa-arrow-right ml-1.5 text-xs"></i></a>
              </div>
            </div>
            <div class="p-4 space-y-3">
              ${joinHtml(myCasesItemsHtml)}
            </div>
          </div>
        </div>

        <!-- Overdue Cases Widget -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Overdue Cases Widget</h3>
          <div class="bg-white rounded-lg border border-red-200 shadow-sm">
            <div class="flex items-center justify-between px-5 py-4 border-b border-red-200 bg-red-50">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-exclamation-triangle text-red-600"></i>
                <span class="font-semibold text-red-900">Overdue Cases</span>
                <span class="bg-red-100 text-red-700 text-xs font-medium px-2 py-0.5 rounded-full">3</span>
              </div>
              <a href="#" class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors">View All <i class="fa-solid fa-arrow-right ml-1.5 text-xs"></i></a>
            </div>
            <div class="p-4 space-y-3">
              ${joinHtml(overdueCasesItemsHtml)}
            </div>
          </div>
        </div>

        <!-- Summary Statistics Widget -->
        <div class="mb-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Summary Statistics Widget</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-white rounded-lg border border-gray-200 p-5">
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i class="fa-solid fa-briefcase text-blue-600"></i>
                </div>
                <span class="text-xs text-gray-500 font-medium">Total</span>
              </div>
              <div class="text-2xl font-bold text-gray-900">179</div>
              <div class="text-sm text-gray-500">All Cases</div>
            </div>
            <div class="bg-white rounded-lg border border-gray-200 p-5">
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i class="fa-solid fa-circle-check text-green-600"></i>
                </div>
                <span class="text-xs text-green-600 font-medium">+12%</span>
              </div>
              <div class="text-2xl font-bold text-gray-900">24</div>
              <div class="text-sm text-gray-500">Active Cases</div>
            </div>
            <div class="bg-white rounded-lg border border-gray-200 p-5">
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <i class="fa-solid fa-clock text-amber-600"></i>
                </div>
                <span class="text-xs text-amber-600 font-medium">Pending</span>
              </div>
              <div class="text-2xl font-bold text-gray-900">8</div>
              <div class="text-sm text-gray-500">Awaiting Action</div>
            </div>
            <div class="bg-white rounded-lg border border-red-200 p-5 bg-red-50/30">
              <div class="flex items-center justify-between mb-3">
                <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i class="fa-solid fa-exclamation-triangle text-red-600"></i>
                </div>
                <span class="text-xs text-red-600 font-medium">Alert</span>
              </div>
              <div class="text-2xl font-bold text-red-600">3</div>
              <div class="text-sm text-gray-500">Overdue Cases</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}


// =============================================================================
// MAIN EXPORT
// =============================================================================

/**
 * Generates the complete Case page content.
 *
 * @returns HTML string for the main content area
 *
 * @example
 * ```ts
 * import { PageLayout } from '../src/components/layout/PageLayout';
 * import { CasePageContent } from './case';
 *
 * const html = PageLayout({
 *   title: 'Case Cards - ArkCase Design System',
 *   children: CasePageContent(),
 *   activePage: 'Case.html'
 * });
 * ```
 */
export function CasePageContent(): string {
  return html`
    ${raw(PageHeader())}

    <!-- Card Variants -->
    ${raw(SectionGroupHeader({ id: 'card-variants-group', title: 'Card Variants', description: 'Three size variants for different information density needs', icon: 'fa-layer-group' }))}
    ${raw(SmallCardsSection())}
    ${raw(MediumCardsSection())}
    ${raw(LargeCardsSection())}
    ${raw(ComparisonSection())}

    <!-- Usage Contexts -->
    ${raw(SectionGroupHeader({ id: 'usage-contexts-group', title: 'Usage Contexts', description: 'How cards appear in different parts of the application', icon: 'fa-window-restore' }))}
    ${raw(DashboardWidgetsSection())}
    ${raw(DashboardViewSection())}
    ${raw(SidebarItemsSection())}

    <!-- Design Reference -->
    ${raw(SectionGroupHeader({ id: 'design-reference-group', title: 'Design Reference', description: 'Visual states and interaction patterns', icon: 'fa-palette' }))}
    ${raw(StatusVariantsSection())}
    ${raw(InteractionStatesSection())}
  `;
}
