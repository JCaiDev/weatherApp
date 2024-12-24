import { useState } from "react";
import { fetchCitySuggestions } from "../../utils/api";
import "./SearchBar.css";

const SearchBar = ({ handleSearch, errorMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setInputValue(query);

    if (query.length >= 2) {
      setIsLoading(true);
      try {
        const data = await fetchCitySuggestions(query);

        const options = data.list.map((city) => city.name);
        setCityOptions(options);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching city suggestions: ", error);
        setCityOptions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCityOptions([]);
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (city) => {
    setInputValue(city);
    setShowSuggestions(false);
    handleSearch(city);
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
          onFocus={() => setShowSuggestions(cityOptions.length > 0)}
        />
        <button type="submit" className="search--button">
          Search
        </button>
      </form>

      {isLoading && <p>Loading cities...</p>}

      {showSuggestions && (
        <ul className="suggestion--list">
          {cityOptions.map((city, index) => (
            <li
              key={index}
              className="suggestion--item"
              onClick={() => handleSuggestionClick(city)}
            >
              {city}
            </li>
          ))}
        </ul>
      )}

      {errorMessage && <p className="error--message">{errorMessage}</p>}

      <p className="input--message">Please enter a city to see the forecast</p>
    </div>
  );
};

export default SearchBar;
