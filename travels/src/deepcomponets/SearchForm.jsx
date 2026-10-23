import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');

  const handleSearchClick = () => {
    // ఇక్కడ మనం Home.jsx కి డేటా పంపుతున్నాం
    onSearch({ fromCity, toCity });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Book bus tickets</h2>
      
      <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px' }}>
        <input 
          type="text" 
          placeholder="From" 
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input 
          type="text" 
          placeholder="To" 
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '10px', marginBottom: '10px' }}
        />
      </div>

      <button 
        onClick={handleSearchClick}
        style={{ width: '100%', padding: '15px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '25px', marginTop: '20px', fontSize: '18px' }}
      >
        🔍 Search buses
      </button>
    </div>
  );
};

export default SearchForm;