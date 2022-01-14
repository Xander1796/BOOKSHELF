import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context";

const Search = () => {
  const { searchQuery, setSearchQuery } = useGlobalContext();
  const searchInput = useRef();
  const navigate = useNavigate();

  return (
    <form className="search-wrapper">
      <input
        id="search"
        placeholder="Search for books"
        ref={searchInput}
      />
      <button
        className="search-button"
        onClick={(e) => {
          e.preventDefault();
          navigate(`/search?q=${searchInput.current.value}`)
          setSearchQuery(searchInput.current.value);
        }}
      >
      Search
      </button>
    </form>
  );
};

export default Search;
