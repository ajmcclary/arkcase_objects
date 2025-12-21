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
- **index.html** - Navigation hub with all 28 wireframes organized by category
- Each object file (Case.html, Task.html, etc.) contains:
  - Multiple card variants (small, medium, large)
  - Responsive grid layouts (mobile 1-col → tablet 2-col → desktop 3-col)

### Page Structure
All pages share a consistent responsive layout:
```
├── Header (fixed, h-16) - Hamburger menu (mobile), ArkCase logo, Design System badge (tablet+), search/notifications/help, avatar
├── Sidebar (fixed, w-64) - Off-canvas drawer on mobile, always visible on tablet+
├── Main Content (ml-0 md:ml-64) - Card variants and documentation
└── Footer (ml-0 md:ml-64, dark gradient) - 4-column grid with links
```

### Mobile Navigation
The layout uses a responsive off-canvas navigation pattern:
- **Mobile (<768px)**: Sidebar hidden, hamburger menu toggle, slide-out drawer with backdrop overlay
- **Tablet/Desktop (768px+)**: Sidebar always visible, no hamburger menu

Key elements:
- `#sidebar-toggle` - Hamburger button (visible on mobile only)
- `#sidebar-backdrop` - Dark overlay behind sidebar on mobile
- `#sidebar-close` - Close button inside sidebar (mobile only)
- JavaScript at end of `<body>` handles toggle, backdrop click, Escape key, and resize events

### Sidebar Categories
- **Core Objects**: Case, Complaint, Consultation, Task
- **People & Orgs**: Person, User, Organization, Group, Participant
- **Documents**: File Object, File Version, Folder, Container, Note
- **Workflow**: Queue, Business Process
- **Communication**: Chat Conversation, Chat Message, Notification, Subscription
- **Financial**: Cost, Costsheet
- **Metadata**: Tag, Associated Tag, Object Association
- **Audit**: Audit Event, Object History, Recycle Bin Item

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

### Sidebar Active State
The current page is highlighted in the sidebar with:
```html
<a class="flex items-center px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg">
    <i class="fa-solid fa-[icon] w-5 text-indigo-600"></i>
    <span class="ml-3">[Page Name]</span>
</a>
```

### Brand Colors
- **Primary**: Indigo (`indigo-600`) for logo and active states
- **Footer**: Dark gradient (`from-gray-800 via-gray-850 to-gray-900`)

## Business Objects

The 28 wireframe files cover: Associated Tag, Audit Event, Business Process, Case, Chat Conversation, Chat Message, Complaint, Consultation, Container, Cost, Costsheet, File Object, File Version, Folder, Group, Note, Notification, Object Association, Object History, Organization, Participant, Person, Queue, Recycle Bin Item, Subscription, Tag, Task, User.
