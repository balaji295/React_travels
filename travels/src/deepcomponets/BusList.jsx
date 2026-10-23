import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BusList = () => {
    const [buses, setBuses] = useState([]);
    const navigate = useNavigate(); // Fixed typo
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                setLoading(true);
                const response = await axios.get("http://127.0.0.1:8000/api/buses/");
                setBuses(response.data);
            } catch (error) {
                console.log("Error in fetching buses", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchBuses();
    }, []);

    const handleViewSeats = (id) => {
        navigate(`/bus/${id}`);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-xl text-gray-600">Loading buses...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-xl text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6 mt-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Available Buses</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {buses.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="mb-4">
                            <span className="text-sm text-blue-600 font-semibold uppercase tracking-wider">Bus Name</span>
                            <h3 className="text-xl font-bold text-gray-900">{item.bus_name || item.name}</h3>
                        </div>

                        <div className="space-y-2 text-gray-600 mb-6">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-500">Number:</span>
                                <span>{item.number}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-500">Origin:</span>
                                <span>{item.origin || item.orgin}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-500">Destination:</span>
                                <span>{item.destination}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-500">Start Time:</span>
                                <span>{item.start_time}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-500">Reach Time:</span>
                                <span>{item.reach_time}</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => handleViewSeats(item.id)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            View Seats
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BusList;