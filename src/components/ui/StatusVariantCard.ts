/**
 * StatusVariantCard component for displaying status states.
 * @module components/ui/StatusVariantCard
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { StatusBadge } from './StatusBadge';
import type { Status, BaseComponentProps } from '../../types';

/**
 * Props for the StatusVariantCard component.
 */
export interface StatusVariantCardProps extends BaseComponentProps {
  /** Status type */
  status: Status;
  /** Display label for the status (optional, uses default from constants) */
  label?: string;
  /** Title/heading */
  title: string;
  /** Description text */
  description: string;
  /** Optional icon prefix in badge */
  badgeIcon?: string;
  /** Object type icon */
  objectIcon?: string;
}

/**
 * Renders a status variant card for documentation.
 *
 * Displays a status badge with explanation text, used in
 * status documentation sections.
 *
 * @param props - StatusVariantCard configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * StatusVariantCard({
 *   status: 'active',
 *   label: 'Active',
 *   title: 'Case currently active',
 *   description: 'Case is being actively investigated'
 * })
 * ```
 */
export function StatusVariantCard(props: StatusVariantCardProps): string {
  const {
    status,
    label,
    title,
    description,
    badgeIcon,
    objectIcon = 'fa-briefcase',
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn(
    'bg-white border border-gray-200 rounded-lg p-4',
    className
  );

  const badgeHtml = StatusBadge({
    status,
    label,
    variant: 'tag',
    size: 'lg',
    icon: badgeIcon,
  });

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      <div class="flex items-center justify-between mb-3">
        ${raw(badgeHtml)}
        <i class="fa-solid ${objectIcon} text-gray-400"></i>
      </div>
      <h4 class="font-medium text-gray-900 mb-2">${title}</h4>
      <p class="text-xs text-gray-600">${description}</p>
    </div>
  `;
}
