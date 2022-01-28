import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useGlobalContext } from "../context";

//icons

import { BiRightArrowAlt } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

const BookshelfItem = (props) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { searchInput, bookshelves, setBookshelves, showPopup } =
    useGlobalContext();
  const { volumeId, img, title, author } = props;

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
      <div
        className="move-book-wrapper"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget))
            setIsDropdownVisible(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") setIsDropdownVisible(false);
        }}
      >
        <button
          className={`move-book-btn ${
            isDropdownVisible && "move-book-btn-active"
          }`}
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        >
          Move to <IoIosArrowDown />
        </button>

        <ul
          className={`move-book-options ${
            isDropdownVisible && "move-book-drop-visible"
          }`}
        >
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
                {bookshelf.bookshelfName} <BiRightArrowAlt />
              </Link>
            );
          })}
        </ul>
      </div>

      <Link
        to={`/book/${volumeId}`}
        onClick={() => (searchInput.current.value = "")}
      >
        <img src={img} alt={`${title}`} />
        <div>
          <h4>{title}</h4>
          <p>{author}</p>
        </div>
        <BiRightArrowAlt className="card-icon-right-arr" />
      </Link>

      <button
        className="remove-book-btn"
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
        <Link to={location}>Remove</Link>
      </button>
    </li>
  );
};

export default BookshelfItem;
