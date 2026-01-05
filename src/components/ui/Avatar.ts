/**
 * Avatar component for displaying user images or initials.
 * @module components/ui/Avatar
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { GRADIENT_COLORS } from '../../constants/colors';
import { AVATAR_SIZES, AVATAR_STATUS_SIZES } from '../../constants/sizes';
import type { AvatarProps } from '../../types';

/**
 * Renders an avatar component.
 *
 * Displays a user's profile image, initials, or a default icon.
 * Supports optional online/offline status indicator.
 *
 * @param props - Avatar configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * // With image
 * Avatar({ src: 'https://example.com/photo.jpg', alt: 'John Doe' })
 *
 * // With initials
 * Avatar({ alt: 'John Doe', initials: 'JD', color: 'blue' })
 *
 * // With online status
 * Avatar({ alt: 'Jane Smith', initials: 'JS', showStatus: true, isOnline: true })
 *
 * // Large size
 * Avatar({ src: 'photo.jpg', alt: 'User', size: 'lg' })
 * ```
 */
export function Avatar(props: AvatarProps): string {
  const {
    src,
    alt,
    initials,
    size = 'md',
    color = 'blue',
    showStatus = false,
    isOnline = false,
    id,
    className,
    dataAttributes = {},
  } = props;

  const sizeClasses = AVATAR_SIZES[size];
  const statusSizeClasses = AVATAR_STATUS_SIZES[size];

  // Image avatar
  if (src) {
    const wrapperClasses = cn('relative inline-block', className);
    const imgClasses = cn(
      'rounded-full object-cover border-2 border-white',
      sizeClasses
    );

    const statusHtml = showStatus
      ? html`<span class="absolute bottom-0 right-0 block ${statusSizeClasses} rounded-full ring-2 ring-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}"></span>`
      : '';

    return html`<div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}"><img src="${src}" alt="${alt}" class="${imgClasses}" />${raw(statusHtml)}</div>`;
  }

  // Initials avatar
  const gradient = GRADIENT_COLORS[color];
  const wrapperClasses = cn('relative inline-block', className);
  const avatarClasses = cn(
    'rounded-full flex items-center justify-center text-white font-medium',
    sizeClasses,
    gradient
  );

  const displayInitials = initials || alt.charAt(0).toUpperCase();

  const statusHtml = showStatus
    ? html`<span class="absolute bottom-0 right-0 block ${statusSizeClasses} rounded-full ring-2 ring-white ${isOnline ? 'bg-green-500' : 'bg-gray-400'}"></span>`
    : '';

  return html`<div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}"><div class="${avatarClasses}" title="${alt}">${displayInitials}</div>${raw(statusHtml)}</div>`;
}
