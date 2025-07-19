import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
} from "react-router-dom";
import AllAirports from "./components/AllAirports";
import FlightResults from "./components/FlightResults";
import NearbyAirports from "./components/NearbyAirports";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <Router>
      <header className="header">
        <div className="logo">✈️ Flights</div>
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <NavLink to="/airports" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
            All Airports
          </NavLink>
          <NavLink to="/results" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
            Flights
          </NavLink>
          <NavLink to="/nearby" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
            Nearby Airports
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/airports" element={<AllAirports />} />
        <Route path="/results" element={<FlightResults />} />
        <Route path="/nearby" element={<NearbyAirports />} />
        <Route path="*" element={<Navigate to="/airports" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
