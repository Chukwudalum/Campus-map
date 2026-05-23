// Sidebar.jsx - Collapsing sidebar for location filtering and navigation
import React from 'react';
import { CategoryFilter } from './CategoryFilter';

const Sidebar = () => {
  return (
    <div className="w-64 bg-campus-dark text-white p-4">
      <h2 className="text-lg font-bold mb-4">Campus Navigation</h2>
      <CategoryFilter />
      {/* Other sidebar items (info, settings, etc.) */}
    </div>
  );
};

export default Sidebar;
