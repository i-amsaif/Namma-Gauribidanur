# Namma Gauribidanur — Civic & Community Web Prototype

> **"Your Town. Your Voice. Our Community."**
> **"ನಿಮ್ಮ ಊರು. ನಿಮ್ಮ ಧ್ವನಿ. ನಮ್ಮ ಸಮುದಾಯ."**

**Namma Gauribidanur** is an independent, mobile-first civic technology web prototype designed for Gauribidanur town and taluk in Chikkaballapur district, Karnataka, India.

It connects local citizens with public service visibility, an interactive issue map, a verified officials directory, researched local news, cultural events, and community noticeboards.

---

## 🏛️ Platform Status & Non-Affiliation Disclaimer
* **Independent Community Initiative:** Namma Gauribidanur is an independent civic prototype developed for demonstration and user experience testing.
* **Non-Government Status:** It is not an official government portal and does not hold official authorization or endorsement from the Gauribidanur City Municipal Council (CMC), Chikkaballapur District Administration, or the Government of Karnataka.
* **Demonstration Data:** Complaint workflows, status updates, and triage actions are simulated locally in the browser to demonstrate the future product architecture.

---

## 🚀 Key Features

1. **Android-First Responsive Design:** Optimized for 360–430px mobile viewports with fixed bottom navigation, safe-area inset handling, and responsive desktop layout.
2. **Interactive Civic Issue Map:**
   * Centered on Gauribidanur (`13.6111°N, 77.5170°E`).
   * Visual distinction between **Gauribidanur Town (CMC 23 Wards Core)** and the wider **Taluk Administrative Boundary**.
   * Status-colored markers with filtering by status and category.
   * Spatial bounding box enforcement (`77.36°E` to `77.68°E`, `13.44°N` to `13.82°N`).
3. **Multi-Step Complaint Reporting:**
   * Step 1: Category selection (Potholes, sanitation, streetlights, drainage, water supply).
   * Step 2: Description & title validation.
   * Step 3: Photo upload with camera capture support and in-browser preview.
   * Step 4: Interactive location pin dropper with GPS simulation and zone validation.
   * Step 5: Summary review with privacy notice.
   * Submits to local storage with tracked demo tokens (e.g. `GBN-DEMO-000101`).
4. **Public Officials & Department Directory:**
   * Categorized by departments (CMC, Taluk Office, Taluk Panchayat, BESCOM, Police, Health).
   * Verified office helplines and official email contacts.
   * Smart Department Routing Helper to guide residents to the responsible body.
5. **Researched Local News Feed:**
   * Real, sourced news records from *The Hindu*, *Deccan Herald*, and *Prajavani*.
   * Preserved original publication dates, URLs, and summaries.
   * Unsplash free commercial license illustrative images with full attribution.
   * Stored in code; zero runtime news API dependencies.
6. **Community Life & Commerce:**
   * Fairs and events (Vidurashwatha Heritage Walk, Dr. H.N. Science Day in Hosur) with interactive RSVP.
   * Moderated town noticeboard with submission flow.
   * Local business directory with callback inquiry requests.
   * Local video journalists and creator discovery.
7. **Simulated Administrator Console (`/admin`):**
   * Review complaints, modify workflow status (`SUBMITTED` &rarr; `IN_PROGRESS` &rarr; `RESOLVED`), and attach resolution remarks.
   * Real-time sync across public detail pages and map markers.
8. **Bilingual Localization (English & Kannada):**
   * Dynamic toggle (`en` / `kn`) with persistent language selection across all screens.

---

## 🛠️ Technology Stack

* **Framework:** Next.js 14+ (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Custom civic palette: deep forest green, warm off-white, restrained amber)
* **Icons:** Lucide React
* **Mapping:** Leaflet with custom dynamic client wrapper (0 SSR hydration bugs)
* **State & Persistence:** React Context + `MockCivicRepository` with browser `localStorage`
* **Fonts:** Inter & Noto Sans Kannada

---

## 📂 Project Architecture

```
namma-gauribidanur/
├── docs/
│   ├── RESEARCH_NOTES.md      # Field research, GIS provenance, and citations
│   ├── DATA_DICTIONARY.md     # Schemas, field constraints, and status models
│   └── BACKEND_PLAN.md        # PostGIS schema, RBAC, and Supabase roadmap
├── src/
│   ├── app/                   # App Router pages and layouts
│   │   ├── page.tsx           # Mobile-first Homepage
│   │   ├── map/               # Interactive Issue Map
│   │   ├── report/            # Multi-step complaint reporting
│   │   ├── issues/            # Complaint registry & detail
│   │   ├── directory/         # Officials directory & helper
│   │   ├── departments/       # Department breakdown
│   │   ├── news/              # Sourced local news feed
│   │   ├── events/            # Community events & RSVP
│   │   ├── community/         # Moderated noticeboard
│   │   ├── businesses/        # Local business directory
│   │   ├── influencers/       # Local creator discovery
│   │   ├── profile/           # Citizen profile & language preferences
│   │   ├── about/             # Transparency & governance
│   │   └── admin/             # Simulated Admin Triage console
│   ├── components/            # Reusable UI, Layout, Map, Complaint cards
│   ├── context/               # Centralized AppContext provider
│   ├── data/                  # Normalized seed datasets (boundaries, news, etc.)
│   ├── lib/                   # i18n translation dictionary
│   ├── services/              # MockCivicRepository (Service layer)
│   └── types/                 # Domain interfaces and enums
└── package.json
```

---

## 💻 Installation & Development

### Prerequisites
* Node.js version 18.18 or higher (Node 20+ recommended)
* npm version 9+

### 1. Clone or Open Workspace
```bash
cd "c:\Users\Lenovo\Documents\NAMMA GAURIBIDANUR"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your mobile browser or desktop browser.

### 4. Build for Production
```bash
npm run build
npm run start
```

---

## 🗺️ Map Data Source & Geographic Provenance
* Center coordinates: `13.6111°N, 77.5170°E`
* Map tiles: OpenStreetMap contributors under Open Database License (ODbL).
* Administrative boundaries: Gauribidanur Town CMC core polygon and Taluk extent are illustrative geometric models configured with spatial bounding constraints (`77.360°E` to `77.680°E`). Official Survey of India / K-GIS cadastral data integration is planned for the production phase.

---

## 🔒 Privacy & Data Protection
* Personal reporter phone numbers and personal names are never displayed publicly.
* Photographs are handled locally in-browser during the prototype phase; no unencrypted external cloud uploads are executed.
* The system is designed to adhere to the principles of India's **Digital Personal Data Protection Act (DPDP 2023)**.
