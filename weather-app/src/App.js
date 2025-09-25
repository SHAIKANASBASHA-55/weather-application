import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { RandomColor } from "./styles.js";
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { TiLocationArrowOutline } from "react-icons/ti";
import { CiCloudOn, CiCloudDrizzle, CiSun } from "react-icons/ci";

const API_KEY = "b81b6799c2282dbb9792e9d52e8d2101";

// Forecast icons mapping
const getWeatherIcon = (desc) => {
  const d = desc.toLowerCase();
  if (d.includes("rain")) return <CiCloudDrizzle />;
  if (d.includes("cloud")) return <CiCloudOn />;
  if (d.includes("sun")) return <CiSun />;
  return <CiCloudOn />;
};

// Component to render city cards
function RenderingArrayOfCityObjects({ cityData, onRemove, toggleFavorite }) {
  const citylistItems = cityData.map((city, index) => {
    const cardColor = RandomColor();

    const forecast = Array(3).fill().map((_, i) => ({
      day: `Day ${i + 1}`,
      tempMin: city.minTemperature - i,
      tempMax: city.maxTemperature + i,
      icon: getWeatherIcon(city.description)
    }));

    return (
      <div className="card animate-card" key={index}>
        <div className="top-division" style={{ background: cardColor }}>
          <div className='top-leftDivision'>
            <h2 className='city-name'>{city.cityName},{city.country}</h2>
            <p className='city-time'>{city.lastUpdatedTime}</p>
            <div className='weather-desc'>
              {getWeatherIcon(city.description)}
              <p className='weather-description'>{city.description}</p>
            </div>
          </div>
          <div className='top-rightDivision'>
            <div className='temp-content'>
              <h1 className='temp'>{city.temperature}°C</h1>
              <p className='temp-min'>Min: {city.minTemperature}°C</p>
              <p className='temp-max'>Max: {city.maxTemperature}°C</p>
            </div>
          </div>
        </div>

        <div className="bottom-division">
          <div className='bottom-content'>
            <div className="extra-details">
              <p className='pressure'>Pressure : {city.pressure} hPa</p>
              <p className='humidity'>Humidity : {city.humidity}%</p>
              <p className='visibility'>Visibility : {city.visibility}</p>
            </div>
            <div className="wind">
              <div className='wind-content'>
                <div className='wind-icon'><TiLocationArrowOutline /></div>
                <div><p className='wind-speed'>{city.wind}</p></div>
              </div>
            </div>
            <div className="sun">
              <p className='sun-rise'>Sunrise : {city.sunrise}</p>
              <p className='sun-set'>Sunset : {city.sunset}</p>
            </div>
          </div>
        </div>

        {/* Forecast Section */}
        <div className="forecast-section">
          {forecast.map((f, i) => (
            <div className="forecast-card" key={i}>
              <p>{f.day}</p>
              {f.icon}
              <p>{f.tempMin}°C / {f.tempMax}°C</p>
            </div>
          ))}
        </div>

        {/* Favorite & Remove Buttons */}
        <div className="card-buttons">
          <button className="favorite-btn" onClick={() => toggleFavorite(city.cityName)}>
            {city.favorite ? "★ Favorite" : "☆ Favorite"}
          </button>
          <button className="remove-btn" onClick={() => onRemove(city.cityName)}>❌ Remove</button>
        </div>
      </div>
    );
  });

  return <div className="card-container">{citylistItems}</div>;
}

