import React from "react";

import BookshelfItem from "../components/BookshelfItem";
import EmptyBookshelf from "../components/EmptyBookshelf";
import { useLocation } from "react-router-dom";

///LIBRARY FOR ANIMATING ON MOUNT AND UNMOUNT
import { TransitionGroup, CSSTransition } from "react-transition-group";
////

import { v4 as uniqueId } from "uuid";

//icons
import { BsBook, BsBookmark } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";

const Bookshelf = () => {
  const location = useLocation();

  let currentBookshelf;

  const localStorageBookshelves = JSON.parse(
    localStorage.getItem("bookshelves")
  );

  currentBookshelf = localStorageBookshelves.find(
    (bookshelf) => `/bookshelf${bookshelf.route}` === location.pathname
  );

  const getIcon = (bookshelfName) => {
    if (bookshelfName === "Reading now") return <BsBook />;
    if (bookshelfName === "Bookmarks") return <BsBookmark />;
    if (bookshelfName === "Finished books") return <IoCheckmarkDone />;
  };

  return (
    <section className="bookshelf-section">
      <h1>
        {getIcon(currentBookshelf.bookshelfName)}
        {currentBookshelf.bookshelfName}
      </h1>

      <TransitionGroup component={null}>
        {currentBookshelf.books.length === 0 && (
          <CSSTransition timeout={250} classNames="empty-bookshelf">
            <EmptyBookshelf key={uniqueId()} />
          </CSSTransition>
        )}
      </TransitionGroup>

      <article>
        <TransitionGroup className="book-list">
          {currentBookshelf.books.length > 0 &&
            currentBookshelf.books.map((book, i) => {
              return (
                <CSSTransition
                  in
                  appear={true}
                  key={book.volumeId}
                  timeout={{
                    appear: 300 + i * 100,
                    exit: 700,
                  }}
                  classNames="book-item"
                >
                  <BookshelfItem
                    transitionDelay={`${i * 0.1}s`}
                    {...book}
                    book={book}
                    currentBookshelf={currentBookshelf}
                    getIcon={getIcon}
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
