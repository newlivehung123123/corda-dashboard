import React, { useEffect, useState } from 'react';

const NAV = [
  { label: 'Data & Ranking',     id: 'data-ranking' },
  { label: 'Mission & Vision',   id: 'mission-vision' },
  { label: 'Methodology',        id: 'methodology-implementation' },
  { label: 'Regime',             id: 'regime-classification' },
  { label: 'Analytical Methods', id: 'analytical-methods' },
];

// Hysteresis, so a scroll that lands on the boundary cannot flap the bar.
const CONDENSE_AT = 180;
const EXPAND_AT   = 120;

/**
 * Charcoal utility bar carrying a single control, the search trigger.
 * Once the hero nav has scrolled away it draws itself in to a centred pill
 * that picks up the wordmark and the section links.
 */
export default function Header({ onOpenSearch, onNavigate }) {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setCondensed((c) => (c ? y > EXPAND_AT : y > CONDENSE_AT));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e, id) => {
    e.preventDefault();
    onNavigate?.(id);
  };

  return (
    <header className={`hdr${condensed ? ' is-condensed' : ''}`}>
      <div className="hdr-shell">
        <a
          href="#top"
          className="hdr-brand"
          aria-hidden={!condensed}
          tabIndex={condensed ? 0 : -1}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <span className="hdr-wordmark">CORDA</span>
          <span className="hdr-tagline">AI-Readiness Index</span>
        </a>

        <nav
          className="hdr-nav"
          aria-label="Section navigation"
          aria-hidden={!condensed}
        >
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              tabIndex={condensed ? 0 : -1}
              onClick={(e) => handleNav(e, n.id)}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <button
          className="hdr-search"
          onClick={onOpenSearch}
          aria-label="Search this site"
          title="Search this site"
        >
          <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <style>{`
        .hdr {
          position: sticky;
          top: 0;
          z-index: 200;
          height: var(--header-bar-h);
          background: var(--ink);
          transition: background 0.35s ease;
        }
        .hdr.is-condensed { background: transparent; }

        .hdr-shell {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          max-width: var(--shell);
          height: var(--header-bar-h);
          margin: 0 auto;
          padding: 0 24px;
          color: #fff;
          background: transparent;
          border-radius: 0;
          box-shadow: none;
          transition:
            max-width 0.44s cubic-bezier(0.22, 0.61, 0.36, 1),
            height 0.44s cubic-bezier(0.22, 0.61, 0.36, 1),
            margin-top 0.44s cubic-bezier(0.22, 0.61, 0.36, 1),
            padding 0.44s cubic-bezier(0.22, 0.61, 0.36, 1),
            border-radius 0.44s cubic-bezier(0.22, 0.61, 0.36, 1),
            background 0.3s ease,
            box-shadow 0.3s ease,
            color 0.3s ease;
        }
        .hdr.is-condensed .hdr-shell {
          max-width: min(1060px, calc(100% - 32px));
          height: var(--header-pill-h);
          margin-top: 10px;
          padding: 0 8px 0 22px;
          color: var(--ink);
          background: #fff;
          border-radius: 999px;
          box-shadow: 0 10px 30px rgba(20, 22, 28, 0.16),
                      0 2px 6px rgba(20, 22, 28, 0.08);
        }

        /* Wordmark and links carry no width until the bar has drawn in */
        .hdr-brand,
        .hdr-nav {
          display: flex;
          max-width: 0;
          opacity: 0;
          overflow: hidden;
          white-space: nowrap;
          pointer-events: none;
          transition: opacity 0.26s ease,
                      max-width 0.44s cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .hdr-brand {
          flex-direction: column;
          justify-content: center;
          line-height: 1.06;
          text-decoration: none;
          color: inherit;
        }
        .hdr-nav {
          align-items: center;
          gap: 2px;
          margin: 0 auto;
        }
        .hdr.is-condensed .hdr-brand { max-width: 260px; opacity: 1; pointer-events: auto; }
        .hdr.is-condensed .hdr-nav   { max-width: 720px; opacity: 1; pointer-events: auto; }
        /* Restated for the same reason: a:hover would otherwise recolour it */
        .hdr-brand:hover { color: inherit; text-decoration: none; }

        .hdr-wordmark {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 20px;
          font-weight: 900;
          letter-spacing: 0.02em;
        }
        .hdr-tagline {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--mango-ink);
        }

        .hdr-nav a {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: -0.005em;
          color: inherit;
          text-decoration: none;
          padding: 8px 11px;
          border-radius: 999px;
          transition: background 0.15s ease, color 0.15s ease;
        }
        .hdr-nav a:hover {
          background: var(--mango-pale);
          color: var(--mango-ink);
          text-decoration: none;
        }

        .hdr-search {
          flex-shrink: 0;
          margin-left: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 999px;
          background: transparent;
          color: inherit;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        .hdr-search:hover { background: rgba(255, 255, 255, 0.16); }
        .hdr.is-condensed .hdr-search {
          background: var(--mango);
          color: var(--ink);
        }
        .hdr.is-condensed .hdr-search:hover { background: var(--mango-deep); }
        .hdr-search:focus-visible { outline: 3px solid var(--mango); outline-offset: 2px; }

        /* The links do not fit the pill on narrow screens; the wordmark and
           the search control do. Section links stay reachable in the footer. */
        @media (max-width: 980px) {
          .hdr.is-condensed .hdr-nav {
            max-width: 0;
            opacity: 0;
            pointer-events: none;
            visibility: hidden;  /* also drops the links out of the tab order */
          }
        }
      `}</style>
    </header>
  );
}
