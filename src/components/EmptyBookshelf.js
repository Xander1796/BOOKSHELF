import React from "react";
import { Link } from "react-router-dom";

import { useGlobalContext } from "../context";
import emptyBookshelfSvg from "../assets/svg/bookshelf-empty.svg";

const EmptyBookshelf = () => {
  const { searchInput } = useGlobalContext();

  return (
    <div className="empty-bookshelf-wrapper">
      <img src={emptyBookshelfSvg} alt="bookshelf empty" />
      <h1>This bookshelf is empty</h1>
      <p>
        See <Link to="/#best-selled">the best selling books</Link> or{" "}
        <button onClick={() => searchInput.current.focus()}>search</button> for
        books that you are interested in.
      </p>
    </div>
  );
};

export default EmptyBookshelf;
