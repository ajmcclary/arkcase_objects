/**
 * Types for layout components (Header, Sidebar, Footer, PageLayout).
 * @module types/layout
 */

import type { BaseComponentProps, IconName } from './common';

/**
 * Navigation item in the sidebar.
 */
export interface NavItem {
  /**
   * Display label for the navigation item.
   */
  label: string;

  /**
   * URL to navigate to when clicked.
   */
  href: string;

  /**
   * Font Awesome icon name (e.g., 'fa-briefcase').
   */
  icon: IconName;

  /**
   * Whether this is the currently active page.
   * Active items are highlighted with indigo background.
   */
  isActive?: boolean;
}

/**
 * Grouped navigation section in the sidebar.
 */
export interface NavGroup {
  /**
   * Section title displayed above the navigation items.
   * Rendered as uppercase label (e.g., "Core Objects").
   */
  title: string;

  /**
   * Navigation items within this group.
   */
  items: NavItem[];
}

/**
 * Header component props.
 */
export interface HeaderProps extends BaseComponentProps {
  /**
   * Home page URL for the logo link.
   * @default 'index.html'
   */
  homeUrl?: string;

  /**
   * Whether to show the "Design System" badge.
   * Badge is hidden on mobile regardless of this setting.
   * @default true
   */
  showBadge?: boolean;

  /**
   * Custom badge text to display.
   * @default 'Design System'
   */
  badgeText?: string;

  /**
   * Custom badge subtitle text.
   * @default 'Wireframe Collection'
   */
  badgeSubtext?: string;
}

/**
 * Mobile sidebar backdrop props.
 */
export interface SidebarBackdropProps extends BaseComponentProps {
  /**
   * Whether the backdrop is initially visible.
   * @default false
   */
  isVisible?: boolean;
}

/**
 * Sidebar component props.
 */
export interface SidebarProps extends BaseComponentProps {
  /**
   * Navigation groups to display in the sidebar.
   */
  navigation: NavGroup[];

  /**
   * Current active page path for automatic highlighting.
   * If provided, overrides individual NavItem.isActive settings.
   *
   * @example 'Case.html'
   */
  activePage?: string;

  /**
   * Whether to show the home/index link at the top.
   * @default true
   */
  showHomeLink?: boolean;

  /**
   * Label for the home link.
   * @default 'Wireframe Index'
   */
  homeLinkLabel?: string;
}

/**
 * Footer component props.
 */
export interface FooterProps extends BaseComponentProps {
  /**
   * Copyright year to display.
   * @default Current year
   */
  copyrightYear?: number;

  /**
   * Copyright holder name.
   * @default 'ArkCase Design System'
   */
  copyrightHolder?: string;

  /**
   * Version string to display.
   * @default '2.0'
   */
  version?: string;

  /**
   * Last updated date string.
   * @default 'December 2025'
   */
  lastUpdated?: string;
}

/**
 * Main content wrapper props.
 */
export interface MainContentProps extends BaseComponentProps {
  /**
   * The HTML content to render inside the main area.
   */
  children: string;

  /**
   * Whether to add padding to the content area.
   * @default true
   */
  withPadding?: boolean;

  /**
   * Maximum width constraint for the content.
   * @default '7xl'
   */
  maxWidth?: 'full' | '7xl' | '6xl' | '5xl';
}

/**
 * Table of contents item configuration.
 */
export interface TocItem {
  /** Display label for the item */
  label: string;
  /** Target section ID (without #) */
  targetId: string;
  /** Indentation level (0 = top level, 1 = nested) */
  level?: 0 | 1;
}

/**
 * Table of contents configuration.
 */
export interface TocConfig {
  /** Title for the TOC section */
  title?: string;
  /** TOC items to display */
  items: TocItem[];
}

/**
 * Full page layout props.
 * Combines Header, Sidebar, Footer, and main content.
 */
export interface PageLayoutProps extends BaseComponentProps {
  /**
   * Page title for the <title> tag.
   */
  title: string;

  /**
   * Optional meta description for SEO.
   */
  description?: string;

  /**
   * Header configuration options.
   */
  header?: Partial<HeaderProps>;

  /**
   * Sidebar configuration options.
   */
  sidebar?: Partial<SidebarProps>;

  /**
   * Footer configuration options.
   */
  footer?: Partial<FooterProps>;

  /**
   * Main content to render in the page body.
   * Should be an HTML string.
   */
  children: string;

  /**
   * Current active page for sidebar highlighting.
   * Passed to Sidebar component.
   */
  activePage?: string;

  /**
   * Table of contents configuration for right sidebar.
   * When provided, displays a sticky TOC with scrollspy.
   */
  tableOfContents?: TocConfig;

  /**
   * Additional content to include in the <head> section.
   * Useful for page-specific styles or scripts.
   */
  headContent?: string;

  /**
   * Additional scripts to include before closing </body> tag.
   */
  bodyScripts?: string;
}
