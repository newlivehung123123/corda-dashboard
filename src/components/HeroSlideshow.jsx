import React, { useCallback, useEffect, useRef, useState } from 'react';

const SLIDES = [
  { src: './media/hero1.jpg', alt: 'Illustration: isolated voices connected through algorithmic transparency into democratic consensus' },
  { src: './media/hero2.jpg', alt: 'Illustration: public data processed by AI into political preferences feeding democratic institutions' },
  { src: './media/hero3.jpg', alt: 'Illustration: a scale balancing algorithmic influence against public will' },
  { src: './media/hero4.jpg', alt: 'Illustration: public opinion and law weighed together under public will' },
  { src: './media/hero5.jpg', alt: 'Illustration: democratic AI, bias mitigation and voting integrity audits' },
];

const NAV = [
  { label: 'Data & Ranking',     id: 'data-ranking' },
  { label: 'Mission & Vision',   id: 'mission-vision' },
  { label: 'Methodology',        id: 'methodology-implementation' },
  { label: 'Regime',             id: 'regime-classification' },
  { label: 'Analytical Methods', id: 'analytical-methods' },
];

const HOLD_MS = 6500;
const FADE_MS = 1300;

export default function HeroSlideshow({ onNavigate }) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const leaveTimer = useRef(null);

  const goTo = useCallback((next) => {
    setIndex((cur) => {
      if (next === cur) return cur;
      setLeaving(cur);
      clearTimeout(leaveTimer.current);
      leaveTimer.current = setTimeout(() => setLeaving(null), FADE_MS);
      return next;
    });
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const t = setTimeout(() => goTo((index + 1) % SLIDES.length), HOLD_MS);
    return () => clearTimeout(t);
  }, [index, goTo]);

  useEffect(() => () => clearTimeout(leaveTimer.current), []);

  const handleNav = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate?.(id);
  };

  return (
    <section
      aria-label="Featured illustrations"
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(440px, 68vh, 720px)',
        overflow: 'hidden',
        background: 'var(--ink)',
      }}
    >
      {/* Slides */}
      {SLIDES.map((s, i) => {
        const isActive = i === index;
        const isLeaving = i === leaving;
        return (
          <div
            key={s.src}
            className={`kb-slide${isActive ? ' active' : ''}${isLeaving ? ' leaving' : ''}`}
            aria-hidden={!isActive}
          >
            <img className={`kb-img kb-${i % 2 === 0 ? 'in' : 'out'}`} src={s.src} alt={isActive ? s.alt : ''} />
          </div>
        );
      })}

      {/* Scrim so the overlaid nav stays legible on every frame */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          background:
            'linear-gradient(to bottom, rgba(20,22,28,0.88) 0%, rgba(20,22,28,0.72) 9%, rgba(20,22,28,0.36) 20%, rgba(20,22,28,0.11) 32%, rgba(20,22,28,0) 44%)',
          pointerEvents: 'none',
        }}
      />

      {/* Overlaid brand + navigation */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 4, display: 'flex', flexDirection: 'column', pointerEvents: 'none' }}>
        <div
          style={{
            maxWidth: 'var(--shell)',
            width: '100%',
            margin: '0 auto',
            padding: '26px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            pointerEvents: 'auto',
          }}
        >
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', lineHeight: 1.05 }}
          >
            <span style={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 27,
              fontWeight: 900,
              letterSpacing: '0.02em',
              color: '#fff',
              textShadow: '0 1px 12px rgba(0,0,0,0.35)',
            }}>
              CORDA
            </span>
            <span style={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.88)',
              textShadow: '0 1px 10px rgba(0,0,0,0.4)',
            }}>
              Democratic AI-Readiness Index
            </span>
          </a>

          <nav className="hero-nav" aria-label="Section navigation" style={{ display: 'flex', gap: 6 }}>
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => handleNav(e, n.id)}
                style={{
                  fontFamily: "'Figtree', system-ui, sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  color: '#fff',
                  padding: '8px 13px',
                  borderRadius: 4,
                  textDecoration: 'none',
                  textShadow: '0 1px 10px rgba(0,0,0,0.45)',
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <button
            className="hero-burger"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              background: 'rgba(0,0,0,0.28)',
              border: 'none',
              borderRadius: 6,
              padding: 11,
              cursor: 'pointer',
            }}
          >
            <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: '#fff', borderRadius: 2 }} />
          </button>
        </div>

        {menuOpen && (
          <div
            className="hero-mobile-menu"
            style={{
              background: 'rgba(22,24,29,0.96)',
              padding: '8px 24px 16px',
              display: 'flex',
              flexDirection: 'column',
              pointerEvents: 'auto',
            }}
          >
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={(e) => handleNav(e, n.id)}
                style={{
                  fontFamily: "'Figtree', system-ui, sans-serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#fff',
                  padding: '11px 0',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Slide indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: 26,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 10,
          zIndex: 5,
        }}
      >
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            onClick={() => goTo(i)}
            aria-label={`Show slide ${i + 1} of ${SLIDES.length}`}
            aria-current={i === index}
            style={{
              width: i === index ? 30 : 10,
              height: 10,
              borderRadius: 999,
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: i === index ? 'var(--mango)' : 'rgba(255,255,255,0.55)',
              boxShadow: '0 1px 6px rgba(0,0,0,0.35)',
              transition: 'width 0.35s ease, background 0.35s ease',
            }}
          />
        ))}
      </div>

      <style>{`
        .kb-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          overflow: hidden;
          transition: opacity ${FADE_MS}ms ease-in-out;
        }
        .kb-slide.active { opacity: 1; z-index: 2; }
        .kb-slide.leaving { opacity: 0; z-index: 1; }

        .kb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform-origin: center center;
        }

        /* Idle frame — slightly inset so the animation never reveals an edge */
        .kb-in  { transform: scale(1.03); }
        .kb-out { transform: scale(1.16); }

        /* The zoom runs while a slide is on screen, alternating direction */
        .kb-slide.active .kb-in  { animation: kb-zoom-in  ${HOLD_MS + FADE_MS}ms ease-out forwards; }
        .kb-slide.active .kb-out { animation: kb-zoom-out ${HOLD_MS + FADE_MS}ms ease-out forwards; }

        /* Hold the end state through the crossfade so nothing snaps back */
        .kb-slide.leaving .kb-in  { transform: scale(1.16) translate3d(-1.1%, -0.9%, 0); }
        .kb-slide.leaving .kb-out { transform: scale(1.03) translate3d(1%, 0.7%, 0); }

        @keyframes kb-zoom-in {
          from { transform: scale(1.03) translate3d(0, 0, 0); }
          to   { transform: scale(1.16) translate3d(-1.1%, -0.9%, 0); }
        }
        @keyframes kb-zoom-out {
          from { transform: scale(1.16) translate3d(0, 0, 0); }
          to   { transform: scale(1.03) translate3d(1%, 0.7%, 0); }
        }

        @media (max-width: 1100px) {
          .hero-nav { display: none !important; }
          .hero-burger { display: flex !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .kb-slide.active .kb-in,
          .kb-slide.active .kb-out { animation: none; }
        }
      `}</style>
    </section>
  );
}
