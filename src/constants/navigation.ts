/**
 * Sidebar navigation structure.
 * @module constants/navigation
 */

import type { NavGroup } from '../types';

/**
 * Default sidebar navigation structure.
 * Contains all 28 wireframe links organized by category.
 */
export const DEFAULT_NAVIGATION: NavGroup[] = [
  {
    title: 'Core Objects',
    items: [
      { label: 'Case', href: 'Case.html', icon: 'fa-briefcase' },
      { label: 'Complaint', href: 'Complaint.html', icon: 'fa-exclamation-circle' },
      { label: 'Consultation', href: 'Consultation.html', icon: 'fa-comments' },
      { label: 'Task', href: 'Task.html', icon: 'fa-list-check' },
    ],
  },
  {
    title: 'People & Orgs',
    items: [
      { label: 'Person', href: 'Person.html', icon: 'fa-user' },
      { label: 'User', href: 'User.html', icon: 'fa-user-gear' },
      { label: 'Organization', href: 'Organization.html', icon: 'fa-building' },
      { label: 'Group', href: 'Group.html', icon: 'fa-users' },
      { label: 'Participant', href: 'Participant.html', icon: 'fa-user-tag' },
    ],
  },
  {
    title: 'Documents',
    items: [
      { label: 'File Object', href: 'File Object.html', icon: 'fa-file' },
      { label: 'File Version', href: 'File Version.html', icon: 'fa-file-lines' },
      { label: 'Folder', href: 'Folder.html', icon: 'fa-folder' },
      { label: 'Container', href: 'Container.html', icon: 'fa-box' },
      { label: 'Note', href: 'Note.html', icon: 'fa-sticky-note' },
    ],
  },
  {
    title: 'Workflow',
    items: [
      { label: 'Queue', href: 'Queue.html', icon: 'fa-layer-group' },
      { label: 'Business Process', href: 'Business Process.html', icon: 'fa-diagram-project' },
    ],
  },
  {
    title: 'Communication',
    items: [
      { label: 'Chat Conversation', href: 'Chat Conversation.html', icon: 'fa-message' },
      { label: 'Chat Message', href: 'Chat Message.html', icon: 'fa-comment' },
      { label: 'Notification', href: 'Notification.html', icon: 'fa-bell' },
      { label: 'Subscription', href: 'Subscription.html', icon: 'fa-rss' },
    ],
  },
  {
    title: 'Financial',
    items: [
      { label: 'Cost', href: 'Cost.html', icon: 'fa-dollar-sign' },
      { label: 'Costsheet', href: 'Costsheet.html', icon: 'fa-file-invoice-dollar' },
    ],
  },
  {
    title: 'Metadata',
    items: [
      { label: 'Tag', href: 'Tag.html', icon: 'fa-tag' },
      { label: 'Associated Tag', href: 'Associated Tag.html', icon: 'fa-tags' },
      { label: 'Object Association', href: 'Object Association.html', icon: 'fa-link' },
    ],
  },
  {
    title: 'Audit',
    items: [
      { label: 'Audit Event', href: 'Audit Event.html', icon: 'fa-shield-halved' },
      { label: 'Object History', href: 'Object History.html', icon: 'fa-clock-rotate-left' },
      { label: 'Recycle Bin Item', href: 'Recycle Bin Item.html', icon: 'fa-trash-can' },
    ],
  },
];

/**
 * Featured wireframes for the index page.
 * Subset of most important objects to highlight.
 */
export const FEATURED_WIREFRAMES = [
  {
    title: 'Case',
    description: 'The core case management object with status tracking, participants, and file attachments.',
    href: 'Case.html',
    icon: 'fa-briefcase',
    color: 'blue' as const,
    category: 'Core',
    footer: 'Small, Medium, Large + Dashboard',
  },
  {
    title: 'Task',
    description: 'Task management with assignments, due dates, priorities, and progress tracking.',
    href: 'Task.html',
    icon: 'fa-list-check',
    color: 'blue' as const,
    category: 'Core',
    footer: 'Small, Medium, Large + Dashboard',
  },
  {
    title: 'Person',
    description: 'People records with contact information, relationships, and involvement history.',
    href: 'Person.html',
    icon: 'fa-user',
    color: 'green' as const,
    category: 'People',
    footer: 'Small, Medium, Large + Dashboard',
  },
  {
    title: 'File Object',
    description: 'Document management with versions, metadata, and folder organization.',
    href: 'File Object.html',
    icon: 'fa-file',
    color: 'purple' as const,
    category: 'Documents',
    footer: 'Small, Medium, Large + Dashboard',
  },
  {
    title: 'Notification',
    description: 'System notifications with priority levels, read status, and action links.',
    href: 'Notification.html',
    icon: 'fa-bell',
    color: 'cyan' as const,
    category: 'Communication',
    footer: 'Small, Medium, Large + Dashboard',
  },
  {
    title: 'Queue',
    description: 'Work queue management with assignment rules and priority sorting.',
    href: 'Queue.html',
    icon: 'fa-layer-group',
    color: 'orange' as const,
    category: 'Workflow',
    footer: 'Small, Medium, Large + Dashboard',
  },
];

