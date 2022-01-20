import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import BestSelledItem from "./BestSelledItem";

//npm package for unique ids
import { v4 as uniqueId } from "uuid";

import { RiArrowRightSLine } from "react-icons/ri";


const BestSelledSection = () => {
  const [bestSelledBooks, setBestSelledBooks] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
 
  const nytKey = "tuvnlDJQRdyYvL03iMG9UYrp51BGXnmT";

  useEffect(() => {
    console.log(bestSelledBooks)
    
    const getBestSelledBooks = async () => {
      setIsFetching(true);
      try {
        const data = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${nytKey}`
        );
        const response = await data.json();
        console.log("BEST SELLED FETCHING", response);
        setBestSelledBooks(response.results.lists);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
      }
    };

    getBestSelledBooks();

  }, []);

  return (
    <section id="best-selled" className="best-selled-books">
      <h2>The New York Times Best Sellers</h2>
      {isFetching ||
        bestSelledBooks.map((el, i) => {
          if (i > 10) return;
          const id = uniqueId();

          return (
            <article key={id}>
              <div className="best-selled-title-wrapper">
                <h3>{el.display_name}</h3>
                <Link to={`/top15/${el?.list_name_encoded}`} className="btn">
                  SEE MORE <RiArrowRightSLine />
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
