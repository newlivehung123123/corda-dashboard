import React, { useState, useEffect } from 'react';
import { drivers } from '../data/drivers.js';

const REGIONS = ['Europe', 'Asia-Pacific', 'Americas', 'Middle East & Africa'];
const REGIMES = ['Liberal Democracy', 'Electoral Democracy', 'Hybrid', 'Authoritarian'];
const VIEWS = [
  { key: 'rankings', label: 'Rankings' },
  { key: 'scatter',  label: 'Scatter' },
  { key: 'map',      label: 'Map' },
];

const REGIME_NOTE = `Regime classifications follow V-Dem's Regimes of the World (RoW) taxonomy, 2024 edition, with two label adaptations for general audiences:

• Liberal Democracy — Free and fair elections, strong protection of civil liberties, rule of law, and judicial independence. (V-Dem: Liberal Democracy)

• Electoral Democracy — Competitive multiparty elections held in practice, but with meaningful constraints on civil liberties, press freedom, or judicial independence. (V-Dem: Electoral Democracy). This category includes the United States, Israel, Poland, Brazil, and India — all of which V-Dem's 2024 data classifies as electoral rather than liberal democracies due to documented erosion in at least one dimension.

• Hybrid — Elections exist but are substantially unfree or unfair, or executive power is insufficiently constrained. Significant restrictions on civil society or the press. (V-Dem: Electoral Autocracy, relabelled)

• Authoritarian — No meaningful electoral competition; fundamental civil and political rights are suppressed. (V-Dem: Closed Autocracy, relabelled)

Classifications are static, reflecting 2024 conditions. Source: V-Dem Institute, Varieties of Democracy Dataset v14 (2024).`;

