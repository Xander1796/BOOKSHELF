import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import { v4 as uniqueId } from "uuid";

//ICONS AND IMAGES

import { IoIosAddCircle } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
import { BiDownArrowAlt } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

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

  return (
    <section className="hero-section">
      <div className="hero-section-content">
        <div className="cta-wrapper">
          <h1>Bookshelf is your online library of books</h1>
          <p>Manage all your books in one place</p>
          <a href="#best-selled" className="hero-cta btn">
            Best selled
            <BiDownArrowAlt />
          </a>
        </div>

        <div className="current-reading-book-wrapper">
          <div className="current-reading-img-wrapper">
            <TransitionGroup component={null}>
              {currentlyReading.length > 0 && (
                <CSSTransition
                  key={currentlyReading[0].volumeId}
                  timeout={500}
                  classNames="current-reading-img"
                >
                  <Link to={`/book/${currentlyReading[0].volumeId}`}>
                    <img
                      src={currentlyReading[0].img}
                      alt={currentlyReading[0].title}
                      className="reading-book-img"
                    />
                  </Link>
                </CSSTransition>
              )}
            </TransitionGroup>

            {currentlyReading.length > 1 && (
              <div
                className="change-current-book"
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsDropdownVisible(false);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsDropdownVisible(false);
                }}
              >
                <button
                  className="change-current-book-btn"
                  onClick={() => setIsDropdownVisible(!isDropdownVisible)}
                >
                  <IoIosAddCircle
                    className={isDropdownVisible && "btn-active"}
                  />
                </button>
                <ul
                  className={
                    isDropdownVisible ? "change-book-list-visible" : ""
                  }
                >
                  {currentlyReading.map((book, i) => {
                    if (i === 0) return;
                    return (
                      <li key={uniqueId()}>
                        <button
                          onClick={() => {
                            const targetedBook = currentlyReading[i];
                            currentlyReading.splice(i, 1);
                            currentlyReading.unshift(targetedBook);

                            bookshelves[readingNowIndex].books =
                              currentlyReading;
                            setBookshelves(bookshelves);
                            setCurrentlyReading(currentlyReading);
                            localStorage.setItem(
                              "bookshelves",
                              JSON.stringify(bookshelves)
                            );
                            setIsDropdownVisible(false);
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
          </div>

          <div className="current-reading-delimitator"></div>

          <div className="current-reading-book-details">
            <span>Currently reading</span>
            <TransitionGroup component={null}>
              {currentlyReading.length > 0 && (
                <CSSTransition
                  key={currentlyReading[0].volumeId}
                  timeout={500}
                  classNames="current-reading-details"
                >
                  <div>
                    <h2>{currentlyReading[0].title}</h2>
                    <p>{`By ${currentlyReading[0].author}`}</p>
                    <button
                      className="btn hero-btn-finished"
                      onClick={markBookAsFinished}
                    >
                      Finished
                      <IoCheckmarkDone />
                    </button>
                  </div>
                </CSSTransition>
              )}
            </TransitionGroup>

            {currentlyReading.length === 0 && (
              <div className="current-reading-empty">
                <h2>Nothing to read</h2>
                <button
                  href=""
                  className="btn regular-btn"
                  onClick={() => searchInput.current.focus()}
                >
                  Find something
                  <AiOutlineSearch />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
