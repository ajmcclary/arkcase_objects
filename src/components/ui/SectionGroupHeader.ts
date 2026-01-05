/**
 * SectionGroupHeader component for organizing page sections into groups.
 * @module components/ui/SectionGroupHeader
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import type { BaseComponentProps, IconName } from '../../types';

/**
 * Props for the SectionGroupHeader component.
 */
export interface SectionGroupHeaderProps extends BaseComponentProps {
  /** Group title */
  title: string;
  /** Group description */
  description?: string;
  /** Icon for the group */
  icon: IconName;
}

/**
 * Renders a section group header for organizing related sections.
 *
 * Creates a visual divider with icon, title, and description to group
 * related page sections together. Used for hierarchical page organization.
 *
 * @param props - SectionGroupHeader configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * SectionGroupHeader({
 *   id: 'card-variants-group',
 *   title: 'Card Variants',
 *   description: 'Three size variants for different information density needs',
 *   icon: 'fa-layer-group'
 * })
 * ```
 */
export function SectionGroupHeader(props: SectionGroupHeaderProps): string {
  const {
    title,
    description,
    icon,
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn(
    'py-8 scroll-mt-20 bg-gradient-to-b from-gray-100 to-gray-50 border-y border-gray-200',
    className
  );

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
            <i class="fa-solid ${icon} text-white text-lg"></i>
          </div>
          <div>
            <h2 class="text-xl font-bold text-gray-900">${title}</h2>
            ${raw(description ? html`<p class="text-gray-600 text-sm mt-0.5">${description}</p>` : '')}
          </div>
        </div>
      </div>
    </div>
  `;
}
