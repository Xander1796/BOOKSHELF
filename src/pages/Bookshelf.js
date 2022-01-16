import React, { useEffect } from "react";

import { useGlobalContext } from "../context";
import BookshelfBook from "../components/BookshelfBook";
import { useLocation } from "react-router-dom";

import { v4 as uniqueId } from "uuid";

const FinishedBooks = () => {
  const { bookshelf } = useGlobalContext();
  const location = useLocation();

  let currentBookshelf;
  let currentBookshelfName;
  let bookshelfMessage;

  if (location.pathname === "/bookshelf/reading-now") {
    currentBookshelf = bookshelf.readingNow;
    currentBookshelfName = "readingNow";
    bookshelfMessage = "Books that you are currently reading";
  }
  if (location.pathname === "/bookshelf/to-read") {
    currentBookshelf = bookshelf.toRead;
    currentBookshelfName = "toRead";
    bookshelfMessage = "Books that you want to read";
  }
  if (location.pathname === "/bookshelf/finished-books") {
    currentBookshelf = bookshelf.finishedBooks;
    currentBookshelfName = "finishedBooks";
    bookshelfMessage = "Books that you have finished";
  }

  return (
    <section className="bookshelf-section">
      {currentBookshelf.length === 0 && <h1>This bookshelf is empty</h1>}
      {currentBookshelf.length > 0 && (
        <>
          <h1>Your bookshelf</h1>
          <p>{bookshelfMessage}</p>
          <article>
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

export default FinishedBooks;
