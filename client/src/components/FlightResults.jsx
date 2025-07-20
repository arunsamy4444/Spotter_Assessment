
import { useState, useEffect } from "react";
import "../styles/FlightResults.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fullFlightData = {
  status: true,
  data: [
    {
      id: "FLIGHT001",
      price: { raw: 199.99, formatted: "$199.99" },
      legs: [
        {
          departure: "2025-07-22T08:00:00",
          arrival: "2025-07-22T13:30:00",
          duration: "5h 30m",
          origin: { id: "LAX", name: "Los Angeles" },
          destination: { id: "JFK", name: "New York" },
          airline: { id: "DL", name: "Delta Air Lines" },
        },
      ],
      cabinClass: "economy",
      bookingLink: "https://samplebooking.com/flight/FLIGHT001",
    },
    {
      id: "FLIGHT002",
      price: { raw: 129.49, formatted: "$129.49" },
      legs: [
        {
          departure: "2025-07-21T14:15:00",
          arrival: "2025-07-21T16:25:00",
          duration: "2h 10m",
          origin: { id: "ORD", name: "Chicago" },
          destination: { id: "ATL", name: "Atlanta" },
          airline: { id: "UA", name: "United Airlines" },
        },
      ],
      cabinClass: "economy",
      bookingLink: "https://samplebooking.com/flight/FLIGHT002",
    },
    {
      id: "FLIGHT003",
      price: { raw: 154.0, formatted: "$154.00" },
      legs: [
        {
          departure: "2025-07-23T10:50:00",
          arrival: "2025-07-23T13:10:00",
          duration: "2h 20m",
          origin: { id: "DFW", name: "Dallas" },
          destination: { id: "DEN", name: "Denver" },
          airline: { id: "AA", name: "American Airlines" },
        },
      ],
      cabinClass: "economy",
      bookingLink: "https://samplebooking.com/flight/FLIGHT003",
    },
    {
      id: "FLIGHT004",
      price: { raw: 112.3, formatted: "$112.30" },
      legs: [
        {
          departure: "2025-07-22T16:40:00",
          arrival: "2025-07-22T18:45:00",
          duration: "2h 5m",
          origin: { id: "SEA", name: "Seattle" },
          destination: { id: "SFO", name: "San Francisco" },
          airline: { id: "AS", name: "Alaska Airlines" },
        },
      ],
      cabinClass: "economy",
      bookingLink: "https://samplebooking.com/flight/FLIGHT004",
    },
    {
      id: "FLIGHT005",
      price: { raw: 249.75, formatted: "$249.75" },
      legs: [
        {
          departure: "2025-07-21T21:00:00",
          arrival: "2025-07-22T02:40:00",
          duration: "5h 40m",
          origin: { id: "MIA", name: "Miami" },
          destination: { id: "LAS", name: "Las Vegas" },
          airline: { id: "B6", name: "JetBlue" },
        },
      ],
      cabinClass: "economy",
      bookingLink: "https://samplebooking.com/flight/FLIGHT005",
    },
    {
      id: "FLIGHT006",
      price: { raw: 144.1, formatted: "$144.10" },
      legs: [
        {
          departure: "2025-07-23T07:30:00",
          arrival: "2025-07-23T10:20:00",
          duration: "2h 50m",
          origin: { id: "BOS", name: "Boston" },
          destination: { id: "ORD", name: "Chicago" },
          airline: { id: "NK", name: "Spirit Airlines" },
        },
      ],
      cabinClass: "economy",
      bookingLink: "https://samplebooking.com/flight/FLIGHT006",
    },
    {
      id: "FLIGHT007",
      price: { raw: 169.0, formatted: "$169.00" },
      legs: [
        {
          departure: "2025-07-22T12:15:00",
          arrival: "2025-07-22T15:35:00",
          duration: "3h 20m",
          origin: { id: "PHX", name: "Phoenix" },
          destination: { id: "SEA", name: "Seattle" },
          airline: { id: "WN", name: "Southwest Airlines" },
        },
      ],
      cabinClass: "economy",
      bookingLink: "https://samplebooking.com/flight/FLIGHT007",
    },
    {
      id: "FLIGHT008",
      price: { raw: 120.55, formatted: "$120.55" },
      legs: [
        {
          departure: "2025-07-21T18:00:00",
          arrival: "2025-07-21T19:50:00",
          duration: "1h 50m",
          origin: { id: "CLT", name: "Charlotte" },
          destination: { id: "EWR", name: "Newark" },
          airline: { id: "F9", name: "Frontier Airlines" },
        },
      ],
      cabinClass: "economy",
      bookingLink: "https://samplebooking.com/flight/FLIGHT008",
    },
    {
      id: "FLIGHT009",
      price: { raw: 135.25, formatted: "$135.25" },
      legs: [
        {
          departure: "2025-07-22T11:10:00",
          arrival: "2025-07-22T12:55:00",
          duration: "1h 45m",
          origin: { id: "LGA", name: "New York" },
          destination: { id: "DTW", name: "Detroit" },
          airline: { id: "DL", name: "Delta Air Lines" },
        },
      ],
      cabinClass: "economy",
      bookingLink: "https://samplebooking.com/flight/FLIGHT009",
    },
    {
      id: "FLIGHT010",
      price: { raw: 178.6, formatted: "$178.60" },
      legs: [
        {
          departure: "2025-07-23T09:00:00",
          arrival: "2025-07-23T11:35:00",
          duration: "2h 35m",
          origin: { id: "IAH", name: "Houston" },
          destination: { id: "MSP", name: "Minneapolis" },
          airline: { id: "UA", name: "United Airlines" },
        },
      ],
      cabinClass: "economy",
      bookingLink: "https://samplebooking.com/flight/FLIGHT010",
    },
  ],
};


