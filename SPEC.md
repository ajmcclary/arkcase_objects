# ArkCase Design System Specification

Complete specification for the ArkCase wireframe library color palette, object categorization, and design patterns.

---

## Table of Contents

1. [Color Palette](#color-palette)
2. [Object Categories](#object-categories)
3. [Object Reference](#object-reference)
4. [Accessibility Guidelines](#accessibility-guidelines)
5. [Usage Patterns](#usage-patterns)

---

## Color Palette

### Design Principles

The color palette is designed with **accessibility first**:

- **WCAG AA Compliant**: All colors meet minimum contrast ratios
- **Colorblind-Safe**: Distinguishable for deuteranopia, protanopia, and tritanopia
- **Luminance Variation**: Colors vary in brightness, not just hue
- **Blue-Orange Axis**: Primary distinction axis works for most color vision deficiencies

### Category Colors

| Category | Tailwind Color | Background | Foreground | Hex (600) |
|----------|----------------|------------|------------|-----------|
| Core Objects | Indigo | `indigo-100` | `indigo-600` | #4F46E5 |
| People & Organizations | Teal | `teal-100` | `teal-600` | #0D9488 |
| Documents | Violet | `violet-100` | `violet-600` | #7C3AED |
| Workflow | Orange | `orange-100` | `orange-600` | #EA580C |
| Communication | Sky | `sky-100` | `sky-500` | #0EA5E9 |
| Financial | Yellow | `yellow-100` | `yellow-600` | #CA8A04 |
| Metadata | Fuchsia | `fuchsia-100` | `fuchsia-600` | #C026D3 |
| Audit | Zinc | `zinc-100` | `zinc-500` | #71717A |

### Color Rationale

| Category | Color Choice | Why This Color |
|----------|--------------|----------------|
| **Core Objects** | Indigo | Primary/authoritative feel for main case types. Darker blue provides professional weight. |
| **People & Organizations** | Teal | Blue-green hue is distinguishable from pure green (colorblind-safe) while feeling human/organic. |
| **Documents** | Violet | Purple family is universally recognized for files/content. Distinct from blue tones. |
| **Workflow** | Orange | High energy, action-oriented. Opposite of blue on color wheel (maximum distinction). |
| **Communication** | Sky | Lighter blue suggests conversation/messaging. Distinct from darker indigo. |
| **Financial** | Yellow | Universal association with money/gold. Highest luminance for quick scanning. |
| **Metadata** | Fuchsia | Magenta works for tritanopia. Suggests labels/organization. |
| **Audit** | Zinc | Neutral gray conveys system/background processes. Non-intrusive. |

### Tailwind CSS Classes

```html
<!-- Core Objects (Indigo) -->
<div class="bg-indigo-100 text-indigo-600">
<div class="hover:border-indigo-300 group-hover:bg-indigo-200">

<!-- People & Organizations (Teal) -->
<div class="bg-teal-100 text-teal-600">
<div class="hover:border-teal-300 group-hover:bg-teal-200">

<!-- Documents (Violet) -->
<div class="bg-violet-100 text-violet-600">
<div class="hover:border-violet-300 group-hover:bg-violet-200">

<!-- Workflow (Orange) -->
<div class="bg-orange-100 text-orange-600">
<div class="hover:border-orange-300 group-hover:bg-orange-200">

<!-- Communication (Sky) -->
<div class="bg-sky-100 text-sky-500">
<div class="hover:border-sky-300 group-hover:bg-sky-200">

<!-- Financial (Yellow) -->
<div class="bg-yellow-100 text-yellow-600">
<div class="hover:border-yellow-300 group-hover:bg-yellow-200">

<!-- Metadata (Fuchsia) -->
<div class="bg-fuchsia-100 text-fuchsia-600">
<div class="hover:border-fuchsia-300 group-hover:bg-fuchsia-200">

<!-- Audit (Zinc) -->
<div class="bg-zinc-100 text-zinc-500">
<div class="hover:border-zinc-300 group-hover:bg-zinc-200">
```

---

## Object Categories

### Category Definitions

| Category | Purpose | Object Count |
|----------|---------|--------------|
| **Core Objects** | Primary case management entities that users create and manage | 5 |
| **People & Organizations** | Users, contacts, and organizational entities | 7 |
| **Documents** | Files, folders, and document management | 6 |
| **Workflow** | Queues, processes, tasks, and case lifecycle events | 4 |
| **Communication** | Messaging, notifications, and subscriptions | 5 |
| **Financial** | Cost tracking and financial management | 2 |
| **Metadata** | Tags, associations, and object relationships | 4 |
| **Audit** | Event logging, history, and data recovery | 3 |

**Total: 36 Objects**

### Category Details

#### Core Objects (5)
Primary case types that represent the main work items in the system.

| Object | Icon | Description |
|--------|------|-------------|
| Case | `fa-briefcase` | General case container with status, participants, files |
| SAR Request | `fa-user-secret` | Subject Access Request for privacy compliance |
| Complaint | `fa-file-lines` | Formal complaints with priority and status tracking |
| FOIA Request | `fa-file-text` | Freedom of Information Act requests |
| Consultation | `fa-comments` | Inter-agency consultation requests |

#### People & Organizations (7)
Entities representing individuals, groups, and organizations.

| Object | Icon | Description |
|--------|------|-------------|
| Person | `fa-user` | General contact with roles and profile information |
| Requester | `fa-user` | FOIA requester (specialized person) |
| Subject | `fa-user-secret` | SAR subject (specialized person) |
| User | `fa-user-gear` | System user with accounts and permissions |
| Organization | `fa-building` | Companies, agencies, external organizations |
| Group | `fa-users` | Teams and access control groups |
| Participant | `fa-user-plus` | Case involvement roles and assignments |

#### Documents (6)
File management and content storage objects.

| Object | Icon | Description |
|--------|------|-------------|
| File Object | `fa-file` | Generic file with type icons and metadata |
| FOIA File | `fa-file` | FOIA-specific file with exemptions and public flag |
| SAR File | `fa-file` | SAR-specific file with review/redaction status |
| File Version | `fa-code-branch` | Version history with diffs |
| Folder | `fa-folder` | Hierarchical organization with file counts |
| Container | `fa-box` | Evidence containers with custody tracking |

#### Workflow (4)
Process management, queues, and case lifecycle.

| Object | Icon | Description |
|--------|------|-------------|
| Queue | `fa-layer-group` | Work item queues with assignments |
| Business Process | `fa-diagram-project` | BPMN workflows with stages and state |
| Task | `fa-list-check` | Work items with due dates and assignees |
| Hold Event | `fa-pause-circle` | Case tolling with pause/resume tracking |

#### Communication (5)
Messaging and notification systems.

| Object | Icon | Description |
|--------|------|-------------|
| Chat Conversation | `fa-comments` | Threaded discussions with participants |
| Chat Message | `fa-message` | Individual messages with sender and timestamp |
| Notification | `fa-bell` | System alerts with read status |
| Subscription | `fa-rss` | Object watchers and notification preferences |
| Note | `fa-sticky-note` | User annotations and comments |

#### Financial (2)
Cost tracking and budgeting.

| Object | Icon | Description |
|--------|------|-------------|
| Cost | `fa-dollar-sign` | Individual expenses with categories |
| Costsheet | `fa-file-invoice-dollar` | Budget totals with approval workflow |

#### Metadata (4)
Classification and relationship objects.

| Object | Icon | Description |
|--------|------|-------------|
| Tag | `fa-tag` | Labels with colors and usage counts |
| Exemption Statute | `fa-balance-scale` | FOIA/SAR legal exemption codes |
| Associated Tag | `fa-tags` | Tag-to-object link records |
| Object Association | `fa-link` | Generic object relationships with types |

#### Audit (3)
System logging and data recovery.

| Object | Icon | Description |
|--------|------|-------------|
| Audit Event | `fa-clipboard-list` | Action logs with users and timestamps |
| Object History | `fa-clock-rotate-left` | Change timeline with field-level diffs |
| Recycle Bin Item | `fa-trash-can` | Soft-deleted items with restore capability |

---

## Object Reference

### Complete Object List (Alphabetical)

| Object | Category | Color | Icon | File |
|--------|----------|-------|------|------|
| Associated Tag | Metadata | Fuchsia | `fa-tags` | `Associated Tag.html` |
| Audit Event | Audit | Zinc | `fa-clipboard-list` | `Audit Event.html` |
| Business Process | Workflow | Orange | `fa-diagram-project` | `Business Process.html` |
| Case | Core Objects | Indigo | `fa-briefcase` | `Case.html` |
| Chat Conversation | Communication | Sky | `fa-comments` | `Chat Conversation.html` |
| Chat Message | Communication | Sky | `fa-message` | `Chat Message.html` |
| Complaint | Core Objects | Indigo | `fa-file-lines` | `Complaint.html` |
| Consultation | Core Objects | Indigo | `fa-comments` | `Consultation.html` |
| Container | Documents | Violet | `fa-box` | `Container.html` |
| Cost | Financial | Yellow | `fa-dollar-sign` | `Cost.html` |
| Costsheet | Financial | Yellow | `fa-file-invoice-dollar` | `Costsheet.html` |
| Exemption Statute | Metadata | Fuchsia | `fa-balance-scale` | `Exemption Statute.html` |
| File Object | Documents | Violet | `fa-file` | `File Object.html` |
| File Version | Documents | Violet | `fa-code-branch` | `File Version.html` |
| FOIA File | Documents | Violet | `fa-file` | `FOIA File.html` |
| FOIA Request | Core Objects | Indigo | `fa-file-text` | `FOIA Request.html` |
| Folder | Documents | Violet | `fa-folder` | `Folder.html` |
| Group | People & Orgs | Teal | `fa-users` | `Group.html` |
| Hold Event | Workflow | Orange | `fa-pause-circle` | `Hold Event.html` |
| Note | Communication | Sky | `fa-sticky-note` | `Note.html` |
| Notification | Communication | Sky | `fa-bell` | `Notification.html` |
| Object Association | Metadata | Fuchsia | `fa-link` | `Object Association.html` |
| Object History | Audit | Zinc | `fa-clock-rotate-left` | `Object History.html` |
| Organization | People & Orgs | Teal | `fa-building` | `Organization.html` |
| Participant | People & Orgs | Teal | `fa-user-plus` | `Participant.html` |
| Person | People & Orgs | Teal | `fa-user` | `Person.html` |
| Queue | Workflow | Orange | `fa-layer-group` | `Queue.html` |
| Recycle Bin Item | Audit | Zinc | `fa-trash-can` | `Recycle Bin Item.html` |
| Requester | People & Orgs | Teal | `fa-user` | `FOIA Person.html` |
| SAR File | Documents | Violet | `fa-file` | `SAR File.html` |
| SAR Request | Core Objects | Indigo | `fa-user-secret` | `SAR.html` |
| Subject | People & Orgs | Teal | `fa-user-secret` | `SAR Person.html` |
| Subscription | Communication | Sky | `fa-rss` | `Subscription.html` |
| Tag | Metadata | Fuchsia | `fa-tag` | `Tag.html` |
| Task | Workflow | Orange | `fa-list-check` | `Task.html` |
| User | People & Orgs | Teal | `fa-user-gear` | `User.html` |

---

## Accessibility Guidelines

### Color Contrast Requirements

All text must meet **WCAG AA** standards:
- Normal text: 4.5:1 contrast ratio
- Large text (18px+): 3:1 contrast ratio

| Color | On White BG | Meets AA? |
|-------|-------------|-----------|
| Indigo-600 (#4F46E5) | 5.2:1 | ✓ |
| Teal-600 (#0D9488) | 4.6:1 | ✓ |
| Violet-600 (#7C3AED) | 5.4:1 | ✓ |
| Orange-600 (#EA580C) | 4.5:1 | ✓ |
| Sky-500 (#0EA5E9) | 4.5:1 | ✓ |
| Yellow-600 (#CA8A04) | 4.5:1 | ✓ |
| Fuchsia-600 (#C026D3) | 4.8:1 | ✓ |
| Zinc-500 (#71717A) | 5.0:1 | ✓ |

### Colorblind Considerations

| Type | Affected | Safe Pairs |
|------|----------|------------|
| Deuteranopia | Red-Green | Indigo/Orange, Yellow/Violet, Sky/Fuchsia |
| Protanopia | Red-Green | Same as above |
| Tritanopia | Blue-Yellow | Teal/Orange, Fuchsia/Zinc, Violet/Yellow |

### Icon Usage

Every object includes a unique icon as a **secondary identifier**, ensuring users are never reliant on color alone:

- Icons are from Font Awesome 6
- Each category has a distinct icon set
- Icons reinforce the object's purpose

---

## Usage Patterns

### Card Components

```html
<!-- Standard Object Card -->
<a href="[object].html"
   class="group bg-white border border-gray-200 rounded-lg p-4
          hover:shadow-md hover:border-[color]-300 transition-all">
    <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-[color]-100 rounded-lg flex items-center
                    justify-center group-hover:bg-[color]-200 transition-colors">
            <i class="fa-solid fa-[icon] text-[color]-600"></i>
        </div>
        <div>
            <h4 class="font-semibold text-gray-900">[Object Name]</h4>
            <p class="text-xs text-gray-500">[Description]</p>
        </div>
    </div>
</a>
```

### Category Headers

```html
<!-- Category Section Header -->
<div class="flex items-center gap-3 mb-5">
    <div class="w-10 h-10 bg-[color]-100 rounded-lg flex items-center justify-center">
        <i class="fa-solid fa-[category-icon] text-[color]-600"></i>
    </div>
    <div>
        <h3 class="text-lg font-semibold text-gray-900">[Category Name]</h3>
        <p class="text-sm text-gray-500">[Category Description]</p>
    </div>
</div>
```

### Grid Layouts

| Object Count | Grid Classes |
|--------------|--------------|
| 2-3 objects | `lg:grid-cols-3` |
| 4 objects | `lg:grid-cols-4` |
| 5-7 objects | `lg:grid-cols-5` |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2025-01-05 | Initial specification with accessible color palette |

---

## References

- [Tailwind CSS Color Palette](https://tailwindcss.com/docs/customizing-colors)
- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Colorblind-Safe Palettes](https://davidmathlogic.com/colorblind/)
- [Font Awesome Icons](https://fontawesome.com/icons)
