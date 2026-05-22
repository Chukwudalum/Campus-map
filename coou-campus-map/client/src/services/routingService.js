// OSRM (Open Source Routing Machine) — FREE public API
// Documentation: http://project-osrm.org/
import axios from 'axios';
import { OSRM_BASE_URL } from '../utils/constants';

/**
 * Get walking route between two coordinates using OSRM public API.
 *
 * @param {Array} from  - [lat, lng] of start point
 * @param {Array} to    - [lat, lng] of destination
 * @returns {Object}    - { coordinates, distance, duration, steps }
 */
export async function getWalkingRoute(from, to) {
  try {
    // OSRM expects [lng, lat] order
    const coordinates = `${from[1]},${from[0]};${to[1]},${to[0]}`;
    const url = `${OSRM_BASE_URL}/foot/${coordinates}`;

    const response = await axios.get(url, {
      params: {
        overview:    'full',        // return full route geometry
        geometries:  'geojson',     // GeoJSON for Leaflet compatibility
        steps:       true,          // include turn-by-turn instructions
        annotations: false,
      },
    });

    const { routes, code } = response.data;

    if (code !== 'Ok' || !routes || routes.length === 0) {
      throw new Error('No route found between these locations.');
    }

    const route = routes[0];

    // Convert GeoJSON coordinates [lng, lat] → Leaflet [lat, lng]
    const latLngs = route.geometry.coordinates.map(([lng, lat]) => [lat, lng]);

    // Parse step instructions
    const steps = route.legs[0]?.steps?.map((step) => ({
      instruction: step.maneuver?.instruction || step.name || 'Continue',
      distance:    step.distance,
      duration:    step.duration,
      name:        step.name,
    })) || [];

    return {
      coordinates: latLngs,
      distance:    route.distance,    // meters
      duration:    route.duration,    // seconds
      steps,
    };
  } catch (error) {
    // Fallback: if OSRM fails, return a straight line
    console.warn('OSRM routing failed, using straight line fallback:', error.message);
    return {
      coordinates: [from, to],
      distance:    null,
      duration:    null,
      steps:       [],
      isFallback:  true,
    };
  }
}

/**
 * Format OSRM duration in seconds to human-readable string
 * @param {number} seconds
 * @returns {string}
 */
export function formatDuration(seconds) {
  if (!seconds) return 'Unknown';
  if (seconds < 60) return `${Math.round(seconds)} sec`;
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  return `${Math.floor(mins / 60)}h ${mins % 60}min`;
}

