import React from "react";
import { Link } from "react-router-dom";
import noImage from "../assets/svg/no-image.png";

import { useGlobalContext } from "../context";

//icons

import { BiRightArrowAlt } from "react-icons/bi";

const Book = (book) => {
  const { title, authors, imageLinks } = book.volumeInfo;
  const volumeId = book.id;
  console.log(book);
  const { searchInput } = useGlobalContext();

  return (
    <li>
      <Link to={`/book/${volumeId}`} onClick={() => (searchInput.current.value = "")}>
        <img
          src={imageLinks?.thumbnail ? imageLinks.thumbnail : noImage}
          alt={`${title}`}
        />
        <div>
          <h4>{title?.length > 35 ? `${title.slice(0, 35)}...` : title}</h4>
          <p>{authors?.[0] ? authors[0].slice(0, 35) : ''}</p>
        </div>
        <BiRightArrowAlt className="card-icon-right-arr" />
      </Link>
    </li>
  );
};

export default Book;
