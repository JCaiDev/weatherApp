import { useState } from "react";
import "./SearchBar.css";

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
      <div className="search--bar">
        <form className="search--form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search--input"
            placeholder="City"
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit" className="search--button">
            Search
          </button>
        </form>
        {
          <p className="input--message">
            Please select city to see the forecast
          </p>
        }
      </div>
    </>
  );
};

export default SearchBar;