// WeatherNews - design-only component
function WeatherNews({ count = 5 }) {
  const ICON_BY_TYPE = {
    Clear: <CiSun />,
    Cloudy: <CiCloudOn />,
    Rain: <CiCloudDrizzle />
  };

  const SAMPLE_CITIES = [
    "Rio de Janeiro, BR",
    "Osaka, JP",
    "Nairobi, KE",
    "Toronto, CA",
    "Sydney, AU",
    "Berlin, DE",
    "Mumbai, IN"
  ];

  const SAMPLE_TITLES = [
    "Unexpected downpour drenches downtown",
    "Sun breaks through after overnight clouds",
    "Light drizzle forces event delays",
    "Rare early snowfall blankets suburbs",
    "Strong gusts topple market stalls",
    "Heat spike triggers local advisories"
  ];

  const SAMPLE_BODIES = [
    "Commuters reported heavy puddling on main roads. Light traffic disruption expected.",
    "Temperatures rose quickly after sunrise; locals enjoyed clear skies by midday.",
    "Organizers postponed outdoor activities; umbrellas sold out near waterfront.",
    "Snow coated cars and rooftops; municipal crews started clearing main arteries.",
    "Several trees uprooted; minor power outages reported in a few neighborhoods.",
    "Heat index reached uncomfortable levels; hydration stations were set up at parks."
  ];

  const RandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const timeAgo = () => {
    const now = Date.now();
    const past = now - RandomInt(5 * 60 * 1000, 24 * 60 * 60 * 1000);
    return new Date(past);
  };

  const formatRelativeTime = (d) => {
    const diff = Date.now() - d.getTime();
    const mins = Math.floor(diff / (60 * 1000));
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    return `${hrs} hr${hrs > 1 ? "s" : ""} ago`;
  };

  const events = Array(count).fill().map(() => {
    const city = SAMPLE_CITIES[RandomInt(0, SAMPLE_CITIES.length - 1)];
    const typeKeys = Object.keys(ICON_BY_TYPE);
    const type = typeKeys[RandomInt(0, typeKeys.length - 1)];
    return {
      city,
      type,
      icon: ICON_BY_TYPE[type],
      title: SAMPLE_TITLES[RandomInt(0, SAMPLE_TITLES.length - 1)],
      body: SAMPLE_BODIES[RandomInt(0, SAMPLE_BODIES.length - 1)],
      time: timeAgo(),
      color: RandomColor()
    };
  });

  return (
    <section className="wn-wrapper">
      <h2>Weather News <span className="wn-sub">— last 24 hours</span></h2>
      <div className="wn-list">
        {events.map((e, i) => (
          <div className="wn-card" key={i}>
            <div className="wn-card-left" style={{ background: e.color }}>
              <div className="wn-icon">{e.icon}</div>
              <div className="wn-type">{e.type}</div>
            </div>
            <div className="wn-card-right">
              <div className="wn-meta">
                <span className="wn-city">{e.city}</span>
                <span className="wn-time">{formatRelativeTime(e.time)}</span>
              </div>
              <h3 className="wn-title">{e.title}</h3>
              <p className="wn-body">{e.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// Main App component
function App() {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Detect current location weather on load
  useEffect(() => {
    detectLocationWeather(true);
  }, []);

  const detectLocationWeather = (isAuto = false) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const data = res.data;
          const cityObj = {
            cityName: data.name,
            country: data.sys.country,
            temperature: Math.round(data.main.temp),
            minTemperature: Math.round(data.main.temp_min),
            maxTemperature: Math.round(data.main.temp_max),
            description: data.weather[0].description,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            visibility: `${data.visibility / 1000} km`,
            wind: `${data.wind.speed} m/s`,
            sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
            lastUpdatedTime: new Date().toLocaleTimeString(),
            favorite: false,
          };

          setCities(prev => {
            if (isAuto) return [cityObj];
            if (prev.some(c => c.cityName === cityObj.cityName)) return prev;
            return [...prev, cityObj];
          });
        } catch (err) {
          console.error("Location fetch failed:", err);
          if (!isAuto) setError("Could not fetch your current location weather");
        }
      });
    }
  };

  const addCity = () => {
    const trimmedInput = search.trim();
    if (!trimmedInput) return;

    const cityList = trimmedInput.split(",").map(c => c.trim()).filter(c => c);
    const newCityList = cityList.filter(c =>
      !cities.some(existing => existing.cityName.toLowerCase() === c.toLowerCase())
    );
    if (newCityList.length === 0) {
      setError("All cities already added or invalid input");
      return;
    }

    const query = newCityList.join(",");
    setLoading(true);
    axios.get(`http://localhost:3001/weather/cities?names=${query}`)
      .then(response => {
        if (!response.data || response.data.length === 0) {
          setError("City not found");
          return;
        }
        const updatedData = response.data.map(c => ({ ...c, favorite: false }));
        setCities(prev => [...prev, ...updatedData]);
        setSearch("");
        setError("");
      })
      .catch(err => {
        console.error("Error fetching cities:", err);
        setError(err.response?.data?.message || "Error fetching cities");
      })
      .finally(() => setLoading(false));
  };

  const removeCity = (cityName) => {
    setCities(prev => prev.filter(city => city.cityName !== cityName));
  };

  const toggleFavorite = (cityName) => {
    setCities(prev => prev.map(city => city.cityName === cityName ? { ...city, favorite: !city.favorite } : city));
  };

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (cities.length > 0) {
        const query = cities.map(c => c.cityName).join(",");
        axios.get(`http://localhost:3001/weather/cities?names=${query}`)
          .then(response => {
            if (response.data) {
              const refreshedData = response.data.map(c => {
                const oldCity = cities.find(old => old.cityName === c.cityName);
                return { ...c, favorite: oldCity?.favorite || false };
              });
              setCities(refreshedData);
            }
          })
          .catch(err => console.error("Auto-refresh failed:", err));
      }
    }, 300000);
    return () => clearInterval(interval);
  }, [cities]);

  const favoriteCities = cities.filter(c => c.favorite);
  const normalCities = cities.filter(c => !c.favorite);

  const avgTemp = cities.length ? (cities.reduce((sum, c) => sum + c.temperature, 0) / cities.length).toFixed(1) : "-";
  const avgHumidity = cities.length ? (cities.reduce((sum, c) => sum + c.humidity, 0) / cities.length).toFixed(1) : "-";
  const maxWind = cities.length ? Math.max(...cities.map(c => parseFloat(c.wind))) : "-";

  return (
    <div className="app">
      <Header
        cities={cities}
        avgTemp={avgTemp}
        avgHumidity={avgHumidity}
        maxWind={maxWind}
      />

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city or multiple cities (comma separated)"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={(e) => { if (e.key === "Enter") addCity(); }}
        />
        <button onClick={addCity} disabled={loading}>
          {loading ? <span className="loader"></span> : "Add City"}
        </button>
        <button onClick={() => detectLocationWeather(false)}>📍 Detect Location</button>
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {favoriteCities.length > 0 && (
        <>
          <h3 style={{ textAlign: "center" }}>★ Favorites</h3>
          <RenderingArrayOfCityObjects cityData={favoriteCities} onRemove={removeCity} toggleFavorite={toggleFavorite} />
        </>
      )}

      <RenderingArrayOfCityObjects cityData={normalCities} onRemove={removeCity} toggleFavorite={toggleFavorite} />

      {/* ======= WEATHER NEWS COMPONENT ======= */}
      <WeatherNews />

      <Footer />
    </div>
  );
}

export default App;
