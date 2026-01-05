/**
 * ActivityTimeline component for displaying recent activity.
 * @module components/ui/ActivityTimeline
 */

import { html, raw, joinHtml } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { Avatar } from './Avatar';
import { GRADIENT_COLORS } from '../../constants/colors';
import type { TimelineItemProps, ColorScheme } from '../../types';

/**
 * Renders a single timeline item.
 */
function TimelineItem(props: TimelineItemProps & { isLast?: boolean }): string {
  const {
    title,
    description,
    user,
    userInitials,
    timestamp,
    color = 'blue',
    isLast = false,
    id,
    className,
  } = props;

  const avatarHtml = Avatar({
    alt: user,
    initials: userInitials,
    color,
    size: 'sm',
  });

  const lineHtml = !isLast
    ? html`<div class="absolute left-3 top-8 w-0.5 h-full bg-gray-200"></div>`
    : '';

  return html`
    <div${raw(id ? ` id="${id}"` : '')} class="${cn('relative pl-10 pb-6', isLast && 'pb-0', className)}">
      <!-- Avatar -->
      <div class="absolute left-0 top-0">
        ${raw(avatarHtml)}
      </div>

      <!-- Connecting line -->
      ${raw(lineHtml)}

      <!-- Content -->
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="text-sm font-medium text-gray-900">${user}</span>
          <span class="text-xs text-gray-500">${timestamp}</span>
        </div>
        <p class="text-sm text-gray-700">${title}</p>
        ${description ? html`<p class="text-xs text-gray-500 mt-1">${description}</p>` : ''}
      </div>
    </div>
  `;
}

/**
 * Props for the ActivityTimeline component.
 */
export interface ActivityTimelineProps {
  /** Activity items to display */
  items: Array<Omit<TimelineItemProps, 'isLast'>>;
  /** Maximum items to show */
  maxItems?: number;
  /** Title for the timeline section */
  title?: string;
  /** Show "View all" link */
  showViewAll?: boolean;
  /** View all link URL */
  viewAllHref?: string;
  /** Optional CSS classes */
  className?: string;
}

/**
 * Renders an activity timeline component.
 *
 * Displays a vertical timeline of recent activities with avatars,
 * timestamps, and connecting lines.
 *
 * @param props - ActivityTimeline configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * ActivityTimeline({
 *   title: 'Recent Activity',
 *   items: [
 *     {
 *       title: 'Updated case status to Active',
 *       user: 'John Smith',
 *       userInitials: 'JS',
 *       timestamp: '2 hours ago',
 *       color: 'blue'
 *     },
 *     {
 *       title: 'Added new document',
 *       user: 'Mary Johnson',
 *       userInitials: 'MJ',
 *       timestamp: 'Yesterday',
 *       color: 'green'
 *     }
 *   ]
 * })
 * ```
 */
export function ActivityTimeline(props: ActivityTimelineProps): string {
  const {
    items,
    maxItems = 5,
    title = 'Recent Activity',
    showViewAll = false,
    viewAllHref = '#',
    className,
  } = props;

  const visibleItems = items.slice(0, maxItems);
  const hasMore = items.length > maxItems;

  const timelineItems = visibleItems.map((item, index) =>
    TimelineItem({
      ...item,
      isLast: index === visibleItems.length - 1,
    })
  );

  const viewAllHtml = (showViewAll || hasMore)
    ? html`
      <div class="mt-4 pt-4 border-t border-gray-100">
        <a href="${viewAllHref}" class="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View all activity
          <i class="fa-solid fa-arrow-right ml-1"></i>
        </a>
      </div>
    `
    : '';

  return html`
    <div class="${cn('', className)}">
      <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">${title}</h4>
      <div class="relative">
        ${joinHtml(timelineItems)}
      </div>
      ${raw(viewAllHtml)}
    </div>
  `;
}
