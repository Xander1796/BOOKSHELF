import React, { useEffect, useState, useRef } from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";

import noBookSvg from "../assets/svg/no-book.svg";
import { BsBook } from "react-icons/bs";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Hero = () => {
  const { showPopup, searchInput, bookshelves, setBookshelves } =
    useGlobalContext();

  const finishedBooksIndex = bookshelves.findIndex(
    (bookshelf) => bookshelf.bookshelfName === "Finished books"
  );

  const readingNowIndex = bookshelves.findIndex(
    (bookshelf) => bookshelf.bookshelfName === "Reading now"
  );

  useEffect(() => {
   console.log("bookshelves changed")
  }, [bookshelves])

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
      link: `bookshelf${bookshelves[readingNowIndex].route}`,
      bookName: bookshelves[readingNowIndex].books[0].title,
      message: `has been added to Finished`,
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
        {bookshelves[readingNowIndex].books.length === 0 && (
          <div>
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
          </div>
        )}

        {bookshelves[readingNowIndex].books.length > 0 && (
          <div>
            <Link
              to={`/book/${bookshelves[readingNowIndex].books[0].volumeId}`}
            >
              <img
                src={bookshelves[readingNowIndex].books[0].img}
                alt={bookshelves[readingNowIndex].books[0].title}
                className="reading-book-img"
              />
            </Link>
            <h2>{bookshelves[readingNowIndex].books[0].title}</h2>
            <p>{`By ${bookshelves[readingNowIndex].books[0].author}`}</p>
            <button
              className="btn hero-btn-finished"
              onClick={markBookAsFinished}
            >
              Finished
              <AiOutlineCheckCircle />
            </button>
            <span className="current-reading-banner">
              <BsBook />
              Currently reading
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
