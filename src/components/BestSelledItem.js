import React from "react";
import { useNavigate } from "react-router-dom";

import noImage from "../assets/svg/no-image.png";

//icons
import { BiRightArrowAlt } from "react-icons/bi";


const BestSelledItem = (book) => {
  const { rank, title, book_image, weeks_on_list, contributor } = book;

  const navigate = useNavigate();

  return (
    <li className="book">
      <a
      href="#"
        onClick={async (e) => {
          e.preventDefault();
          try {
            const response = await fetch(
              `https://www.googleapis.com/books/v1/volumes?q=isbn:${book.primary_isbn10}`
            );
            const data = await response.json();
            navigate(`/book/${data.items[0].id}`);
          } catch (error) {
            navigate("/error");
          }
        }}
      >
        <span className="book-rank">{rank}</span>
        <img src={book_image || noImage} alt={`Image for ${title}`} />
        <div>
          <span className="weeks-on-list">
            {Number(weeks_on_list) > 1
              ? `${weeks_on_list} weeks on the list`
              : `${weeks_on_list} week on the list`}
          </span>
          <h4>{title.length > 35 ? `${title.slice(0, 35)} ...` : title}</h4>
          <p>
            {contributor.length > 35
              ? `${contributor.slice(0, 35)} ...`
              : contributor}
          </p>
        </div>
        <BiRightArrowAlt className="card-icon-right-arr" />
      </a>
    </li>
  );
};

export default BestSelledItem;
