# Repository Guidelines

## Project Structure & Module Organization
This repo is a static HTML wireframe library for ArkCase UI objects.
- Root: individual object pages like `Case.html`, `Task.html`, `Person.html`.
- `index.html`: navigation hub linking all wireframes.
- `research/`: reference material and data dictionaries (`*.md`, `*.csv`).
Each object page follows a shared layout (header, sidebar, main content, footer) and Tailwind utility classes.

## Build, Test, and Development Commands
There is no build system or dependency install.
- Open any HTML file directly in a browser (e.g., `index.html`) to preview.
- Edit files in-place with your editor; refresh the browser to see changes.

## Coding Style & Naming Conventions
- HTML is hand-authored; keep formatting readable and consistent.
- Tailwind CSS is loaded via CDN and configured inline per page.
- Use consistent naming for files: `Title Case.html` matches the object name.
- Follow existing class patterns for cards, grids, and badges to preserve visual consistency.

## Testing Guidelines
No automated tests are present.
- Manually verify in a browser after changes.
- Spot-check layout at common breakpoints (mobile/tablet/desktop) using responsive grids.

## Commit & Pull Request Guidelines
Recent commits use short, imperative messages (e.g., "Add", "Standardize").
- Keep commit subjects concise and action-oriented.
- PRs should describe the visual intent, list affected pages, and include screenshots for UI changes.
- Link related issues or tickets when applicable.

## Security & Configuration Tips
- External assets (Tailwind, Font Awesome, Google Fonts) are loaded via CDN; keep versions consistent across pages.
- Avoid adding runtime dependencies unless the project scope expands.
