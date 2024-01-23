import React, { useState } from "react";
import "./ForgotPass.css";
import Navbar from "../Navbar/Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Function to send email with reset password link
  const setValue = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://backend-desideliveries.onrender.com/api/users/sendpasslink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.status === 200) {
        setEmail("");
        setMessage(true);
        toast.success(
          "Reset password link sent to your email. Please check your email.",
          { position: toast.POSITION.TOP_RIGHT }
        );
      } else {
        toast.error("Invalid User", { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="forgot">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6">
              <div className="text-center">
                <h2 className=" text-center text-2xl font-bold text-black">
                  Forgot Password
                </h2>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3 ">
                  <label for="email" className="form-label text-black">
                    Enter your email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    placeholder=" Enter your email address"
                    style={{ paddingLeft: "10px" }}
                    value={email}
                    onChange={setValue}
                  />
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    onClick={sendLink}
                  >
                    Send Link
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default ForgotPass;
