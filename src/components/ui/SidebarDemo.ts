/**
 * SidebarDemo component for showcasing sidebar patterns.
 * @module components/ui/SidebarDemo
 */

import { html, raw, joinHtml } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { IconContainer } from './IconContainer';
import type { BaseComponentProps, ColorScheme } from '../../types';

/**
 * Sidebar item configuration.
 */
export interface SidebarDemoItem {
  label: string;
  sublabel?: string;
  icon: string;
  iconColor: ColorScheme;
  href?: string;
  isCompleted?: boolean;
}

/**
 * Props for the SidebarDemo component.
 */
export interface SidebarDemoProps extends BaseComponentProps {
  /** Panel title */
  title: string;
  /** Title icon */
  titleIcon?: string;
  /** Items to display */
  items: SidebarDemoItem[];
  /** Item count badge */
  count?: number;
  /** View all link text */
  viewAllText?: string;
  /** View all link href */
  viewAllHref?: string;
  /** Show add button */
  showAddButton?: boolean;
  /** Description text */
  description?: string;
}

/**
 * Renders a sidebar demo panel for design documentation.
 *
 * Shows how related objects appear in sidebar panels throughout
 * the application.
 *
 * @param props - SidebarDemo configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * SidebarDemo({
 *   title: 'Related Cases',
 *   titleIcon: 'fa-briefcase',
 *   count: 5,
 *   items: [
 *     { label: 'Investigation #1', sublabel: 'Active', icon: 'fa-briefcase', iconColor: 'blue' },
 *     { label: 'Investigation #2', sublabel: 'Completed', icon: 'fa-briefcase', iconColor: 'green', isCompleted: true }
 *   ],
 *   viewAllText: 'View all cases'
 * })
 * ```
 */
export function SidebarDemo(props: SidebarDemoProps): string {
  const {
    title,
    titleIcon = 'fa-folder',
    items,
    count,
    viewAllText = 'View all',
    viewAllHref = '#',
    showAddButton = true,
    description,
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn('', className);

  const itemsHtml = items.map((item) => {
    const labelClass = item.isCompleted ? 'text-gray-500 line-through' : 'text-gray-900';
    const sublabelClass = item.isCompleted ? 'text-gray-400' : `text-${item.iconColor}-600`;
    const iconName = item.isCompleted ? 'fa-circle-check' : item.icon;
    const iconColor = item.isCompleted ? 'gray' as ColorScheme : item.iconColor;

    const sublabelHtml = item.sublabel
      ? `<div class="text-xs ${sublabelClass}">${item.sublabel}</div>`
      : '';

    const iconHtml = IconContainer({
      icon: iconName,
      color: iconColor,
      size: 'xs',
      rounded: 'default',
    });

    return html`
      <a href="${item.href || '#'}" class="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-50 transition-colors">
        ${raw(iconHtml)}
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium ${labelClass} truncate">${item.label}</div>
          ${raw(sublabelHtml)}
        </div>
      </a>
    `;
  });

  const countBadge = count !== undefined
    ? `<span class="bg-gray-100 text-gray-600 text-xs font-medium px-1.5 py-0.5 rounded">${count}</span>`
    : '';

  const addButton = showAddButton
    ? `<button class="text-xs text-gray-500 hover:text-gray-700"><i class="fa-solid fa-plus mr-1"></i>Add</button>`
    : '';

  const descriptionHtml = description
    ? `<p class="text-xs text-gray-500 mt-3">${description}</p>`
    : '';

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      <div class="bg-gray-100 rounded-lg p-4">
        <div class="bg-white rounded-lg border border-gray-200 shadow-sm w-full max-w-64">
          <!-- Header -->
          <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div class="flex items-center gap-2">
              <i class="fa-solid ${titleIcon} text-blue-600 text-sm"></i>
              <span class="text-sm font-semibold text-gray-900">${title}</span>
            </div>
            ${raw(countBadge)}
          </div>

          <!-- Items -->
          <div class="p-2 space-y-1">
            ${joinHtml(itemsHtml)}
          </div>

          <!-- Footer -->
          <div class="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
            <a href="${viewAllHref}" class="text-xs text-blue-600 hover:text-blue-800 font-medium">${viewAllText}</a>
            ${raw(addButton)}
          </div>
        </div>
      </div>
      ${raw(descriptionHtml)}
    </div>
  `;
}
