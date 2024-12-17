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
  const [query, setQuery] = useState("");
  // const [selectedDayIndex, setSelectDayIndex] = useState(0);

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSearch = async (query) => {
    setQuery(query);
    setForecastData([]);
    try {
      fetchCurrentWeather(query);
    } catch (error) {
      console.error("error fetching current weather data:", error);
    }
  };

  const fetchCurrentWeather = async (query) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}
&units=metric`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();

      console.log("Current weather data:", data);

      setCurrentWeather(data.weather?.[0]?.main || "City not found");
      setCurrentDescription(data.weather?.[0]?.description);
      setCurrentTemp(Math.round(data.main?.temp));
      setCurrentWind(Math.round(data.wind?.speed));
    } catch (error) {
      console.error("Error fetching current weather data:", error);
      setCurrentWeather("");
      setCurrentWind("");
      setCurrentDescription("");
      setCurrentTemp("");
    }
    fetchForecast(query);
  };

  const fetchForecast = async (query) => {
    console.log("fetching forecast for city:", query);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("Forecast not available");
      const forecastData = await response.json();

      console.log("Forecast weather data:", forecastData);

      const processedData = forecastData.list
        .filter((entry) => {
          const entryDate = new Date(entry.dt_txt.split(" ")[0]);
          const currentDate = new Date();
          const todayDate = currentDate.toISOString().split("T")[0];

          return entryDate.toISOString().split("T")[0] === todayDate;
        })
        .map((entry) => ({
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
    console.log("see forecast button clicked");
    console.log("query value:", query);
    setShowForecast(!showForeCast);
  };

  // const handleDayChange = (index) => {
  //   setSelectDayIndex(index);
  // };

  useEffect(() => {
    if (query) {
      fetchForecast(query);
    }
  }, [query]);

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

      {showForeCast &&
        (forecastData.length > 0 ? (
          <div>
            <ForecastTable forecastData={forecastData} />
            {/* <div>
              {forecastData.map((_, index) => (
                <button key={index} onClick={() => handleDayChange(index)}>
                  {" "}
                  Day {index + 1}
                </button>
              ))}
            </div> */}
          </div>
        ) : (
          <p>No forecast data available. Please try another city.</p>
        ))}
    </div>
  );
};

export default WeatherApp;
