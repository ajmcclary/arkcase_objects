/**
 * Types for UI components (StatusBadge, IconContainer, Button, Avatar, etc.).
 * @module types/ui
 */

import type {
  BaseComponentProps,
  ColorScheme,
  Size,
  IconName,
  Status,
  DisableableProps,
} from './common';

/**
 * Status badge props.
 * Renders a colored pill or tag indicating status.
 */
export interface StatusBadgeProps extends BaseComponentProps {
  /**
   * Status type that determines the badge color.
   */
  status: Status;

  /**
   * Override text for the badge.
   * If not provided, uses the default label for the status.
   */
  label?: string;

  /**
   * Size variant for the badge.
   * @default 'md'
   */
  size?: Size;

  /**
   * Badge shape variant.
   * - pill: Fully rounded (rounded-full)
   * - tag: Slightly rounded (rounded-md)
   * @default 'pill'
   */
  variant?: 'pill' | 'tag';

  /**
   * Optional icon to display before the label.
   */
  icon?: IconName;
}

/**
 * Colored icon container props.
 * Renders an icon inside a colored background box.
 */
export interface IconContainerProps extends BaseComponentProps {
  /**
   * Font Awesome icon name (e.g., 'fa-briefcase').
   */
  icon: IconName;

  /**
   * Color scheme for the container background and icon.
   */
  color: ColorScheme;

  /**
   * Size variant for the container.
   * - xs: 24x24px (w-6 h-6)
   * - sm: 32x32px (w-8 h-8)
   * - md: 40x40px (w-10 h-10)
   * - lg: 48x48px (w-12 h-12)
   * @default 'md'
   */
  size?: 'xs' | Size;

  /**
   * Border radius variant.
   * - 'sm': Small rounding (rounded-sm)
   * - 'default': Default rounding (rounded)
   * - 'md': Medium rounding (rounded-md)
   * - 'lg': Large rounding (rounded-lg)
   * - 'xl': Extra large (rounded-xl)
   * - 'full': Circle (rounded-full)
   * @default 'lg'
   */
  rounded?: 'sm' | 'default' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Button component props.
 */
export interface ButtonProps extends BaseComponentProps, DisableableProps {
  /**
   * Button label text.
   */
  label: string;

  /**
   * Visual variant for the button.
   * - primary: Blue background, white text
   * - secondary: White background, gray border
   * - ghost: Transparent background, gray text
   * - danger: Red background, white text
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';

  /**
   * Size variant for the button.
   * @default 'md'
   */
  size?: Size;

  /**
   * Optional icon to display before the label.
   */
  icon?: IconName;

  /**
   * Optional icon to display after the label.
   */
  iconAfter?: IconName;

  /**
   * Button type attribute.
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';

  /**
   * Whether the button should take full width of its container.
   * @default false
   */
  fullWidth?: boolean;

  /**
   * URL to navigate to. If provided, renders as an anchor tag.
   */
  href?: string;

  /**
   * JavaScript onclick handler attribute.
   * Only used when href is not provided.
   */
  onClick?: string;
}

/**
 * Single avatar props.
 */
export interface AvatarProps extends BaseComponentProps {
  /**
   * Image URL for the avatar.
   * If not provided, falls back to initials or icon.
   */
  src?: string;

  /**
   * Alt text for the avatar image.
   * Required for accessibility.
   */
  alt: string;

  /**
   * Initials to display when no image is available.
   * Typically 1-2 characters.
   */
  initials?: string;

  /**
   * Size variant for the avatar.
   * - sm: 24x24px (w-6 h-6)
   * - md: 32x32px (w-8 h-8)
   * - lg: 40x40px (w-10 h-10)
   * @default 'md'
   */
  size?: Size;

  /**
   * Background color for initials fallback.
   * @default 'blue'
   */
  color?: ColorScheme;

  /**
   * Whether to show an online status indicator dot.
   * @default false
   */
  showStatus?: boolean;

