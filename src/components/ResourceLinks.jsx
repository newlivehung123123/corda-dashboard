import React from 'react';

const tabs = [
  {
    label: '2025 Edition Report',
    href: 'https://cdn.jsdelivr.net/gh/newlivehung123123/corda-dashboard@main/public/CORDA_2025_Global_Rankings.pdf',
    download: false,
  },
  {
    label: 'Public Access Data',
    href: './CORDA_Public_Access_Data.zip',
    download: true,
  },
];

export default function ResourceLinks() {
  return (
    <section
      id="resource-links"
      style={{
        borderTop: '1px solid var(--colour-border)',
        background: 'var(--colour-bg)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 16,
          }}
        >
          {tabs.map((tab) => (
            <a
              key={tab.label}
              href={tab.href}
              target={tab.download ? undefined : '_blank'}
              rel="noopener noreferrer"
              download={tab.download ? '' : undefined}
              className="card"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px 24px',
                border: '1px solid var(--colour-border)',
                borderRadius: 8,
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--colour-text)',
                textDecoration: 'none',
                textAlign: 'center',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--colour-accent)';
                e.currentTarget.style.color = 'var(--colour-accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--colour-border)';
                e.currentTarget.style.color = 'var(--colour-text)';
              }}
            >
              {tab.label}
              {tab.download ? ' ↓' : ' ↗'}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
