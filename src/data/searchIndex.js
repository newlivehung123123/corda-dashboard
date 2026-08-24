// Flat, searchable index over every piece of content on the site.
// Each entry resolves to a section anchor so a hit can scroll the reader
// straight to the passage it came from.

import { countries } from './countries.js';
import { drivers } from './drivers.js';
import { indicatorGroups } from './indicators.js';
import {
  indexSummary,
  theoreticalFramework,
  driverTable,
  pipelineSteps,
  dataSources,
  dataLimitations,
  analyticalMethods,
} from './methodology.js';
import { previewBlocks, fullBlocks } from './methodologyImplementation.js';

export const sections = [
  { id: 'data-ranking',              label: 'Data & Ranking' },
  { id: 'mission-vision',            label: 'Mission & Vision' },
  { id: 'resource-links',            label: 'Resources' },
  { id: 'methodology-implementation', label: 'Methodology' },
  { id: 'regime-classification',     label: 'Regime' },
  { id: 'analytical-methods',        label: 'Analytical Methods' },
];

const trim = (s, n = 190) => {
  const t = String(s).replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n).replace(/\s\S*$/, '') + '…' : t;
};

// Navigational entries, so a reader who types a section name gets taken there
// rather than to whichever paragraph happens to mention the word.
const sectionEntries = [
  {
    kind: 'Section',
    title: 'Data & Ranking',
    body: 'Country rankings, two-axis scatter plot, world map choropleth, national profiles, score selector and filters by region and regime type.',
    target: 'data-ranking',
  },
  {
    kind: 'Section',
    title: 'Mission & Vision',
    body: 'Why the index exists, what existing democracy indices miss about AI, the objective of the project and acknowledgements.',
    target: 'mission-vision',
  },
  {
    kind: 'Section',
    title: 'Downloads',
    body: '2025 Edition Report PDF and the Public Access Data archive of indicator-level scores, driver aggregates and the codebook.',
    target: 'resource-links',
  },
  {
    kind: 'Section',
    title: 'Methodology & Implementation',
    body: 'Theoretical framework, indicator selection, data sources, imputation of missing data, normalisation, weighting, aggregation and sensitivity testing.',
    target: 'methodology-implementation',
  },
  {
    kind: 'Section',
    title: 'Regime Type Classification',
    body: 'Liberal democracy, electoral democracy, hybrid and authoritarian regime categories, following the V-Dem Regimes of the World taxonomy, plus known data limitations.',
    target: 'regime-classification',
  },
  {
    kind: 'Section',
    title: 'Analytical Methods',
    body: 'The five quantitative methods specified for the research paper, including regression, trend analysis, structural breaks, projection and case studies.',
    target: 'analytical-methods',
  },
];

function buildEntries() {
  const out = [];
  const push = (e) => out.push({ ...e, haystack: `${e.title} ${e.body}`.toLowerCase() });

  sectionEntries.forEach(push);

  // Countries — a hit jumps to the rankings and highlights the country
  countries.forEach((c) => {
    push({
      kind: 'Country',
      title: c.name,
      body: `Rank ${c.rank} of 27. CORDA score ${c.corda.toFixed(1)}. ${c.region}. ${c.regime}. ${c.iso3}`,
      target: 'data-ranking',
      country: c.name,
    });
  });

  // Drivers
  drivers.forEach((d) => {
    push({
      kind: 'Driver',
      title: d.label,
      body: d.description || '',
      target: 'data-ranking',
    });
  });

  // Indicators
  indicatorGroups.forEach((g) => {
    (g.indicators || []).forEach((ind) => {
      push({
        kind: 'Indicator',
        title: ind.label,
        body: `${g.label}. Source: ${ind.source}. ${ind.type === 'AI' ? 'AI-specific indicator' : 'Democratic health indicator'}.`,
        target: 'methodology-implementation',
      });
    });
  });

  // Index overview text
  push({ kind: 'Overview', title: 'About the CORDA Index', body: indexSummary, target: 'mission-vision' });
  push({ kind: 'Overview', title: 'Theoretical framework', body: theoreticalFramework, target: 'methodology-implementation' });

  // Theoretical drivers table
  driverTable.forEach((row) => {
    const cells = Array.isArray(row) ? row : Object.values(row);
    push({
      kind: 'Framework',
      title: String(cells[1] ?? cells[0]),
      body: cells.slice(2).join(' '),
      target: 'methodology-implementation',
    });
  });

  // Pipeline steps
  pipelineSteps.forEach((s) => {
    push({
      kind: 'Pipeline',
      title: s.title,
      body: (s.bullets || []).join(' '),
      target: 'methodology-implementation',
    });
  });

  // Data sources
  dataSources.forEach((s) => {
    push({
      kind: 'Data source',
      title: s.source,
      body: `${s.indicators} indicators. ${s.yearRange}. Coverage ${s.countries}.`,
      target: 'methodology-implementation',
    });
  });

  // Known limitations
  dataLimitations.forEach((t, i) => {
    push({ kind: 'Limitation', title: `Known limitation ${i + 1}`, body: t, target: 'regime-classification' });
  });

  // Analytical methods
  analyticalMethods.forEach((m) => {
    push({
      kind: 'Analytical method',
      title: m.title,
      body: (m.bullets || []).join(' '),
      target: 'analytical-methods',
    });
  });

  // Methodology & implementation prose. Paragraphs are pooled under their
  // heading so one heading yields one result rather than a run of near-duplicates.
  let heading = 'Methodology & Implementation';
  let prose = [];
  const flushProse = () => {
    if (prose.length) {
      push({ kind: 'Methodology', title: heading, body: prose.join(' '), target: 'methodology-implementation' });
      prose = [];
    }
  };

  [...previewBlocks, ...fullBlocks].forEach((b) => {
    if (b.type === 'h2' || b.type === 'h3') {
      flushProse();
      heading = b.text;
      return;
    }
    if (b.type === 'p' || b.type === 'note') {
      if (b.text) prose.push(b.text);
    }
    if (b.type === 'table') {
      const rows = (b.rows || []).map((r) => r.join(' ')).join(' ');
      push({ kind: 'Table', title: b.caption || heading, body: `${(b.head || []).join(' ')} ${rows}`, target: 'methodology-implementation' });
    }
    if (b.type === 'image' && b.caption) {
      push({ kind: 'Figure', title: b.caption, body: heading, target: 'methodology-implementation' });
    }
  });
  flushProse();

  return out;
}

export const searchEntries = buildEntries();

export function searchSite(query, limit = 24) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const terms = q.split(/\s+/).filter(Boolean);

  const scored = [];
  for (const e of searchEntries) {
    let score = 0;
    let matchedAll = true;

    for (const t of terms) {
      const inTitle = e.title.toLowerCase().indexOf(t);
      const inBody = e.haystack.indexOf(t);
      if (inTitle === -1 && inBody === -1) { matchedAll = false; break; }
      if (inTitle === 0) score += 12;
      else if (inTitle > 0) score += 7;
      else score += 2;
    }
    if (!matchedAll) continue;

    // Section names, countries and drivers are the most common intent
    if (e.kind === 'Section') score += 6;
    if (e.kind === 'Country') score += 3;
    if (e.kind === 'Driver') score += 2;
    scored.push({ ...e, score, snippet: trim(e.body) });
  }

  scored.sort((a, b) => b.score - a.score || a.title.length - b.title.length);
  return scored.slice(0, limit);
}
