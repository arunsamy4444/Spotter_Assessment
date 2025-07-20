import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/AllAirports.css";

const AllAirports = () => {
  const [airports, setAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAirports = () => {
    setLoading(true);
    setError(null);

    fetch("/searchAirport_mock.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        const data = json?.data || [];
        if (!data.length) {
          const errorMsg = "No airport data found.";
          setError(errorMsg);
          toast.error(errorMsg);
          setAirports([]);
          setFilteredAirports([]);
        } else {
          setAirports(data);
          setFilteredAirports(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        const errorMsg = "Failed to load airports. Check your network and try again.";
        setError(errorMsg);
        toast.error(errorMsg);
        setLoading(false);
      });
  };

  // Initial fetch
  useEffect(() => {
    fetchAirports();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // Show loading only if there's a search term and we have airports to filter
    if (term && airports.length > 0) {
      setSearchLoading(true);
      
      // Simulate API delay for search (remove this in production)
      setTimeout(() => {
        const filtered = airports.filter((airport) => {
          const title = airport.presentation?.title?.toLowerCase() || "";
          const subtitle = airport.presentation?.subtitle?.toLowerCase() || "";
          const code = airport.skyId?.toLowerCase() || "";
          return (
            title.includes(term) || subtitle.includes(term) || code.includes(term)
          );
        });

        setFilteredAirports(filtered);
        setSearchLoading(false);

        // Show toast if no results found
        if (filtered.length === 0 && term) {
          toast.info(`No airports found matching "${term}"`);
        }
      }, 500);
    } else {
      setFilteredAirports(airports);
    }
  };

  if (loading) {
    return (
      <div className="airport-container">
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Loading airports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="airport-container">
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
      <h1>List Of Airports</h1>
      <input
        type="text"
        placeholder="Search by city, country or airport code..."
        value={searchTerm}
        onChange={handleSearch}
        className="airport-search"
        aria-label="Search airports"
      />
      
      {searchLoading ? (
        <div className="spinner-container">
          <div className="spinner small-spinner"></div>
          <p>Searching airports...</p>
        </div>
      ) : filteredAirports.length === 0 ? (
        <p className="no-results">No airports found matching "{searchTerm}"</p>
      ) : (
        <div className="airport-grid">
          {filteredAirports.map((airport) => (
            <div className="airport-card" key={airport.skyId}>
              <h3>{airport.presentation?.title || "Unknown Airport"}</h3>
              <p className="country">
                {airport.presentation?.subtitle || "Unknown Country"}
              </p>
              <p className="code">({airport.skyId || "N/A"})</p>
            </div>
          ))}
        </div>
      )}
      
      {error && (
        <button
          onClick={fetchAirports}
          className="retry-button"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default AllAirports;



// import { useEffect, useState } from "react";
// import "../styles/AllAirports.css";



// const AllAirports = () => {
//   const [airports, setAirports] = useState([]);
//   const [filteredAirports, setFilteredAirports] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchAirports = () => {
//     setLoading(true);
//     setError(null);

//     fetch("/searchAirport_mock.json")
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((json) => {
//         const data = json?.data || [];
//         if (!data.length) {
//           setError("No airport data found.");
//           setAirports([]);
//           setFilteredAirports([]);
//         } else {
//           setAirports(data);
//           setFilteredAirports(data);
//         }
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         setError("Failed to load airports. Check your network and try again.");
//         setLoading(false);
//       });
//   };

//   // Initial fetch
//   useEffect(() => {
//     fetchAirports();
//   }, []);

//   const handleSearch = (e) => {
//     const term = e.target.value.toLowerCase();
//     setSearchTerm(term);

//     const filtered = airports.filter((airport) => {
//       const title = airport.presentation?.title?.toLowerCase() || "";
//       const subtitle = airport.presentation?.subtitle?.toLowerCase() || "";
//       const code = airport.skyId?.toLowerCase() || "";
//       return (
//         title.includes(term) || subtitle.includes(term) || code.includes(term)
//       );
//     });

//     setFilteredAirports(filtered);
//   };

//   if (loading) {
//     return <div className="airport-container">Loading airports...</div>;
//   }

//   if (error) {
//     return (
//       <div className="airport-container" style={{ color: "red" }}>
//         {error}
//         <button
//           onClick={fetchAirports}
//           style={{
//             marginTop: "16px",
//             padding: "8px 16px",
//             backgroundColor: "#1e90ff",
//             border: "none",
//             borderRadius: "8px",
//             color: "#fff",
//             cursor: "pointer",
//           }}
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="airport-container">
//       <h1>List Of Airports</h1>
//       <input
//         type="text"
//         placeholder="Search by city ..."
//         value={searchTerm}
//         onChange={handleSearch}
//         className="airport-search"
//         aria-label="Search airports"
//       />
//       {filteredAirports.length === 0 ? (
//         <p>No airports found matching "{searchTerm}".</p>
//       ) : (
//         <div className="airport-grid">
//           {filteredAirports.map((airport) => (
//             <div className="airport-card" key={airport.skyId}>
//               <h3>{airport.presentation?.title || "Unknown Airport"}</h3>
//               <p className="country">
//                 {airport.presentation?.subtitle || "Unknown Country"}
//               </p>
//               <p className="code">({airport.skyId || "N/A"})</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllAirports;
