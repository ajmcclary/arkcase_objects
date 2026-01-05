/**
 * InteractionStateCard component for demonstrating UI states.
 * @module components/ui/InteractionStateCard
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import type { BaseComponentProps, ColorScheme } from '../../types';

/**
 * Interaction state types.
 */
export type InteractionState = 'default' | 'hover' | 'selected' | 'focus' | 'disabled' | 'loading';

/**
 * State badge configurations.
 */
const STATE_BADGES: Record<InteractionState, { bg: string; text: string }> = {
  default: { bg: 'bg-gray-100', text: 'text-gray-700' },
  hover: { bg: 'bg-blue-100', text: 'text-blue-700' },
  selected: { bg: 'bg-blue-100', text: 'text-blue-700' },
  focus: { bg: 'bg-purple-100', text: 'text-purple-700' },
  disabled: { bg: 'bg-gray-200', text: 'text-gray-600' },
  loading: { bg: 'bg-amber-100', text: 'text-amber-700' },
};

/**
 * State card styles.
 */
const STATE_CARD_STYLES: Record<InteractionState, string> = {
  default: 'bg-white border border-gray-200',
  hover: 'bg-gray-100 border border-gray-300 shadow-md cursor-pointer',
  selected: 'bg-blue-50 border-2 border-blue-600',
  focus: 'bg-white border-2 border-blue-500 ring-2 ring-blue-200 ring-offset-2',
  disabled: 'bg-gray-50 border border-gray-200 opacity-50 cursor-not-allowed',
  loading: 'bg-white border border-gray-200 animate-pulse',
};

/**
 * Props for the InteractionStateCard component.
 */
export interface InteractionStateCardProps extends BaseComponentProps {
  /** The interaction state to display */
  state: InteractionState;
  /** State label */
  label: string;
  /** Sample title for the card */
  title?: string;
  /** Sample ID for the card */
  objectId?: string;
  /** Sample status */
  status?: string;
  /** Description of this state */
  description: string;
  /** Icon for the object */
  icon?: string;
  /** Icon color scheme */
  iconColor?: ColorScheme;
}

/**
 * Renders an interaction state demonstration card.
 *
 * Shows how cards appear in different UI states (hover, selected, etc.)
 * for design system documentation.
 *
 * @param props - InteractionStateCard configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * InteractionStateCard({
 *   state: 'hover',
 *   label: 'Hover',
 *   title: 'Review Case Documents',
 *   objectId: 'CASE-2024-0847',
 *   status: 'In Progress',
 *   description: 'Background shifts, border darkens on hover'
 * })
 * ```
 */
export function InteractionStateCard(props: InteractionStateCardProps): string {
  const {
    state,
    label,
    title = 'Review Case Documents',
    objectId = 'CASE-2024-0847',
    status = 'In Progress',
    description,
    icon = 'fa-briefcase',
    iconColor = 'blue',
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn('space-y-3', className);
  const badgeStyle = STATE_BADGES[state];
  const cardStyle = STATE_CARD_STYLES[state];

  // For loading state, show skeleton
  const cardContent = state === 'loading'
    ? html`
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
        <div class="flex-1 min-w-0 space-y-2">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
          <div class="h-5 bg-gray-200 rounded w-20 mt-2"></div>
        </div>
      </div>
    `
    : html`
      <div class="flex items-start gap-3">
        <div class="w-10 h-10 ${state === 'disabled' ? 'bg-gray-200' : `bg-${iconColor}-100`} rounded-lg flex items-center justify-center flex-shrink-0">
          <i class="fa-solid ${icon} ${state === 'disabled' ? 'text-gray-400' : `text-${iconColor}-600`}"></i>
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-semibold ${state === 'disabled' ? 'text-gray-400' : 'text-gray-900'} truncate">${title}</h4>
          <p class="text-xs ${state === 'disabled' ? 'text-gray-400' : 'text-gray-500'} mt-0.5">${objectId}</p>
          <div class="flex items-center gap-2 mt-2">
            <span class="px-2 py-0.5 text-xs font-medium rounded-full ${state === 'disabled' ? 'bg-gray-200 text-gray-500' : 'bg-blue-100 text-blue-800'}">${status}</span>
          </div>
        </div>
      </div>
    `;

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      <div class="flex items-center gap-2">
        <span class="px-2 py-1 text-xs font-medium rounded ${badgeStyle.bg} ${badgeStyle.text}">${label}</span>
      </div>
      <div class="${cardStyle} rounded-lg p-4">
        ${raw(cardContent)}
      </div>
      <p class="text-xs text-gray-500">${description}</p>
    </div>
  `;
}
