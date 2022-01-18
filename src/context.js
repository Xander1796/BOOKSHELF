import React, { useContext, useState, useEffect, useRef } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  let [bestSelledBooks, setBestSelledBooks] = useState(["something"]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef();

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("Bookshelf updated");

  let localStorageBookshelf = localStorage.getItem("bookshelf");

  if (!localStorageBookshelf) {
    localStorage.setItem(
      "bookshelf",
      JSON.stringify({
        readingNow: [],
        toRead: [],
        finishedBooks: [],
      })
    );
  }

  const [bookshelf, setBookshelf] = useState(
    JSON.parse(localStorage.getItem("bookshelf"))
  );

  const nytKey = "tuvnlDJQRdyYvL03iMG9UYrp51BGXnmT";
  const googleKey = "AIzaSyDuCQ1PmREdrQQsquhR2aiTnmGizfMDtrI";
  console.log("render");

  useEffect(() => {
    async function getBestSelledBooks() {
      try {
        setIsFetching(true);
        const data = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${nytKey}`
        );
        const response = await data.json();
        setBestSelledBooks(response.results.lists);
        setIsFetching(false);
        console.log("yes");
      } catch (error) {
        console.log(error)
      }
    }

    getBestSelledBooks();
  }, []);

  return (
    <AppContext.Provider
      value={{
        bestSelledBooks,
        isFetching,
        searchQuery,
        setSearchQuery,
        searchInput,
        setIsPopupVisible,
        isPopupVisible,
        popupMessage,
        setPopupMessage,
        bookshelf,
        setBookshelf,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
