import React, { useEffect } from "react";

import { BsCheckCircleFill } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../context";

const Popup = () => {
  const { isPopupVisible, setIsPopupVisible } = useGlobalContext();

  useEffect(() => {
    if (isPopupVisible)
      setTimeout(() => {
        setIsPopupVisible(false);
      }, 4000);
  }, [isPopupVisible]);

  return (
    <>
      {isPopupVisible && (
        <div className="popup">
          <BsCheckCircleFill className="check-icon" />
          <span>Bookshelf updated</span>
          <button
            className="popup-close-btn"
            onClick={() => setIsPopupVisible(false)}
          >
            <IoClose />
          </button>
        </div>
      )}
    </>
  );
};

export default Popup;
