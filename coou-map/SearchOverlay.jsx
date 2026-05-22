import React, { useState } from 'react';

const SearchOverlay = ({ data, onSelect }) => {
  const [query, setQuery] = useState("");

  const filtered = data.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{
      position: 'absolute', top: '20px', left: '50%', 
      transform: 'translateX(-50%)', zIndex: 1000,
      width: '300px', background: 'white', padding: '10px',
      borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }}>
      <input 
        type="text" 
        placeholder="Search COOU Uli..." 
        style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <ul style={{ listStyle: 'none', margin: '5px 0 0', padding: 0, maxHeight: '200px', overflowY: 'auto' }}>
          {filtered.map(loc => (
            <li 
              key={loc.id} 
              onClick={() => { onSelect(loc); setQuery(""); }}
              style={{ padding: '10px', cursor: 'pointer', borderBottom: '1px solid #eee' }}
            >
              {loc.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchOverlay;