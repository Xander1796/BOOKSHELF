import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../context";

import LoadingSpinner from "../components/LoadingSpinner";
import Book from "../components/Book";

import { v4 as uniqueId } from "uuid";

const SearchResults = () => {
  let { searchQuery, setTotalSearchPages, setSearchQuery } = useGlobalContext();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getSearchResults = async () => {
      setSearchQuery(searchParams.get("q"));

      setIsLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchParams.get(
          "q"
        )}&maxResults=20&printType=books`
      );
      const data = await response.json();
      console.log(data);
      setSearchResults(data.items);
      setTotalSearchPages(
        Math.ceil(Number(data.totalItems) / data.items.length)
      );
      setIsLoading(false);
    };

    getSearchResults();
  }, [searchParams]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isLoading || (
        <article>
          <h1>{`Search results for ${searchQuery}`}</h1>
          <ul className="search-list book-list">
            {searchResults.map((book) => {
              const id = uniqueId();
              return <Book {...book} key={id} />;
            })}
          </ul>
        </article>
      )}
    </>
  );
};

export default SearchResults;
