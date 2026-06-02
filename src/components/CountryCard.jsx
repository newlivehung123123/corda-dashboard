import React from 'react';
import { scoreDrivers } from '../data/drivers.js';

const DRIVER_COLOURS = {
  d1: 'var(--colour-d1)',
  d2: 'var(--colour-d2)',
  d3: 'var(--colour-d3)',
  d4: 'var(--colour-d4)',
  d5: 'var(--colour-d5)',
};

const REGIME_EMOJI = {
  'Liberal Democracy': '🟦',
  'Electoral Democracy': '🟩',
  'Hybrid': '🟧',
  'Authoritarian': '🟥',
};

const FLAG_EMOJIS = {
  DNK: '🇩🇰', SWE: '🇸🇪', DEU: '🇩🇪', NLD: '🇳🇱', JPN: '🇯🇵',
  AUS: '🇦🇺', CAN: '🇨🇦', GBR: '🇬🇧', NZL: '🇳🇿', FRA: '🇫🇷',
  TWN: '🇹🇼', CHL: '🇨🇱', KOR: '🇰🇷', POL: '🇵🇱', USA: '🇺🇸',
  ISR: '🇮🇱', SGP: '🇸🇬', BRA: '🇧🇷', GHA: '🇬🇭', ZAF: '🇿🇦',
  IDN: '🇮🇩', IND: '🇮🇳', MEX: '🇲🇽', NGA: '🇳🇬', ARE: '🇦🇪',
  BGD: '🇧🇩', CHN: '🇨🇳',
};

function MiniBar({ value, colour, max = 100 }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div style={{
      height: 6,
      background: 'var(--colour-border)',
      borderRadius: 3,
      overflow: 'hidden',
      flexGrow: 1,
      minWidth: 80,
    }}>
      <div style={{
        height: '100%',
        width: `${pct}%`,
        background: colour,
        borderRadius: 3,
        transition: 'width 0.3s ease',
      }} />
    </div>
  );
}

export default function CountryCard({ country, mode = 'tooltip', onClose, onViewProfile }) {
  if (!country) return null;

  const flag = FLAG_EMOJIS[country.iso3] || '🌐';

  const isTooltip = mode === 'tooltip';
  const isPinned = mode === 'pinned';

  const cardStyle = isPinned ? {
    position: 'fixed',
    right: 20,
    top: 120,
    width: 300,
    zIndex: 200,
    background: 'var(--colour-bg-card)',
    border: '1px solid var(--colour-border-strong)',
    borderRadius: 6,
    boxShadow: '0 4px 24px var(--colour-shadow)',
    padding: 20,
  } : {
    background: 'var(--colour-bg-card)',
    border: '1px solid var(--colour-border-strong)',
    borderRadius: 6,
    boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
    padding: 16,
    width: 260,
    pointerEvents: isTooltip ? 'none' : 'auto',
  };

  return (
    <div className="country-card" style={cardStyle} role="region" aria-label={`Country profile: ${country.name}`}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <div>
          <div style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            fontSize: 16,
            color: 'var(--colour-text)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span>{flag}</span>
            <span>{country.name}</span>
            <span style={{
              fontFamily: "'Source Sans 3', system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: '#fff',
              background: 'var(--colour-accent)',
              borderRadius: 10,
              padding: '1px 8px',
              marginLeft: 4,
            }}>
              #{country.rank}
            </span>
          </div>
          <div style={{
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
            fontSize: 12,
            color: 'var(--colour-text-muted)',
            marginTop: 2,
          }}>
            {country.regime} · {country.region}
          </div>
        </div>
        {isPinned && (
          <button
            onClick={onClose}
            aria-label="Close country card"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--colour-text-muted)',
              fontSize: 18,
              lineHeight: 1,
              padding: 2,
            }}
          >
            ×
          </button>
        )}
      </div>

      {/* CORDA Score */}
      <div style={{
        borderTop: '1px solid var(--colour-border)',
        paddingTop: 10,
        marginBottom: 10,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--colour-text)',
          }}>
            CORDA Score
          </span>
          <span style={{
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--colour-accent)',
          }}>
            {country.corda.toFixed(1)}
          </span>
        </div>
        <MiniBar value={country.corda} colour="var(--colour-composite)" />
      </div>

      {/* Driver rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {scoreDrivers.map(driver => (
          <div key={driver.key}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                fontSize: 11,
                color: 'var(--colour-text-muted)',
              }}>
                {driver.shortLabel}
              </span>
              <span style={{
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--colour-text)',
              }}>
                {country[driver.key].toFixed(1)}
              </span>
            </div>
            <MiniBar value={country[driver.key]} colour={DRIVER_COLOURS[driver.key]} />
          </div>
        ))}
      </div>

      {/* View profile link */}
      <div style={{ marginTop: 14, borderTop: '1px solid var(--colour-border)', paddingTop: 10 }}>
        <button
          onClick={() => onViewProfile && onViewProfile(country)}
          aria-label={`View full profile for ${country.name}`}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onViewProfile && onViewProfile(country)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: "'Source Sans 3', system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--colour-accent)',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          View full profile →
        </button>
      </div>
    </div>
  );
}
