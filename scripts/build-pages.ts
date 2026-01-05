/**
 * Build script for generating HTML pages.
 *
 * Generates static HTML files from TypeScript page generators.
 * Run with: npx tsx scripts/build-pages.ts
 *
 * @module scripts/build-pages
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

import { PageLayout } from '../src/components/layout/PageLayout';
import { IndexPageContent } from '../pages/index';
import { CasePageContent } from '../pages/case';
import { FILTER_TOGGLE_SCRIPT } from '../src/scripts/filter-toggle';
import { COLLAPSIBLE_SECTIONS_SCRIPT } from '../src/scripts/collapsible-sections';
import type { TocConfig } from '../src/types';

/**
 * Page configuration for generation.
 */
interface PageConfig {
  /** Output filename */
  file: string;
  /** Page title */
  title: string;
  /** Page description for meta tag */
  description?: string;
  /** Content generator function */
  content: () => string;
  /** Active page for sidebar highlighting */
  activePage: string;
  /** Table of contents configuration */
  tableOfContents?: TocConfig;
  /** Additional scripts to include in body */
  bodyScripts?: string;
}

/**
 * Table of contents for Case page.
 */
const CASE_TOC: TocConfig = {
  title: 'On this page',
  items: [
    { label: 'Overview', targetId: 'case-card-overview' },
    // Card Variants
    { label: 'Card Variants', targetId: 'card-variants-group' },
    { label: 'Small Cards', targetId: 'small-cards-section', level: 1 },
    { label: 'Medium Cards', targetId: 'medium-cards-section', level: 1 },
    { label: 'Large Cards', targetId: 'large-cards-section', level: 1 },
    { label: 'Card Comparison', targetId: 'comparison-section', level: 1 },
    // Usage Contexts
    { label: 'Usage Contexts', targetId: 'usage-contexts-group' },
    { label: 'Dashboard Widgets', targetId: 'dashboard-widgets-section', level: 1 },
    { label: 'Dashboard View', targetId: 'dashboard-view-section', level: 1 },
    { label: 'Sidebar Items', targetId: 'sidebar-items-section', level: 1 },
    // Design Reference
    { label: 'Design Reference', targetId: 'design-reference-group' },
    { label: 'Status Variants', targetId: 'status-variants-section', level: 1 },
    { label: 'Interaction States', targetId: 'interaction-states-section', level: 1 },
  ],
};

/**
 * Pages to generate.
 */
const PAGES: PageConfig[] = [
  {
    file: 'index.html',
    title: 'ArkCase Design System - UI Wireframes',
    description: 'A comprehensive collection of card components for the ArkCase enterprise case management platform.',
    content: IndexPageContent,
    activePage: 'index.html',
  },
  {
    file: 'Case.html',
    title: 'Case Cards - ArkCase Design System',
    description: 'Card components for Case business objects including small, medium, and large variants.',
    content: CasePageContent,
    activePage: 'Case.html',
    tableOfContents: CASE_TOC,
    bodyScripts: `<script>${FILTER_TOGGLE_SCRIPT}</script><script>${COLLAPSIBLE_SECTIONS_SCRIPT}</script>`,
  },
];

/**
 * Output directory for generated files.
 * Files are generated in dist/ to preserve original wireframes.
 */
const OUTPUT_DIR = join(process.cwd(), 'dist');

/**
 * Main build function.
 */
function build(): void {
  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log('Building HTML pages to dist/...\n');

  for (const page of PAGES) {
    try {
      // Generate page HTML
      const html = PageLayout({
        title: page.title,
        description: page.description,
        children: page.content(),
        activePage: page.activePage,
        tableOfContents: page.tableOfContents,
        bodyScripts: page.bodyScripts,
      });

      // Write to file
      const outputPath = join(OUTPUT_DIR, page.file);
      writeFileSync(outputPath, html, 'utf-8');

      console.log(`  ✓ Generated: ${page.file}`);
    } catch (error) {
      console.error(`  ✗ Failed: ${page.file}`);
      console.error(`    Error: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  }

  console.log(`\nSuccessfully generated ${PAGES.length} pages.`);
}

// Run build
build();
