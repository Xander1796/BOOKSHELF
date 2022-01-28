import React from "react";

export const reducer = (state, action) => {
  if (action.type === "FETCHING_BEST_SELLED") {
    return { ...state, isFetchingBestSelled: true };
  }
  if (action.type === "STOP_FETCHING_BEST_SELLED") {
    return { ...state, isFetchingBestSelled: false };
  }
  if (action.type === "SET_BEST_SELLED") {
    return {
      ...state,
      bestSelledBooks: action.payload
    };
  }

  if (action.type === "SHOW_POPUP") {
    return { ...state, popupProperties: { ...action.payload } };
  }
  if (action.type === "HIDE_POPUP") {
    return {
      ...state,
      popupProperties: { ...state.popupProperties, isPopupVisible: false },
    };
  }

  return state;
};
