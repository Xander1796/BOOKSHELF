import React, { useState } from "react";
import { Link } from "react-router-dom";
import { bookshelfBtnData } from "../data";
import { BiRightArrowAlt } from "react-icons/bi";

//icons
import { IoIosArrowDown } from "react-icons/io";
import { ImBooks } from "react-icons/im";

const BookshelfBtn = () => {
  const [isDropdownOn, setIsDropdownOn] = useState(false);

  return (
    <div
      className="bookshelf-actions"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setIsDropdownOn(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setIsDropdownOn(false);
      }}
    >
      <button
        className="bookshelf-btn"
        onClick={() => {
          setIsDropdownOn(!isDropdownOn);
        }}
      >
        <ImBooks />
        Your bookshelf
        <IoIosArrowDown className={isDropdownOn ? "rotate" : ""} />
      </button>

      <ul
        className={`${
          isDropdownOn ? "bookshelf-actions-dropdown-on" : ""
        } bookshelf-actions-list`}
      >
        {bookshelfBtnData.map((el, i) => {
          const { title, description, src, path } = el;

          return (
            <li key={i}>
              <Link
                to={path}
                onClick={() => {
                  setIsDropdownOn(false);
                }}
              >
                <img
                  src={src}
                  alt={description}
                  className="bookshelf-action-img"
                ></img>
                <div>
                  <h3 className="bookshelf-action-title">
                    {title}
                    <BiRightArrowAlt className="arrow-svg" />
                  </h3>
                  <p className="bookshelf-action-description">{description}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BookshelfBtn;
