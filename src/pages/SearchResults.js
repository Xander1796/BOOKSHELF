import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../context";

import LoadingSpinner from "../components/LoadingSpinner";
import SearchBook from "../components/SearchBook";
import { AiOutlineSearch } from "react-icons/ai";

import { v4 as uniqueId } from "uuid";

import BookCard from "../components/BookCard";

const SearchResults = () => {
  let { searchQuery, setSearchQuery } = useGlobalContext();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getSearchResults = async () => {
      try {
        setSearchQuery(searchParams.get("q"));

        setIsLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${searchParams.get(
            "q"
          )}&maxResults=20&printType=books`
        );
        const data = await response.json();
        setSearchResults(data?.items ? data.items : []);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getSearchResults();
  }, [searchParams]);


  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isLoading || (
        <section className="search-section">
          {searchResults.length > 0 && (
            <>
              <p className="search-section-title">
                <AiOutlineSearch /> Search results for{" "}
                <span>{searchQuery}</span>
              </p>
              <article>
                <ul className="search-list book-list">
                  {searchResults.map((bookItem) => {
                    const id = uniqueId();
                    const book = {
                      title: bookItem?.volumeInfo?.title,
                      author: bookItem?.volumeInfo?.authors?.[0],
                      img: bookItem?.volumeInfo?.imageLinks?.thumbnail,
                      volumeId: bookItem.id
                    };
                    return <BookCard book={book} key={id} />;
                  })}
                </ul>
              </article>
            </>
          )}
          {searchResults.length === 0 && (
            <p className="search-section-title">
              <AiOutlineSearch /> No search results
            </p>
          )}
        </section>
      )}
    </>
  );
};

export default SearchResults;
