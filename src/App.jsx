import React, { useState, useRef } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import FilterBar from './components/FilterBar.jsx';
import RankingsView from './components/views/RankingsView.jsx';
import ScatterView from './components/views/ScatterView.jsx';
import MapView from './components/views/MapView.jsx';
import MissionVision from './components/MissionVision.jsx';
import MethodologyImplementation from './components/MethodologyImplementation.jsx';
import ResourceLinks from './components/ResourceLinks.jsx';
import RegimeClassification from './components/RegimeClassification.jsx';
import AnalyticalMethods from './components/AnalyticalMethods.jsx';
import Footer from './components/Footer.jsx';

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

  const { activeView } = filters;

  const viewRef = useRef(null);

  const handleViewChange = (view) => {
    setFilters(f => ({ ...f, activeView: view }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header activeView={activeView} onViewChange={handleViewChange} />
      <Hero />
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* View panels */}
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

      <MissionVision />
      <MethodologyImplementation />
      <ResourceLinks />
      <RegimeClassification />
      <AnalyticalMethods />
      <Footer />
    </div>
  );
}
