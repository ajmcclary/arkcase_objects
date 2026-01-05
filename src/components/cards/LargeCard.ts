/**
 * LargeCard component for detailed views.
 * @module components/cards/LargeCard
 */

import { html, raw, joinHtml } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { StatusBadge } from '../ui/StatusBadge';
import { IconContainer } from '../ui/IconContainer';
import { Button } from '../ui/Button';
import { MetadataField } from '../ui/MetadataField';
import { TimelineItem } from '../ui/TimelineItem';
import { ParticipantItem } from '../ui/ParticipantItem';
import { RelatedObjectBox } from '../ui/RelatedObjectBox';
import { PRIORITY_ICON_COLORS } from '../../constants/status';
import type { LargeCardProps, CardParticipant, RelatedObjectCount, CardAction } from '../../types';

/**
 * Renders a participant from CardParticipant data.
 */
function renderParticipant(participant: CardParticipant): string {
  return ParticipantItem({
    name: participant.name,
    role: participant.role,
    avatar: participant.avatar,
    participantType: participant.participantType,
    avatarSize: 'md',
  });
}

/**
 * Renders a related object count from RelatedObjectCount data.
 */
function renderRelatedObject(obj: RelatedObjectCount): string {
  return RelatedObjectBox({
    label: obj.label,
    count: obj.count,
    icon: obj.icon,
    color: obj.color,
  });
}

/**
 * Renders a large card component.
 *
 * A detailed card with collapsible sections, participants list,
 * related object counts, activity timeline, and action buttons.
 *
 * @param props - LargeCard configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * LargeCard({
 *   title: 'Employee Misconduct Investigation',
 *   objectId: 'CASE-2024-0847',
 *   objectType: 'Case File',
 *   status: 'active',
 *   icon: 'fa-folder-open',
 *   iconColor: 'blue',
 *   priority: 'high',
 *   showPriorityIcon: true,
 *   description: 'Investigation into reported misconduct by an employee...',
 *   metadata: [
 *     { label: 'Priority', value: 'High' },
 *     { label: 'Queue', value: 'Investigations' },
 *     { label: 'Created', value: 'Dec 15, 2024' }
 *   ],
 *   participants: [
 *     { name: 'John Smith', role: 'Investigator', avatar: { alt: 'JS', initials: 'JS' } }
 *   ],
 *   relatedObjects: [
 *     { label: 'Documents', count: 12, icon: 'fa-file-alt', color: 'blue' }
 *   ],
 *   actions: [
 *     { label: 'Save', variant: 'primary' },
 *     { label: 'Cancel', variant: 'secondary' }
 *   ]
 * })
 * ```
 */
export function LargeCard(props: LargeCardProps): string {
  const {
    title,
    objectId,
    objectType = 'Case File',
    status,
    icon,
    iconColor,
    priority,
    showPriorityIcon = false,
    description,
    metadata = [],
    participants = [],
    maxParticipants = 5,
    relatedObjects = [],
    activities = [],
    maxActivities = 3,
    sections = [],
    actions = [],
    isClickable = false,
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn(
    'bg-white rounded-lg border border-gray-200',
    'hover:shadow-lg transition-shadow',
    className
  );

  const iconHtml = IconContainer({ icon, color: iconColor, size: 'lg' });
  const badgeHtml = StatusBadge({ status, variant: 'tag', size: 'lg' });

  const priorityIconHtml = showPriorityIcon && priority
    ? html`<i class="fa-solid fa-star ${PRIORITY_ICON_COLORS[priority]}" title="${priority} Priority"></i>`
    : '';

  // Description box
  const descriptionHtml = description
    ? html`
      <div class="bg-gray-50 rounded-lg p-4 mb-4">
        <p class="text-sm text-gray-700 leading-relaxed">${description}</p>
      </div>
    `
    : '';

  // Metadata section
  const metadataHtml = metadata.length > 0
    ? html`
      <div class="p-6 border-b border-gray-200">
        <button class="w-full flex items-center justify-between text-left group mb-4" aria-expanded="true">
          <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Case Details</h4>
          <i class="fa-solid fa-chevron-up text-gray-400 group-hover:text-gray-600 transition-transform"></i>
        </button>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${joinHtml(metadata.map((field) => MetadataField({ label: field.label, value: String(field.value), highlight: field.highlight })))}
        </div>
      </div>
    `
    : '';

  // Participants section
  const visibleParticipants = participants.slice(0, maxParticipants);
  const remainingParticipants = participants.length - maxParticipants;

  const participantsHtml = participants.length > 0
    ? html`
      <div class="p-6 border-b border-gray-200">
        <button class="w-full flex items-center justify-between text-left group mb-4" aria-expanded="true">
          <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">
            Participants <span class="text-gray-400 normal-case font-normal">(${participants.length})</span>
          </h4>
          <i class="fa-solid fa-chevron-up text-gray-400 group-hover:text-gray-600 transition-transform"></i>
        </button>
        <div class="divide-y divide-gray-100">
          ${joinHtml(visibleParticipants.map((p) => renderParticipant(p)))}
        </div>
        ${remainingParticipants > 0 ? html`
          <button class="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all ${participants.length} participants
          </button>
        ` : ''}
      </div>
    `
    : '';

  // Related objects section
  const relatedObjectsHtml = relatedObjects.length > 0
    ? html`
      <div class="p-6 border-b border-gray-200">
        <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Related Objects</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          ${joinHtml(relatedObjects.map((obj) => renderRelatedObject(obj)))}
        </div>
      </div>
    `
    : '';

  // Activity timeline section
  const visibleActivities = activities.slice(0, maxActivities);
  const timelineItemsHtml = visibleActivities.map((activity, index) =>
    TimelineItem({
      title: activity.title,
      description: activity.description,
      user: activity.user,
      userInitials: activity.userInitials,
      timestamp: activity.timestamp,
      icon: activity.icon || 'fa-circle',
      iconColor: activity.iconColor || 'blue',
      isLast: index === visibleActivities.length - 1,
    })
  );

  const activitiesHtml = activities.length > 0
    ? html`
      <div class="p-6 border-b border-gray-200">
        <button class="w-full flex items-center justify-between text-left group mb-4" aria-expanded="true">
          <h4 class="text-sm font-semibold text-gray-900 uppercase tracking-wider">Recent Activity</h4>
          <i class="fa-solid fa-chevron-up text-gray-400 group-hover:text-gray-600 transition-transform"></i>
        </button>
        <div class="relative pl-8 border-l-2 border-gray-200 space-y-4">
          ${joinHtml(timelineItemsHtml)}
        </div>
        ${raw(activities.length > maxActivities ? html`
          <button class="mt-4 text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all ${activities.length} activities
          </button>
        ` : '')}
      </div>
    `
    : '';

  // Actions section
  const actionsHtml = actions.length > 0
    ? html`
      <div class="p-6">
        <div class="flex flex-wrap gap-3">
          ${joinHtml(actions.map((action: CardAction) => Button({
            label: action.label,
            variant: action.variant || 'secondary',
            href: action.href,
            onClick: action.onClick,
            icon: action.icon,
            className: 'flex-1 sm:flex-none',
          })))}
        </div>
      </div>
    `
    : '';

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      <!-- Header Section -->
      <div class="p-6 border-b border-gray-200">
        <div class="flex items-start justify-between mb-4">
          <div class="flex items-center">
            ${raw(iconHtml)}
            <div class="ml-4">
              <div class="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">${objectType}</div>
              <h3 class="text-xl font-bold text-gray-900">${title}</h3>
              <p class="text-sm text-gray-500 mt-1">${objectId}</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            ${raw(badgeHtml)}
            ${raw(priorityIconHtml)}
            <button class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded transition-colors ml-2">
              <i class="fa-solid fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
        ${raw(descriptionHtml)}
      </div>

      ${raw(metadataHtml)}
      ${raw(participantsHtml)}
      ${raw(relatedObjectsHtml)}
      ${raw(activitiesHtml)}
      ${raw(actionsHtml)}
    </div>
  `;
}
