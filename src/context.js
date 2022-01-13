import React, { useContext, useState, useEffect } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  let [bestSelledBooks, setBestSelledBooks] = useState(["something"]);
  const [isFetching, setIsFetching] = useState(true);
  const [singleBook, setSingleBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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
    }

    getBestSelledBooks();
  }, []);

  const getSingleBook = async (isbn) => {
    try {
      setIsLoading(true);
      setIsFetching(true);
      const data = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=+isbn:${isbn}`
      );
      const response = await data.json();
      setSingleBook(response.items[0].volumeInfo);
      console.log(response.items[0].volumeInfo);

      setIsFetching(false);
      setIsLoading(false);
      return response;
    } catch (error) {
      alert(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        isVisible,
        setIsVisible,
        bestSelledBooks,
        isFetching,
        getSingleBook,
        singleBook,
        setSingleBook,
        isLoading,
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
