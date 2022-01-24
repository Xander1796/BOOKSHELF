import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import { v4 as uniqueId } from "uuid";

//ICONS AND IMAGES

import noBookSvg from "../assets/svg/no-book-reading.svg";
import { IoIosAddCircle } from "react-icons/io";
import { BiRightArrowAlt } from "react-icons/bi";
import { AiOutlineCheckCircle } from "react-icons/ai";

///

const Hero = () => {
  let [currentlyReading, setCurrentlyReading] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const { showPopup, searchInput, bookshelves, setBookshelves } =
    useGlobalContext();
  const finishedBooksIndex = bookshelves.findIndex(
    (bookshelf) => bookshelf.bookshelfName === "Finished books"
  );

  const readingNowIndex = bookshelves.findIndex(
    (bookshelf) => bookshelf.bookshelfName === "Reading now"
  );

  useEffect(() => {
    console.log("bookshelves changed");
    setCurrentlyReading(bookshelves[readingNowIndex].books);
  }, [bookshelves]);

  const markBookAsFinished = () => {
    const isBookInFinishedList = bookshelves[finishedBooksIndex].books.some(
      (book) => book.volumeId === bookshelves[finishedBooksIndex].books.volumeId
    );

    if (isBookInFinishedList === false) {
      bookshelves[finishedBooksIndex].books.unshift(
        bookshelves[readingNowIndex].books[0]
      );
    }

    showPopup({
      isPopupVisible: true,
      link: `bookshelf/finished-books`,
      bookName: bookshelves[readingNowIndex].books[0].title,
      message: `has been added to Finished books`,
      type: "ok",
    });

    bookshelves[readingNowIndex].books.shift();

    setBookshelves(bookshelves);
    localStorage.setItem("bookshelves", JSON.stringify(bookshelves));
  };
  console.log("rendering HERO SECTION");

  return (
    <section className="hero-section">
      <div className="cta-wrapper">
        <h1>Bookshelf is your online library of books</h1>
        <p>Manage all your books in one place</p>
        <a href="#best-selled" className="hero-cta btn regular-btn">
          See The Best Selling Books
          <BiRightArrowAlt />
        </a>
      </div>

      <div className="current-reading-book-wrapper">
        <span className="current-reading-banner">
          Currently reading
          {currentlyReading.length > 1 && (
            <div className="change-current-book">
              <button
              className="change-current-book-btn"
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                onBlur={() =>
                  setTimeout(() => {
                    setIsDropdownVisible(!isDropdownVisible);
                  }, 100)
                }
              >
                <IoIosAddCircle className={isDropdownVisible && "btn-active"} />
              </button>
              <ul className={isDropdownVisible ? "change-book-list-visible" : ""}>
                {currentlyReading.map((book, i) => {
                  if (i === 0) return;
                  return (
                    <li key={uniqueId()}>
                      <button
                        onClick={() => {
                          const targetedBook = currentlyReading[i];
                          currentlyReading.splice(i, 1);
                          currentlyReading.unshift(targetedBook);
                          console.log(currentlyReading);

                          bookshelves[readingNowIndex].books = currentlyReading;
                          setBookshelves(bookshelves);
                          setCurrentlyReading(currentlyReading);
                          localStorage.setItem(
                            "bookshelves",
                            JSON.stringify(bookshelves)
                          );
                        }}
                      >
                        {book.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </span>

        <div
          className={
            currentlyReading.length === 0
              ? "current-reading-empty"
              : "current-reading-empty-hide"
          }
        >
          <img
            src={noBookSvg}
            alt="Nothing to read at the moment"
            className="no-book-img"
          ></img>
          <h3>Nothing to read</h3>
          <button
            href=""
            className="btn regular-btn"
            onClick={() => searchInput.current.focus()}
          >
            Find something to read
            <BiRightArrowAlt />
          </button>
        </div>

        <TransitionGroup component={null}>
          {currentlyReading.length > 0 && (
            <CSSTransition
              key={currentlyReading[0].volumeId}
              timeout={500}
              classNames="current-reading"
            >
              <div>
                <Link to={`/book/${currentlyReading[0].volumeId}`}>
                  <img
                    src={currentlyReading[0].img}
                    alt={currentlyReading[0].title}
                    className="reading-book-img"
                  />
                </Link>
                <h2>{currentlyReading[0].title}</h2>
                <p>{`By ${currentlyReading[0].author}`}</p>
                <button
                  className="btn hero-btn-finished"
                  onClick={markBookAsFinished}
                >
                  Finished
                  <AiOutlineCheckCircle />
                </button>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    </section>
  );
};

export default Hero;
