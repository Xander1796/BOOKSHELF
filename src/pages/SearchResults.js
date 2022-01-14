import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../context";

import LoadingSpinner from "../components/LoadingSpinner";

//icons

import { BiRightArrowAlt } from "react-icons/bi";

const SearchResults = () => {
  const { searchQuery, setTotalSearchPages, setSearchQuery } =
    useGlobalContext();
  const [searchResults, setSearchResults] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const getSearchResults = async () => {
      console.log("search results fetch");
      setIsLoading(true);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchParams.get(
          "q"
        )}&maxResults=20`
      );
      const data = await response.json();
      const filteredData = data.items.filter((item) => {        
        return item.volumeInfo.industryIdentifiers.find((identifier) => {
          return identifier.type === "ISBN_10";
        });
      });
      console.log(filteredData, data.items);

      setSearchResults(filteredData);
      setTotalSearchPages(
        Math.ceil(Number(data.totalItems) / data.items.length)
      );
      setIsLoading(false);
    };

    getSearchResults();
  }, [searchQuery]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isLoading || (
        <article>
          <h1></h1>
          <ul className="best-selled-list">
            {searchResults.map((book, i) => {
              console.log("yeee");
              const { title, authors, imageLinks, lalalal } = book.volumeInfo;
              const src = imageLinks.thumbnail;
              const isbn = book.volumeInfo.industryIdentifiers.find(
                (identifier) => identifier.type === "ISBN_10"
              );
              return (
                <li key={i}>
                  <Link to={`/book:${isbn ? isbn.identifier : ""}`}>
                    <img src={src ? src : ""} alt={`${title}`} />
                    <div>
                      <h4>{title}</h4>
                      <p>{authors}</p>
                    </div>
                    <BiRightArrowAlt className="card-icon-right-arr" />
                  </Link>
                </li>
              );
            })}
          </ul>
          <button className="btn btn-regular">Load More</button>
        </article>
      )}
    </>
  );
};

export default SearchResults;
