import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

import noImage from "../assets/svg/no-image.png";

//npm package for unique ids
import { v4 as uniqueId } from "uuid";

//icons
import { BiRightArrowAlt, BiUpArrowAlt, BiDownArrowAlt } from "react-icons/bi";
import { MdSell } from "react-icons/md";

const BestSelled = () => {
  const { bestSelledBooks, isFetching, getSingleBook } = useGlobalContext();

  return (
    <section id="best-selled" className="best-selled-books">
      <h2>
        <MdSell />
        The New York Times Best Sellers
      </h2>
      {isFetching ||
        bestSelledBooks.map((el, i) => {
          if (i > 10) return;
          const id = uniqueId();

          return (
            <article key={id}>
              <h3>{el.display_name}</h3>
              <ul key={id} className="best-selled-list">
                {el.books.map((book) => {
                  console.log("yeee");
                  const {
                    rank,
                    rank_last_week,
                    title,
                    book_image,
                    weeks_on_list,
                    contributor,
                  } = book;
                  const id = uniqueId();
                  return (
                    <li
                      key={id}
                      onClick={() => getSingleBook(book.primary_isbn10)}
                    >
                      <Link to="/details">
                        <span className="book-rank">
                          {rank}
                          {Number(rank) > Number(rank_last_week) ? (
                            <BiDownArrowAlt />
                          ) : (
                            <BiUpArrowAlt />
                          )}
                        </span>
                        <img src={book_image || noImage} alt={`Image for ${title}`} />
                        <div>
                          <span className="weeks-on-list">
                            {Number(weeks_on_list) > 1
                              ? `${weeks_on_list} weeks on the list`
                              : `${weeks_on_list} week on the list`}
                          </span>
                          <h4>{title}</h4>
                          <p>{contributor}</p>
                        </div>
                        <BiRightArrowAlt className="card-icon-right-arr" />
                      </Link>
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
