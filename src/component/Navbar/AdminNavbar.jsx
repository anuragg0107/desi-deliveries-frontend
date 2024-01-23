import React from "react";
import "./Navbar.css";
import {
  faBars,
  faTimes,
  faCartPlus,
  faUser,
  faRightFromBracket,
  faHotel,
  faBowlFood,
  faAdd,
  faPeopleRoof,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminNavbar = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const logoutFunc = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/admin"></a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="navbar-nav ms-md-auto gap-2"
              style={{ marginRight: "50px" }}
            >
              {user ? (
                <div className="dropdown">
                  <a
                    className="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      classNameName="h-5 w-5"
                      aria-hidden="true"
                    />{" "}
                    {user.name}
                  </a>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li>
                      <a
                        className="dropdown-item"
                        href="/login"
                        onClick={logoutFunc}
                      >
                        <FontAwesomeIcon
                          icon={faRightFromBracket}
                          classNameName="h-5 w-5"
                          aria-hidden="true"
                        />{" "}
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <li className="nav-item rounded">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      href="/register"
                    >
                      <i className="bi bi-house-fill"></i>Register
                    </a>
                  </li>
                  <li className="nav-item rounded">
                    <a className="nav-link" href="/login">
                      <i className="bi bi-people-fill"></i>
                      Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
