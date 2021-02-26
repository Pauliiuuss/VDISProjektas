import React from "react";

const LoadingSpan = () => {
  return (
    <div
      className="d-flex justify-content-center m-5"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div
        className="spinner-border"
        style={{ width: "3rem", height: "3rem", marginTop: "3rem" }}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpan;
