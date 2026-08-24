import React from 'react';

const tabs = [
  {
    label: '2025 Edition Report',
    blurb: 'The full written report, with the complete ranking tables and country commentary.',
    href: './CORDA_2025_Global_Rankings.pdf',
    download: false,
    glyph: '↗',
    meta: 'PDF, opens in a new tab',
  },
  {
    label: 'Public Access Data',
    blurb: 'Indicator-level scores, driver aggregates and the codebook, released for reuse.',
    href: './CORDA_Public_Access_Data.zip',
    download: true,
    glyph: '↓',
    meta: 'ZIP archive, downloads',
  },
];

export default function ResourceLinks() {
  return (
    <section
      id="resource-links"
      style={{
        background: 'linear-gradient(115deg, var(--mango-mid) 0%, var(--mango) 46%, var(--mango-deep) 100%)',
        padding: 'clamp(52px, 6vw, 84px) 24px',
      }}
    >
      <div style={{ maxWidth: 'var(--shell)', margin: '0 auto' }}>
        <p className="eyebrow" style={{ color: '#6E3606' }}>Downloads</p>
        <h2 style={{ color: 'var(--ink)', margin: '0 0 34px', maxWidth: 'var(--measure)' }}>
          Take the 2025 edition with you
        </h2>

        <div className="res-grid">
          {tabs.map((tab) => (
            <a
              key={tab.label}
              href={tab.href}
              target={tab.download ? undefined : '_blank'}
              rel="noopener noreferrer"
              download={tab.download ? '' : undefined}
              className="res-card"
            >
              <span className="res-head">
                <span className="res-label">{tab.label}</span>
                <span className="res-glyph" aria-hidden="true">{tab.glyph}</span>
              </span>
              <span className="res-blurb">{tab.blurb}</span>
              <span className="res-meta">{tab.meta}</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .res-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .res-card {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 30px 30px 26px;
          background: rgba(255,255,255,0.82);
          border: 1px solid rgba(34,37,44,0.12);
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
        }
        .res-card:hover,
        .res-card:focus-visible {
          background: var(--ink);
          border-color: var(--ink);
          transform: translateY(-3px);
          text-decoration: none;
        }
        .res-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
        }
        .res-label {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: clamp(21px, 2vw, 28px);
          font-weight: 800;
          letter-spacing: -0.018em;
          line-height: 1.16;
          color: var(--ink);
          transition: color 0.2s ease;
        }
        .res-glyph {
          font-size: 26px;
          font-weight: 700;
          color: var(--mango-ink);
          line-height: 1;
          transition: color 0.2s ease, transform 0.2s ease;
        }
        .res-card:hover .res-glyph { transform: translate(2px, -2px); }
        .res-blurb {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(34,37,44,0.74);
          transition: color 0.2s ease;
        }
        .res-meta {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(34,37,44,0.55);
          transition: color 0.2s ease;
        }
        .res-card:hover .res-label,
        .res-card:focus-visible .res-label { color: #fff; }
        .res-card:hover .res-blurb,
        .res-card:focus-visible .res-blurb { color: rgba(255,255,255,0.80); }
        .res-card:hover .res-meta,
        .res-card:focus-visible .res-meta { color: rgba(255,255,255,0.55); }
        .res-card:hover .res-glyph,
        .res-card:focus-visible .res-glyph { color: var(--mango); }
        .res-card:focus-visible { outline: 3px solid var(--ink); outline-offset: 3px; }

        @media (max-width: 720px) {
          .res-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
