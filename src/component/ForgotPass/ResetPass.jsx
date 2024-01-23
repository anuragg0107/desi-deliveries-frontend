import React, { useEffect, useState } from "react";
import "./ForgotPass.css";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const ResetPass = () => {
    const { id, token } = useParams();
    const history = useNavigate();
  
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
  
    const userValid = async () => {
      try {
        const res = await fetch(`https://backend-desideliveries.onrender.com/api/users/forgotpassword/${id}/${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.status === 200) {
          console.log("user Valid");
        } else {
          history("*");
        }
      } catch (error) {
        console.error("Error checking user validity:", error);
      }
    };
  
    const setVal = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`https://backend-desideliveries.onrender.com/api/users/${id}/${token}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
          });          
  
        const data = await res.json();
        if (data.status === 200) {
          setPassword("");
          setMessage(true);
          toast.success(
            "Password change successfully please go to login page",
            { position: toast.POSITION.TOP_RIGHT }
          );
        } else {
          setPassword('');
          toast.error(
            "! Token Expire generate new link for forgot password",
            {position : toast.POSITION.TOP_RIGHT});
        }
      } catch (error) {
        console.error("Error resetting password:", error);
      }
    };
  
    useEffect(() => {
      userValid();
    }, []);

  return (
    <>
      <Navbar />

      <div className="forgot">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6">
              <div className="text-center">
                <h2 className=" text-center text-2xl font-bold text-black">
                  Enter your new password
                </h2>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3 ">
                  <label for="email" className="form-label text-black">
                    Enter your new password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    required
                    placeholder=" Enter your new password"
                    style={{ paddingLeft: "10px" }}
                    value={password}
                    onChange={setVal}
                  />
                </div>
                <div className="mb-3">
                  <button type="submit"  onClick={handleSubmit}
                  className="btn btn-primary w-100">
                    Submit
                  </button>
                </div>
              </form>
              <ToastContainer position="top-right" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
