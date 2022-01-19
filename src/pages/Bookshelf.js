import React from "react";

import { useGlobalContext } from "../context";
import BookshelfBook from "../components/BookshelfBook";
import EmptyBookshelf from "../components/EmptyBookshelf";
import { useLocation } from "react-router-dom";

import { v4 as uniqueId } from "uuid";

const Bookshelf = () => {
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
  if (location.pathname === "/bookshelf/bookmarks") {
    currentBookshelf = localStorageBookshelf.bookmarks;
    currentBookshelfName = "bookmarks";
    bookshelfMessage = "Books that you want to read";
    bookshelfTitle = "Bookmarks";
  }
  if (location.pathname === "/bookshelf/finished-books") {
    currentBookshelf = localStorageBookshelf.finishedBooks;
    currentBookshelfName = "finishedBooks";
    bookshelfMessage = "Books that you have finished";
    bookshelfTitle = "Finished books";
  }

  return (
    <section className="bookshelf-section">
      {currentBookshelf.length === 0 && (<EmptyBookshelf />)}

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
                    bookshelfTitle={bookshelfTitle}
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
