import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import LoadingSkeleton from "../components/LoadingSkeleton";
import BookCard from "../components/BookCard";
import useScrollTop from "../custom-hooks/useScrollTop";
import PreviousPath from "../components/PreviousPath";

import { v4 as uniqueId } from "uuid";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const Top15BestSelled = () => {
  const [top15List, setTop15List] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { listName } = useParams();
  const navigate = useNavigate();

  useScrollTop();

  useEffect(() => {
    setIsLoading(true);
    const getTop15List = async () => {
      try {
        const data = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/current/${listName}.json?api-key=tuvnlDJQRdyYvL03iMG9UYrp51BGXnmT`
        );
        const response = await data.json();
        setTop15List(response);
        setTimeout(() => {
          setIsLoading(false);
        }, 400);
      } catch (error) {
        console.log(error);
        navigate("/error");
        setIsLoading(false);
      }
    };

    getTop15List();
  }, []);

  return (
    <section className="top-15-section">
      <PreviousPath />
      {isLoading && <LoadingSkeleton />}
      {isLoading || (
        <>
          <h1>
            {top15List?.results?.list_name ? top15List.results.list_name : ""}
          </h1>
          <h3>
            {top15List?.num_results ? `TOP ${top15List.num_results}` : ""}
          </h3>

          <article>
            <ul className="book-list">
              <TransitionGroup component={null}>
                {top15List.results.books.map((bookItem, i) => {
                  const id = uniqueId();
                  const book = {
                    title: bookItem.title,
                    img: bookItem.book_image,
                    weeks_on_list: bookItem.weeks_on_list,
                    author: bookItem.contributor,
                    isbn: bookItem.primary_isbn10,
                  };
                  return (
                    <CSSTransition
                      in
                      appear={true}
                      key={uniqueId()}
                      timeout={300 + i * 100}
                      classNames="book-item"
                    >
                      <BookCard
                        book={book}
                        key={id}
                        transitionDelay={`${i * 0.1}s`}
                      />
                    </CSSTransition>
                  );
                })}
              </TransitionGroup>
            </ul>
          </article>
        </>
      )}
    </section>
  );
};

export default Top15BestSelled;
