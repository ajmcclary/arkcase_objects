/**
 * UsageGuidelines component for design documentation.
 * @module components/ui/UsageGuidelines
 */

import { html, raw, joinHtml } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { IconContainer } from './IconContainer';
import type { BaseComponentProps, ColorScheme } from '../../types';

/**
 * Guideline item configuration.
 */
export interface GuidelineItem {
  /** Item text */
  text: string;
}

/**
 * Guideline card configuration.
 */
export interface GuidelineCard {
  /** Card title (e.g., "Do", "Don't", "Best Practices") */
  title: string;
  /** Icon class (e.g., "fa-check", "fa-times", "fa-lightbulb") */
  icon: string;
  /** Icon/bullet color */
  color: ColorScheme;
  /** List of guideline items */
  items: GuidelineItem[];
}

/**
 * Props for the UsageGuidelines component.
 */
export interface UsageGuidelinesProps extends BaseComponentProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Guideline cards */
  cards: GuidelineCard[];
}

/**
 * Renders a single guideline card.
 */
function GuidelineCardComponent(card: GuidelineCard): string {
  const bulletClass = `text-${card.color}-600`;

  const itemsHtml = card.items.map((item) => html`
    <li class="flex items-start">
      <i class="fa-solid fa-circle ${bulletClass} text-xs mt-1 mr-2"></i>
      <span>${item.text}</span>
    </li>
  `);

  const iconHtml = IconContainer({
    icon: card.icon,
    color: card.color,
    size: 'lg',
    rounded: 'lg',
    className: 'mb-4',
  });

  return html`
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      ${raw(iconHtml)}
      <h3 class="text-lg font-semibold text-gray-900 mb-2">${card.title}</h3>
      <ul class="space-y-2 text-sm text-gray-700">
        ${joinHtml(itemsHtml)}
      </ul>
    </div>
  `;
}

/**
 * Renders usage guidelines section with Do/Don't/Best Practices cards.
 *
 * @param props - UsageGuidelines configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * UsageGuidelines({
 *   title: 'Usage Guidelines',
 *   description: 'Best practices for implementing case file cards',
 *   cards: [
 *     {
 *       title: 'Do',
 *       icon: 'fa-check',
 *       color: 'green',
 *       items: [
 *         { text: 'Use small cards in dense lists' },
 *         { text: 'Show status badges prominently' }
 *       ]
 *     },
 *     {
 *       title: "Don't",
 *       icon: 'fa-times',
 *       color: 'red',
 *       items: [
 *         { text: 'Overcrowd cards with too much info' },
 *         { text: 'Hide critical status indicators' }
 *       ]
 *     }
 *   ]
 * })
 * ```
 */
export function UsageGuidelines(props: UsageGuidelinesProps): string {
  const {
    title = 'Usage Guidelines',
    description = 'Best practices for implementation',
    cards,
    id,
    className,
    dataAttributes = {},
  } = props;

  const wrapperClasses = cn('', className);

  const cardsHtml = cards.map((card) => GuidelineCardComponent(card));

  return html`
    <div${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">${title}</h2>
        <p class="text-gray-600">${description}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${joinHtml(cardsHtml)}
      </div>
    </div>
  `;
}

/**
 * Summary item configuration.
 */
export interface SummaryItem {
  /** Item title */
  title: string;
  /** Item description */
  description: string;
}

/**
 * Core principle item.
 */
export interface CorePrinciple {
  /** Principle text */
  text: string;
}

/**
 * Props for the CardSystemSummary component.
 */
export interface CardSystemSummaryProps extends BaseComponentProps {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Summary items (e.g., Small/Medium/Large card descriptions) */
  summaryItems: SummaryItem[];
  /** Core principles list */
  corePrinciples?: CorePrinciple[];
}

/**
 * Renders a card system summary section.
 *
 * @param props - CardSystemSummary configuration
 * @returns HTML string
 */
export function CardSystemSummary(props: CardSystemSummaryProps): string {
  const {
    title = 'Card System Summary',
    description = 'Quick reference for card variants and usage',
    summaryItems,
    corePrinciples = [],
    id,
    className,
  } = props;

  const wrapperClasses = cn('', className);

  const summaryItemsHtml = summaryItems.map((item) => html`
    <div>
      <h3 class="font-semibold text-gray-900 mb-2">${item.title}</h3>
      <p class="text-sm text-gray-600">${item.description}</p>
    </div>
  `);

  const principlesHtml = corePrinciples.length > 0
    ? html`
      <div class="pt-6 border-t border-gray-200">
        <h4 class="font-semibold text-gray-900 mb-3">Core Principles</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          ${joinHtml(corePrinciples.map((p) => html`
            <div class="flex items-center text-sm text-gray-700">
              <i class="fa-solid fa-check-double text-blue-600 mr-2"></i>
              ${p.text}
            </div>
          `))}
        </div>
      </div>
    `
    : '';

  return html`
    <div${raw(buildAttrs(id))} class="${wrapperClasses}">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">${title}</h2>
        <p class="text-gray-600">${description}</p>
      </div>
      <div class="bg-white border border-blue-200 rounded-lg p-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          ${joinHtml(summaryItemsHtml)}
        </div>
        ${raw(principlesHtml)}
      </div>
    </div>
  `;
}
