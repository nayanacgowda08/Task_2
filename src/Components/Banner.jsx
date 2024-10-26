import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import "../assets/styles/top.css";
import { BASE_URL } from "../Services/helper";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Banner = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const mockData = [
    {
      id: 2,
      name: "iphone2",
      description: "desc",
      price: 20.0,
      stock: 0,
      merchantId: 1,
      merchantName: "Girish G Gonda",
      merchantTotalProducts: 2,
      merchantTotalOrders: 4,
      productRating: 3.0,
      file: "http://res.cloudinary.com/dzsm5ypo2/image/upload/v1729876903/avrxuxqthd1mnfokkfgd.jpg",
      ratingCount: 2,
    },
    {
      id: 1,
      name: "Iphone",
      description: "desc",
      price: 10.0,
      stock: 0,
      merchantId: 1,
      merchantName: "Girish G Gonda",
      merchantTotalProducts: 2,
      merchantTotalOrders: 4,
      productRating: 3.7,
      file: "http://res.cloudinary.com/dzsm5ypo2/image/upload/v1729876518/p9wvvo3gugrwvqtangx6.png",
      ratingCount: 6,
    },
  ];
  const fetchSuggestions = async (inputValue) => {
    try {
      const response = await fetch(`${BASE_URL}/user/search?name=${inputValue}`);
      const data = await response.json();
      return mockData; //need to change this as data
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

  // const handleSuggestionClick = (suggestion) => {
  //   navigate(`/product/${suggestion.id}`, { state: { product: suggestion } }); // Pass product details in state
  // };

  const handleSuggestionClick = (suggestion) => {
    navigate(`/product/${suggestion.id}`, { state: { product: suggestion, allProducts: suggestions } });
  };

  const inputProps = {
    placeholder: "Search for Products...",
    value,
    onChange,
    className: "banner-search-input",
  };

  return (
    <div className="banner-search-container">
      <FaSearch className="banner-search-icon" />
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={(suggestion) => (
          <div
            className="banner-suggestion-item"
            onClick={() => handleSuggestionClick(suggestion)} // Navigate on click
          >
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
