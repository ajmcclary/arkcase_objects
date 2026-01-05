/**
 * Common types used throughout the ArkCase Design System.
 * @module types/common
 */

/**
 * Color schemes used throughout the design system.
 * Maps to Tailwind color classes (e.g., 'blue' -> bg-blue-100, text-blue-600).
 */
export type ColorScheme =
  | 'blue'
  | 'green'
  | 'purple'
  | 'orange'
  | 'amber'
  | 'cyan'
  | 'pink'
  | 'slate'
  | 'red'
  | 'gray'
  | 'indigo';

/**
 * Size variants for components.
 * - sm: Small/compact variant
 * - md: Medium/default variant
 * - lg: Large/expanded variant
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Common status values used across business objects.
 * Determines badge color and display text.
 */
export type Status =
  | 'active'
  | 'pending'
  | 'in-review'
  | 'in-progress'
  | 'on-hold'
  | 'overdue'
  | 'closed'
  | 'urgent'
  | 'completed'
  | 'draft'
  | 'rejected'
  | 'approved'
  | 'assigned'
  | 'ready'
  | 'rework'
  | 'cancelled';

/**
 * Priority levels for cases, tasks, and other prioritizable objects.
 */
export type Priority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * Font Awesome icon identifier.
 * Should include the icon name without the 'fa-solid' prefix.
 *
 * @example 'fa-briefcase', 'fa-user', 'fa-folder-open'
 */
export type IconName = string;

/**
 * Base props shared by all components.
 * Provides common functionality for IDs, custom classes, and data attributes.
 */
export interface BaseComponentProps {
  /**
   * Optional HTML id attribute for the component's root element.
   */
  id?: string;

  /**
   * Additional CSS classes to apply to the component's root element.
   * These are merged with the component's default classes.
   */
  className?: string;

  /**
   * Data attributes for testing, JavaScript hooks, or other purposes.
   * Keys should not include the 'data-' prefix.
   *
   * @example { testId: 'my-button', action: 'submit' }
   * // Renders: data-test-id="my-button" data-action="submit"
   */
  dataAttributes?: Record<string, string>;
}

/**
 * Props for components that can be rendered as links.
 */
export interface LinkableProps {
  /**
   * URL to navigate to when the component is clicked.
   * If provided, the component renders as an anchor tag.
   */
  href?: string;

  /**
   * Where to open the linked URL.
   * Only applies when href is provided.
   */
  target?: '_self' | '_blank' | '_parent' | '_top';
}

/**
 * Props for components that can be disabled.
 */
export interface DisableableProps {
  /**
   * Whether the component is disabled.
   * Disabled components are visually dimmed and non-interactive.
   */
  disabled?: boolean;
}
