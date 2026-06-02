# CORDA Democratic AI-Readiness Index — Interactive Dashboard
## Complete Build Specification for Cursor

**Project:** CORDA Democracy Interactive Dashboard  
**Reference design:** Stanford AI Vibrancy Tool (https://hai.stanford.edu/ai-index/global-vibrancy-tool)  
**Data source:** Verified pipeline outputs in `/Final Project/` — all scores are final and must not be altered  
**Target hosting:** Hugging Face Spaces (Static)  
**Last updated:** June 2026

---

## 1. Project Structure

Scaffold the following file tree exactly:

```
corda-dashboard/
├── index.html
├── vite.config.js
├── package.json
├── README.md
├── .gitignore
├── public/
│   └── favicon.ico
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   ├── global.css
    │   └── variables.css
    ├── data/
    │   ├── countries.js          ← full country scores + metadata
    │   ├── indicators.js         ← per-indicator scores for Tables 2–6
    │   ├── drivers.js            ← driver metadata (names, descriptions, indicator lists)
    │   └── methodology.js        ← methodology text content
    └── components/
        ├── Header.jsx
        ├── Hero.jsx
        ├── FilterBar.jsx
        ├── views/
        │   ├── RankingsView.jsx   ← horizontal bar chart
        │   ├── RadarView.jsx      ← country radar / spider chart
        │   ├── ScatterView.jsx    ← two-axis scatter plot
        │   └── MapView.jsx        ← choropleth world map
        ├── CountryCard.jsx        ← tooltip/panel shown on hover or click
        ├── DriverPanel.jsx        ← driver description sidebar
        ├── Methodology.jsx        ← full methodology + methods section
        └── Footer.jsx
```

---

## 2. Design System

### 2.1 Colour Tokens

```css
/* src/styles/variables.css */
:root {
  /* Background */
  --colour-bg:          #F5F0E8;   /* creamy parchment — matches PDF */
  --colour-bg-card:     #EFEAD9;   /* slightly darker for cards/panels */
  --colour-bg-overlay:  #E8E1CE;   /* filter bar and sticky nav background */

  /* Text */
  --colour-text:        #1A1A1A;   /* near-black body text */
  --colour-text-muted:  #5A5448;   /* secondary labels, axis ticks */
  --colour-text-light:  #8C8375;   /* placeholder, disabled state */

  /* Brand / accent */
  --colour-accent:      #2B4C7E;   /* CORDA deep navy — used for selected states, links */
  --colour-accent-2:    #8B6914;   /* warm gold — used for highlights, hover borders */

  /* Driver colours (used consistently across all charts) */
  --colour-d1:          #4E79A7;   /* D1 Economic Inequality — steel blue */
  --colour-d2:          #F28E2B;   /* D2 Information Environment — amber */
  --colour-d3:          #E15759;   /* D3 Elite Defection — brick red */
  --colour-d4:          #76B7B2;   /* D4 State Capacity — teal */
  --colour-d5:          #59A14F;   /* D5 Polarization — green */
  --colour-composite:   #2B4C7E;   /* composite CORDA score — navy */

  /* Regime type colours (used in map and scatter) */
  --colour-liberal:     #2B4C7E;
  --colour-electoral:   #76B7B2;
  --colour-hybrid:      #F28E2B;
  --colour-authoritarian: #E15759;

  /* UI */
  --colour-border:      #D4CAAF;
  --colour-border-strong: #A89E7E;
  --colour-shadow:      rgba(43, 76, 126, 0.08);
}
```

### 2.2 Typography

```css
/* src/styles/global.css */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Source+Serif+4:ital,wght@0,300;0,400;0,600;1,400&family=Source+Sans+3:wght@400;500;600&display=swap');

body {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 16px;
  line-height: 1.6;
  color: var(--colour-text);
  background: var(--colour-bg);
  margin: 0;
}

h1, h2, h3 {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--colour-text);
}

/* Labels, filter buttons, axis ticks — sans-serif only */
.label, .filter-btn, .axis-tick, .badge {
  font-family: 'Source Sans 3', system-ui, sans-serif;
  font-size: 13px;
}
```

### 2.3 Spacing & Layout

- Max content width: `1200px`, centred
- Section padding: `64px 24px` on desktop, `40px 16px` on mobile
- Card border-radius: `6px`
- All borders: `1px solid var(--colour-border)`
- Box shadow on cards: `0 2px 8px var(--colour-shadow)`

---

## 3. Data Layer

### 3.1 `src/data/countries.js`

```js
export const countries = [
  { name: "Denmark",              iso3: "DNK", rank: 1,  corda: 86.2, d1: 89.7, d2: 94.6, d3: 92.1, d4: 84.1, d5: 70.5, region: "Europe",             regime: "Liberal Democracy" },
  { name: "Sweden",               iso3: "SWE", rank: 2,  corda: 81.1, d1: 89.1, d2: 81.3, d3: 92.1, d4: 79.2, d5: 63.5, region: "Europe",             regime: "Liberal Democracy" },
  { name: "Germany",              iso3: "DEU", rank: 3,  corda: 78.8, d1: 89.4, d2: 79.9, d3: 88.5, d4: 80.5, d5: 55.7, region: "Europe",             regime: "Liberal Democracy" },
  { name: "Netherlands",          iso3: "NLD", rank: 4,  corda: 78.3, d1: 85.4, d2: 78.0, d3: 89.2, d4: 80.3, d5: 58.3, region: "Europe",             regime: "Liberal Democracy" },
  { name: "Japan",                iso3: "JPN", rank: 5,  corda: 74.1, d1: 79.1, d2: 69.8, d3: 81.5, d4: 76.4, d5: 63.4, region: "Asia-Pacific",       regime: "Liberal Democracy" },
  { name: "Australia",            iso3: "AUS", rank: 6,  corda: 73.9, d1: 78.4, d2: 75.0, d3: 83.1, d4: 73.0, d5: 60.2, region: "Asia-Pacific",       regime: "Liberal Democracy" },
  { name: "Canada",               iso3: "CAN", rank: 7,  corda: 73.6, d1: 69.1, d2: 76.1, d3: 82.5, d4: 79.2, d5: 61.4, region: "Americas",           regime: "Liberal Democracy" },
  { name: "United Kingdom",       iso3: "GBR", rank: 8,  corda: 73.3, d1: 73.0, d2: 71.3, d3: 85.0, d4: 80.1, d5: 57.0, region: "Europe",             regime: "Liberal Democracy" },
  { name: "New Zealand",          iso3: "NZL", rank: 9,  corda: 71.2, d1: 68.5, d2: 79.1, d3: 80.4, d4: 74.3, d5: 53.7, region: "Asia-Pacific",       regime: "Liberal Democracy" },
  { name: "France",               iso3: "FRA", rank: 10, corda: 70.7, d1: 72.6, d2: 76.0, d3: 78.1, d4: 75.0, d5: 52.0, region: "Europe",             regime: "Liberal Democracy" },
  { name: "Taiwan",               iso3: "TWN", rank: 11, corda: 69.6, d1: 77.0, d2: 67.9, d3: 79.5, d4: 72.1, d5: 51.3, region: "Asia-Pacific",       regime: "Liberal Democracy" },
  { name: "Chile",                iso3: "CHL", rank: 12, corda: 68.7, d1: 60.1, d2: 77.5, d3: 83.0, d4: 65.0, d5: 58.1, region: "Americas",           regime: "Electoral Democracy" },
  { name: "South Korea",          iso3: "KOR", rank: 13, corda: 67.4, d1: 78.8, d2: 74.4, d3: 73.9, d4: 67.5, d5: 42.2, region: "Asia-Pacific",       regime: "Liberal Democracy" },
  { name: "Poland",               iso3: "POL", rank: 14, corda: 64.9, d1: 74.2, d2: 74.4, d3: 79.1, d4: 58.6, d5: 38.2, region: "Europe",             regime: "Electoral Democracy" },
  { name: "United States",        iso3: "USA", rank: 15, corda: 63.8, d1: 62.5, d2: 61.2, d3: 75.5, d4: 73.8, d5: 45.8, region: "Americas",           regime: "Electoral Democracy" },
  { name: "Israel",               iso3: "ISR", rank: 16, corda: 63.3, d1: 65.3, d2: 65.0, d3: 78.3, d4: 60.3, d5: 47.5, region: "Middle East & Africa", regime: "Electoral Democracy" },
  { name: "Singapore",            iso3: "SGP", rank: 17, corda: 60.1, d1: 66.7, d2: 46.6, d3: 63.7, d4: 68.1, d5: 55.1, region: "Asia-Pacific",       regime: "Hybrid" },
  { name: "Brazil",               iso3: "BRA", rank: 18, corda: 58.3, d1: 52.8, d2: 72.2, d3: 67.1, d4: 49.1, d5: 50.3, region: "Americas",           regime: "Electoral Democracy" },
  { name: "Ghana",                iso3: "GHA", rank: 19, corda: 57.2, d1: 43.0, d2: 73.1, d3: 67.4, d4: 47.1, d5: 55.1, region: "Middle East & Africa", regime: "Electoral Democracy" },
  { name: "South Africa",         iso3: "ZAF", rank: 20, corda: 56.7, d1: 48.1, d2: 73.8, d3: 71.3, d4: 45.3, d5: 44.9, region: "Middle East & Africa", regime: "Electoral Democracy" },
  { name: "Indonesia",            iso3: "IDN", rank: 21, corda: 48.7, d1: 30.9, d2: 59.0, d3: 61.6, d4: 37.5, d5: 54.3, region: "Asia-Pacific",       regime: "Electoral Democracy" },
  { name: "India",                iso3: "IND", rank: 22, corda: 46.1, d1: 30.0, d2: 43.1, d3: 63.7, d4: 49.7, d5: 43.9, region: "Asia-Pacific",       regime: "Electoral Democracy" },
  { name: "Mexico",               iso3: "MEX", rank: 23, corda: 45.8, d1: 37.5, d2: 58.5, d3: 61.0, d4: 29.0, d5: 43.0, region: "Americas",           regime: "Hybrid" },
  { name: "Nigeria",              iso3: "NGA", rank: 24, corda: 43.5, d1: 27.0, d2: 65.7, d3: 52.7, d4: 23.5, d5: 48.4, region: "Middle East & Africa", regime: "Hybrid" },
  { name: "United Arab Emirates", iso3: "ARE", rank: 25, corda: 37.1, d1: 41.8, d2: 21.5, d3: 30.9, d4: 40.8, d5: 50.5, region: "Middle East & Africa", regime: "Authoritarian" },
  { name: "Bangladesh",           iso3: "BGD", rank: 26, corda: 34.0, d1: 16.3, d2: 40.3, d3: 42.1, d4: 27.6, d5: 43.7, region: "Asia-Pacific",       regime: "Hybrid" },
  { name: "China",                iso3: "CHN", rank: 27, corda: 28.6, d1: 22.7, d2: 19.0, d3: 24.0, d4: 28.9, d5: 48.4, region: "Asia-Pacific",       regime: "Authoritarian" },
];
```

### 3.2 `src/data/drivers.js`

```js
export const drivers = [
  {
    id: "corda",
    key: "corda",
    label: "CORDA Index",
    shortLabel: "Overall",
    description: "Equally weighted mean of all five driver scores. Higher = more democratic and AI-ready.",
    colour: "var(--colour-composite)",
    nIndicators: 82,
    nAI: 14,
    nNonAI: 68,
  },
  {
    id: "d1",
    key: "d1",
    label: "D1 — Economic Inequality / Relative Deprivation",
    shortLabel: "Economic Inequality",
    description: "Measures labour displacement risk from AI, economic inequality, and distributional capacity of the state. 9 indicators; equal weighting.",
    colour: "var(--colour-d1)",
    nIndicators: 9,
    nAI: 3,
    nNonAI: 6,
    theoryBasis: "Meltzer–Richard; Acemoglu & Robinson (2006); Piketty (2014)",
    aiVector: "Labour displacement, wage polarisation",
  },
  {
    id: "d2",
    key: "d2",
    label: "D2 — Information Environment Shocks",
    shortLabel: "Information Environment",
    description: "Measures exposure to AI-driven disinformation, synthetic media, and algorithmic curation risks against baseline media freedom. 21 indicators; equal weighting.",
    colour: "var(--colour-d2)",
    nIndicators: 21,
    nAI: 3,
    nNonAI: 18,
    theoryBasis: "Prat & Strömberg (2013); Guriev & Treisman (2022)",
    aiVector: "Synthetic media, algorithmic curation, micro-targeting",
  },
  {
    id: "d3",
    key: "d3",
    label: "D3 — Elite Defection / Intra-Elite Conflict",
    shortLabel: "Elite Defection",
    description: "Measures AI-driven elite capital concentration and commercial AI ecosystem risks against electoral competition quality. 21 indicators; equal weighting.",
    colour: "var(--colour-d3)",
    nIndicators: 21,
    nAI: 4,
    nNonAI: 17,
    theoryBasis: "Goldstone (1991); Turchin (2016); Levitsky & Ziblatt (2018)",
    aiVector: "Winner-take-all capital accumulation, elite fragmentation",
  },
  {
    id: "d4",
    key: "d4",
    label: "D4 — State Capacity Erosion",
    shortLabel: "State Capacity",
    description: "Measures AI governance capacity, regulatory frameworks, and rule of law against baseline state quality. 22 indicators; equal weighting.",
    colour: "var(--colour-d4)",
    nIndicators: 22,
    nAI: 6,
    nNonAI: 16,
    theoryBasis: "Besley & Persson (2011); Fukuyama (2011)",
    aiVector: "AI outpacing regulatory capacity; regulatory arbitrage",
  },
  {
    id: "d5",
    key: "d5",
    label: "D5 — Polarization / Affective Tribalism",
    shortLabel: "Polarization",
    description: "Measures political polarisation, political violence, civil society strength, and online hate speech. 9 indicators; equal weighting. Note: Cronbach α = 0.31 — indicators measure distinct sub-constructs.",
    colour: "var(--colour-d5)",
    nIndicators: 9,
    nAI: 0,
    nNonAI: 9,
    theoryBasis: "Iyengar et al. (2019); Abramowitz (2018); V-Dem",
    aiVector: "Recommender-system amplification; filter bubbles",
  },
];
```

---

## 4. Component Specifications

### 4.1 `Header.jsx`

- Sticky top bar, `background: var(--colour-bg-overlay)`, `border-bottom: 1px solid var(--colour-border)`
- Left: "CORDA" wordmark in Playfair Display 20px bold + "Democratic AI-Readiness Index" subtitle in Source Serif 4 13px muted
- Right: navigation links: `Rankings | Radar | Scatter | Map | Methodology` — smooth-scroll anchors
- On mobile: hamburger collapse

### 4.2 `Hero.jsx`

- Full-width section, `padding: 80px 24px 60px`
- Title: "CORDA Democratic AI-Readiness Index 2025" — Playfair Display 48px, centred
- Subtitle: "Measuring AI-governance readiness and democratic backsliding risk across 27 countries" — Source Serif 4 20px, muted, centred
- Below title: four stat chips in a row:
  - "27 Countries" / "82 Indicators" / "5 Drivers" / "2023–2025 Data"
  - Style: small bordered pill, `border: 1px solid var(--colour-border-strong)`, `background: var(--colour-bg-card)`, Source Sans 3 13px
- Below chips: one-sentence description of the index drawn from `methodology.js`

### 4.3 `FilterBar.jsx`

Sticky bar immediately below Hero. Contains all global filters that control **all four views simultaneously**.

```
┌─────────────────────────────────────────────────────────────────┐
│  SCORE      [Composite ▾]    REGION  [All ▾]   REGIME  [All ▾] │
│                                                                 │
│  VIEW       [Rankings] [Radar] [Scatter] [Map]   ← tab switcher│
└─────────────────────────────────────────────────────────────────┘
```

**Filter state shape (React `useState`):**
```js
{
  activeView: "rankings",          // "rankings" | "radar" | "scatter" | "map"
  scoreKey: "corda",               // "corda" | "d1" | "d2" | "d3" | "d4" | "d5"
  regions: [],                     // [] means "all"; array of selected region strings
  regimes: [],                     // [] means "all"
  highlightCountries: [],          // country names explicitly selected by user
  scatterX: "d2",                  // for scatter only
  scatterY: "d4",                  // for scatter only
  colorBy: "regime",               // "regime" | "region" | "score"
}
```

**Score selector:** Dropdown with options: Composite CORDA Score, D1 Economic Inequality, D2 Information Environment, D3 Elite Defection, D4 State Capacity, D5 Polarization. Selecting a driver changes bar colours, map shading, and radar highlight.

**Region filter:** Multi-select pill buttons: All | Europe | Asia-Pacific | Americas | Middle East & Africa. Selecting a region dims non-selected countries in all views (does not remove them).

**View tabs:** Four pill buttons that switch the active visualisation panel below.

### 4.4 `RankingsView.jsx` — Horizontal Bar Chart

**Library:** Recharts `BarChart` with `layout="vertical"`

**Behaviour:**
- X-axis: 0–100 score
- Y-axis: country names, sorted by `scoreKey` descending
- Each bar shows the selected `scoreKey` score, coloured by the driver colour token
- When `scoreKey === "corda"`: show a stacked bar breakdown — each segment is one driver (D1–D5), each with its driver colour. Total bar width = composite score.
- When `scoreKey === "d1"` through `"d5"`: show a single solid bar in that driver's colour.
- Non-selected regions: bars rendered at 30% opacity
- Highlighted countries: bars outlined with `2px solid var(--colour-accent-2)`

**On hover:** Show `CountryCard` tooltip with full 5-driver breakdown

**On click:** Persist `CountryCard` as a side panel until dismissed

**Country labels:** Country name left-aligned; score value right-aligned at bar end in Source Sans 3 12px bold

### 4.5 `RadarView.jsx` — Spider / Radar Chart

**Library:** Recharts `RadarChart`

**Layout:** 2-column grid of radar charts — one per selected/highlighted country, or a single comparison overlay

**Default state (no country selected):**
- Show one large radar for the global median country (Israel, rank 16) and overlaid with Denmark (rank 1) and China (rank 27) as reference lines — three overlaid radars in different opacities

**Country selected state:**
- Show selected country's radar (filled, driver colours) with a light grey reference polygon for the global mean

**Five axes:** D1 / D2 / D3 / D4 / D5 — label in driver `shortLabel`

**Axis range:** 0–100

**Note displayed under each radar:** New Zealand sensitivity note: "NZ ranks 9th on linear aggregation; shifts to ~19th under geometric mean due to low D5 score (53.7). See Methodology."

### 4.6 `ScatterView.jsx` — Two-Axis Scatter Plot

**Library:** Recharts `ScatterChart`

**Controls (inside the view, not FilterBar):**
- X-axis selector: dropdown from all six score options
- Y-axis selector: dropdown from all six score options
- Colour-by: "Regime type" | "Region" | "Score gradient"

**Default:** X = D2 (Information Environment), Y = D4 (State Capacity)

**Each point:**
- Circle, radius 8px
- Colour from regime type colour tokens (or region colours if colorBy = "region")
- Country ISO3 label on hover; always-visible for highlighted countries

**Reference lines:**
- Vertical dashed line at X = 50 (midpoint)
- Horizontal dashed line at Y = 50
- These divide the chart into four quadrants with light grey labels: "High Info. Env. / High State Cap." etc.

**On hover:** `CountryCard` tooltip

**On click:** Pin `CountryCard` panel

### 4.7 `MapView.jsx` — Choropleth World Map

**Library:** React-Simple-Maps (`ComposableMap`, `Geographies`, `Geography`)

**GeoJSON:** Use `https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json`

**Country matching:** Match GeoJSON `properties.name` or ISO numeric to CORDA `iso3` codes

**Colour scale:** Linear interpolation from `#F5F0E8` (cream, score=0) to `var(--colour-composite)` (navy, score=100) for the selected `scoreKey`. Non-CORDA countries: `#E0D9C8` (light grey).

**Projections:** `geoNaturalEarth1`

**On hover:** Country name + score tooltip

**On click:** Highlight country; show `CountryCard` panel

**Legend:** Horizontal gradient bar 0–100 beneath the map; 5 labelled tick marks (0, 25, 50, 75, 100)

### 4.8 `CountryCard.jsx`

Panel shown on hover (as tooltip) or click (as persistent side panel).

```
┌──────────────────────────────┐
│  🇩🇰  Denmark          Rank 1 │
│  Liberal Democracy · Europe  │
│                              │
│  CORDA Score      86.2       │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░       │
│                              │
│  D1 Economic       89.7      │
│  ████████████████░░░░        │
│  D2 Information    94.6      │
│  █████████████████░░░░       │
│  D3 Elite          92.1      │
│  ████████████████░░░░        │
│  D4 State          84.1      │
│  ████████████████░░░░        │
│  D5 Polarization   70.5      │
│  ██████████████░░░░          │
│                              │
│  [View full profile →]       │
└──────────────────────────────┘
```

**Each driver row:** small horizontal bar, coloured with driver colour token, with score value right-aligned.

**"View full profile →" link:** Scrolls to the rankings table and highlights the country row.

### 4.9 `Methodology.jsx`

Full-width section with `id="methodology"` for anchor navigation. Two sub-sections rendered as collapsible accordions.

#### Section A — Methodology

Render the following content verbatim (from verified `METHODOLOGY.md`):

**Theoretical Framework:**
> The CORDA index is organised around five theoretical drivers of democratic backsliding, each operationalised with both AI-specific and non-AI background indicators. The AI-specific indicators capture how AI amplifies the underlying driver; the non-AI indicators establish the baseline democratic health context in which amplification occurs.

Display the five-driver table:

| Code | Driver | Theoretical Basis | AI Amplification Vector |
|------|--------|-------------------|------------------------|
| D1 | Economic Inequality / Relative Deprivation | Meltzer–Richard; Acemoglu & Robinson (2006); Piketty (2014) | Labour displacement, wage polarisation |
| D2 | Information Environment Shocks | Prat & Strömberg (2013); Guriev & Treisman (2022) | Synthetic media, algorithmic curation, micro-targeting |
| D3 | Elite Defection / Intra-Elite Conflict | Goldstone (1991); Turchin (2016); Levitsky & Ziblatt (2018) | Winner-take-all capital accumulation, elite fragmentation |
| D4 | State Capacity Erosion | Besley & Persson (2011); Fukuyama (2011) | AI outpacing regulatory capacity; regulatory arbitrage |
| D5 | Polarization / Affective Tribalism | Iyengar et al. (2019); Abramowitz (2018); V-Dem | Recommender-system amplification; filter bubbles |

**Eight-Step Pipeline (accordion items):**
1. Data Audit and Missingness Classification — 86.2% observed; 441 MNAR cells; 81 MAR cells (WB GovTech)
2. Indicator Eligibility — 20 AI + 73 non-AI indicators composite-eligible (≥19/27 countries)
3. Data Imputation — Linear interpolation for 81 WB GovTech temporal gaps only; no imputation for MNAR
4. Min-Max Normalisation — Global min-max to 0–100; 7 indicators direction-reversed
5. Internal Consistency — Cronbach α: D1=0.963, D2=0.980, D3=0.920, D4=0.957, D5=0.309
6. Weighting — Equal weighting within all five drivers (JRC 2005 primary specification)
7. Composite Construction — Linear arithmetic mean of five equal-weight driver scores
8. Sensitivity Analysis — Kendall τ ≥ 0.97 across all specifications except geometric aggregation (τ=0.78, NZ shifts 10 ranks)

**Data sources table:**

| Source | Indicators | Year Range | Countries |
|--------|-----------|------------|-----------|
| V-Dem / Digital Society Project | 25 | 2000–2025 | 27/27 |
| Freedom House FIW | 10 | 2012–2024 | 27/27 |
| EIU Democracy Index | 4 | 2006–2024 | 27/27 |
| IDEA GSoD | 7 | 2000–2024 | 27/27 |
| Tortoise Global AI Index | 4 | 2024 | 27/27 |
| GIRAI (Global Index on Responsible AI) | 5 | 2024 | 23/27 |
| IMF AI Preparedness Index | 1 | 2023 | 27/27 |
| World Bank GovTech GTEI | 1 | 2020–2025 | 27/27 |
| CAIDP AI & Democratic Values Index | 1 | 2023–2026 | 27/27 |
| Ipsos AI Monitor | 2 | 2023–2025 | 20/27 |
| CIVICUS Monitor | 1 | 2018–2025 | 27/27 |
| Transparency International CPI | 1 | 2012–2024 | 27/27 |
| RSF Press Freedom Index | 1 | 2013–2021 | 27/27 |
| WJP Rule of Law Index | 3 | 2012–2021 | 25/27 |
| Stanford AI Index | 2 | 2023–2025 | 23/27 |

**Data limitations note (display as a styled callout box):**
> Three data limitations apply to this edition. (1) RSF Press Freedom and all WJP Rule of Law indicators use 2021 data — the most recent edition available in the dataset. (2) UAE's score on V-Dem Opposition Parties Autonomy (v2psoppaut) uses 2019 data; V-Dem does not score UAE on this indicator after 2019 due to the absence of multiparty elections. (3) Bangladesh's Legislative Constraints indicator (legis_constr_vdem) uses 2000 data due to an extraction gap in the current dataset; this affects Bangladesh's D4 driver score.

#### Section B — Analytical Methods

Render as five collapsible accordion items:

1. **Method 1 — Panel Regression / Two-Way Fixed Effects** — Yᵢₜ = αᵢ + γₜ + β × AI_Exposureᵢ + εᵢₜ. Tests whether higher AI exposure scores predict democratic health deterioration. Software: R (`plm`) or Python (`linearmodels`).

2. **Method 2 — Latent Growth Curve Modelling** — Estimates each country's democratic health trajectory intercept (level in 2000) and slope (rate of change 2000–2025) as random effects, then regresses these on AI driver scores. Software: R (`lavaan`) or Python (`semopy`).

3. **Method 3 — Difference-in-Differences** — Yᵢₜ = α + β₁×Postₜ + β₂×HighExposureᵢ + β₃×(Postₜ × HighExposureᵢ) + εᵢₜ. Post period: 2023–2025. Treatment: above-median AI Exposure score.

4. **Method 4 — Scenario-Based Conditional Projection (2030)** — Three scenarios: Low (AI exposure frozen at 2025), Medium (+10%/year), High (+20%/year). Results shown as shaded confidence bands, not point forecasts.

5. **Method 5 — Synthetic Control / K-Nearest Neighbour Matching** — Used for case validation of known backsliders (Hungary, Turkey, Brazil 2019–2022). Research paper only; not in dashboard.

---

## 5. App State and Routing

Use React `useState` and `useRef` only — no external state library needed. Single-page app with anchor-based navigation.

```jsx
// App.jsx — top-level state
const [filters, setFilters] = useState({
  activeView: "rankings",
  scoreKey: "corda",
  regions: [],
  regimes: [],
  highlightCountries: [],
  scatterX: "d2",
  scatterY: "d4",
  colorBy: "regime",
});

const [selectedCountry, setSelectedCountry] = useState(null);
const [pinnedCountry, setPinnedCountry] = useState(null);
```

Pass `filters`, `setFilters`, `selectedCountry`, `setSelectedCountry`, `pinnedCountry`, `setPinnedCountry` down as props. No prop drilling more than two levels deep.

---

## 6. Responsive Breakpoints

```css
/* Desktop: ≥ 1024px — default layout */
/* Tablet: 640–1023px */
@media (max-width: 1023px) {
  .viz-grid { grid-template-columns: 1fr; }
  .filter-bar { flex-wrap: wrap; gap: 8px; }
}
/* Mobile: < 640px */
@media (max-width: 639px) {
  h1 { font-size: 32px; }
  .stats-chips { flex-wrap: wrap; }
  .country-card { width: 100%; position: fixed; bottom: 0; }
}
```

---

## 7. Package Configuration

### `package.json`

```json
{
  "name": "corda-dashboard",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "recharts": "^2.12.7",
    "react-simple-maps": "^3.0.0",
    "d3-scale": "^4.0.2",
    "d3-interpolate": "^3.0.1"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^5.4.0"
  }
}
```

### `vite.config.js`

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',   // required for HF Spaces static deployment
  build: {
    outDir: 'dist',
  },
});
```

---

## 8. Hugging Face Spaces Deployment

### Step 1 — Create HF Space

1. Go to https://huggingface.co/new-space
2. Space name: `corda-democracy` (or preferred slug)
3. **SDK: Static** — do not select Gradio or Streamlit
4. Visibility: Public
5. Create space

### Step 2 — Configure GitHub sync

In the HF Space settings, link your GitHub repository. Every push to `main` will redeploy automatically.

Alternatively, add this to your GitHub Actions (`.github/workflows/deploy.yml`):

```yaml
name: Deploy to HF Spaces
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: npm run build
      - name: Push dist to HF Space
        env:
          HF_TOKEN: ${{ secrets.HF_TOKEN }}
        run: |
          cd dist
          git init
          git config user.email "ci@corda.demo"
          git config user.name "CORDA CI"
          git remote add space https://huggingface.co/spaces/YOUR_HF_USERNAME/corda-democracy
          git add .
          git commit -m "Deploy from GitHub"
          git push --force https://YOUR_HF_USERNAME:$HF_TOKEN@huggingface.co/spaces/YOUR_HF_USERNAME/corda-democracy main
