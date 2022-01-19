import React, { useEffect } from "react";

import { BsCheckCircleFill } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../context";

let timeout = undefined;

const Popup = () => {
  const { isPopupVisible, setIsPopupVisible, popupProperties } =
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
      }, 7000);
    }
    console.log(timeout);
  }, [isPopupVisible, setIsPopupVisible]);

  return (
    <>
      {isPopupVisible && (
        <div
          className={`popup ${
            popupProperties.type === "ok"
              ? "popup-book-added"
              : "popup-book-error"
          }`}
        >
          {popupProperties.type === "ok" ? (
            <BsCheckCircleFill className="popup-info-icon" />
          ) : (
            <BiError className="popup-info-icon" />
          )}
          <span>{popupProperties.message}</span>
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
