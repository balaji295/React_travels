import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BusList = () => {
    const [buses, setBuses] = useState([]);
    const naviagate=useNavigate()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                setLoading(true);

                const response = await axios.get(
                    "http://127.0.0.1:8000/api/buses/"
                );

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
const handleViewSeats=(id)=>{
    naviagate(`/bus/${id}`)

}
    if (loading) {
        return <h2>Loading buses...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    return (
        <div>
            <h2>BusList</h2>

            {buses.map((item) => (
                <div
                    key={item.id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '10px',
                        margin: '10px'
                    }}
                >
                    <div>
                        <strong>Bus Name:</strong>{' '}
                        {item.bus_name || item.name}
                    </div>
                      <div>
                        <strong>BUS Number:</strong>{item.number}
                        </div>
                    <div>
                        <strong>Origin:</strong> {item.origin || item.orgin}
                    </div>

                    <div>
                        <strong>Destination:</strong> {item.destination}
                    </div>

                    <div>
                        <strong>Start Time:</strong> {item.start_time}
                    </div>

                    <div>
                        <strong>Reach Time:</strong> {item.reach_time}
                    </div>
                    <button onClick={()=>handleViewSeats(item.id)}> view seats</button>
                    
                </div>
            ))}
        </div>
    );
};

export default BusList;
             
                