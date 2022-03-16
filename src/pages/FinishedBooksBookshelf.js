import React from "react";
import Bookshelf from "./Bookshelf";
import useScrollTop from "../custom-hooks/useScrollTop";

const FinishedBooksBookshelf = () => {
  useScrollTop();
  return <Bookshelf />;
};

export default FinishedBooksBookshelf;
