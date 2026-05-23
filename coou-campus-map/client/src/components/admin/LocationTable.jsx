// LocationTable.jsx - Display of existing campus locations
import React from 'react';

const LocationTable = ({ locations, onRefresh }) => {
  return (
    <table className="min-w-full bg-white border rounded-lg shadow-lg">
      <thead>
        <tr>
          <th className="text-left p-2 border">Name</th>
          <th className="text-left p-2 border">Category</th>
          <th className="text-left p-2 border">Coordinates</th>
          <th className="text-left p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {locations.map((location) => (
          <tr key={location._id}>
            <td className="p-2 border">{location.name}</td>
            <td className="p-2 border">{location.category}</td>
            <td className="p-2 border">{`${location.latitude}, ${location.longitude}`}</td>
            <td className="p-2 border">
              <button className="text-blue-600" onClick={() => handleEdit(location)}>Edit</button>
              <button className="text-red-600" onClick={() => handleDelete(location._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LocationTable;
