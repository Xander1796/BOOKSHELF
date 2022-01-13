import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import BookshelfBtn from "./BookshelfBtn";
import { bookshelfBtnData } from "../data";

const Navbar = () => {
  console.log(bookshelfBtnData)
  return (
    <nav>
      <span className="app-logo">
        Bookshelf<span>.</span>
      </span>
      <Search />
      <BookshelfBtn />
    </nav>
  );
};

export default Navbar;
