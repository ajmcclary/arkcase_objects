/**
 * Centralized size constants for UI components.
 * @module constants/sizes
 */

/**
 * Size options used across multiple components.
 */
export type ComponentSize = 'sm' | 'md' | 'lg';

/**
 * Status badge size classes.
 */
export const BADGE_SIZES = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-1 text-xs',
  lg: 'px-2.5 py-1 text-sm',
} as const;

/**
 * Avatar size classes.
 */
export const AVATAR_SIZES = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-sm',
  lg: 'w-10 h-10 text-base',
} as const;

/**
 * Avatar status indicator size classes.
 */
export const AVATAR_STATUS_SIZES = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
} as const;

/**
 * Avatar group overflow indicator size classes.
 */
export const AVATAR_GROUP_SIZES = {
  sm: 'w-6 h-6 text-xs',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
} as const;

/**
 * Button size classes.
 */
export const BUTTON_SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
} as const;

/**
 * Icon container size classes.
 */
export const ICON_CONTAINER_SIZES = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
} as const;

/**
 * Extended size type that includes xs.
 */
export type IconContainerSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Statistics card size configurations.
 */
export const STATISTICS_CARD_SIZES = {
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
} as const;
