import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import LoadingSpinner from "../components/LoadingSpinner";
import BookCard from "../components/BookCard";

import { v4 as uniqueId } from "uuid";

const Top15BestSelled = () => {
  const [top15List, setTop15List] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { listName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const getTop15List = async () => {
      try {
        const data = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=tuvnlDJQRdyYvL03iMG9UYrp51BGXnmT`
        );
        const response = await data.json();
        setTop15List(response);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        navigate("/error");
        setIsLoading(false);
      }
    };

    getTop15List();
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isLoading || (
        <section className="top-15-section">
          <h1>{top15List?.results?.list_name ? top15List.results.list_name : ""}</h1>
          <h3>{top15List?.num_results ? `TOP ${top15List.num_results}` : ''}</h3>

          <article>
            <ul className="book-list">
              {top15List.results.books.map((bookItem) => {
                const id = uniqueId();
                const book = {
                  title: bookItem.title,
                  img: bookItem.book_image,
                  weeks_on_list: bookItem.weeks_on_list,
                  author: bookItem.contributor,
                  isbn: bookItem.primary_isbn10,
                };
                return <BookCard book={book} key={id} />;
              })}
            </ul>
          </article>
        </section>
      )}
    </>
  );
};

export default Top15BestSelled;
