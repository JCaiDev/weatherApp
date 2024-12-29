import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";
import { describe } from "vitest";

describe("Searchbar Component", () => {
  const mockHandleSearch = vi.fn();

  it("renders input and button", () => {
    render(<SearchBar handleSearch={mockHandleSearch} errorMessage="" />);

    expect(screen.getByPlaceholderText("City")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("calls handleSearch with correct input value on form submission", () => {
    render(<SearchBar handleSearch={mockHandleSearch} errorMessage="" />);

    const input = screen.getByPlaceholderText("City");
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "Toronto" } });
    fireEvent.click(button);

    expect(mockHandleSearch).toHaveBeenCalledWith("Toronto");
  });

  it("shows loading message when fetching city suggestions", async () => {
    const fetchCitySuggestions = vi.fn().mockResolvedValue({
      list: [{ name: "Toronto" }, { name: "Ottawa" }, { name: "Tokyo" }],
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
});
