
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchForm from './SearchForm';

const Home = ({ token }) => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchBuses = async () => {
      try {
      
        const response = await axios.get("https://travel-go-oqxk.onrender.com/api/buses/");
        setBuses(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching buses", error);
        setLoading(false);
      }
    };
    fetchBuses();
  }, []);

  
  const handleSearch = (searchData) => {
    if (!searchData.fromCity || !searchData.toCity) {
      alert("Please enter Your source and destination to search for buses");
      return;
    }
    navigate('/buslist', { state: searchData });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-white shadow-md py-10 mb-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Book Your Bus Tickets</h1>
          <SearchForm onSearch={handleSearch} />
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Available Buses</h2>
        
        {loading ? (
          <p className="text-center text-gray-500">Loading buses...</p>
        ) : buses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buses.map((bus) => (
              <div key={bus.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                <div className="mb-4">
                  <span className="text-sm text-blue-600 font-semibold uppercase">{bus.origin} to {bus.destination}</span>
                  <h3 className="text-xl font-bold text-gray-900">{bus.bus_name}</h3>
                </div>
                <div className="space-y-2 text-gray-600 text-sm mb-4">
                  <p><strong>Number:</strong> {bus.number}</p>
                  <p><strong>Start Time:</strong> {bus.start_time}</p>
                  <p><strong>Reach Time:</strong> {bus.reach_time}</p>
                </div>
                <button 
                  onClick={() => navigate(`/bus/${bus.id}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
                >
                  View Seats
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No buses available right now.</p>
        )}
      </div>
    </div>
  );
};

export default Home;