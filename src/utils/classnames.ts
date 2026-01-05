/**
 * Valid class name value types.
 * Supports strings, false, null, and undefined for conditional classes.
 */
type ClassValue = string | false | null | undefined;

/**
 * Conditionally joins CSS class names together.
 * Filters out falsy values, making it easy to conditionally include classes.
 *
 * @param classes - Class names or conditional expressions
 * @returns A space-separated string of class names
 *
 * @example
 * ```ts
 * // Basic usage
 * cn('base', 'additional');
 * // Result: "base additional"
 *
 * // Conditional classes
 * const isActive = true;
 * const isDisabled = false;
 * cn('btn', isActive && 'btn-active', isDisabled && 'btn-disabled');
 * // Result: "btn btn-active"
 *
 * // Size variants
 * const size = 'lg';
 * cn('icon', size === 'sm' && 'w-8', size === 'md' && 'w-10', size === 'lg' && 'w-12');
 * // Result: "icon w-12"
 *
 * // With nullable values
 * const customClass: string | undefined = undefined;
 * cn('base', customClass);
 * // Result: "base"
 * ```
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Merges multiple class strings, handling duplicates.
 * Unlike cn(), this splits existing class strings and deduplicates.
 *
 * @param classes - Class strings to merge
 * @returns A space-separated string of unique class names
 *
 * @example
 * ```ts
 * mergeClasses('p-4 text-sm', 'p-4 text-lg');
 * // Result: "p-4 text-sm text-lg"
 * ```
 */
export function mergeClasses(...classes: ClassValue[]): string {
  const allClasses = classes
    .filter(Boolean)
    .flatMap((cls) => (cls as string).split(/\s+/));

  return [...new Set(allClasses)].join(' ');
}
