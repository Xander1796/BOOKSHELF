import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import pages
import Home from "./pages/Home";
import Top15BestSelled from "./pages/Top15BestSelled";
import SingleBook from "./pages/SingleBook.js";
import SearchResults from "./pages/SearchResults";
import Error from "./pages/Error";

//import components
import Navbar from "./components/Navbar";
import Popup from "./components/Popup";
import Bookshelf from "./pages/Bookshelf";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Popup />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/top15/:listName" element={<Top15BestSelled />}></Route>
        <Route path="/book/:volumeId" element={<SingleBook />}></Route>
        <Route path="/search" element={<SearchResults />}></Route>
        <Route path="/bookshelf/reading-now" element={<Bookshelf />}></Route>
        <Route path="/bookshelf/bookmarks" element={<Bookshelf />}></Route>
        <Route path="/bookshelf/finished-books" element={<Bookshelf />}></Route>
        <Route path="/error" element={<Error />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
