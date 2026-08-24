import React from 'react';

const CATEGORIES = [
  {
    label: 'Data & Ranking',
    id: 'data-ranking',
    img: './media/card-data.jpg',
    blurb: 'Rankings, scatter, world map and country profiles across all 27 countries.',
  },
  {
    label: 'Mission & Vision',
    id: 'mission-vision',
    img: './media/card-mission.jpg',
    blurb: 'Why existing democracy indices miss AI, and what this index sets out to add.',
  },
  {
    label: 'Methodology',
    id: 'methodology-implementation',
    img: './media/card-methodology.jpg',
    blurb: 'Theoretical framework, indicator selection, imputation and aggregation.',
  },
  {
    label: 'Regime',
    id: 'regime-classification',
    img: './media/card-regime.jpg',
    blurb: 'How the four V-Dem regime categories are defined and applied.',
  },
  {
    label: 'Analytical Methods',
    id: 'analytical-methods',
    img: './media/card-analytical.jpg',
    blurb: 'The five quantitative methods specified for the research paper.',
  },
];

export default function CategoryGrid({ onNavigate }) {
  return (
    <section
      aria-label="Explore the index"
      style={{ background: 'var(--mango-pale)', paddingTop: 'clamp(48px, 6vw, 76px)' }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '0 24px 40px' }}>
        <h2 style={{ margin: '0 0 14px' }}>Explore the index</h2>
        <p
          style={{
            fontSize: 'clamp(16px, 1.4vw, 18px)',
            lineHeight: 1.62,
            color: 'var(--colour-text-muted)',
            maxWidth: 720,
            margin: 0,
          }}
        >
          Five entry points into the 2025 edition — the scored data itself, the reasoning behind
          it, and the methods used to build and test it.
        </p>
      </div>

      <div className="cat-grid">
        {CATEGORIES.map((c) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="cat-card"
            onClick={(e) => { e.preventDefault(); onNavigate?.(c.id); }}
          >
            <img src={c.img} alt="" className="cat-img" aria-hidden="true" />
            <span className="cat-scrim" aria-hidden="true" />
            <span className="cat-body">
              <span className="cat-label">{c.label}</span>
              <span className="cat-blurb">{c.blurb}</span>
            </span>
          </a>
        ))}
      </div>

      <style>{`
        .cat-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          width: 100%;
        }

        .cat-card {
          position: relative;
          display: block;
          overflow: hidden;
          min-height: 340px;
          text-decoration: none;
          color: #fff;
        }
        /* The global a:hover colour outranks .cat-card on specificity, so the
           card has to restate its own white on hover and focus. */
        .cat-card:hover,
        .cat-card:focus-visible { color: #fff; text-decoration: none; }

        .cat-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.01);
          transition: transform 0.7s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .cat-card:hover .cat-img,
        .cat-card:focus-visible .cat-img { transform: scale(1.11); }

        .cat-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top,
            rgba(18, 20, 25, 0.90) 0%,
            rgba(18, 20, 25, 0.62) 34%,
            rgba(18, 20, 25, 0.18) 68%,
            rgba(18, 20, 25, 0.10) 100%);
          transition: background 0.4s ease;
        }
        .cat-card:hover .cat-scrim,
        .cat-card:focus-visible .cat-scrim {
          background: linear-gradient(to top,
            rgba(122, 60, 8, 0.94) 0%,
            rgba(160, 80, 14, 0.72) 40%,
            rgba(60, 34, 10, 0.36) 78%,
            rgba(18, 20, 25, 0.20) 100%);
        }

        .cat-body {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: 24px 22px 26px;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .cat-label {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: clamp(20px, 1.7vw, 26px);
          font-weight: 800;
          letter-spacing: -0.018em;
          line-height: 1.14;
          text-shadow: 0 1px 12px rgba(0,0,0,0.45);
        }

        .cat-blurb {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 500;
          line-height: 1.5;
          color: rgba(255,255,255,0.92);
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transform: translateY(6px);
          transition: max-height 0.4s ease, opacity 0.3s ease, transform 0.4s ease;
          text-shadow: 0 1px 10px rgba(0,0,0,0.5);
        }
        .cat-card:hover .cat-blurb,
        .cat-card:focus-visible .cat-blurb {
          max-height: 100px;
          opacity: 1;
          transform: translateY(0);
        }

        .cat-card:focus-visible {
          outline: 3px solid var(--mango);
          outline-offset: -3px;
        }

        /* Two rows, no gap at the end. Six tracks let the five cards divide
           the space exactly: two halves on top, three thirds beneath. The
           top pair is also taller, so the split reads as deliberate. */
        @media (max-width: 1100px) and (min-width: 641px) {
          .cat-grid { grid-template-columns: repeat(6, minmax(0, 1fr)); }
          .cat-card:nth-child(-n + 2) { grid-column: span 3; min-height: 320px; }
          .cat-card:nth-child(n + 3)  { grid-column: span 2; min-height: 260px; }
          .cat-blurb { max-height: 100px; opacity: 1; transform: none; }
        }
        @media (max-width: 640px) {
          .cat-grid { grid-template-columns: repeat(1, minmax(0, 1fr)); }
          .cat-card { min-height: 210px; }
          .cat-blurb { max-height: 100px; opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}
