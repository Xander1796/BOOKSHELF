//svg
import readingNow from "./assets/svg/reading-now.svg";
import toRead from "./assets/svg/to-read.svg";
import finished from "./assets/svg/book-finished.svg";

export const bookshelfBtnData = [
  {
    title: "Reading now",
    description: "Books that you are currently reading",
    src: readingNow,
    path: "/bookshelf/reading-now",
  },
  {
    title: "Bookmarks",
    description: "Books that you want to read",
    src: toRead,
    path: "/bookshelf/bookmarks",
  },
  {
    title: "Finished",
    description: "Books that you finished",
    src: finished,
    path: "/bookshelf/finished-books",
  },
];
