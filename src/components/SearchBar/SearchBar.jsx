import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ handleSearch, errorMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimQuery = inputValue.trim().replace(/\s+/g, " ");
    if (trimQuery) {
      handleSearch(trimQuery);
    }
  };

  return (
    <div className="search--bar">
      <form className="search--form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="search--input"
          placeholder="City"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button type="submit" className="search--button">
          Search
        </button>
      </form>
      {errorMessage && <p className="error--message">{errorMessage}</p>}

      <p className="input--message">Please enter a city to see the forecast</p>
    </div>
  );
};

export default SearchBar;
