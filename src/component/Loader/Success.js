import React from "react";

const Success = ({ message }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="alert alert-success text-center w-50 text-black" role="alert">
        {message}
      </div>
    </div>
  );
};

export default Success;
