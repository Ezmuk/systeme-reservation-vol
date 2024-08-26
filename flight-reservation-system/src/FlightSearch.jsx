import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function FlightSearch() {
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [flights, setFlights] = useState([]);

  const searchFlights = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/flights`, {
        params: {
          departure,
          destination,
        },
      });
      const data = response.data;
      setFlights(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Flight Reservation</h1>
      <input
        value={departure}
        onChange={(e) => setDeparture(e.target.value)}
        placeholder="Lieu de départ"
        className="input"
      />
      <input
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Destination"
        className="input"
      />
      <button onClick={searchFlights}>Rechercher</button>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            {flight.price} USD -{" "}
            {new Date(flight.departure_time).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlightSearch;
