/**
 * Collapsible sections script for LargeCard expandable panels.
 * @module scripts/collapsible-sections
 */

/**
 * JavaScript code for collapsible section toggle functionality.
 * Handles expand/collapse with aria states and chevron rotation.
 */
export const COLLAPSIBLE_SECTIONS_SCRIPT = `
(function() {
  // Find all collapsible toggle buttons (buttons with aria-expanded)
  const toggleButtons = document.querySelectorAll('button[aria-expanded]');

  toggleButtons.forEach(function(button) {
    // Skip non-collapsible buttons (like sidebar toggle, filter toggle)
    if (button.id === 'sidebar-toggle' || button.id === 'filter-toggle') return;

    // Get the content panel (next sibling element)
    const content = button.nextElementSibling;
    if (!content) return;

    // Get the chevron icon
    const chevron = button.querySelector('.fa-chevron-up, .fa-chevron-down');

    button.addEventListener('click', function() {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';

      if (isExpanded) {
        // Collapse
        button.setAttribute('aria-expanded', 'false');
        content.style.display = 'none';
        if (chevron) {
          chevron.classList.remove('fa-chevron-up');
          chevron.classList.add('fa-chevron-down');
        }
      } else {
        // Expand
        button.setAttribute('aria-expanded', 'true');
        content.style.display = '';
        if (chevron) {
          chevron.classList.remove('fa-chevron-down');
          chevron.classList.add('fa-chevron-up');
        }
      }
    });
  });
})();
`;
