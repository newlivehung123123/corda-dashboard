import React, { useState } from 'react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Legend, Tooltip,
} from 'recharts';
import { countries as allCountries } from '../../data/countries.js';
import { scoreDrivers } from '../../data/drivers.js';
import CountryCard from '../CountryCard.jsx';

const DRIVER_COLOURS = {
  d1: '#4E79A7',
  d2: '#F28E2B',
  d3: '#E15759',
  d4: '#76B7B2',
  d5: '#59A14F',
};

const RADAR_FILLS = [
  '#2B4C7E',
  '#E15759',
  '#59A14F',
  '#F28E2B',
  '#76B7B2',
];

function buildRadarData(country) {
  return scoreDrivers.map(d => ({
    subject: d.shortLabel,
    value: country[d.key],
    fullMark: 100,
    key: d.key,
  }));
}

function globalMeanData() {
  const mean = {};
  scoreDrivers.forEach(d => {
    mean[d.key] = allCountries.reduce((s, c) => s + c[d.key], 0) / allCountries.length;
  });
  return scoreDrivers.map(d => ({
    subject: d.shortLabel,
    value: +mean[d.key].toFixed(1),
    fullMark: 100,
    key: d.key,
  }));
}

function SingleRadar({ country, showMean = true, fillColour = '#2B4C7E', opacity = 0.7 }) {
  const data = buildRadarData(country);
  const meanData = globalMeanData();
  const isNZ = country.iso3 === 'NZL';

  return (
    <div style={{
      background: 'var(--colour-bg-card)',
      border: '1px solid var(--colour-border)',
      borderRadius: 6,
      padding: '20px 16px 12px',
      boxShadow: '0 2px 8px var(--colour-shadow)',
    }}>
      <div style={{
        fontFamily: "'Figtree', system-ui, sans-serif",
        fontWeight: 700,
        fontSize: 14,
        color: 'var(--colour-text)',
        marginBottom: 4,
        textAlign: 'center',
      }}>
        {country.name}
      </div>
      <div style={{
        fontFamily: "'Figtree', system-ui, sans-serif",
        fontSize: 11,
        color: 'var(--colour-text-muted)',
        textAlign: 'center',
        marginBottom: 8,
      }}>
        CORDA {country.corda.toFixed(1)} · Rank #{country.rank}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={data} margin={{ top: 8, right: 20, bottom: 8, left: 20 }}>
          <PolarGrid stroke="#D4D4D4" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 10,
              fill: '#5A5448',
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tickCount={5}
            tick={{ fontSize: 9, fill: '#8C8375' }}
            axisLine={false}
          />
          {showMean && (
            <Radar
              name="Global Mean"
              dataKey="value"
              data={meanData}
              stroke="#BDBDBD"
              fill="#BDBDBD"
              fillOpacity={0.15}
              strokeDasharray="4 2"
            />
          )}
          <Radar
            name={country.name}
            dataKey="value"
            stroke={fillColour}
            fill={fillColour}
            fillOpacity={opacity}
            strokeWidth={2}
          />
          <Tooltip
            formatter={(value, name) => [`${value.toFixed(1)}`, name]}
            contentStyle={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 12,
              background: 'var(--colour-bg-card)',
              border: '1px solid var(--colour-border)',
              borderRadius: 4,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>

      {isNZ && (
        <div style={{
          marginTop: 8,
          padding: '8px 10px',
          background: '#F5F5F5',
          border: '1px solid var(--colour-accent-2)',
          borderRadius: 4,
          fontSize: 11,
          color: 'var(--colour-text-muted)',
          fontStyle: 'italic',
          lineHeight: 1.5,
        }}>
          ⚠️ NZ ranks 9th on linear aggregation; shifts to ~19th under geometric mean due to low D5 score (53.7). See Methodology.
        </div>
      )}
    </div>
  );
}

function DefaultOverlayRadar() {
  const denmark = allCountries.find(c => c.iso3 === 'DNK');
  const israel  = allCountries.find(c => c.iso3 === 'ISR');
  const china   = allCountries.find(c => c.iso3 === 'CHN');

  const denmarkData = buildRadarData(denmark);
  const israelData  = buildRadarData(israel);
  const chinaData   = buildRadarData(china);

  return (
    <div style={{
      background: 'var(--colour-bg-card)',
      border: '1px solid var(--colour-border)',
      borderRadius: 6,
      padding: '20px 24px',
      boxShadow: '0 2px 8px var(--colour-shadow)',
      gridColumn: '1 / -1',
    }}>
      <h3 style={{ marginBottom: 4, fontSize: 16 }}>Reference Comparison</h3>
      <p style={{
        fontFamily: "'Figtree', system-ui, sans-serif",
        fontSize: 13,
        color: 'var(--colour-text-muted)',
        marginBottom: 16,
      }}>
        Default view: Global median (Israel #16), top-ranked (Denmark #1), and bottom-ranked (China #27) countries overlaid.
      </p>

      <ResponsiveContainer width="100%" height={320}>
        <RadarChart data={denmarkData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="#D4D4D4" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 11,
              fill: '#5A5448',
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tickCount={5}
            tick={{ fontSize: 9, fill: '#8C8375' }}
            axisLine={false}
          />
          <Radar
            name="China (Rank 27)"
            dataKey="value"
            data={chinaData}
            stroke="#E15759"
            fill="#E15759"
            fillOpacity={0.2}
            strokeWidth={2}
          />
          <Radar
            name="Israel (Rank 16 — Median)"
            dataKey="value"
            data={israelData}
            stroke="#F28E2B"
            fill="#F28E2B"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Radar
            name="Denmark (Rank 1)"
            dataKey="value"
            data={denmarkData}
            stroke="#2B4C7E"
            fill="#2B4C7E"
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <Legend
            iconType="circle"
            wrapperStyle={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 12,
            }}
          />
          <Tooltip
            formatter={(value, name) => [`${value.toFixed(1)}`, name]}
            contentStyle={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 12,
              background: 'var(--colour-bg-card)',
              border: '1px solid var(--colour-border)',
              borderRadius: 4,
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function RadarView({ filters, setFilters, pinnedCountry, setPinnedCountry }) {
  const { regions, regimes } = filters;
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [searchVal, setSearchVal] = useState('');

  const filtered = allCountries.filter(c => {
    const rOk = regions.length === 0 || regions.includes(c.region);
    const gOk = regimes.length === 0 || regimes.includes(c.regime);
    return rOk && gOk;
  });

  const handleSelect = (country) => {
    setSelectedCountries(prev => {
      if (prev.find(c => c.iso3 === country.iso3)) {
        return prev.filter(c => c.iso3 !== country.iso3);
      }
      if (prev.length >= 6) return prev;
      return [...prev, country];
    });
  };

  const displayCountries = selectedCountries.length > 0 ? selectedCountries : null;

  return (
    <section id="radar" style={{ padding: '48px 0', borderTop: '1px solid var(--colour-border)' }}>
      <div style={{ maxWidth: 'var(--shell)', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 'var(--fs-h2s)', letterSpacing: '-0.016em' }}>Driver Profiles — Radar Chart</h2>
            <p style={{
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 'var(--fs-note)',
              color: 'var(--colour-text-muted)',
              margin: '6px 0 0',
            }}>
              Five-driver breakdown for each country. Select up to 6 countries to compare.
            </p>
          </div>

          {/* Country selector */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, maxWidth: 500 }}>
            <input
              type="text"
              placeholder="Search country…"
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
              aria-label="Search country for radar chart"
              style={{
                fontFamily: "'Figtree', system-ui, sans-serif",
                fontSize: 13,
                border: '1px solid var(--colour-border)',
                borderRadius: 6,
                padding: '6px 10px',
                background: 'var(--colour-bg-card)',
                color: 'var(--colour-text)',
                width: 160,
              }}
            />
            {searchVal && filtered
              .filter(c => c.name.toLowerCase().includes(searchVal.toLowerCase()))
              .slice(0, 8)
              .map(c => (
                <button
                  key={c.iso3}
                  onClick={() => { handleSelect(c); setSearchVal(''); }}
                  className="filter-btn"
                  style={{
                    background: selectedCountries.find(s => s.iso3 === c.iso3)
                      ? 'var(--colour-accent)' : undefined,
                    color: selectedCountries.find(s => s.iso3 === c.iso3) ? '#fff' : undefined,
                    borderColor: selectedCountries.find(s => s.iso3 === c.iso3)
                      ? 'var(--colour-accent)' : undefined,
                  }}
                >
                  {c.name}
                </button>
              ))}
            {selectedCountries.length > 0 && (
              <button
                className="filter-btn"
                onClick={() => setSelectedCountries([])}
                style={{ color: 'var(--colour-text-muted)' }}
              >
                Clear all
              </button>
            )}
          </div>
        </div>

        {/* Selected chips */}
        {selectedCountries.length > 0 && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {selectedCountries.map((c, i) => (
              <div key={c.iso3} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'var(--colour-bg-card)',
                border: `2px solid ${RADAR_FILLS[i % RADAR_FILLS.length]}`,
                borderRadius: 20,
                padding: '4px 10px 4px 12px',
              }}>
                <span style={{
                  fontFamily: "'Figtree', system-ui, sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                }}>
                  {c.name}
                </span>
                <button
                  onClick={() => handleSelect(c)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--colour-text-muted)', fontSize: 14, padding: 0, lineHeight: 1,
                  }}
                  aria-label={`Remove ${c.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Grid of radars */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: displayCountries
            ? `repeat(${Math.min(3, displayCountries.length)}, 1fr)`
            : '1fr',
          gap: 24,
        }}>
          {displayCountries
            ? displayCountries.map((c, i) => (
              <SingleRadar
                key={c.iso3}
                country={c}
                showMean={true}
                fillColour={RADAR_FILLS[i % RADAR_FILLS.length]}
                opacity={0.55}
              />
            ))
            : <DefaultOverlayRadar />
          }
        </div>
      </div>
    </section>
  );
}