/**
 * All wireframes organized by category for the complete listing.
 */
export const ALL_WIREFRAMES_BY_CATEGORY = {
  'Core Objects': [
    { title: 'Case', subtitle: 'Status, participants, files', icon: 'fa-briefcase', href: 'Case.html', color: 'blue' as const },
    { title: 'Complaint', subtitle: 'Issue tracking, resolution', icon: 'fa-exclamation-circle', href: 'Complaint.html', color: 'blue' as const },
    { title: 'Consultation', subtitle: 'Meetings, discussions', icon: 'fa-comments', href: 'Consultation.html', color: 'blue' as const },
    { title: 'Task', subtitle: 'Assignments, due dates', icon: 'fa-list-check', href: 'Task.html', color: 'blue' as const },
  ],
  'People & Orgs': [
    { title: 'Person', subtitle: 'Contact info, roles', icon: 'fa-user', href: 'Person.html', color: 'green' as const },
    { title: 'User', subtitle: 'System users, permissions', icon: 'fa-user-gear', href: 'User.html', color: 'green' as const },
    { title: 'Organization', subtitle: 'Companies, agencies', icon: 'fa-building', href: 'Organization.html', color: 'green' as const },
    { title: 'Group', subtitle: 'Teams, departments', icon: 'fa-users', href: 'Group.html', color: 'green' as const },
    { title: 'Participant', subtitle: 'Case involvement', icon: 'fa-user-tag', href: 'Participant.html', color: 'green' as const },
  ],
  'Documents': [
    { title: 'File Object', subtitle: 'Documents, attachments', icon: 'fa-file', href: 'File Object.html', color: 'purple' as const },
    { title: 'File Version', subtitle: 'Version history', icon: 'fa-file-lines', href: 'File Version.html', color: 'purple' as const },
    { title: 'Folder', subtitle: 'Organization, hierarchy', icon: 'fa-folder', href: 'Folder.html', color: 'purple' as const },
    { title: 'Container', subtitle: 'Document containers', icon: 'fa-box', href: 'Container.html', color: 'purple' as const },
    { title: 'Note', subtitle: 'Comments, annotations', icon: 'fa-sticky-note', href: 'Note.html', color: 'purple' as const },
  ],
  'Workflow': [
    { title: 'Queue', subtitle: 'Work queues, routing', icon: 'fa-layer-group', href: 'Queue.html', color: 'orange' as const },
    { title: 'Business Process', subtitle: 'Workflows, automation', icon: 'fa-diagram-project', href: 'Business Process.html', color: 'orange' as const },
  ],
  'Communication': [
    { title: 'Chat Conversation', subtitle: 'Discussion threads', icon: 'fa-message', href: 'Chat Conversation.html', color: 'cyan' as const },
    { title: 'Chat Message', subtitle: 'Individual messages', icon: 'fa-comment', href: 'Chat Message.html', color: 'cyan' as const },
    { title: 'Notification', subtitle: 'Alerts, reminders', icon: 'fa-bell', href: 'Notification.html', color: 'cyan' as const },
    { title: 'Subscription', subtitle: 'Follow, watch items', icon: 'fa-rss', href: 'Subscription.html', color: 'cyan' as const },
  ],
  'Financial': [
    { title: 'Cost', subtitle: 'Expenses, billing', icon: 'fa-dollar-sign', href: 'Cost.html', color: 'amber' as const },
    { title: 'Costsheet', subtitle: 'Cost summaries', icon: 'fa-file-invoice-dollar', href: 'Costsheet.html', color: 'amber' as const },
  ],
  'Metadata': [
    { title: 'Tag', subtitle: 'Labels, categories', icon: 'fa-tag', href: 'Tag.html', color: 'pink' as const },
    { title: 'Associated Tag', subtitle: 'Tag relationships', icon: 'fa-tags', href: 'Associated Tag.html', color: 'pink' as const },
    { title: 'Object Association', subtitle: 'Linked objects', icon: 'fa-link', href: 'Object Association.html', color: 'pink' as const },
  ],
  'Audit': [
    { title: 'Audit Event', subtitle: 'Activity logs', icon: 'fa-shield-halved', href: 'Audit Event.html', color: 'slate' as const },
    { title: 'Object History', subtitle: 'Change tracking', icon: 'fa-clock-rotate-left', href: 'Object History.html', color: 'slate' as const },
    { title: 'Recycle Bin Item', subtitle: 'Deleted items', icon: 'fa-trash-can', href: 'Recycle Bin Item.html', color: 'slate' as const },
  ],
};