export default function FilterBar({ filters, setFilters }) {
  const { activeView, scoreKey, regions, regimes } = filters;
  const [showRegimeNote, setShowRegimeNote] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  // Close filters panel when switching to desktop
  useEffect(() => {
    if (!isMobile) setFiltersOpen(false);
  }, [isMobile]);

  const updateFilter = (key, value) => setFilters(f => ({ ...f, [key]: value }));

  const toggleArray = (key, value) => {
    setFilters(f => {
      const arr = f[key];
      return {
        ...f,
        [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
      };
    });
  };

  const activeFilterCount = regions.length + regimes.length + (scoreKey !== 'corda' ? 1 : 0);

  if (isMobile) {
    return (
      <div id="filter-bar" style={{
        position: 'sticky', top: 'calc(var(--header-bar-h) + 20px)', zIndex: 90,
        background: 'var(--colour-bg)',
        borderBottom: '1px solid var(--colour-border)',
      }}>
        {/* Mobile: compact row — VIEW tabs + Filters toggle */}
        <div style={{
          padding: '8px 16px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
        }}>
          <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            {VIEWS.map(v => (
              <button key={v.key}
                className={`filter-btn${activeView === v.key ? ' active' : ''}`}
                onClick={() => updateFilter('activeView', v.key)}
              >{v.label}</button>
            ))}
          </div>
          <button
            onClick={() => setFiltersOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: filtersOpen ? 'var(--colour-accent)' : 'var(--colour-bg-card)',
              border: '1px solid var(--colour-border-strong)',
              borderRadius: 20, padding: '6px 12px', cursor: 'pointer',
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 13, fontWeight: 600,
              color: filtersOpen ? '#fff' : 'var(--colour-text-muted)',
            }}
          >
            Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
          </button>
        </div>

        {/* Mobile: expanded filters panel */}
        {filtersOpen && (
          <div style={{ padding: '8px 16px 16px', borderTop: '1px solid var(--colour-border)' }}>
            {/* Score */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{ fontFamily: "'Figtree', system-ui, sans-serif", fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--colour-text-muted)', whiteSpace: 'nowrap' }}>Score</span>
              <select value={scoreKey} onChange={e => updateFilter('scoreKey', e.target.value)} style={{ flex: 1 }}>
                {drivers.map(d => <option key={d.key} value={d.key}>{d.shortLabel}</option>)}
              </select>
            </div>
            {/* Region */}
            <div style={{ marginBottom: 10 }}>
              <span style={{ fontFamily: "'Figtree', system-ui, sans-serif", fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--colour-text-muted)', display: 'block', marginBottom: 6 }}>Region</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <button className={`filter-btn${regions.length === 0 ? ' active' : ''}`} onClick={() => updateFilter('regions', [])}>All</button>
                {REGIONS.map(r => (
                  <button key={r} className={`filter-btn${regions.includes(r) ? ' active' : ''}`} onClick={() => toggleArray('regions', r)}>{r}</button>
                ))}
              </div>
            </div>
            {/* Regime */}
            <div>
              <span style={{ fontFamily: "'Figtree', system-ui, sans-serif", fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--colour-text-muted)', display: 'block', marginBottom: 6 }}>Regime</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                <button className={`filter-btn${regimes.length === 0 ? ' active' : ''}`} onClick={() => updateFilter('regimes', [])}>All</button>
                {REGIMES.map(r => (
                  <button key={r} className={`filter-btn${regimes.includes(r) ? ' active' : ''}`} onClick={() => toggleArray('regimes', r)}>{r.replace(' Democracy', '')}</button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      id="filter-bar"
      style={{
        position: 'sticky',
        top: 'calc(var(--header-bar-h) + 20px)',
        zIndex: 90,
        background: 'var(--colour-bg)',
        borderBottom: '1px solid var(--colour-border)',
        boxShadow: 'none',
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Left group: score + region + regime */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          {/* Score selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <label style={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--colour-text-muted)',
              whiteSpace: 'nowrap',
            }}>
              Score
            </label>
            <select
              value={scoreKey}
              onChange={e => updateFilter('scoreKey', e.target.value)}
              aria-label="Select score type"
            >
              {drivers.map(d => (
                <option key={d.key} value={d.key}>{d.shortLabel}</option>
              ))}
            </select>
          </div>

          {/* Region filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--colour-text-muted)',
              whiteSpace: 'nowrap',
            }}>
              Region
            </span>
            <button
              className={`filter-btn${regions.length === 0 ? ' active' : ''}`}
              onClick={() => updateFilter('regions', [])}
              aria-label="Show all regions"
            >
              All
            </button>
            {REGIONS.map(r => (
              <button
                key={r}
                className={`filter-btn${regions.includes(r) ? ' active' : ''}`}
                onClick={() => toggleArray('regions', r)}
                aria-label={`Toggle ${r} region`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Regime filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', position: 'relative' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{
                fontFamily: "'Figtree', system-ui, sans-serif",
                fontSize: 12,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--colour-text-muted)',
                whiteSpace: 'nowrap',
              }}>
                Regime
              </span>
              <button
                onClick={() => setShowRegimeNote(v => !v)}
                aria-label="Show regime classification methodology"
                title="How are regime types defined?"
                style={{
                  background: 'none',
                  border: '1px solid var(--colour-border-strong)',
                  borderRadius: '50%',
                  width: 16,
                  height: 16,
                  cursor: 'pointer',
                  fontFamily: "'Figtree', system-ui, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: 'var(--colour-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  lineHeight: 1,
                  flexShrink: 0,
                }}
              >
                i
              </button>
            </span>

            {/* Regime note popover */}
            {showRegimeNote && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                zIndex: 200,
                marginTop: 8,
                background: 'var(--colour-bg)',
                border: '1px solid var(--colour-border-strong)',
                borderRadius: 6,
                padding: '20px 24px',
                width: 440,
                boxShadow: '0 4px 24px rgba(43,76,126,0.12)',
                fontFamily: "'Figtree', system-ui, sans-serif",
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 12,
                  gap: 12,
                }}>
                  <span style={{
                    fontFamily: "'Figtree', system-ui, sans-serif",
                    fontSize: 12,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: 'var(--colour-text-muted)',
                  }}>
                    How Regime Types Are Defined
                  </span>
                  <button
                    onClick={() => setShowRegimeNote(false)}
                    aria-label="Close regime note"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontSize: 16, color: 'var(--colour-text-muted)', padding: 0, lineHeight: 1,
                      flexShrink: 0,
                    }}
                  >×</button>
                </div>

                {[
                  { label: 'Liberal Democracy', colour: 'var(--colour-liberal)', text: 'Free and fair elections with strong civil liberties, rule of law, and judicial independence intact.' },
                  { label: 'Electoral Democracy', colour: 'var(--colour-electoral)', text: 'Competitive elections held in practice, but with meaningful erosion in civil liberties, press freedom, or judicial independence. Includes the United States, Israel, Poland, Brazil, and India — all classified here by V-Dem\'s 2024 data.' },
                  { label: 'Hybrid', colour: 'var(--colour-hybrid)', text: 'Elections exist but are substantially unfree or unfair, or executive power is insufficiently constrained. Significant restrictions on civil society or the press. (V-Dem: Electoral Autocracy)' },
                  { label: 'Authoritarian', colour: 'var(--colour-authoritarian)', text: 'No meaningful electoral competition; fundamental civil and political rights are suppressed. (V-Dem: Closed Autocracy)' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: 10, marginBottom: 10, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 10, height: 10, borderRadius: 2,
                      background: item.colour, flexShrink: 0, marginTop: 4,
                    }} />
                    <div>
                      <span style={{
                        fontFamily: "'Figtree', system-ui, sans-serif",
                        fontSize: 13, fontWeight: 600, color: 'var(--colour-text)',
                      }}>
                        {item.label} —{' '}
                      </span>
                      <span style={{ fontSize: 13, color: 'var(--colour-text-muted)', lineHeight: 1.6 }}>
                        {item.text}
                      </span>
                    </div>
                  </div>
                ))}

                <p style={{
                  fontFamily: "'Figtree', system-ui, sans-serif",
                  fontSize: 11,
                  color: 'var(--colour-text-light)',
                  margin: '12px 0 0',
                  borderTop: '1px solid var(--colour-border)',
                  paddingTop: 10,
                  lineHeight: 1.5,
                }}>
                  Source: V-Dem Institute, Regimes of the World (RoW) classification, v14 (2024).
                  Classifications are static and based on 2024 conditions.
                </p>
              </div>
            )}

            <button
              className={`filter-btn${regimes.length === 0 ? ' active' : ''}`}
              onClick={() => updateFilter('regimes', [])}
              aria-label="Show all regimes"
            >
              All
            </button>
            {REGIMES.map(r => (
              <button
                key={r}
                className={`filter-btn${regimes.includes(r) ? ' active' : ''}`}
                onClick={() => toggleArray('regimes', r)}
                aria-label={`Toggle ${r} regime`}
              >
                {r.replace(' Democracy', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Right group: view tabs */}
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <span style={{
            fontFamily: "'Figtree', system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--colour-text-muted)',
            marginRight: 4,
          }}>
            View
          </span>
          {VIEWS.map(v => (
            <button
              key={v.key}
              className={`filter-btn${activeView === v.key ? ' active' : ''}`}
              onClick={() => updateFilter('activeView', v.key)}
              aria-label={`Switch to ${v.label} view`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && updateFilter('activeView', v.key)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
