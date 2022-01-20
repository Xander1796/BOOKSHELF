import React, { useContext, useState, useEffect, useRef } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef();

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupProperties, setPopupProperties] = useState({
    message: "",
    type: ""
  });

  let localStorageBookshelf = localStorage.getItem("bookshelf");

  if (!localStorageBookshelf) {
    localStorage.setItem(
      "bookshelf",
      JSON.stringify({
        readingNow: [],
        bookmarks: [],
        finishedBooks: [],
      })
    );
  }

  const [bookshelf, setBookshelf] = useState(
    JSON.parse(localStorage.getItem("bookshelf"))
  );

  const googleKey = "AIzaSyDuCQ1PmREdrQQsquhR2aiTnmGizfMDtrI";
  console.log("render");

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        searchInput,
        setIsPopupVisible,
        isPopupVisible,
        popupProperties,
        setPopupProperties,
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
