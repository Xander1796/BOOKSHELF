import React from "react";
import Bookshelf from "./Bookshelf";
import useScrollTop from "../custom-hooks/useScrollTop";

const BookmarksBookshelf = () => {
  useScrollTop();
  return <Bookshelf />;
};

export default BookmarksBookshelf;
