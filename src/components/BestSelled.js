import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

import noImage from "../assets/svg/no-image.png";

//npm package for unique ids
import { v4 as uniqueId } from "uuid";

//icons
import { BiRightArrowAlt } from "react-icons/bi";

const BestSelled = () => {
  const { bestSelledBooks, isFetching } = useGlobalContext();
  const navigate = useNavigate();

  return (
    <section id="best-selled" className="best-selled-books">
      <h2>The New York Times Best Sellers</h2>
      {isFetching ||
        bestSelledBooks.map((el, i) => {
          if (i > 10) return;
          const id = uniqueId();

          return (
            <article key={id}>
              <h3>{el.display_name}</h3>
              <ul className="book-list">
                {el.books.map((book) => {
                  console.log("yeee");
                  const {
                    rank,
                    title,
                    book_image,
                    weeks_on_list,
                    contributor,
                  } = book;
                  const id = uniqueId();
                  return (
                    <li key={id}>
                      <a
                        onClick={async (e) => {
                          e.preventDefault();
                          console.log(book);
                          const response = await fetch(
                            `https://www.googleapis.com/books/v1/volumes?q=${book.primary_isbn10}`
                          );
                          const data = await response.json();
                          console.log(data);
                          navigate(`/book/${data.items[0].id}`);
                        }}
                      >
                        <span className="book-rank">{rank}</span>
                        <img
                          src={book_image || noImage}
                          alt={`Image for ${title}`}
                        />
                        <div>
                          <span className="weeks-on-list">
                            {Number(weeks_on_list) > 1
                              ? `${weeks_on_list} weeks on the list`
                              : `${weeks_on_list} week on the list`}
                          </span>
                          <h4>
                            {title.length > 35
                              ? `${title.slice(0, 35)} ...`
                              : title}
                          </h4>
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
                })}
              </ul>
            </article>
          );
        })}
    </section>
  );
};

export default BestSelled;
