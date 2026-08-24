import React from 'react';
import { dataLimitations } from '../data/methodology.js';

export default function RegimeClassification() {
  return (
    <section
      id="regime-classification"
      style={{ background: 'var(--mango-pale)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(56px, 6.5vw, 92px) 24px' }}>
        <p className="eyebrow">Taxonomy</p>
        <h2 style={{ margin: '0 0 28px' }}>Regime Type Classification</h2>

        <p style={{
          fontFamily: "'Figtree', system-ui, sans-serif",
          fontSize: 15,
          color: 'var(--colour-text)',
          lineHeight: 1.75,
          marginBottom: 16,
          maxWidth: 900,
        }}>
          The four regime categories used in the dashboard filters follow V-Dem's{' '}
          <em>Regimes of the World</em> (RoW) taxonomy, 2024 edition (V-Dem Dataset v14), with two
          labels adapted for general audiences. The original V-Dem categories "Electoral Autocracy"
          and "Closed Autocracy" are relabelled "Hybrid" and "Authoritarian" respectively.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxWidth: 900 }}>
          {[
            {
              label: 'Liberal Democracy',
              colour: '#2B4C7E',
              definition: 'Free and fair elections are held, civil liberties are broadly protected, the rule of law is maintained, and judicial independence is intact. The elected government is accountable and constrained by institutional checks.',
              countries: 'Denmark, Sweden, Germany, Netherlands, Japan, Australia, Canada, United Kingdom, New Zealand, France, Taiwan, South Korea',
            },
            {
              label: 'Electoral Democracy',
              colour: '#76B7B2',
              definition: 'Competitive multiparty elections are held in practice, but meaningful erosion has occurred in at least one dimension — civil liberties, press freedom, judicial independence, or minority rights. V-Dem classifies a country as electoral rather than liberal when its liberal component index (v2x_liberal) falls below a threshold even if elections remain competitive.',
              countries: 'Chile, Poland, United States, Israel, Brazil, Ghana, South Africa, Indonesia, India',
              note: 'The United States, Israel, and Poland are classified as Electoral Democracies in V-Dem\'s 2024 data — not as a political judgement by the CORDA team, but as a direct reflection of V-Dem\'s quantitative assessment of constraints on civil liberties and judicial independence in those countries.',
            },
            {
              label: 'Hybrid',
              colour: '#F28E2B',
              definition: 'Elections exist but are substantially unfree or unfair, opposition is significantly constrained, and executive power faces insufficient institutional checks. Civil society and press freedom are meaningfully restricted. (V-Dem original label: Electoral Autocracy)',
              countries: 'Singapore, Mexico, Nigeria, Bangladesh',
            },
            {
              label: 'Authoritarian',
              colour: '#E15759',
              definition: 'No meaningful electoral competition exists; fundamental civil and political rights are suppressed at the systemic level. (V-Dem original label: Closed Autocracy)',
              countries: 'United Arab Emirates, China',
            },
          ].map(item => (
            <div key={item.label} style={{
              display: 'flex', gap: 14, alignItems: 'flex-start',
              paddingBottom: 12,
              borderBottom: '1px solid var(--colour-border)',
            }}>
              <div style={{
                width: 12, height: 12, borderRadius: 2,
                background: item.colour, flexShrink: 0, marginTop: 5,
              }} />
              <div>
                <div style={{
                  fontFamily: "'Figtree', system-ui, sans-serif",
                  fontSize: 14, fontWeight: 700, color: 'var(--colour-text)', marginBottom: 4,
                }}>
                  {item.label}
                </div>
                <p style={{
                  fontFamily: "'Figtree', system-ui, sans-serif",
                  fontSize: 14, color: 'var(--colour-text)', lineHeight: 1.7, margin: '0 0 6px',
                }}>
                  {item.definition}
                </p>
                {item.note && (
                  <p style={{
                    fontFamily: "'Figtree', system-ui, sans-serif",
                    fontSize: 13, color: 'var(--colour-text-muted)',
                    fontStyle: 'italic', lineHeight: 1.65, margin: '0 0 6px',
                  }}>
                    {item.note}
                  </p>
                )}
                <p style={{
                  fontFamily: "'Figtree', system-ui, sans-serif",
                  fontSize: 12, color: 'var(--colour-text-light)', margin: 0,
                }}>
                  In this index: {item.countries}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p style={{
          fontFamily: "'Figtree', system-ui, sans-serif",
          fontSize: 12, color: 'var(--colour-text-light)',
          marginTop: 12, lineHeight: 1.5, maxWidth: 900,
        }}>
          Source: V-Dem Institute, Varieties of Democracy Dataset v14, Regimes of the World (RoW)
          indicator (v2x_regime), 2024 edition. Classifications are static and based on 2024 conditions.
          Regime type is used only as a filter dimension in the dashboard and does not affect any country's
          CORDA score.
        </p>

        {/* Data limitations callout */}
        <div className="callout" style={{ maxWidth: 900, marginTop: 32 }}>
          <strong style={{ fontFamily: "'Figtree', system-ui, sans-serif", fontSize: 13 }}>
            Data Limitations — Three items apply to this edition:
          </strong>
          <ol>
            {dataLimitations.map((lim, i) => (
              <li key={i} style={{ fontSize: 14, lineHeight: 1.6 }}>{lim}</li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
