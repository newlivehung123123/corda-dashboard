import React, { useMemo } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';
import { interpolate } from 'd3-interpolate';
import { countries as allCountries } from '../../data/countries.js';
import { drivers } from '../../data/drivers.js';
import CountryCard from '../CountryCard.jsx';
import { setHoverProfile, clearHoverProfile } from '../HoverProfile.jsx';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// ISO numeric to ISO3 mapping for CORDA countries
const ISO_NUM_TO_ISO3 = {
  '208': 'DNK', '752': 'SWE', '276': 'DEU', '528': 'NLD', '392': 'JPN',
  '036': 'AUS', '124': 'CAN', '826': 'GBR', '554': 'NZL', '250': 'FRA',
  '158': 'TWN', '152': 'CHL', '410': 'KOR', '616': 'POL', '840': 'USA',
  '376': 'ISR', '702': 'SGP', '076': 'BRA', '288': 'GHA', '710': 'ZAF',
  '360': 'IDN', '356': 'IND', '484': 'MEX', '566': 'NGA', '784': 'ARE',
  '050': 'BGD', '156': 'CHN',
};

// Some world-atlas uses different name forms; map those too
const NAME_TO_ISO3 = {
  'Denmark': 'DNK', 'Sweden': 'SWE', 'Germany': 'DEU', 'Netherlands': 'NLD',
  'Japan': 'JPN', 'Australia': 'AUS', 'Canada': 'CAN', 'United Kingdom': 'GBR',
  'New Zealand': 'NZL', 'France': 'FRA', 'Taiwan': 'TWN', 'Chile': 'CHL',
  'South Korea': 'KOR', 'Republic of Korea': 'KOR', 'Poland': 'POL',
  'United States of America': 'USA', 'United States': 'USA', 'Israel': 'ISR',
  'Singapore': 'SGP', 'Brazil': 'BRA', 'Ghana': 'GHA', 'South Africa': 'ZAF',
  'Indonesia': 'IDN', 'India': 'IND', 'Mexico': 'MEX', 'Nigeria': 'NGA',
  'United Arab Emirates': 'ARE', 'Bangladesh': 'BGD', 'China': 'CHN',
};

const countryMap = Object.fromEntries(allCountries.map(c => [c.iso3, c]));

// White → mango → burnt mango. Three stops rather than two so lightness keeps
// falling across the whole range; a straight white-to-mango ramp bunches the
// high scores together because mango itself is a light colour.
const RAMP = [
  { t: 0.00, rgb: [255, 255, 255] },
  { t: 0.55, rgb: [255, 166,  43] },  // --mango
  { t: 1.00, rgb: [140,  61,   4] },  // --mango-burnt
];

function getScoreColour(score) {
  if (score === undefined || score === null) return '#E0E0E0';
  const t = Math.max(0, Math.min(1, score / 100));
  const i = t <= RAMP[1].t ? 0 : 1;
  const a = RAMP[i];
  const b = RAMP[i + 1];
  const f = (t - a.t) / (b.t - a.t);
  const [r, g, bl] = a.rgb.map((v, k) => Math.round(v + (b.rgb[k] - v) * f));
  return `rgb(${r},${g},${bl})`;
}

function getCountryFromGeo(geo) {
  const numId = String(geo.id).padStart(3, '0');
  const iso3ByNum = ISO_NUM_TO_ISO3[numId];
  if (iso3ByNum) return countryMap[iso3ByNum] || null;
  const name = geo.properties?.name;
  if (name && NAME_TO_ISO3[name]) return countryMap[NAME_TO_ISO3[name]] || null;
  return null;
}

