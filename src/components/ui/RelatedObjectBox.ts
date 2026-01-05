/**
 * RelatedObjectBox component for displaying related object counts.
 * @module components/ui/RelatedObjectBox
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { IconContainer } from './IconContainer';
import type { BaseComponentProps, ColorScheme, IconName } from '../../types';

/**
 * Props for the RelatedObjectBox component.
 */
export interface RelatedObjectBoxProps extends BaseComponentProps {
  /** Label for the related object type (e.g., "Documents") */
  label: string;
  /** Count of related objects */
  count: number;
  /** Icon for the object type */
  icon: IconName;
  /** Color scheme for the icon container */
  color: ColorScheme;
}

/**
 * Renders a related object count box.
 *
 * Displays an icon, label, and count for a type of related object.
 * Commonly used in summary sections showing linked entities.
 *
 * @param props - RelatedObjectBox configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * RelatedObjectBox({
 *   label: 'Documents',
 *   count: 12,
 *   icon: 'fa-file-alt',
 *   color: 'blue'
 * })
 * ```
 */
export function RelatedObjectBox(props: RelatedObjectBoxProps): string {
  const {
    label,
    count,
    icon,
    color,
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn(
    'flex items-center space-x-3 p-3 bg-gray-50 rounded-lg',
    className
  );

  const iconHtml = IconContainer({
    icon,
    color,
    size: 'md',
  });

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      ${raw(iconHtml)}
      <div>
        <div class="text-xs text-gray-500">${label}</div>
        <div class="text-lg font-bold text-gray-900">${count}</div>
      </div>
    </div>
  `;
}
