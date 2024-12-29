import { formatForecastDate } from "./ForecastTable.jsx";

describe("formatForecastDate", () => {
  test("formats a valid date string correctly", () => {
    const input = "2024-12-29 21:00:00";
    const result = formatForecastDate(input);
    expect(result).toBe("Dec 29, 19:00");
  });

  test('returns "Invalid Date" for an invalid dateString', () => {
    const input = "invalid-date";
    const result = formatForecastDate(input);
    expected(result).toBe("Invalid Date");
  });
  test('returns "Invalid Date" for empty input', () => {
    const input = "";
    const result = formatForecastDate(input);
    expect(result).toBe("Invalid Date");
  });

  test('returns "Invalid Date" for null input', () => {
    const input = null;
    const result = formatForecastDate(input);
    expect(result).toBe("Invalid Date");
  });
});
