/**
 * ParticipantItem component for displaying participant rows.
 * @module components/ui/ParticipantItem
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { Avatar } from './Avatar';
import type { BaseComponentProps, AvatarProps } from '../../types';

/**
 * Props for the ParticipantItem component.
 */
export interface ParticipantItemProps extends BaseComponentProps {
  /** Participant name */
  name: string;
  /** Participant role */
  role: string;
  /** Avatar configuration */
  avatar: Omit<AvatarProps, 'size'>;
  /** Optional participant type badge (e.g., "Lead", "Reviewer") */
  participantType?: string;
  /** Avatar size */
  avatarSize?: 'sm' | 'md' | 'lg';
}

/**
 * Renders a participant item row.
 *
 * Displays a participant with avatar, name, role, and optional type badge.
 * Commonly used in participant lists within cards and panels.
 *
 * @param props - ParticipantItem configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * ParticipantItem({
 *   name: 'John Smith',
 *   role: 'Senior Investigator',
 *   participantType: 'Lead',
 *   avatar: { alt: 'John Smith', initials: 'JS', color: 'blue' }
 * })
 * ```
 */
export function ParticipantItem(props: ParticipantItemProps): string {
  const {
    name,
    role,
    avatar,
    participantType,
    avatarSize = 'md',
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn('flex items-center gap-3 py-2', className);

  const avatarHtml = Avatar({
    ...avatar,
    size: avatarSize,
  });

  const typeBadgeHtml = participantType
    ? html`<span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">${participantType}</span>`
    : '';

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      ${raw(avatarHtml)}
      <div class="flex-1 min-w-0">
        <div class="text-sm font-medium text-gray-900">${name}</div>
        <div class="text-xs text-gray-500">${role}</div>
      </div>
      ${raw(typeBadgeHtml)}
    </div>
  `;
}
