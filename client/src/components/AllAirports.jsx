import { useEffect, useState } from "react";
import "../styles/AllAirports.css";

const AllAirports = () => {
  const [airports, setAirports] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
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
          setError("No airport data found.");
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
        setError("Failed to load airports. Check your network and try again.");
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

    const filtered = airports.filter((airport) => {
      const title = airport.presentation?.title?.toLowerCase() || "";
      const subtitle = airport.presentation?.subtitle?.toLowerCase() || "";
      const code = airport.skyId?.toLowerCase() || "";
      return title.includes(term) || subtitle.includes(term) || code.includes(term);
    });

    setFilteredAirports(filtered);
  };

  if (loading) {
    return <div className="airport-container">Loading airports...</div>;
  }

  if (error) {
    return (
      <div className="airport-container" style={{ color: "red" }}>
        {error}
        <button
          onClick={fetchAirports}
          style={{
            marginTop: "16px",
            padding: "8px 16px",
            backgroundColor: "#1e90ff",
            border: "none",
            borderRadius: "8px",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="airport-container">
      <input
        type="text"
        placeholder="Search by city, country, or code"
        value={searchTerm}
        onChange={handleSearch}
        className="airport-search"
        aria-label="Search airports"
      />
      {filteredAirports.length === 0 ? (
        <p>No airports found matching "{searchTerm}".</p>
      ) : (
        <div className="airport-grid">
          {filteredAirports.map((airport) => (
            <div className="airport-card" key={airport.skyId}>
              <h3>{airport.presentation?.title || "Unknown Airport"}</h3>
              <p className="country">{airport.presentation?.subtitle || "Unknown Country"}</p>
              <p className="code">({airport.skyId || "N/A"})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllAirports;
