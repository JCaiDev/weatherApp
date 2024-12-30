import React, { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ForecastTable from "../ForecastTable/ForecastTable";
import {
  fetchCurrentWeather,
  fetchForecastData,
  apiKey,
} from "../../utils/api";
import { formatDate, getLocalDate, getformattedDate } from "../../utils/format";
import "./WeatherApp.css";

const WeatherApp = () => {
  const [currentWeather, setCurrentWeather] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [currentWind, setCurrentWind] = useState("");
  const [currentTemp, setCurrentTemp] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const [showForeCast, setShowForecast] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timezoneOffSet, setTimezoneOffSet] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const baseDate = new Date();

  const handleSearch = async (query) => {
    setQuery(query);
    setForecastData([]);
    setErrorMessage("");
    try {
      const weatherData = await fetchCurrentWeather(query, apiKey);

      setCurrentWeather(weatherData.weather?.[0]?.main || "City not found");
      setCurrentDescription(weatherData.weather?.[0]?.description);
      setCurrentTemp(Math.round(weatherData.main?.temp));
      setCurrentWind(Math.round(weatherData.wind?.speed));
      fetchForecast(query);
    } catch (error) {
      setCurrentWeather("");
      setCurrentWind("");
      setCurrentDescription("");
      setCurrentTemp("");
      setErrorMessage("City not found.");
    }
  };

  const fetchForecast = async (query) => {
    if (!query) return;
    try {
      const forecastData = await fetchForecastData(query, apiKey);

      const timezoneOffSet = forecastData.city?.timezone || 0;
      setTimezoneOffSet(timezoneOffSet);

      const processedData = forecastData.list.map((entry) => {
        const localDate = getLocalDate(entry);

        return {
          localDateTime: new Date(entry.dt * 1000),
          localDate,
          date: formatDate(new Date(entry.dt * 1000)),
          temp: entry.main.temp,
          minTemp: entry.main.temp_min,
          maxTemp: entry.main.temp_max,
          windSpeed: entry.wind.speed,
          description: entry.weather?.[0]?.description || "n/a",
        };
      });

      const selectedLocalDate = formatDate(
        selectedDate.getTime() + timezoneOffSet * 1000,
        "yyyy-MM-dd"
      );
      const filteredData = processedData.filter(
        (entry) => entry.localDate === selectedLocalDate
      );

      setForecastData(filteredData);
    } catch (error) {
      console.error("error fetching forecast data: ", error);
    }
  };

  const handleForecastToggle = () => {
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
            <button
              className="showForecast--button"
              onClick={handleForecastToggle}
            >
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
                  baseDate.getTime() + index * 86400000 + timezoneOffSet * 1000
                );

                const formattedDate = getformattedDate(buttonDate);

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
