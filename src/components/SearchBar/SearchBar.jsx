import { useState, useCallback } from "react";
import { fetchCitySuggestions } from "../../utils/api";
import { debounce } from "lodash";
import "./SearchBar.css";

const SearchBar = ({ handleSearch, errorMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const debouncedFetchCitySuggestions = useCallback(
    debounce(async (query) => {
      if (query.length >= 2) {
        setIsLoading(true);
        try {
          const data = await fetchCitySuggestions(query);

          const options = [...new Set(data.list.map((city) => city.name))];

          setCityOptions(options);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Error fetching city suggestions:", error);
          setCityOptions([]);
          setShowSuggestions(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCityOptions([]);
        setShowSuggestions(false);
      }
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const query = e.target.value;
    setInputValue(query);
    debouncedFetchCitySuggestions(query);
  };

  const handleSuggestionClick = (city) => {
    setInputValue(city);
    setShowSuggestions(false);
    handleSearch(city);
  };
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 300);
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
          onBlur={handleBlur}
        />
        <button type="submit" className="search--button">
          Search
        </button>
      </form>

      {isLoading && <p className="loading--message">Loading cities...</p>}

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
