import React from 'react';
import { indexSummary } from '../data/methodology.js';

const TAIL_H = 44;

/**
 * A comic speech balloon as one continuous outline. The oval is drawn the long
 * way round, from one corner of the tail's mouth to the other, and the short
 * gap left between them is closed by the tail itself. Because the tail is part
 * of the same path rather than a shape laid on top, there is no seam across
 * its base and no join to hide.
 */
function balloon(bw, bodyH) {
  const cx = bw / 2;
  const cy = bodyH / 2;
  const rx = cx - 3;                 // room for the stroke
  const ry = cy - 3;
  const at = (deg) => {
    const r = (deg * Math.PI) / 180;
    return [cx + rx * Math.cos(r), cy + ry * Math.sin(r)];
  };
  const [ax, ay] = at(100);          // mouth, just left of the lowest point
  const [bx, by] = at(131);          // mouth, further round the left flank
  const tipX = cx - rx * 0.78;
  const tipY = bodyH + TAIL_H - 4;
  const r = (v) => Math.round(v * 10) / 10;

  return {
    // long-way arc (large-arc 1, counter-clockwise 0), then down to the tip,
    // then Z straight back to where the arc began
    d: `M${r(ax)} ${r(ay)}A${r(rx)} ${r(ry)} 0 1 0 ${r(bx)} ${r(by)}L${r(tipX)} ${r(tipY)}Z`,
    tipX: r(tipX),
    h: bodyH + TAIL_H,
  };
}

// Each balloon is drawn at its own size, 1:1 with its viewBox, so nothing is
// ever stretched and the ink stays an even weight. The oval has to be wide
// enough to inscribe its text: "2023–2025" is nine glyphs, so it gets a much
// wider body and a smaller blow-up than the two-digit figures.
const STATS = [
  { value: '27',        label: 'Countries',  font: 78, bw: 206, bodyH: 156 },
  { value: '82',        label: 'Indicators', font: 78, bw: 214, bodyH: 156 },
  { value: '5',         label: 'Drivers',    font: 78, bw: 176, bodyH: 150 },
  { value: '2023–2025', label: 'Data years', font: 58, bw: 410, bodyH: 150 },
].map((s) => ({ ...s, ...balloon(s.bw, s.bodyH) }));

