/**
 * Sidebar component for navigation.
 * @module components/layout/Sidebar
 */

import { html, raw, joinHtml } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import type { SidebarProps, NavItem, NavGroup } from '../../types';

/**
 * Renders a single navigation item.
 *
 * @param item - Navigation item configuration
 * @returns HTML string
 */
function NavItemComponent(item: NavItem): string {
  const classes = cn(
    'flex items-center px-3 py-2 text-sm rounded-lg',
    item.isActive
      ? 'font-medium text-indigo-600 bg-indigo-50'
      : 'text-gray-700 hover:bg-gray-100'
  );

  const iconClasses = cn(
    'fa-solid',
    item.icon,
    'w-5',
    item.isActive ? 'text-indigo-600' : 'text-gray-400'
  );

  return html`<a href="${item.href}" class="${classes}"><i class="${iconClasses}"></i><span class="ml-3">${item.label}</span></a>`;
}

/**
 * Renders a navigation group with title and items.
 *
 * @param group - Navigation group configuration
 * @returns HTML string
 */
function NavGroupComponent(group: NavGroup): string {
  const items = group.items.map((item) => NavItemComponent(item));

  return html`
    <div class="px-3 mb-4">
      <div class="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
        ${group.title}
      </div>
      ${joinHtml(items, '\n')}
    </div>
  `;
}

/**
 * Renders the sidebar navigation component.
 *
 * A fixed sidebar with navigation groups and items. On mobile, the sidebar
 * is hidden off-screen and can be toggled with the hamburger menu.
 * Automatically highlights the active page based on the activePage prop.
 *
 * @param props - Sidebar configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * import { DEFAULT_NAVIGATION } from '../../constants/navigation';
 *
 * // Basic usage with default navigation
 * Sidebar({
 *   navigation: DEFAULT_NAVIGATION,
 *   activePage: 'Case.html'
 * })
 *
 * // Custom navigation
 * Sidebar({
 *   navigation: [
 *     {
 *       title: 'Core Objects',
 *       items: [
 *         { label: 'Case', href: 'Case.html', icon: 'fa-briefcase' }
 *       ]
 *     }
 *   ],
 *   activePage: 'Case.html'
 * })
 * ```
 */
export function Sidebar(props: SidebarProps): string {
  const {
    navigation,
    activePage,
    showHomeLink = true,
    homeLinkLabel = 'Wireframe Index',
    id = 'sidebar',
    className,
    dataAttributes = {},
  } = props;

  // Mark active item based on activePage prop
  const navWithActive = navigation.map((group) => ({
    ...group,
    items: group.items.map((item) => ({
      ...item,
      isActive: item.isActive ?? item.href === activePage,
    })),
  }));

  const groups = navWithActive.map((group) => NavGroupComponent(group));

  const classes = cn(
    'sidebar-loading fixed left-0 top-16 bottom-0 w-64',
    'bg-white border-r border-gray-200 overflow-y-auto z-40',
    'transform -translate-x-full md:translate-x-0',
    'transition-transform duration-300 ease-in-out',
    className
  );

  const isHomeActive = activePage === 'index.html';
  const homeLinkClasses = cn(
    'flex items-center px-3 py-2 text-sm rounded-lg',
    isHomeActive
      ? 'font-medium text-indigo-600 bg-indigo-50'
      : 'text-gray-700 hover:bg-gray-100'
  );
  const homeIconClasses = cn(
    'fa-solid fa-home w-5',
    isHomeActive ? 'text-indigo-600' : 'text-gray-400'
  );

  const homeLinkHtml = showHomeLink
    ? html`
      <div class="px-3 mb-4">
        <a href="index.html" class="${homeLinkClasses}">
          <i class="${homeIconClasses}"></i>
          <span class="ml-3">${homeLinkLabel}</span>
        </a>
      </div>
    `
    : '';

  return html`
    <!-- Sidebar Backdrop (mobile) -->
    <div
      id="sidebar-backdrop"
      class="fixed inset-0 bg-gray-900/50 z-40 md:hidden hidden opacity-0 transition-opacity duration-300"
      aria-hidden="true"
    ></div>

    <!-- Sidebar -->
    <aside${raw(buildAttrs(id, dataAttributes))} class="${classes}">
      <!-- Mobile close button -->
      <button
        id="sidebar-close"
        class="md:hidden absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Close navigation menu"
      >
        <i class="fa-solid fa-xmark text-lg"></i>
      </button>

      <nav class="py-4 pt-12 md:pt-4">
        ${raw(homeLinkHtml)}
        ${joinHtml(groups, '\n')}
      </nav>
    </aside>
  `;
}
