import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import noImage from "../assets/svg/no-image.png";

//icons
import { BsBook, BsBookmark } from "react-icons/bs";
import { IoCheckmarkDone } from "react-icons/io5";

import { useGlobalContext } from "../context";
import LoadingSpinner from "./LoadingSpinner";

const BookshelfBtn = ({ btn, isbn, isLoading, setIsLoading, bookId }) => {
  const { bookshelves, showPopup, setBookshelves } = useGlobalContext();
  const [loadingGoogleBook, setLoadingGoogleBook] = useState(false);

  const navigate = useNavigate();

  const setBook = (typeOfBookshelf, route, volumeInfo, volumeId) => {
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

    showPopup({
      isPopupVisible: true,
      link: `/bookshelf${route}`,
      bookName: volumeInfo?.title.slice(0, 35),
      message: `has been added to ${typeOfBookshelf}`,
      type: "ok",
    });
  };

  const getGoogleBook = async (typeOfBookshelf, route) => {
    try {
      setLoadingGoogleBook(true);
      setIsLoading(true);
      const response = isbn
        ? await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
          )
        : await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
      const data = await response.json();

      const volumeId = data?.items ? data.items[0].id : data.id;
      const volumeInfo = data?.items
        ? data.items[0].volumeInfo
        : data.volumeInfo;

      setBook(typeOfBookshelf, route, volumeInfo, volumeId);
      setLoadingGoogleBook(false);
      setIsLoading(false);
    } catch (error) {
      navigate("/error");
    }
  };

  return (
    <button
      className={`${isLoading ? "not-allowed" : ""}`}
      onClick={() => {
        if (!isLoading) {
          getGoogleBook(btn.type, btn.route);
        }
      }}
    >
      {btn.icon}
      {btn.name}
      {loadingGoogleBook && <LoadingSpinner />}
    </button>
  );
};

const BookCard = ({ book, transitionDelay }) => {
  const { title, img, weeks_on_list, author, isbn, volumeId } = book;
  const { searchInput } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const navigateToDetailsPage = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
      );
      const data = await response.json();
      navigate(`/book/${data.items[0].id}`);
    } catch (error) {
      navigate("/error");
    }
  };

  const buttonsInfo = [
    {
      name: "Reading now",
      icon: <BsBook />,
      type: "Reading now",
      route: "/reading-now",
    },
    {
      name: "Bookmark",
      icon: <BsBookmark />,
      type: "Bookmarks",
      route: "/bookmarks",
    },
    {
      name: "Finished",
      icon: <IoCheckmarkDone />,
      type: "Finished books",
      route: "/finished-books",
    },
  ];

  return (
    <li className="book" style={{transitionDelay: transitionDelay}}>
      <div className="top-card">
        <img src={img || noImage} alt={`Image for ${title}`} />
        <div>
          {weeks_on_list && (
            <span className="weeks-on-list">
              {Number(weeks_on_list) > 1
                ? `${weeks_on_list} weeks on the list`
                : `${weeks_on_list} week on the list`}
            </span>
          )}
          <h4>{title.length > 35 ? `${title.slice(0, 35)} ...` : title}</h4>
          {author && (
            <p>{author.length > 35 ? `${author.slice(0, 35)} ...` : author}</p>
          )}
          {!author && <p>Unknown author</p>}
        </div>
      </div>

      <div className="bottom-card">
        <div className="actions">
          {buttonsInfo.map((btn, i) => {
            return (
              <BookshelfBtn
                btn={btn}
                isbn={isbn}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                bookId={volumeId}
                key={i}
              />
            );
          })}
        </div>

        {isbn && (
          <button className="details" onClick={(e) => navigateToDetailsPage(e)}>
            See details
          </button>
        )}

        {volumeId && (
          <Link
            className="details"
            to={`/book/${volumeId}`}
            onClick={() => (searchInput.current.value = "")}
          >
            See details
          </Link>
        )}
      </div>
      {/* </a> */}
    </li>
  );
};

export default BookCard;
