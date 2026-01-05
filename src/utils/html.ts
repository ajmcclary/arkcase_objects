/**
 * Marker interface for raw HTML strings that should not be escaped.
 */
export interface RawHtml {
  __html: string;
}

/**
 * Marks a string as safe HTML that should not be escaped.
 * Use this when you need to include pre-rendered HTML content.
 *
 * @param value - The HTML string to mark as safe
 * @returns A RawHtml marker object
 *
 * @example
 * ```ts
 * const icon = '<i class="fa-solid fa-user"></i>';
 * html`<div>${raw(icon)}</div>`;
 * // Result: <div><i class="fa-solid fa-user"></i></div>
 * ```
 */
export function raw(value: string): RawHtml {
  return { __html: value };
}

/**
 * Escapes HTML special characters to prevent XSS attacks.
 *
 * @param value - The value to escape
 * @returns The escaped string
 */
function escapeHtml(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }

  // Check for raw HTML marker - don't escape
  if (typeof value === 'object' && value !== null && '__html' in value) {
    return (value as RawHtml).__html;
  }

  // Check for arrays - join them
  if (Array.isArray(value)) {
    return value.map(escapeHtml).join('');
  }

  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Tagged template literal for generating HTML strings with automatic escaping.
 * All interpolated values are escaped by default to prevent XSS attacks.
 * Use the `raw()` function to include pre-rendered HTML content.
 *
 * @param strings - The template string literals
 * @param values - The interpolated values
 * @returns The rendered HTML string
 *
 * @example
 * ```ts
 * // Basic usage with auto-escaping
 * const name = "John <script>";
 * html`<div>Hello, ${name}</div>`;
 * // Result: <div>Hello, John &lt;script&gt;</div>
 *
 * // Using raw() for pre-rendered HTML
 * const icon = '<i class="fa-solid fa-user"></i>';
 * html`<div>${raw(icon)}</div>`;
 * // Result: <div><i class="fa-solid fa-user"></i></div>
 *
 * // Composing components
 * const badge = StatusBadge({ status: 'active' });
 * html`<div class="card">${raw(badge)}</div>`;
 * ```
 */
export function html(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string {
  let result = strings[0];

  for (let i = 0; i < values.length; i++) {
    result += escapeHtml(values[i]);
    result += strings[i + 1];
  }

  return result;
}

/**
 * Joins multiple HTML strings together.
 * Useful for mapping arrays of components.
 *
 * @param parts - Array of HTML strings to join
 * @param separator - Optional separator between parts
 * @returns The joined HTML string wrapped in raw()
 *
 * @example
 * ```ts
 * const items = ['Apple', 'Banana', 'Cherry'];
 * const list = joinHtml(items.map(item => html`<li>${item}</li>`));
 * html`<ul>${list}</ul>`;
 * ```
 */
export function joinHtml(parts: string[], separator = ''): RawHtml {
  return raw(parts.join(separator));
}
