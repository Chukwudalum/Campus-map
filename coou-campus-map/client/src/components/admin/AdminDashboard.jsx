// AdminDashboard.jsx - Component for admin features including location management
import React, { useState, useEffect } from 'react';
import { LocationTable } from './LocationTable';
import { LocationForm } from './LocationForm';
import { getLocations } from '../../services/api';

const AdminDashboard = ({ onReload }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await getLocations();
        setLocations(res.data.locations);
      } catch (error) {
        // handle error here
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="dashboard-container">
      <h3 className="text-lg mb-4">Manage Campus Locations</h3>
      <LocationForm onSuccess={onReload} />
      <LocationTable locations={locations} onRefresh={onReload} />
    </div>
  );
};

export default AdminDashboard;
