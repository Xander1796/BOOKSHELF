import React, { useState, useRef, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

import noImage from "../assets/svg/no-image.png";

//icons
import { BsBook, BsBookmark } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";

const SingleBook = () => {
  const [readMore, setReadMore] = useState(false);
  const [singleBook, setSingleBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const descrHeight = useRef();

  const { volumeId } = useParams();

  const { showPopup, bookshelves, setBookshelves } = useGlobalContext();

  useEffect(() => {
    async function getSingleBook() {
      try {
        setIsLoading(true);
        const data = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${volumeId}`
        );
        const response = await data.json();
        setSingleBook(response);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getSingleBook();
  }, [volumeId]);

  const { volumeInfo } = singleBook;

  const setBook = (typeOfBookshelf, route, name) => {
    for (let i = 0; i < bookshelves.length; i++) {
      for (let j = 0; j < bookshelves[i].books.length; j++) {
        if (bookshelves[i].books[j].volumeId === volumeId) {
          showPopup({
            isPopupVisible: true,
            link: `bookshelf${bookshelves[i].route}`,
            message: `This book is already in ${bookshelves[i].bookshelfName}`,
            type: "error",
          });
          return;
        }
      }
    }

    showPopup({
      isPopupVisible: true,
      link: `/bookshelf${route}`,
      bookName: volumeInfo?.title.slice(0, 35),
      message: `has been added to ${typeOfBookshelf}`,
      type: "ok",
    });

    const book = {
      volumeId: volumeId,
      img: volumeInfo?.imageLinks?.thumbnail
        ? volumeInfo.imageLinks.thumbnail
        : noImage,
      title: volumeInfo?.title ? volumeInfo.title.slice(0, 35) : "No title",
      author: volumeInfo?.authors?.[0]
        ? volumeInfo.authors[0].slice(0, 35)
        : "Unknown author",
    };

    const targetedBookshelfIndex = bookshelves.findIndex(
      (bookshelf) => bookshelf.bookshelfName === typeOfBookshelf
    );

    bookshelves[targetedBookshelfIndex].books.unshift(book);
    setBookshelves(bookshelves);

    localStorage.setItem("bookshelves", JSON.stringify(bookshelves));
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isLoading || (
        <section className="single-book">
          <div className="img-wrapper">
            <img
              src={
                volumeInfo?.imageLinks?.thumbnail
                  ? volumeInfo.imageLinks.thumbnail
                  : noImage
              }
              alt=""
            />
          </div>

          <div className="single-book-delimitator"></div>

          <div className="single-book-bottom-info">
            <div className="single-book-title-author">
              <h2>{volumeInfo?.title ? volumeInfo.title : "No title"}</h2>
              <p>{`By ${
                volumeInfo?.authors?.[0]
                  ? volumeInfo.authors[0]
                  : "Unknown author"
              }`}</p>
            </div>

            <div className="single-book-cta-wrapper">
              <button
                className="btn regular-btn"
                onClick={() => {
                  setBook("Reading now", "/reading-now", "Reading now");
                }}
              >
                <BsBook />
                Reading Now
              </button>
              <button
                className="btn regular-btn"
                onClick={() => {
                  setBook("Bookmarks", "/bookmarks", "Bookmarks");
                }}
              >
                <BsBookmark />
                Bookmark
              </button>
              <button
                className="btn regular-btn"
                onClick={() => {
                  setBook(
                    "Finished books",
                    "/finished-books",
                    "Finished books"
                  );
                }}
              >
                <IoCheckmarkDone />
                Finished
              </button>
            </div>

            <div className="single-book-description-details">
              <>
                <div className="book-description-wrapper">
                  <div
                    className="book-description"
                    ref={descrHeight}
                    dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
                  ></div>

                  {readMore || (
                    <div className="book-description-bottom-gradient"></div>
                  )}
                </div>

                <button
                  className="read-more-btn btn regular-btn"
                  onClick={() => {
                    setReadMore(!readMore);
                    if (readMore)
                      descrHeight.current.style.maxHeight = `${150}px`;
                    if (readMore === false)
                      descrHeight.current.style.maxHeight = `${descrHeight.current.scrollHeight}px`;
                  }}
                >
                  {readMore ? "Show Less" : "Read More"}
                  {readMore ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
              </>
            </div>

            <div className="single-book-details">
              {volumeInfo?.pageCount && (
                <div>
                  <h3>Number of pages</h3>
                  <p>{volumeInfo.pageCount}</p>
                </div>
              )}

              {volumeInfo?.publishedDate && (
                <div>
                  <h3>First published</h3>
                  <p>{volumeInfo.publishedDate}</p>
                </div>
              )}

              {volumeInfo?.categories?.[0] && (
                <div>
                  <h3>Category</h3>
                  <p>{volumeInfo.categories[0]}</p>
                </div>
              )}
              {volumeInfo?.averageRating && (
                <div>
                  <h3>Average Rating</h3>
                  <p>
                    <span>
                      <AiFillStar />
                      {volumeInfo.averageRating}
                    </span>
                    {`(${volumeInfo.ratingsCount} votes)`}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleBook;
