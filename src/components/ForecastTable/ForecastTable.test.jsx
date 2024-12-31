import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import ForecastTable from "./ForecastTable";

describe("ForecastTable", () => {
  const forecastData = [
    {
      date: "2024-12-29 21:00:00",
      temp: 15,
      minTemp: 12.3,
      maxTemp: 17.8,
      windSpeed: 5.2,
      description: "Clear",
    },
  ];

  test("renders the forecast table and formats date correctly", () => {
    render(<ForecastTable forecastData={forecastData} />);

    expect(screen.getByText("Dec 29, 21:00")).toBeInTheDocument();
    expect(screen.getByText("15 °C")).toBeInTheDocument();
    expect(screen.getByText("12 °C")).toBeInTheDocument();
    expect(screen.getByText("18 °C")).toBeInTheDocument();
    expect(screen.getByText("5 m/s")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });
});
