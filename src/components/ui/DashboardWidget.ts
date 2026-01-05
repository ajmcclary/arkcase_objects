/**
 * DashboardWidget component for widget containers.
 * @module components/ui/DashboardWidget
 */

import { html, raw, joinHtml } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import type { BaseComponentProps } from '../../types';

/**
 * Filter tab configuration.
 */
export interface FilterTab {
  label: string;
  value: string;
  count?: number;
  isActive?: boolean;
}

/**
 * Props for the DashboardWidget component.
 */
export interface DashboardWidgetProps extends BaseComponentProps {
  /** Widget title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Badge count to show next to title */
  count?: number;
  /** Filter tabs to display */
  filterTabs?: FilterTab[];
  /** Show mobile dropdown filter instead of tabs */
  showMobileDropdown?: boolean;
  /** View all link */
  viewAllHref?: string;
  /** View all link text */
  viewAllText?: string;
  /** Widget content */
  children: string;
  /** Background color variant */
  variant?: 'default' | 'gray';
  /** Padding size */
  padding?: 'sm' | 'md' | 'lg';
}

/**
 * Padding classes by size.
 */
const PADDING_CLASSES = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * Renders a dashboard widget container.
 *
 * A container component for dashboard sections with optional
 * title, filter tabs, and view all link.
 *
 * @param props - DashboardWidget configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * DashboardWidget({
 *   title: 'My Cases',
 *   count: 24,
 *   filterTabs: [
 *     { label: 'All', value: 'all', isActive: true },
 *     { label: 'Active', value: 'active', count: 18 },
 *     { label: 'Pending', value: 'pending', count: 6 }
 *   ],
 *   viewAllHref: '/cases',
 *   children: '<div>Widget content here</div>'
 * })
 * ```
 */
export function DashboardWidget(props: DashboardWidgetProps): string {
  const {
    title,
    subtitle,
    count,
    filterTabs = [],
    showMobileDropdown = true,
    viewAllHref,
    viewAllText = 'View all',
    children,
    variant = 'default',
    padding = 'md',
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn(
    'rounded-lg border border-gray-200',
    variant === 'gray' ? 'bg-gray-50' : 'bg-white',
    PADDING_CLASSES[padding],
    className
  );

  // Title with optional count badge
  const titleHtml = html`
    <h3 class="text-lg font-semibold text-gray-900">
      ${title}
      ${count !== undefined ? html`<span class="ml-2 text-sm font-normal text-gray-500">(${count})</span>` : ''}
    </h3>
  `;

  // Subtitle
  const subtitleHtml = subtitle
    ? html`<p class="text-sm text-gray-500 mt-1">${subtitle}</p>`
    : '';

  // Desktop filter tabs
  const filterTabsHtml = filterTabs.length > 0
    ? html`
      <div class="hidden md:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        ${joinHtml(filterTabs.map((tab) => html`
          <button class="${cn(
            'px-3 py-1.5 text-sm font-medium rounded-md transition-colors',
            tab.isActive
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          )}">
            ${tab.label}
            ${tab.count !== undefined ? html`<span class="ml-1 text-xs text-gray-400">${tab.count}</span>` : ''}
          </button>
        `))}
      </div>
    `
    : '';

  // Mobile dropdown filter
  const mobileDropdownHtml = showMobileDropdown && filterTabs.length > 0
    ? html`
      <select class="md:hidden px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700">
        ${joinHtml(filterTabs.map((tab) => html`
          <option value="${tab.value}"${raw(tab.isActive ? ' selected' : '')}>
            ${tab.label}${tab.count !== undefined ? ` (${tab.count})` : ''}
          </option>
        `))}
      </select>
    `
    : '';

  // View all link
  const viewAllHtml = viewAllHref
    ? html`
      <a href="${viewAllHref}" class="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
        ${viewAllText}
        <i class="fa-solid fa-arrow-right ml-1"></i>
      </a>
    `
    : '';

  // Header section
  const hasFiltersOrViewAll = filterTabs.length > 0 || viewAllHref;
  const headerHtml = html`
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div>
        ${raw(titleHtml)}
        ${raw(subtitleHtml)}
      </div>
      ${hasFiltersOrViewAll ? html`
        <div class="flex items-center gap-4">
          ${raw(filterTabsHtml)}
          ${raw(mobileDropdownHtml)}
          ${raw(viewAllHtml)}
        </div>
      ` : ''}
    </div>
  `;

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      ${raw(headerHtml)}
      ${raw(children)}
    </div>
  `;
}
