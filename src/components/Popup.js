import React, { useEffect } from "react";

import { BsCheckCircleFill } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../context";

let timeout = undefined;

const Popup = () => {
  const { isPopupVisible, setIsPopupVisible, popupMessage } =
    useGlobalContext();

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
      setIsPopupVisible(true);
      console.log("yes");
    }

    if (isPopupVisible) {
      timeout = setTimeout(() => {
        setIsPopupVisible(false);
        timeout = undefined;
      }, 5000);
    }
    console.log(timeout);
  }, [isPopupVisible]);

  return (
    <>
      {isPopupVisible && (
        <div
          className={`popup ${
            popupMessage === "Bookshelf updated"
              ? "popup-book-added"
              : "popup-book-error"
          }`}
        >
          {popupMessage === "Bookshelf updated" ? (
            <BsCheckCircleFill className="popup-info-icon" />
          ) : (
            <BiError className="popup-info-icon" />
          )}
          <span>{popupMessage}</span>
          <button
            className="popup-close-btn"
            onClick={() => {
              clearTimeout(timeout);
              timeout = undefined;
              setIsPopupVisible(false);
            }}
          >
            <IoClose />
          </button>
        </div>
      )}
    </>
  );
};

export default Popup;
