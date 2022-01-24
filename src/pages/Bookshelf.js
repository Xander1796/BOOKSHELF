import React from "react";

import { useGlobalContext } from "../context";
import BookshelfItem from "../components/BookshelfItem";
import EmptyBookshelf from "../components/EmptyBookshelf";
import { useLocation } from "react-router-dom";

///LIBRARY FOR ANIMATING ON MOUNT AND UNMOUNT
import { TransitionGroup, CSSTransition } from "react-transition-group";
////

import { v4 as uniqueId } from "uuid";

const Bookshelf = () => {
  const location = useLocation();

  let currentBookshelf;
  let bookshelfMessage;

  const localStorageBookshelves = JSON.parse(
    localStorage.getItem("bookshelves")
  );

  currentBookshelf = localStorageBookshelves.find(
    (bookshelf) => `/bookshelf${bookshelf.route}` === location.pathname
  );

  if (location.pathname === "/bookshelf/reading-now") {
    bookshelfMessage = "Books that you are currently reading";
  }
  if (location.pathname === "/bookshelf/bookmarks") {
    bookshelfMessage = "Books that you want to read";
  }
  if (location.pathname === "/bookshelf/finished-books") {
    bookshelfMessage = "Books that you have finished";
  }

  return (
    <section className="bookshelf-section">
      <h1>{currentBookshelf.bookshelfName}</h1>
      <p>{bookshelfMessage}</p>

      <TransitionGroup component={null}>
        {currentBookshelf.books.length === 0 && (
          <CSSTransition timeout={200} classNames="empty-bookshelf">
            <EmptyBookshelf key={uniqueId()} />
          </CSSTransition>
        )}
      </TransitionGroup>

      <article>
        <TransitionGroup className="book-list">
          {currentBookshelf.books.length > 0 && currentBookshelf.books.map((book) => {
            return (
              <CSSTransition
                key={book.volumeId}
                timeout={400}
                classNames="book-item"
              >
                <BookshelfItem
                  {...book}
                  book={book}
                  currentBookshelf={currentBookshelf}
                />
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </article>
    </section>
  );
};

export default Bookshelf;
