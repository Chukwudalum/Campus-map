// HomePage.jsx - Main landing page for the COOU Campus Map
import React from 'react';
import { LeafletMap } from '../components/map/LeafletMap';
import { Sidebar } from '../components/ui/Sidebar';
import { RoutePanel } from '../components/ui/RoutePanel';
import { useUserLocation } from '../hooks/useUserLocation';

const HomePage = () => {
  const { position, getLocation, startWatching, stopWatching } = useUserLocation();

  React.useEffect(() => {
    getLocation();      // Get initial location on mount
    startWatching();    // Start location watching
    return stopWatching; // Cleanup on unmount
  }, [getLocation, startWatching, stopWatching]);

  return (
    <div className="flex flex-col w-full h-screen">
      <Sidebar />
      <div className="flex-1 relative">
        <LeafletMap userLocation={position} />
        <RoutePanel userLocation={position} />
      </div>
    </div>
  );
};

export default HomePage;
