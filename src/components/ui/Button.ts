/**
 * Button component for interactive actions.
 * @module components/ui/Button
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { BUTTON_SIZES } from '../../constants/sizes';
import type { ButtonProps } from '../../types';

/**
 * Variant classes for different button styles.
 */
const VARIANT_CLASSES = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 border-transparent',
  secondary: 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300',
  ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-transparent',
  danger: 'bg-red-600 text-white hover:bg-red-700 border-transparent',
} as const;

/**
 * Renders a button component.
 *
 * An interactive button with multiple variants, sizes, and optional icons.
 * Can render as a button element or anchor tag when href is provided.
 *
 * @param props - Button configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * // Primary button
 * Button({ label: 'Save Changes', variant: 'primary' })
 *
 * // Secondary button with icon
 * Button({ label: 'Cancel', variant: 'secondary', icon: 'fa-xmark' })
 *
 * // Link styled as button
 * Button({ label: 'View Details', href: '/details', variant: 'ghost' })
 *
 * // Full width button
 * Button({ label: 'Submit', variant: 'primary', fullWidth: true })
 *
 * // Disabled button
 * Button({ label: 'Processing...', variant: 'primary', disabled: true })
 * ```
 */
export function Button(props: ButtonProps): string {
  const {
    label,
    variant = 'primary',
    size = 'md',
    icon,
    iconAfter,
    type = 'button',
    fullWidth = false,
    disabled = false,
    href,
    onClick,
    id,
    className,
    dataAttributes = {},
  } = props;

  const classes = cn(
    'inline-flex items-center justify-center font-medium rounded-lg border transition-colors',
    VARIANT_CLASSES[variant],
    BUTTON_SIZES[size],
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  const iconBeforeHtml = icon
    ? html`<i class="fa-solid ${icon} mr-2"></i>`
    : '';

  const iconAfterHtml = iconAfter
    ? html`<i class="fa-solid ${iconAfter} ml-2"></i>`
    : '';

  const content = html`${raw(iconBeforeHtml)}${label}${raw(iconAfterHtml)}`;

  // Render as anchor if href is provided
  if (href) {
    return html`<a${raw(buildAttrs(id, dataAttributes))} href="${href}" class="${classes}">${raw(content)}</a>`;
  }

  // Render as button
  return html`<button${raw(buildAttrs(id, dataAttributes))} type="${type}" class="${classes}"${raw(disabled ? ' disabled' : '')}${raw(onClick ? ` onclick="${onClick}"` : '')}>${raw(content)}</button>`;
}
