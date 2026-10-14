# Namma Gauribidanur — Production Backend Architecture Plan

## 1. Architecture Overview
This plan specifies the prospective server-side architecture to transition the Namma Gauribidanur frontend prototype into a resilient, scalable, secure civic production system.

```
+-------------------------------------------------------------------+
|               Next.js App Router (SSR + Client UI)                |
+---------------------------------+---------------------------------+
                                  | HTTPS / REST / GraphQL
                                  v
+---------------------------------+---------------------------------+
|                  API Gateway & Edge Middleware                   |
|           (Rate limiting, JWT Validation, DPDP Consent)           |
+---------------------------------+---------------------------------+
                                  |
         +------------------------+------------------------+
         |                                                 |
         v                                                 v
+-----------------------+                         +------------------+
|   Supabase / Postgres |                         | Object Storage   |
|   - PostGIS Engine    |                         | (S3 / R2 Bucket) |
|   - Row Level Security|                         | - Issue Photos   |
|   - Auth & RBAC       |                         | - Evidence Media |
+-----------------------+                         +------------------+
         |
         v
+-----------------------+
| Background Queues     |
| (pg_cron & Webhooks)  |
| - SLA Escalations     |
| - WhatsApp / SMS Alert|
+-----------------------+
```

---

## 2. Recommended Database Engine: PostgreSQL + PostGIS

PostgreSQL with the **PostGIS extension** is the recommended choice because civic technology platforms fundamentally depend on rigorous spatial geometry:
1. Validating whether GPS coordinates fall strictly inside the Gauribidanur Taluk cadastral polygon.
2. Determining whether an issue belongs to Gauribidanur City Municipal Council (CMC) or a rural Gram Panchayat.
3. Automatically assigning grievances to the responsible Ward Junior Engineer based on polygon intersection:
```sql
SELECT ward_id, ward_name, responsible_engineer_id 
FROM municipal_wards 
WHERE ST_Contains(geom, ST_SetSRID(ST_Point(77.5170, 13.6111), 4326));
```

---

## 3. Relational Schema & Table Definitions

### Core Tables
1. **`profiles`**
   * `id UUID PRIMARY KEY REFERENCES auth.users(id)`
   * `phone_number TEXT UNIQUE NOT NULL`
   * `full_name TEXT`
   * `preferred_language TEXT DEFAULT 'en'`
   * `ward_or_village TEXT`
   * `role_id UUID REFERENCES roles(id)`
   * `created_at TIMESTAMPTZ DEFAULT NOW()`

2. **`roles`**
   * `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
   * `role_name TEXT UNIQUE` (`'CITIZEN'`, `'WARD_ENGINEER'`, `'HEALTH_INSPECTOR'`, `'CMC_COMMISSIONER'`, `'TAHSILDAR'`, `'SUPER_ADMIN'`)
   * `permissions JSONB NOT NULL`

3. **`complaints`**
   * `id TEXT PRIMARY KEY` (Generated format: `GBN-YYYY-XXXXXX`)
   * `reporter_id UUID REFERENCES profiles(id)` (Protected by RLS; never displayed publicly)
   * `category TEXT NOT NULL`
   * `title TEXT NOT NULL`
   * `description TEXT NOT NULL`
   * `status TEXT NOT NULL DEFAULT 'SUBMITTED'`
   * `location GEOGRAPHY(Point, 4326) NOT NULL`
   * `address_text TEXT NOT NULL`
   * `landmark TEXT`
   * `zone TEXT NOT NULL` (`'TOWN_MUNICIPALITY'` or `'TALUK_RURAL'`)
   * `ward_id UUID REFERENCES geographic_areas(id)`
   * `assigned_dept_id UUID REFERENCES departments(id)`
   * `assigned_officer_id UUID REFERENCES profiles(id)`
   * `upvotes_count INTEGER DEFAULT 0`
   * `reported_at TIMESTAMPTZ DEFAULT NOW()`
   * `updated_at TIMESTAMPTZ DEFAULT NOW()`

4. **`complaint_updates` (Audit Timeline)**
   * `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
   * `complaint_id TEXT REFERENCES complaints(id) ON DELETE CASCADE`
   * `author_id UUID REFERENCES profiles(id)`
   * `status_from TEXT`
   * `status_to TEXT`
   * `official_remarks TEXT NOT NULL`
   * `evidence_photo_url TEXT`
   * `created_at TIMESTAMPTZ DEFAULT NOW()`

5. **`geographic_areas`**
   * `id UUID PRIMARY KEY DEFAULT gen_random_uuid()`
   * `name TEXT NOT NULL`
   * `area_type TEXT NOT NULL` (`'CMC_WARD'`, `'GRAM_PANCHAYAT'`, `'TALUK_BOUNDARY'`)
   * `boundary_geom GEOMETRY(Polygon, 4326) NOT NULL`
   * `survey_source TEXT`

---

## 4. Security & Row Level Security (RLS) Policies

* **Public Reading:** Citizens can read all published complaints, issue status histories, officials directories, news, and events.
* **Citizen Privacy Protection:** RLS strictly restricts querying the `reporter_id` and personal contact number:
```sql
CREATE POLICY "Public can view grievances without reporter identity" 
ON complaints FOR SELECT 
USING (true);

-- Disallow public access to user contact numbers
CREATE POLICY "Users can only view their own private profile" 
ON profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);
```
* **Triage Authorization:** Only authenticated users with role `WARD_ENGINEER`, `HEALTH_INSPECTOR`, or `TAHSILDAR` can execute `UPDATE` operations on `complaints.status` and insert into `complaint_updates`.

---

## 5. Storage & Image Pipeline

* **Object Store:** S3-compatible cloud storage (e.g. Supabase Storage / Cloudflare R2).
* **Automated Processing Pipeline:**
  1. **Image Sanitization:** Stripping EXIF metadata (camera serials) while extracting verified GPS tags to match reported location.
  2. **Image Compression:** Dynamic WebP conversion to support low-bandwidth 2G/3G connectivity in rural areas.
  3. **Malware / Content Scanning:** Cloud function filtering inappropriate content before public display.

---

## 6. Migration Strategy from Current Prototype

The current frontend is architected using the **Service / Repository Pattern** (`MockCivicRepository` in `src/services/repository.ts`).
When transitioning to production:
1. Replace `MockCivicRepository` with `SupabaseCivicRepository` or `ApiCivicRepository`.
2. Keep component contracts, props, and domain types (`src/types/index.ts`) identical.
3. No UI pages need to be rewritten.
