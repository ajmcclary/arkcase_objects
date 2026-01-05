/**
 * FilterPanel component for filter sidebars.
 * @module components/ui/FilterPanel
 */

import { html, raw, joinHtml } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import type { BaseComponentProps, ColorScheme } from '../../types';

/**
 * Filter option with checkbox.
 */
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
  isChecked?: boolean;
  color?: ColorScheme;
}

/**
 * Filter group configuration.
 */
export interface FilterGroup {
  title: string;
  options: FilterOption[];
  type?: 'checkbox' | 'radio';
}

/**
 * Sort option configuration.
 */
export interface SortOption {
  label: string;
  value: string;
  isSelected?: boolean;
}

/**
 * Props for the FilterPanel component.
 */
export interface FilterPanelProps extends BaseComponentProps {
  /** Filter groups to display */
  filterGroups: FilterGroup[];
  /** Sort options */
  sortOptions?: SortOption[];
  /** Show clear all button */
  showClearAll?: boolean;
  /** Number of active filters */
  activeFilterCount?: number;
  /** Mobile toggle button ID */
  toggleButtonId?: string;
  /** Panel ID for aria-controls */
  panelId?: string;
  /** Whether panel is expanded on mobile */
  isExpanded?: boolean;
}

/**
 * Status color dots mapping.
 */
const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-500',
  pending: 'bg-amber-500',
  'in-review': 'bg-blue-500',
  'in-progress': 'bg-blue-500',
  closed: 'bg-gray-500',
  urgent: 'bg-red-500',
  blocked: 'bg-red-500',
  completed: 'bg-green-500',
  ready: 'bg-cyan-500',
  done: 'bg-green-500',
};

/**
 * Renders a filter checkbox option.
 */
function FilterCheckbox(option: FilterOption, groupName: string): string {
  const colorDot = option.color || STATUS_COLORS[option.value.toLowerCase()]
    ? html`<span class="w-2 h-2 rounded-full ${STATUS_COLORS[option.value.toLowerCase()] || `bg-${option.color}-500`} mr-2"></span>`
    : '';

  return html`
    <label class="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        name="${groupName}"
        value="${option.value}"
        ${raw(option.isChecked ? ' checked' : '')}
        class="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span class="flex items-center text-sm text-gray-700 group-hover:text-gray-900">
        ${raw(colorDot)}
        ${option.label}
      </span>
      ${raw(option.count !== undefined ? html`<span class="text-xs text-gray-400 ml-auto">${option.count}</span>` : '')}
    </label>
  `;
}

/**
 * Renders a filter group with title and options.
 */
function FilterGroupComponent(group: FilterGroup): string {
  const groupName = group.title.toLowerCase().replace(/\s+/g, '-');
  const options = group.options.map((opt) => FilterCheckbox(opt, groupName));

  return html`
    <div class="mb-6">
      <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
        ${group.title}
      </h4>
      <div class="space-y-2">
        ${joinHtml(options)}
      </div>
    </div>
  `;
}

/**
 * Renders a filter panel component.
 *
 * A sidebar filter panel with checkbox groups, sort options,
 * and mobile-responsive toggle behavior.
 *
 * @param props - FilterPanel configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * FilterPanel({
 *   filterGroups: [
 *     {
 *       title: 'Status',
 *       options: [
 *         { label: 'Active', value: 'active', count: 12, isChecked: true },
 *         { label: 'Pending', value: 'pending', count: 5 },
 *         { label: 'Closed', value: 'closed', count: 8 }
 *       ]
 *     },
 *     {
 *       title: 'Priority',
 *       options: [
 *         { label: 'High', value: 'high', count: 3 },
 *         { label: 'Medium', value: 'medium', count: 10 },
 *         { label: 'Low', value: 'low', count: 12 }
 *       ]
 *     }
 *   ],
 *   sortOptions: [
 *     { label: 'Newest First', value: 'newest', isSelected: true },
 *     { label: 'Oldest First', value: 'oldest' },
 *     { label: 'Due Date', value: 'due-date' }
 *   ],
 *   showClearAll: true,
 *   activeFilterCount: 2
 * })
 * ```
 */
export function FilterPanel(props: FilterPanelProps): string {
  const {
    filterGroups,
    sortOptions = [],
    showClearAll = true,
    activeFilterCount = 0,
    toggleButtonId = 'filter-toggle',
    panelId = 'filter-panel',
    isExpanded = false,
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn(
    'bg-white rounded-lg border border-gray-200 p-4',
    className
  );

  // Filter groups
  const filterGroupsHtml = filterGroups.map((group) => FilterGroupComponent(group));

  // Sort options dropdown
  const sortHtml = sortOptions.length > 0
    ? html`
      <div class="mb-6">
        <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Sort By
        </h4>
        <select class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-700">
          ${joinHtml(sortOptions.map((opt) => html`
            <option value="${opt.value}"${raw(opt.isSelected ? ' selected' : '')}>${opt.label}</option>
          `))}
        </select>
      </div>
    `
    : '';

  // Clear all button
  const clearAllHtml = showClearAll
    ? html`
      <div class="pt-4 border-t border-gray-200">
        <button class="w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
          <i class="fa-solid fa-xmark mr-2"></i>
          Clear All Filters
          ${raw(activeFilterCount > 0 ? html`<span class="ml-1 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">${activeFilterCount}</span>` : '')}
        </button>
      </div>
    `
    : '';

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      ${joinHtml(filterGroupsHtml)}
      ${raw(sortHtml)}
      ${raw(clearAllHtml)}
    </div>
  `;
}

/**
 * Renders a mobile filter toggle button.
 *
 * @param props - Toggle button configuration
 * @returns HTML string
 */
export function FilterToggleButton(props: {
  panelId?: string;
  isExpanded?: boolean;
  activeCount?: number;
}): string {
  const { panelId = 'filter-panel', isExpanded = false, activeCount = 0 } = props;

  return html`
    <button
      id="filter-toggle"
      class="md:hidden flex items-center gap-2 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 mb-4"
      aria-expanded="${isExpanded}"
      aria-controls="${panelId}"
    >
      <i class="fa-solid fa-filter text-gray-500"></i>
      <span>Filter & Sort</span>
      ${raw(activeCount > 0 ? html`<span class="ml-1 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">${activeCount}</span>` : '')}
      <i class="fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} ml-auto transition-transform duration-200" id="filter-chevron"></i>
    </button>
  `;
}
