/**
 * ResponsiveTable component for documentation tables.
 * @module components/ui/ResponsiveTable
 */

import { html, raw, joinHtml } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import type { BaseComponentProps } from '../../types';

/**
 * Table column configuration.
 */
export interface TableColumn {
  header: string;
  icon?: string;
}

/**
 * Table row configuration.
 */
export interface TableRow {
  cells: string[];
}

/**
 * Props for the ResponsiveTable component.
 */
export interface ResponsiveTableProps extends BaseComponentProps {
  /** Column definitions */
  columns: TableColumn[];
  /** Row data */
  rows: TableRow[];
}

/**
 * Renders a responsive documentation table.
 *
 * Used for displaying responsive behavior guidelines and
 * other tabular documentation content.
 *
 * @param props - ResponsiveTable configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * ResponsiveTable({
 *   columns: [
 *     { header: 'Variant' },
 *     { header: 'Desktop (1024px+)', icon: 'fa-desktop' },
 *     { header: 'Tablet (768-1023px)', icon: 'fa-tablet-screen-button' },
 *     { header: 'Mobile (<768px)', icon: 'fa-mobile-screen' }
 *   ],
 *   rows: [
 *     { cells: ['Small', '3 columns', '2 columns', '1 column'] },
 *     { cells: ['Medium', '2 columns', '2 columns', '1 column'] },
 *     { cells: ['Large', '1 column', '1 column', '1 column'] }
 *   ]
 * })
 * ```
 */
export function ResponsiveTable(props: ResponsiveTableProps): string {
  const {
    columns,
    rows,
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn(
    'bg-white border border-gray-200 rounded-lg overflow-hidden',
    className
  );

  const headerCells = columns.map((col) => {
    const iconHtml = col.icon ? `<i class="fa-solid ${col.icon} mr-2"></i>` : '';
    return html`
      <th class="px-6 py-3 text-left font-semibold text-gray-900">
        ${raw(iconHtml)}${col.header}
      </th>
    `;
  });

  const bodyRows = rows.map((row) => html`
    <tr>
      ${joinHtml(row.cells.map((cell, index) => html`
        <td class="px-6 py-4 ${index === 0 ? 'font-medium text-gray-900' : 'text-gray-700'}">${cell}</td>
      `))}
    </tr>
  `);

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      <table class="w-full text-sm">
        <thead class="bg-gray-50 border-b border-gray-200">
          <tr>
            ${joinHtml(headerCells)}
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          ${joinHtml(bodyRows)}
        </tbody>
      </table>
    </div>
  `;
}
