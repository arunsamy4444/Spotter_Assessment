import { useEffect, useState } from "react";
import "../styles/NearbyAirports.css";

const regionCountriesMap = {
  India: ["India"],
  America: ["United States", "Canada"],
  Europe: ["United Kingdom", "France", "Germany"]
};

const NearbyAirports = () => {
  const [data, setData] = useState([]);
  const [region, setRegion] = useState("India");
  const [filteredAirports, setFilteredAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/mock_getNearByAirports.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load airports data");
        return res.json();
      })
      .then((json) => {
        setData(json);
        filterAirportsByRegion(region, json);
      })
      .catch((err) => setError(err.message));
  }, []);

  const filterAirportsByRegion = (selectedRegion, airportData) => {
    const allowedCountries = regionCountriesMap[selectedRegion];
    const result = airportData
      .filter((entry) => allowedCountries.includes(entry.country))
      .flatMap((entry) =>
        entry.airports.map((airport) => ({
          ...airport,
          country: entry.country
        }))
      );

    setFilteredAirports(result);
    if (result.length > 0) setSelectedAirport(result[0].code);
  };

  const handleSearch = () => {
    filterAirportsByRegion(region, data);
  };

  if (error) return <div className="error">{error}</div>;
  if (!data || data.length === 0) return <div className="loading">Loading airports...</div>;

  return (
    <div className="nearby-airports-container">
      <div className="search-controls">
        <label htmlFor="region-select">Select Region:</label>
        <select
          id="region-select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="India">India</option>
          <option value="America">America</option>
          <option value="Europe">Europe</option>
        </select>
        <button onClick={handleSearch}>Search</button>
      </div>

      <h2>Nearby Airports ({filteredAirports.length})</h2>
      <div className="airports-grid">
        {filteredAirports.length === 0 && (
          <div className="no-results">No airports found for this region.</div>
        )}

{filteredAirports.map((airport) => (
  <div
    key={airport.entityId}
    className={`airport-card ${selectedAirport === airport.code ? "selected" : ""}`}
    onClick={() => setSelectedAirport(airport.code)}
  >
    <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>{airport.city}</div>
    <div className="subtitle">{airport.country}</div>

    <div style={{ marginTop: "auto", marginTop: "12px", color: "#1e90ff", fontWeight: 500 }}>
      Airport Code: <span style={{ fontFamily: "monospace" }}>{airport.code}</span>
    </div>

    <div style={{ fontSize: "0.85rem", color: "#aaa", marginTop: 6 }}>
      Entity ID: <span style={{ fontFamily: "monospace" }}>{airport.entityId}</span>
    </div>
  </div>
))}

      </div>

      <div className="selected-airport-display">
        Selected Airport: {selectedAirport || "None"}
      </div>
    </div>
  );
};

export default NearbyAirports;
