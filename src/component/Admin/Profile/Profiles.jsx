import React, { useState, useEffect } from "react";
import AdminNavbar from "../../Navbar/AdminNavbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Profiles = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://backend-desideliveries.onrender.com/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`https://backend-desideliveries.onrender.com/api/users/${userId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("User deleted successfully from data base", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("Something went wrong on API please check once", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log("Error deleting user:", error);
    }
  };

  return (
    <>
      <AdminNavbar />
      <h2 className="mt-2 mb-2 text-center">User Details</h2>
      <div className="container mt-4 border">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>isAdmin</th>
                <th>CreatedAt</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer position="top-right" />
    </>
  );
};

export default Profiles;
