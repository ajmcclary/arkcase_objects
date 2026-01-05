/**
 * SmallCard component for compact list items.
 * @module components/cards/SmallCard
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { StatusBadge } from '../ui/StatusBadge';
import { IconContainer } from '../ui/IconContainer';
import type { SmallCardProps } from '../../types';

/**
 * Renders a small card component.
 *
 * A compact card for list views and grids. Shows icon, title,
 * object ID, status badge, and optional due date/assignee.
 *
 * @param props - SmallCard configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * // Basic usage
 * SmallCard({
 *   title: 'Employee Misconduct Investigation',
 *   objectId: 'CASE-2024-0847',
 *   status: 'active',
 *   icon: 'fa-folder-open',
 *   iconColor: 'blue'
 * })
 *
 * // With due date and assignee
 * SmallCard({
 *   title: 'Review Documents',
 *   objectId: 'TASK-001',
 *   status: 'pending',
 *   icon: 'fa-clipboard-check',
 *   iconColor: 'blue',
 *   dueDate: 'Jan 28',
 *   isOverdue: true,
 *   assignee: 'John Smith'
 * })
 *
 * // As a link
 * SmallCard({
 *   title: 'Case File',
 *   objectId: 'CASE-001',
 *   status: 'active',
 *   icon: 'fa-briefcase',
 *   iconColor: 'blue',
 *   href: 'case-detail.html'
 * })
 * ```
 */
export function SmallCard(props: SmallCardProps): string {
  const {
    title,
    objectId,
    status,
    icon,
    iconColor,
    objectType,
    dueDate,
    isOverdue = false,
    assignee,
    subtitle,
    isClickable = true,
    href,
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn(
    'bg-white border border-gray-200 rounded-lg p-4',
    'hover:shadow-md transition-shadow',
    isClickable && 'cursor-pointer',
    className
  );

  const dateClasses = cn(
    'text-xs',
    isOverdue ? 'text-red-600' : 'text-gray-600'
  );

  const calendarIconClasses = cn(
    'fa-regular fa-calendar mr-1',
    isOverdue ? 'text-red-500' : 'text-gray-400'
  );

  const iconHtml = IconContainer({ icon, color: iconColor, size: 'md' });
  const badgeHtml = StatusBadge({ status, variant: 'pill', size: 'sm' });

  const dueDateHtml = dueDate
    ? html`
      <div class="${dateClasses}">
        <i class="${calendarIconClasses}"></i>
        ${isOverdue ? 'Due: ' : ''}${dueDate}
      </div>
    `
    : '';

  const assigneeHtml = assignee
    ? html`
      <div class="flex items-center gap-1 mt-2 text-xs text-gray-500">
        <i class="fa-regular fa-user text-gray-400"></i>
        <span>${assignee}</span>
      </div>
    `
    : '';

  const subtitleHtml = subtitle
    ? html`<p class="text-xs text-gray-500 mt-0.5">${subtitle}</p>`
    : '';

  const cardContent = html`
    <div class="flex items-center gap-3">
      ${raw(iconHtml)}
      <div class="flex-1 min-w-0">
        <h3 class="text-sm font-semibold text-gray-900 truncate">${title}</h3>
        <p class="text-xs text-gray-500 mt-0.5">${objectId}</p>
        ${raw(subtitleHtml)}
      </div>
      <div class="flex flex-col items-end gap-1 flex-shrink-0">
        ${raw(badgeHtml)}
        ${raw(dueDateHtml)}
      </div>
    </div>
    ${raw(assigneeHtml)}
  `;

  // Wrap in anchor if href is provided
  if (href) {
    return html`<a${raw(buildAttrs(id, dataAttributes))} href="${href}" class="${wrapperClasses}">${raw(cardContent)}</a>`;
  }

  return html`<div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">${raw(cardContent)}</div>`;
}
