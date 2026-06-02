import React, { useState } from 'react';
import {
  theoreticalFramework,
  driverTable,
  pipelineSteps,
  dataSources,
  dataLimitations,
  analyticalMethods,
} from '../data/methodology.js';

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="accordion-item">
      <button
        className="accordion-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        aria-label={`${open ? 'Collapse' : 'Expand'} ${title}`}
      >
        <span>{title}</span>
        <span style={{
          fontSize: 18,
          color: 'var(--colour-text-muted)',
          transition: 'transform 0.2s',
          transform: open ? 'rotate(180deg)' : 'none',
          display: 'inline-block',
        }}>
          ▾
        </span>
      </button>
      {open && (
        <div className="accordion-body">
          {children}
        </div>
      )}
    </div>
  );
}

export default function Methodology() {
  return (
    <section
      id="methodology"
      style={{
        borderTop: '1px solid var(--colour-border)',
        background: 'var(--colour-bg)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontSize: 32, marginBottom: 8 }}>Methodology</h2>
        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: 16,
          color: 'var(--colour-text-muted)',
          marginBottom: 40,
          maxWidth: 780,
          lineHeight: 1.7,
        }}>
          Full documentation of the CORDA index construction, data sources, and analytical methods.
        </p>

        {/* Section A */}
        <div style={{ marginBottom: 48 }}>
          <h3 style={{ fontSize: 22, borderBottom: '1px solid var(--colour-border-strong)', paddingBottom: 10, marginBottom: 28 }}>
            A — Methodology
          </h3>

          {/* Theoretical Framework */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ fontSize: 16, marginBottom: 10 }}>Theoretical Framework</h4>
            <p style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 15,
              color: 'var(--colour-text)',
              lineHeight: 1.7,
              marginBottom: 20,
              fontStyle: 'italic',
            }}>
              {theoreticalFramework}
            </p>

            {/* Driver table */}
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Driver</th>
                    <th>Theoretical Basis</th>
                    <th>AI Amplification Vector</th>
                  </tr>
                </thead>
                <tbody>
                  {driverTable.map(row => (
                    <tr key={row.code}>
                      <td>
                        <span style={{
                          fontFamily: "'Source Sans 3', system-ui, sans-serif",
                          fontSize: 12,
                          fontWeight: 700,
                          background: 'var(--colour-bg-overlay)',
                          border: '1px solid var(--colour-border)',
                          borderRadius: 4,
                          padding: '2px 6px',
                        }}>
                          {row.code}
                        </span>
                      </td>
                      <td style={{ fontWeight: 500 }}>{row.driver}</td>
                      <td style={{ color: 'var(--colour-text-muted)', fontSize: 13 }}>{row.theoryBasis}</td>
                      <td style={{ color: 'var(--colour-text-muted)', fontSize: 13 }}>{row.aiVector}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Eight-step pipeline */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ fontSize: 16, marginBottom: 14 }}>Eight-Step Construction Pipeline</h4>
            <div>
              {pipelineSteps.map(step => (
                <Accordion
                  key={step.step}
                  title={step.title}
                >
                  <ul style={{
                    margin: 0,
                    paddingLeft: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}>
                    {step.bullets.map((bullet, i) => (
                      <li key={i} style={{
                        fontFamily: "'Source Serif 4', Georgia, serif",
                        fontSize: 15,
                        color: 'var(--colour-text)',
                        lineHeight: 1.75,
                      }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </Accordion>
              ))}
            </div>
          </div>

          {/* Data sources */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ fontSize: 16, marginBottom: 14 }}>Data Sources</h4>
            <div style={{ overflowX: 'auto' }}>
              <table>
                <thead>
                  <tr>
                    <th>Source</th>
                    <th style={{ textAlign: 'center' }}>Indicators</th>
                    <th>Year Range</th>
                    <th style={{ textAlign: 'center' }}>Countries</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSources.map(row => (
                    <tr key={row.source}>
                      <td style={{ fontWeight: 500, fontSize: 14 }}>{row.source}</td>
                      <td style={{ textAlign: 'center', fontFamily: "'Source Sans 3', system-ui, sans-serif", fontSize: 13 }}>
                        {row.indicators}
                      </td>
                      <td style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif", fontSize: 13, color: 'var(--colour-text-muted)' }}>
                        {row.yearRange}
                      </td>
                      <td style={{ textAlign: 'center', fontFamily: "'Source Sans 3', system-ui, sans-serif", fontSize: 13, color: 'var(--colour-text-muted)' }}>
                        {row.countries}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Regime classification note */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ fontSize: 16, marginBottom: 14 }}>Regime Type Classification</h4>
            <p style={{
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: 15,
              color: 'var(--colour-text)',
              lineHeight: 1.75,
              marginBottom: 16,
            }}>
              The four regime categories used in the dashboard filters follow V-Dem's{' '}
              <em>Regimes of the World</em> (RoW) taxonomy, 2024 edition (V-Dem Dataset v14), with two
              labels adapted for general audiences. The original V-Dem categories "Electoral Autocracy"
              and "Closed Autocracy" are relabelled "Hybrid" and "Authoritarian" respectively.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                      fontFamily: "'Source Sans 3', system-ui, sans-serif",
                      fontSize: 14, fontWeight: 700, color: 'var(--colour-text)', marginBottom: 4,
                    }}>
                      {item.label}
                    </div>
                    <p style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: 14, color: 'var(--colour-text)', lineHeight: 1.7, margin: '0 0 6px',
                    }}>
                      {item.definition}
                    </p>
                    {item.note && (
                      <p style={{
                        fontFamily: "'Source Serif 4', Georgia, serif",
                        fontSize: 13, color: 'var(--colour-text-muted)',
                        fontStyle: 'italic', lineHeight: 1.65, margin: '0 0 6px',
                      }}>
                        {item.note}
                      </p>
                    )}
                    <p style={{
                      fontFamily: "'Source Sans 3', system-ui, sans-serif",
                      fontSize: 12, color: 'var(--colour-text-light)', margin: 0,
                    }}>
                      In this index: {item.countries}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p style={{
              fontFamily: "'Source Sans 3', system-ui, sans-serif",
              fontSize: 12, color: 'var(--colour-text-light)',
              marginTop: 12, lineHeight: 1.5,
            }}>
              Source: V-Dem Institute, Varieties of Democracy Dataset v14, Regimes of the World (RoW)
              indicator (v2x_regime), 2024 edition. Classifications are static and based on 2024 conditions.
              Regime type is used only as a filter dimension in the dashboard and does not affect any country's
              CORDA score.
            </p>
          </div>

          {/* Data limitations callout */}
          <div className="callout">
            <strong style={{ fontFamily: "'Source Sans 3', system-ui, sans-serif", fontSize: 13 }}>
              Data Limitations — Three items apply to this edition:
            </strong>
            <ol>
              {dataLimitations.map((lim, i) => (
                <li key={i} style={{ fontSize: 14, lineHeight: 1.6 }}>{lim}</li>
              ))}
            </ol>
          </div>
        </div>

        {/* Section B */}
        <div>
          <h3 style={{ fontSize: 22, borderBottom: '1px solid var(--colour-border-strong)', paddingBottom: 10, marginBottom: 28 }}>
            B — Analytical Methods
          </h3>
          <p style={{
            fontFamily: "'Source Serif 4', Georgia, serif",
            fontSize: 15,
            color: 'var(--colour-text-muted)',
            marginBottom: 20,
            lineHeight: 1.7,
          }}>
            Five quantitative methods are specified for the research paper. Method 5 is research-paper only and not visualised in this dashboard.
          </p>
          <div>
            {analyticalMethods.map(method => (
              <Accordion key={method.id} title={method.title}>
                <ul style={{
                  margin: 0,
                  paddingLeft: 20,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}>
                  {method.bullets.map((bullet, i) => (
                    <li key={i} style={{
                      fontFamily: "'Source Serif 4', Georgia, serif",
                      fontSize: 15,
                      color: 'var(--colour-text)',
                      lineHeight: 1.75,
                    }}>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
