import React from "react";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

import noBookSvg from "../assets/svg/no-book.svg";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="cta-wrapper">
        <h1>Bookshelf is your online library of books</h1>
        <p>Mange all your books in one place</p>
        <a href="#best-selled" className="hero-cta btn regular-btn">
          See The Best Selling Books
          <BiRightArrowAlt />
        </a>
      </div>

      <div className="current-reading-book-wrapper">
        <img src={noBookSvg}></img>
        <h3>You are not reading anything at the moment</h3>
        <a href="" className="btn regular-btn">
          Find something to read
          <BiRightArrowAlt />
        </a>
      </div>
    </section>
  );
};

export default Hero;
