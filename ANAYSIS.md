# Analysis

## 1. Normalized Section Taxonomy (Canonical H2s)

First, all H2s were normalized into a **canonical set**. Variants like *“Design Principles & Guidelines”* → **Design Guidelines**, *“Cross-Variant Comparison”* → **Card Comparison**, etc.

### Canonical H2 Categories

1. Small Card
2. Medium Card
3. Large Card
4. Card Comparison
5. Dashboard Widgets
6. Sidebar Items
7. Status Variations
8. Interaction Patterns
9. Responsive Behavior
10. Accessibility
11. Usage Guidelines
12. Design Guidelines
13. Consistency Rules
14. Implementation Notes
15. Metadata Display / Structure
16. Priority / Role / Type Indicators
17. Grid / List / Layout Examples
18. Special States (Empty, Error, Deleted, etc.)
19. Object-Specific Reference (Status Guide, Type Guide, etc.)
20. Component / System Summary

---

## 2. Master Consistency Matrix (Data Grid)

Legend:

* **✓** = Present
* **△** = Partial / Object-Specific
* **—** = Missing

| Object             | S | M | L | Compare | Widgets | Sidebar | Status | Interaction | Responsive | A11y | Usage | Design | Consistency | Impl | Metadata | Indicators | Layout | Special | Reference | System |
| ------------------ | - | - | - | ------- | ------- | ------- | ------ | ----------- | ---------- | ---- | ----- | ------ | ----------- | ---- | -------- | ---------- | ------ | ------- | --------- | ------ |
| Associated Tag     | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | —      | ✓           | ✓          | ✓    | ✓     | ✓      | ✓           | ✓    | —        | —          | —      | —       | —         | ✓      |
| Audit Event        | ✓ | ✓ | ✓ | —       | ✓       | ✓       | △      | —           | ✓          | ✓    | —     | ✓      | ✓           | ✓    | —        | —          | —      | —       | △         | ✓      |
| Business Process   | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | ✓      | ✓           | ✓          | —    | ✓     | ✓      | ✓           | ✓    | —        | —          | —      | —       | ✓         | —      |
| Case               | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | ✓      | ✓           | ✓          | ✓    | ✓     | —      | —           | —    | —        | —          | —      | —       | —         | —      |
| Chat Conversation  | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | ✓      | —           | ✓          | ✓    | ✓     | ✓      | ✓           | ✓    | —        | —          | —      | —       | —         | ✓      |
| Chat Message       | ✓ | ✓ | ✓ | —       | ✓       | ✓       | —      | —           | ✓          | ✓    | ✓     | ✓      | ✓           | ✓    | ✓        | ✓          | —      | —       | —         | ✓      |
| Complaint          | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | ✓      | ✓           | ✓          | ✓    | —     | ✓      | —           | —    | ✓        | —          | —      | —       | —         | —      |
| Consultation       | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | ✓      | ✓           | ✓          | ✓    | ✓     | ✓      | ✓           | ✓    | —        | —          | —      | —       | ✓         | ✓      |
| Container          | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | ✓      | ✓           | ✓          | ✓    | ✓     | ✓      | ✓           | ✓    | —        | ✓          | —      | —       | ✓         | ✓      |
| Cost               | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | —      | —           | ✓          | ✓    | —     | ✓      | ✓           | ✓    | —        | —          | ✓      | —       | —         | ✓      |
| Costsheet          | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | ✓      | —           | ✓          | ✓    | —     | ✓      | ✓           | ✓    | —        | —          | ✓      | ✓       | —         | ✓      |
| File Object        | ✓ | ✓ | ✓ | —       | ✓       | ✓       | ✓      | ✓           | ✓          | ✓    | —     | ✓      | —           | ✓    | ✓        | ✓          | —      | —       | ✓         | ✓      |
| File Version       | ✓ | ✓ | ✓ | —       | ✓       | ✓       | —      | ✓           | —          | —    | ✓     | ✓      | ✓           | —    | ✓        | ✓          | —      | —       | —         | —      |
| Folder             | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | —      | ✓           | —          | —    | ✓     | ✓      | —           | —    | —        | —          | —      | —       | —         | —      |
| Group              | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | ✓      | —           | —          | —    | ✓     | ✓      | —           | ✓    | —        | ✓          | —      | —       | —         | —      |
| Note               | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | —      | ✓           | ✓          | —    | —     | ✓      | —           | —    | —        | ✓          | —      | —       | —         | —      |
| Notification       | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | ✓      | ✓           | —          | ✓    | ✓     | —      | —           | —    | —        | ✓          | —      | —       | —         | —      |
| Object Association | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | ✓      | —           | —          | —    | ✓     | —      | —           | —    | —        | ✓          | —      | —       | ✓         | —      |
| Object History     | ✓ | ✓ | ✓ | —       | ✓       | ✓       | ✓      | —           | ✓          | —    | —     | ✓      | —           | ✓    | ✓        | ✓          | —      | —       | ✓         | ✓      |
| Organization       | ✓ | ✓ | ✓ | —       | ✓       | ✓       | —      | —           | —          | ✓    | ✓     | ✓      | ✓           | —    | —        | —          | —      | —       | —         | ✓      |
| Participant        | ✓ | ✓ | ✓ | —       | ✓       | ✓       | —      | —           | —          | —    | ✓     | ✓      | —           | —    | —        | ✓          | —      | —       | —         | —      |
| Person             | ✓ | ✓ | ✓ | —       | ✓       | ✓       | ✓      | ✓           | ✓          | —    | ✓     | ✓      | —           | —    | —        | —          | —      | —       | —         | ✓      |
| Queue              | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | —      | ✓           | —          | —    | ✓     | —      | ✓           | ✓    | —        | —          | —      | —       | —         | —      |
| Recycle Bin Item   | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | —      | —           | ✓          | ✓    | ✓     | ✓      | ✓           | ✓    | —        | —          | ✓      | —       | —         | ✓      |
| Subscription       | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | —      | —           | —          | ✓    | —     | ✓      | —           | —    | —        | —          | —      | —       | ✓         | ✓      |
| Tag                | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | —      | ✓           | ✓          | ✓    | ✓     | ✓      | —           | ✓    | —        | —          | —      | —       | —         | —      |
| Task               | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | ✓      | —           | —          | —    | —     | ✓      | —           | —    | —        | ✓          | —      | —       | —         | —      |
| User               | ✓ | ✓ | ✓ | ✓       | ✓       | ✓       | —      | —           | —          | —    | —     | ✓      | ✓           | ✓    | —        | —          | —      | —       | —         | —      |

