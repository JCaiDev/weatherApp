import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { describe } from "vitest";

describe("Searchbar Component", () => {
  const mockHandleSearch = vi.fn();

  test("renders input and button", () => {
    render(<SearchBar handleSearch={mockHandleSearch} errorMessage="" />);

    expect(screen.getByPlaceholderText("City")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("calls handleSearch with correct input value on form submission", () => {
    render(<SearchBar handleSearch={mockHandleSearch} errorMessage="" />);

    const input = screen.getByPlaceholderText("City");
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "Toronto" } });
    fireEvent.click(button);

    expect(mockHandleSearch).toHaveBeenCalledWith("Toronto");
  });

  test("shows loading message when fetching city suggestions", async () => {
    const fetchCitySuggestions = vi.fn().mockResolvedValue({
      list: [
        { name: "Toronto, CA" },
        { name: "Toronto, US" },
        { name: "Toronto, EU" },
      ],
    });

    render(
      <SearchBar
        handleSearch={mockHandleSearch}
        errorMessage=""
        fetchCitySuggestions={fetchCitySuggestions}
      />
    );

    const input = screen.getByPlaceholderText("City");
    fireEvent.change(input, { target: { value: "To" } });

    expect(await screen.findByText("Loading cities...")).toBeInTheDocument();
  });

  test("displays error message when city not found", async () => {
    const fetchCitySuggestions = vi.fn().mockResolvedValue({
      list: [],
    });
    render(
      <SearchBar
        handleSearch={mockHandleSearch}
        errorMessage="City not found"
        fetchCitySuggestions={fetchCitySuggestions}
      />
    );

    const input = screen.getByPlaceholderText("City");
    fireEvent.change(input, { target: { value: "NonexistentCity" } });

    await waitFor(() =>
      expect(screen.getByText(/City not found/i)).toBeInTheDocument()
    );
  });
});
