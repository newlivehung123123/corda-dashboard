import React from 'react';
import { drivers } from '../data/drivers.js';

const DRIVER_COLOURS_HEX = {
  corda: '#2B4C7E',
  d1: '#4E79A7',
  d2: '#F28E2B',
  d3: '#E15759',
  d4: '#76B7B2',
  d5: '#59A14F',
};

export default function DriverPanel({ activeDriver, onSelectDriver }) {
  const selected = drivers.find(d => d.key === activeDriver) || drivers[0];

  return (
    <aside
      aria-label="Driver information panel"
      style={{
        background: 'var(--colour-bg-card)',
        border: '1px solid var(--colour-border)',
        borderRadius: 6,
        padding: '20px',
        boxShadow: '0 2px 8px var(--colour-shadow)',
      }}
    >
      <h4 style={{ fontSize: 14, marginBottom: 12, color: 'var(--colour-text-muted)' }}>
        Select Driver
      </h4>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 20 }}>
        {drivers.map(d => (
          <button
            key={d.key}
            onClick={() => onSelectDriver(d.key)}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onSelectDriver(d.key)}
            aria-label={`Select ${d.label}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: activeDriver === d.key ? 'var(--colour-bg-overlay)' : 'none',
              border: 'none',
              borderRadius: 4,
              padding: '8px 10px',
              cursor: 'pointer',
              textAlign: 'left',
              borderLeft: `3px solid ${activeDriver === d.key ? DRIVER_COLOURS_HEX[d.key] : 'transparent'}`,
              transition: 'all 0.15s',
            }}
          >
            <div style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: DRIVER_COLOURS_HEX[d.key],
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 13,
              fontWeight: activeDriver === d.key ? 600 : 400,
              color: activeDriver === d.key ? 'var(--colour-text)' : 'var(--colour-text-muted)',
            }}>
              {d.shortLabel}
            </span>
          </button>
        ))}
      </div>

      {/* Selected driver detail */}
      <div style={{
        borderTop: '1px solid var(--colour-border)',
        paddingTop: 16,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 8,
        }}>
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: DRIVER_COLOURS_HEX[selected.key],
          }} />
          <span style={{
            fontFamily: "'Figtree', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: 'var(--colour-text)',
          }}>
            {selected.shortLabel}
          </span>
        </div>

        <p style={{
          fontFamily: "'Figtree', system-ui, sans-serif",
          fontSize: 13,
          color: 'var(--colour-text-muted)',
          lineHeight: 1.6,
          margin: '0 0 12px',
        }}>
          {selected.description}
        </p>

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{
            fontFamily: "'Figtree', system-ui, sans-serif",
            fontSize: 12,
            color: 'var(--colour-text-muted)',
          }}>
            <strong style={{ display: 'block', color: 'var(--colour-text)' }}>
              {selected.nIndicators}
            </strong>
            Indicators
          </div>
          {selected.nAI !== undefined && (
            <>
              <div style={{
                fontFamily: "'Figtree', system-ui, sans-serif",
                fontSize: 12,
                color: 'var(--colour-text-muted)',
              }}>
                <strong style={{ display: 'block', color: 'var(--colour-text)' }}>
                  {selected.nAI}
                </strong>
                AI-specific
              </div>
              <div style={{
                fontFamily: "'Figtree', system-ui, sans-serif",
                fontSize: 12,
                color: 'var(--colour-text-muted)',
              }}>
                <strong style={{ display: 'block', color: 'var(--colour-text)' }}>
                  {selected.nNonAI}
                </strong>
                Non-AI
              </div>
            </>
          )}
        </div>

        {selected.theoryBasis && (
          <div style={{ marginTop: 12 }}>
            <div style={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--colour-text-muted)',
              marginBottom: 4,
            }}>
              Theory
            </div>
            <div style={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 12,
              color: 'var(--colour-text-muted)',
              fontStyle: 'italic',
            }}>
              {selected.theoryBasis}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
