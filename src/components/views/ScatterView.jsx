import React, { useState, useCallback } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine, Label,
} from 'recharts';
import { countries as allCountries } from '../../data/countries.js';
import { drivers } from '../../data/drivers.js';
import CountryCard from '../CountryCard.jsx';

const REGIME_COLOURS = {
  'Liberal Democracy': '#2B4C7E',
  'Electoral Democracy': '#76B7B2',
  'Hybrid': '#F28E2B',
  'Authoritarian': '#E15759',
};

const REGION_COLOURS = {
  'Europe': '#4E79A7',
  'Asia-Pacific': '#59A14F',
  'Americas': '#F28E2B',
  'Middle East & Africa': '#E15759',
};

const DRIVER_COLOURS = {
  corda: '#2B4C7E',
  d1: '#4E79A7',
  d2: '#F28E2B',
  d3: '#E15759',
  d4: '#76B7B2',
  d5: '#59A14F',
};

function getPointColour(country, colorBy, scoreKey) {
  if (colorBy === 'regime') return REGIME_COLOURS[country.regime] || '#999';
  if (colorBy === 'region') return REGION_COLOURS[country.region] || '#999';
  if (colorBy === 'score') {
    const val = country[scoreKey] / 100;
    const r = Math.round(43 + (245 - 43) * (1 - val));
    const g = Math.round(76 + (240 - 76) * (1 - val));
    const b = Math.round(126 + (232 - 126) * (1 - val));
    return `rgb(${r},${g},${b})`;
  }
  return '#2B4C7E';
}

function CustomDot({ cx, cy, payload, colorBy, scoreKey, isHighlighted, isFiltered }) {
  const colour = getPointColour(payload, colorBy, scoreKey);
  const r = isHighlighted ? 11 : 8;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={colour}
        fillOpacity={isFiltered ? 0.85 : 0.2}
        stroke={isHighlighted ? '#8B6914' : colour}
        strokeWidth={isHighlighted ? 2.5 : 1}
        style={{ cursor: 'pointer' }}
      />
      {isHighlighted && (
        <text
          x={cx + 13}
          y={cy + 4}
          fontFamily="'Source Sans 3', system-ui, sans-serif"
          fontSize={10}
          fontWeight={600}
          fill="#1A1A1A"
        >
          {payload.iso3}
        </text>
      )}
    </g>
  );
}

function CustomTooltipContent({ active, payload, onHover }) {
  React.useEffect(() => {
    if (active && payload?.length) {
      onHover(payload[0]?.payload || null);
    } else {
      onHover(null);
    }
  }, [active, payload, onHover]);
  return null;
}

