import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  let [bestSelledBooks, setBestSelledBooks] = useState(["something"]);
  const [isFetching, setIsFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalSearchPages, setTotalSearchPages] = useState(1);

  const nytKey = "tuvnlDJQRdyYvL03iMG9UYrp51BGXnmT";
  const googleKey = "AIzaSyDuCQ1PmREdrQQsquhR2aiTnmGizfMDtrI";
  console.log("render");

  useEffect(() => {
    async function getBestSelledBooks() {
      setIsFetching(true);
      const data = await fetch(
        `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${nytKey}`
      );
      const response = await data.json();
      setBestSelledBooks(response.results.lists);
      setIsFetching(false);
      console.log('yes')
    }

    getBestSelledBooks();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isVisible,
        setIsVisible,
        bestSelledBooks,
        isFetching,
        searchQuery,
        setSearchQuery,
        totalSearchPages,
        setTotalSearchPages,
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
