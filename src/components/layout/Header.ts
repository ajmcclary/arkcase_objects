/**
 * Header component for the main navigation bar.
 * @module components/layout/Header
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import type { HeaderProps } from '../../types';

/**
 * Renders the fixed header navigation bar.
 *
 * Contains the ArkCase logo, mobile hamburger menu toggle, and
 * optional "Design System" badge. The header is fixed at the top
 * of the viewport with z-index 50.
 *
 * @param props - Header configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * // Default header
 * Header({})
 *
 * // Custom badge text
 * Header({ badgeText: 'Wireframes', badgeSubtext: 'Component Library' })
 *
 * // Without badge
 * Header({ showBadge: false })
 * ```
 */
export function Header(props: HeaderProps): string {
  const {
    homeUrl = 'index.html',
    showBadge = true,
    badgeText = 'Design System',
    badgeSubtext = 'Wireframe Collection',
    id = 'header',
    className,
    dataAttributes = {},
  } = props;

  const classes = cn(
    'fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16',
    className
  );

  const badgeHtml = showBadge
    ? html`
      <div class="ml-8 hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
        <i class="fa-solid fa-palette text-indigo-600 mr-2"></i>
        <div>
          <div class="text-sm font-semibold text-gray-900">${badgeText}</div>
          <div class="text-xs text-gray-500">${badgeSubtext}</div>
        </div>
      </div>
    `
    : '';

  return html`
    <nav${raw(buildAttrs(id, dataAttributes))} class="${classes}">
      <div class="flex items-center justify-between h-full px-4 md:px-6">
        <!-- Left side: Hamburger + Logo -->
        <div class="flex items-center">
          <!-- Mobile hamburger menu -->
          <button
            id="sidebar-toggle"
            class="md:hidden p-2 -ml-1 mr-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
            aria-expanded="false"
            aria-controls="sidebar"
          >
            <i class="fa-solid fa-bars text-xl"></i>
          </button>

          <!-- Logo -->
          <a href="${homeUrl}" class="flex items-center">
            <div class="bg-indigo-600 text-white w-9 h-9 flex items-center justify-center font-bold rounded-lg mr-3">
              A
            </div>
            <span class="text-xl font-bold text-gray-900">ArkCase</span>
          </a>

          ${raw(badgeHtml)}
        </div>

        <!-- Right side: placeholder for future nav items -->
        <div class="flex items-center space-x-2">
          <!-- Add search, notifications, user menu here if needed -->
        </div>
      </div>
    </nav>
  `;
}
