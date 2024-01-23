import React from "react";

const Error = ({message}) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="alert alert-danger text-center w-50 text-black" role="alert">
      {message}
      </div>
    </div>

  );
};

export default Error;
