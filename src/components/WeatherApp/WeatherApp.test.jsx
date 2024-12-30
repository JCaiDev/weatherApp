import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";
import WeatherApp from "./WeatherApp";
import * as api from "../../utils/api";

vi.mock("../../utils/api");

describe("WeatherApp", () => {
  const mockWeatherData = {
    weather: [{ main: "Clouds", description: "overcast clouds" }],
    main: { temp: 2.65 },
    wind: { speed: 10.29 },
  };

  const mockForecastData = {
    city: { timezone: -18000 },
    list: [
      {
        dt: 1735581600,
        main: { temp: 2.7, temp_min: 2.7, temp_max: 2.77 },
        wind: { speed: 7.27 },
        weather: [{ description: "light rain" }],
      },
    ],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the WeatherApp component", () => {
    render(<WeatherApp />);
    expect(screen.getByText(/Weather Forecast/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Please enter a city to see the forecast/i)
    ).toBeInTheDocument();
  });

  test("fetches and displays current weather data", async () => {
    api.fetchCurrentWeather.mockResolvedValue(mockWeatherData);
    api.fetchForecastData.mockResolvedValue(mockForecastData);

    render(<WeatherApp />);

    const searchInput = screen.getByPlaceholderText(/City/i);
    fireEvent.change(searchInput, { target: { value: "Toronto" } });

    const searchButton = screen.getByText(/Search/i);
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/overcast clouds/i)).toBeInTheDocument();
      expect(screen.getByText(/3 °C/i)).toBeInTheDocument();
      expect(screen.getByText(/wind speed: 10 m\/sec/i)).toBeInTheDocument();
    });
  });
});
