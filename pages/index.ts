/**
 * Index page generator.
 * Generates the content for index.html (wireframe showcase).
 * @module pages/index
 */

import { html, raw, joinHtml } from '../src/utils/html';
import { FeatureCard, GridCard } from '../src/components/cards/FeatureCard';
import { SectionHeader } from '../src/components/ui/SectionHeader';
import { SectionGroupHeader } from '../src/components/ui/SectionGroupHeader';
import { ResponsiveTable } from '../src/components/ui/ResponsiveTable';
import { UsageGuidelines } from '../src/components/ui/UsageGuidelines';
import { FEATURED_WIREFRAMES, ALL_WIREFRAMES_BY_CATEGORY, CATEGORY_COLORS } from '../src/constants';
import type { ColorScheme } from '../src/types';

/**
 * Grid item interface for category sections.
 */
interface GridItem {
  title: string;
  subtitle: string;
  icon: string;
  href: string;
  color: ColorScheme;
}

/**
 * Generates the hero section with gradient background.
 */
function HeroSection(): string {
  return html`
    <section class="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white py-16 px-4 md:px-8 relative overflow-hidden">
      <!-- Decorative circles -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full"></div>
        <div class="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full"></div>
      </div>

      <div class="max-w-7xl mx-auto relative">
        <!-- Badge -->
        <div class="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2.5 rounded-full border border-white/20 mb-6">
          <i class="fa-solid fa-shapes text-white/80 mr-2"></i>
          <span class="text-sm font-medium">28 Business Objects</span>
        </div>

        <!-- Title -->
        <h1 class="text-4xl md:text-5xl font-bold mb-4">
          ArkCase UI Wireframes
        </h1>

        <!-- Subtitle -->
        <p class="text-xl text-white/80 max-w-2xl mb-8">
          A comprehensive collection of card components for the ArkCase enterprise case management platform.
          Each object type includes small, medium, and large card variants.
        </p>

        <!-- Quick stats -->
        <div class="flex flex-wrap gap-6">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
              <i class="fa-solid fa-cube text-white/80"></i>
            </div>
            <div>
              <div class="text-2xl font-bold">28</div>
              <div class="text-sm text-white/60">Objects</div>
            </div>
          </div>
          <div class="flex items-center">
            <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
              <i class="fa-solid fa-layer-group text-white/80"></i>
            </div>
            <div>
              <div class="text-2xl font-bold">3</div>
              <div class="text-sm text-white/60">Card Sizes</div>
            </div>
          </div>
          <div class="flex items-center">
            <div class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mr-3">
              <i class="fa-solid fa-th text-white/80"></i>
            </div>
            <div>
              <div class="text-2xl font-bold">8</div>
              <div class="text-sm text-white/60">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates the featured wireframes section.
 */
function FeaturedSection(): string {
  const cards = FEATURED_WIREFRAMES.map((wireframe) =>
    FeatureCard({
      title: wireframe.title,
      description: wireframe.description,
      href: wireframe.href,
      icon: wireframe.icon,
      color: wireframe.color,
      categoryBadge: wireframe.category,
      footerText: wireframe.footer,
    })
  );

  return html`
    <section class="py-12 px-4 md:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Section header -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="text-2xl font-bold text-gray-900">Featured Wireframes</h2>
            <p class="text-gray-500 mt-1">Most commonly used business objects</p>
          </div>
          <a href="#all-wireframes" class="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center">
            View all
            <i class="fa-solid fa-arrow-right ml-2"></i>
          </a>
        </div>

        <!-- Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${joinHtml(cards)}
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates a single category section.
 */
function CategorySection(title: string, items: GridItem[]): string {
  const color = CATEGORY_COLORS[title] || 'gray';

  const cards = items.map((item) =>
    GridCard({
      title: item.title,
      subtitle: item.subtitle,
      icon: item.icon,
      color: item.color,
      href: item.href,
    })
  );

  // Determine grid columns based on item count
  const gridCols = items.length <= 2
    ? 'grid-cols-1 md:grid-cols-2'
    : items.length <= 4
      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5';

  return html`
    <div class="mb-10">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">${title}</h3>
      <div class="grid ${gridCols} gap-4">
        ${joinHtml(cards)}
      </div>
    </div>
  `;
}

/**
 * Generates the all wireframes section.
 */
function AllWireframesSection(): string {
  const categories = Object.entries(ALL_WIREFRAMES_BY_CATEGORY).map(
    ([title, items]) => CategorySection(title, items)
  );

  return html`
    <section id="all-wireframes" class="py-12 px-4 md:px-8 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <!-- Section header -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900">All Wireframes</h2>
          <p class="text-gray-500 mt-1">Browse all 28 business objects by category</p>
        </div>

        ${joinHtml(categories)}
      </div>
    </section>
  `;
}

// =============================================================================
// TECHNICAL SPECIFICATIONS SECTIONS
// =============================================================================

/**
 * Generates the responsive behavior section.
 */
function ResponsiveBehaviorSection(): string {
  const tableContent = ResponsiveTable({
    columns: [
      { header: 'Variant' },
      { header: 'Desktop (1024px+)', icon: 'fa-desktop' },
      { header: 'Tablet (768-1023px)', icon: 'fa-tablet-screen-button' },
      { header: 'Mobile (<768px)', icon: 'fa-mobile-screen' },
    ],
    rows: [
      { cells: ['Small', '3 columns, full info', '2 columns, full info', '1 column, stacked'] },
      { cells: ['Medium', '2 columns, grid metadata', '2 columns, stacked metadata', '1 column, simplified'] },
      { cells: ['Large', 'Full width, all sections', 'Full width, collapsed sections', 'Full width, accordion'] },
    ],
  });

  return html`
    <section id="responsive-behavior-section" class="py-12 bg-white">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        ${raw(SectionHeader({ title: 'Responsive Behavior', description: 'How cards adapt to different screen sizes', variant: 'page' }))}

        ${raw(tableContent)}

        <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center gap-2 mb-3">
              <i class="fa-solid fa-desktop text-blue-600"></i>
              <h4 class="font-semibold text-gray-900">Desktop</h4>
            </div>
            <ul class="text-sm text-gray-600 space-y-2">
              <li>• Multi-column grid layouts</li>
              <li>• Full metadata display</li>
              <li>• Hover states enabled</li>
              <li>• Side-by-side comparisons</li>
            </ul>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center gap-2 mb-3">
              <i class="fa-solid fa-tablet-screen-button text-blue-600"></i>
              <h4 class="font-semibold text-gray-900">Tablet</h4>
            </div>
            <ul class="text-sm text-gray-600 space-y-2">
              <li>• Reduced column count</li>
              <li>• Touch-optimized targets</li>
              <li>• Collapsible sections</li>
              <li>• Swipe gestures supported</li>
            </ul>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="flex items-center gap-2 mb-3">
              <i class="fa-solid fa-mobile-screen text-blue-600"></i>
              <h4 class="font-semibold text-gray-900">Mobile</h4>
            </div>
            <ul class="text-sm text-gray-600 space-y-2">
              <li>• Single column layout</li>
              <li>• Larger touch targets</li>
              <li>• Simplified information</li>
              <li>• Bottom sheet actions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates the accessibility section.
 */
function AccessibilitySection(): string {
  return html`
    <section id="accessibility-section" class="py-12 bg-gray-50">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        ${raw(SectionHeader({ title: 'Accessibility Guidelines', description: 'WCAG 2.1 AA compliance considerations for cards', variant: 'page' }))}

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <i class="fa-solid fa-keyboard text-blue-600"></i>
              </div>
              <h3 class="font-semibold text-gray-900">Keyboard Navigation</h3>
            </div>
            <ul class="text-sm text-gray-600 space-y-2">
              <li class="flex items-start gap-2">
                <code class="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Tab</code>
                <span>Move focus between cards</span>
              </li>
              <li class="flex items-start gap-2">
                <code class="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Enter</code>
                <span>Activate focused card</span>
              </li>
              <li class="flex items-start gap-2">
                <code class="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Space</code>
                <span>Toggle selection</span>
              </li>
              <li class="flex items-start gap-2">
                <code class="bg-gray-100 px-1.5 py-0.5 rounded text-xs">Esc</code>
                <span>Close expanded sections</span>
              </li>
            </ul>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <i class="fa-solid fa-universal-access text-green-600"></i>
              </div>
              <h3 class="font-semibold text-gray-900">Screen Readers</h3>
            </div>
            <ul class="text-sm text-gray-600 space-y-2">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-1"></i>
                <span>Semantic HTML structure with proper headings</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-1"></i>
                <span>ARIA labels for interactive elements</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-1"></i>
                <span>Status announcements via aria-live</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-1"></i>
                <span>Descriptive link text (not "click here")</span>
              </li>
            </ul>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <i class="fa-solid fa-eye text-purple-600"></i>
              </div>
              <h3 class="font-semibold text-gray-900">Visual Accessibility</h3>
            </div>
            <ul class="text-sm text-gray-600 space-y-2">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-1"></i>
                <span>4.5:1 contrast ratio for normal text</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-1"></i>
                <span>3:1 contrast ratio for large text and icons</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-1"></i>
                <span>Color not sole indicator of status</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-1"></i>
                <span>Visible focus indicators (2px outline)</span>
              </li>
            </ul>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <i class="fa-solid fa-hand-pointer text-amber-600"></i>
              </div>
              <h3 class="font-semibold text-gray-900">Touch & Motor</h3>
            </div>
            <ul class="text-sm text-gray-600 space-y-2">
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-1"></i>
                <span>44x44px minimum touch target size</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-1"></i>
                <span>Adequate spacing between interactive elements</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-1"></i>
                <span>No time-limited interactions</span>
              </li>
              <li class="flex items-start gap-2">
                <i class="fa-solid fa-check text-green-600 mt-1"></i>
                <span>Large click/tap areas on cards</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * Generates the usage guidelines section.
 */
function UsageGuidelinesSection(): string {
  const guidelinesContent = UsageGuidelines({
    title: 'Usage Guidelines',
    description: 'Best practices for implementing cards',
    cards: [
      {
        title: 'Do',
        icon: 'fa-check',
        color: 'green',
        items: [
          { text: 'Use small cards in dense lists and queues' },
          { text: 'Show status badges prominently' },
          { text: 'Truncate long titles appropriately' },
          { text: 'Group related metadata logically' },
        ],
      },
      {
        title: "Don't",
        icon: 'fa-times',
        color: 'red',
        items: [
          { text: 'Overcrowd small cards with too much info' },
          { text: 'Hide critical status indicators' },
          { text: 'Use inconsistent spacing between variants' },
          { text: 'Make clickable areas too small' },
        ],
      },
      {
        title: 'Best Practices',
        icon: 'fa-lightbulb',
        color: 'blue',
        items: [
          { text: 'Maintain visual hierarchy across sizes' },
          { text: 'Use color coding consistently' },
          { text: 'Test with real data and edge cases' },
          { text: 'Ensure responsive behavior works well' },
        ],
      },
    ],
  });

  return html`
    <section id="usage-guidelines-section" class="py-12 bg-white">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        ${raw(guidelinesContent)}
      </div>
    </section>
  `;
}

/**
 * Generates the card system summary section.
 */
function SummarySection(): string {
  return html`
    <section id="summary-section" class="py-12 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Card System Summary</h2>
          <p class="text-gray-600 mb-8">Quick reference for card variants and usage across all business objects</p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i class="fa-solid fa-compress text-blue-600 text-lg"></i>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">Small Cards</h3>
              <p class="text-sm text-gray-600">Compact references in sidebars, related items, and inline mentions.</p>
            </div>
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i class="fa-solid fa-th-large text-green-600 text-lg"></i>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">Medium Cards</h3>
              <p class="text-sm text-gray-600">Dashboard widgets, search results, and list displays.</p>
            </div>
            <div class="bg-white rounded-lg border border-gray-200 p-6">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i class="fa-solid fa-expand text-purple-600 text-lg"></i>
              </div>
              <h3 class="font-semibold text-gray-900 mb-2">Large Cards</h3>
              <p class="text-sm text-gray-600">Detail views, inspector panels, and full information display.</p>
            </div>
          </div>

          <div class="bg-white rounded-lg border border-gray-200 p-6">
            <h3 class="font-semibold text-gray-900 mb-4">Core Design Principles</h3>
            <div class="flex flex-wrap justify-center gap-3">
              <span class="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700">
                <i class="fa-solid fa-check text-green-600 mr-2"></i>
                Consistent visual identity
              </span>
              <span class="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700">
                <i class="fa-solid fa-check text-green-600 mr-2"></i>
                Clear status indication
              </span>
              <span class="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700">
                <i class="fa-solid fa-check text-green-600 mr-2"></i>
                Progressive disclosure
              </span>
              <span class="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 text-gray-700">
                <i class="fa-solid fa-check text-green-600 mr-2"></i>
                Accessible patterns
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

// =============================================================================
// MAIN EXPORT
// =============================================================================

/**
 * Generates the complete index page content.
 *
 * @returns HTML string for the main content area
 *
 * @example
 * ```ts
 * import { PageLayout } from '../src/components/layout/PageLayout';
 * import { IndexPageContent } from './index';
 *
 * const html = PageLayout({
 *   title: 'ArkCase Design System',
 *   children: IndexPageContent(),
 *   activePage: 'index.html'
 * });
 * ```
 */
export function IndexPageContent(): string {
  return html`
    ${raw(HeroSection())}
    ${raw(FeaturedSection())}
    ${raw(AllWireframesSection())}

    <!-- Technical Specifications -->
    ${raw(SectionGroupHeader({ id: 'technical-specs-group', title: 'Technical Specifications', description: 'Implementation guidelines and accessibility standards', icon: 'fa-code' }))}
    ${raw(ResponsiveBehaviorSection())}
    ${raw(AccessibilitySection())}
    ${raw(UsageGuidelinesSection())}

    ${raw(SummarySection())}
  `;
}
