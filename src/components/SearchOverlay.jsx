import React, { useEffect, useMemo, useRef, useState } from 'react';
import { searchSite } from '../data/searchIndex.js';

const SUGGESTIONS = ['Denmark', 'polarisation', 'V-Dem', 'imputation', 'elite defection', 'press freedom'];

export default function SearchOverlay({ open, onClose, onSelect }) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const results = useMemo(() => searchSite(query), [query]);

  useEffect(() => {
    if (!open) return;
    setQuery('');
    setCursor(0);
    const t = setTimeout(() => inputRef.current?.focus(), 40);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(c + 1, results.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)); }
      else if (e.key === 'Enter' && results[cursor]) { e.preventDefault(); onSelect(results[cursor]); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, results, cursor, onClose, onSelect]);

  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${cursor}"]`);
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search this site"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(22, 24, 29, 0.58)',
        backdropFilter: 'blur(3px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10vh 20px 24px',
        animation: 'corda-fade 0.18s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 760,
          background: '#fff',
          borderRadius: 14,
          boxShadow: '0 24px 70px rgba(0,0,0,0.32)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '78vh',
        }}
      >
        {/* Input row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: '18px 22px',
          borderBottom: '1px solid var(--colour-border)',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7" stroke="var(--mango-ink)" strokeWidth="2" />
            <path d="M16.5 16.5L21 21" stroke="var(--mango-ink)" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search countries, indicators, methodology…"
            aria-label="Search query"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 19,
              fontWeight: 500,
              color: 'var(--colour-text)',
              background: 'transparent',
            }}
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            style={{
              border: 'none',
              background: 'var(--colour-bg-card)',
              borderRadius: 6,
              padding: '5px 10px',
              cursor: 'pointer',
              fontFamily: "'Figtree', system-ui, sans-serif",
              fontSize: 12,
              fontWeight: 700,
              color: 'var(--colour-text-muted)',
              letterSpacing: '0.04em',
            }}
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div ref={listRef} style={{ overflowY: 'auto', padding: query.trim().length < 2 ? '22px' : '8px 0' }}>
          {query.trim().length < 2 && (
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Try searching for</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {SUGGESTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="filter-btn"
                    style={{ cursor: 'pointer' }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim().length >= 2 && results.length === 0 && (
            <div style={{ padding: '30px 22px', color: 'var(--colour-text-muted)', fontSize: 16 }}>
              No matches for <strong style={{ color: 'var(--colour-text)' }}>{query}</strong>.
            </div>
          )}

          {results.map((r, i) => (
            <button
              key={`${r.kind}-${r.title}-${i}`}
              data-idx={i}
              onMouseEnter={() => setCursor(i)}
              onClick={() => onSelect(r)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                border: 'none',
                borderLeft: `3px solid ${i === cursor ? 'var(--mango)' : 'transparent'}`,
                background: i === cursor ? 'var(--mango-pale)' : 'transparent',
                padding: '13px 22px',
                cursor: 'pointer',
                transition: 'background 0.1s',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 3 }}>
                <span style={{
                  fontFamily: "'Figtree', system-ui, sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: 'var(--colour-text)',
                  letterSpacing: '-0.01em',
                }}>
                  {r.title}
                </span>
                <span style={{
                  fontFamily: "'Figtree', system-ui, sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.09em',
                  color: 'var(--mango-ink)',
                  background: 'var(--mango-pale)',
                  padding: '2px 7px',
                  borderRadius: 3,
                  whiteSpace: 'nowrap',
                }}>
                  {r.kind}
                </span>
              </div>
              <div style={{
                fontFamily: "'Figtree', system-ui, sans-serif",
                fontSize: 14,
                lineHeight: 1.5,
                color: 'var(--colour-text-muted)',
              }}>
                {r.snippet}
              </div>
            </button>
          ))}
        </div>

        {results.length > 0 && (
          <div style={{
            borderTop: '1px solid var(--colour-border)',
            padding: '9px 22px',
            fontFamily: "'Figtree', system-ui, sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--colour-text-light)',
            display: 'flex',
            gap: 18,
          }}>
            <span>↑ ↓ to navigate</span>
            <span>↵ to open</span>
            <span>{results.length} result{results.length === 1 ? '' : 's'}</span>
          </div>
        )}
      </div>

      <style>{`
        @keyframes corda-fade { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}
