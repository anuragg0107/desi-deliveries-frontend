import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Loading from "../Loader/Loading";
import Error from "../Loader/Error";
import Success from "../Loader/Success";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confmPass, setConfmPass] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [success , setSuccess] = useState();
  // Add these lines at the beginning of the component

  const handleRegister = async () => {
    if (password === confmPass) {
      const user = {
        name,
        email,
        password,
        confmPass,
      };
      try {
        setLoading(true);
        const res = await axios.post(
          "https://backend-desideliveries.onrender.com/api/users/register",
          user
        );
        await res.data;
        setLoading(false);
        setName('');
        setEmail('');
        setPassword('');
        setConfmPass('');
        toast.success("Account created successfully!", { position: toast.POSITION.TOP_RIGHT });
        window.location.href='/login'
      } catch (err) {
        setLoading(false);
        setError(true);
      }
    } else {
      alert("Password not matched");
    }
  };
  return (
  <>
    <Navbar />
    {/* {loading && (<Loading />)} */}
    {error && (<Error />)}
     
    <div className="register">
      <div className="container">
        <div className="row justify-content-center">
      
          <div className="col-12 col-sm-8 col-md-6">
            <div className="text-center">
              <h2 className="text-center text-2xl font-bold text-gray-900">
                Sign up for an account
              </h2>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-3">
                <label for="email" className="form-label text-white">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                  <label for="Password" className="form-label text-white">
                     Password
                  </label>
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
                <div className="d-flex justify-content-between align-items-center">
                  <label for="confirmPassword" className="form-label text-white">
                    Confirm Password
                  </label>
                </div>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={confmPass}
                  onChange={(e) => setConfmPass(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  onClick={handleRegister}
                >
                  Sign up
                </button>
              </div>
            </form>
            <p className="text-center text-white mt-3">
              <a href="/Login" className="font-weight-bold text-white">
                Already have an account? Login
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

export default Register;
