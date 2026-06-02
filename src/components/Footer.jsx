import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--colour-bg-overlay)',
      borderTop: '1px solid var(--colour-border)',
      padding: '40px 24px',
      marginTop: 0,
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 32,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      }}>
        <div style={{ minWidth: 240 }}>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: 18,
            color: 'var(--colour-accent)',
            marginBottom: 8,
          }}>
            CORDA Democracy
          </div>
          <p style={{
            fontSize: 13,
            color: 'var(--colour-text-muted)',
            lineHeight: 1.6,
            maxWidth: 300,
            margin: 0,
          }}>
            Democratic AI-Readiness Index 2025. All scores are pipeline-verified and must not be altered.
          </p>
        </div>

        <div style={{ minWidth: 200 }}>
          <div style={{
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--colour-text-muted)',
            marginBottom: 12,
          }}>
            Fellows
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['Coleman Snell', 'Jason Hung', 'Casimir Wypyski', 'Eilaf Mohamed'].map(name => (
              <li key={name} style={{ fontSize: 13, color: 'var(--colour-text-muted)' }}>{name}</li>
            ))}
          </ul>
        </div>

        <div style={{ minWidth: 200 }}>
          <div style={{
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--colour-text-muted)',
            marginBottom: 12,
          }}>
            Data Sources
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {['V-Dem / DSP', 'Freedom House', 'EIU Democracy Index', 'IDEA GSoD', 'Tortoise AI Index'].map(src => (
              <li key={src} style={{ fontSize: 13, color: 'var(--colour-text-muted)' }}>{src}</li>
            ))}
            <li style={{ fontSize: 13, color: 'var(--colour-text-light)', fontStyle: 'italic' }}>+ 10 more sources</li>
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: 1200,
        margin: '32px auto 0',
        paddingTop: 20,
        borderTop: '1px solid var(--colour-border)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 12, color: 'var(--colour-text-light)' }}>
          © {new Date().getFullYear()} CORDA Democracy Fellows. Data: 2023–2025.
        </span>
        <span style={{ fontSize: 12, color: 'var(--colour-text-light)' }}>
          Hosted on{' '}
          <a href="https://huggingface.co/spaces" target="_blank" rel="noopener noreferrer"
            style={{ color: 'var(--colour-accent)' }}>
            Hugging Face Spaces
          </a>
        </span>
      </div>
    </footer>
  );
}
