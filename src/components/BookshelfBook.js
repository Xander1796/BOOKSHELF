import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import noImage from "../assets/svg/no-image.png";

import { useGlobalContext } from "../context";

//icons

import { BiRightArrowAlt } from "react-icons/bi";

const BookshelfBook = (props) => {
  const { searchInput, bookshelf, setBookshelf } = useGlobalContext();
  const { volumeId, img, title, author } = props;

  const navigate = useNavigate();
  const location = useLocation();

  console.log(bookshelf[props.currentBookshelfName]);

  return (
    <li>
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
          const newBookshelf = props.currentBookshelf.filter(
            (item) => item.volumeId !== volumeId
          );
          bookshelf[props.currentBookshelfName] = newBookshelf;
          setBookshelf(bookshelf);
        }}
      >
        <Link to={location}>Remove</Link>
      </button>
    </li>
  );
};

export default BookshelfBook;
