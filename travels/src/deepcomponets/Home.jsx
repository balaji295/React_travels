// src/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from './SearchForm'; 

const Home = ({ token }) => {
  const navigate = useNavigate();

  
  const handleSearch=(searchData)=>{
    
    
    if(!searchData.fromCity||!searchData.toCity){
        alert("Please enter Your source and destination to search for buses")
        return;
    }
    
    navigate('/buslist', { state: searchData }); 
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
    </div>
  );
};

export default Home;