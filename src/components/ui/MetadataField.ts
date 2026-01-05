/**
 * MetadataField component for displaying label-value pairs.
 * @module components/ui/MetadataField
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { HIGHLIGHT_COLORS } from '../../constants/status';
import { buildAttrs } from '../../utils/attributes';
import type { MetadataFieldProps } from '../../types';

/**
 * Renders a metadata field component.
 *
 * Displays a label-value pair, commonly used in cards and detail views.
 * Supports stacked (label above value) or inline (label beside value) layouts.
 *
 * @param props - MetadataField configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * // Basic stacked layout
 * MetadataField({ label: 'Priority', value: 'High' })
 *
 * // With icon
 * MetadataField({ label: 'Due Date', value: 'Dec 28, 2024', icon: 'fa-calendar' })
 *
 * // With highlight (for important values)
 * MetadataField({ label: 'Status', value: 'Overdue', highlight: 'danger' })
 *
 * // Inline layout
 * MetadataField({ label: 'Assigned To', value: 'John Doe', layout: 'inline' })
 * ```
 */
export function MetadataField(props: MetadataFieldProps): string {
  const {
    label,
    value,
    icon,
    highlight,
    layout = 'stacked',
    id,
    className,
    dataAttributes = {},
  } = props;

  const valueColorClass = highlight ? HIGHLIGHT_COLORS[highlight] : 'text-gray-900';

  if (layout === 'inline') {
    const classes = cn('flex items-center gap-2 text-sm', className);
    const iconHtml = icon
      ? html`<i class="fa-solid ${icon} text-gray-400"></i>`
      : '';

    return html`<div${raw(buildAttrs(id, dataAttributes))} class="${classes}">${raw(iconHtml)}<span class="text-gray-500">${label}:</span> <span class="${valueColorClass} font-medium">${value}</span></div>`;
  }

  // Stacked layout (default)
  const classes = cn('', className);
  const iconHtml = icon
    ? html`<i class="fa-regular ${icon} text-gray-400 mr-1"></i>`
    : '';

  return html`<div${raw(buildAttrs(id, dataAttributes))} class="${classes}"><div class="text-xs text-gray-600 font-medium uppercase tracking-wide mb-1">${raw(iconHtml)}${label}</div><div class="text-sm font-medium ${valueColorClass}">${value}</div></div>`;
}
