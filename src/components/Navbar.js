import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import BookshelfBtn from "./BookshelfBtn";
import { bookshelfBtnData } from "../data";

const Navbar = () => {
  return (
    <nav>
      <div className="nav-content">
        <Link to="/" className="app-logo">
          Bookshelf<span>.</span>
        </Link>
        <Search />
        <BookshelfBtn />
      </div>
    </nav>
  );
};

export default Navbar;
