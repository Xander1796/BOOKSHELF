import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useGlobalContext } from "../context";

//icons

import { BiRightArrowAlt } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

const BookshelfBook = (props) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const {
    searchInput,
    bookshelf,
    setBookshelf,
    isPopupVisible,
    setIsPopupVisible,
    setPopupProperties,
  } = useGlobalContext();
  const { volumeId, img, title, author } = props;

  const location = useLocation();

  const camelCaseToNormalString = (string) => {
    let lowerCaseString = string
      .split(/(?=[A-Z])/)
      .join(" ")
      .toLowerCase();
    let makeFirstLetterUppercase = lowerCaseString[0].toUpperCase();
    let resultedString =
      makeFirstLetterUppercase + lowerCaseString.substring(1);

    return resultedString;
  };

  const bookshelfKeys = Object.keys(bookshelf);

  let bookshelfTitlesAndKeys = bookshelfKeys.map((item) => {
    return {
      key: item,
      title: camelCaseToNormalString(item),
    };
  });

  const moveBook = (item) => {
    const targetedBook = props.currentBookshelf.find(
      (item) => item.volumeId === volumeId
    );

    bookshelf[item.key] = [targetedBook, ...bookshelf[item.key]];
  };

  const removeBook = () => {
    const newBookshelf = props.currentBookshelf.filter(
      (item) => item.volumeId !== volumeId
    );
    bookshelf[props.currentBookshelfName] = newBookshelf;
    setBookshelf(bookshelf);
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  };


  return (
    <li className="book">
      <div className="move-book-wrapper">
        <button
          className={`move-book-btn ${
            isDropdownVisible && "move-book-btn-active"
          }`}
          onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          onBlur={() => setIsDropdownVisible(false)}
        >
          Move to <IoIosArrowDown />
        </button>

        <ul
          className={`move-book-options ${
            isDropdownVisible && "move-book-drop-visible"
          }`}
        >
          {bookshelfTitlesAndKeys.map((item) => {
            if(item.title === props.bookshelfTitle) return;
            console.log(item.title, props.bookshelfTitle)
            return (
              <Link
                to={location}
                className="move-book-option"
                onClick={() => {
                  moveBook(item);
                  removeBook();

                  setIsPopupVisible(!isPopupVisible);
                  setPopupProperties({
                    message: `${title} has been moved to ${item.title}`,
                    type: "ok",
                  });
                }}
              >
                {item.title} <BiRightArrowAlt />
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

          setIsPopupVisible(!isPopupVisible);
          setPopupProperties({
            message: `${title} has been removed`,
            type: "ok",
          });
        }}
      >
        <Link to={location}>Remove</Link>
      </button>
    </li>
  );
};

export default BookshelfBook;
