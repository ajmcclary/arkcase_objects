/**
 * AvatarGroup component for displaying multiple avatars.
 * @module components/ui/AvatarGroup
 */

import { html, raw, joinHtml } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { Avatar } from './Avatar';
import { AVATAR_GROUP_SIZES } from '../../constants/sizes';
import type { AvatarGroupProps } from '../../types';

/**
 * Renders an avatar group component.
 *
 * Displays multiple avatars in a stacked, overlapping layout.
 * Shows "+X more" indicator when there are more avatars than the max.
 *
 * @param props - AvatarGroup configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * // Basic usage
 * AvatarGroup({
 *   avatars: [
 *     { src: 'user1.jpg', alt: 'John Doe' },
 *     { src: 'user2.jpg', alt: 'Jane Smith' },
 *     { alt: 'Bob Wilson', initials: 'BW' }
 *   ]
 * })
 *
 * // With max limit
 * AvatarGroup({
 *   avatars: [...fiveAvatars],
 *   max: 3
 * })
 * // Shows 3 avatars + "+2" indicator
 *
 * // Large size
 * AvatarGroup({
 *   avatars: [...avatars],
 *   size: 'lg',
 *   max: 4
 * })
 * ```
 */
export function AvatarGroup(props: AvatarGroupProps): string {
  const {
    avatars,
    max = 3,
    size = 'md',
    id,
    className,
    dataAttributes = {},
  } = props;

  const visibleAvatars = avatars.slice(0, max);
  const overflowCount = avatars.length - max;

  const wrapperClasses = cn('flex items-center', className);

  // Render visible avatars
  const avatarElements = visibleAvatars.map((avatar) =>
    Avatar({
      ...avatar,
      size,
      className: 'border-2 border-white -ml-2 first:ml-0',
    })
  );

  // Render overflow indicator if needed
  const overflowHtml = overflowCount > 0
    ? html`<div class="${cn(
        'flex items-center justify-center rounded-full bg-gray-200 text-gray-600 font-medium border-2 border-white -ml-2',
        AVATAR_GROUP_SIZES[size]
      )}">+${overflowCount}</div>`
    : '';

  return html`<div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}"><div class="flex -space-x-2">${joinHtml(avatarElements)}</div>${raw(overflowHtml ? html`<span class="text-xs text-gray-500 ml-2">+${overflowCount} more</span>` : '')}</div>`;
}
