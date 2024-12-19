import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ForecastTable from "../ForecastTable/ForecastTable";
import "./WeatherApp.css";
import { format } from "date-fns";

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentWind, setCurrentWind] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const [showForeCast, setShowForecast] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const baseDate = new Date();
  const [timezoneOffSet, setTimezoneOffSet] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  const handleSearch = async (query) => {
    setQuery(query);
    setForecastData([]);
    setErrorMessage("");
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
      setErrorMessage("City not found.");
    }
    fetchForecast(query);
  };

  const fetchForecast = async (query) => {
    console.log("fetching forecast for city:", query);
    if (!query) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("Forecast not available");
      const forecastData = await response.json();

      console.log("Forecast weather data:", forecastData);

      // Adjust for local timezone
      const timezoneOffset = forecastData.city?.timezone || 0;
      setTimezoneOffSet(timezoneOffset);

      const processedData = forecastData.list.map((entry) => {
        // UTC to local time
        const dateTime = new Date(entry.dt * 1000);
        dateTime.setSeconds(dateTime.getSeconds() + timezoneOffSet);

        const localDate = format(dateTime, "yyyy-MM-dd");

        return {
          localDateTime: dateTime,
          localDate,
          date: format(dateTime, "MMM dd, HH:mm"),
          temp: entry.main.temp,
          minTemp: entry.main.temp_min,
          maxTemp: entry.main.temp_max,
          windSpeed: entry.wind.speed,
          description: entry.weather?.[0]?.description || "n/a",
        };
      });

      const selectedLocalDate = format(selectedDate, "yyyy-MM-dd");

      const filteredData = processedData.filter(
        (entry) => entry.localDate === selectedLocalDate
      );

      console.log("filtered forecast data:", filteredData);

      setForecastData(filteredData);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
      setErrorMessage("Forecast not available.");
    }
  };

  const handleForecastToggle = () => {
    console.log("query value:", query);
    setShowForecast(!showForeCast);
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  useEffect(() => {
    if (query) {
      fetchForecast(query);
    }
  }, [selectedDate, query]);

  return (
    <div className="weather--app--container">
      <h1>Weather Forecast</h1>
      <div className="search--grid">
        <SearchBar handleSearch={handleSearch} errorMessage={errorMessage} />

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

      {showForeCast && (
        <div className="forecast--container">
          <ForecastTable forecastData={forecastData} />

          <div className="forecast--date--buttons">
            {Array(6)
              .fill(null)
              .map((_, index) => {
                const buttonDate = new Date(
                  baseDate.getTime() + index * 86400000 + timezoneOffSet
                );

                const formattedDate = format(buttonDate, "MMM dd");

                return (
                  <button
                    key={index}
                    onClick={() => handleDateChange(buttonDate)}
                    className={
                      buttonDate.toDateString() === selectedDate.toDateString()
                        ? "active"
                        : ""
                    }
                  >
                    {formattedDate}
                  </button>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
