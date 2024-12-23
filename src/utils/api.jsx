export const fetchCurrentWeather = async (query, apiKey) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("City not found");
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching weather data: " + error.message);
  }
};

export const fetchForecastData = async (query, apiKey) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) throw new Error("Forecast not available");
    return await response.json();
  } catch (error) {
    throw new Error("Error fetching forecast data: " + error.message);
  }
};
