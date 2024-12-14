import { useState } from "react";
import "./SearchBar.css";
import React from "react";
const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit clicked with query", query);
    if (query) {
      handleSearch(query);
    }
  };
  return (
    <>
      <div className="search">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="City"
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit" data-testid="submit-button">
            Search
          </button>
        </form>
      </div>
      <p>Please select city to see the forecast</p>
    </>
  );
};

export default SearchBar;
