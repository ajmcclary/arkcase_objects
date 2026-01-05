/**
 * TableOfContents component for page navigation with scrollspy.
 * @module components/layout/TableOfContents
 */

import { html, raw, joinHtml } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import type { BaseComponentProps } from '../../types';

/**
 * Table of contents item configuration.
 */
export interface TocItem {
  /** Display label for the item */
  label: string;
  /** Target section ID (without #) */
  targetId: string;
  /** Indentation level (0 = top level, 1 = nested) */
  level?: 0 | 1;
}

/**
 * Props for the TableOfContents component.
 */
export interface TableOfContentsProps extends BaseComponentProps {
  /** Title for the TOC section */
  title?: string;
  /** TOC items to display */
  items: TocItem[];
  /** Whether to use sticky positioning */
  sticky?: boolean;
  /** Top offset when sticky (accounts for header) */
  stickyTop?: string;
}

/**
 * Scrollspy JavaScript code.
 * Observes sections and updates active TOC item based on scroll position.
 */
export const SCROLLSPY_SCRIPT = `
(function() {
  const tocContainer = document.getElementById("table-of-contents");
  if (!tocContainer) return;

  const tocLinks = tocContainer.querySelectorAll("a[data-toc-link]");
  const sections = [];

  // Gather all target sections
  tocLinks.forEach((link) => {
    const targetId = link.getAttribute("href")?.replace("#", "");
    if (targetId) {
      const section = document.getElementById(targetId);
      if (section) {
        sections.push({ id: targetId, element: section, link: link });
      }
    }
  });

  if (sections.length === 0) return;

  // Track active state
  let activeLink = null;

  function setActiveLink(link) {
    if (activeLink === link) return;

    // Remove active state from previous link
    if (activeLink) {
      activeLink.classList.remove("toc-active");
    }

    // Add active state to new link
    if (link) {
      link.classList.add("toc-active");
    }

    activeLink = link;
  }

  // Create intersection observer
  const observerOptions = {
    root: null,
    rootMargin: "-80px 0px -60% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const section = sections.find(s => s.element === entry.target);
        if (section) {
          setActiveLink(section.link);
        }
      }
    });
  }, observerOptions);

  // Observe all sections
  sections.forEach((section) => {
    observer.observe(section.element);
  });

  // Handle click events for smooth scrolling
  tocLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href")?.replace("#", "");
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        const headerOffset = 80;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });

        // Update active link immediately on click
        setActiveLink(link);

        // Update URL hash without jumping
        history.pushState(null, "", "#" + targetId);
      }
    });
  });

  // Set initial active based on hash or first section
  const initialHash = window.location.hash.replace("#", "");
  const initialSection = sections.find(s => s.id === initialHash) || sections[0];
  if (initialSection) {
    setActiveLink(initialSection.link);
  }
})();
`;

/**
 * Renders a table of contents component with scrollspy support.
 *
 * Creates a sticky sidebar navigation that highlights the current
 * section as the user scrolls through the page.
 *
 * @param props - TableOfContents configuration
 * @returns HTML string
 *
 * @example
 * ```ts
 * TableOfContents({
 *   title: 'On this page',
 *   items: [
 *     { label: 'Overview', targetId: 'overview' },
 *     { label: 'Small Cards', targetId: 'small-cards-section' },
 *     { label: 'Medium Cards', targetId: 'medium-cards-section' },
 *     { label: 'Large Cards', targetId: 'large-cards-section' },
 *   ]
 * })
 * ```
 */
/**
 * CSS styles for the table of contents.
 * Includes hover, active, and focus states.
 */
export const TOC_STYLES = `
  /* TOC Link Base Styles */
  .toc-link {
    position: relative;
    display: block;
    padding: 8px 12px 8px 16px;
    font-size: 13px;
    line-height: 1.4;
    color: #64748b;
    text-decoration: none;
    border-left: 2px solid transparent;
    margin-left: -1px;
    transition: all 0.15s ease;
  }

  /* Hover State */
  .toc-link:hover {
    color: #334155;
    background-color: #f8fafc;
    border-left-color: #cbd5e1;
  }

  /* Active State (via scrollspy) */
  .toc-link.toc-active {
    color: #2563eb;
    font-weight: 500;
    background-color: #eff6ff;
    border-left-color: #2563eb;
  }

  /* Focus State for Accessibility */
  .toc-link:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
    border-radius: 2px;
  }

  /* Focus-visible for keyboard navigation only */
  .toc-link:focus:not(:focus-visible) {
    box-shadow: none;
  }

  .toc-link:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #3b82f6;
    border-radius: 2px;
  }

  /* Nested Items */
  .toc-link--nested {
    padding-left: 28px;
    font-size: 12px;
  }
`;

export function TableOfContents(props: TableOfContentsProps): string {
  const {
    title = 'On this page',
    items,
    sticky = true,
    stickyTop = 'top-20',
    id = 'table-of-contents',
    className,
    dataAttributes = {},
  } = props;

  // Show on lg screens (1024px+)
  const wrapperClasses = cn(
    'hidden lg:block fixed right-0 top-16 bottom-0 bg-white',
    className
  );

  const tocItems = items.map((item) => {
    const nestedClass = item.level === 1 ? 'toc-link--nested' : '';

    return html`
      <a
        href="#${item.targetId}"
        data-toc-link
        class="toc-link ${nestedClass}"
      >
        ${item.label}
      </a>
    `;
  });

  return html`
    <style>${TOC_STYLES}</style>
    <aside${raw(buildAttrs(id, dataAttributes))} class="${wrapperClasses}" style="width: 200px;">
      <nav class="py-5 overflow-y-auto h-full">
        <h5 class="px-4 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          ${title}
        </h5>
        <div class="border-l border-gray-200 ml-4">
          ${joinHtml(tocItems)}
        </div>
      </nav>
    </aside>
  `;
}
