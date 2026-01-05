/**
 * HTML attribute building utilities.
 * @module utils/attributes
 */

/**
 * Builds a data attributes string from a record of key-value pairs.
 *
 * @param attrs - Record of attribute names (without 'data-' prefix) to values
 * @returns Formatted data attributes string (e.g., 'data-foo="bar" data-baz="qux"')
 *
 * @example
 * ```ts
 * buildDataAttrs({ id: '123', type: 'card' })
 * // Returns: 'data-id="123" data-type="card"'
 *
 * buildDataAttrs({})
 * // Returns: ''
 *
 * buildDataAttrs(undefined)
 * // Returns: ''
 * ```
 */
export function buildDataAttrs(attrs?: Record<string, string>): string {
  if (!attrs || Object.keys(attrs).length === 0) {
    return '';
  }

  return Object.entries(attrs)
    .map(([key, value]) => `data-${key}="${value}"`)
    .join(' ');
}

/**
 * Builds an id attribute string if an id is provided.
 *
 * @param id - Optional element ID
 * @returns Formatted id attribute string (e.g., ' id="my-id"') or empty string
 *
 * @example
 * ```ts
 * buildIdAttr('my-element')
 * // Returns: ' id="my-element"'
 *
 * buildIdAttr(undefined)
 * // Returns: ''
 * ```
 */
export function buildIdAttr(id?: string): string {
  return id ? ` id="${id}"` : '';
}

/**
 * Builds both id and data attributes for a component.
 *
 * @param id - Optional element ID
 * @param dataAttributes - Optional data attributes record
 * @returns Combined attributes string
 *
 * @example
 * ```ts
 * buildAttrs('my-card', { type: 'small', status: 'active' })
 * // Returns: ' id="my-card" data-type="small" data-status="active"'
 *
 * buildAttrs(undefined, { type: 'small' })
 * // Returns: ' data-type="small"'
 * ```
 */
export function buildAttrs(
  id?: string,
  dataAttributes?: Record<string, string>
): string {
  const idAttr = buildIdAttr(id);
  const dataAttrs = buildDataAttrs(dataAttributes);
  const spacer = dataAttrs ? ' ' : '';

  return `${idAttr}${spacer}${dataAttrs}`;
}
