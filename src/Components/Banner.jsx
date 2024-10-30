import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import "../assets/styles/top.css";
import { BASE_URL } from "../Services/helper";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import img from "../assets/images/freepik__upload__6553.jpeg";

const Banner = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

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
    setSuggestions(fetchedSuggestions.length > 0 ? fetchedSuggestions : [{ name: "No results found", id: null }]);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const handleSuggestionClick = (suggestion) => {
    if (suggestion.id) {
      navigate(`/product/${suggestion.id}`, { state: { product: suggestion, allProducts: suggestions } });
    }
  };

  const renderSuggestion = (suggestion, { query }) => {
    if (!suggestion.id) {
      return <div className="banner-suggestion-item no-result">No results found</div>;
    }

    const matchIndex = suggestion.name.toLowerCase().indexOf(query.toLowerCase());
    const beforeMatch = suggestion.name.slice(0, matchIndex);
    const matchText = suggestion.name.slice(matchIndex, matchIndex + query.length);
    const afterMatch = suggestion.name.slice(matchIndex + query.length);

    return (
      <div className="banner-suggestion-item" onClick={() => handleSuggestionClick(suggestion)}>
        <img src={suggestion.file} alt={suggestion.name} />
        <span>
          {beforeMatch}
          <strong>{matchText}</strong>
          {afterMatch}
        </span>
      </div>
    );
  };

  const inputProps = {
    placeholder: "Search for Products...",
    value,
    onChange,
    className: "banner-search-input",
  };

  return (
    <div
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        // backgroundRepeat:"no-repeat",
        padding: '20px 0px' // Adjust padding to control spacing around the container
      }}
    >
      <div className="banner-search-container">
        <FaSearch className="banner-search-icon" />
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={{
            suggestionsList: "banner-suggestions-list",
            suggestion: "banner-suggestion-item",
          }}
        />
      </div>
    </div>
  );
};

export default Banner;
