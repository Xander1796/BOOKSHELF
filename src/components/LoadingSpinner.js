import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-wrapper">
      <svg className="loading-spinner" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20"></circle>
      </svg>
    </div>
  );
};

export default LoadingSpinner;
