# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ArkCase UI Wireframes - A static HTML design system and component library for the ArkCase enterprise case management platform. Contains 28 HTML wireframe files, each representing a different business object or feature area.

## Development

**No build system** - This is a pure static HTML project:
- Open any `.html` file directly in a browser to preview
- Edit HTML files with any text editor
- No dependencies to install, no compilation required

## Architecture

### File Organization
Each HTML file represents a business object type (Case.html, Task.html, Person.html, etc.) and contains:
- Multiple card variants (small cards, medium cards, large cards where applicable)
- Responsive grid layouts (mobile 1-col → tablet 2-col → desktop 3-col)
- Consistent header, sidebar navigation, main content grid, and footer sections

### Technology Stack
- **Tailwind CSS** via CDN (`cdn.tailwindcss.com`)
- **Font Awesome 6.4.0** via CDN for icons
- **Inter font** from Google Fonts (weights: 300, 400, 500, 600, 700)

### Tailwind Configuration
Each file includes this inline config:
```html
<script>
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif']
        }
      }
    }
  }
</script>
```

## Code Patterns

### Card Components
Cards follow consistent patterns:
- `bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow`
- Icon containers use colored backgrounds: `bg-blue-100 text-blue-600`, `bg-green-100 text-green-600`, etc.
- Metadata displayed with `text-gray-500 text-sm`

### Responsive Grid
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Status Badges
```html
<span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Active</span>
```

## Business Objects

The 28 wireframe files cover: Associated Tag, Audit Event, Business Process, Case, Chat Conversation, Chat Message, Complaint, Consultation, Container, Cost, Costsheet, File Object, File Version, Folder, Group, Note, Notification, Object Association, Object History, Organization, Participant, Person, Queue, Recycle Bin Item, Subscription, Tag, Task, User.