export default function ScatterView({ filters, setFilters, pinnedCountry, setPinnedCountry }) {
  const { regions, regimes, highlightCountries, colorBy, scatterX, scatterY } = filters;
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const localColorBy = colorBy;
  const xKey = scatterX;
  const yKey = scatterY;

  const xDriver = drivers.find(d => d.key === xKey);
  const yDriver = drivers.find(d => d.key === yKey);

  const isFiltered = (c) =>
    (regions.length === 0 || regions.includes(c.region)) &&
    (regimes.length === 0 || regimes.includes(c.regime));

  const data = allCountries.map(c => ({
    ...c,
    x: c[xKey],
    y: c[yKey],
  }));

  const handleHover = useCallback((c) => setHoveredCountry(c || null), []);

  const handleClick = (data) => {
    if (!data?.activePayload?.length) return;
    const country = data.activePayload[0]?.payload;
    if (country) setPinnedCountry(prev => prev?.iso3 === country.iso3 ? null : country);
  };

  const handleViewProfile = (country) => {
    const el = document.getElementById('rankings');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setFilters(f => ({ ...f, highlightCountries: [country.name] }));
  };

  const quadrants = [
    { x: 72, y: 78, text: 'High Info / High State Cap.', anchor: 'middle' },
    { x: 25, y: 78, text: 'Low Info / High State Cap.', anchor: 'middle' },
    { x: 72, y: 22, text: 'High Info / Low State Cap.', anchor: 'middle' },
    { x: 25, y: 22, text: 'Low Info / Low State Cap.', anchor: 'middle' },
  ];

  return (
    <>
    <section id="scatter" style={{ padding: '48px 0', borderTop: '1px solid var(--colour-border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>Two-Axis Scatter Plot</h2>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 15,
            color: 'var(--colour-text-muted)',
            margin: '6px 0 0',
          }}>
            Explore relationships between any two drivers. Click a country to pin its profile card.
          </p>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 20, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <label style={{
              fontFamily: "'Source Sans 3', system-ui, sans-serif",
              fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.06em', color: 'var(--colour-text-muted)',
            }}>
              X-Axis
            </label>
            <select
              value={xKey}
              onChange={e => setFilters(f => ({ ...f, scatterX: e.target.value }))}
              aria-label="Select X axis score"
            >
              {drivers.map(d => <option key={d.key} value={d.key}>{d.shortLabel}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <label style={{
              fontFamily: "'Source Sans 3', system-ui, sans-serif",
              fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.06em', color: 'var(--colour-text-muted)',
            }}>
              Y-Axis
            </label>
            <select
              value={yKey}
              onChange={e => setFilters(f => ({ ...f, scatterY: e.target.value }))}
              aria-label="Select Y axis score"
            >
              {drivers.map(d => <option key={d.key} value={d.key}>{d.shortLabel}</option>)}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <label style={{
              fontFamily: "'Source Sans 3', system-ui, sans-serif",
              fontSize: 12, fontWeight: 600, textTransform: 'uppercase',
              letterSpacing: '0.06em', color: 'var(--colour-text-muted)',
            }}>
              Colour by
            </label>
            <select
              value={localColorBy}
              onChange={e => setFilters(f => ({ ...f, colorBy: e.target.value }))}
              aria-label="Colour points by"
            >
              <option value="regime">Regime type</option>
              <option value="region">Region</option>
              <option value="score">Score gradient</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          {/* Chart */}
          <div
            style={{ flex: 1, minWidth: 0 }}
            role="img"
            aria-label={`Scatter plot of ${xDriver?.label} vs ${yDriver?.label} for 27 countries`}
          >
            <ResponsiveContainer width="100%" height={500}>
              <ScatterChart
                margin={{ top: 20, right: 30, bottom: 40, left: 40 }}
                onClick={handleClick}
              >
                <CartesianGrid stroke="#D4CAAF" strokeDasharray="3 3" />
                <XAxis
                  type="number"
                  dataKey="x"
                  domain={[0, 100]}
                  name={xDriver?.shortLabel}
                  tick={{
                    fontFamily: "'Source Sans 3', system-ui, sans-serif",
                    fontSize: 11,
                    fill: '#5A5448',
                  }}
                  axisLine={{ stroke: '#D4CAAF' }}
                  tickLine={false}
                >
                  <Label
                    value={xDriver?.shortLabel || xKey}
                    position="insideBottom"
                    offset={-15}
                    style={{
                      fontFamily: "'Source Sans 3', system-ui, sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      fill: '#5A5448',
                    }}
                  />
                </XAxis>
                <YAxis
                  type="number"
                  dataKey="y"
                  domain={[0, 100]}
                  name={yDriver?.shortLabel}
                  tick={{
                    fontFamily: "'Source Sans 3', system-ui, sans-serif",
                    fontSize: 11,
                    fill: '#5A5448',
                  }}
                  axisLine={{ stroke: '#D4CAAF' }}
                  tickLine={false}
                >
                  <Label
                    value={yDriver?.shortLabel || yKey}
                    angle={-90}
                    position="insideLeft"
                    offset={10}
                    style={{
                      fontFamily: "'Source Sans 3', system-ui, sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      fill: '#5A5448',
                    }}
                  />
                </YAxis>

                {/* Midpoint reference lines */}
                <ReferenceLine
                  x={50}
                  stroke="#A89E7E"
                  strokeDasharray="5 3"
                  strokeWidth={1}
                />
                <ReferenceLine
                  y={50}
                  stroke="#A89E7E"
                  strokeDasharray="5 3"
                  strokeWidth={1}
                />

                <Tooltip
                  content={<CustomTooltipContent onHover={handleHover} />}
                  cursor={{ strokeDasharray: '3 3' }}
                />

                <Scatter
                  data={data}
                  shape={(props) => {
                    const country = props.payload;
                    const filtered = isFiltered(country);
                    const highlighted = highlightCountries.includes(country.name) ||
                      pinnedCountry?.iso3 === country.iso3;
                    return (
                      <CustomDot
                        {...props}
                        colorBy={localColorBy}
                        scoreKey={xKey}
                        isHighlighted={highlighted}
                        isFiltered={filtered}
                      />
                    );
                  }}
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* Pinned card — desktop side panel only */}
          {pinnedCountry && !isMobile && (
            <div style={{ width: 280, flexShrink: 0 }}>
              <CountryCard
                country={pinnedCountry}
                mode="pinned"
                onClose={() => setPinnedCountry(null)}
                onViewProfile={handleViewProfile}
              />
            </div>
          )}
        </div>

        {/* Tooltip hover card */}
        {hoveredCountry && !pinnedCountry && (
          <div style={{
            position: 'fixed',
            right: 40,
            bottom: 80,
            zIndex: 300,
            pointerEvents: 'none',
          }}>
            <CountryCard country={hoveredCountry} mode="tooltip" onViewProfile={handleViewProfile} />
          </div>
        )}

        {/* Legend */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 16,
          marginTop: 16,
          padding: '12px 0',
          borderTop: '1px solid var(--colour-border)',
        }}>
          {localColorBy === 'regime' && Object.entries(REGIME_COLOURS).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: v }} />
              <span style={{
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                fontSize: 12,
                color: 'var(--colour-text-muted)',
              }}>{k}</span>
            </div>
          ))}
          {localColorBy === 'region' && Object.entries(REGION_COLOURS).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: v }} />
              <span style={{
                fontFamily: "'Source Sans 3', system-ui, sans-serif",
                fontSize: 12,
                color: 'var(--colour-text-muted)',
              }}>{k}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Mobile bottom-sheet overlay */}
    {pinnedCountry && isMobile && (
      <div style={{ position:'fixed', inset:0, zIndex:400, background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'flex-end', justifyContent:'center' }}
        onClick={() => setPinnedCountry(null)}>
        <div style={{ width:'100%', maxWidth:480, padding:'0 12px 24px', maxHeight:'75vh', overflowY:'auto' }}
          onClick={e => e.stopPropagation()}>
          <CountryCard country={pinnedCountry} mode="pinned" onClose={() => setPinnedCountry(null)} onViewProfile={() => {}} />
        </div>
      </div>
    )}
    </>
  );
}
