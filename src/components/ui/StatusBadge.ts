/**
 * StatusBadge component for displaying status indicators.
 * @module components/ui/StatusBadge
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { STATUS_COLORS, STATUS_LABELS } from '../../constants/status';
import { BADGE_SIZES } from '../../constants/sizes';
import type { StatusBadgeProps } from '../../types';

/**
 * Renders a status badge component.
 *
 * A colored pill or tag that indicates the status of an object.
 * Automatically maps status values to appropriate colors and labels.
 *
 * @param props - StatusBadge configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * // Basic usage with automatic color and label
 * StatusBadge({ status: 'active' })
 * // <span class="... bg-green-100 text-green-800">Active</span>
 *
 * // Custom label
 * StatusBadge({ status: 'pending', label: 'Awaiting Review' })
 *
 * // Tag variant (less rounded)
 * StatusBadge({ status: 'in-review', variant: 'tag' })
 *
 * // Large size
 * StatusBadge({ status: 'urgent', size: 'lg' })
 *
 * // With icon
 * StatusBadge({ status: 'active', icon: 'fa-check' })
 * ```
 */
export function StatusBadge(props: StatusBadgeProps): string {
  const {
    status,
    label = STATUS_LABELS[status],
    size = 'md',
    variant = 'pill',
    icon,
    id,
    className,
    dataAttributes = {},
  } = props;

  const colors = STATUS_COLORS[status];
  const rounded = variant === 'pill' ? 'rounded-full' : 'rounded-md';

  const classes = cn(
    'inline-flex items-center font-medium',
    BADGE_SIZES[size],
    rounded,
    colors.bg,
    colors.text,
    className
  );

  const iconHtml = icon
    ? html`<i class="fa-solid ${icon} mr-1"></i>`
    : '';

  return html`<span${raw(buildAttrs(id, dataAttributes))} class="${classes}">${raw(iconHtml)}${label}</span>`;
}
