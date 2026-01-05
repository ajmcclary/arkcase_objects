/**
 * ArkCase Design System
 *
 * A TypeScript component library for building ArkCase UI wireframes.
 * Components generate HTML strings that can be used for static site
 * generation or server-side rendering.
 *
 * @packageDocumentation
 */

// Types
export type {
  ColorScheme,
  Size,
  Status,
  Priority,
  IconName,
  BaseComponentProps,
  LinkableProps,
  DisableableProps,
  NavItem,
  NavGroup,
  HeaderProps,
  SidebarProps,
  FooterProps,
  PageLayoutProps,
  StatusBadgeProps,
  IconContainerProps,
  ButtonProps,
  AvatarProps,
  AvatarGroupProps,
  MetadataFieldProps,
  SmallCardProps,
  MediumCardProps,
  LargeCardProps,
  FeatureCardProps,
} from './types';

// Utilities
export { html, raw, joinHtml } from './utils/html';
export { cn, mergeClasses } from './utils/classnames';

// Constants
export {
  COLOR_CLASSES,
  BADGE_COLORS,
  GRADIENT_COLORS,
  HOVER_BORDER_COLORS,
  CATEGORY_COLORS,
  STATUS_COLORS,
  STATUS_LABELS,
  PRIORITY_COLORS,
  PRIORITY_LABELS,
  DEFAULT_NAVIGATION,
  FEATURED_WIREFRAMES,
  ALL_WIREFRAMES_BY_CATEGORY,
} from './constants';

// Components
export {
  // Layout
  Header,
  Sidebar,
  Footer,
  PageLayout,
  // UI
  StatusBadge,
  IconContainer,
  Button,
  Avatar,
  AvatarGroup,
  MetadataField,
  // Cards
  SmallCard,
  MediumCard,
  LargeCard,
  FeatureCard,
  GridCard,
} from './components';
