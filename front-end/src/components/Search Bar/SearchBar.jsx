import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import search icon from react-icons
import "./SearchBar.css"; // Import CSS for styling

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/vehicles`, {
        params: { search: query }, // Send search query as a parameter
      });
      // Redirect to the results page or update state to show results
      navigate("/search-results", { state: { vehicles: response.data } });
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <div className="search-input-container">
        <FaSearch className="search-icon" />
        <input
          className="search-input"
          type="search"
          placeholder="Search for vehicles..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
      </div>
    </form>
  );
};

export default SearchBar;
