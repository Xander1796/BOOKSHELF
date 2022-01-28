import React, {
  useContext,
  useState,
  useEffect,
  useReducer,
  useRef,
} from "react";

import { reducer } from "./reducer";

const initialState = {
  bestSelledBooks: [],
  isFetchingBestSelled: true,

  popupProperties: {
    isPopupVisible: false,
    link: "",
    message: "",
    type: "",
  },
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInput = useRef();

  const showPopup = (payload) => {
    dispatch({ type: "SHOW_POPUP", payload: payload });
  };
  const hidePopup = () => {
    dispatch({ type: "HIDE_POPUP" });
  };
  const replacePopup = (payload) => {
    dispatch({ type: "REPLACE_POPUP", payload: payload });
  };

  let localStorageBookshelves = localStorage.getItem("bookshelves");

  if (!localStorageBookshelves) {
    localStorage.setItem(
      "bookshelves",
      JSON.stringify([
        {
          bookshelfName: "Reading now",
          route: "/reading-now",
          books: [],
        },
        {
          bookshelfName: "Bookmarks",
          route: "/bookmarks",
          books: [],
        },
        {
          bookshelfName: "Finished books",
          route: "/finished-books",
          books: [],
        },
      ])
    );
  }

  const [bookshelves, setBookshelves] = useState(
    JSON.parse(localStorage.getItem("bookshelves"))
  );

  const googleKey = "AIzaSyDuCQ1PmREdrQQsquhR2aiTnmGizfMDtrI";

  const nytKey = "tuvnlDJQRdyYvL03iMG9UYrp51BGXnmT";

  useEffect(() => {
    const getBestSelledBooks = async () => {
      dispatch({ type: "FETCHING_BEST_SELLED" });
      try {
        const data = await fetch(
          `https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=${nytKey}`
        );
        const response = await data.json();

        dispatch({
          type: "SET_BEST_SELLED",
          payload: response.results.lists,
        });
        dispatch({ type: "STOP_FETCHING_BEST_SELLED" });
      } catch (error) {
        console.log(error);
      }
    };

    getBestSelledBooks();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        state,
        showPopup,
        hidePopup,
        replacePopup,
        searchQuery,
        setSearchQuery,
        searchInput,
        bookshelves,
        setBookshelves,
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
