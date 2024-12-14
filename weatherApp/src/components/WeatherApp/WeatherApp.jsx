import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentWind, setCurrentWind] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

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

  return (
    <div>
      <h1>Weather Forecast</h1>
      <div className="search--grid">
        <SearchBar handleSearch={handleSearch} />

        {currentWeather && (
          <div className="current--weather">
            <h3>{currentWeather}</h3>
            <span>{currentDescription}</span>
            <br />
            <h3>{currentTemp} °C</h3>
            <span>Wind {currentWind} m/sec</span>
            <br />
            <button>SEE FORECAST</button>
          </div>
        )}
      </div>
      <div className="weather--forecast"></div>
    </div>
  );
};

export default WeatherApp;
