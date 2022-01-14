import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import pages
import Home from "./pages/Home";
import SingleBook from "./pages/SingleBook.js";
import SearchResults from "./pages/SearchResults";

//import components
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/book/:volumeId" element={<SingleBook />}></Route>
        <Route path="/search" element={<SearchResults />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
