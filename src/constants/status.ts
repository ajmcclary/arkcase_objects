/**
 * Status mappings to colors and labels.
 * @module constants/status
 */

import type { Status, Priority } from '../types';

/**
 * Status to Tailwind color class mapping.
 * Used for status badges throughout the system.
 */
export const STATUS_COLORS: Record<Status, { bg: string; text: string }> = {
  active: { bg: 'bg-green-100', text: 'text-green-800' },
  pending: { bg: 'bg-amber-100', text: 'text-amber-800' },
  'in-review': { bg: 'bg-blue-100', text: 'text-blue-800' },
  'in-progress': { bg: 'bg-amber-100', text: 'text-amber-800' },
  'on-hold': { bg: 'bg-purple-100', text: 'text-purple-800' },
  overdue: { bg: 'bg-red-100', text: 'text-red-800' },
  closed: { bg: 'bg-gray-100', text: 'text-gray-800' },
  urgent: { bg: 'bg-red-100', text: 'text-red-800' },
  completed: { bg: 'bg-green-100', text: 'text-green-800' },
  draft: { bg: 'bg-gray-100', text: 'text-gray-600' },
  rejected: { bg: 'bg-red-100', text: 'text-red-800' },
  approved: { bg: 'bg-green-100', text: 'text-green-800' },
  assigned: { bg: 'bg-blue-100', text: 'text-blue-800' },
  ready: { bg: 'bg-green-100', text: 'text-green-800' },
  rework: { bg: 'bg-orange-100', text: 'text-orange-800' },
  cancelled: { bg: 'bg-gray-100', text: 'text-gray-600' },
};

/**
 * Default display labels for each status.
 * Used when no custom label is provided.
 */
export const STATUS_LABELS: Record<Status, string> = {
  active: 'Active',
  pending: 'Pending',
  'in-review': 'In Review',
  'in-progress': 'In Progress',
  'on-hold': 'On Hold',
  overdue: 'Overdue',
  closed: 'Closed',
  urgent: 'Urgent',
  completed: 'Completed',
  draft: 'Draft',
  rejected: 'Rejected',
  approved: 'Approved',
  assigned: 'Assigned',
  ready: 'Ready',
  rework: 'Rework',
  cancelled: 'Cancelled',
};

/**
 * Priority to color class mapping.
 */
export const PRIORITY_COLORS: Record<Priority, { bg: string; text: string }> = {
  low: { bg: 'bg-gray-100', text: 'text-gray-700' },
  medium: { bg: 'bg-blue-100', text: 'text-blue-700' },
  high: { bg: 'bg-orange-100', text: 'text-orange-700' },
  urgent: { bg: 'bg-red-100', text: 'text-red-700' },
};

/**
 * Priority display labels.
 */
export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

/**
 * Priority icon colors for star/flag indicators.
 */
export const PRIORITY_ICON_COLORS: Record<Priority, string> = {
  low: 'text-gray-400',
  medium: 'text-blue-500',
  high: 'text-orange-500',
  urgent: 'text-red-500',
};

/**
 * Highlight colors for metadata fields.
 */
export const HIGHLIGHT_COLORS: Record<
  'danger' | 'warning' | 'success',
  string
> = {
  danger: 'text-red-600',
  warning: 'text-amber-600',
  success: 'text-green-600',
};
