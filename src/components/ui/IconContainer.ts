/**
 * IconContainer component for displaying icons in colored boxes.
 * @module components/ui/IconContainer
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { COLOR_CLASSES } from '../../constants/colors';
import { ICON_CONTAINER_SIZES } from '../../constants/sizes';
import type { IconContainerProps } from '../../types';

/**
 * Renders a colored icon container.
 *
 * A box with a colored background containing a Font Awesome icon.
 * Commonly used in cards and list items to visually identify object types.
 *
 * @param props - IconContainer configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * // Basic usage
 * IconContainer({ icon: 'fa-briefcase', color: 'blue' })
 *
 * // Large size with different rounding
 * IconContainer({ icon: 'fa-user', color: 'green', size: 'lg', rounded: 'xl' })
 *
 * // Small with full rounding (circle)
 * IconContainer({ icon: 'fa-star', color: 'amber', size: 'sm', rounded: 'full' })
 * ```
 */
export function IconContainer(props: IconContainerProps): string {
  const {
    icon,
    color,
    size = 'md',
    rounded = 'lg',
    id,
    className,
    dataAttributes = {},
  } = props;

  const colors = COLOR_CLASSES[color];

  // Handle 'default' rounded option (maps to 'rounded' class, not 'rounded-default')
  const roundedClass = rounded === 'default' ? 'rounded' : `rounded-${rounded}`;

  const classes = cn(
    'flex items-center justify-center flex-shrink-0',
    roundedClass,
    ICON_CONTAINER_SIZES[size],
    colors.bg,
    colors.bgHover,
    'transition-colors',
    className
  );

  const iconClasses = cn('fa-solid', icon, colors.text);

  return html`<div${raw(buildAttrs(id, dataAttributes))} class="${classes}"><i class="${iconClasses}"></i></div>`;
}