export default function MapView({ filters, setFilters, pinnedCountry, setPinnedCountry }) {
  const { scoreKey, regions, regimes } = filters;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;

  const driver = drivers.find(d => d.key === scoreKey) || drivers[0];

  const isFiltered = (c) =>
    (regions.length === 0 || regions.includes(c.region)) &&
    (regimes.length === 0 || regimes.includes(c.regime));

  const handleViewProfile = (country) => {
    const el = document.getElementById('rankings');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setFilters(f => ({ ...f, highlightCountries: [country.name] }));
  };

  // Legend gradient stops
  const legendStops = [0, 25, 50, 75, 100];

  return (
    <>
    <section id="map" style={{ padding: '48px 0', borderTop: '1px solid var(--colour-border)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ margin: 0, fontSize: 'clamp(24px, 2.4vw, 34px)', letterSpacing: '-0.016em' }}>World Map</h2>
          <p style={{
            fontFamily: "'Figtree', system-ui, sans-serif",
            fontSize: 15,
            color: 'var(--colour-text-muted)',
            margin: '6px 0 0',
          }}>
            Choropleth map — darker mango = higher {driver.shortLabel} score. Grey = not in CORDA sample.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 24 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Map */}
            <div
              style={{
                background: 'var(--colour-bg-card)',
                border: '1px solid var(--colour-border)',
                borderRadius: 6,
                overflow: 'hidden',
                boxShadow: '0 2px 8px var(--colour-shadow)',
              }}
              role="img"
              aria-label={`World map showing CORDA ${driver.label} scores across 27 countries`}
            >
              <ComposableMap
                projection="geoNaturalEarth1"
                projectionConfig={{ scale: 155 }}
                style={{ width: '100%', height: 'auto' }}
              >
                <ZoomableGroup>
                  <Geographies geography={GEO_URL}>
                    {({ geographies }) =>
                      geographies.map(geo => {
                        const country = getCountryFromGeo(geo);
                        const score = country ? country[scoreKey] : undefined;
                        const filtered = country ? isFiltered(country) : false;
                        const fill = country
                          ? (filtered ? getScoreColour(score) : '#D4D4D4')
                          : '#E0E0E0';
                        const isPinned = pinnedCountry && country?.iso3 === pinnedCountry.iso3;

                        return (
                          <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill={fill}
                            stroke={isPinned ? '#22252C' : '#D4D4D4'}
                            strokeWidth={isPinned ? 1.6 : 0.5}
                            // The hovered outline used to come from component
                            // state, which redrew all 177 landmasses on every
                            // pointer move. Each shape tracks its own hover
                            // instead, so only the one under the cursor redraws.
                            style={{
                              default: { outline: 'none', transition: 'fill 0.2s' },
                              hover: {
                                outline: 'none',
                                fill: country ? '#22252C' : fill,
                                stroke: country ? '#22252C' : '#D4D4D4',
                                strokeWidth: country ? 1.6 : 0.5,
                                cursor: country ? 'pointer' : 'default',
                              },
                              pressed: { outline: 'none' },
                            }}
                            onMouseEnter={(e) => {
                              if (country) setHoverProfile(country, e.clientX, e.clientY);
                            }}
                            onMouseMove={(e) => {
                              if (country) setHoverProfile(country, e.clientX, e.clientY);
                              else clearHoverProfile();
                            }}
                            onMouseLeave={clearHoverProfile}
                            onClick={() => {
                              if (country) {
                                setPinnedCountry(prev => prev?.iso3 === country.iso3 ? null : country);
                              }
                            }}
                            tabIndex={country ? 0 : -1}
                            aria-label={country ? `${country.name}: ${country[scoreKey].toFixed(1)}` : undefined}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && country) {
                                setPinnedCountry(prev => prev?.iso3 === country.iso3 ? null : country);
                              }
                            }}
                          />
                        );
                      })
                    }
                  </Geographies>
                </ZoomableGroup>
              </ComposableMap>
            </div>

            {/* Legend */}
            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{
                fontFamily: "'Figtree', system-ui, sans-serif",
                fontSize: 11,
                color: 'var(--colour-text-muted)',
                whiteSpace: 'nowrap',
              }}>
                0
              </span>
              <div style={{
                flex: 1,
                height: 14,
                borderRadius: 7,
                background: 'linear-gradient(to right, #FFFFFF 0%, #FFA62B 55%, #8C3D04 100%)',
                border: '1px solid var(--colour-border)',
                position: 'relative',
              }}>
                {legendStops.slice(1, -1).map(v => (
                  <div key={v} style={{
                    position: 'absolute',
                    left: `${v}%`,
                    top: '100%',
                    transform: 'translateX(-50%)',
                    marginTop: 3,
                    fontFamily: "'Figtree', system-ui, sans-serif",
                    fontSize: 10,
                    color: 'var(--colour-text-muted)',
                  }}>
                    {v}
                  </div>
                ))}
              </div>
              <span style={{
                fontFamily: "'Figtree', system-ui, sans-serif",
                fontSize: 11,
                color: 'var(--colour-text-muted)',
                whiteSpace: 'nowrap',
              }}>
                100
              </span>
            </div>

            {/* Hovering a country now opens its full profile, drawn once at
                the app level from a store this map only writes to, in place of
                the name-and-score chip that used to sit here. */}
          </div>

          {/* Pinned country card — desktop side panel only */}
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
      </div>
    </section>

    {/* Mobile bottom-sheet overlay */}
    {pinnedCountry && isMobile && (
      <div style={{ position:'fixed', inset:0, zIndex:400, background:'rgba(0,0,0,0.35)', display:'flex', alignItems:'flex-end', justifyContent:'center' }}
        onClick={() => setPinnedCountry(null)}>
        <div style={{ width:'100%', maxWidth:480, padding:'0 12px 24px', maxHeight:'75vh', overflowY:'auto' }}
          onClick={e => e.stopPropagation()}>
          <CountryCard country={pinnedCountry} mode="pinned" onClose={() => setPinnedCountry(null)} onViewProfile={handleViewProfile} />
        </div>
      </div>
    )}
    </>
  );
}
