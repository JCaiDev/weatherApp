import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ForecastTable from "../ForecastTable.jsx/ForecastTable";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentWind, setCurrentWind] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const [showForeCast, setShowForecast] = useState(false);

  const apiKey = import.meta.env.VITE_API_KEY;
  /* replace apiKey = 1e14a28a455e16d03e606f712d1ed019 */
  const handleSearch = async (query) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}
&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();

      console.log("Weather Data:", data);

      setCurrentWeather(data.weather?.[0]?.main || "City not found");
      setCurrentDescription(data.weather?.[0]?.description);
      setCurrentTemp(data.main?.temp);
      setCurrentWind(data.wind?.speed);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setCurrentWeather("");
      setCurrentWind("");
      setCurrentDescription("");
      setCurrentTemp("");
    }
  };

  const fetchForecast = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("Forecast not available");
      const forecastData = await response.json();
      console.log("Forecast weather data:", forecastData);

      const processedData = forecastData.list.slice(0, 5).map((entry) => ({
        date: new Date(entry.dt * 1000).toLocaleString(),
        temp: entry.main.temp,
        minTemp: entry.main.temp_min,
        maxTemp: entry.main.temp_max,
        windSpeed: entry.wind.speed,
        description: entry.weather?.[0]?.description || "n/a",
      }));

      setForecastData(processedData);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const handleForecastToggle = () => {
    if (!showForeCast) {
      fetchForecast();
    }
    setShowForecast(!showForeCast);
  };

  return (
    <div className="weather--app--container">
      <h1>Weather Forecast</h1>
      <div className="search--grid">
        <SearchBar handleSearch={handleSearch} />

        {currentWeather && (
          <div className="current--weather">
            <h3>{currentWeather}</h3>
            <span className="weather--description">{currentDescription}</span>
            <br />
            <h3>{currentTemp} °C</h3>
            <span className="wind--speed">wind speed: {currentWind} m/sec</span>
            <br />
            <button onClick={handleForecastToggle}>
              {showForeCast ? "Close Forecast" : "See Forecast"}
            </button>
          </div>
        )}
      </div>

      {showForeCast && <ForecastTable forecastData={forecastData} />}
    </div>
  );
};

export default WeatherApp;
