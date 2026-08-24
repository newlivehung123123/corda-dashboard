import React, { useCallback, useState, useRef } from 'react';
import Header from './components/Header.jsx';
import HeroSlideshow from './components/HeroSlideshow.jsx';
import HeroIntro from './components/HeroIntro.jsx';
import CategoryGrid from './components/CategoryGrid.jsx';
import SearchOverlay from './components/SearchOverlay.jsx';
import FilterBar from './components/FilterBar.jsx';
import RankingsView from './components/views/RankingsView.jsx';
import ScatterView from './components/views/ScatterView.jsx';
import MapView from './components/views/MapView.jsx';
import HoverProfile from './components/HoverProfile.jsx';
import MissionVision from './components/MissionVision.jsx';
import MethodologyImplementation from './components/MethodologyImplementation.jsx';
import ResourceLinks from './components/ResourceLinks.jsx';
import RegimeClassification from './components/RegimeClassification.jsx';
import AnalyticalMethods from './components/AnalyticalMethods.jsx';
import Footer from './components/Footer.jsx';
import { countries } from './data/countries.js';

export default function App() {
  const [filters, setFilters] = useState({
    activeView: 'rankings',
    scoreKey: 'corda',
    regions: [],
    regimes: [],
    highlightCountries: [],
    scatterX: 'd2',
    scatterY: 'd4',
    colorBy: 'regime',
  });

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [pinnedCountry, setPinnedCountry] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const { activeView } = filters;
  const viewRef = useRef(null);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  }, []);

  const handleViewProfile = useCallback((country) => {
    scrollToSection('rankings');
    setFilters(f => ({ ...f, highlightCountries: [country.name] }));
  }, [scrollToSection]);

  // A search hit carries a target section, and sometimes a country to spotlight.
  const handleSearchSelect = useCallback((entry) => {
    setSearchOpen(false);
    if (entry.country) {
      const match = countries.find(c => c.name === entry.country);
      setFilters(f => ({ ...f, highlightCountries: [entry.country] }));
      if (match) setPinnedCountry(match);
    }
    // Let the overlay unmount and the body scroll lock lift first.
    setTimeout(() => scrollToSection(entry.target), 60);
  }, [scrollToSection]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onOpenSearch={() => setSearchOpen(true)} onNavigate={scrollToSection} />

      <HeroSlideshow onNavigate={scrollToSection} />
      <HeroIntro />
      <CategoryGrid onNavigate={scrollToSection} />

      {/* ── Data & Ranking ─────────────────────────────────────────────── */}
      <section id="data-ranking" style={{ background: 'var(--colour-bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(56px, 6.5vw, 88px) 24px 28px' }}>
          <p className="eyebrow">Explore the data</p>
          <h2 style={{ margin: '0 0 14px', maxWidth: 820 }}>Data &amp; Ranking</h2>
          <p
            style={{
              fontSize: 'clamp(16px, 1.4vw, 18px)',
              lineHeight: 1.65,
              color: 'var(--colour-text-muted)',
              maxWidth: 780,
              margin: 0,
            }}
          >
            Rank the 27 countries on the composite index or on any single driver, compare two
            drivers against each other, read the scores off the world map, and open any country
            for its full profile. Filters apply across all three views.
          </p>
        </div>

        <FilterBar filters={filters} setFilters={setFilters} />

        <main ref={viewRef} style={{ flex: 1 }}>
          {activeView === 'rankings' && (
            <RankingsView
              filters={filters}
              setFilters={setFilters}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              pinnedCountry={pinnedCountry}
              setPinnedCountry={setPinnedCountry}
            />
          )}
          {activeView === 'scatter' && (
            <ScatterView
              filters={filters}
              setFilters={setFilters}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              pinnedCountry={pinnedCountry}
              setPinnedCountry={setPinnedCountry}
            />
          )}
          {activeView === 'map' && (
            <MapView
              filters={filters}
              setFilters={setFilters}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              pinnedCountry={pinnedCountry}
              setPinnedCountry={setPinnedCountry}
            />
          )}
        </main>
      </section>

      <MissionVision />
      <ResourceLinks />
      <MethodologyImplementation />
      <RegimeClassification />
      <AnalyticalMethods />
      <Footer onNavigate={scrollToSection} />

      {/* One floating profile for all three views. It subscribes to the hover
          store directly, so a moving pointer repaints this card alone and
          never the chart underneath it. A pinned card supersedes it. */}
      <HoverProfile
        hidden={!!pinnedCountry}
        onViewProfile={handleViewProfile}
      />

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleSearchSelect}
      />
    </div>
  );
}
