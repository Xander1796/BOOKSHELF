import React, { useState } from "react";
import { useGlobalContext } from "../context";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

//icons
import { BsBook, BsBookmark, BsPatchCheck } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SingleBook = () => {
  const { singleBook, isLoading, isFetching } = useGlobalContext();
  const [readMore, setReadMore] = useState(false);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isFetching || (
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
              {console.log(singleBook.description.length)}
              <p className="single-book-description">
                {readMore
                  ? singleBook.description
                  : `${singleBook.description.slice(0, 250)}...`}
              </p>
              {singleBook.description.length > 250 && (
                <button
                  className="read-more-btn"
                  onClick={() => setReadMore(!readMore)}
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
              <p>{singleBook.categories}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SingleBook;
