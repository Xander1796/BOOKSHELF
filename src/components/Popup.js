import React, { useEffect } from "react";

import { Link } from "react-router-dom";

import { BsCheckCircleFill } from "react-icons/bs";
import { BiError } from "react-icons/bi";
import { IoClose, IoTrashBin } from "react-icons/io5";
import { useGlobalContext } from "../context";

///LIBRARY FOR ANIMATING ON MOUNT AND UNMOUNT
import { TransitionGroup, CSSTransition } from "react-transition-group";
////

const Popup = () => {
  const { hidePopup, popupProperties, setTimeoutActive } = useGlobalContext();

  const setIcon = (popupItem) => {
    if (popupItem.type === "remove") {
      return <IoTrashBin className="popup-info-icon" />;
    }
    if (popupItem.type === "done") {
      return <BsCheckCircleFill className="popup-info-icon" />;
    }
    if (popupItem.type === "error") {
      return <BiError className="popup-info-icon" />;
    }
  };

  return (
    <div className="popup-wrapper">
      <TransitionGroup component={null}>
        {popupProperties.map((popupItem) => {
          if (!popupItem?.isTimeoutActive) {
            setTimeoutActive();

            setTimeout(() => {
              hidePopup(popupItem.id);
            }, 5000);
          }
          return (
            <CSSTransition key={popupItem.id} timeout={500} classNames="popup">
              <div className={`popup ${popupItem.type}`}>
                <div className="popup-message">
                  {setIcon(popupItem)}
                  <h3>
                    {popupItem.bookName} <span>{popupItem.message}</span>
                  </h3>
                </div>

                {popupItem.link.length > 0 && (
                  <Link
                    to={popupItem.link}
                    onClick={() => hidePopup(popupItem.id)}
                  >
                    Go there
                  </Link>
                )}
                <button
                  className="popup-close-btn"
                  onClick={() => {
                    hidePopup(popupItem.id);
                  }}
                >
                  <IoClose />
                </button>
              </div>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </div>
  );
};

export default Popup;
