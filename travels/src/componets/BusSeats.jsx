import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import'../App.css';



const BusSeats = ({ token }) => {
  const { busId } = useParams();

  const [bus, setBus] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const navigate=useNavigate()

  useEffect(() => {
    const fetchBusDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const config = token
          ? {
              headers: {
                Authorization: `Bearer${token}`,
              },
            }
          : {};

        const response = await axios.get(`http://127.0.0.1:8000/api/buses/${busId}`,
        
          
        );

        console.log("Bus details:", response.data);

        setBus(response.data);
        setSeats(response.data?.seats || []);
      } catch (err) {
        console.error("Error fetching bus details:", err);

        setError(
          err.response?.data?.detail ||
          "Unable to load bus details."
        );
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
    setSelectedSeat(seat);
  };
  const handleviewSeat=(id)=>{
    navigate(`/bus/${id}`)
  }

  if (loading) {
    return (
      <div className="page-container">
        <h2>Loading bus details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h2>Something went wrong</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!bus) {
    return (
      <div className="page-container">
        <h2>Bus not found</h2>
      </div>
    );
  }

        const handlebook = async (seatId) => {
  try {
    if (!token) {
      alert("Please Login for booking a seat");
      navigate("/login");
      return;
    }

    const response = await axios.post(
     ` http://127.0.0.1:8000/api/booking/`,{seat:seatId,},
      
     {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    alert("Booking successful!");
    setSeats((prev)=>
      prev.map((seat)=>
        seat.id===seatId?{...seat,is_booked:true,booked:true}
      :seat
      ),
    )
    console.log(response.data);

  } catch (error) {
    console.error("Booking failed:", error);
    alert("Booking failed. Please try again.");
  }
};


  return (
    <div className="page-container">

      <h1>Select Your Seat</h1>

      {/* Bus information */}
      <div className="bus-details">

        <h2>{bus.bus_name || "Bus"}</h2>

        <p>
          <strong>Bus Number:</strong>{" "}
          {bus.number || "N/A"}
        </p>

        <p>
          <strong>From:</strong>{" "}
          {bus.orgin || "N/A"}
        </p>
        <p>
          <strong>to::</strong>{" "}
          {bus.destination || "n/A"
          }
        </p>

        <p>
          <strong>Start Time:</strong>{" "}
          {bus.start_time || "N/A"}
        </p>

        <p>
          <strong>Reach Time:</strong>{" "}
          {bus.reach_time || "N/A"}
        </p>

      </div>

      {/* Seats */}
      <div className="seat-section">

        <h3>Available Seats</h3>

        {seats.length === 0 ? (
          <p>No seats available.</p>
        ) : (
          <div className="seat-grid">

            {seats.map((seat) => {

              const isSelected =
                selectedSeat?.id === seat.id;

              const isBooked =
                seat.is_booked === true ||
                seat.booked === true;

              return (
                <button
                  key={seat.id || seat.seat_number}
                  type="button"
                  disabled={isBooked}
                  onClick={() => handleSeatSelect(seat)}
                  className={`seat-button ${
                    isSelected ? "selected" : ""
                  } ${isBooked ? "booked" : ""}`}
                >
                  {seat.seat_number}
                </button>
              );
            })}

          </div>
        )}

      </div>

      {/* Selected seat */}
      {selectedSeat && (
        <div className="selected-seat">
          <h3>
            Selected Seat: {selectedSeat.seat_number}
          </h3>

          <button type="button"
          onClick={()=>
            handlebook(selectedSeat.id)
          }>
            Continue Booking
          </button>
        </div>
      )}

    </div>
  )
};

export default BusSeats;