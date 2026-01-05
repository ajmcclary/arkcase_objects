/**
 * UI components for the ArkCase Design System.
 * @module components/ui
 */

// Basic UI components
export { StatusBadge } from './StatusBadge';
export { IconContainer } from './IconContainer';
export { Button } from './Button';
export { Avatar } from './Avatar';
export { AvatarGroup } from './AvatarGroup';
export { MetadataField } from './MetadataField';
export { ParticipantItem } from './ParticipantItem';
export { RelatedObjectBox } from './RelatedObjectBox';

// Section and layout components
export { SectionHeader } from './SectionHeader';
export { SectionGroupHeader } from './SectionGroupHeader';
export { ActivityTimeline } from './ActivityTimeline';
export { TimelineItem } from './TimelineItem';
export { StatisticsCard } from './StatisticsCard';
export { DashboardWidget } from './DashboardWidget';
export { FilterPanel, FilterToggleButton } from './FilterPanel';
export { CardComparison } from './CardComparison';

// Documentation components
export { StatusVariantCard } from './StatusVariantCard';
export { InteractionStateCard } from './InteractionStateCard';
export { SidebarDemo } from './SidebarDemo';
export { ResponsiveTable } from './ResponsiveTable';
export { UsageGuidelines, CardSystemSummary } from './UsageGuidelines';

// Re-export types for convenience
// SectionHeaderProps is defined in and exported from ../../types
export type { SectionHeaderProps } from '../../types';
export type { SectionGroupHeaderProps } from './SectionGroupHeader';
export type { ParticipantItemProps } from './ParticipantItem';
export type { RelatedObjectBoxProps } from './RelatedObjectBox';
export type { ActivityTimelineProps } from './ActivityTimeline';
export type { StatisticsCardProps } from './StatisticsCard';
export type { DashboardWidgetProps, FilterTab } from './DashboardWidget';
export type { FilterPanelProps, FilterGroup, FilterOption, SortOption } from './FilterPanel';
export type { CardComparisonProps, CardVariant } from './CardComparison';
export type { StatusVariantCardProps } from './StatusVariantCard';
export type { InteractionStateCardProps, InteractionState } from './InteractionStateCard';
export type { SidebarDemoProps, SidebarDemoItem } from './SidebarDemo';
export type { ResponsiveTableProps, TableColumn, TableRow } from './ResponsiveTable';
export type { UsageGuidelinesProps, GuidelineCard, GuidelineItem, CardSystemSummaryProps, SummaryItem, CorePrinciple } from './UsageGuidelines';
