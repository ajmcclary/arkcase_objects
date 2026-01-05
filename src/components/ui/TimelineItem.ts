/**
 * TimelineItem component for activity timelines.
 * @module components/ui/TimelineItem
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { Avatar } from './Avatar';
import type { TimelineItemProps } from '../../types';

/**
 * Renders a timeline item component.
 *
 * Displays a single activity/event in a vertical timeline with
 * icon marker, title, description, user info, and timestamp.
 *
 * @param props - TimelineItem configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * TimelineItem({
 *   title: 'Status changed to "Under Review"',
 *   user: 'Sarah Williams',
 *   userInitials: 'SW',
 *   timestamp: '2 hours ago',
 *   icon: 'fa-circle',
 *   iconColor: 'green',
 * })
 *
 * // With description
 * TimelineItem({
 *   title: 'Comment added',
 *   description: 'Initial review completed. Scheduling witness interviews...',
 *   user: 'John Smith',
 *   userInitials: 'JS',
 *   timestamp: 'Yesterday',
 *   icon: 'fa-comment',
 *   iconColor: 'blue',
 * })
 * ```
 */
export function TimelineItem(props: TimelineItemProps): string {
  const {
    title,
    description,
    user,
    userInitials,
    timestamp,
    icon = 'fa-circle',
    iconColor = 'blue',
    color = 'blue',
    isLast = false,
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn('relative', className);

  // Use iconColor for the marker, fallback to color prop
  const markerColor = iconColor || color;

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      <!-- Timeline Marker -->
      <div class="absolute -left-[37px] w-8 h-8 bg-${markerColor}-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">
        <i class="fa-solid ${icon} text-${markerColor}-600 text-xs"></i>
      </div>

      <!-- Content -->
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm font-medium text-gray-900">${title}</p>
          ${raw(description ? html`<p class="text-xs text-gray-600 mt-0.5 italic">"${description}"</p>` : '')}
          <div class="flex items-center gap-2 mt-1">
            ${raw(Avatar({ alt: user, initials: userInitials, color, size: 'sm' }))}
            <span class="text-xs text-gray-500">${user}</span>
          </div>
        </div>
        <span class="text-xs text-gray-400 flex-shrink-0 ml-2">${timestamp}</span>
      </div>
    </div>
  `;
}
