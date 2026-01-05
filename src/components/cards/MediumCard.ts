/**
 * MediumCard component for dashboard views.
 * @module components/cards/MediumCard
 */

import { html, raw, joinHtml } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { StatusBadge } from '../ui/StatusBadge';
import { IconContainer } from '../ui/IconContainer';
import { Button } from '../ui/Button';
import { AvatarGroup } from '../ui/AvatarGroup';
import { MetadataField } from '../ui/MetadataField';
import { PRIORITY_ICON_COLORS } from '../../constants/status';
import type { MediumCardProps } from '../../types';

/**
 * Renders a medium card component.
 *
 * A dashboard-style card with more detail than SmallCard. Shows
 * metadata grid, assignees, related objects, and action buttons.
 *
 * @param props - MediumCard configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * MediumCard({
 *   title: 'Employee Misconduct Investigation',
 *   objectId: 'CASE-2024-0847',
 *   objectType: 'Case File',
 *   status: 'active',
 *   icon: 'fa-folder-open',
 *   iconColor: 'blue',
 *   priority: 'high',
 *   showPriorityIcon: true,
 *   metadata: [
 *     { label: 'Priority', value: 'High' },
 *     { label: 'Queue', value: 'Investigations' },
 *     { label: 'Created', value: 'Dec 15, 2024' },
 *     { label: 'Due Date', value: 'Jan 28, 2025' }
 *   ],
 *   assignees: [
 *     { src: 'user1.jpg', alt: 'John Doe' },
 *     { alt: 'Jane Smith', initials: 'JS' }
 *   ],
 *   actionLabel: 'Open Case',
 *   actionHref: 'case-detail.html'
 * })
 * ```
 */
export function MediumCard(props: MediumCardProps): string {
  const {
    title,
    objectId,
    objectType = 'Case File',
    status,
    icon,
    iconColor,
    priority,
    showPriorityIcon = false,
    dueDate,
    isOverdue = false,
    metadata = [],
    assignees = [],
    maxAssignees = 3,
    actionLabel,
    actionHref,
    relatedObject,
    isClickable = true,
    href,
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn(
    'bg-white rounded-lg border border-gray-200 p-6',
    'hover:shadow-lg transition-shadow',
    isClickable && 'cursor-pointer',
    className
  );

  const iconHtml = IconContainer({ icon, color: iconColor, size: 'md' });
  const badgeHtml = StatusBadge({ status, variant: 'tag', size: 'md' });

  const priorityIconHtml = showPriorityIcon && priority
    ? html`<i class="fa-solid fa-star ${PRIORITY_ICON_COLORS[priority]} text-xs ml-2" title="${priority} Priority"></i>`
    : '';

  // Metadata grid
  const metadataHtml = metadata.length > 0
    ? html`
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        ${joinHtml(metadata.map((field) => MetadataField({ label: field.label, value: field.value, highlight: field.highlight })))}
      </div>
    `
    : '';

  // Assignees
  const assigneesHtml = assignees.length > 0
    ? html`
      <div class="mb-4">
        <div class="text-xs text-gray-600 font-medium uppercase tracking-wide mb-2">
          Assigned To <span class="text-gray-400 normal-case font-normal">(${assignees.length})</span>
        </div>
        ${raw(AvatarGroup({ avatars: assignees, max: maxAssignees, size: 'md' }))}
      </div>
    `
    : '';

  // Related object
  const relatedObjectHtml = relatedObject
    ? html`
      <div class="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100">
        ${raw(IconContainer({ icon: relatedObject.icon, color: relatedObject.color, size: 'sm' }))}
        <div>
          <div class="text-xs text-gray-500">${relatedObject.type}</div>
          <div class="text-sm font-medium text-gray-900">${relatedObject.name}</div>
        </div>
      </div>
    `
    : '';

  // Action button
  const actionHtml = actionLabel
    ? html`
      <div class="pt-4 border-t border-gray-200">
        ${raw(Button({ label: actionLabel, href: actionHref, variant: 'primary', size: 'md' }))}
      </div>
    `
    : '';

  const cardContent = html`
    <!-- Header with Status -->
    <div class="flex items-start justify-between mb-4">
      <div class="flex items-center">
        ${raw(iconHtml)}
        <div class="ml-3">
          <div class="text-xs font-medium text-gray-500 uppercase tracking-wider">${objectType}</div>
          <div class="flex items-center mt-1">
            ${raw(badgeHtml)}
            ${raw(priorityIconHtml)}
          </div>
        </div>
      </div>
      <button class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded transition-colors">
        <i class="fa-solid fa-ellipsis-v"></i>
      </button>
    </div>

    <!-- Title Section -->
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-1">${title}</h3>
      <p class="text-sm text-gray-500">${objectId}</p>
    </div>

    ${raw(metadataHtml)}
    ${raw(relatedObjectHtml)}
    ${raw(assigneesHtml)}
    ${raw(actionHtml)}
  `;

  if (href) {
    return html`<a${raw(buildAttrs(id, dataAttributes))} href="${href}" class="${wrapperClasses}">${raw(cardContent)}</a>`;
  }

  return html`<div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">${raw(cardContent)}</div>`;
}
