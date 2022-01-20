import React from "react";
import { Link } from "react-router-dom";
import BestSelledSection from "../components/BestSelledSection";


//components
import Hero from "../components/Hero";

const Home = () => {

  return (
    <>
      <Hero />
      <BestSelledSection />
    </>
  );
};

export default Home;
