# ArkCase Card Field Matrix — Base Grid

## 1. Core Business Objects

(Primary, user-facing records — **highest card priority**)

* **Case File** (`CASE_FILE`)
* **Complaint** (`COMPLAINT`)
* **Consultation** (`CONSULTATION`)
* **Task** (`TASK`)
* **Business Process** (`BUSINESS_PROCESS`)

---

## 2. Person & Organization Objects

(Identity-centric records — often embedded or referenced)

* **Person** (`PERSON`)
* **Organization** (`ORGANIZATION`)
* **Person Alias** (`PERSON_ALIAS`)
* **Person–Organization Association** (`PERSON_ORGANIZATION_ASSOCIATION`)
* **Identification** (`IDENTIFICATION`)
* **Organization DBA** (`ORGANIZATION_DBA`)
* **Contact Method** (`CONTACT_METHOD`)
* **Postal Address** (`POSTAL_ADDRESS`)

---

## 3. User & Access Control Objects

(Security, permissions, and participation)

* **User** (`USER`)
* **Group** (`GROUP`)
* **Role** (`ROLE`)
* **Participant** (`PARTICIPANT`)
* **Participant Privilege** (`PARTICIPANT_PRIVILEGE`)
* **Subscription** (`SUBSCRIPTION`)
* **Queue** (`QUEUE`)

---

## 4. Document Management (ECM) Objects

(Content, files, and storage hierarchy)

* **File** (`FILE`)
* **File Version** (`FILE_VERSION`)
* **Folder** (`FOLDER`)
* **Container** (`CONTAINER`)
* **Recycle Bin Item** (`RECYCLE_BIN_ITEM`)

---

## 5. Supporting / Cross-Cutting Objects

(Attach to *any* business object)

* **Object Association** (`OBJECT_ASSOCIATION`)
* **Note** (`NOTE`)
* **Tag** (`TAG`)
* **Associated Tag** (`ASSOCIATED_TAG`)
* **Notification** (`NOTIFICATION`)
* **Audit Event** (`AUDIT_EVENT`)
* **Object History** (`OBJECT_HISTORY`)

---

## 6. Financial Objects

(Cost tracking and accounting)

* **Costsheet** (`COSTSHEET`)
* **Cost** (`COST`)

---

## 7. Chatbot / AI Objects

(Chat history and AI context)

* **Chat Conversation** (`CHAT_CONVERSATION`)
* **Chat Message** (`CHAT_MESSAGE`)

---

## 8. Summary Counts (for design scope)

| Category                   | Count  |
| -------------------------- | ------ |
| Core Business Objects      | 5      |
| Person & Organization      | 8      |
| User & Access Control      | 7      |
| Document Management        | 5      |
| Supporting / Cross-Cutting | 8      |
| Financial                  | 2      |
| Chatbot                    | 2      |
| **Total Objects**          | **37** |

### Legend

* **●** = Required
* **○** = Optional / Conditional
* **—** = Not shown

---

## Universal Card Fields (All Objects)

| Field Slot                   | Small | Medium | Large | Notes                       |
| ---------------------------- | ----- | ------ | ----- | --------------------------- |
| Object Icon                  | ●     | ●      | ●     | Type-based icon             |
| Object Type Label            | —     | ○      | ●     | Shown as chip or subtitle   |
| Primary Title                | ●     | ●      | ●     | Always visible              |
| Secondary Identifier         | ●     | ●      | ●     | Case #, File Name, Username |
| Status Badge                 | ●     | ●      | ●     | Stateful entities           |
| Security / Restriction Badge | —     | ○      | ●     | Restricted, External        |
| Key Date                     | ●     | ○      | ○     | Due / Created / Modified    |
| Priority                     | —     | ○      | ○     | Only if applicable          |
| Queue / Owning Org           | —     | ○      | ○     | Contextual                  |
| Participants (summary)       | —     | ●      | ●     | Avatars or names            |
| Participants (expanded)      | —     | —      | ●     | Full list                   |
| Description / Summary        | —     | —      | ●     | Clamped text                |
| Metadata Grid                | —     | —      | ●     | Dates, org, priority        |
| Related Object Count         | —     | —      | ●     | Notes, files, tasks         |
| Primary Action               | —     | ●      | ●     | Open / View                 |
| Secondary Actions            | —     | —      | ●     | Context menu / toolbar      |

