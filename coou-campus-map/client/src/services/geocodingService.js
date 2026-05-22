// Nominatim Geocoding — FREE, no API key required
// Usage policy: max 1 request/second, include User-Agent
import axios from 'axios';
import { NOMINATIM_URL } from '../utils/constants';

const nominatimClient = axios.create({
  baseURL: NOMINATIM_URL,
  headers: {
    // Required by Nominatim usage policy
    'User-Agent': 'COOU-Campus-Navigator/1.0 (student-project)',
    'Accept-Language': 'en',
  },
});

/**
 * Forward geocode: address string → [lat, lng]
 * Biased toward COOU Uli campus area
 *
 * @param {string} query
 * @returns {Array|null} [lat, lng] or null
 */
export async function geocodeAddress(query) {
  try {
    const response = await nominatimClient.get('', {
      params: {
        q:              `${query}, Uli, Anambra, Nigeria`,
        format:         'json',
        limit:          5,
        addressdetails: 1,
        countrycodes:   'ng',
      },
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return [parseFloat(lat), parseFloat(lon)];
    }
    return null;
  } catch (error) {
    console.error('Geocoding failed:', error.message);
    return null;
  }
}

/**
 * Reverse geocode: [lat, lng] → address string
 *
 * @param {number} lat
 * @param {number} lng
 * @returns {string} address
 */
export async function reverseGeocode(lat, lng) {
  try {
    const response = await axios.get(
      'https://nominatim.openstreetmap.org/reverse',
      {
        params: { lat, lon: lng, format: 'json' },
        headers: { 'User-Agent': 'COOU-Campus-Navigator/1.0' },
      }
    );
    return response.data?.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  } catch {
    return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
  }
}

