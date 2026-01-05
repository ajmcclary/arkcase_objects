/**
 * Filter panel toggle script for mobile responsiveness.
 * @module scripts/filter-toggle
 */

/**
 * JavaScript code for filter panel toggle functionality.
 * Handles expand/collapse on mobile and reset on desktop resize.
 */
export const FILTER_TOGGLE_SCRIPT = `
(function() {
  const filterToggle = document.getElementById("filter-toggle");
  const filterPanel = document.getElementById("filter-panel");
  const filterChevron = document.getElementById("filter-chevron");

  if (!filterToggle || !filterPanel) return;

  filterToggle.addEventListener("click", function() {
    const isExpanded = filterToggle.getAttribute("aria-expanded") === "true";

    if (isExpanded) {
      // Collapse
      filterPanel.classList.add("hidden");
      filterPanel.classList.remove("block");
      filterPanel.setAttribute("aria-hidden", "true");
      filterToggle.setAttribute("aria-expanded", "false");
      if (filterChevron) filterChevron.classList.remove("rotate-180");
    } else {
      // Expand
      filterPanel.classList.remove("hidden");
      filterPanel.classList.add("block");
      filterPanel.setAttribute("aria-hidden", "false");
      filterToggle.setAttribute("aria-expanded", "true");
      if (filterChevron) filterChevron.classList.add("rotate-180");
    }
  });

  // Reset filter panel visibility on resize to desktop
  window.addEventListener("resize", function() {
    if (window.innerWidth >= 768) {
      filterPanel.classList.remove("hidden", "block");
      filterPanel.classList.add("md:block");
    }
  });
})();
`;
