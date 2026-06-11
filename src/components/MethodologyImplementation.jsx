import React, { useState } from 'react';
import { previewBlocks, fullBlocks } from '../data/methodologyImplementation.js';

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return (
        <h3 style={{ fontSize: 20, marginTop: 32, marginBottom: 14 }}>{block.text}</h3>
      );
    case 'h3':
      return (
        <h4 style={{ fontSize: 16, marginTop: 24, marginBottom: 10 }}>{block.text}</h4>
      );
    case 'p':
      return (
        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: 15,
          lineHeight: 1.7,
          color: 'var(--colour-text)',
          marginBottom: 16,
        }}>
          {block.text}
        </p>
      );
    case 'note':
      return (
        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: 13,
          lineHeight: 1.6,
          color: 'var(--colour-text-muted)',
          fontStyle: 'italic',
          marginBottom: 16,
        }}>
          {block.text}
        </p>
      );
    case 'formula':
      return (
        <p style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: 15,
          fontStyle: 'italic',
          color: 'var(--colour-text)',
          background: 'var(--colour-bg-card)',
          border: '1px solid var(--colour-border)',
          borderRadius: 6,
          padding: '10px 16px',
          marginBottom: 16,
          textAlign: 'center',
        }}>
          {block.text}
        </p>
      );
    case 'list':
      return (
        <ul style={{
          fontFamily: "'Source Serif 4', Georgia, serif",
          fontSize: 15,
          lineHeight: 1.7,
          color: 'var(--colour-text)',
          marginBottom: 16,
          paddingLeft: 24,
        }}>
          {block.items.map((item, i) => <li key={i} style={{ marginBottom: 4 }}>{item}</li>)}
        </ul>
      );
    case 'table':
      return (
        <div style={{ marginBottom: 24, overflowX: 'auto' }}>
          {block.caption && (
            <div style={{
              fontFamily: "'Source Sans 3', system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--colour-text-muted)',
              marginBottom: 8,
            }}>
              {block.caption}
            </div>
          )}
          <table>
            <thead>
              <tr>
                {block.head.map((h, i) => <th key={i}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map((cell, ci) => (
                    <td key={ci} style={{ fontSize: 13, color: ci === 0 ? 'var(--colour-text)' : 'var(--colour-text-muted)' }}>
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export default function MethodologyImplementation() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section
      id="methodology-implementation"
      style={{
        borderTop: '1px solid var(--colour-border)',
        background: 'var(--colour-bg)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
        <h2 style={{ fontSize: 32, marginBottom: 8 }}>Methodology &amp; Implementation</h2>

        <div style={{ maxWidth: 900, marginTop: 32 }}>
          {previewBlocks.map((block, i) => <Block key={i} block={block} />)}

          {expanded && fullBlocks.map((block, i) => <Block key={`f${i}`} block={block} />)}

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24, marginBottom: 8 }}>
            <button
              onClick={() => setExpanded(e => !e)}
              className="filter-btn"
              style={{ fontWeight: 600 }}
              aria-expanded={expanded}
            >
              {expanded ? 'Show less ▴' : 'Expand to read full ▾'}
            </button>

            {expanded && (
              <a
                href="https://cdn.jsdelivr.net/gh/newlivehung123123/corda-dashboard@main/public/CORDA_Methodology_Implementation.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="filter-btn"
                style={{ fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
              >
                Download as PDF ↓
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
