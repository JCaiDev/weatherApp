export const fetchCurrentWeather = async (query, apiKey) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
    );
    if (!response.ok)
      throw new Error(
        `Error fetching current weather data: ${response.statusText}`
      );
    return await response.json();
  } catch (error) {
    console.error("Error fetching current weather data: " + error.message);
  }
};

export const fetchForecastData = async (query, apiKey) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}&units=metric`
    );
    if (!response.ok)
      throw new Error(`Error fetching forecast data: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching forecast data: " + error.message);
  }
};

export const fetchCitySuggestions = async (query) => {
  if (!query || query.length < 2) {
    return { list: [] };
  }

  try {
    const apiKey = import.meta.env.VITE_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error(`Error fetching city suggestion: ${response.statusText}`);
    }
    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Unexpected API response structure");
    }

    const validatedData = data.map((city) => ({
      name: `${city.name}, ${city.country}` || "",
      lat: city.lat || 0,
      long: city.lon || 0,
      countryCode: city.country || "",
    }));

    return { list: validatedData };
  } catch (error) {
    console.error("Error fetching city suggestions: ", error);
    return { list: [] };
  }
};
