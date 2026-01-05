/**
 * Types for card components (SmallCard, MediumCard, LargeCard, FeatureCard).
 * @module types/cards
 */

import type {
  BaseComponentProps,
  ColorScheme,
  Status,
  Priority,
  IconName,
  LinkableProps,
} from './common';
import type { AvatarProps, MetadataFieldProps, TimelineItemProps } from './ui';

/**
 * Base card props shared by all card variants.
 * Provides common styling and structure.
 */
export interface BaseCardProps extends BaseComponentProps, LinkableProps {
  /**
   * Card title/heading text.
   */
  title: string;

  /**
   * Object identifier displayed below the title.
   * @example 'CASE-2024-0847', 'TASK-001'
   */
  objectId: string;

  /**
   * Status for the badge display.
   */
  status: Status;

  /**
   * Icon for the card header.
   */
  icon: IconName;

  /**
   * Color scheme for the icon container.
   */
  iconColor: ColorScheme;

  /**
   * Object type label displayed above the title.
   * @example 'Case File', 'Task', 'Person'
   */
  objectType?: string;

  /**
   * Whether the card is interactive/clickable.
   * Adds hover effects and cursor pointer.
   * @default true
   */
  isClickable?: boolean;
}

/**
 * Small card props - compact list items.
 * Used for dense lists and grids.
 */
export interface SmallCardProps extends BaseCardProps {
  /**
   * Due date string to display.
   * @example 'Jan 28', 'Dec 15, 2024'
   */
  dueDate?: string;

  /**
   * Whether the due date is past (renders in red).
   * @default false
   */
  isOverdue?: boolean;

  /**
   * Assignee name for inline display.
   */
  assignee?: string;

  /**
   * Additional metadata to show below the title.
   */
  subtitle?: string;
}

/**
 * Medium card metadata field configuration.
 */
export interface MediumCardMetadata {
  /**
   * Field label.
   */
  label: string;

  /**
   * Field value.
   */
  value: string;

  /**
   * Optional highlight color.
   */
  highlight?: 'danger' | 'warning' | 'success';
}

/**
 * Medium card props - dashboard cards.
 * Used for summary views with more detail than small cards.
 */
export interface MediumCardProps extends BaseCardProps {
  /**
   * Priority level for the card.
   */
  priority?: Priority;

  /**
   * Whether to show a priority star icon.
   * @default false
   */
  showPriorityIcon?: boolean;

  /**
   * Due date string to display.
   */
  dueDate?: string;

  /**
   * Whether the due date is past.
   * @default false
   */
  isOverdue?: boolean;

  /**
   * Metadata fields to display in a grid.
   * Typically 2-4 fields shown in columns.
   */
  metadata?: MediumCardMetadata[];

  /**
   * Assigned users for avatar group display.
   */
  assignees?: Array<Omit<AvatarProps, 'size'>>;

  /**
   * Maximum assignees to show before "+X more".
   * @default 3
   */
  maxAssignees?: number;

  /**
   * Primary action button label.
   * If provided, shows an action button at the bottom.
   */
  actionLabel?: string;

  /**
   * Primary action button URL.
   */
  actionHref?: string;

  /**
   * Related object to show (e.g., parent case).
   */
  relatedObject?: {
    type: string;
    name: string;
    icon: IconName;
    color: ColorScheme;
  };
}

/**
 * Participant configuration for large cards.
 */
export interface CardParticipant {
  /**
   * Participant's full name.
   */
  name: string;

  /**
   * Role or job title.
   */
  role: string;

  /**
   * Participant type within the case.
   * @example 'Lead Investigator', 'Witness', 'Subject'
   */
  participantType?: string;

  /**
   * Avatar configuration.
   */
  avatar: Omit<AvatarProps, 'size'>;
}

/**
 * Related object count for large cards.
 */
export interface RelatedObjectCount {
  /**
   * Object type label.
   * @example 'Documents', 'Tasks', 'Notes'
   */
  label: string;

  /**
   * Count of related objects.
   */
  count: number;

  /**
   * Icon for the object type.
   */
  icon: IconName;

  /**
   * Color scheme for the icon.
   */
  color: ColorScheme;

  /**
   * Optional link to view all related objects.
   */
  href?: string;
}

/**
 * Collapsible section configuration for large cards.
 */
export interface CardSection {
  /**
   * Section title.
   */
  title: string;

  /**
   * Whether the section starts expanded.
   * @default true
   */
  isExpanded?: boolean;

  /**
   * Section content as an HTML string.
   */
  content: string;
}

/**
 * Action button configuration for large cards.
 */
export interface CardAction {
  /**
   * Button label.
   */
  label: string;

  /**
   * Button variant.
   * @default 'secondary'
   */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';

  /**
   * Button URL.
   */
  href?: string;

  /**
   * JavaScript onclick handler.
   */
  onClick?: string;

  /**
   * Icon to display in the button.
   */
  icon?: IconName;
}

/**
 * Large card props - detailed preview cards.
 * Used for full object detail views.
 */
export interface LargeCardProps extends BaseCardProps {
  /**
   * Description or summary text.
   * Displayed in a gray background box.
   */
  description?: string;

  /**
   * Priority level for the card.
   */
  priority?: Priority;

  /**
   * Whether to show a priority star icon.
   * @default false
   */
  showPriorityIcon?: boolean;

  /**
   * Detailed metadata fields to display in a grid.
   */
  metadata?: Array<Omit<MetadataFieldProps, 'className' | 'id'>>;

  /**
   * Participants list with roles.
   */
  participants?: CardParticipant[];

  /**
   * Maximum participants to show before "View All".
   * @default 5
   */
  maxParticipants?: number;

  /**
   * Related object counts.
   */
  relatedObjects?: RelatedObjectCount[];

  /**
   * Activity timeline items.
   */
  activities?: Array<Omit<TimelineItemProps, 'className' | 'id'>>;

  /**
   * Maximum activities to show.
   * @default 3
   */
  maxActivities?: number;

  /**
   * Additional collapsible sections.
   */
  sections?: CardSection[];

  /**
   * Action buttons at the bottom of the card.
   */
  actions?: CardAction[];
}

/**
 * Feature card props - for index/showcase pages.
 * Used to highlight and link to object type pages.
 */
export interface FeatureCardProps extends BaseComponentProps, LinkableProps {
  /**
   * Feature/object type title.
   */
  title: string;

  /**
   * Description of what this feature/object does.
   */
  description: string;

  /**
   * Icon for the feature.
   */
  icon: IconName;

  /**
   * Color scheme for the icon container.
   */
  color: ColorScheme;

  /**
   * Category badge text.
   * @example 'Core', 'Documents', 'Workflow'
   */
  categoryBadge?: string;

  /**
   * Footer metadata text.
   * @example 'Small, Medium, Large + Dashboard'
   */
  footerText?: string;
}

/**
 * Grid card props - smaller cards for "All Wireframes" sections.
 */
export interface GridCardProps extends BaseComponentProps, LinkableProps {
  /**
   * Card title.
   */
  title: string;

  /**
   * Short subtitle/description.
   */
  subtitle: string;

  /**
   * Icon for the card.
   */
  icon: IconName;

  /**
   * Color scheme for the icon.
   */
  color: ColorScheme;
}