```

Replace `YOUR_HF_USERNAME` with your Hugging Face username. Store your HF write token as a GitHub secret named `HF_TOKEN`.

### Step 3 — Custom domain (optional)

HF Spaces provides a free URL: `https://YOUR_HF_USERNAME-corda-democracy.hf.space`

For a custom domain: point a CNAME record to `YOUR_HF_USERNAME-corda-democracy.hf.space` via Cloudflare (free tier). Then set the custom domain in HF Space settings.

---

## 9. Accessibility & SEO

- All SVG charts must have `role="img"` and `aria-label` with a plain-text description
- Interactive elements must have `aria-label` and keyboard navigation (`tabIndex`, `onKeyDown`)
- `<title>` tag: "CORDA Democratic AI-Readiness Index 2025"
- `<meta name="description">`: "Interactive dashboard measuring AI-governance readiness and democratic backsliding risk across 27 countries. CORDA Democracy Fellows 2025."
- `<meta property="og:image">`: generate a static screenshot for social sharing

---

## 10. Important Implementation Constraints

1. **Do not alter any score values.** All numbers in `countries.js` are pipeline-verified. Do not round, truncate, or recalculate.
2. **New Zealand sensitivity note** must appear next to NZ's radar chart (see §4.5).
3. **Bangladesh D4 limitation note** must appear in the data limitations callout in Methodology (see §4.9).
4. **UAE v2psoppaut note** must appear in the Methodology limitations callout.
5. **RSF and WJP 2021 data** must be disclosed in the Methodology limitations callout.
6. The **five driver colours** (D1–D5) must be used consistently across all four views — same colour = same driver everywhere.
7. The **stacked bar** in RankingsView when `scoreKey === "corda"` must stack D1+D2+D3+D4+D5 as five segments whose sum equals the composite score. Each segment width = (driver_score / 5) because all five drivers are equally weighted. Verify: sum of five (driver_score / 5) values = composite score for every country.
8. The app must work entirely client-side with no API calls. All data is in `src/data/`.

---

## 11. Cursor Prompt to Initialise the Project

After creating a new empty folder named `corda-dashboard`, open it in Cursor and paste this prompt:

> Build a complete React + Vite interactive dashboard following the specification in `CORDA_DASHBOARD_SPEC.md` exactly. Start by scaffolding the full file structure in Section 1, then install packages from Section 7, then populate all data files from Section 3, then build components in this order: global.css + variables.css → Header → FilterBar → RankingsView → CountryCard → RadarView → ScatterView → MapView → Methodology → Footer → App.jsx. Do not deviate from design tokens in Section 2, score values in Section 3, or the deployment config in Section 7. After building, run `npm run dev` and confirm the app loads with all 27 countries rendering in the default Rankings view.

---

*End of CORDA Dashboard Specification v1.0*  
*Prepared by CORDA Democracy Fellows — Coleman Snell, Jason Hung, Casimir Wypyski, Eilaf Mohamed*
