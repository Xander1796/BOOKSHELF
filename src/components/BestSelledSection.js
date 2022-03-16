import React from "react";
import { Link } from "react-router-dom";

import BookCard from "./BookCard";
import { useGlobalContext } from "../context";

//npm package for unique ids
import { v4 as uniqueId } from "uuid";

import LoadingSkeleton from "./LoadingSkeleton";

const BestSelledSection = () => {
  const { bestSelledBooks, isFetchingBestSelled } = useGlobalContext();

  return (
    <section id="best-selled" className="best-selled-books">
      <h2># Best selled</h2>

      {isFetchingBestSelled && (
        <>
          <LoadingSkeleton />
        </>
      )}

      {isFetchingBestSelled ||
        bestSelledBooks.map((el, i) => {
          if (i > 10) return;
          const id = uniqueId();

          return (
            <article key={id}>
              <div className="best-selled-title-wrapper">
                <h3>{el.display_name}</h3>
                <Link to={`/top15/${el?.list_name_encoded}`}>SEE MORE</Link>
              </div>
              <ul className="book-list">
                {el.books.map((bookItem) => {
                  const book = {
                    title: bookItem.title,
                    img: bookItem.book_image,
                    weeks_on_list: bookItem.weeks_on_list,
                    author: bookItem.contributor,
                    isbn: bookItem.primary_isbn10,
                  };
                  const id = uniqueId();
                  return <BookCard book={book} key={id} />;
                })}
              </ul>
            </article>
          );
        })}
    </section>
  );
};

export default BestSelledSection;
