# UX Improvements Guide

This document summarizes the UX improvements applied to Case.html, Complaint.html, Consultation.html, and Task.html. Use this as a checklist when refactoring other HTML wireframe files.

---

## Table of Contents

1. [Medium Cards Internal Grid](#1-medium-cards-internal-grid)
2. [Collapsible Sections in Large Cards](#2-collapsible-sections-in-large-cards)
3. [Activity Timeline in Large Cards](#3-activity-timeline-in-large-cards)
4. [Activity Timeline Sidebar Variant](#4-activity-timeline-sidebar-variant)
5. [Dashboard Widget Headers](#5-dashboard-widget-headers)
6. [Interaction States Section](#6-interaction-states-section)
7. [Timeline Icon Sizing (Large Cards)](#7-timeline-icon-sizing-large-cards)
8. [Timeline Dot Sizing (Sidebar)](#8-timeline-dot-sizing-sidebar)

---

## 1. Medium Cards Internal Grid

**Purpose:** Improve metadata layout on desktop with a 4-column grid.

### Before
```html
<div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
```

### After
```html
<div class="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3 mb-4">
```

### Notes
- Shows 2 columns on mobile, 4 columns on desktop (lg+)
- Use `gap-x-4 gap-y-3` for tighter vertical spacing
- Apply to all medium card metadata grids

---

## 2. Collapsible Sections in Large Cards

**Purpose:** Allow users to collapse/expand sections to reduce visual clutter.

### Pattern
Replace static section headers with collapsible button toggles:

```html
<!-- Before: Static header -->
<p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Section Name</p>

<!-- After: Collapsible toggle -->
<button class="w-full flex items-center justify-between text-left group mb-3" aria-expanded="true">
    <div class="flex items-center gap-2">
        <i class="fa-regular fa-folder text-gray-400"></i>
        <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Section Name</span>
    </div>
    <i class="fa-solid fa-chevron-up text-gray-400 group-hover:text-gray-600 transition-transform"></i>
</button>
```

### Common Section Icons
| Section | Icon |
|---------|------|
| Parent Object | `fa-regular fa-folder` |
| Related Items | `fa-solid fa-link` |
| Recent Activity | `fa-solid fa-clock-rotate-left` |
| Assignees/Watchers | `fa-solid fa-users` |
| Documents | `fa-solid fa-file-lines` |

---

## 3. Activity Timeline in Large Cards

**Purpose:** Show recent activity history within large card views.

### Structure
```html
<!-- Recent Activity Timeline -->
<div class="border-t border-gray-200 pt-5 mb-5">
    <button class="w-full flex items-center justify-between text-left group mb-3" aria-expanded="true">
        <div class="flex items-center gap-2">
            <i class="fa-solid fa-clock-rotate-left text-gray-400"></i>
            <span class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Recent Activity</span>
        </div>
        <i class="fa-solid fa-chevron-up text-gray-400 group-hover:text-gray-600 transition-transform"></i>
    </button>
    <div class="relative pl-6 border-l-2 border-gray-200 space-y-4">
        <!-- Timeline events go here -->
    </div>
    <button class="text-sm text-blue-600 hover:text-blue-700 font-medium mt-3 flex items-center">
        <i class="fa-solid fa-clock-rotate-left mr-1.5"></i>
        View full timeline
    </button>
</div>
```

### Timeline Event Pattern
```html
<div class="relative">
    <div class="absolute -left-[29px] w-6 h-6 bg-green-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
        <i class="fa-solid fa-circle text-green-600 text-[10px]"></i>
    </div>
    <div class="flex items-start justify-between">
        <div>
            <p class="text-sm font-medium text-gray-900">Status changed to "In Progress"</p>
            <p class="text-xs text-gray-500">by Jennifer Smith</p>
        </div>
        <span class="text-xs text-gray-400">2 hours ago</span>
    </div>
</div>
```

### Event Type Colors & Icons
| Event Type | Background | Icon | Icon Color |
|------------|------------|------|------------|
| Status Change | `bg-green-100` | `fa-circle` | `text-green-600` |
| Comment | `bg-blue-100` | `fa-comment` | `text-blue-600` |
| Assignment | `bg-purple-100` | `fa-user` | `text-purple-600` |
| Document Upload | `bg-amber-100` | `fa-file` | `text-amber-600` |
| Completion | `bg-teal-100` | `fa-check` | `text-teal-600` |
| Blocked/Alert | `bg-red-100` | `fa-exclamation` | `text-red-600` |
| Priority Change | `bg-amber-100` | `fa-flag` | `text-amber-600` |

---

## 4. Activity Timeline Sidebar Variant

**Purpose:** Add a compact activity timeline as a sidebar panel option.

### Grid Update
Change sidebar items grid from 3 to 4 columns:
```html
<!-- Before -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

<!-- After -->
<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
```

### Sidebar Timeline Panel
```html
<div>
    <h3 class="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
    <div class="bg-gray-100 rounded-lg p-4">
        <div class="bg-white rounded-lg border border-gray-200 shadow-sm w-64">
            <!-- Header -->
            <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-clock-rotate-left text-blue-600 text-sm"></i>
                    <span class="text-sm font-semibold text-gray-900">[Object] Activity</span>
                </div>
                <a href="#" class="text-xs text-blue-600 hover:text-blue-800 font-medium">View All</a>
            </div>
            <!-- Timeline Content -->
            <div class="p-3">
                <!-- Today Section -->
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Today</div>
                <div class="relative pl-6 border-l-2 border-gray-200 space-y-3 mb-4">
                    <!-- Timeline items -->
                </div>
                <!-- Yesterday Section -->
                <div class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Yesterday</div>
                <div class="relative pl-6 border-l-2 border-gray-200 space-y-3">
                    <!-- Timeline items -->
                </div>
            </div>
        </div>
    </div>
    <p class="text-xs text-gray-500 mt-3">Chronological feed of [object] events and updates</p>
</div>
```

### Sidebar Timeline Item Pattern
```html
<div class="relative">
    <div class="absolute -left-[21px] w-5 h-5 bg-green-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
        <div class="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
    </div>
    <div>
        <p class="text-xs font-medium text-gray-900">Status changed to "In Progress"</p>
        <div class="flex items-center gap-1 mt-0.5">
            <div class="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                <span class="text-[8px] font-medium text-blue-600">JS</span>
            </div>
            <span class="text-[10px] text-gray-500">2 hours ago</span>
        </div>
    </div>
</div>
```

---

## 5. Dashboard Widget Headers

**Purpose:** Add filtering options and improve touch targets for mobile.

### Pattern
```html
<div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-gray-900">My [Objects] Widget</h3>
    <div class="flex items-center gap-3">
        <!-- Desktop pill filters -->
        <div class="hidden sm:flex items-center gap-1">
            <button class="px-3 py-1.5 text-xs font-medium rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">All</button>
            <button class="px-3 py-1.5 text-xs font-medium rounded-full text-gray-600 hover:bg-gray-100 transition-colors">In Progress</button>
            <button class="px-3 py-1.5 text-xs font-medium rounded-full text-gray-600 hover:bg-gray-100 transition-colors">Blocked</button>
        </div>
        <!-- Mobile dropdown -->
        <select class="sm:hidden text-xs border border-gray-300 rounded-lg px-3 py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>All</option>
            <option>In Progress</option>
            <option>Blocked</option>
        </select>
        <!-- View All link -->
        <a href="#" class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
            View All
            <i class="fa-solid fa-arrow-right ml-1.5 text-xs"></i>
        </a>
    </div>
</div>
```

### Key Points
- Desktop: Pill-style filter buttons (hidden on mobile)
- Mobile: Dropdown with `min-h-[44px]` for touch accessibility
- View All: Enhanced with arrow icon and hover background

---

## 6. Interaction States Section

**Purpose:** Replace conceptual "Design Guidelines" with visual interaction state examples.

### Section Structure
```html
<!-- Interaction States Section -->
<section id="interaction-states-section" class="py-12 bg-gray-50">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
        <div class="mb-8">
            <h2 class="text-2xl font-semibold text-gray-900 mb-2">Interaction States</h2>
            <p class="text-gray-600">Visual reference for [object] card interaction states across the design system</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- 6 state cards go here -->
        </div>
    </div>
</section>
```

### State Cards

#### Default State
```html
<div class="space-y-3">
    <div class="flex items-center gap-2">
        <span class="px-2 py-1 text-xs font-medium rounded bg-gray-100 text-gray-700">Default</span>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg p-4">
        <!-- Card content -->
    </div>
    <p class="text-xs text-gray-500">Standard card appearance with no user interaction</p>
</div>
```

#### Hover State
```html
<div class="space-y-3">
    <div class="flex items-center gap-2">
        <span class="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700">Hover</span>
    </div>
    <div class="bg-gray-100 border border-gray-300 rounded-lg p-4 shadow-md cursor-pointer">
        <!-- Card content -->
    </div>
    <p class="text-xs text-gray-500">Background shifts, border darkens, shadow appears on mouse hover</p>
</div>
```

#### Selected State
```html
<div class="space-y-3">
    <div class="flex items-center gap-2">
        <span class="px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-700">Selected</span>
    </div>
    <div class="bg-blue-50 border-2 border-blue-600 rounded-lg p-4">
        <!-- Card content -->
    </div>
    <p class="text-xs text-gray-500">Blue tint background with prominent blue border for active selection</p>
</div>
```

#### Focus State (Keyboard)
```html
<div class="space-y-3">
    <div class="flex items-center gap-2">
        <span class="px-2 py-1 text-xs font-medium rounded bg-purple-100 text-purple-700">Focus (Keyboard)</span>
    </div>
    <div class="bg-white border-2 border-blue-500 rounded-lg p-4 ring-2 ring-blue-200 ring-offset-2">
        <!-- Card content -->
    </div>
    <p class="text-xs text-gray-500">Visible focus ring for keyboard navigation (WCAG 2.4.7 compliant)</p>
</div>
```

#### Disabled State
```html
<div class="space-y-3">
    <div class="flex items-center gap-2">
        <span class="px-2 py-1 text-xs font-medium rounded bg-gray-200 text-gray-600">Disabled</span>
    </div>
    <div class="bg-gray-50 border border-gray-200 rounded-lg p-4 opacity-50 cursor-not-allowed">
        <!-- Card content with grayed colors -->
    </div>
    <p class="text-xs text-gray-500">Reduced opacity with not-allowed cursor for unavailable items</p>
</div>
```

#### Loading Skeleton State
```html
<div class="space-y-3">
    <div class="flex items-center gap-2">
        <span class="px-2 py-1 text-xs font-medium rounded bg-amber-100 text-amber-700">Loading Skeleton</span>
    </div>
    <div class="bg-white border border-gray-200 rounded-lg p-4 animate-pulse">
        <div class="flex items-start gap-3">
            <div class="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
            <div class="flex-1 min-w-0 space-y-2">
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
                <div class="h-3 bg-gray-200 rounded w-1/2"></div>
                <div class="h-5 bg-gray-200 rounded w-20 mt-2"></div>
            </div>
        </div>
    </div>
    <p class="text-xs text-gray-500">Animated placeholder while content loads asynchronously</p>
</div>
```

---

## 7. Timeline Icon Sizing (Large Cards)

**Purpose:** Fix tiny timeline icons that render as barely visible dots.

### Before
```html
<div class="absolute -left-[25px] w-4 h-4 bg-green-100 rounded-full flex items-center justify-center border-2 border-white">
    <i class="fa-solid fa-circle-dot text-green-600 text-[8px]"></i>
</div>
```

### After
```html
<div class="absolute -left-[29px] w-6 h-6 bg-green-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
    <i class="fa-solid fa-circle text-green-600 text-[10px]"></i>
</div>
```

### Changes Summary
| Property | Before | After |
|----------|--------|-------|
| Container size | `w-4 h-4` (16px) | `w-6 h-6` (24px) |
| Icon size | `text-[8px]` | `text-[10px]` |
| Position | `-left-[25px]` | `-left-[29px]` |
| Shadow | none | `shadow-sm` |

### Icon Simplifications
| Before | After | Reason |
|--------|-------|--------|
| `fa-circle-dot` | `fa-circle` | Cleaner at small sizes |
| `fa-check-circle` | `fa-check` | Cleaner at small sizes |
| `fa-user-plus` | `fa-user` | Cleaner at small sizes |

---

## 8. Timeline Dot Sizing (Sidebar)

**Purpose:** Fix tiny dots in sidebar activity timeline panels.

### Before
```html
<div class="relative pl-5 border-l-2 border-gray-200 space-y-3">
    <div class="relative">
        <div class="absolute -left-[17px] w-3 h-3 bg-green-100 rounded-full flex items-center justify-center border-2 border-white">
            <div class="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        </div>
```

### After
```html
<div class="relative pl-6 border-l-2 border-gray-200 space-y-3">
    <div class="relative">
        <div class="absolute -left-[21px] w-5 h-5 bg-green-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            <div class="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
        </div>
```

### Changes Summary
| Property | Before | After |
|----------|--------|-------|
| Container padding | `pl-5` | `pl-6` |
| Outer circle | `w-3 h-3` (12px) | `w-5 h-5` (20px) |
| Inner dot | `w-1.5 h-1.5` (6px) | `w-2.5 h-2.5` (10px) |
| Position | `-left-[17px]` | `-left-[21px]` |
| Shadow | none | `shadow-sm` |

---

## Files Completed

- [x] Case.html
- [x] Complaint.html
- [x] Consultation.html
- [x] Task.html

## Files Remaining

- [ ] Associated Tag.html
- [ ] Audit Event.html
- [ ] Business Process.html
- [ ] Chat Conversation.html
- [ ] Chat Message.html
- [ ] Container.html
- [ ] Cost.html
- [ ] Costsheet.html
- [ ] File Object.html
- [ ] File Version.html
- [ ] Folder.html
- [ ] Group.html
- [ ] Note.html
- [ ] Notification.html
- [ ] Object Association.html
- [ ] Object History.html
- [ ] Organization.html
- [ ] Participant.html
- [ ] Person.html
- [ ] Queue.html
- [ ] Recycle Bin Item.html
- [ ] Subscription.html
- [ ] Tag.html
- [ ] User.html

---

## Quick Reference: Find & Replace Patterns

### Medium Card Grids
```
Find:    grid grid-cols-1 md:grid-cols-2 gap-3
Replace: grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3
```

### Large Card Timeline Icons
```
Find:    absolute -left-[25px] w-4 h-4 bg-{color}-100 rounded-full flex items-center justify-center border-2 border-white
Replace: absolute -left-[29px] w-6 h-6 bg-{color}-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm

Find:    text-{color}-600 text-[8px]
Replace: text-{color}-600 text-[10px]
```

### Sidebar Timeline Dots
```
Find:    relative pl-5 border-l-2 border-gray-200 space-y-3
Replace: relative pl-6 border-l-2 border-gray-200 space-y-3

Find:    absolute -left-[17px] w-3 h-3 bg-{color}-100 rounded-full flex items-center justify-center border-2 border-white
Replace: absolute -left-[21px] w-5 h-5 bg-{color}-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm

Find:    w-1.5 h-1.5 bg-{color}-500 rounded-full
Replace: w-2.5 h-2.5 bg-{color}-500 rounded-full
```

### Sidebar Grid (3 to 4 columns)
```
Find:    grid-cols-1 md:grid-cols-2 lg:grid-cols-3
Replace: grid-cols-1 md:grid-cols-2 xl:grid-cols-4
```
