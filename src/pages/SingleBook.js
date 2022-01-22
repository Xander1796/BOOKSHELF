import React, { useState, useRef, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

import noImage from "../assets/svg/no-image.png";

//icons
import { BsBook, BsBookmark, BsPatchCheck } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiFillStar, AiOutlineCheckCircle } from "react-icons/ai";

const SingleBook = () => {
  const [readMore, setReadMore] = useState(false);
  const [singleBook, setSingleBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const descrHeight = useRef();

  const { volumeId } = useParams();

  const { showPopup, bookshelves, setBookshelves} =
    useGlobalContext();

  useEffect(() => {
    async function getSingleBook() {
      try {
        setIsLoading(true);
        console.log(volumeId);
        const data = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${volumeId}`
        );
        const response = await data.json();
        console.log(response);
        setSingleBook(response);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getSingleBook();
  }, [volumeId]);

  const { volumeInfo, saleInfo } = singleBook;

  const setBook = (typeOfBookshelf, route, name) => {
    for (let i = 0; i < bookshelves.length; i++) {
      for (let j = 0; j < bookshelves[i].books.length; j++) {
        if (bookshelves[i].books[j].volumeId === volumeId) {
          showPopup({
            isPopupVisible: true,
            link: `bookshelf${bookshelves[i].route}`,
            message: `This book is already in ${typeOfBookshelf}`,
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
          <div className="single-book-actions">
            <div className="img-wrapper">
              <img
                src={
                  volumeInfo?.imageLinks?.thumbnail
                    ? volumeInfo.imageLinks.thumbnail
                    : noImage
                }
                alt=""
              />
              {saleInfo?.saleability === "FOR_SALE" && (
                <a
                  href={saleInfo?.buyLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn buy-book-btn"
                >
                  Buy this book
                </a>
              )}
            </div>
            <div className="single-book-cta-wrapper">
              <h2>{volumeInfo?.title ? volumeInfo.title : "No title"}</h2>
              <p>{`By ${
                volumeInfo?.authors?.[0]
                  ? volumeInfo.authors[0]
                  : "Unknown author"
              }`}</p>
              <div>
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
                  <AiOutlineCheckCircle />
                  Finished
                </button>
              </div>
            </div>
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
        </section>
      )}
    </>
  );
};

export default SingleBook;
