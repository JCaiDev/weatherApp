import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ handleSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit clicked with query", inputValue);

    const trimQuery = inputValue.trim();
    if (trimQuery) {
      handleSearch(inputValue);
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
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit" className="search--button">
            Search
          </button>
        </form>

        <p className="input--message">
          Please enter a city to see the forecast
        </p>
      </div>
    </>
  );
};

export default SearchBar;
