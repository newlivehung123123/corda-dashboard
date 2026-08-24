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
      <div style={{ maxWidth: 'var(--shell)', margin: '0 auto', padding: 'clamp(56px, 6.5vw, 92px) 24px' }}>
        <p className="eyebrow">Research design</p>
        <h2 style={{ margin: '0 0 8px' }}>Analytical Methods</h2>
        <p style={{
          fontFamily: "'Figtree', system-ui, sans-serif",
          fontSize: 'var(--fs-note)',
          color: 'var(--colour-text-muted)',
          marginBottom: 28,
          lineHeight: 1.7,
          maxWidth: 'var(--prose)',
        }}>
          Five quantitative methods are specified for the research paper. Method 5 is research-paper only and not visualised in this dashboard.
        </p>
        <div style={{ maxWidth: 'var(--prose)' }}>
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
                    fontFamily: "'Figtree', system-ui, sans-serif",
                    fontSize: 'var(--fs-note)',
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
