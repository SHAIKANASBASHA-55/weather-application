import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import headerLogo from "../assets/header.png";


function Header({ cities, avgTemp, avgHumidity, maxWind }) {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <header className="header">
  <div className="header-inner">
    <button className="menu-btn" onClick={() => setShowSidebar(!showSidebar)}>
      <HiMenuAlt3 size={24} />
    </button>
    <img src={headerLogo} alt="Weather App Logo" className="header-logo" />

    <h1 className="header-title">Weather App</h1>
  </div>



      {/* Sidebar moved here */}
      <div className={`sidebar ${showSidebar ? "open" : ""}`}>
        <h2>📊 Weather Stats</h2>
        <p>Total Cities: {cities.length}</p>
        <p>Avg Temperature: {avgTemp}°C</p>
        <p>Avg Humidity: {avgHumidity}%</p>
        <p>Max Wind Speed: {maxWind} m/s</p>
      </div>
    </header>
  );
}

export default Header;
