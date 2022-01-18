import React from "react";

import { useGlobalContext } from "../context";
import BookshelfBook from "../components/BookshelfBook";
import { Link, useLocation } from "react-router-dom";

import { v4 as uniqueId } from "uuid";

import emptyBookshelfSvg from "../assets/svg/bookshelf-empty.svg";

const Bookshelf = () => {
  const { searchInput } = useGlobalContext();
  const location = useLocation();

  let currentBookshelf;
  let currentBookshelfName;
  let bookshelfMessage;
  let bookshelfTitle;

  const localStorageBookshelf = JSON.parse(localStorage.getItem("bookshelf"));

  if (location.pathname === "/bookshelf/reading-now") {
    currentBookshelf = localStorageBookshelf.readingNow;
    currentBookshelfName = "readingNow";
    bookshelfMessage = "Books that you are currently reading";
    bookshelfTitle = "Reading now";
  }
  if (location.pathname === "/bookshelf/to-read") {
    currentBookshelf = localStorageBookshelf.toRead;
    currentBookshelfName = "toRead";
    bookshelfMessage = "Books that you want to read";
    bookshelfTitle = "Bookmarked books";
  }
  if (location.pathname === "/bookshelf/finished-books") {
    currentBookshelf = localStorageBookshelf.finishedBooks;
    currentBookshelfName = "finishedBooks";
    bookshelfMessage = "Books that you have finished";
    bookshelfTitle = "Finished books";
  }

  return (
    <section className="bookshelf-section">
      {currentBookshelf.length === 0 && (
        <>
          <div className="empty-bookshelf-wrapper">
            <img src={emptyBookshelfSvg} alt="bookshelf empty" />
            <h1>This bookshelf is empty</h1>
            <p>
              See <Link to="/#best-selled">the best selling books</Link> or{" "}
              <button onClick={() => searchInput.current.focus()}>
                search
              </button>{" "}
              for books that you are interested in.
            </p>
          </div>
        </>
      )}

      {currentBookshelf.length > 0 && (
        <>
          <article>
            <h1>{bookshelfTitle}</h1>
            <p>{bookshelfMessage}</p>
            <ul className="book-list">
              {currentBookshelf.map((book) => {
                const id = uniqueId();
                return (
                  <BookshelfBook
                    {...book}
                    currentBookshelf={currentBookshelf}
                    currentBookshelfName={currentBookshelfName}
                    key={id}
                  />
                );
              })}
            </ul>
          </article>
        </>
      )}
    </section>
  );
};

export default Bookshelf;
