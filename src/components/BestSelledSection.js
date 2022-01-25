import React from "react";
import { Link } from "react-router-dom";

import BestSelledItem from "./BestSelledItem";
import { useGlobalContext } from "../context";

//icons
import { BiRightArrowAlt } from "react-icons/bi";

//npm package for unique ids
import { v4 as uniqueId } from "uuid";

const BestSelledSection = () => {
  const { bestSelledBooks, isFetchingBestSelled } = useGlobalContext();

  return (
    <section id="best-selled" className="best-selled-books">
      <h2>The New York Times Best Sellers</h2>
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
                  console.log("yeee");
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