  /**
   * Whether the user is currently online.
   * Only displayed when showStatus is true.
   * @default false
   */
  isOnline?: boolean;
}

/**
 * Avatar group props for displaying multiple avatars.
 */
export interface AvatarGroupProps extends BaseComponentProps {
  /**
   * Array of avatar configurations.
   */
  avatars: Array<Omit<AvatarProps, 'size'>>;

  /**
   * Maximum number of avatars to display.
   * Additional avatars are shown as "+X more".
   * @default 3
   */
  max?: number;

  /**
   * Size variant for all avatars in the group.
   * @default 'md'
   */
  size?: Size;

  /**
   * Spacing between avatars.
   * Negative values create overlap effect.
   * @default -2 (overlap)
   */
  spacing?: number;
}

/**
 * Metadata field props (label + value pair).
 */
export interface MetadataFieldProps extends BaseComponentProps {
  /**
   * Field label displayed above the value.
   * Rendered as uppercase text.
   */
  label: string;

  /**
   * Field value to display.
   */
  value: string | number;

  /**
   * Optional icon to display before the label.
   */
  icon?: IconName;

  /**
   * Highlight color for the value.
   * Use for important values like overdue dates.
   */
  highlight?: 'danger' | 'warning' | 'success';

  /**
   * Layout variant for the field.
   * - stacked: Label above value (default)
   * - inline: Label and value on same line
   * @default 'stacked'
   */
  layout?: 'stacked' | 'inline';
}

/**
 * Section header props for collapsible sections.
 */
export interface SectionHeaderProps extends BaseComponentProps {
  /**
   * Section title text.
   */
  title: string;

  /**
   * Optional description text below the title.
   * Only shown for 'page' variant.
   */
  description?: string;

  /**
   * Header variant.
   * - 'card': Small uppercase h4 for card sections (default)
   * - 'page': Large h2 for page sections
   * @default 'card'
   */
  variant?: 'card' | 'page';

  /**
   * Whether the section is currently expanded.
   * Controls the chevron direction.
   * @default true
   */
  isExpanded?: boolean;

  /**
   * Whether the section is collapsible.
   * If false, no chevron is shown.
   * @default true
   */
  isCollapsible?: boolean;

  /**
   * Optional count to display in the header.
   * Rendered as "(count)" after the title.
   */
  count?: number;

  /**
   * Optional action button in the header.
   */
  action?: {
    label: string;
    href?: string;
    onClick?: string;
  };
}

/**
 * Progress bar props.
 */
export interface ProgressBarProps extends BaseComponentProps {
  /**
   * Progress value as a percentage (0-100).
   */
  value: number;

  /**
   * Optional label to display before the bar.
   */
  label?: string;

  /**
   * Whether to show the percentage value after the bar.
   * @default true
   */
  showValue?: boolean;

  /**
   * Color scheme for the progress bar fill.
   * @default 'blue'
   */
  color?: ColorScheme;

  /**
   * Size variant for the bar height.
   * @default 'md'
   */
  size?: Size;
}

/**
 * Timeline item props.
 */
export interface TimelineItemProps extends BaseComponentProps {
  /**
   * Title of the timeline event.
   */
  title: string;

  /**
   * Optional description for more details.
   */
  description?: string;

  /**
   * User who performed the action.
   */
  user: string;

  /**
   * User initials for the avatar.
   */
  userInitials: string;

  /**
   * Timestamp string for the event.
   */
  timestamp: string;

  /**
   * Icon class for the timeline marker.
   * @default 'fa-circle'
   */
  icon?: string;

  /**
   * Color scheme for the icon and marker.
   * @default 'blue'
   */
  iconColor?: ColorScheme;

  /**
   * Color scheme for the avatar.
   * @default 'blue'
   */
  color?: ColorScheme;

  /**
   * Whether this is the last item in the timeline.
   * Controls whether to show the connecting line.
   * @default false
   */
  isLast?: boolean;
}
