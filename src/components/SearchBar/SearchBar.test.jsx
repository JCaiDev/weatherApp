import { describe, expect, test, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  // test("focuses text input when clicked", () => {
  //   const mockHandleSearch = vi.fn();

  //   render(<SearchBar handleSearch={mockHandleSearch} />);
  //   const textInput = screen.getByTestId("text-input");
  //   userEvent.click(textInput);
  //   expect(textInput).toHaveFocus();
  // });

  test("triggers handle when button is clicked", () => {
    const mockHandleSearch = vi.fn();

    render(<SearchBar handleSearch={mockHandleSearch} />);
    const submitButton = screen.getByTestId("submit-button");
    userEvent.click(submitButton);
    expect(mockHandleSearch).toHaveBeenCalledOnce();
  });
});
