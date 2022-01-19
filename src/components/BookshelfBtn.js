import React from "react";
import { Link } from "react-router-dom";
import { bookshelfBtnData } from "../data";
import { BiRightArrowAlt } from "react-icons/bi";

//icons
import { IoIosArrowDown } from "react-icons/io";

const BookshelfBtn = () => {
  return (
    <div className="bookshelf-actions">
      <button className="bookshelf-btn">
        Your bookshelf
        <IoIosArrowDown />
      </button>

      <ul className="bookshelf-actions-list">
        {bookshelfBtnData.map((el, i) => {
          const { title, description, src, path } = el;

          return (
            <li key={i}>
              <Link to={path}>
                <img src={src} alt={description} className="bookshelf-action-img"></img>
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
