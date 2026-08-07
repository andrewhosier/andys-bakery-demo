# Andy's Bakery — Yext Pages Site

A production-ready Yext Pages location page for Andy's Bakery, Kingston NY.
Built with the Yext Pages React framework (TypeScript + Tailwind).

## Pages included
- **Location page** — pulls live data from the Knowledge Graph at build time
  - Business info, hours, contact
  - Social posts (from `/posts` API)
  - Reviews with responses (from `/reviews` API)
  - Schema.org structured data (LocalBusiness, AggregateRating, OpeningHoursSpecification)
  - Core Web Vitals optimized

## Setup

### 1. Install the Yext CLI
```bash
npm install -g @yext/cli
yext login
```

### 2. Install dependencies
```bash
npm install
```

### 3. Initialize the site
```bash
yext init
```
This will prompt you to choose your account (5554655) and create a site.
After init, replace `${{STREAM_ID}}` in `src/templates/location.tsx` with the
stream ID Yext generates.

### 4. Local development
```bash
npm run dev
# Opens at http://localhost:5173
```

### 5. Deploy to production
```bash
npm run build
yext sites push
```

## Environment variables
Copy `.env` and fill in your values (already pre-filled for Andy's Bakery):
```
YEXT_PUBLIC_API_KEY=<your-api-key>
YEXT_PUBLIC_ACCOUNT_ID=<your-account-id>
YEXT_PUBLIC_API_VERSION=20250514
```

## Project structure
```
src/
  templates/
    location.tsx          ← main page template
  components/
    Header.tsx            ← hero with name, address, action buttons
    InfoSection.tsx       ← description, contact, hours
    PostsSection.tsx      ← latest social posts grid
    ReviewsSection.tsx    ← star summary + review list
    HoursTable.tsx        ← weekly hours with today highlighted
    StarRating.tsx        ← reusable star rating
  types/
    location.ts           ← TypeScript interfaces
  styles/
    index.css             ← Tailwind + custom CSS
```
