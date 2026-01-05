/**
 * FeatureCard component for index/showcase pages.
 * @module components/cards/FeatureCard
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { IconContainer } from '../ui/IconContainer';
import { BADGE_COLORS, HOVER_BORDER_COLORS } from '../../constants/colors';
import type { FeatureCardProps, ColorScheme } from '../../types';

/**
 * Renders a feature card component.
 *
 * A showcase card for the index page, highlighting object types
 * and linking to their wireframe pages.
 *
 * @param props - FeatureCard configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * FeatureCard({
 *   title: 'Case',
 *   description: 'The core case management object with status tracking, participants, and file attachments.',
 *   href: 'Case.html',
 *   icon: 'fa-briefcase',
 *   color: 'blue',
 *   categoryBadge: 'Core',
 *   footerText: 'Small, Medium, Large + Dashboard'
 * })
 * ```
 */
export function FeatureCard(props: FeatureCardProps): string {
  const {
    title,
    description,
    href = '#',
    icon,
    color,
    categoryBadge,
    footerText,
    id,
    className,
    dataAttributes = {},
  } = props;

  const hoverBorder = HOVER_BORDER_COLORS[color];
  const badgeColors = BADGE_COLORS[color];

  const wrapperClasses = cn(
    'bg-white border border-gray-200 rounded-xl p-6',
    'hover:shadow-lg transition-all group',
    hoverBorder,
    className
  );

  const iconHtml = IconContainer({
    icon,
    color,
    size: 'lg',
    rounded: 'xl',
    className: 'w-14 h-14',
  });

  const categoryBadgeHtml = categoryBadge
    ? html`<span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${badgeColors.bg} ${badgeColors.text}">${categoryBadge}</span>`
    : '';

  const footerHtml = footerText
    ? html`
      <div class="flex items-center text-xs text-gray-400">
        <i class="fa-solid fa-layer-group mr-1.5"></i>
        ${footerText}
      </div>
    `
    : '';

  return html`
    <a${raw(buildAttrs(id, dataAttributes))} href="${href}" class="${wrapperClasses}">
      <!-- Icon and Badge -->
      <div class="flex items-start justify-between mb-4">
        ${raw(iconHtml)}
        ${raw(categoryBadgeHtml)}
      </div>

      <!-- Title and Description -->
      <h3 class="text-lg font-semibold text-gray-900 mb-2">${title}</h3>
      <p class="text-sm text-gray-500 mb-4 leading-relaxed">${description}</p>

      <!-- Footer -->
      ${raw(footerHtml)}
    </a>
  `;
}

/**
 * GridCard component for the "All Wireframes" sections.
 */
export function GridCard(props: {
  title: string;
  subtitle: string;
  icon: string;
  color: ColorScheme;
  href: string;
  className?: string;
}): string {
  const { title, subtitle, icon, color, href, className } = props;

  const hoverBorder = HOVER_BORDER_COLORS[color];

  const wrapperClasses = cn(
    'group bg-white border border-gray-200 rounded-lg p-4',
    'hover:shadow-md transition-all',
    hoverBorder,
    className
  );

  const iconHtml = IconContainer({
    icon,
    color,
    size: 'md',
  });

  return html`
    <a href="${href}" class="${wrapperClasses}">
      <div class="flex items-center gap-3">
        ${raw(iconHtml)}
        <div>
          <h4 class="font-semibold text-gray-900">${title}</h4>
          <p class="text-xs text-gray-500">${subtitle}</p>
        </div>
      </div>
    </a>
  `;
}