---

## 3. Key Consistency Findings

### Strongly Consistent

* **Small / Medium / Large Cards** → present everywhere ✔
* **Dashboard Widgets + Sidebar Items** → universal ✔

### Inconsistent / Problem Areas

1. **Accessibility**

   * Only ~25% of objects include it.
   * Should be mandatory across *all* card systems.

2. **Responsive Behavior**

   * Appears sporadically.
   * Cards are core UI primitives → this should be global.

3. **Consistency Rules**

   * Often missing or replaced with prose.
   * Should be standardized as a required section.

4. **Metadata Structure**

   * Present mainly in File, History, Chat.
   * Other objects implicitly rely on metadata but don’t document it.

5. **System / Component Summary**

   * Rare, but extremely valuable (Person, Organization, Subscription).
   * Should be required as final H2 for every object.

---

## 4. Recommended Mandatory H2 Template (Enforce This)

Every object **should** contain the following, in this order:

1. `<Object> — Small Card`
2. `<Object> — Medium Card`
3. `<Object> — Large Card`
4. Card Comparison
5. Dashboard Widgets
6. Sidebar Items
7. Status Variations
8. Interaction Patterns
9. Metadata Structure
10. Responsive Behavior
11. Accessibility
12. Usage Guidelines
13. Design Guidelines
14. Consistency Rules
15. Implementation Notes
16. `<Object> Reference Guide` (type/status/etc.)
17. `<Object> Card System Summary`

---

## 5. Implementation Progress

### Batch 1: Complete (5/5 files)

| File | Sections Added | Date |
|------|----------------|------|
| Chat Conversation.html | Card Comparison, Responsive Behavior, Accessibility, Design Guidelines, Consistency Rules, Implementation Notes, Summary | 2024-12-22 |
| Consultation.html | Status Variations, Interaction Patterns, Responsive Behavior, Accessibility, Usage Guidelines, Design Guidelines, Consistency Rules, Implementation Notes, Summary | 2024-12-22 |
| Container.html | Interaction Patterns, Responsive Behavior, Accessibility, Usage Guidelines, Design Guidelines, Consistency Rules, Implementation Notes, Summary | 2024-12-22 |
| Costsheet.html | Responsive Behavior, Accessibility, Design Guidelines, Consistency Rules, Implementation Notes, Summary | 2024-12-22 |
| Recycle Bin Item.html | Responsive Behavior, Accessibility, Consistency Rules, Implementation Notes, Summary | 2024-12-22 |

### Batch 2: Complete (5/5 files)

| File | Sections Added | Date |
|------|----------------|------|
| Associated Tag.html | Responsive Behavior, Accessibility, Implementation Notes, Summary | 2024-12-22 |
| Audit Event.html | Responsive Behavior, Accessibility, Implementation Notes, Summary | 2024-12-22 |
| Chat Message.html | Responsive Behavior, Accessibility, Implementation Notes, Summary | 2024-12-22 |
| Cost.html | Responsive Behavior, Accessibility, Summary | 2024-12-22 |
| File Object.html | Responsive Behavior, Accessibility, Summary | 2024-12-22 |

### Batch 3: Pending (0/5 files)
- File Version.html
- Folder.html
- Group.html
- Note.html
- Notification.html

### Batch 4: Pending (0/5 files)
- Object Association.html
- Object History.html
- Participant.html
- Person.html
- Queue.html

### Batch 5: Pending (0/8 files)
- Subscription.html
- Task.html
- User.html
- Business Process.html
- Case.html
- Complaint.html
- Organization.html
- Tag.html
