import React, { useState } from 'react';
import { analyticalMethods } from '../data/methodology.js';

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="accordion-item">
      <button
        className="accordion-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={`${open ? 'Collapse' : 'Expand'} ${title}`}
      >
        <span>{title}</span>
        <span style={{
          fontSize: 18,
          color: 'var(--colour-text-muted)',
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'none',
          display: 'inline-block',
        }}>
          ▾
        </span>
      </button>
      {open && (
        <div className="accordion-body">
          {children}
        </div>
      )}
    </div>
  );
}

export default function AnalyticalMethods() {
  return (
    <section
      id="analytical-methods"
      style={{
        borderTop: '1px solid var(--colour-border)',
        background: 'var(--colour-bg)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontSize: 32, marginBottom: 8 }}>Analytical Methods</h2>
        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: 15,
          color: 'var(--colour-text-muted)',
          marginBottom: 28,
          lineHeight: 1.7,
          maxWidth: 900,
        }}>
          Five quantitative methods are specified for the research paper. Method 5 is research-paper only and not visualised in this dashboard.
        </p>
        <div style={{ maxWidth: 900 }}>
          {analyticalMethods.map(method => (
            <Accordion key={method.id} title={method.title}>
              <ul style={{
                margin: 0,
                paddingLeft: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
              }}>
                {method.bullets.map((bullet, i) => (
                  <li key={i} style={{
                    fontFamily: "'Source Serif 4', Georgia, serif",
                    fontSize: 15,
                    color: 'var(--colour-text)',
                    lineHeight: 1.75,
                  }}>
                    {bullet}
                  </li>
                ))}
              </ul>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
}
