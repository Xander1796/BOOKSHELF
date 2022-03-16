import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context";

const Search = () => {
  const { setSearchQuery, searchInput } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <form
      autoComplete="off"
      className="search-wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        if (searchInput.current.value.trim().length > 0) {
          navigate(`/search?q=${searchInput.current.value.trim()}`);
          setSearchQuery(searchInput.current.value);
        }
      }}
    >
      <input
        id="search"
        type="search"
        placeholder="Search for books"
        ref={searchInput}
      />
      <button className="search-button">Search</button>
    </form>
  );
};

export default Search;
