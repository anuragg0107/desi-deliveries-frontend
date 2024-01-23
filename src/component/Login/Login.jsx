import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Error from "../Loader/Error";
import googlelogo from "../../../src/images/googlelogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const handleLogin = async () => {
    const user = {
      email,
      password,
    };

    try {
      setLoading(true);
      const res = await axios.post("https://backend-desideliveries.onrender.com/api/users/login", user);
      const userData = res.data;
  
      if (res.status === 200) {
        setLoading(false);
  
        // Check for admin role
        if (userData.isAdmin) {
          localStorage.setItem("currentUser", JSON.stringify(userData));
          window.location.href = '/admin';
          console.log("Login with admin");
        } else {
          // if user is not admin go to home page
          localStorage.setItem("currentUser", JSON.stringify(userData));
          window.location.href = '/';
          console.log("Login with user");
        }
      } else {
        setLoading(false);
        setError(true);

        if (res.status === 400) {
          if (res.data && res.data.error) {
            toast.error(res.data.error, { position: toast.POSITION.TOP_RIGHT });
          } else {
            toast.error("Please re-check your email or password or create an account", { position: toast.POSITION.TOP_RIGHT });
          }
        }
      }
    }
    catch (err) {
      setLoading(false);
      setError(true);
      toast.error("An error occurred. Please try again later.", { position: toast.POSITION.TOP_RIGHT });
    }
  };


  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      window.location.href = "/";
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="login">
        <div className="container">
          {/* {error && <Error message="Invalid Creadational" />} */}
          <div className="row justify-content-center">
            <div className="col-12 col-sm-8 col-md-6">
              <div className="text-center">
                <h2 className=" text-center text-2xl font-bold text-white">
                  Sign in to your account
                </h2>
              </div>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <label for="email" className="form-label text-white">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <label for="password" className="form-label text-white">
                      Password
                    </label>
                    <a href="/password-reset" className="text-white">
                      Forgot password?
                    </a>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    onClick={handleLogin}
                  >
                    Sign in
                  </button>
                </div>
              </form>
              {/* <h2
                classNameName="text-center"
                style={{ fontWeight: "600", fontSize: "1.2em" }}
              >
                OR
              </h2>
              <button type="submit" classNameName="btn btn-primary w-100 mb-2">
                <img
                  src={googlelogo}
                  alt="googleicon"
                  style={{ height: "25px", width: "25px" }}
                />
                <span classNameName="p-2">Login with google</span>
              </button> */}
              <p className="text-center text-white">
                <a href="/register" className="font-weight-bold text-white">
                  Not a member? Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default Login;
