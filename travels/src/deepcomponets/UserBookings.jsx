import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserBookings = ({ token, userId }) => {
    const [bookings, setBookings] = useState([]);
    const [bookingError, setBookingError] = useState(null);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchBookings = async () => {
            if (!token || !userId) return;
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}/bookings/`, {
                    headers: { Authorization: `Token ${token}` }
                });
                setBookings(response.data);
            } catch (error) {
                setBookingError(error.response?.data?.message || "Failed to load bookings");
            }
        };
        fetchBookings();
    }, [userId, token]);

    if (bookingError) return <div className="text-red-500 text-center p-4">{bookingError}</div>;

    return (
        
    <div className="max-w-4xl mx-auto p-6 mt-10">
      
      {/* 1. బటన్స్ ఉన్న భాగం */}
      <div className="mb-4">
        <button onClick={() => navigate('/buslist')} style={{ marginRight: '10px' }} className="bg-blue-500 text-white px-4 py-2 rounded">
          Home page
        </button>
        <button onClick={() => navigate('/buslist')} className="bg-green-500 text-white px-4 py-2 rounded">
          Book another seat
        </button>
      </div>

      {/* 2. టైటిల్ */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">My Bookings</h2>

      {/* 3. బుకింగ్స్ లిస్ట్ లేదా "No bookings" మెసేజ్ */}
      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No bookings found.</p>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* టేబుల్ హెడ్డర్ */}
          <div className="grid grid-cols-5 bg-gray-50 p-4 font-semibold text-gray-600 text-sm border-b">
            <div>ID</div>
            <div>User</div>
            <div>Bus</div>
            <div>Seat</div>
            <div>Booking Time</div>
          </div>

          {/* టేబుల్ డేటా (Map) */}
          {bookings.map((item) => (
            <div key={item.id} className="grid grid-cols-5 p-4 border-b border-gray-100 text-gray-700 text-sm">
              <div className="font-medium text-blue-600">#{item.id}</div>
              <div>{item.user}</div>
              <div>{item.bus}</div>
              <div><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{item.seat}</span></div>
              <div className="text-gray-500">{item.booking_time}</div>
            </div>
          ))}
          
        </div>
      )}
    </div>
  );
};

export default UserBookings;