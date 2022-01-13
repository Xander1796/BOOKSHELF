import React from "react";
import { Link } from "react-router-dom";
import BestSelled from "../components/BestSelled";


//components
import Hero from "../components/Hero";

const Home = () => {

  return (
    <>
      <Hero />
      <BestSelled />
    </>
  );
};

export default Home;
