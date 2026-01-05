/**
 * SectionHeader component for page section titles.
 * @module components/ui/SectionHeader
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import type { SectionHeaderProps } from '../../types';

/**
 * Renders a section header with optional badge, count, and action.
 *
 * @param props - SectionHeader configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * SectionHeader({
 *   title: 'Small Cards',
 *   isCollapsible: false
 * })
 *
 * SectionHeader({
 *   title: 'Participants',
 *   count: 4,
 *   isCollapsible: true,
 *   isExpanded: true
 * })
 * ```
 */
export function SectionHeader(props: SectionHeaderProps): string {
  const {
    title,
    description,
    variant = 'card',
    isExpanded = true,
    isCollapsible = true,
    count,
    action,
    id,
    className,
    dataAttributes = {},
  } = props;

  // Page variant - subordinate to SectionGroupHeader
  if (variant === 'page') {
    return html`
      <div${raw(buildAttrs(id, dataAttributes))} class="${cn('mb-6 scroll-mt-20 pl-4 border-l-2 border-indigo-200', className)}">
        <h3 class="text-lg font-semibold text-gray-800">${title}</h3>
        ${raw(description ? html`<p class="text-gray-500 text-sm mt-1">${description}</p>` : '')}
      </div>
    `;
  }

  // Card variant - collapsible h4 section headers
  const classes = cn(
    'w-full flex items-center justify-between text-left',
    isCollapsible && 'group',
    className
  );

  const countHtml = count !== undefined
    ? html` <span class="text-gray-400 normal-case font-normal">(${count})</span>`
    : '';

  const chevronHtml = isCollapsible
    ? html`<i class="fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} text-gray-400 group-hover:text-gray-600 transition-transform"></i>`
    : '';

  const actionHtml = action
    ? html`<a href="${action.href || '#'}" class="text-sm text-blue-600 hover:text-blue-800 font-medium"${raw(action.onClick ? ` onclick="${action.onClick}"` : '')}>${action.label}</a>`
    : '';

  if (isCollapsible) {
    return html`
      <button${raw(buildAttrs(id, dataAttributes))} class="${classes}" aria-expanded="${isExpanded}">
        <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">${title}${raw(countHtml)}</h4>
        ${raw(chevronHtml)}
        ${raw(actionHtml)}
      </button>
    `;
  }

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${classes}">
      <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">${title}${raw(countHtml)}</h4>
      ${raw(actionHtml)}
    </div>
  `;
}