export default function HeroIntro() {
  return (
    <section
      id="overview"
      style={{ background: 'var(--colour-bg)', padding: 'clamp(56px, 7vw, 96px) 24px' }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <p className="eyebrow">2025 Edition</p>

        <h1 style={{ maxWidth: 940, margin: '0 0 20px' }}>
          CORDA Democratic<br />AI-Readiness Index 2025
        </h1>

        <p
          style={{
            fontSize: 'clamp(19px, 2vw, 26px)',
            fontWeight: 500,
            lineHeight: 1.42,
            letterSpacing: '-0.012em',
            color: 'var(--colour-text-muted)',
            maxWidth: 760,
            margin: '0 0 8px',
          }}
        >
          Measuring AI-governance readiness and democratic backsliding risk across 27 countries
        </p>

        {/* Stat strip. Each figure carries a lens that opens on hover. */}
        <div className="stat-strip">
          {STATS.map((s) => (
            <div key={s.label} className="stat-strip-item">
              <div className="stat-anchor">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>

                {/* Duplicates what is already on screen, so it is decoration */}
                <div
                  className="stat-lens"
                  aria-hidden="true"
                  style={{
                    '--bw': `${s.bw}px`,
                    '--bh': `${s.h}px`,
                    '--body-h': `${s.bodyH}px`,
                    '--tip-x': `${s.tipX}px`,
                    '--lens-font': `${s.font}px`,
                  }}
                >
                  <svg
                    className="stat-lens-shape"
                    width={s.bw}
                    height={s.h}
                    viewBox={`0 0 ${s.bw} ${s.h}`}
                  >
                    <path d={s.d} />
                  </svg>
                  <span className="stat-lens-text">
                    <span className="stat-lens-value">{s.value}</span>
                    <span className="stat-lens-label">{s.label}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            fontSize: 'clamp(16px, 1.35vw, 18px)',
            lineHeight: 1.72,
            color: 'var(--colour-text-muted)',
            maxWidth: 860,
            margin: 0,
            paddingLeft: 20,
            borderLeft: '3px solid var(--mango)',
          }}
        >
          {indexSummary}
        </p>
      </div>

      <style>{`
        .stat-strip {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 8px;
          margin: 40px 0;
          padding: 30px 0;
          border-top: 1px solid var(--colour-border);
          border-bottom: 1px solid var(--colour-border);
        }
        .stat-strip-item { padding-right: 16px; }
        .stat-strip-item + .stat-strip-item {
          border-left: 1px solid var(--colour-border);
          padding-left: 28px;
        }

        /* Shrink-wraps the figure so the lens can hang off the numeral itself
           rather than off the whole grid cell. */
        .stat-anchor { position: relative; display: inline-block; }

        .stat-value {
          font-size: clamp(30px, 3.4vw, 44px);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1;
          color: var(--mango-ink);
          transition: color 0.2s ease;
        }
        .stat-label {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--colour-text-light);
          margin-top: 8px;
        }
        .stat-strip-item:hover .stat-value { color: var(--mango-deep); }

        /* ── The balloon ──────────────────────────────────────────────────
           A speech balloon that pops out of the figure, its tail pointing
           back down at the number it was read off. It grows from the tip,
           so the tail stays put on the number while the oval swings open. */
        .stat-lens {
          position: absolute;
          left: 0;
          bottom: 100%;
          z-index: 40;
          width: var(--bw);
          height: var(--bh);
          margin-bottom: -4px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(7px)
                     scale(calc(var(--lens-scale, 1) * 0.82))
                     rotate(var(--lens-rot, -2deg));
          transform-origin: var(--tip-x) 100%;
          pointer-events: none;
          transition: opacity 0.16s ease,
                      transform 0.3s cubic-bezier(0.34, 1.4, 0.5, 1),
                      visibility 0s linear 0.3s;
        }
        .stat-strip-item:hover .stat-lens {
          opacity: 1;
          visibility: visible;
          transform: translateY(0)
                     scale(var(--lens-scale, 1))
                     rotate(var(--lens-rot, -2deg));
          transition: opacity 0.16s ease,
                      transform 0.3s cubic-bezier(0.34, 1.4, 0.5, 1),
                      visibility 0s;
        }

        /* Flat ink and flat fill. No shadow, no gradient, no rounded box. */
        .stat-lens-shape {
          position: absolute;
          inset: 0;
          display: block;
          overflow: visible;
        }
        .stat-lens-shape path {
          fill: #fff;
          stroke: var(--ink);
          stroke-width: 3;
          stroke-linejoin: round;
        }

        .stat-lens-text {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: var(--body-h);      /* centre in the oval, not the tail */
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 7px;
        }
        .stat-lens-value {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: var(--lens-font);
          font-weight: 900;
          letter-spacing: -0.035em;
          line-height: 1;
          color: var(--mango-ink);
        }
        .stat-lens-label {
          font-family: 'Figtree', system-ui, sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--colour-text-muted);
        }

        /* The last figure sits at the right edge, so its balloon opens
           leftwards. The oval is symmetric, so flipping the drawing moves
           the tail across without touching the words inside. */
        .stat-strip-item:last-child .stat-lens {
          left: auto;
          right: 0;
          transform-origin: calc(100% - var(--tip-x)) 100%;
          --lens-rot: 2deg;
        }
        .stat-strip-item:last-child .stat-lens-shape { transform: scaleX(-1); }

        @media (prefers-reduced-motion: reduce) {
          .stat-lens,
          .stat-strip-item:hover .stat-lens {
            transform: scale(var(--lens-scale, 1)) rotate(var(--lens-rot, -2deg));
          }
        }

        @media (max-width: 700px) {
          .stat-strip { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 26px 8px; }
          .stat-strip-item:nth-child(3) { border-left: none; padding-left: 0; }
          /* two per row, so every even figure is now the right-hand one */
          .stat-lens { --lens-scale: 0.66; }
          .stat-strip-item:nth-child(2n) .stat-lens {
            left: auto;
            right: 0;
            transform-origin: calc(100% - var(--tip-x)) 100%;
            --lens-rot: 2deg;
          }
          .stat-strip-item:nth-child(2n) .stat-lens-shape { transform: scaleX(-1); }
          .stat-strip-item:nth-child(odd) .stat-lens {
            left: 0;
            right: auto;
            transform-origin: var(--tip-x) 100%;
            --lens-rot: -2deg;
          }
          .stat-strip-item:nth-child(odd) .stat-lens-shape { transform: none; }
        }
      `}</style>
    </section>
  );
}