const FlightResults = () => {
  const [filters, setFilters] = useState({
    origin: "",
    destination: "",
    date: "",
  });
  const [selectedFlightId, setSelectedFlightId] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (!fullFlightData) {
        setError("Flight data is unavailable.");
        toast.error("Flight data is unavailable");
      } else if (!fullFlightData.status) {
        setError("Failed to fetch flight data.");
        toast.error("Failed to fetch flight data");
      } else if (!Array.isArray(fullFlightData.data)) {
        setError("Invalid flight data format.");
        toast.error("Invalid flight data format");
      } else {
        setError(null);
        const params = new URLSearchParams(window.location.search);
        const flightId = params.get("flightId");
        if (flightId) setSelectedFlightId(flightId);
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  const navigateToFlight = (id) => {
    const newUrl = `${window.location.pathname}?flightId=${id}`;
    window.history.pushState(null, "", newUrl);
    setSelectedFlightId(id);
    toast.info(`Viewing flight ${id} details`);
  };

  const goBack = () => {
    const newUrl = window.location.pathname;
    window.history.pushState(null, "", newUrl);
    setSelectedFlightId(null);
  };


  const flattenFlight = (flight) => {
    const leg = flight.legs[0];
    return {
      id: flight.id,
      from: leg.origin.id,
      from_city: leg.origin.name,
      to: leg.destination.id,
      to_city: leg.destination.name,
      price: flight.price.raw,
      airline: leg.airline.name,
      flight_duration: leg.duration,
      departure_at: leg.departure,
      arrival_at: leg.arrival,
      cabinClass: flight.cabinClass,
      bookingLink: flight.bookingLink,
      rawFlight: flight,
    };
  };

  if (error) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  const flights = fullFlightData.data;

  if (selectedFlightId) {
    const flight = flights.find((f) => f.id === selectedFlightId);
    if (!flight) {
      toast.error("Flight not found");
      return (
        <div style={{ padding: 20 }}>
          <p>Flight not found.</p>
          <button onClick={goBack}>Back to list</button>
        </div>
      );
    }
    const leg = flight.legs[0];
    return (
      <div className="flight-details">
        <ToastContainer position="bottom-right" />
        <button onClick={goBack}>← Back to search results</button>

        <h2>Flight Details - {flight.id || "N/A"}</h2>

        <p>
          <strong>Airline:</strong> {leg.airline?.name || "Unknown Airline"}
        </p>

        <p>
          <strong>From:</strong> {leg.origin?.name || "Unknown Origin"} (
          {leg.origin?.id || "N/A"})
        </p>

        <p>
          <strong>To:</strong> {leg.destination?.name || "Unknown Destination"}{" "}
          ({leg.destination?.id || "N/A"})
        </p>

        <p>
          <strong>Departure:</strong>{" "}
          {leg.departure ? new Date(leg.departure).toLocaleString() : "N/A"}
        </p>

        <p>
          <strong>Arrival:</strong>{" "}
          {leg.arrival ? new Date(leg.arrival).toLocaleString() : "N/A"}
        </p>

        <p>
          <strong>Duration:</strong> {leg.duration || "N/A"}
        </p>

        <p>
          <strong>Cabin Class:</strong> {flight.cabinClass || "N/A"}
        </p>

        <p>
          <strong>Price:</strong> ${flight.price?.raw?.toFixed(2) || "N/A"}
        </p>
        <p>
          <button onClick={() => setShowModal(true)}>Book this flight</button>
        </p>

        {showModal && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>Book Flight - {flight.id}</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Flight booked successfully!");
                  setShowModal(false);
                }}
              >
                <label>
                  Full Name:
                  <input type="text" required />
                </label>
                <label>
                  Email:
                  <input type="email" required />
                </label>
                <label>
                  Phone:
                  <input type="tel" required />
                </label>
                <button type="submit">Confirm Booking</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  const filteredFlights = flights.map(flattenFlight).filter((flight) => {
    const originMatch =
      flight.from.toLowerCase().includes(filters.origin.toLowerCase()) ||
      flight.from_city.toLowerCase().includes(filters.origin.toLowerCase());

    const destMatch =
      flight.to.toLowerCase().includes(filters.destination.toLowerCase()) ||
      flight.to_city.toLowerCase().includes(filters.destination.toLowerCase());

    const dateMatch = filters.date
      ? new Date(flight.departure_at).toISOString().split("T")[0] ===
        filters.date
      : true;




    return originMatch && destMatch && dateMatch;
  });

  // Show toast if no flights match search criteria
  if (filteredFlights.length === 0 && (filters.origin || filters.destination || filters.date)) {
    toast.info("No flights match your search criteria");
  }

  return (
    <div className="flight-results-container" style={{ padding: 20 }}>
            <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2>Search Flights</h2>

      <div className="search-bar" style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Origin (e.g., LAX or Los Angeles)"
          value={filters.origin}
          onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          placeholder="Destination (e.g., JFK or New York)"
          value={filters.destination}
          onChange={(e) =>
            setFilters({ ...filters, destination: e.target.value })
          }
          style={{ marginRight: 10 }}
        />
        <input
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          style={{
            padding: "10px 14px",
            fontSize: "1rem",
            backgroundColor: "#222", // dark background
            color: "#eeeeee96", // light text
            border: "1px solid #444", // subtle border
            borderRadius: "8px",
            outline: "none",
            width: "100%",
            maxWidth: "240px",
            boxShadow: "0 0 4px rgba(30,144,255,0.3)", // subtle blue glow
          }}
        />
      </div>

      <div className="flight-grid">
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight) => (
            <div
              key={flight.id}
              className="flight-card"
              onClick={() => navigateToFlight(flight.id)}
              tabIndex={0}
              role="button"
              aria-pressed={selectedFlightId === flight.id}
              style={{
                border: "1px solid #ccc",
                cursor: "pointer",
                padding: "12px",
                marginBottom: "12px",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <strong>
                    {flight.from} ({flight.from_city})
                  </strong>{" "}
                  →{" "}
                  <strong>
                    {flight.to} ({flight.to_city})
                  </strong>
                </div>
                <div style={{ fontWeight: "600", color: "#555" }}>
                  {flight.airline}
                </div>
              </div>

              <div style={{ marginTop: 6 }}>
                <span>
                  <strong>Departure:</strong>{" "}
                  {new Date(flight.departure_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {" — "}
                <span>
                  <strong>Arrival:</strong>{" "}
                  {new Date(flight.arrival_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {" | "}
                <span>⏱️ {flight.flight_duration}</span>
              </div>

              <div style={{ marginTop: 6, fontWeight: "700" }}>
                Price: ${flight.price.toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <p>No matching flights found.</p>
        )}
      </div>
    </div>
  );
};

export default FlightResults;




// import { useState, useEffect } from "react";
// import "../styles/FlightResults.css";

// const fullFlightData = {
//   status: true,
//   data: [
//     {
//       id: "FLIGHT001",
//       price: { raw: 199.99, formatted: "$199.99" },
//       legs: [
//         {
//           departure: "2025-07-22T08:00:00",
//           arrival: "2025-07-22T13:30:00",
//           duration: "5h 30m",
//           origin: { id: "LAX", name: "Los Angeles" },
//           destination: { id: "JFK", name: "New York" },
//           airline: { id: "DL", name: "Delta Air Lines" },
//         },
//       ],
//       cabinClass: "economy",
//       bookingLink: "https://samplebooking.com/flight/FLIGHT001",
//     },
//     {
//       id: "FLIGHT002",
//       price: { raw: 129.49, formatted: "$129.49" },
//       legs: [
//         {
//           departure: "2025-07-21T14:15:00",
//           arrival: "2025-07-21T16:25:00",
//           duration: "2h 10m",
//           origin: { id: "ORD", name: "Chicago" },
//           destination: { id: "ATL", name: "Atlanta" },
//           airline: { id: "UA", name: "United Airlines" },
//         },
//       ],
//       cabinClass: "economy",
//       bookingLink: "https://samplebooking.com/flight/FLIGHT002",
//     },
//     {
//       id: "FLIGHT003",
//       price: { raw: 154.0, formatted: "$154.00" },
//       legs: [
//         {
//           departure: "2025-07-23T10:50:00",
//           arrival: "2025-07-23T13:10:00",
//           duration: "2h 20m",
//           origin: { id: "DFW", name: "Dallas" },
//           destination: { id: "DEN", name: "Denver" },
//           airline: { id: "AA", name: "American Airlines" },
//         },
//       ],
//       cabinClass: "economy",
//       bookingLink: "https://samplebooking.com/flight/FLIGHT003",
//     },
//     {
//       id: "FLIGHT004",
//       price: { raw: 112.3, formatted: "$112.30" },
//       legs: [
//         {
//           departure: "2025-07-22T16:40:00",
//           arrival: "2025-07-22T18:45:00",
//           duration: "2h 5m",
//           origin: { id: "SEA", name: "Seattle" },
//           destination: { id: "SFO", name: "San Francisco" },
//           airline: { id: "AS", name: "Alaska Airlines" },
//         },
//       ],
//       cabinClass: "economy",
//       bookingLink: "https://samplebooking.com/flight/FLIGHT004",
//     },
//     {
//       id: "FLIGHT005",
//       price: { raw: 249.75, formatted: "$249.75" },
//       legs: [
//         {
//           departure: "2025-07-21T21:00:00",
//           arrival: "2025-07-22T02:40:00",
//           duration: "5h 40m",
//           origin: { id: "MIA", name: "Miami" },
//           destination: { id: "LAS", name: "Las Vegas" },
//           airline: { id: "B6", name: "JetBlue" },
//         },
//       ],
//       cabinClass: "economy",
//       bookingLink: "https://samplebooking.com/flight/FLIGHT005",
//     },
//     {
//       id: "FLIGHT006",
//       price: { raw: 144.1, formatted: "$144.10" },
//       legs: [
//         {
//           departure: "2025-07-23T07:30:00",
//           arrival: "2025-07-23T10:20:00",
//           duration: "2h 50m",
//           origin: { id: "BOS", name: "Boston" },
//           destination: { id: "ORD", name: "Chicago" },
//           airline: { id: "NK", name: "Spirit Airlines" },
//         },
//       ],
//       cabinClass: "economy",
//       bookingLink: "https://samplebooking.com/flight/FLIGHT006",
//     },
//     {
//       id: "FLIGHT007",
//       price: { raw: 169.0, formatted: "$169.00" },
//       legs: [
//         {
//           departure: "2025-07-22T12:15:00",
//           arrival: "2025-07-22T15:35:00",
//           duration: "3h 20m",
//           origin: { id: "PHX", name: "Phoenix" },
//           destination: { id: "SEA", name: "Seattle" },
//           airline: { id: "WN", name: "Southwest Airlines" },
//         },
//       ],
//       cabinClass: "economy",
//       bookingLink: "https://samplebooking.com/flight/FLIGHT007",
//     },
//     {
//       id: "FLIGHT008",
//       price: { raw: 120.55, formatted: "$120.55" },
//       legs: [
//         {
//           departure: "2025-07-21T18:00:00",
//           arrival: "2025-07-21T19:50:00",
//           duration: "1h 50m",
//           origin: { id: "CLT", name: "Charlotte" },
//           destination: { id: "EWR", name: "Newark" },
//           airline: { id: "F9", name: "Frontier Airlines" },
//         },
//       ],
//       cabinClass: "economy",
//       bookingLink: "https://samplebooking.com/flight/FLIGHT008",
//     },
//     {
//       id: "FLIGHT009",
//       price: { raw: 135.25, formatted: "$135.25" },
//       legs: [
//         {
//           departure: "2025-07-22T11:10:00",
//           arrival: "2025-07-22T12:55:00",
//           duration: "1h 45m",
//           origin: { id: "LGA", name: "New York" },
//           destination: { id: "DTW", name: "Detroit" },
//           airline: { id: "DL", name: "Delta Air Lines" },
//         },
//       ],
//       cabinClass: "economy",
//       bookingLink: "https://samplebooking.com/flight/FLIGHT009",
//     },
//     {
//       id: "FLIGHT010",
//       price: { raw: 178.6, formatted: "$178.60" },
//       legs: [
//         {
//           departure: "2025-07-23T09:00:00",
//           arrival: "2025-07-23T11:35:00",
//           duration: "2h 35m",
//           origin: { id: "IAH", name: "Houston" },
//           destination: { id: "MSP", name: "Minneapolis" },
//           airline: { id: "UA", name: "United Airlines" },
//         },
//       ],
//       cabinClass: "economy",
//       bookingLink: "https://samplebooking.com/flight/FLIGHT010",
//     },
//   ],
// };


// const FlightResults = () => {
//   const [filters, setFilters] = useState({
//     origin: "",
//     destination: "",
//     date: "",
//   });
//   const [selectedFlightId, setSelectedFlightId] = useState(null);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     // Simulate data loading or validate on mount
//     if (!fullFlightData) {
//       setError("Flight data is unavailable.");
//       return;
//     }
//     if (!fullFlightData.status) {
//       setError("Failed to fetch flight data.");
//       return;
//     }
//     if (!Array.isArray(fullFlightData.data)) {
//       setError("Invalid flight data format.");
//       return;
//     }

//     // Reset error if all good
//     setError(null);

//     const params = new URLSearchParams(window.location.search);
//     const flightId = params.get("flightId");
//     if (flightId) setSelectedFlightId(flightId);
//   }, []);

//   const navigateToFlight = (id) => {
//     const newUrl = `${window.location.pathname}?flightId=${id}`;
//     window.history.pushState(null, "", newUrl);
//     setSelectedFlightId(id);
//   };

//   const goBack = () => {
//     const newUrl = window.location.pathname;
//     window.history.pushState(null, "", newUrl);
//     setSelectedFlightId(null);
//   };

//   const flattenFlight = (flight) => {
//     const leg = flight.legs[0];
//     return {
//       id: flight.id,
//       from: leg.origin.id,
//       from_city: leg.origin.name,
//       to: leg.destination.id,
//       to_city: leg.destination.name,
//       price: flight.price.raw,
//       airline: leg.airline.name,
//       flight_duration: leg.duration,
//       departure_at: leg.departure,
//       arrival_at: leg.arrival,
//       cabinClass: flight.cabinClass,
//       bookingLink: flight.bookingLink,
//       rawFlight: flight,
//     };
//   };

//   if (error) {
//     // Show error message
//     return (
//       <div style={{ padding: 20, color: "red" }}>
//         <h2>Error</h2>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   const flights = fullFlightData.data;

//   if (selectedFlightId) {
//     const flight = flights.find((f) => f.id === selectedFlightId);
//     if (!flight) {
//       return (
//         <div style={{ padding: 20 }}>
//           <p>Flight not found.</p>
//           <button onClick={goBack}>Back to list</button>
//         </div>
//       );
//     }
//     const leg = flight.legs[0];
//     return (
//       <div className="flight-details">
//         <button onClick={goBack}>← Back to search results</button>

//         <h2>Flight Details - {flight.id || "N/A"}</h2>

//         <p>
//           <strong>Airline:</strong> {leg.airline?.name || "Unknown Airline"}
//         </p>

//         <p>
//           <strong>From:</strong> {leg.origin?.name || "Unknown Origin"} (
//           {leg.origin?.id || "N/A"})
//         </p>

//         <p>
//           <strong>To:</strong> {leg.destination?.name || "Unknown Destination"}{" "}
//           ({leg.destination?.id || "N/A"})
//         </p>

//         <p>
//           <strong>Departure:</strong>{" "}
//           {leg.departure ? new Date(leg.departure).toLocaleString() : "N/A"}
//         </p>

//         <p>
//           <strong>Arrival:</strong>{" "}
//           {leg.arrival ? new Date(leg.arrival).toLocaleString() : "N/A"}
//         </p>

//         <p>
//           <strong>Duration:</strong> {leg.duration || "N/A"}
//         </p>

//         <p>
//           <strong>Cabin Class:</strong> {flight.cabinClass || "N/A"}
//         </p>

//         <p>
//           <strong>Price:</strong> ${flight.price?.raw?.toFixed(2) || "N/A"}
//         </p>
//         <p>
//           <button onClick={() => setShowModal(true)}>Book this flight</button>
//         </p>

//         {showModal && (
//           <div className="modal-backdrop">
//             <div className="modal">
//               <h3>Book Flight - {flight.id}</h3>
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   alert("Flight booked successfully!");
//                   setShowModal(false);
//                 }}
//               >
//                 <label>
//                   Full Name:
//                   <input type="text" required />
//                 </label>
//                 <label>
//                   Email:
//                   <input type="email" required />
//                 </label>
//                 <label>
//                   Phone:
//                   <input type="tel" required />
//                 </label>
//                 <button type="submit">Confirm Booking</button>
//                 <button type="button" onClick={() => setShowModal(false)}>
//                   Cancel
//                 </button>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   }

//   const filteredFlights = flights.map(flattenFlight).filter((flight) => {
//     const originMatch =
//       flight.from.toLowerCase().includes(filters.origin.toLowerCase()) ||
//       flight.from_city.toLowerCase().includes(filters.origin.toLowerCase());

//     const destMatch =
//       flight.to.toLowerCase().includes(filters.destination.toLowerCase()) ||
//       flight.to_city.toLowerCase().includes(filters.destination.toLowerCase());

//     const dateMatch = filters.date
//       ? new Date(flight.departure_at).toISOString().split("T")[0] ===
//         filters.date
//       : true;

//     return originMatch && destMatch && dateMatch;
//   });

//   return (
//     <div className="flight-results-container" style={{ padding: 20 }}>
//       <h2>Search Flights</h2>

//       <div className="search-bar" style={{ marginBottom: 20 }}>
//         <input
//           type="text"
//           placeholder="Origin (e.g., LAX or Los Angeles)"
//           value={filters.origin}
//           onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
//           style={{ marginRight: 10 }}
//         />
//         <input
//           type="text"
//           placeholder="Destination (e.g., JFK or New York)"
//           value={filters.destination}
//           onChange={(e) =>
//             setFilters({ ...filters, destination: e.target.value })
//           }
//           style={{ marginRight: 10 }}
//         />
//         <input
//           type="date"
//           value={filters.date}
//           onChange={(e) => setFilters({ ...filters, date: e.target.value })}
//           style={{
//             padding: "10px 14px",
//             fontSize: "1rem",
//             backgroundColor: "#222", // dark background
//             color: "#eeeeee96", // light text
//             border: "1px solid #444", // subtle border
//             borderRadius: "8px",
//             outline: "none",
//             width: "100%",
//             maxWidth: "240px",
//             boxShadow: "0 0 4px rgba(30,144,255,0.3)", // subtle blue glow
//           }}
//         />
//       </div>

//       <div className="flight-grid">
//         {filteredFlights.length > 0 ? (
//           filteredFlights.map((flight) => (
//             <div
//               key={flight.id}
//               className="flight-card"
//               onClick={() => navigateToFlight(flight.id)}
//               tabIndex={0}
//               role="button"
//               aria-pressed={selectedFlightId === flight.id}
//               style={{
//                 border: "1px solid #ccc",
//                 cursor: "pointer",
//                 padding: "12px",
//                 marginBottom: "12px",
//                 borderRadius: "8px",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                 }}
//               >
//                 <div>
//                   <strong>
//                     {flight.from} ({flight.from_city})
//                   </strong>{" "}
//                   →{" "}
//                   <strong>
//                     {flight.to} ({flight.to_city})
//                   </strong>
//                 </div>
//                 <div style={{ fontWeight: "600", color: "#555" }}>
//                   {flight.airline}
//                 </div>
//               </div>

//               <div style={{ marginTop: 6 }}>
//                 <span>
//                   <strong>Departure:</strong>{" "}
//                   {new Date(flight.departure_at).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </span>
//                 {" — "}
//                 <span>
//                   <strong>Arrival:</strong>{" "}
//                   {new Date(flight.arrival_at).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </span>
//                 {" | "}
//                 <span>⏱️ {flight.flight_duration}</span>
//               </div>

//               <div style={{ marginTop: 6, fontWeight: "700" }}>
//                 Price: ${flight.price.toFixed(2)}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No matching flights found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FlightResults;
