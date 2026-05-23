// LocationForm.jsx - Form for adding/editing campus locations
import React, { useState } from 'react';
import { createLocation } from '../../services/api';
import { toast } from 'react-toastify';

const LocationForm = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLocation({ name, category, latitude, longitude });
      toast.success('Location added.');
      onSuccess();
      // Clear form fields
      setName('');
      setCategory('');
      setLatitude('');
      setLongitude('');
    } catch (error) {
      toast.error('Failed to add location.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field mb-2"
        required
      />
      {/* Category Select field */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="input-field mb-2"
        required
      >
        <option value="">Select Category</option>
        <option value="faculty">Faculty</option>
        <option value="department">Department</option>
        <option value="office">Office</option>
        <option value="admin">Administration</option>
        <option value="lecture_hall">Lecture Hall</option>
        <option value="hostel">Hostel</option>
        <option value="cafeteria">Cafeteria</option>
        <option value="library">Library</option>
        <option value="medical">Medical Center</option>
        <option value="ict">ICT Center</option>
        <option value="security">Security Post</option>
        <option value="bus_stop">Bus Stop</option>
        <option value="road">Road / Pathway</option>
      </select>
      <input
        type="number"
        placeholder="Latitude"
        value={latitude}
        onChange={(e) => setLatitude(e.target.value)}
        className="input-field mb-2"
        step="any"
        required
      />
      <input
        type="number"
        placeholder="Longitude"
        value={longitude}
        onChange={(e) => setLongitude(e.target.value)}
        className="input-field mb-2"
        step="any"
        required
      />
      <button type="submit" className="btn-primary">Add Location</button>
    </form>
  );
};

export default LocationForm;
