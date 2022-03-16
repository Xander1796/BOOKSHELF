import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useGlobalContext } from "../context";

//icons

import { BiRightArrowAlt } from "react-icons/bi";

const BookshelfItem = (props) => {
  const { searchInput, bookshelves, setBookshelves, showPopup } =
    useGlobalContext();
  const { volumeId, img, title, author, getIcon } = props;

  const location = useLocation();

  const indexOfCurrentBookshelf = bookshelves.findIndex(
    (bookshelf) =>
      bookshelf.bookshelfName === props.currentBookshelf.bookshelfName
  );

  const moveBook = (bookshelf) => {
    bookshelves[bookshelves.indexOf(bookshelf)].books = [
      props.book,
      ...bookshelves[bookshelves.indexOf(bookshelf)].books,
    ];
  };

  const removeBook = () => {
    const newBooks = props.currentBookshelf.books.filter(
      (item) => item.volumeId !== volumeId
    );
    bookshelves[indexOfCurrentBookshelf].books = newBooks;

    setBookshelves(bookshelves);
    localStorage.setItem("bookshelves", JSON.stringify(bookshelves));
  };

  return (
    <li className="book">
      <div className="top-card">
        <img src={img} />
        <div>
          <h4>{title}</h4>
          <p>{author}</p>
        </div>
      </div>

      <div className="bottom-card">
        <div className="actions">
          <span>
            Move to <BiRightArrowAlt />
          </span>
          {bookshelves.map((bookshelf, i) => {
            if (
              bookshelf.bookshelfName === props.currentBookshelf.bookshelfName
            )
              return;

            return (
              <Link
                to={location}
                key={i}
                className="move-book-option"
                onClick={() => {
                  moveBook(bookshelf);
                  removeBook();

                  showPopup({
                    isPopupVisible: true,
                    link: `bookshelf${bookshelf.route}`,
                    bookName: title,
                    message: `has been moved to ${bookshelf.bookshelfName}`,
                    type: "ok",
                  });
                }}
              >
                {getIcon(bookshelf.bookshelfName)}
                {bookshelf.bookshelfName}
              </Link>
            );
          })}
        </div>

        <div className="details-and-remove">
          <Link
            to={location}
            className="remove"
            onClick={() => {
              removeBook();

              showPopup({
                isPopupVisible: true,
                link: "",
                bookName: title,
                message: `has been removed`,
                type: "ok",
              });
            }}
          >
            Remove
          </Link>

          <Link
            className="details"
            to={`/book/${volumeId}`}
            onClick={() => (searchInput.current.value = "")}
          >
            See details
          </Link>
        </div>
      </div>
    </li>
  );
};

export default BookshelfItem;
