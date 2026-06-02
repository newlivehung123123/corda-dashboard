import React, { useState } from 'react';

const navLinks = [
  { label: 'Rankings',    href: '#rankings' },
  { label: 'Scatter',     href: '#scatter' },
  { label: 'Map',         href: '#map' },
  { label: 'Methodology', href: '#methodology' },
];

export default function Header({ activeView, onViewChange }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e, href, view) => {
    e.preventDefault();
    if (view && onViewChange) onViewChange(view);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const viewMap = {
    '#rankings': 'rankings',
    '#scatter': 'scatter',
    '#map': 'map',
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--colour-bg)',
      borderBottom: '1px solid var(--colour-border)',
      boxShadow: 'none',
    }}>
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '0 24px',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: 20,
            color: 'var(--colour-accent)',
            letterSpacing: '-0.02em',
          }}>
            CORDA
          </span>
          <span style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 13,
            color: 'var(--colour-text-muted)',
            display: 'none',
          }}
            className="header-subtitle"
          >
            Democratic AI-Readiness Index
          </span>
        </div>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" style={{ display: 'flex', gap: 4 }}
          className="desktop-nav">
          {navLinks.map(link => {
            const view = viewMap[link.href];
            const isActive = view && activeView === view;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, view)}
                aria-label={`Navigate to ${link.label}`}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleNavClick(e, link.href, view)}
                style={{
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--colour-accent)' : 'var(--colour-text-muted)',
                  padding: '6px 12px',
                  borderRadius: 4,
                  textDecoration: 'none',
                  background: isActive ? 'rgba(43,76,126,0.08)' : 'transparent',
                  transition: 'all 0.15s',
                  borderBottom: isActive ? '2px solid var(--colour-accent)' : '2px solid transparent',
                }}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Hamburger */}
        <button
          aria-label="Toggle navigation menu"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            flexDirection: 'column',
            gap: 5,
          }}
          className="hamburger-btn"
        >
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--colour-text)', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--colour-text)', borderRadius: 2 }} />
          <span style={{ display: 'block', width: 22, height: 2, background: 'var(--colour-text)', borderRadius: 2 }} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--colour-bg-overlay)',
          borderTop: '1px solid var(--colour-border)',
          padding: '12px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, viewMap[link.href])}
              style={{
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 500,
                color: 'var(--colour-text)',
                padding: '8px 0',
                textDecoration: 'none',
                borderBottom: '1px solid var(--colour-border)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 639px) {
          .desktop-nav { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .header-subtitle { display: none !important; }
        }
        @media (min-width: 768px) {
          .header-subtitle { display: inline !important; }
        }
      `}</style>
    </header>
  );
}
