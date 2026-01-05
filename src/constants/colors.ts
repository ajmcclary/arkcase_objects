/**
 * Color scheme mappings to Tailwind CSS classes.
 * @module constants/colors
 */

import type { ColorScheme } from '../types';

/**
 * Color class mapping for icon containers and backgrounds.
 * Maps color scheme names to Tailwind background and text color classes.
 */
export const COLOR_CLASSES: Record<
  ColorScheme,
  { bg: string; text: string; bgHover?: string }
> = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    bgHover: 'group-hover:bg-blue-200',
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    bgHover: 'group-hover:bg-green-200',
  },
  purple: {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
    bgHover: 'group-hover:bg-purple-200',
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    bgHover: 'group-hover:bg-orange-200',
  },
  amber: {
    bg: 'bg-amber-100',
    text: 'text-amber-600',
    bgHover: 'group-hover:bg-amber-200',
  },
  cyan: {
    bg: 'bg-cyan-100',
    text: 'text-cyan-600',
    bgHover: 'group-hover:bg-cyan-200',
  },
  pink: {
    bg: 'bg-pink-100',
    text: 'text-pink-600',
    bgHover: 'group-hover:bg-pink-200',
  },
  slate: {
    bg: 'bg-slate-100',
    text: 'text-slate-600',
    bgHover: 'group-hover:bg-slate-200',
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    bgHover: 'group-hover:bg-red-200',
  },
  gray: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    bgHover: 'group-hover:bg-gray-200',
  },
  indigo: {
    bg: 'bg-indigo-100',
    text: 'text-indigo-600',
    bgHover: 'group-hover:bg-indigo-200',
  },
};

/**
 * Badge color classes for category badges.
 * Lighter background with matching text for subtle badges.
 */
export const BADGE_COLORS: Record<ColorScheme, { bg: string; text: string }> = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-700' },
  green: { bg: 'bg-green-50', text: 'text-green-700' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-700' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-700' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700' },
  cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700' },
  pink: { bg: 'bg-pink-50', text: 'text-pink-700' },
  slate: { bg: 'bg-slate-50', text: 'text-slate-700' },
  red: { bg: 'bg-red-50', text: 'text-red-700' },
  gray: { bg: 'bg-gray-50', text: 'text-gray-700' },
  indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700' },
};

/**
 * Gradient color classes for avatars and decorative elements.
 */
export const GRADIENT_COLORS: Record<ColorScheme, string> = {
  blue: 'bg-gradient-to-br from-blue-500 to-blue-600',
  green: 'bg-gradient-to-br from-green-500 to-green-600',
  purple: 'bg-gradient-to-br from-purple-500 to-purple-600',
  orange: 'bg-gradient-to-br from-orange-500 to-orange-600',
  amber: 'bg-gradient-to-br from-amber-500 to-amber-600',
  cyan: 'bg-gradient-to-br from-cyan-500 to-cyan-600',
  pink: 'bg-gradient-to-br from-pink-500 to-pink-600',
  slate: 'bg-gradient-to-br from-slate-500 to-slate-600',
  red: 'bg-gradient-to-br from-red-500 to-red-600',
  gray: 'bg-gradient-to-br from-gray-500 to-gray-600',
  indigo: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
};

/**
 * Hover border color classes for interactive cards.
 */
export const HOVER_BORDER_COLORS: Record<ColorScheme, string> = {
  blue: 'hover:border-blue-300',
  green: 'hover:border-green-300',
  purple: 'hover:border-purple-300',
  orange: 'hover:border-orange-300',
  amber: 'hover:border-amber-300',
  cyan: 'hover:border-cyan-300',
  pink: 'hover:border-pink-300',
  slate: 'hover:border-slate-300',
  red: 'hover:border-red-300',
  gray: 'hover:border-gray-300',
  indigo: 'hover:border-indigo-300',
};

/**
 * Category to color scheme mapping for wireframe sections.
 */
export const CATEGORY_COLORS: Record<string, ColorScheme> = {
  'Core Objects': 'blue',
  'People & Orgs': 'green',
  Documents: 'purple',
  Workflow: 'orange',
  Communication: 'cyan',
  Financial: 'amber',
  Metadata: 'pink',
  Audit: 'slate',
};
