import React from 'react';
import { indexSummary } from '../data/methodology.js';

export default function Hero() {
  return (
    <section style={{
      padding: '80px 24px 60px',
      textAlign: 'center',
      borderBottom: '1px solid var(--colour-border)',
      background: 'var(--colour-bg)',
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(40px, 4.5vw, 64px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--colour-text)',
          marginBottom: 16,
          lineHeight: 1.15,
        }}>
          CORDA Democratic AI-Readiness Index 2025
        </h1>

        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: 'clamp(18px, 1.8vw, 22px)',
          color: 'var(--colour-text-muted)',
          lineHeight: 1.6,
          maxWidth: 680,
          margin: '0 auto 24px',
        }}>
          Measuring AI-governance readiness and democratic backsliding risk across 27 countries
        </p>

        {/* Stat chips */}
        <div className="stats-chips">
          {[
            { value: '27', label: 'Countries' },
            { value: '82', label: 'Indicators' },
            { value: '5',  label: 'Drivers' },
            { value: '2023–2025', label: 'Data' },
          ].map(chip => (
            <div key={chip.label} className="stat-chip">
              <strong style={{ color: 'var(--colour-accent)' }}>{chip.value}</strong>
              {' '}{chip.label}
            </div>
          ))}
        </div>

        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: 15,
          color: 'var(--colour-text-muted)',
          fontStyle: 'italic',
          maxWidth: 680,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          {indexSummary}
        </p>
      </div>
    </section>
  );
}
