import React, { useState } from 'react';
import CampusMap from './components/CampusMap';
import SearchOverlay from './components/SearchOverlay';

// Keep your list of buildings here
const locations = [
  { id: 1, name: "Main Gate", coords: [5.7832, 6.8125], desc: "Entrance from Expressway" },
  { id: 2, name: "Faculty of Engineering", coords: [5.7850, 6.8140], desc: "Engineering Lecture Halls" },
  { id: 3, name: "Convocation Arena", coords: [5.7865, 6.8155], desc: "University Events Center" },
];

function App() {
  const [selectedCoords, setSelectedCoords] = useState(null);

  const handleSelectBuilding = (location) => {
    // When a user clicks a search result, update the state
    setSelectedCoords(location.coords);
  };

  return (
    <div className="App" style={{ position: 'relative' }}>
      {/* 1. Search Bar at the top */}
      <SearchOverlay data={locations} onSelect={handleSelectBuilding} />
      
      {/* 2. Map fills the background */}
      <CampusMap locations={locations} selectedCoords={selectedCoords} />
    </div>
  );
}

export default App;