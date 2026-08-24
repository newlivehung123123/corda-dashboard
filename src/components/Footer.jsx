import React from 'react';

const SECTIONS = [
  { label: 'Data & Ranking',            id: 'data-ranking' },
  { label: 'Mission & Vision',          id: 'mission-vision' },
  { label: 'Methodology',               id: 'methodology-implementation' },
  { label: 'Regime Classification',     id: 'regime-classification' },
  { label: 'Analytical Methods',        id: 'analytical-methods' },
];

const FELLOWS = ['Coleman Snell', 'Jason Hung', 'Casimir Wypyski', 'Eilaf Mohamed'];

const SOURCES = ['V-Dem / DSP', 'Freedom House', 'EIU Democracy Index', 'IDEA GSoD', 'Tortoise AI Index'];

const colHead = {
  fontFamily: "'Figtree', system-ui, sans-serif",
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'var(--mango)',
  marginBottom: 16,
};

const item = { fontSize: 14, color: 'rgba(255,255,255,0.78)', lineHeight: 1.9 };

export default function Footer({ onNavigate }) {
  return (
    <footer style={{ background: 'var(--ink-deep)', padding: 'clamp(48px, 5.5vw, 72px) 24px 30px' }}>
      <div className="foot-grid" style={{ maxWidth: 'var(--shell)', margin: '0 auto' }}>
        <div>
          <div style={{
            fontFamily: "'Figtree', system-ui, sans-serif",
            fontWeight: 900,
            fontSize: 26,
            letterSpacing: '0.02em',
            color: '#fff',
            marginBottom: 4,
          }}>
            CORDA
          </div>
          <div style={{
            fontFamily: "'Figtree', system-ui, sans-serif",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--mango)',
            marginBottom: 16,
          }}>
            Democratic AI-Readiness Index
          </div>
          <p style={{
            fontSize: 14,
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.68,
            maxWidth: 300,
            margin: 0,
          }}>
            2025 edition.
          </p>
        </div>

        <div>
          <div style={colHead}>Sections</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {SECTIONS.map(s => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  onClick={(e) => { e.preventDefault(); onNavigate?.(s.id); }}
                  className="foot-link"
                  style={item}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div style={colHead}>Fellows</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {FELLOWS.map(name => <li key={name} style={item}>{name}</li>)}
          </ul>
        </div>

        <div>
          <div style={colHead}>Data sources</div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {SOURCES.map(src => <li key={src} style={item}>{src}</li>)}
            <li style={{ ...item, color: 'rgba(255,255,255,0.52)', fontStyle: 'italic' }}>+ 10 more sources</li>
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: 'var(--shell)',
        margin: '40px auto 0',
        paddingTop: 20,
        borderTop: '1px solid rgba(255,255,255,0.18)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.60)' }}>
          © {new Date().getFullYear()} CORDA Democracy Fellows. Data: 2023–2025.
        </span>
        <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.60)' }}>
          Hosted on{' '}
          <a
            href="https://huggingface.co/spaces"
            target="_blank"
            rel="noopener noreferrer"
            className="foot-link"
            style={{ color: 'var(--mango)' }}
          >
            Hugging Face Spaces
          </a>
        </span>
      </div>

      <style>{`
        .foot-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px 32px;
        }
        .foot-link { text-decoration: none; transition: color 0.15s ease; }
        .foot-link:hover { color: #fff; text-decoration: underline; }
        @media (max-width: 900px) {
          .foot-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 560px) {
          .foot-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
