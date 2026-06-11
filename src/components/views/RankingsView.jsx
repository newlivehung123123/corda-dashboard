import React, { useState, useCallback } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  Cell, ResponsiveContainer, LabelList,
} from 'recharts';
import { countries as allCountries } from '../../data/countries.js';
import { drivers, scoreDrivers } from '../../data/drivers.js';
import CountryCard from '../CountryCard.jsx';

const DRIVER_COLOURS = {
  d1: '#4E79A7',
  d2: '#F28E2B',
  d3: '#E15759',
  d4: '#76B7B2',
  d5: '#59A14F',
};

function isFiltered(country, regions, regimes) {
  const regionOk = regions.length === 0 || regions.includes(country.region);
  const regimeOk = regimes.length === 0 || regimes.includes(country.regime);
  return regionOk && regimeOk;
}

function CustomTooltipWrapper({ active, payload, coordinate, onHover }) {
  React.useEffect(() => {
    if (active && payload && payload.length > 0) {
      const c = payload[0]?.payload;
      if (c) onHover(c);
    } else {
      onHover(null);
    }
  }, [active, payload, onHover]);
  return null;
}

export default function RankingsView({ filters, setFilters, pinnedCountry, setPinnedCountry }) {
  const { scoreKey, regions, regimes, highlightCountries } = filters;
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const driver = drivers.find(d => d.key === scoreKey) || drivers[0];
  const driverColour = scoreKey === 'corda' ? '#2B4C7E' : DRIVER_COLOURS[scoreKey];

  const sorted = [...allCountries].sort((a, b) => b[scoreKey] - a[scoreKey]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const handleHover = useCallback((country) => {
    if (isMobile) return;
    setHoveredCountry(country || null);
  }, [isMobile]);

  const handleClick = (country) => {
    if (!country) return;
    setPinnedCountry(prev => prev?.iso3 === country.iso3 ? null : country);
  };

  const handleViewProfile = (country) => {
    const el = document.getElementById('rankings');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setFilters(f => ({ ...f, highlightCountries: [country.name] }));
  };
  const barHeight = isMobile ? 20 : 38;
  const yAxisWidth = isMobile ? 62 : 130;
  const leftMargin = isMobile ? 64 : 140;
  const rightMargin = isMobile ? 32 : 80;
  const labelFontSize = isMobile ? 9 : 12;
  const chartHeight = sorted.length * (barHeight + (isMobile ? 6 : 10)) + 60;

  const mobileLabel = (name) => {
    const abbr = {
      'United Kingdom': 'UK',
      'United States': 'USA',
      'United Arab Emirates': 'UAE',
      'New Zealand': 'N. Zealand',
      'South Korea': 'S. Korea',
      'South Africa': 'S. Africa',
    };
    return abbr[name] || name;
  };

  return (
    <section id="rankings" style={{ padding: '48px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ margin: 0 }}>Country Rankings</h2>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 15,
            color: 'var(--colour-text-muted)',
            margin: '6px 0 0',
          }}>
            {scoreKey === 'corda'
              ? 'Composite CORDA score (stacked bar = five driver contributions)'
              : `${driver.label} — ${driver.description.split('.')[0]}`}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          {/* Chart */}
          <div
            style={{ flex: 1, minWidth: 0 }}
            role="img"
            aria-label={`Bar chart ranking ${sorted.length} countries by ${driver.label}`}
          >
            <ResponsiveContainer width="100%" height={chartHeight}>
              <BarChart
                layout="vertical"
                data={sorted}
                margin={{ top: 8, right: rightMargin, left: leftMargin, bottom: 8 }}
                barSize={barHeight}
                onMouseMove={(state, event) => {
                  if (isMobile) return;
                  if (state.isTooltipActive && state.activePayload?.length && event) {
                    const e = event.nativeEvent || event;
                    setTooltipPos({ x: e.clientX, y: e.clientY });
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#D4CAAF" />
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tickCount={6}
                  tick={{
                    fontFamily: "'Source Sans 3', system-ui, sans-serif",
                    fontSize: 11,
                    fill: '#5A5448',
                  }}
                  tickLine={false}
                  axisLine={{ stroke: '#D4CAAF' }}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={yAxisWidth}
                  tick={({ x, y, payload }) => {
                    const country = sorted.find(c => c.name === payload.value);
                    const isHighlighted = highlightCountries.includes(payload.value);
                    const filtered = country ? isFiltered(country, regions, regimes) : true;
                    const label = isMobile ? mobileLabel(payload.value) : payload.value;
                    return (
                      <text
                        x={x - 4}
                        y={y}
                        textAnchor="end"
                        dominantBaseline="middle"
                        fontFamily="'Source Sans 3', system-ui, sans-serif"
                        fontSize={labelFontSize}
                        fill={filtered ? (isHighlighted ? '#2B4C7E' : '#1A1A1A') : '#C0B89A'}
                        fontWeight={isHighlighted ? 700 : 400}
                      >
                        {label}
                      </text>
                    );
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={
                    <CustomTooltipWrapper onHover={handleHover} />
                  }
                />

                {scoreKey === 'corda' ? (
                  scoreDrivers.map(driver => (
                    <Bar
                      key={driver.key}
                      dataKey={(row) => row[driver.key] / 5}
                      stackId="corda"
                      fill={DRIVER_COLOURS[driver.key]}
                      name={driver.shortLabel}
                      isAnimationActive={false}
                      onClick={(data) => handleClick(data)}
                      style={{ cursor: 'pointer' }}
                    >
                      {sorted.map(country => {
                        const filtered = isFiltered(country, regions, regimes);
                        const highlighted = highlightCountries.includes(country.name);
                        return (
                          <Cell
                            key={country.iso3}
                            fill={DRIVER_COLOURS[driver.key]}
                            fillOpacity={filtered ? 1 : 0.25}
                            stroke={highlighted ? '#8B6914' : 'none'}
                            strokeWidth={highlighted ? 2 : 0}
                          />
                        );
                      })}
                      {driver.key === 'd5' && (
                        <LabelList
                          dataKey="corda"
                          position="right"
                          content={({ x, y, width, height, value, index }) => {
                            const country = sorted[index];
                            const filtered = isFiltered(country, regions, regimes);
                            return (
                              <text
                                x={x + width + 6}
                                y={y + height / 2}
                                dominantBaseline="middle"
                                fontFamily="'Source Sans 3', system-ui, sans-serif"
                                fontSize={11}
                                fontWeight={600}
                                fill={filtered ? '#1A1A1A' : '#C0B89A'}
                              >
                                {country.corda.toFixed(1)}
                              </text>
                            );
                          }}
                        />
                      )}
                    </Bar>
                  ))
                ) : (
                  <Bar
                    dataKey={scoreKey}
                    fill={driverColour}
                    isAnimationActive={false}
                    onClick={(data) => handleClick(data)}
                    style={{ cursor: 'pointer' }}
                  >
                    {sorted.map(country => {
                      const filtered = isFiltered(country, regions, regimes);
                      const highlighted = highlightCountries.includes(country.name);
                      return (
                        <Cell
                          key={country.iso3}
                          fill={driverColour}
                          fillOpacity={filtered ? 1 : 0.25}
                          stroke={highlighted ? '#8B6914' : 'none'}
                          strokeWidth={highlighted ? 2 : 0}
                        />
                      );
                    })}
                    <LabelList
                      dataKey={scoreKey}
                      position="right"
                      content={({ x, y, width, height, value, index }) => {
                        const country = sorted[index];
                        const filtered = isFiltered(country, regions, regimes);
                        return (
                          <text
                            x={x + width + 6}
                            y={y + height / 2}
                            dominantBaseline="middle"
                            fontFamily="'Source Sans 3', system-ui, sans-serif"
                            fontSize={11}
                            fontWeight={600}
                            fill={filtered ? '#1A1A1A' : '#C0B89A'}
                          >
                            {(+value).toFixed(1)}
                          </text>
                        );
                      }}
                    />
                  </Bar>
                )}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pinned country card — side panel on desktop, fixed overlay on mobile */}
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

        {/* Pinned card mobile overlay */}
        {pinnedCountry && isMobile && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 400,
              background: 'rgba(0,0,0,0.35)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}
            onClick={() => setPinnedCountry(null)}
          >
            <div
              style={{
                width: '100%',
                maxWidth: 480,
                padding: '0 12px 24px',
                maxHeight: '75vh',
                overflowY: 'auto',
              }}
              onClick={e => e.stopPropagation()}
            >
              <CountryCard
                country={pinnedCountry}
                mode="pinned"
                onClose={() => setPinnedCountry(null)}
                onViewProfile={handleViewProfile}
              />
            </div>
          </div>
        )}

        {/* Hover tooltip */}
        {hoveredCountry && !pinnedCountry && !isMobile && (() => {
          const cardH = 320;
          const cardW = 280;
          const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
          const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
          const top = tooltipPos.y + cardH + 20 > vh
            ? tooltipPos.y - cardH - 10
            : tooltipPos.y + 20;
          const left = tooltipPos.x + cardW + 20 > vw
            ? tooltipPos.x - cardW - 10
            : tooltipPos.x + 20;
          return (
          <div style={{
            position: 'fixed',
            left: Math.max(8, left),
            top: Math.max(8, top),
            zIndex: 300,
            pointerEvents: 'none',
          }}>
            <CountryCard
              country={hoveredCountry}
              mode="tooltip"
              onViewProfile={handleViewProfile}
            />
          </div>
          );
        })()}

        {/* Legend */}
        {scoreKey === 'corda' && (
          <div style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            marginTop: 20,
            padding: '16px 0 0',
            borderTop: '1px solid var(--colour-border)',
          }}>
            {scoreDrivers.map(d => (
              <div key={d.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: 2,
                  background: DRIVER_COLOURS[d.key],
                }} />
                <span style={{
                  fontFamily: "'Source Sans 3', system-ui, sans-serif",
                  fontSize: 12,
                  color: 'var(--colour-text-muted)',
                }}>
                  {d.shortLabel}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
