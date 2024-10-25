import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import "../assets/styles/top.css"; 
import { BASE_URL } from "../Services/helper";

const Banner = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Function to fetch product suggestions from the API
  const fetchSuggestions = async (inputValue) => {
    try {
      const response = await fetch(`${BASE_URL}/user/search?name=${inputValue}`);
      const data = await response.json();
      return data; // Assuming data is an array of product objects
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

    // Fetching suggestions from the API
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
    placeholder: "Search for products...",
    value,
    onChange,
    className: "search-input",
  };
console.log(value);

  return (
    <div className="search-container">
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={(suggestion) => (
          <div className="suggestion-item">
            <img src={suggestion.file} alt={suggestion.name} style={{ width: '30px', height: '30px', marginRight: '10px' }} />
            {suggestion.name}
          </div>
        )}
        inputProps={inputProps}
      />
    </div>
  );
};

export default Banner;
