import React, { useSyncExternalStore } from 'react';
import CountryCard from './CountryCard.jsx';

/**
 * What the pointer is over, and where it is, held outside React.
 *
 * Each view used to keep this in its own component state, so every pixel of
 * mouse movement re-rendered the whole plot. On the rankings that meant five
 * stacked bar series, 135 cells and a label list rebuilt tens of times a
 * second, and the profile arrived late as a result. Publishing to a store
 * instead means a hover repaints the card and nothing else: the chart holds no
 * hover state, so React has nothing to reconcile there.
 */
let current = { country: null, x: 0, y: 0 };
let queued = null;
let frame = 0;
const listeners = new Set();

function flush() {
  frame = 0;
  const next = queued;
  queued = null;
  if (!next) return;
  if (next.country === current.country && next.x === current.x && next.y === current.y) return;
  current = next;
  listeners.forEach(fn => fn());
}

/**
 * A pointer emits far more move events than the screen has frames, so only the
 * most recent position in any frame is ever published.
 */
export function setHoverProfile(country, x, y) {
  if (!country) {
    clearHoverProfile();
    return;
  }
  queued = { country, x, y };
  if (!frame) frame = requestAnimationFrame(flush);
}

export function clearHoverProfile() {
  queued = null;
  if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
  if (!current.country) return;
  current = { country: null, x: current.x, y: current.y };
  listeners.forEach(fn => fn());
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

const getSnapshot = () => current;

const CARD_W = 260;
const CARD_H = 320;
const GAP = 18;

export default function HoverProfile({ hidden, onViewProfile }) {
  const { country, x, y } = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  if (hidden || !country) return null;
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (vw < 640) return null;        // no hover card on touch layouts

  // Sit beside the cursor, flipping to its other side rather than running off
  // the edge of the screen.
  const left = x + CARD_W + GAP > vw ? x - CARD_W - GAP : x + GAP;
  const top = y + CARD_H + GAP > vh ? y - CARD_H - GAP : y + GAP;

  return (
    <div
      style={{
        position: 'fixed',
        left: Math.max(8, Math.min(left, vw - CARD_W - 8)),
        top: Math.max(8, Math.min(top, vh - CARD_H - 8)),
        zIndex: 300,
        pointerEvents: 'none',
      }}
    >
      <CountryCard country={country} mode="tooltip" onViewProfile={onViewProfile} />
    </div>
  );
}
