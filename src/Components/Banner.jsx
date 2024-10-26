import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import "../assets/styles/top.css"; 
import { BASE_URL } from "../Services/helper";
import { FaSearch } from "react-icons/fa"; // Import search icon from react-icons

const Banner = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (inputValue) => {
    try {
      const response = await fetch(`${BASE_URL}/user/search?name=${inputValue}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      return [];
    }
  };

  const getSuggestions = async (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    if (inputLength === 0) {
      return [];
    }

    const fetchedSuggestions = await fetchSuggestions(inputValue);
    
    return fetchedSuggestions.filter(
      (product) => product.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const onSuggestionsFetchRequested = async ({ value }) => {
    const fetchedSuggestions = await getSuggestions(value);
    setSuggestions(fetchedSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const inputProps = {
    placeholder: "Search for Products...",
    value,
    onChange,
    className: "banner-search-input",
  };

  return (
    <div className="banner-search-container">
      <FaSearch className="banner-search-icon" /> {/* Search icon */}
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={(suggestion) => (
          <div className="banner-suggestion-item">
            <img src={suggestion.file} alt={suggestion.name} />
            {suggestion.name}
          </div>
        )}
        inputProps={inputProps}
        theme={{
          suggestionsList: "banner-suggestions-list",
          suggestion: "banner-suggestion-item",
        }}
      />
    </div>
  );
};

export default Banner;
