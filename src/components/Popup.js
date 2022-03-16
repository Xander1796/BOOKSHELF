import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import { BsCheckCircleFill } from "react-icons/bs";
import { BiError, BiRightArrowAlt } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../context";

///LIBRARY FOR ANIMATING ON MOUNT AND UNMOUNT
import { TransitionGroup, CSSTransition } from "react-transition-group";
////

import { v4 as uniqueId } from "uuid";

let timeout = undefined;

const Popup = () => {
  const { hidePopup, popupProperties, state } = useGlobalContext();

  useEffect(() => {
    if (popupProperties.isPopupVisible) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        hidePopup();
      }, 7000);
    }
  }, [popupProperties]);

  const id = uniqueId();

  return (
    <>
      <TransitionGroup component={null}>
        {popupProperties.isPopupVisible && (
          <CSSTransition timeout={500} classNames="popup">
            <div
              key={id}
              className={`popup ${
                popupProperties.type === "ok"
                  ? "popup-book-added"
                  : "popup-book-error"
              }`}
            >
              <div className="popup-message">
                {popupProperties.type === "ok" ? (
                  <BsCheckCircleFill className="popup-info-icon" />
                ) : (
                  <BiError className="popup-info-icon" />
                )}
                <h3>
                  {popupProperties.bookName}{" "}
                  <span>{popupProperties.message}</span>
                </h3>
              </div>

              {popupProperties.link.length > 0 && (
                <Link to={popupProperties.link} onClick={() => hidePopup()}>
                  Go there
                </Link>
              )}
              <button
                className="popup-close-btn"
                onClick={() => {
                  hidePopup();
                  clearTimeout(timeout);
                  timeout = undefined;
                }}
              >
                <IoClose />
              </button>
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </>
  );
};

export default Popup;
