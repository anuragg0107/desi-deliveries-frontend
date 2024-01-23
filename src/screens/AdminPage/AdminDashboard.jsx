import React from "react";
import AdminRoute from "./AdminRoute";
import AdminNavbar from "../../component/Navbar/AdminNavbar";

const AdminDashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isAdmin = currentUser && currentUser.isAdmin;
  AdminRoute(isAdmin);

  return (
    <>
      <AdminNavbar />
      <h2 className="text-center mt-5">Welcome to admin page</h2>
      <ul className="d-flex justify-content-center align-items-center flex-wrap mt-4">
        <li className="me-2">
          <a href="/userdetails" className="btn btn-primary">
            See User Details
          </a>
        </li>
        <li className="me-2">
          <a href="/orderdetails" className="btn btn-primary">
            See Order Details
          </a>
        </li>
        <li className="me-2">
          <a href="/additems" className="btn btn-primary">
            Add Food Items
          </a>
        </li>
      </ul>
    </>
  );
};

export default AdminDashboard;
