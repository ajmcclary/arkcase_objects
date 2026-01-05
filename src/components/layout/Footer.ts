/**
 * Footer component for page footer.
 * @module components/layout/Footer
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import type { FooterProps } from '../../types';

/**
 * Renders the page footer component.
 *
 * A dark gradient footer with copyright information, version, and
 * last updated date. Responsive margin to account for sidebar on desktop.
 *
 * @param props - Footer configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * // Default footer
 * Footer({})
 *
 * // Custom copyright and version
 * Footer({
 *   copyrightYear: 2025,
 *   copyrightHolder: 'My Company',
 *   version: '3.0',
 *   lastUpdated: 'January 2025'
 * })
 * ```
 */
export function Footer(props: FooterProps): string {
  const {
    copyrightYear = new Date().getFullYear(),
    copyrightHolder = 'ArkCase Design System',
    version = '2.0',
    lastUpdated = 'December 2025',
    id = 'footer',
    className,
    dataAttributes = {},
  } = props;

  const classes = cn(
    'ml-0 md:ml-64 bg-gradient-to-r from-gray-800 via-gray-850 to-gray-900 text-white py-12 px-4 md:px-8',
    className
  );

  return html`
    <footer${raw(buildAttrs(id, dataAttributes))} class="${classes}">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <p class="text-sm text-gray-500">
            &copy; ${copyrightYear} ${copyrightHolder}. All rights reserved.
          </p>
          <div class="flex items-center space-x-4 mt-4 md:mt-0">
            <span class="text-xs text-gray-500">Version ${version}</span>
            <span class="text-gray-600">|</span>
            <span class="text-xs text-gray-500">Last updated: ${lastUpdated}</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}
