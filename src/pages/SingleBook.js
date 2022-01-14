import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

import { useParams } from "react-router-dom";

//icons
import { BsBook, BsBookmark, BsPatchCheck } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";

const SingleBook = () => {
  const [readMore, setReadMore] = useState(false);
  const [singleBook, setSingleBook] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const descrHeight = useRef();

  const { volumeId } = useParams();

  useEffect(() => {
    async function getSingleBook() {
      try {
        setIsLoading(true);
        console.log(volumeId)
        const data = await fetch(`https://www.googleapis.com/books/v1/volumes/${volumeId}`);
        const response = await data.json();
        console.log(response);
        setSingleBook(response.volumeInfo);

        setIsLoading(false);
      } catch (error) {
        alert(error);
      }
    }

    getSingleBook();
  }, [volumeId]);

  function getTruncatedString(string, numberOfWords) {
    console.log(string);
    let theString = string.split(" ");
    console.log(string);

    let truncatedString = [];

    for (let i = 0; i < numberOfWords; i++) {
      truncatedString.push(theString[i]);
    }

    return truncatedString.join(" ");
  }

  function getRemainingString(string, numberOfWords) {
    let theString = string.split(" ");

    let truncatedString = [];

    for (let i = numberOfWords; i < theString.length; i++) {
      truncatedString.push(theString[i]);
    }

    return truncatedString.join(" ");
  }


  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isLoading || (
        <section className="single-book">
          <div className="single-book-actions">
            <img src={singleBook.imageLinks.thumbnail} alt="" />
            <div className="single-book-cta-wrapper">
              <h2>{singleBook.title}</h2>
              <p>{`By ${singleBook.authors}`}</p>
              <div>
                <button className="btn regular-btn">
                  <BsBook />
                  Reading Now
                </button>
                <button className="btn regular-btn">
                  <BsBookmark />
                  Bookmark
                </button>
                <button className="btn regular-btn">
                  <BsPatchCheck />
                  Finished
                </button>
              </div>
            </div>
          </div>

          <div className="single-book-description-details">
            <>
              <p className="single-book-description">
                {`${getTruncatedString(singleBook.description, 46)}`}
                {singleBook.description}
              </p>
              <p
                className={`more-description-content ${
                  readMore && "more-description-content-visible"
                }`}
                ref={descrHeight}
              >
                {getRemainingString(singleBook.description, 46)}
              </p>
              {singleBook.description.length > 250 && (
                <button
                  className="read-more-btn"
                  onClick={() => {
                    setReadMore(!readMore);
                    if (readMore)
                      descrHeight.current.style.maxHeight = `${0}px`;
                    if (readMore === false)
                      descrHeight.current.style.maxHeight = `${descrHeight.current.scrollHeight}px`;
                  }}
                >
                  {readMore ? "Show Less" : "Read More"}
                  {readMore ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </button>
              )}
            </>
          </div>
          <div className="single-book-details">
            <div>
              <h3>Number of pages</h3>
              <p>{singleBook.pageCount}</p>
            </div>

            <div>
              <h3>First published</h3>
              <p>{singleBook.publishedDate}</p>
            </div>

            <div>
              <h3>Category</h3>
              <p>{singleBook.categories[0]}</p>
            </div>
            {singleBook.averageRating && (
              <div>
                <h3>Average Rating</h3>
                <p>
                  <span>
                    <AiFillStar />
                    {singleBook.averageRating}
                  </span>
                  {`(${singleBook.ratingsCount} votes)`}
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
