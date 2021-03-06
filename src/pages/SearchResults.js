import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGlobalContext } from "../context";

import LoadingSkeleton from "../components/LoadingSkeleton";
import { AiOutlineSearch } from "react-icons/ai";
import useScrollTop from "../custom-hooks/useScrollTop";
import PreviousPath from "../components/PreviousPath";

import { v4 as uniqueId } from "uuid";

import BookCard from "../components/BookCard";

import { TransitionGroup, CSSTransition } from "react-transition-group";

const SearchResults = () => {
  let { searchQuery, setSearchQuery } = useGlobalContext();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  useScrollTop();

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
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      } catch (error) {
        console.log(error);
      }
    };

    getSearchResults();
  }, [searchParams]);

  return (
    <section className="search-section">
      <PreviousPath />
      {isLoading && <LoadingSkeleton />}

      {isLoading || (
        <>
          {searchResults.length > 0 && (
            <>
              <p className="search-section-title">
                <AiOutlineSearch /> Search results for{" "}
                <span>{searchQuery}</span>
              </p>
              <article>
                <ul className="search-list book-list">
                  <TransitionGroup component={null}>
                    {searchResults.map((bookItem, i) => {
                      const id = uniqueId();
                      const book = {
                        title: bookItem?.volumeInfo?.title,
                        author: bookItem?.volumeInfo?.authors?.[0],
                        img: bookItem?.volumeInfo?.imageLinks?.thumbnail,
                        volumeId: bookItem.id,
                      };
                      return (
                        <CSSTransition
                          in
                          appear={true}
                          key={book.volumeId}
                          timeout={300 + i * 100}
                          classNames="book-item"
                        >
                          <BookCard
                            transitionDelay={`${i * 0.1}s`}
                            book={book}
                            key={id}
                          />
                        </CSSTransition>
                      );
                    })}
                  </TransitionGroup>
                </ul>
              </article>
            </>
          )}
          {searchResults.length === 0 && (
            <p className="search-section-title">
              <AiOutlineSearch /> No search results
            </p>
          )}
        </>
      )}
    </section>
  );
};

export default SearchResults;
