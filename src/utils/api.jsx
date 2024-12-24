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

export const fetchCitySuggestions = async (query) => {
  if (!query || query.length < 2) {
    return { list: [] };
  }

  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch city suggestions");
    }
    const data = await response.json();
    return {
      list:
        data.map((city) => ({
          name: `${city.name}, ${city.country}`,
          lat: city.lat,
          long: city.lon,
          countryCode: city.country,
        })) || [],
    };
  } catch (error) {
    console.error("Error fetching city suggestions: ", error);
    return { list: [] };
  }
};
