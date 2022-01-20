import React, { useEffect, useState, useRef } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

import noBookSvg from "../assets/svg/no-book.svg";
import { BsPin, BsBook } from "react-icons/bs";

const Hero = () => {
  const {
    searchInput,
    bookshelf,
    setBookshelf,
    setIsPopupVisible,
    isPopupVisible,
    setPopupProperties,
  } = useGlobalContext();

  const wrapy = useRef();

  const markBookAsFinished = () => {
    const isBookInFinishedList = bookshelf.finishedBooks.some(
      (book) => book.volumeId === bookshelf.readingNow[0].volumeId
    );

    if (isBookInFinishedList === false) {
      bookshelf.finishedBooks.unshift(bookshelf.readingNow[0]);
    }


    wrapy.current.classList.add("anim-out");

    setTimeout(() => {
      setPopupProperties({
        message: `${bookshelf.readingNow[0].title} has been added to Finished`,
        type: "ok",
      });

      setIsPopupVisible(!isPopupVisible);

      bookshelf.readingNow.shift();

      setBookshelf(bookshelf);
      localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
    }, 200);
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

      <div
        className="current-reading-book-wrapper"
        ref={wrapy}
        onAnimationEnd={() => {
          wrapy.current.classList.add("anim-in");
          wrapy.current.classList.remove("anim-out");
        }}
      >
        {bookshelf.readingNow.length === 0 && (
          <>
            <img
              src={noBookSvg}
              alt="You are not reading anything at the moment"
              className="no-book-img"
            ></img>
            <h3>You are not reading anything at the moment</h3>
            <button
              href=""
              className="btn regular-btn"
              onClick={() => searchInput.current.focus()}
            >
              Find something to read
              <BiRightArrowAlt />
            </button>
          </>
        )}

        {bookshelf.readingNow.length > 0 && (
          <>
            <Link to={`/book/${bookshelf.readingNow[0].volumeId}`}>
              <img
                src={bookshelf.readingNow[0].img}
                alt={bookshelf.readingNow[0].title}
                className="reading-book-img"
              />
            </Link>
            <h2>{bookshelf.readingNow[0].title}</h2>
            <p>{`By ${bookshelf.readingNow[0].author}`}</p>
            <button
              className="btn hero-btn-finished"
              onClick={markBookAsFinished}
            >
              Mark as finished
              <BsPin />
            </button>
            <span className="current-reading-banner">
              <BsBook />
              Currently reading
            </span>
          </>
        )}
      </div>
    </section>
  );
};

export default Hero;
