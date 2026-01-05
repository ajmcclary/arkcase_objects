/**
 * StatisticsCard component for displaying metrics.
 * @module components/ui/StatisticsCard
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { COLOR_CLASSES } from '../../constants/colors';
import { buildAttrs } from '../../utils/attributes';
import type { ColorScheme, BaseComponentProps } from '../../types';

/**
 * Props for the StatisticsCard component.
 */
export interface StatisticsCardProps extends BaseComponentProps {
  /** Metric label */
  label: string;
  /** Metric value */
  value: number | string;
  /** Icon name */
  icon?: string;
  /** Color scheme */
  color?: ColorScheme;
  /** Optional trend indicator */
  trend?: {
    direction: 'up' | 'down' | 'neutral';
    value: string;
  };
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether this is the highlighted/active stat */
  isActive?: boolean;
}

/**
 * Size variant classes.
 */
const SIZE_CLASSES = {
  sm: {
    wrapper: 'p-3',
    icon: 'w-8 h-8 text-sm',
    value: 'text-lg',
    label: 'text-xs',
  },
  md: {
    wrapper: 'p-4',
    icon: 'w-10 h-10 text-base',
    value: 'text-2xl',
    label: 'text-sm',
  },
  lg: {
    wrapper: 'p-6',
    icon: 'w-12 h-12 text-lg',
    value: 'text-3xl',
    label: 'text-base',
  },
};

/**
 * Trend indicator colors and icons.
 */
const TREND_STYLES = {
  up: { icon: 'fa-arrow-up', color: 'text-green-600' },
  down: { icon: 'fa-arrow-down', color: 'text-red-600' },
  neutral: { icon: 'fa-minus', color: 'text-gray-400' },
};

/**
 * Renders a statistics card component.
 *
 * Displays a metric with optional icon, trend indicator, and styling.
 * Used in dashboard summary sections.
 *
 * @param props - StatisticsCard configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * StatisticsCard({
 *   label: 'Total Cases',
 *   value: 190,
 *   icon: 'fa-briefcase',
 *   color: 'blue'
 * })
 *
 * StatisticsCard({
 *   label: 'Overdue',
 *   value: 12,
 *   icon: 'fa-clock',
 *   color: 'red',
 *   trend: { direction: 'up', value: '+3' }
 * })
 * ```
 */
export function StatisticsCard(props: StatisticsCardProps): string {
  const {
    label,
    value,
    icon,
    color = 'gray',
    trend,
    size = 'md',
    isActive = false,
    id,
    className,
    dataAttributes = {},
  } = props;

  const sizeStyles = SIZE_CLASSES[size];
  const colorStyles = COLOR_CLASSES[color];

  const wrapperClasses = cn(
    'bg-white rounded-lg border',
    isActive ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-200',
    'hover:shadow-md transition-shadow',
    sizeStyles.wrapper,
    className
  );

  const iconHtml = icon
    ? html`
      <div class="${cn(
        'flex items-center justify-center rounded-lg flex-shrink-0',
        sizeStyles.icon,
        colorStyles.bg
      )}">
        <i class="fa-solid ${icon} ${colorStyles.text}"></i>
      </div>
    `
    : '';

  const trendHtml = trend
    ? html`
      <div class="flex items-center gap-1 ${TREND_STYLES[trend.direction].color}">
        <i class="fa-solid ${TREND_STYLES[trend.direction].icon} text-xs"></i>
        <span class="text-xs font-medium">${trend.value}</span>
      </div>
    `
    : '';

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      <div class="flex items-center gap-3">
        ${raw(iconHtml)}
        <div class="flex-1 min-w-0">
          <div class="flex items-baseline gap-2">
            <span class="${cn('font-bold text-gray-900', sizeStyles.value)}">${value}</span>
            ${raw(trendHtml)}
          </div>
          <p class="${cn('text-gray-500 truncate', sizeStyles.label)}">${label}</p>
        </div>
      </div>
    </div>
  `;
}
