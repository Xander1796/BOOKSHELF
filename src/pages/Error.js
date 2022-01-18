import React from "react";
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="error-section">
      <BiError />
      <h1>There was an unexpected error</h1>
      <Link to="/" className="btn regular-btn">Go back home</Link>
    </section>
  );
};

export default Error;
