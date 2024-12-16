import React, { useState, useEffect } from "react";
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
      const data = await response.json();
      console.log("weather data:", data);

      setCurrentWeather(data.weather[0].main);
      setCurrentDescription(data.weather[0].description);
      setCurrentTemp(data.main.temp);
      setCurrentWind(data.wind.speed);
    } catch (error) {
      console.error("error fetching data:", error);
      setCurrentWeather("");
      setCurrentWind("");
      setCurrentDescription("");
      setCurrentTemp("");
    }
  };

  const fetchForecast = () => {
    const data = [
      {
        date: "Dec 17, 11:00AM",
        temp: 20,
        minTemp: 18,
        maxTemp: 22,
        windSpeed: 5,
        description: "Clear",
      },
      {
        date: "2:00 PM",
        temp: 22,
        minTemp: 20,
        maxTemp: 24,
        windSpeed: 6,
        description: "Sunny",
      },
      {
        date: "5:00 PM",
        temp: 21,
        minTemp: 19,
        maxTemp: 23,
        windSpeed: 4,
        description: "Partly Cloudy",
      },
      {
        date: "8:00 PM",
        temp: 19,
        minTemp: 17,
        maxTemp: 21,
        windSpeed: 3,
        description: "Cloudy",
      },
      {
        date: "11:00 PM",
        temp: 18,
        minTemp: 16,
        maxTemp: 20,
        windSpeed: 2,
        description: "Clear",
      },
    ];
    setForecastData(data);
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
      {!showForeCast && <div className="forecast--placeholder" />}
      {showForeCast && <ForecastTable forecastData={forecastData} />}
    </div>
  );
};

export default WeatherApp;
