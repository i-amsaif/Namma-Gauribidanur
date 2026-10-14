# Namma Gauribidanur — Data Dictionary & Entity Model

This document specifies the schema, data types, validation constraints, and lifecycle states used throughout the Namma Gauribidanur platform.

---

## 1. Complaint Entity (`Complaint`)

Represents a citizen-reported civic grievance filed through the web prototype.

| Field | Type | Description | Example |
| :--- | :--- | :--- | :--- |
| `id` | `string` | Unique tracking token | `"GBN-DEMO-000101"` |
| `title` | `string` | Short grievance summary (5–100 chars) | `"Pothole on Railway Station Road"` |
| `description` | `string` | Detailed narrative (10–500 chars) | `"Deep crater near platform approach..."` |
| `category` | `IssueCategory` | Civic department classification | `"ROADS_POTHOLES"` |
| `location` | `ComplaintLocation` | Spatial coordinates and address | See below |
| `photoUrl` | `string` (optional) | Base64 or URL of attached issue photo | `"/assets/photo.jpg"` |
| `status` | `IssueStatus` | Current workflow state | `"IN_PROGRESS"` |
| `reportedAt` | `string` (ISO 8601) | Timestamp of report creation | `"2026-10-02T09:30:00Z"` |
| `updatedAt` | `string` (ISO 8601) | Timestamp of last status modification | `"2026-10-10T14:15:00Z"` |
| `upvotes` | `number` | Citizen priority counter | `18` |
| `assignedDepartmentId` | `string` (optional) | Foreign key to `Department` | `"dept-cmc-01"` |
| `timeline` | `ComplaintTimelineEntry[]` | Chronological audit trail | Array of timeline entries |
| `isDemoRecord` | `boolean` | Flag ensuring demo transparency | `true` |

### Complaint Location (`ComplaintLocation`)
* `address`: Street, colony, or house number (`string`).
* `landmark`: Optional nearby reference landmark (`string`).
* `zone`: `'TOWN_MUNICIPALITY' | 'TALUK_RURAL'`.
* `wardOrVillage`: Official ward or village name (`string`).
* `coordinates`: `{ lat: number, lng: number }`.

### Status Lifecycle (`IssueStatus`)
1. **`SUBMITTED`:** Grievance recorded by citizen in prototype database.
2. **`UNDER_REVIEW`:** Ward junior engineer or Gram Panchayat officer inspecting site.
3. **`FORWARDED`:** Referred to specialized wing (e.g. electrical, underground drainage, PWD).
4. **`IN_PROGRESS`:** Work order issued; contractor or municipal maintenance team on-site.
5. **`RESOLVED`:** Remediation complete; photographic evidence and closure remarks posted.
6. **`REOPENED`:** Resolution disputed by resident or problem recurred.

---

## 2. Department Entity (`Department`)

Defines local governing wings and utility boards.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique department identifier (e.g. `"dept-cmc-01"`) |
| `name` | `string` | Full official name in English |
| `nameKn` | `string` | Official Kannada title |
| `shortCode` | `string` | 2–6 letter acronym (`"CMC"`, `"BESCOM"`, `"PWD"`) |
| `jurisdiction` | `enum` | `'TOWN_CMC' \| 'TALUK_PANCHAYAT' \| 'DISTRICT_CHIKKABALLAPUR' \| 'STATE_UTILITY'` |
| `headOfficeAddress` | `string` | Physical location in Gauribidanur |
| `officialHelpline` | `string` (optional) | Official telephone/landline number |
| `officialEmail` | `string` (optional) | Official departmental email |
| `workingHours` | `string` | Office public visiting hours |
| `responsibleCategories` | `IssueCategory[]` | Categories mapped to this department |
| `verifiedStatus` | `enum` | `'OFFICIALLY_VERIFIED' \| 'COMMUNITY_RECORDED'` |

---

## 3. Official Entity (`Official`)

Catalog of public administrators and department heads.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Unique official record ID (e.g. `"off-tahsildar-01"`) |
| `name` | `string` | Official's full name |
| `nameKn` | `string` | Official's name in Kannada |
| `designation` | `string` | Administrative post |
| `departmentName` | `string` | Associated government wing |
| `officeLocation` | `string` | Office address |
| `jurisdictionScope` | `string` | Geographical boundary covered |
| `publicPhone` | `string` (optional) | Public office contact telephone |
| `isPublicPhoneVerified` | `boolean` | Confirms number is an official landline/helpline |
| `officialEmail` | `string` (optional) | Government email address |
| `sourceTraceability` | `string` | Source portal citation (e.g. District Directory) |

---

## 4. News Article Entity (`NewsArticle`)

Researched, verified news articles stored in code.

| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | `string` | Slug-based identifier |
| `title` | `string` | Original article headline |
| `titleKn` | `string` | Kannada translated headline |
| `summary` | `string` | Objective summary written in independent prose |
| `publisher` | `string` | Publishing media organization (*The Hindu*, *Deccan Herald*, *Prajavani*) |
| `sourceUrl` | `string` | Canonical link to original publication |
| `publishedAt` | `string` (YYYY-MM-DD) | Verified publication date |
| `category` | `enum` | `'CIVIC' \| 'DEVELOPMENT' \| 'SCIENCE_RESEARCH' \| 'HERITAGE' \| 'SAFETY' \| 'LOCAL'` |
| `imageUrl` | `string` | Permitted image link |
| `imageCredit` | `string` | Attribution and illustrative context |
| `imageLicense` | `string` | Licensing authority (e.g. Unsplash Free Commercial License) |

---

## 5. Secondary Entities

* **`CommunityEvent`:** Cultural fairs, health drives, science exhibits (`id`, `title`, `date`, `venue`, `rsvpsCount`).
* **`NoticeboardPost`:** Moderated community updates (`id`, `title`, `content`, `authorArea`, `moderationStatus`).
* **`LocalBusiness`:** Merchants and artisanal shops (`id`, `name`, `category`, `fullAddress`, `rating`, `openingHours`).
* **`LocalCreator`:** Video journalists and creators (`id`, `name`, `handle`, `audienceEstimate`, `preferredCollabs`).
* **`CollaborationRequest`:** Business inquiry to creator (`id`, `creatorId`, `businessName`, `campaignDetails`).
