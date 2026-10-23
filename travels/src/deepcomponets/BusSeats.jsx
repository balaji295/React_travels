import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Ensure Tailwind is imported here or in index.css

const BusSeats = ({ token }) => {
    const { busId } = useParams();
    const [bus, setBus] = useState(null);
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                setLoading(true);
                setError("");
                const config = token ? { headers: { Authorization:`Token${token} `} } : {};
                
                // Note: You had a trailing comma in your axios call which I fixed
                const response = await axios.get(`http://127.0.0.1:8000/api/buses/${busId}`, config);
                
                setBus(response.data);
                setSeats(response.data?.seats || []);
            } catch (err) {
                setError(err.response?.data?.detail || "Unable to load bus details.");
            } finally {
                setLoading(false);
            }
        };

        if (busId) {
            fetchBusDetails();
        } else {
            setLoading(false);
            setError("Bus ID is missing.");
        }
    }, [busId, token]);

const handleSeatSelect = (seat) => {
  
  if (seat.is_booked) return; 

  
  const isSelected = selectedSeats.find(s => s.id === seat.id);

  if (isSelected) {
    
    setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
  } else {
    
    if (selectedSeats.length >= 5) {
      alert("you can book a maximum of at a 5 seats at a time !");
      return;
    }
    
    setSelectedSeats([...selectedSeats, seat]);
  }
};

    const handlebook = async () => {
        try {
            if (!token) {
                alert("Please Login for booking a seat");
                navigate("/login");
                return;
            }
            const seatIds=selectedSeats.map(seat=>seat.seat_number);
            await axios.get(` http://127.0.0.1:8000/api/get-csrf-token/`,{withCredentials:true});
            const csrftoken = document.cookie.split('; ').find(row => row.startsWith('csrftoken='))?.split('=')[1];
            const response=await axios.post(
               ` http://127.0.0.1:8000/api/booking/`,
                { seats: seatIds,
                bus_id:busId},
                {
                    headers: {
                        Authorization:` Token ${token}`,
                        "Content-Type": "application/json",
                      ...(csrftoken&&{ "X-CSRFToken":csrftoken}),
                    },
                    withCredentials:true,
                }
            );

            alert("Booking successful!");
            setSeats((prev) =>
                prev.map((seat) =>
                    seat.id===seatId?{...seat,is_booked:true,booked:true}
      :seat

),
                
            );
            console.log(response.data);
            navigate('/my-bookings')
        } catch (error) {
            console.error("Booking failed:", error);
            alert("Booking failed. Please try again.");
        }
    };

    if (loading) return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Loading bus details...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-500">Something went wrong: {error}</div>;
    if (!bus) return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Bus not found</div>;

    return (
        <div className="max-w-5xl mx-auto p-6 mt-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Select Your Seat</h1>

            {/* Bus Information Card */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{bus.bus_name || "Bus"}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-600">
                    <div>
                        <p className="text-sm font-medium text-gray-500">Bus Number</p>
                        <p className="font-semibold">{bus.number || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">From</p>
                        <p className="font-semibold">{bus.orgin || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">To</p>
                        <p className="font-semibold">{bus.destination || "N/A"}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Start Time</p>
                        <p className="font-semibold">{bus.start_time || "N/A"}</p>
                    </div>
                </div>
                <div className="mt-2 text-gray-600">
                    <p className="text-sm font-medium text-gray-500">Reach Time</p>
                    <p className="font-semibold">{bus.reach_time || "N/A"}</p>
                </div>
            </div>

            {/* Seats Section */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 mb-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Available Seats</h3>
                {seats.length === 0 ? (
                    <p className="text-gray-500">No seats available.</p>
                ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                        {seats.map((seat) => {
                            const isSelected = selectedSeats.some(s=>s.id === seat.id);
                            const isBooked = seat.is_booked === true || seat.booked === true;

                            return (
                                <button
                                    key={seat.id || seat.seat_number}
                                    type="button"
                                    disabled={isBooked}
                                    onClick={() => handleSeatSelect(seat)}
                                    className={`
                                        py-2 px-3 rounded-lg font-medium transition-all duration-200
                                        ${isBooked 
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed border border-gray-300' 
                                            : isSelected 
                                                ? 'bg-blue-600 text-white shadow-md transform scale-105 border border-blue-700' 
                                                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500 hover:text-blue-600'
                                        }
                                    `}
                                >
                                    {seat.seat_number}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>

{/* Selected Seat & Booking */}
{selectedSeats.length > 0 && (
  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-center mt-6">
    <h3 className="text-lg font-semibold text-blue-900 mb-4 sm:mb-0">
      Selected Seats: <span className="text-xl font-bold">
         {selectedSeats.map(s => s.seat_number || s.id).join(', ')}
      </span>
    </h3>
    
    <button
      type="button"
      onClick={() => handlebook()} 
      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
    >
      Continue Booking ({selectedSeats.length})
    </button>
  </div>
)}
        </div>
    );
};

export default BusSeats