/**
 * CardComparison component for side-by-side card variant display.
 * @module components/ui/CardComparison
 */

import { html, raw, joinHtml } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import type { BaseComponentProps } from '../../types';

/**
 * Card variant configuration for comparison.
 */
export interface CardVariant {
  /** Variant name (e.g., "Small", "Medium", "Large") */
  name: string;
  /** Use case description */
  useCase: string;
  /** The card HTML content */
  content: string;
  /** Column span (1, 2, or 3 out of 3 columns) */
  colSpan?: 1 | 2 | 3;
}

/**
 * Props for the CardComparison component.
 */
export interface CardComparisonProps extends BaseComponentProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Card variants to compare */
  variants: CardVariant[];
  /** Layout direction */
  layout?: 'horizontal' | 'vertical';
  /** Show a wrapper container around the cards */
  showContainer?: boolean;
}

/**
 * Renders a card comparison section.
 *
 * Displays multiple card variants side-by-side for visual comparison,
 * with labels indicating the use case for each variant.
 *
 * @param props - CardComparison configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * CardComparison({
 *   title: 'Card Comparison',
 *   description: 'Visual comparison of Small, Medium, and Large card variants',
 *   variants: [
 *     {
 *       name: 'Small',
 *       useCase: 'Lists & Queues',
 *       content: SmallCard({ ... })
 *     },
 *     {
 *       name: 'Medium',
 *       useCase: 'Dashboards',
 *       content: MediumCard({ ... })
 *     },
 *     {
 *       name: 'Large',
 *       useCase: 'Inspector Panels',
 *       content: LargeCard({ ... })
 *     }
 *   ]
 * })
 * ```
 */
export function CardComparison(props: CardComparisonProps): string {
  const {
    title = 'Card Comparison',
    description = 'Visual comparison showing progressive information disclosure',
    variants,
    layout = 'horizontal',
    showContainer = true,
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn('', className);
  const containerClasses = showContainer
    ? 'bg-white rounded-lg border border-gray-200 p-6 md:p-8'
    : '';

  // Check if any variant has colSpan defined (custom layout mode)
  const hasCustomSpans = variants.some(v => v.colSpan !== undefined);

  // Column span classes mapping
  const colSpanClasses: Record<number, string> = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
  };

  const variantCards = variants.map((variant) => {
    const spanClass = hasCustomSpans && variant.colSpan
      ? colSpanClasses[variant.colSpan]
      : '';

    return html`
      <div class="flex flex-col min-w-0 ${spanClass}">
        <!-- Variant Header -->
        <div class="mb-4">
          <div class="flex items-center gap-2 mb-1">
            <span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
              ${variant.name}
            </span>
          </div>
          <p class="text-sm text-gray-500">${variant.useCase}</p>
        </div>
        <!-- Card Content -->
        <div class="flex-1 min-w-0 overflow-hidden">
          ${raw(variant.content)}
        </div>
      </div>
    `;
  });

  // Use 3-column grid if custom spans are defined, otherwise auto-detect
  const gridCols = hasCustomSpans
    ? 'grid-cols-1 lg:grid-cols-3'
    : layout === 'horizontal'
      ? `grid-cols-1 ${variants.length === 2 ? 'lg:grid-cols-2' : variants.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-' + variants.length}`
      : 'grid-cols-1';

  const gridContent = html`
    <div class="grid ${gridCols} gap-6 lg:gap-8 overflow-hidden">
      ${joinHtml(variantCards)}
    </div>
  `;

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      <!-- Section Header -->
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">${title}</h2>
        <p class="text-gray-600">${description}</p>
      </div>

      <!-- Comparison Container -->
      ${raw(showContainer ? html`<div class="${containerClasses}">${raw(gridContent)}</div>` : gridContent)}
    </div>
  `;
}
