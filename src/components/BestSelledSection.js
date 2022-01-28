import React from "react";
import { Link } from "react-router-dom";

import BestSelledItem from "./BestSelledItem";
import LoadingSpinner from "./LoadingSpinner";
import { useGlobalContext } from "../context";

//icons
import { BiRightArrowAlt } from "react-icons/bi";

//npm package for unique ids
import { v4 as uniqueId } from "uuid";

const LoadingSkeleton = () => {
  return (
    <div className="book loading-skeleton-book">
      <div className="loading-skeleton-book-img"></div>
      <div className="loading-skeleton-book-top"></div>
      <div className="loading-skeleton-book-title"></div>
      <div className="loading-skeleton-book-author"></div>
    </div>
  );
};

const BestSelledSection = () => {
  const { bestSelledBooks, isFetchingBestSelled } = useGlobalContext();

  return (
    <section id="best-selled" className="best-selled-books">
      <h2>
        The New York Times Best Sellers
        {isFetchingBestSelled && <LoadingSpinner />}
      </h2>

      {isFetchingBestSelled && (
      <article>
        <div className="loading-skeleton-heading"></div>
        <ul className="book-list">
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </ul>
      </article>
      )}
      
      {isFetchingBestSelled ||
        bestSelledBooks.map((el, i) => {
          if (i > 10) return;
          const id = uniqueId();

          return (
            <article key={id}>
              <div className="best-selled-title-wrapper">
                <h3>{el.display_name}</h3>
                <Link to={`/top15/${el?.list_name_encoded}`}>
                  SEE MORE
                  <BiRightArrowAlt />
                </Link>
              </div>
              <ul className="book-list">
                {el.books.map((book) => {
                  const id = uniqueId();
                  return <BestSelledItem {...book} key={id} />;
                })}
              </ul>
            </article>
          );
        })}
    </section>
  );
};

export default BestSelledSection;
