// Custom SVG-based Leaflet icons for each category
// Using divIcon for full CSS/color control without external image dependency
import L from 'leaflet';
import { CATEGORY_COLORS } from './constants';

/**
 * Creates a styled Leaflet divIcon for a given category.
 * @param {string} category - Category key from CATEGORY_COLORS
 * @param {boolean} isSelected - Whether this marker is currently selected
 * @returns {L.DivIcon}
 */
export function createCategoryIcon(category, isSelected = false) {
  const color     = CATEGORY_COLORS[category] || CATEGORY_COLORS.other;
  const size      = isSelected ? 42 : 34;
  const ringSize  = size + 16;

  // SVG paths for each category (ASCII art equivalent via SVG)
  const iconPaths = {
    faculty:      'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z M9 22V12h6v10',
    department:   'M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z',
    office:       'M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16',
    admin:        'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    lecture_hall: 'M2 3h20v14H2z M8 21h8 M12 17v4',
    hostel:       'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z',
    cafeteria:    'M18 8h1a4 4 0 010 8h-1 M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z M6 1v3 M10 1v3 M14 1v3',
    library:      'M4 19.5A2.5 2.5 0 016.5 17H20 M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z',
    medical:      'M12 2v20 M2 12h20',
    ict:          'M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11 M15 3v11 M3 9h18',
    security:     'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
    bus_stop:     'M8 6v12 M16 6v12 M2 12h20 M3 6h18a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V7a1 1 0 011-1z',
    road:         'M3 12h18 M3 6h18 M3 18h18',
    other:        'M12 2a10 10 0 100 20A10 10 0 0012 2z',
  };

  const path = iconPaths[category] || iconPaths.other;

  const html = `
    <div style="
      position: relative;
      width: ${size}px;
      height: ${size}px;
    ">
      ${isSelected ? `
        <div style="
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: ${ringSize}px;
          height: ${ringSize}px;
          border-radius: 50%;
          border: 2px solid ${color};
          animation: pulseRing 1.5s ease-out infinite;
          opacity: 0;
        "></div>
      ` : ''}
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 16px ${color}55;
        border: 2px solid rgba(255,255,255,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="transform: rotate(45deg);">
          <svg xmlns="http://www.w3.org/2000/svg" width="${size * 0.5}" height="${size * 0.5}"
               viewBox="0 0 24 24" fill="none" stroke="white"
               stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="${path}"/>
          </svg>
        </div>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className:   '',
    iconSize:    [size, size],
    iconAnchor:  [size / 2, size],
    popupAnchor: [0, -(size + 4)],
  });
}

/**
 * User location icon (blue pulsing dot)
 */
export function createUserLocationIcon() {
  const html = `
    <div style="position: relative; width: 20px; height: 20px;">
      <div style="
        position: absolute; inset: -10px; border-radius: 50%;
        background: rgba(59, 130, 246, 0.2);
        animation: pulseRing 1.8s ease-out infinite;
      "></div>
      <div style="
        width: 20px; height: 20px; border-radius: 50%;
        background: #3b82f6;
        border: 3px solid white;
        box-shadow: 0 0 12px rgba(59,130,246,0.6);
      "></div>
    </div>
  `;

  return L.divIcon({
    html,
    className:   '',
    iconSize:    [20, 20],
    iconAnchor:  [10, 10],
    popupAnchor: [0, -16],
  });
}

