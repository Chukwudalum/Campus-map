import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- ICON FIX ---
// This is necessary because React sometimes struggles to load Leaflet's default marker images
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// --- 1. COORDINATE DATA ---
// Update these numbers with the ones you found on Google Maps!
const locations = [
  { id: 1, name: "Main Gate", coords: [5.7832, 6.8125], desc: "Entrance from Onitsha-Owerri Exp" },
  { id: 2, name: "Faculty of Engineering", coords: [5.7850, 6.8140], desc: "Engineering Blocks" },
];

// This is your ROAD. Add as many [lat, lng] pairs as you want to make it curvy.
const mainRoadPath = [
  [5.7832, 6.8125], // Start at Gate
  [5.7840, 6.8130], // A turn in the road
  [5.7850, 6.8140], // End at Engineering
];

// --- 2. HELPER COMPONENT: CLICK TO COORDINATE ---
// Use this to find coordinates while you build! 
// Check your browser console (F12) when you click the map.
function ClickTracker() {
  useMapEvents({
    click(e) {
      console.log(`New Coordinate: [${e.latlng.lat}, ${e.latlng.lng}]`);
    },
  });
  return null;
}

// --- 3. MAIN MAP COMPONENT ---
function CampusMap() {
  const uliCenter = [5.7850, 6.8140]; // Center the map on Uli

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={uliCenter} zoom={16} style={{ height: "100%", width: "100%" }}>
        
        {/* WE USE SATELLITE TILES: Since your school isn't on the standard map, 
            satellite view is much better for your users. */}
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
        />

        {/* CLICK TRACKER: Remove this once you finish your project */}
        <ClickTracker />

        {/* RENDERING THE ROAD: Using Polyline */}
        <Polyline 
          positions={mainRoadPath} 
          pathOptions={{ 
            color: 'yellow', // High contrast color for satellite view
            weight: 5, 
            opacity: 0.7,
            dashArray: '5, 10' // Makes it a dashed line
          }} 
        />

        {/* RENDERING BUILDINGS: Using Markers */}
        {locations.map(loc => (
          <Marker key={loc.id} position={loc.coords}>
            <Popup>
              <strong>{loc.name}</strong><br/>
              {loc.desc}
            </Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}

export default CampusMap;