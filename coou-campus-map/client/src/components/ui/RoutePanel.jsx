// RoutePanel.jsx - Panel for displaying route information and options
import React from 'react';
import { useRouting } from '../../hooks/useRouting';
import { formatDistance } from '../../utils/distanceCalc';

const RoutePanel = ({ userLocation }) => {
  const { route, calculateRoute, routeLoading, routeError } = useRouting();

  const handleCalculateRoute = () => {
    if (!userLocation) {
      alert('Please enable location services.');
      return;
    }
    const destination = [5.9742, 6.7642]; // Example destination (to be replaced with a real one)
    calculateRoute(userLocation, destination);
  };

  return (
    <div className="absolute top-0 right-0 p-4 bg-white shadow-md rounded-lg max-w-sm">
      <button className="btn-primary mb-2" onClick={handleCalculateRoute} disabled={routeLoading}>
        {routeLoading ? 'Calculating...' : 'Get Route'}
      </button>
      {route && !routeLoading && (
        <div>
          <h4 className="font-bold">Route Details</h4>
          <p>{route.fromName} to {route.toName}</p>
          <p>Distance: {formatDistance(route.distance)}</p>
          {/* Additional info */}
          <p>Estimated Duration: {route.displayDuration}</p>
          <ul>
            {route.steps.map((step, index) => (
              <li key={index}>{step.instruction} ({formatDistance(step.distance)})</li>
            ))}
          </ul>
        </div>
      )}
      {routeError && <p className="text-red-600">{routeError}</p>}
    </div>
  );
};

export default RoutePanel;
