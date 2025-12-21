# ArkCase Data Dictionary

> Comprehensive reference for all entity types, properties, relationships, and data structures in ArkCase.

**Version:** 1.0
**Last Updated:** December 2025
**ArkCase Version:** 2025.x

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Core Business Objects](#2-core-business-objects)
3. [Person & Organization Entities](#3-person--organization-entities)
4. [User & Access Control Entities](#4-user--access-control-entities)
5. [Document Management (ECM)](#5-document-management-ecm)
6. [Supporting Entities](#6-supporting-entities)
7. [Chatbot Entities](#7-chatbot-entities)
8. [Enums & Reference Data](#8-enums--reference-data)
9. [Entity Relationship Diagrams](#9-entity-relationship-diagrams)
10. [Cross-Cutting Patterns](#10-cross-cutting-patterns)
11. [Quick Reference](#11-quick-reference)

---

## 1. Introduction

### 1.1 Purpose

This Data Dictionary provides a comprehensive reference for all data entities in ArkCase, including:
- Property definitions with types and constraints
- Database table mappings
- Entity relationships
- Valid values for enums and status fields
- Validation rules

### 1.2 Technology Stack

| Component | Version | Purpose |
|-----------|---------|---------|
| Java | 17 | Runtime |
| Spring Framework | 5.x | Application framework |
| JPA/Hibernate | 5.x | ORM layer |
| MariaDB | 10.6 | Database |
| Activiti | 5.15.1 | Workflow engine |

### 1.3 Database Naming Conventions

| Convention | Example | Description |
|------------|---------|-------------|
| Table prefix | `acm_` | All ArkCase tables start with `acm_` |
| Column prefix | `cm_` | All columns start with `cm_` |
| Primary key | `cm_{entity}_id` | Auto-generated Long |
| Foreign key | `cm_{related}_id` | References parent entity |
| Discriminator | `cm_class_name` | For polymorphic inheritance |
| Audit columns | `cm_created`, `cm_creator`, `cm_modified`, `cm_modifier` | Standard audit trail |

### 1.4 Common Property Types

| Java Type | Database Type | Description |
|-----------|---------------|-------------|
| Long | BIGINT | Primary keys, foreign keys |
| String | VARCHAR(n) | Short text fields |
| String (LOB) | CLOB/TEXT | Long text (details, descriptions) |
| Date | TIMESTAMP | Date/time values |
| LocalDate | DATE | Date-only values |
| LocalDateTime | DATETIME | Date/time without timezone |
| Boolean | BIT(1) | True/false flags |
| Double | DOUBLE | Decimal numbers |
| Integer | INT | Whole numbers |

---

## 2. Core Business Objects

### 2.1 CaseFile

Primary case management entity for tracking investigations, legal matters, and administrative cases.

**Class:** `com.armedia.acm.plugins.casefile.model.CaseFile`
**Table:** `acm_case_file`
**Object Type:** `CASE_FILE`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_case_id` | Yes | Auto | Primary key |
| `caseNumber` | String | `cm_case_number` | Yes | Auto-seq | Human-readable identifier (immutable) |
| `caseType` | String | `cm_case_type` | No | - | Case category/type |
| `title` | String | `cm_case_title` | Yes | - | Case title (min 1 char) |
| `status` | String | `cm_case_status` | Yes | "DRAFT" | Current status |
| `details` | String (LOB) | `cm_case_details` | No | - | Long-form description |
| `caseDetailsSummary` | String (LOB) | `cm_case_details_summary` | No | - | Summary text |
| `priority` | String | `cm_case_priority` | No | - | Priority level |
| `disposition` | String | `cm_case_disposition` | No | - | Case outcome |
| `external` | Boolean | `cm_external` | No | false | Involves external parties |
| `incidentDate` | Date | `cm_incident_date` | No | - | Date of incident |
| `dueDate` | Date | `cm_due_date` | No | - | Response due date |
| `originalDueDate` | Date | `cm_original_due_date` | No | - | Original due date before extension |
| `closed` | Date | `cm_closed` | No | - | Closure date |
| `responseDueDate` | LocalDate | `cm_response_due_date` | No | - | Response deadline |
| `restricted` | Boolean | `cm_restricted` | No | true | Access restriction (auto-set for DRAFT) |
| `deniedFlag` | Boolean | `cm_denied_flag` | No | false | FOIA denial flag |
| `officeLocationType` | String | `cm_office_location_type` | No | - | Office classification |
| `responsibleOrganization` | String | `cm_responsible_org` | No | - | Responsible org |
| `courtroomName` | String | `cm_courtroom_name` | No | - | Courtroom (if applicable) |
| `nextCourtDate` | Date | `cm_next_court_date` | No | - | Next court appearance |
| `legacySystemId` | String | `cm_legacy_system_id` | No | - | Legacy system reference (immutable) |
| `releasedFileId` | Long | `cm_released_file_id` | No | - | Released version reference |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp (immutable) |
| `creator` | String | `cm_creator` | Yes | Auto | Creator user ID (immutable) |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |
| `className` | String | `cm_class_name` | Yes | Auto | Discriminator |

#### Relationships

| Relationship | Type | Target | Join | Description |
|--------------|------|--------|------|-------------|
| `participants` | OneToMany | AcmParticipant | `cm_object_id` | Assignees, groups |
| `childObjects` | OneToMany | ObjectAssociation | `cm_parent_id` | Related objects |
| `container` | OneToOne | AcmContainer | `cm_container_id` | ECM folder |
| `queue` | ManyToOne | AcmQueue | `cm_queue_id` | Current queue |
| `previousQueue` | ManyToOne | AcmQueue | `cm_previous_queue_id` | Previous queue |
| `lock` | OneToOne | AcmObjectLock | - | Object lock |
| `milestones` | OneToMany | AcmMilestone | - | Case milestones (read-only) |

#### Status Values
`DRAFT`, `OPEN`, `IN_PROGRESS`, `UNDER_REVIEW`, `CLOSED`, `DENIED`, `APPROVED`

---

### 2.2 Complaint

Complaints and grievances submitted to the organization.

**Class:** `com.armedia.acm.plugins.complaint.model.Complaint`
**Table:** `acm_complaint`
**Object Type:** `COMPLAINT`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `complaintId` | Long | `cm_complaint_id` | Yes | Auto | Primary key |
| `complaintNumber` | String | `cm_complaint_number` | Yes | Auto-seq | Human-readable identifier (immutable) |
| `complaintType` | String | `cm_complaint_type` | No | - | Type of complaint |
| `complaintTitle` | String | `cm_complaint_title` | Yes | - | Title (min 1 char) |
| `status` | String | `cm_complaint_status` | Yes | "DRAFT" | Current status |
| `details` | String (LOB) | `cm_complaint_details` | No | - | Description |
| `priority` | String | `cm_complaint_priority` | No | - | Priority level |
| `tag` | String | `cm_complaint_tag` | No | - | Tag/category |
| `frequency` | String | `cm_frequency` | No | - | Frequency (one-time, recurring) |
| `incidentDate` | Date | `cm_incident_date` | No | - | Incident date |
| `dueDate` | Date | `cm_due_date` | No | - | Due date |
| `closed` | Date | `cm_closed` | No | - | Closure date |
| `restricted` | Boolean | `cm_restricted` | No | true | Access restriction |
| `officeLocationType` | String | `cm_office_location_type` | No | - | Office type |
| `legacySystemId` | String | `cm_legacy_system_id` | No | - | Legacy reference (immutable) |
| `complaintUUID` | String | `cm_complaint_uuid` | No | Auto | Unique identifier |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp (immutable) |
| `creator` | String | `cm_creator` | Yes | Auto | Creator (immutable) |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `participants` | OneToMany | AcmParticipant | Assignees, groups |
| `personAssociations` | OneToMany | PersonAssociation | Associated persons |
| `organizationAssociations` | OneToMany | OrganizationAssociation | Associated orgs |
| `childObjects` | OneToMany | ObjectAssociation | Related objects |
| `addresses` | ManyToMany | PostalAddress | Associated addresses |
| `defaultAddress` | OneToOne | PostalAddress | Primary address |
| `container` | OneToOne | AcmContainer | ECM folder |
| `disposition` | OneToOne | Disposition | Case disposition |

#### Status Values
`DRAFT`, `SUBMITTED`, `IN_REVIEW`, `UNDER_REVIEW`, `CLOSED`, `DENIED`, `APPROVED`

---

### 2.3 Consultation

Inter-agency consultations and requests.

**Class:** `com.armedia.acm.plugins.consultation.model.Consultation`
**Table:** `acm_consultation`
**Object Type:** `CONSULTATION`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_consultation_id` | Yes | Auto | Primary key |
| `consultationNumber` | String | `cm_consultation_number` | Yes | Auto-seq | Identifier (immutable) |
| `consultationType` | String | `cm_consultation_type` | No | - | Type |
| `title` | String | `cm_title` | Yes | - | Title (min 1 char) |
| `status` | String | `cm_status` | Yes | "DRAFT" | Current status |
| `details` | String (LOB) | `cm_details` | No | - | Description |
| `consultationDetailsSummary` | String (LOB) | `cm_details_summary` | No | - | Summary |
| `priority` | String | `cm_priority` | No | - | Priority level |
| `external` | Boolean | `cm_external` | No | false | External parties |
| `dueDate` | Date | `cm_due_date` | No | - | Due date |
| `responseDueDate` | LocalDate | `cm_response_due_date` | No | - | Response deadline |
| `receivedDate` | LocalDateTime | `cm_received_date` | No | - | Date received |
| `closed` | Date | `cm_closed` | No | - | Closure date |
| `componentAgency` | String | `cm_component_agency` | No | - | Government component |
| `externalRequestingAgency` | String | `cm_external_agency` | No | - | External requesting agency |
| `restricted` | Boolean | `cm_restricted` | No | true | Access restriction |
| `legacySystemId` | String | `cm_legacy_system_id` | No | - | Legacy reference |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `participants` | OneToMany | AcmParticipant | Assignees, groups |
| `personAssociations` | OneToMany | PersonAssociation | Associated persons |
| `organizationAssociations` | OneToMany | OrganizationAssociation | Associated orgs |
| `childObjects` | OneToMany | ObjectAssociation | Related objects |
| `container` | OneToOne | AcmContainer | ECM folder |
| `lock` | OneToOne | AcmObjectLock | Object lock |

#### Status Values
`DRAFT`, `SUBMITTED`, `IN_REVIEW`, `UNDER_REVIEW`, `CLOSED`

---

### 2.4 Task (AcmTask)

Workflow tasks assigned to users.

**Class:** `com.armedia.acm.plugins.task.model.AcmTask`
**Table:** Activiti workflow engine (not a JPA entity)
**Object Type:** `TASK`

#### Properties

| Property | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| `taskId` | Long | Yes | Auto | Task identifier |
| `title` | String | Yes | - | Task title (min 1 char) |
| `type` | String | No | - | Task type |
| `status` | String | Yes | - | Current status |
| `pendingStatus` | String | No | - | Pending status |
| `priority` | String | No | - | Priority level |
| `details` | String | No | - | Task description |
| `completed` | Boolean | No | false | Completion flag |
| `adhocTask` | Boolean | No | false | Ad-hoc task |
| `percentComplete` | Integer | No | 0 | Progress (0-100) |
| `assignee` | String | No | - | Assigned user ID |
| `owner` | String | No | - | Task owner |
| `nextAssignee` | String | No | - | Next assignee |
| `candidateGroups` | List<String> | No | - | Groups that can claim |
| `reworkInstructions` | String | No | - | Rework instructions |
| `createDate` | Date | Yes | Auto | Creation date |
| `dueDate` | Date | Yes | - | Due date |
| `taskStartDate` | Date | No | - | Start date |
| `taskFinishedDate` | Date | No | - | Completion date |
| `taskDurationInMillis` | Long | No | - | Duration |
| `attachedToObjectType` | String | No | - | Parent object type |
| `attachedToObjectId` | Long | No | - | Parent object ID |
| `attachedToObjectName` | String | No | - | Parent object name |
| `parentObjectId` | Long | No | - | Parent case/object ID |
| `parentObjectType` | String | No | - | Parent object type |
| `parentObjectTitle` | String | No | - | Parent object title |
| `businessProcessName` | String | No | - | Activiti process name |
| `businessProcessId` | Long | No | - | Process instance ID |
| `workflowRequestType` | String | No | - | Workflow request type |
| `workflowRequestId` | Long | No | - | Workflow request ID |
| `outcomeName` | String | No | - | Selected outcome |
| `taskNotes` | String | No | - | Completion notes |
| `buckslipTask` | Boolean | No | false | Buckslip routing task |
| `restricted` | Boolean | No | false | Access restriction |
| `legacySystemId` | String | No | - | Legacy reference |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `participants` | List | AcmParticipant | Task participants |
| `childObjects` | List | ObjectAssociation | Related objects |
| `container` | OneToOne | AcmContainer | ECM folder |
| `documentUnderReview` | OneToOne | EcmFile | Document being reviewed |
| `documentsToReview` | List | EcmFile | Documents to review |
| `taskOutcome` | Embedded | TaskOutcome | Outcome details |
| `availableOutcomes` | List | TaskOutcome | Possible outcomes |
| `buckslipFutureTasks` | List | BuckslipFutureTask | Next approvers |

#### Status Values
`ASSIGNED`, `IN_PROGRESS`, `COMPLETED`, `ON_HOLD`, `REWORK`, `WITHDRAWN`, `SUSPENDED`

---

### 2.5 BusinessProcess

Active workflow process instances.

**Class:** `com.armedia.acm.plugins.businessprocess.model.BusinessProcess`
**Table:** `acm_business_process`
**Object Type:** `BUSINESS_PROCESS`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_business_process_id` | Yes | Auto | Primary key |
| `status` | String | `cm_status` | Yes | - | Process status |
| `objectType` | String | - | Yes | "BUSINESS_PROCESS" | Object type constant |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `participants` | OneToMany | AcmParticipant | Process participants |
| `container` | OneToOne | AcmContainer | ECM container |

#### Status Values
`ACTIVE`, `COMPLETED`, `SUSPENDED`, `TERMINATED`

---

## 3. Person & Organization Entities

### 3.1 Person

Individual contacts, subjects, complainants, witnesses, etc.

**Class:** `com.armedia.acm.plugins.person.organization.model.Person`
**Table:** `acm_person`
**Object Type:** `PERSON`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_person_id` | Yes | Auto | Primary key |
| `givenName` | String | `cm_given_name` | Yes | - | First name (min 1 char) |
| `middleName` | String | `cm_middle_name` | No | - | Middle name |
| `familyName` | String | `cm_family_name` | Yes | - | Last name (min 1 char) |
| `title` | String | `cm_title` | No | - | Honorific (Dr., Mr., Ms.) |
| `company` | String | `cm_company` | No | - | Company/employer |
| `status` | String | `cm_status` | No | "ACTIVE" | Person status |
| `dateOfBirth` | LocalDate | `cm_date_of_birth` | No | - | Birth date |
| `placeOfBirth` | String | `cm_place_of_birth` | No | - | Birth location |
| `dateMarried` | LocalDate | `cm_date_married` | No | - | Marriage date |
| `hairColor` | String | `cm_hair_color` | No | - | Hair color |
| `eyeColor` | String | `cm_eye_color` | No | - | Eye color |
| `heightInInches` | Long | `cm_height_inches` | No | - | Height in inches |
| `weightInPounds` | Long | `cm_weight_pounds` | No | - | Weight in pounds |
| `details` | String (LOB) | `cm_details` | No | - | Extended details |
| `restricted` | Boolean | `cm_restricted` | No | false | Access restriction |
| `anonymousFlag` | Boolean | `cm_anonymous_flag` | No | false | Anonymous person |
| `ldapUserId` | String | `cm_ldap_user_id` | No | - | Linked LDAP user |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |
| `className` | String | `cm_class_name` | Yes | Auto | Discriminator |

#### Relationships

| Relationship | Type | Target | Join Table | Description |
|--------------|------|--------|------------|-------------|
| `addresses` | ManyToMany | PostalAddress | `acm_person_postal_address` | Addresses |
| `defaultAddress` | OneToOne | PostalAddress | - | Primary address |
| `contactMethods` | ManyToMany | ContactMethod | `acm_person_contact_method` | Contact info |
| `defaultPhone` | OneToOne | ContactMethod | - | Primary phone |
| `defaultEmail` | OneToOne | ContactMethod | - | Primary email |
| `defaultFax` | OneToOne | ContactMethod | - | Primary fax |
| `defaultUrl` | OneToOne | ContactMethod | - | Primary URL |
| `aliases` | OneToMany | PersonAlias | - | Alternate names |
| `defaultAlias` | OneToOne | PersonAlias | - | Primary alias |
| `identifications` | OneToMany | Identification | `acm_person_identification` | IDs |
| `defaultIdentification` | OneToOne | Identification | - | Primary ID |
| `organizationAssociations` | ManyToMany | PersonOrganizationAssociation | - | Org associations |
| `participants` | OneToMany | AcmParticipant | - | Participations |
| `securityTags` | ElementCollection | String | `acm_person_security_tag` | Security tags |
| `container` | OneToOne | AcmContainer | - | ECM folder |
| `picture` | OneToOne | EcmFile | - | Profile picture |

#### Status Values
`ACTIVE`, `INACTIVE`

---

### 3.2 Organization

Business entities, agencies, companies.

**Class:** `com.armedia.acm.plugins.person.organization.model.Organization`
**Table:** `acm_organization`
**Object Type:** `ORGANIZATION`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `organizationId` | Long | `cm_organization_id` | Yes | Auto | Primary key |
| `organizationValue` | String | `cm_organization_value` | Yes | - | Name (min 1 char) |
| `organizationType` | String | `cm_organization_type` | No | - | Type |
| `status` | String | `cm_status` | No | "ACTIVE" | Status |
| `details` | String (LOB) | `cm_details` | No | - | Extended details |
| `restricted` | Boolean | `cm_restricted` | No | false | Access restriction |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |
| `className` | String | `cm_class_name` | Yes | Auto | Discriminator |

#### Relationships

| Relationship | Type | Target | Join Table | Description |
|--------------|------|--------|------------|-------------|
| `addresses` | ManyToMany | PostalAddress | `acm_organization_postal_address` | Addresses |
| `defaultAddress` | OneToOne | PostalAddress | - | Primary address |
| `contactMethods` | ManyToMany | ContactMethod | `acm_organization_contact_method` | Contact info |
| `defaultPhone` | OneToOne | ContactMethod | - | Primary phone |
| `defaultEmail` | OneToOne | ContactMethod | - | Primary email |
| `defaultFax` | OneToOne | ContactMethod | - | Primary fax |
| `defaultUrl` | OneToOne | ContactMethod | - | Primary URL |
| `identifications` | OneToMany | Identification | `acm_organization_identification` | IDs |
| `defaultIdentification` | OneToOne | Identification | - | Primary ID |
| `personAssociations` | OneToMany | PersonOrganizationAssociation | - | Person associations |
| `dbas` | OneToMany | OrganizationDBA | - | DBA names |
| `defaultDBA` | OneToOne | OrganizationDBA | - | Primary DBA |
| `parentOrganization` | ManyToOne | Organization | - | Parent org (hierarchy) |
| `participants` | OneToMany | AcmParticipant | - | Participations |

#### Status Values
`ACTIVE`, `INACTIVE`

---

### 3.3 PersonAlias

Alternate names for persons (maiden names, nicknames, etc.).

**Class:** `com.armedia.acm.plugins.person.organization.model.PersonAlias`
**Table:** `acm_person_alias`
**Object Type:** `PERSON_ALIAS`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_person_alias_id` | Yes | Auto | Primary key |
| `aliasType` | String | `cm_alias_type` | No | - | Type (MAIDEN_NAME, NICKNAME) |
| `aliasValue` | String | `cm_alias_value` | Yes | - | Alias name |
| `description` | String | `cm_description` | No | - | Description |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `person` | ManyToOne | Person | Parent person |

---

### 3.4 PersonOrganizationAssociation

Links persons to organizations with role information.

**Class:** `com.armedia.acm.plugins.person.organization.model.PersonOrganizationAssociation`
**Table:** `acm_person_org_assoc`
**Object Type:** `PERSON_ORGANIZATION_ASSOCIATION`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_id` | Yes | Auto | Primary key |
| `personToOrganizationAssociationType` | String | `cm_person_to_org_type` | No | - | Role type (EMPLOYEE, CONTRACTOR) |
| `organizationToPersonAssociationType` | String | `cm_org_to_person_type` | No | - | Reverse role (EMPLOYER) |
| `description` | String | `cm_description` | No | - | Details |
| `primaryContact` | Boolean | `cm_primary_contact` | No | false | Primary contact for org |
| `defaultOrganization` | Boolean | `cm_default_organization` | No | false | Person's default org |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |
| `className` | String | `cm_class_name` | Yes | Auto | Discriminator |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `person` | ManyToOne | Person | Associated person |
| `organization` | ManyToOne | Organization | Associated organization |

---

### 3.5 Identification

Official identifiers for persons and organizations.

**Class:** `com.armedia.acm.plugins.person.organization.model.Identification`
**Table:** `acm_identification`
**Object Type:** `IDENTIFICATION`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `identificationID` | Long | `cm_identification_id` | Yes | Auto | Primary key |
| `identificationType` | String | `cm_identification_type` | No | - | Type (DRIVER_LICENSE, PASSPORT, SSN) |
| `identificationNumber` | String | `cm_identification_number` | Yes | - | ID value |
| `identificationIssuer` | String | `cm_identification_issuer` | No | - | Issuing authority |
| `identificationYearIssued` | Date | `cm_identification_year_issued` | No | - | Issue date |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |
| `className` | String | `cm_class_name` | Yes | Auto | Discriminator |

---

### 3.6 ContactMethod

Contact information (phone, email, fax, URL).

**Class:** `com.armedia.acm.plugins.addressable.model.ContactMethod`
**Table:** `acm_contact_method`
**Object Type:** `CONTACT_METHOD`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_contact_method_id` | Yes | Auto | Primary key |
| `type` | String | `cm_type` | No | - | Type (EMAIL, PHONE, FAX, URL, MOBILE) |
| `subType` | String | `cm_sub_type` | No | - | Sub-type (WORK, HOME, PERSONAL) |
| `value` | String | `cm_value` | Yes | - | Contact value |
| `description` | String | `cm_description` | No | - | Description |
| `status` | String | `cm_status` | No | "ACTIVE" | Status |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |
| `className` | String | `cm_class_name` | Yes | Auto | Discriminator |

#### Type Values
`EMAIL`, `PHONE`, `FAX`, `URL`, `MOBILE`

#### SubType Values
`WORK`, `HOME`, `PERSONAL`, `OTHER`

---

### 3.7 PostalAddress

Physical mailing addresses.

**Class:** `com.armedia.acm.plugins.addressable.model.PostalAddress`
**Table:** `acm_postal_address`
**Object Type:** `POSTAL_ADDRESS`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_postal_address_id` | Yes | Auto | Primary key |
| `type` | String | `cm_type` | No | - | Type (MAILING, BILLING, PHYSICAL) |
| `streetAddress` | String | `cm_street_address` | No | - | Street line 1 |
| `streetAddress2` | String | `cm_street_address_2` | No | - | Street line 2 |
| `city` | String | `cm_city` | No | - | City |
| `state` | String | `cm_state` | No | - | State/region |
| `zip` | String | `cm_zip` | No | - | Postal code |
| `country` | String | `cm_country` | No | - | Country |
| `status` | String | `cm_status` | No | "ACTIVE" | Status |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships

| Relationship | Type | Target | Join Table | Description |
|--------------|------|--------|------------|-------------|
| `contactMethods` | ManyToMany | ContactMethod | `acm_address_contact_method` | Related contacts |

#### Type Values
`MAILING`, `BILLING`, `PHYSICAL`, `HOME`, `WORK`, `OTHER`

---

### 3.8 OrganizationDBA

"Doing Business As" names for organizations.

**Class:** `com.armedia.acm.plugins.person.organization.model.OrganizationDBA`
**Table:** `acm_organization_dba`
**Object Type:** `ORGANIZATION_DBA`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_organization_dba_id` | Yes | Auto | Primary key |
| `organizationId` | Long | `cm_organization_id` | Yes | - | Parent organization FK |
| `type` | String | `cm_type` | No | - | Type (TRADE_NAME, LEGAL_NAME) |
| `value` | String | `cm_value` | Yes | - | DBA name |
| `description` | String | `cm_description` | No | - | Description |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

---

## 4. User & Access Control Entities

### 4.1 AcmUser

System user accounts.

**Class:** `com.armedia.acm.services.users.model.AcmUser`
**Table:** `acm_user`
**Object Type:** `USER`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `userId` | String | `cm_user_id` | Yes | - | Primary key (username) |
| `fullName` | String | `cm_full_name` | No | - | Display name |
| `firstName` | String | `cm_first_name` | No | - | First name |
| `lastName` | String | `cm_last_name` | No | - | Last name |
| `userDirectoryName` | String | `cm_user_directory_name` | Yes | - | LDAP directory (immutable) |
| `sAMAccountName` | String | `cm_sam_account_name` | No | - | SAM account (AD) |
| `userPrincipalName` | String | `cm_user_principal_name` | No | - | UPN (user@domain) |
| `mail` | String | `cm_mail` | No | - | Email address |
| `distinguishedName` | String | `cm_distinguished_name` | No | - | LDAP DN |
| `uid` | String | `cm_uid` | No | - | Unix/LDAP UID |
| `country` | String | `cm_country` | No | - | Country |
| `countryAbbreviation` | String | `cm_country_abbreviation` | No | - | Country code |
| `department` | String | `cm_department` | No | - | Department |
| `company` | String | `cm_company` | No | - | Company |
| `title` | String | `cm_title` | No | - | Job title |
| `lang` | String | `cm_lang` | No | - | Preferred language |
| `userState` | Enum | `cm_user_state` | No | - | Account state |
| `activeState` | Enum | `cm_active_state` | No | "ACTIVE" | Active/inactive |
| `passwordExpirationDate` | LocalDate | `cm_password_expiration_date` | No | - | Password expiry |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `deletedAt` | Date | `cm_deleted_at` | No | - | Soft delete timestamp |

#### Relationships

| Relationship | Type | Target | Join Table | Description |
|--------------|------|--------|------------|-------------|
| `groups` | ManyToMany | AcmGroup | `acm_user_membership` | Group memberships |
| `identifier` | OneToOne | AcmUserIdentifier | - | Numeric identifier |

#### Enums

**AcmUserState:**
- `VALID` - Active, valid account
- `INVALID` - Marked for deletion
- `DISABLED` - Explicitly disabled

**AcmUserActiveState:**
- `ACTIVE` - User is active
- `INACTIVE` - User is inactive

---

### 4.2 AcmGroup

User groups for assignment and permissions.

**Class:** `com.armedia.acm.services.users.model.group.AcmGroup`
**Table:** `acm_group`
**Object Type:** `GROUP`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `name` | String | `cm_group_name` | Yes | - | Primary key |
| `displayName` | String | `cm_display_name` | No | - | Display name |
| `description` | String | `cm_description` | No | - | Description |
| `type` | Enum | `cm_group_type` | No | "ADHOC_GROUP" | Group type |
| `status` | Enum | `cm_status` | No | "ACTIVE" | Status |
| `distinguishedName` | String | `cm_distinguished_name` | No | - | LDAP DN |
| `directoryName` | String | `cm_directory_name` | No | - | LDAP directory |
| `ascendantsList` | String | `cm_ascendants_list` | No | - | Parent groups (comma-separated) |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships

| Relationship | Type | Target | Join Table | Description |
|--------------|------|--------|------------|-------------|
| `userMembers` | ManyToMany | AcmUser | `acm_user_membership` | User members |
| `memberGroups` | ManyToMany | AcmGroup | `acm_group_membership` | Child groups |
| `memberOfGroups` | ManyToMany | AcmGroup | `acm_group_membership` | Parent groups |
| `supervisor` | ManyToOne | AcmUser | - | Group supervisor |
| `identifier` | OneToOne | AcmGroupIdentifier | - | Numeric identifier |

#### Enums

**AcmGroupType:**
- `ADHOC_GROUP` - Ad-hoc group (default)
- `LDAP_GROUP` - LDAP-sourced group
- `SYSTEM_GROUP` - System-defined group

**AcmGroupStatus:**
- `ACTIVE` - Group is active
- `INACTIVE` - Group is inactive

---

### 4.3 AcmRole

Security roles defined in system.

**Class:** `com.armedia.acm.services.users.model.AcmRole`
**Table:** `acm_role`
**Object Type:** `ROLE`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `roleName` | String | `cm_role_name` | Yes | - | Primary key |
| `roleType` | Enum | `cm_role_type` | No | - | Role type |

---

### 4.4 AcmParticipant

Represents users/groups involved with business objects.

**Class:** `com.armedia.acm.services.participants.model.AcmParticipant`
**Table:** `acm_participant`
**Object Type:** `PARTICIPANT`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_participant_id` | Yes | Auto | Primary key |
| `objectType` | String | `cm_object_type` | Yes | - | Parent object type (immutable) |
| `objectId` | Long | `cm_object_id` | Yes | - | Parent object ID (immutable) |
| `participantType` | String | `cm_participant_type` | No | - | Type (ASSIGNEE, CREATOR, etc.) |
| `participantLdapId` | String | `cm_participant_ldap_id` | No | - | LDAP ID (user or group) |
| `replaceChildrenParticipant` | Boolean | `cm_replace_children` | No | false | Cascade changes |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp (immutable) |
| `creator` | String | `cm_creator` | Yes | Auto | Creator (immutable) |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |
| `className` | String | `cm_class_name` | Yes | Auto | Discriminator |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `privileges` | OneToMany | AcmParticipantPrivilege | Assigned privileges (cascade ALL) |

#### Participant Types
- `ASSIGNEE` - Task/case assignee
- `OWNING_GROUP` - Responsible group
- `CREATOR` - Object creator
- `SUPERVISOR` - Supervisor
- `COLLABORATOR` - Collaborator
- `FOLLOWER` - Following the object
- `APPROVER` - Approval chain member
- `READER` - Read-only access
- `NO_ACCESS` - Explicitly denied

---

### 4.5 AcmParticipantPrivilege

Defines what actions a participant can perform.

**Class:** `com.armedia.acm.services.participants.model.AcmParticipantPrivilege`
**Table:** `acm_participant_privilege`
**Object Type:** `PARTICIPANT_PRIVILEGE`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_privilege_id` | Yes | Auto | Primary key |
| `objectAction` | String | `cm_object_action` | No | - | Action (READ, WRITE, DELETE) |
| `accessType` | String | `cm_access_type` | No | - | Access level (FULL, LIMITED) |
| `accessReason` | String | `cm_access_reason` | No | - | Reason for access |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp (immutable) |
| `creator` | String | `cm_creator` | Yes | Auto | Creator (immutable) |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `participant` | ManyToOne | AcmParticipant | Parent participant |

---

## 5. Document Management (ECM)

### 5.1 EcmFile

Document file metadata.

**Class:** `com.armedia.acm.plugins.ecm.model.EcmFile`
**Table:** `acm_file`
**Object Type:** `FILE`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `fileId` | Long | `cm_file_id` | Yes | Auto | Primary key |
| `fileName` | String | `cm_file_name` | Yes | - | File name |
| `fileType` | String | `cm_file_type` | No | - | File type category |
| `fileActiveVersionNameExtension` | String | `cm_active_version_name_ext` | No | - | Active version extension |
| `fileSource` | String | `cm_file_source` | No | - | Source system |
| `status` | String | `cm_file_status` | No | "ACTIVE" | File status |
| `category` | String | `cm_category` | No | - | Category |
| `pageCount` | Integer | `cm_page_count` | No | - | Number of pages |
| `securityClassification` | String | `cm_security_classification` | No | - | Security level |
| `cmisRepositoryId` | String | `cm_cmis_repository_id` | No | - | CMIS repository ID |
| `cmisObjectId` | String | `cm_cmis_object_id` | No | - | CMIS object ID |
| `versionSeriesId` | String | `cm_version_series_id` | No | - | Version series |
| `legacySystemId` | String | `cm_legacy_system_id` | No | - | Legacy reference |
| `publicFlag` | Boolean | `cm_public_flag` | No | false | Publicly accessible |
| `restricted` | Boolean | `cm_restricted` | No | false | Access restriction |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `folder` | ManyToOne | AcmFolder | Parent folder |
| `container` | ManyToOne | AcmContainer | Parent container |
| `versions` | OneToMany | EcmFileVersion | Version history |
| `activeVersionTag` | ManyToOne | EcmFileVersion | Current version |
| `participants` | OneToMany | AcmParticipant | File participants |
| `tags` | OneToMany | AcmAssociatedTag | Associated tags |

---

### 5.2 EcmFileVersion

Version history for documents.

**Class:** `com.armedia.acm.plugins.ecm.model.EcmFileVersion`
**Table:** `acm_file_version`
**Object Type:** `FILE_VERSION`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_file_version_id` | Yes | Auto | Primary key |
| `versionTag` | String | `cm_version_tag` | No | - | Version label (1.0, 2.0) |
| `versionMimeType` | String | `cm_version_mime_type` | No | - | MIME type |
| `versionFileNameExtension` | String | `cm_version_file_name_ext` | No | - | File extension |
| `cmisObjectId` | String | `cm_cmis_object_id` | No | - | CMIS object ID |
| `fileSizeBytes` | Long | `cm_file_size_bytes` | No | - | File size |
| `fileHash` | String | `cm_file_hash` | No | - | Content hash |
| `searchablePDF` | Boolean | `cm_searchable_pdf` | No | false | Has searchable PDF |
| `durationSeconds` | Double | `cm_duration_seconds` | No | - | Media duration |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `file` | ManyToOne | EcmFile | Parent file |

---

### 5.3 AcmFolder

Folder structure for documents.

**Class:** `com.armedia.acm.plugins.ecm.model.AcmFolder`
**Table:** `acm_folder`
**Object Type:** `FOLDER`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_folder_id` | Yes | Auto | Primary key |
| `name` | String | `cm_folder_name` | Yes | - | Folder name |
| `cmisFolderId` | String | `cm_cmis_folder_id` | No | - | CMIS folder ID |
| `cmisRepositoryId` | String | `cm_cmis_repository_id` | No | - | CMIS repository |
| `status` | String | `cm_status` | No | "ACTIVE" | Status |
| `attachedToObjectType` | String | `cm_attached_to_object_type` | No | - | Parent object type |
| `attachedToObjectId` | Long | `cm_attached_to_object_id` | No | - | Parent object ID |
| `restricted` | Boolean | `cm_restricted` | No | false | Access restriction |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `parentFolder` | ManyToOne | AcmFolder | Parent folder |
| `childrenFolders` | OneToMany | AcmFolder | Child folders |
| `files` | OneToMany | EcmFile | Contained files |
| `participants` | OneToMany | AcmParticipant | Folder participants |

---

### 5.4 AcmContainer

Logical document storage containers for business objects.

**Class:** `com.armedia.acm.plugins.ecm.model.AcmContainer`
**Table:** `acm_container`
**Object Type:** `CONTAINER`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_container_id` | Yes | Auto | Primary key |
| `containerObjectType` | String | `cm_container_object_type` | Yes | - | Owner object type |
| `containerObjectId` | Long | `cm_container_object_id` | Yes | - | Owner object ID |
| `containerObjectTitle` | String | `cm_container_object_title` | No | - | Display title |
| `cmisRepositoryId` | String | `cm_cmis_repository_id` | No | - | CMIS repository |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `folder` | OneToOne | AcmFolder | Root folder |
| `attachmentFolder` | OneToOne | AcmFolder | Attachments folder |
| `files` | OneToMany | EcmFile | All files |

---

### 5.5 RecycleBinItem

Deleted documents pending permanent removal.

**Class:** `com.armedia.acm.plugins.ecm.model.RecycleBinItem`
**Table:** `acm_recycle_bin`
**Object Type:** `RECYCLE_BIN_ITEM`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_recycle_bin_id` | Yes | Auto | Primary key |
| `sourceObjectId` | Long | `cm_source_object_id` | Yes | - | Original object ID |
| `sourceObjectType` | String | `cm_source_object_type` | Yes | - | Original object type |
| `sourceObjectName` | String | `cm_source_object_name` | No | - | Original name |
| `deletedDate` | Date | `cm_deleted_date` | Yes | Auto | Deletion date |
| `deletedBy` | String | `cm_deleted_by` | Yes | - | User who deleted |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

---

## 6. Supporting Entities

### 6.1 ObjectAssociation

Generic cross-object relationships.

**Class:** `com.armedia.acm.plugins.objectassociation.model.ObjectAssociation`
**Table:** `acm_object_association`
**Object Type:** `OBJECT_ASSOCIATION`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `associationId` | Long | `cm_association_id` | Yes | Auto | Primary key |
| `status` | String | `cm_status` | No | "ACTIVE" | Status |
| `parentType` | String | `cm_parent_type` | Yes | - | Source object type |
| `parentId` | Long | `cm_parent_id` | Yes | - | Source object ID |
| `parentName` | String | `cm_parent_name` | No | - | Source object name |
| `targetType` | String | `cm_target_type` | Yes | - | Target object type |
| `targetId` | Long | `cm_target_id` | Yes | - | Target object ID |
| `targetName` | String | `cm_target_name` | No | - | Target object name |
| `targetTitle` | String | `cm_target_title` | No | - | Target object title |
| `targetSubtype` | String | `cm_target_subtype` | No | - | Target subtype |
| `category` | String | `cm_category` | No | - | Category |
| `associationType` | String | `cm_association_type` | No | "OWNERSHIP" | Association type |
| `description` | String | `cm_description` | No | - | Description |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |
| `className` | String | `cm_class_name` | Yes | Auto | Discriminator |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `inverseAssociation` | OneToOne | ObjectAssociation | Bidirectional link |

#### Association Types
- `REFERENCE` - Cross-reference
- `OWNERSHIP` - Ownership relationship
- `PARENT_CHILD` - Hierarchical relationship
- `RELATED` - General relationship

---

### 6.2 Note

Comments and notes attached to business objects.

**Class:** `com.armedia.acm.services.note.model.Note`
**Table:** `acm_note`
**Object Type:** `NOTE`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_note_id` | Yes | Auto | Primary key |
| `note` | String (LOB) | `cm_note` | Yes | - | Note content |
| `type` | String | `cm_note_type` | No | "GENERAL" | Note type |
| `tag` | String | `cm_tag` | No | - | Optional tag |
| `author` | String | `cm_author` | No | - | Note author |
| `parentId` | Long | `cm_parent_id` | Yes | - | Parent object ID |
| `parentType` | String | `cm_parent_type` | Yes | - | Parent object type |
| `parentTitle` | String | `cm_parent_title` | No | - | Parent title |
| `legacySystemFlag` | Boolean | `cm_legacy_system_flag` | No | false | Legacy indicator |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |
| `className` | String | `cm_class_name` | Yes | Auto | Discriminator |

#### Note Types
`GENERAL`, `INTERNAL`, `HISTORY`, `SYSTEM`, `REJECTION`

---

### 6.3 AcmTag / AcmAssociatedTag

Tagging system for business objects.

**AcmTag Table:** `acm_tag`
**AcmAssociatedTag Table:** `acm_associated_tag`
**Object Type:** `TAG`, `ASSOCIATED_TAG`

#### AcmTag Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_tag_id` | Yes | Auto | Primary key |
| `tagName` | String | `cm_tag_name` | Yes | - | Tag name (unique) |
| `tagText` | String | `cm_tag_text` | No | - | Display text |
| `tagDescription` | String | `cm_tag_description` | No | - | Description |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### AcmAssociatedTag Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_associated_tag_id` | Yes | Auto | Primary key |
| `parentId` | Long | `cm_parent_id` | Yes | - | Tagged object ID |
| `parentType` | String | `cm_parent_type` | Yes | - | Tagged object type |
| `parentTitle` | String | `cm_parent_title` | No | - | Object title |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships (AcmAssociatedTag)

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `tag` | ManyToOne | AcmTag | Referenced tag |

---

### 6.4 Notification

System and user notifications.

**Class:** `com.armedia.acm.services.notification.model.Notification`
**Table:** `acm_notification`
**Object Type:** `NOTIFICATION`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_notification_id` | Yes | Auto | Primary key |
| `title` | String | `cm_title` | No | - | Subject/title |
| `note` | String (LOB) | `cm_note` | No | - | Content |
| `type` | String | `cm_type` | No | "AUTOMATED" | Notification type |
| `status` | String | `cm_status` | No | - | Current status |
| `action` | String | `cm_action` | No | - | Triggered action |
| `state` | String | `cm_state` | No | - | State information |
| `user` | String | `cm_user` | No | - | Target user |
| `data` | String | `cm_data` | No | - | Additional data |
| `actionDate` | Date | `cm_action_date` | No | - | Action date |
| `parentId` | Long | `cm_parent_id` | No | - | Related object ID |
| `parentType` | String | `cm_parent_type` | No | - | Related object type |
| `parentName` | String | `cm_parent_name` | No | - | Related object name |
| `parentTitle` | String | `cm_parent_title` | No | - | Related object title |
| `relatedObjectId` | Long | `cm_related_object_id` | No | - | Secondary object ID |
| `relatedObjectType` | String | `cm_related_object_type` | No | - | Secondary object type |
| `relatedObjectNumber` | String | `cm_related_object_number` | No | - | Secondary object number |
| `templateModelName` | String | `cm_template_model_name` | No | - | Template reference |
| `attachFiles` | Boolean | `cm_attach_files` | No | false | Include attachments |
| `emailAddresses` | String | `cm_email_addresses` | No | - | Recipients |
| `ccEmailAddresses` | String | `cm_cc_email_addresses` | No | - | CC recipients |
| `bccEmailAddresses` | String | `cm_bcc_email_addresses` | No | - | BCC recipients |
| `emailGroup` | String | `cm_email_group` | No | - | Recipient group |
| `subject` | String | `cm_subject` | No | - | Email subject |
| `emailContent` | String (LOB) | `cm_email_content` | No | - | Email body |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships

| Relationship | Type | Target | Join Table | Description |
|--------------|------|--------|------------|-------------|
| `files` | ManyToMany | EcmFileVersion | - | Attached files |

---

### 6.5 AuditEvent

Complete audit trail of system events.

**Class:** `com.armedia.acm.audit.model.AuditEvent`
**Table:** `acm_audit_log`
**Object Type:** `AUDIT_EVENT`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_audit_id` | Yes | Auto | Primary key |
| `eventDate` | Date | `cm_event_date` | Yes | - | Event timestamp |
| `userId` | String | `cm_user_id` | No | - | User who performed action |
| `fullEventType` | String | `cm_full_event_type` | Yes | - | Event type (e.g., CASE_FILE_CREATED) |
| `eventDescription` | String | `cm_event_description` | No | - | Human-readable description |
| `eventResult` | String | `cm_event_result` | No | - | Success/failure |
| `ipAddress` | String | `cm_ip_address` | No | - | Source IP |
| `objectType` | String | `cm_object_type` | No | - | Affected object type |
| `objectId` | Long | `cm_object_id` | No | - | Affected object ID |
| `parentObjectType` | String | `cm_parent_object_type` | No | - | Parent object type |
| `parentObjectId` | Long | `cm_parent_object_id` | No | - | Parent object ID |
| `status` | String | `cm_status` | No | - | Audit status |
| `trackId` | String | `cm_track_id` | No | - | Tracking identifier |
| `requestId` | UUID | `cm_request_id` | No | - | Request correlation ID |
| `diffDetailsAsJson` | String (LOB) | `cm_diff_details` | No | - | JSON diff of changes |

#### Relationships

| Relationship | Type | Target | Join Table | Description |
|--------------|------|--------|------------|-------------|
| `eventProperties` | ElementCollection | Map<String,String> | `acm_audit_log_property` | Key-value details |

---

### 6.6 AcmObjectHistory

Object state snapshots for version history.

**Class:** `com.armedia.acm.service.objecthistory.model.AcmObjectHistory`
**Table:** `acm_object_history`
**Object Type:** `OBJECT_HISTORY`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_history_id` | Yes | Auto | Primary key |
| `objectType` | String | `cm_object_type` | Yes | - | Object type |
| `objectId` | Long | `cm_object_id` | Yes | - | Object ID |
| `objectString` | String (LOB) | `cm_object_string` | No | - | JSON snapshot |
| `userId` | String | `cm_user_id` | No | - | User who modified |
| `date` | Date | `cm_date` | No | - | Change date |
| `type` | String | `cm_type` | No | - | Change type |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

---

### 6.7 AcmCostsheet / AcmCost

Cost tracking for cases and complaints.

**AcmCostsheet Table:** `acm_costsheet`
**AcmCost Table:** `acm_cost`
**Object Type:** `COSTSHEET`, `COST`

#### AcmCostsheet Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_costsheet_id` | Yes | Auto | Primary key |
| `costsheetNumber` | String | `cm_costsheet_number` | Yes | Auto-seq | Identifier |
| `parentType` | String | `cm_parent_type` | Yes | - | Parent object type |
| `parentId` | Long | `cm_parent_id` | Yes | - | Parent object ID |
| `parentNumber` | String | `cm_parent_number` | No | - | Parent object number |
| `title` | String | `cm_title` | No | - | Costsheet title |
| `details` | String (LOB) | `cm_details` | No | - | Additional details |
| `status` | String | `cm_status` | No | - | Status |
| `restricted` | Boolean | `cm_restricted` | No | false | Access restriction |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### AcmCostsheet Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `user` | ManyToOne | AcmUser | Assigned user |
| `costs` | OneToMany | AcmCost | Line items |
| `participants` | OneToMany | AcmParticipant | Participants |
| `container` | OneToOne | AcmContainer | ECM folder |

#### AcmCost Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_cost_id` | Yes | Auto | Primary key |
| `date` | Date | `cm_date` | No | - | Cost date |
| `value` | Double | `cm_value` | No | - | Cost amount |
| `title` | String | `cm_title` | No | - | Description |
| `description` | String | `cm_description` | No | - | Details |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |
| `className` | String | `cm_class_name` | Yes | Auto | Discriminator |

#### AcmCost Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `costsheet` | ManyToOne | AcmCostsheet | Parent costsheet |

---

### 6.8 AcmSubscription

User subscriptions to objects for notifications.

**Class:** `com.armedia.acm.services.subscription.model.AcmSubscription`
**Table:** `acm_subscription`
**Object Type:** `SUBSCRIPTION`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `subscriptionId` | Long | `cm_subscription_id` | Yes | Auto | Primary key |
| `userId` | String | `cm_user_id` | Yes | - | Subscribed user (immutable) |
| `objectType` | String | `cm_object_type` | Yes | - | Object type (immutable) |
| `objectId` | Long | `cm_object_id` | Yes | - | Object ID (immutable) |
| `objectName` | String | `cm_object_name` | No | - | Object name |
| `objectTitle` | String | `cm_object_title` | No | - | Object title |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

---

### 6.9 AcmQueue

Workflow queues for routing and prioritization.

**Class:** `com.armedia.acm.plugins.casefile.model.AcmQueue`
**Table:** `acm_queue`
**Object Type:** `QUEUE`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_queue_id` | Yes | Auto | Primary key |
| `name` | String | `cm_queue_name` | Yes | - | Queue name |
| `displayOrder` | Integer | `cm_display_order` | No | - | UI sort order |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp |
| `creator` | String | `cm_creator` | Yes | Auto | Creator |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

---

## 7. Chatbot Entities

### 7.1 ChatConversation

AI chat sessions.

**Class:** `com.armedia.acm.plugins.chatbot.model.ChatConversation`
**Table:** `acm_chat_conversation`
**Object Type:** `CHAT_CONVERSATION`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_conversation_id` | Yes | Auto | Primary key |
| `title` | String | `cm_title` | No | - | Conversation title |
| `status` | String | `cm_status` | No | "ACTIVE" | Status |
| `userId` | String | `cm_user_id` | Yes | - | User ID |
| `contextObjectType` | String | `cm_context_object_type` | No | - | Related object type |
| `contextObjectId` | Long | `cm_context_object_id` | No | - | Related object ID |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp (immutable) |
| `creator` | String | `cm_creator` | Yes | Auto | Creator (immutable) |
| `modified` | Date | `cm_modified` | Yes | Auto | Last modification |
| `modifier` | String | `cm_modifier` | Yes | Auto | Last modifier |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `messages` | OneToMany | ChatMessage | Messages in conversation |

#### Status Values
`ACTIVE`, `ARCHIVED`, `DELETED`

---

### 7.2 ChatMessage

Individual chat messages.

**Class:** `com.armedia.acm.plugins.chatbot.model.ChatMessage`
**Table:** `acm_chat_message`
**Object Type:** `CHAT_MESSAGE`

#### Properties

| Property | Type | Column | Required | Default | Description |
|----------|------|--------|----------|---------|-------------|
| `id` | Long | `cm_message_id` | Yes | Auto | Primary key |
| `role` | Enum | `cm_role` | Yes | - | USER or ASSISTANT |
| `content` | String (LOB) | `cm_content` | Yes | - | Message text |
| `conversationId` | Long | `cm_conversation_id` | Yes | - | Parent conversation FK |
| `tokensUsed` | Integer | `cm_tokens_used` | No | - | Tokens consumed |
| `modelUsed` | String | `cm_model_used` | No | - | LLM model identifier |
| `actionType` | String | `cm_action_type` | No | - | Action type |
| `actionTargetType` | String | `cm_action_target_type` | No | - | Target object type |
| `actionTargetId` | Long | `cm_action_target_id` | No | - | Target object ID |
| `created` | Date | `cm_created` | Yes | Auto | Creation timestamp (immutable) |

#### Relationships

| Relationship | Type | Target | Description |
|--------------|------|--------|-------------|
| `conversation` | ManyToOne | ChatConversation | Parent conversation |

#### Enums

**ChatMessageRole:**
- `USER` - User message
- `ASSISTANT` - AI response

---

## 8. Enums & Reference Data

### 8.1 Status Values by Entity Type

| Entity | Status Values |
|--------|---------------|
| CaseFile | `DRAFT`, `OPEN`, `IN_PROGRESS`, `UNDER_REVIEW`, `CLOSED`, `DENIED`, `APPROVED` |
| Complaint | `DRAFT`, `SUBMITTED`, `IN_REVIEW`, `UNDER_REVIEW`, `CLOSED`, `DENIED`, `APPROVED` |
| Consultation | `DRAFT`, `SUBMITTED`, `IN_REVIEW`, `UNDER_REVIEW`, `CLOSED` |
| Task | `ASSIGNED`, `IN_PROGRESS`, `COMPLETED`, `ON_HOLD`, `REWORK`, `WITHDRAWN`, `SUSPENDED` |
| BusinessProcess | `ACTIVE`, `COMPLETED`, `SUSPENDED`, `TERMINATED` |
| ChatConversation | `ACTIVE`, `ARCHIVED`, `DELETED` |
| Person | `ACTIVE`, `INACTIVE` |
| Organization | `ACTIVE`, `INACTIVE` |
| AcmGroup | `ACTIVE`, `INACTIVE` |
| AcmUser | `VALID`, `INVALID`, `DISABLED` |
| EcmFile | `ACTIVE`, `INACTIVE`, `RECORD` |
| AcmFolder | `ACTIVE`, `INACTIVE` |

### 8.2 Participant Types

| Type | Description |
|------|-------------|
| `ASSIGNEE` | Task/case assignee |
| `OWNING_GROUP` | Responsible group |
| `CREATOR` | Object creator |
| `SUPERVISOR` | Supervisor |
| `COLLABORATOR` | Collaborator |
| `FOLLOWER` | Following the object |
| `APPROVER` | Approval chain member |
| `READER` | Read-only access |
| `NO_ACCESS` | Explicitly denied |

### 8.3 Contact Method Types

| Type | Description |
|------|-------------|
| `EMAIL` | Email address |
| `PHONE` | Phone number |
| `MOBILE` | Mobile phone |
| `FAX` | Fax number |
| `URL` | Website URL |

### 8.4 Contact Method Sub-Types

| Sub-Type | Description |
|----------|-------------|
| `WORK` | Work contact |
| `HOME` | Home contact |
| `PERSONAL` | Personal contact |
| `OTHER` | Other |

### 8.5 Address Types

| Type | Description |
|------|-------------|
| `MAILING` | Mailing address |
| `BILLING` | Billing address |
| `PHYSICAL` | Physical location |
| `HOME` | Home address |
| `WORK` | Work address |
| `OTHER` | Other |

### 8.6 Association Types

| Type | Description |
|------|-------------|
| `REFERENCE` | Cross-reference |
| `OWNERSHIP` | Ownership relationship |
| `PARENT_CHILD` | Hierarchical |
| `RELATED` | General relationship |

### 8.7 User States

| State | Description |
|-------|-------------|
| `VALID` | Active, valid account |
| `INVALID` | Marked for deletion |
| `DISABLED` | Explicitly disabled |

### 8.8 Group Types

| Type | Description |
|------|-------------|
| `ADHOC_GROUP` | Ad-hoc group |
| `LDAP_GROUP` | LDAP-sourced |
| `SYSTEM_GROUP` | System-defined |

### 8.9 Chat Message Roles

| Role | Description |
|------|-------------|
| `USER` | User message |
| `ASSISTANT` | AI response |

### 8.10 Note Types

| Type | Description |
|------|-------------|
| `GENERAL` | General note |
| `INTERNAL` | Internal note |
| `HISTORY` | History note |
| `SYSTEM` | System-generated |
| `REJECTION` | Rejection reason |

---

## 9. Entity Relationship Diagrams

### 9.1 Core Business Objects Hierarchy

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CORE BUSINESS OBJECTS                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  CaseFile ─────┬───── AcmParticipant ◄────── AcmParticipantPrivilege│
│      │         │              │                                     │
│      │         ├───── ObjectAssociation ──── (other objects)        │
│      │         │                                                    │
│      │         ├───── AcmContainer ─────────── AcmFolder            │
│      │         │                                    │               │
│      │         ├───── AcmQueue                    EcmFile           │
│      │         │                                    │               │
│      │         └───── AcmMilestone              EcmFileVersion      │
│      │                                                              │
│  Complaint ────┬───── AcmParticipant                                │
│      │         ├───── PersonAssociation ──────── Person             │
│      │         ├───── OrganizationAssociation ── Organization       │
│      │         ├───── ObjectAssociation                             │
│      │         ├───── PostalAddress                                 │
│      │         ├───── AcmContainer                                  │
│      │         └───── Disposition                                   │
│      │                                                              │
│  Consultation ─┬───── AcmParticipant                                │
│      │         ├───── PersonAssociation                             │
│      │         ├───── OrganizationAssociation                       │
│      │         ├───── ObjectAssociation                             │
│      │         ├───── AcmContainer                                  │
│      │         └───── AcmObjectLock                                 │
│      │                                                              │
│  Task ─────────┬───── AcmParticipant                                │
│                ├───── ObjectAssociation                             │
│                ├───── AcmContainer                                  │
│                ├───── EcmFile (documentsToReview)                   │
│                ├───── TaskOutcome                                   │
│                └───── BuckslipFutureTask                            │
│                                                                     │
│  BusinessProcess ── AcmParticipant                                  │
│                  └─ AcmContainer                                    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 9.2 Person & Organization Relationships

```
┌─────────────────────────────────────────────────────────────────────┐
│                 PERSON & ORGANIZATION ENTITIES                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  Person ───────┬───── PostalAddress (M:M, acm_person_postal_address)│
│      │         │                                                    │
│      │         ├───── ContactMethod (M:M, acm_person_contact_method)│
│      │         │                                                    │
│      │         ├───── PersonAlias (1:M)                             │
│      │         │                                                    │
│      │         ├───── Identification (1:M, acm_person_identification)│
│      │         │                                                    │
│      │         ├───── PersonOrganizationAssociation (M:M)           │
│      │         │              │                                     │
│      │         │              └───────── Organization               │
│      │         │                              │                     │
│      │         ├───── AcmParticipant          ├── PostalAddress     │
│      │         │                              ├── ContactMethod     │
│      │         ├───── AcmContainer            ├── Identification    │
│      │         │                              ├── OrganizationDBA   │
│      │         └───── EcmFile (picture)       └── ParentOrganization│
│      │                                             (self-ref)       │
│      │                                                              │
└─────────────────────────────────────────────────────────────────────┘
```

### 9.3 User & Access Control

```
┌─────────────────────────────────────────────────────────────────────┐
│                    USER & ACCESS CONTROL                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  AcmUser ──────┬───── AcmGroup (M:M, acm_user_membership)           │
│      │         │          │                                         │
│      │         │          ├───── AcmGroup (member groups, M:M)      │
│      │         │          │          acm_group_membership           │
│      │         │          │                                         │
│      │         │          └───── AcmUser (supervisor, M:1)          │
│      │         │                                                    │
│      │         └───── AcmUserIdentifier (1:1)                       │
│      │                                                              │
│  AcmParticipant ── AcmParticipantPrivilege (1:M)                    │
│      │                                                              │
│      │   References any business object via:                        │
│      │   - objectType (CASE_FILE, COMPLAINT, etc.)                  │
│      │   - objectId                                                 │
│      │   - participantLdapId (user or group)                        │
│      │                                                              │
└─────────────────────────────────────────────────────────────────────┘
```

### 9.4 Document Management (ECM)

```
┌─────────────────────────────────────────────────────────────────────┐
│                    DOCUMENT MANAGEMENT (ECM)                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  AcmContainer ─┬───── AcmFolder (root folder, 1:1)                  │
│      │         │          │                                         │
│      │         │          ├───── AcmFolder (children, 1:M)          │
│      │         │          │                                         │
│      │         │          └───── EcmFile (files, 1:M)               │
│      │         │                     │                              │
│      │         │                     ├── EcmFileVersion (1:M)       │
│      │         │                     │                              │
│      │         │                     ├── AcmParticipant (1:M)       │
│      │         │                     │                              │
│      │         │                     └── AcmAssociatedTag (1:M)     │
│      │         │                                                    │
│      │         └───── AcmFolder (attachment folder, 1:1)            │
│      │                                                              │
│  RecycleBinItem (soft-deleted files)                                │
│                                                                     │
│  Links to business objects via:                                     │
│  - containerObjectType                                              │
│  - containerObjectId                                                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 9.5 Supporting Entities

```
┌─────────────────────────────────────────────────────────────────────┐
│                     SUPPORTING ENTITIES                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ObjectAssociation ── Links any two objects                         │
│      │   parentType, parentId ──── targetType, targetId             │
│      │                                                              │
│  Note ────────────── parentType, parentId (any object)              │
│                                                                     │
│  AcmTag ◄──────────── AcmAssociatedTag                              │
│                         │   parentType, parentId (any object)       │
│                                                                     │
│  Notification ──────── parentType, parentId (any object)            │
│      │                 relatedObjectType, relatedObjectId           │
│      └───── EcmFileVersion (attachments, M:M)                       │
│                                                                     │
│  AuditEvent ────────── objectType, objectId (any object)            │
│      │                 parentObjectType, parentObjectId             │
│      └───── eventProperties (Map, ElementCollection)                │
│                                                                     │
│  AcmObjectHistory ──── objectType, objectId (any object)            │
│                                                                     │
│  AcmCostsheet ──┬───── AcmCost (1:M)                                │
│      │          ├───── AcmUser                                      │
│      │          ├───── AcmParticipant (1:M)                         │
│      │          └───── AcmContainer                                 │
│      │                                                              │
│  AcmSubscription ──── userId, objectType, objectId                  │
│                                                                     │
│  AcmQueue ─────────── Referenced by CaseFile, Complaint             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

### 9.6 Chatbot Entities

```
┌─────────────────────────────────────────────────────────────────────┐
│                       CHATBOT ENTITIES                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ChatConversation ──┬───── ChatMessage (1:M)                        │
│      │              │          │                                    │
│      │              │          ├── role (USER/ASSISTANT)            │
│      │              │          ├── content                          │
│      │              │          ├── tokensUsed                       │
│      │              │          └── modelUsed                        │
│      │              │                                               │
│      │              └── Context reference:                          │
│      │                  contextObjectType (CASE_FILE, etc.)         │
│      │                  contextObjectId                             │
│      │                                                              │
│      └───── userId (owner)                                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 10. Cross-Cutting Patterns

### 10.1 Audit Trail Pattern

All entities include standard audit fields:

```java
@Column(name = "cm_created", nullable = false, insertable = true, updatable = false)
@Temporal(TemporalType.TIMESTAMP)
private Date created;

@Column(name = "cm_creator", insertable = true, updatable = false)
private String creator;

@Column(name = "cm_modified", nullable = false)
@Temporal(TemporalType.TIMESTAMP)
private Date modified;

@Column(name = "cm_modifier")
private String modifier;
```

### 10.2 Parent Object Reference Pattern

Allows entities to reference any business object polymorphically:

```java
@Column(name = "cm_parent_type")
private String parentType;  // "CASE_FILE", "COMPLAINT", etc.

@Column(name = "cm_parent_id")
private Long parentId;

@Column(name = "cm_parent_title")
private String parentTitle;  // For display purposes
```

### 10.3 Polymorphic Inheritance Pattern

Single-table inheritance with discriminator:

```java
@Entity
@Table(name = "acm_note")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "cm_class_name", discriminatorType = DiscriminatorType.STRING)
public class Note implements AcmEntity {
    // ...
}
```

### 10.4 Container Pattern

Business objects reference ECM containers for document storage:

```java
@OneToOne
@JoinColumn(name = "cm_container_id")
private AcmContainer container;
```

The container then provides access to folders and files.

### 10.5 Participant Pattern

Generic association of users/groups to any business object:

```java
@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
@JoinColumns({
    @JoinColumn(name = "cm_object_id", referencedColumnName = "cm_case_id"),
    @JoinColumn(name = "cm_object_type", referencedColumnName = "cm_object_type")
})
private List<AcmParticipant> participants;
```

### 10.6 Stateful Entity Pattern

Entities with status tracking implement `AcmStatefulEntity`:

```java
public interface AcmStatefulEntity {
    String getStatus();
    void setStatus(String status);
}
```

### 10.7 JSON Serialization Pattern

Prevents circular references in JSON:

```java
@JsonIdentityInfo(generator = JSOGGenerator.class)
public class CaseFile implements AcmEntity {
    // ...
}
```

### 10.8 Table Generator Pattern

Standard ID generation:

```java
@Id
@TableGenerator(name = "case_file_gen", table = "acm_case_file_id",
                pkColumnName = "cm_seq_name", valueColumnName = "cm_seq_num",
                pkColumnValue = "acm_case_file", allocationSize = 1)
@GeneratedValue(strategy = GenerationType.TABLE, generator = "case_file_gen")
@Column(name = "cm_case_id")
private Long id;
```

---

## 11. Quick Reference

### 11.1 Object Types

| Object Type | Table | Primary Key |
|-------------|-------|-------------|
| `CASE_FILE` | `acm_case_file` | `cm_case_id` |
| `COMPLAINT` | `acm_complaint` | `cm_complaint_id` |
| `CONSULTATION` | `acm_consultation` | `cm_consultation_id` |
| `TASK` | Activiti | workflow task ID |
| `BUSINESS_PROCESS` | `acm_business_process` | `cm_business_process_id` |
| `PERSON` | `acm_person` | `cm_person_id` |
| `ORGANIZATION` | `acm_organization` | `cm_organization_id` |
| `USER` | `acm_user` | `cm_user_id` (String) |
| `GROUP` | `acm_group` | `cm_group_name` (String) |
| `PARTICIPANT` | `acm_participant` | `cm_participant_id` |
| `FILE` | `acm_file` | `cm_file_id` |
| `FOLDER` | `acm_folder` | `cm_folder_id` |
| `CONTAINER` | `acm_container` | `cm_container_id` |
| `NOTE` | `acm_note` | `cm_note_id` |
| `TAG` | `acm_tag` | `cm_tag_id` |
| `NOTIFICATION` | `acm_notification` | `cm_notification_id` |
| `SUBSCRIPTION` | `acm_subscription` | `cm_subscription_id` |
| `QUEUE` | `acm_queue` | `cm_queue_id` |
| `COSTSHEET` | `acm_costsheet` | `cm_costsheet_id` |
| `CHAT_CONVERSATION` | `acm_chat_conversation` | `cm_conversation_id` |
| `CHAT_MESSAGE` | `acm_chat_message` | `cm_message_id` |

### 11.2 Common Join Tables

| Join Table | Links | Columns |
|------------|-------|---------|
| `acm_user_membership` | AcmUser ↔ AcmGroup | `cm_user_id`, `cm_group_name` |
| `acm_group_membership` | AcmGroup ↔ AcmGroup | `cm_parent_group`, `cm_member_group` |
| `acm_person_postal_address` | Person ↔ PostalAddress | `cm_person_id`, `cm_postal_address_id` |
| `acm_person_contact_method` | Person ↔ ContactMethod | `cm_person_id`, `cm_contact_method_id` |
| `acm_person_identification` | Person ↔ Identification | `cm_person_id`, `cm_identification_id` |
| `acm_organization_postal_address` | Organization ↔ PostalAddress | `cm_organization_id`, `cm_postal_address_id` |
| `acm_organization_contact_method` | Organization ↔ ContactMethod | `cm_organization_id`, `cm_contact_method_id` |
| `acm_organization_identification` | Organization ↔ Identification | `cm_organization_id`, `cm_identification_id` |
| `acm_address_contact_method` | PostalAddress ↔ ContactMethod | `cm_postal_address_id`, `cm_contact_method_id` |
| `acm_person_security_tag` | Person → String | `cm_person_id`, `cm_tag` |
| `acm_audit_log_property` | AuditEvent → Map | `cm_audit_id`, `cm_key`, `cm_value` |

### 11.3 Source File Locations

| Entity | Location |
|--------|----------|
| CaseFile | `acm-plugins/acm-default-plugins/acm-case-file-plugin/src/main/java/com/armedia/acm/plugins/casefile/model/` |
| Complaint | `acm-plugins/acm-default-plugins/acm-complaint-plugin/src/main/java/com/armedia/acm/plugins/complaint/model/` |
| Consultation | `acm-plugins/acm-default-plugins/acm-consultation-plugin/src/main/java/com/armedia/acm/plugins/consultation/model/` |
| Task | `acm-plugins/acm-default-plugins/acm-task-plugin/src/main/java/com/armedia/acm/plugins/task/model/` |
| BusinessProcess | `acm-plugins/acm-default-plugins/acm-business-process-plugin/src/main/java/com/armedia/acm/plugins/businessprocess/model/` |
| Person | `acm-plugins/acm-default-plugins/acm-person-organization-plugin-api/src/main/java/com/armedia/acm/plugins/person/organization/model/` |
| Organization | `acm-plugins/acm-default-plugins/acm-person-organization-plugin-api/src/main/java/com/armedia/acm/plugins/person/organization/model/` |
| ObjectAssociation | `acm-plugins/acm-default-plugins/acm-object-association-plugin/src/main/java/com/armedia/acm/plugins/objectassociation/model/` |
| ChatConversation | `acm-plugins/acm-default-plugins/acm-chatbot-plugin/src/main/java/com/armedia/acm/plugins/chatbot/model/` |
| AcmUser | `acm-services/acm-service-users/src/main/java/com/armedia/acm/services/users/model/` |
| AcmGroup | `acm-services/acm-service-users/src/main/java/com/armedia/acm/services/users/model/group/` |
| AcmParticipant | `acm-services/acm-service-participants/src/main/java/com/armedia/acm/services/participants/model/` |
| EcmFile | `acm-services/acm-service-ecm/src/main/java/com/armedia/acm/plugins/ecm/model/` |
| Note | `acm-services/acm-service-note/src/main/java/com/armedia/acm/services/note/model/` |
| AcmTag | `acm-services/acm-service-tag/src/main/java/com/armedia/acm/services/tag/model/` |
| Notification | `acm-services/acm-service-notification/src/main/java/com/armedia/acm/services/notification/model/` |
| AuditEvent | `acm-services/acm-service-audit/src/main/java/com/armedia/acm/audit/model/` |
| AcmObjectHistory | `acm-services/acm-service-object-history/src/main/java/com/armedia/acm/service/objecthistory/model/` |
| AcmCostsheet | `acm-services/acm-service-costsheet/src/main/java/com/armedia/acm/services/costsheet/model/` |
| AcmSubscription | `acm-services/acm-service-subscription/src/main/java/com/armedia/acm/services/subscription/model/` |
| ContactMethod | `acm-plugins/acm-default-plugins/acm-addressable-plugin/src/main/java/com/armedia/acm/plugins/addressable/model/` |
| PostalAddress | `acm-plugins/acm-default-plugins/acm-addressable-plugin/src/main/java/com/armedia/acm/plugins/addressable/model/` |

---

*End of ArkCase Data Dictionary*
