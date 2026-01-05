/**
 * PageLayout component for complete page structure.
 * @module components/layout/PageLayout
 */

import { html, raw } from '../../utils/html';
import { cn } from '../../utils/classnames';
import { buildAttrs } from '../../utils/attributes';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { TableOfContents, SCROLLSPY_SCRIPT } from './TableOfContents';
import { DEFAULT_NAVIGATION } from '../../constants/navigation';
import type { PageLayoutProps } from '../../types';

/**
 * Mobile navigation JavaScript code.
 * Handles sidebar toggle, backdrop, escape key, and resize events.
 */
const MOBILE_NAV_SCRIPT = `
(function() {
  const sidebar = document.getElementById("sidebar");
  const backdrop = document.getElementById("sidebar-backdrop");
  const toggleBtn = document.getElementById("sidebar-toggle");
  const closeBtn = document.getElementById("sidebar-close");
  let isOpen = false;

  // Remove loading class after initial render to enable transitions
  requestAnimationFrame(() => {
    sidebar?.classList.remove("sidebar-loading");
  });

  function openSidebar() {
    if (!sidebar || !backdrop) return;
    isOpen = true;
    sidebar.classList.remove("-translate-x-full");
    sidebar.classList.add("translate-x-0");
    backdrop.classList.remove("hidden", "opacity-0");
    backdrop.classList.add("opacity-100");
    toggleBtn?.setAttribute("aria-expanded", "true");
    document.body.classList.add("overflow-hidden", "md:overflow-auto");
  }

  function closeSidebar() {
    if (!sidebar || !backdrop) return;
    isOpen = false;
    sidebar.classList.add("-translate-x-full");
    sidebar.classList.remove("translate-x-0");
    backdrop.classList.remove("opacity-100");
    backdrop.classList.add("opacity-0");
    toggleBtn?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("overflow-hidden", "md:overflow-auto");

    // Delay hiding backdrop to allow opacity transition
    setTimeout(() => {
      if (!isOpen) {
        backdrop.classList.add("hidden");
      }
    }, 300);
  }

  // Toggle button click
  toggleBtn?.addEventListener("click", () => {
    isOpen ? closeSidebar() : openSidebar();
  });

  // Close button click
  closeBtn?.addEventListener("click", closeSidebar);

  // Backdrop click
  backdrop?.addEventListener("click", closeSidebar);

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) {
      closeSidebar();
    }
  });

  // Close on navigation link click (mobile)
  sidebar?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        closeSidebar();
      }
    });
  });

  // Close on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && isOpen) {
      closeSidebar();
    }
  });
})();
`;

/**
 * Renders a complete page layout.
 *
 * Combines Header, Sidebar, main content area, and Footer into a
 * complete HTML page structure. Includes all necessary CDN links,
 * Tailwind configuration, and mobile navigation JavaScript.
 *
 * @param props - PageLayout configuration
 * @returns Complete HTML document string
 *
 * @example
 * ```ts
 * import { DEFAULT_NAVIGATION } from '../../constants/navigation';
 *
 * PageLayout({
 *   title: 'Case Cards - ArkCase Design System',
 *   children: '<div>Page content here</div>',
 *   activePage: 'Case.html',
 *   sidebar: { navigation: DEFAULT_NAVIGATION }
 * })
 * ```
 */
export function PageLayout(props: PageLayoutProps): string {
  const {
    title,
    description,
    header = {},
    sidebar = {},
    footer = {},
    children,
    activePage,
    tableOfContents,
    headContent = '',
    bodyScripts = '',
    id,
    className,
    dataAttributes = {},
  } = props;

  // Adjust main content width when TOC is present (170px TOC width)
  const mainClasses = cn(
    'flex-1 ml-0 md:ml-64 min-h-screen',
    tableOfContents && 'has-toc',
    className
  );

  // Merge navigation with defaults if not provided
  const sidebarProps = {
    navigation: DEFAULT_NAVIGATION,
    activePage,
    ...sidebar,
  };

  // Generate TOC HTML if provided
  const tocHtml = tableOfContents
    ? TableOfContents({
        title: tableOfContents.title || 'On this page',
        items: tableOfContents.items,
      })
    : '';

  // Include scrollspy script if TOC is present
  const scrollspyScript = tableOfContents
    ? `<script>${SCROLLSPY_SCRIPT}</script>`
    : '';

  return html`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${raw(description ? `<meta name="description" content="${description}">` : '')}

  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Font Awesome -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"></script>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

  <!-- Custom Styles -->
  <style>
    ::-webkit-scrollbar { display: none; }
    html { scroll-behavior: smooth; }
    .sidebar-loading { transition: none !important; }
    @media (min-width: 1024px) {
      .has-toc { margin-right: 200px; }
    }
  </style>

  <!-- Tailwind Config -->
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ["Inter", "system-ui", "sans-serif"],
          },
        },
      },
    };
  </script>

  ${raw(headContent)}
</head>
<body class="bg-gray-50 font-sans antialiased">
  ${raw(Header(header))}

  <div class="flex pt-16"${raw(buildAttrs(id, dataAttributes))}>
    ${raw(Sidebar(sidebarProps))}

    <main id="main-content" class="${mainClasses}">
      ${raw(children)}
    </main>

    <!-- Table of Contents (fixed position) -->
    ${raw(tocHtml)}
  </div>

  ${raw(Footer(footer))}

  <!-- Mobile Navigation Script -->
  <script>${raw(MOBILE_NAV_SCRIPT)}</script>

  <!-- Scrollspy Script -->
  ${raw(scrollspyScript)}

  ${raw(bodyScripts)}
</body>
</html>`;
}