---

## Core Business Objects — Overrides

### Case File / Complaint / Consultation

| Field Slot               | Small | Medium | Large |
| ------------------------ | ----- | ------ | ----- |
| Object Number            | ●     | ●      | ●     |
| Priority                 | —     | ●      | ●     |
| Due Date                 | ●     | ●      | ●     |
| Queue                    | —     | ●      | ●     |
| Responsible Organization | —     | ○      | ●     |
| Summary                  | —     | —      | ●     |
| Disposition              | —     | —      | ●     |

---

### Task

| Field Slot       | Small | Medium | Large |
| ---------------- | ----- | ------ | ----- |
| Task Status      | ●     | ●      | ●     |
| Due Date         | ●     | ●      | ●     |
| Assignee         | —     | ●      | ●     |
| Percent Complete | —     | ●      | ●     |
| Parent Object    | —     | ○      | ●     |
| Workflow Name    | —     | —      | ●     |
| Outcomes         | —     | —      | ●     |

---

## Person & Organization Objects

### Person

| Field Slot      | Small | Medium | Large |
| --------------- | ----- | ------ | ----- |
| Full Name       | ●     | ●      | ●     |
| Primary Contact | —     | ●      | ●     |
| Status          | —     | ○      | ●     |
| Organization(s) | —     | ○      | ●     |
| Address         | —     | —      | ●     |
| Identifications | —     | —      | ●     |

---

### Organization

| Field Slot          | Small | Medium | Large |
| ------------------- | ----- | ------ | ----- |
| Organization Name   | ●     | ●      | ●     |
| Organization Type   | —     | ●      | ●     |
| Primary Contact     | —     | ●      | ●     |
| Status              | —     | ○      | ●     |
| DBA Names           | —     | —      | ●     |
| Addresses           | —     | —      | ●     |
| Parent / Child Orgs | —     | —      | ●     |

---

## Document Management Objects

### File

| Field Slot              | Small | Medium | Large |
| ----------------------- | ----- | ------ | ----- |
| File Name + Extension   | ●     | ●      | ●     |
| File Type               | —     | ●      | ●     |
| Page Count / Duration   | —     | ○      | ●     |
| Version                 | —     | ○      | ●     |
| Tags                    | —     | —      | ●     |
| Security Classification | —     | —      | ●     |

---

### Folder / Container

| Field Slot      | Small | Medium | Large |
| --------------- | ----- | ------ | ----- |
| Name            | ●     | ●      | ●     |
| Item Count      | —     | ●      | ●     |
| Restricted Flag | —     | ○      | ●     |
| Parent Object   | —     | —      | ●     |

---

## Supporting Objects

### Note

| Field Slot      | Small | Medium | Large |
| --------------- | ----- | ------ | ----- |
| Note Type       | ●     | ●      | ●     |
| Author          | —     | ●      | ●     |
| Created Date    | —     | ●      | ●     |
| Content Preview | —     | ○      | ●     |
| Tags            | —     | —      | ●     |

---

### Notification

| Field Slot     | Small | Medium | Large |
| -------------- | ----- | ------ | ----- |
| Title          | ●     | ●      | ●     |
| Type           | —     | ○      | ●     |
| Status         | —     | ○      | ●     |
| Action Date    | —     | ●      | ●     |
| Related Object | —     | ○      | ●     |
| Content        | —     | —      | ●     |

---

## Access Control Objects

### User / Group

| Field Slot        | Small | Medium | Large |
| ----------------- | ----- | ------ | ----- |
| Display Name      | ●     | ●      | ●     |
| Status            | —     | ●      | ●     |
| Role / Group Type | —     | ●      | ●     |
| Directory         | —     | —      | ●     |
| Memberships       | —     | —      | ●     |

---

## How to Use This as a Spreadsheet

Recommended columns if you export this to CSV / Sheets:

```
Object Type | Field Slot | Small | Medium | Large | Required | Permission Gated | Notes
```

This lets you:

* Filter by object
* Validate consistency across cards
* Drive Storybook props
* Generate AngularJS templates
* Map directly to permission evaluators
