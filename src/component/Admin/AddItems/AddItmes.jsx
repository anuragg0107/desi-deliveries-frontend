import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Navbar/AdminNavbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddItmes = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const addItem = async () => {
    const addItemData = {
      title,
      price,
      description,
      category,
      image,
    };
    try {
      setLoading(true);
      const res = await axios.post(
        "https://backend-desideliveries.onrender.com/api/food",
        addItemData,
      );
      await res.data;
      setLoading(false);
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");
      toast.success("Item added to food list", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      setLoading(false);
      setError(true);
      toast.error("Something went wrong on API please check once", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(err);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="container border mt-4">
        <form>
          <h2 className="text-center">Add Food Items</h2>

          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter food title"
              required
              name="title"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Image:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter food image"
              required
              name="Image"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter food description"
              required
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Price:
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter food price"
              required
              name="price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">
              Category:
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter food category"
              required
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary w-100 mb-2"
            onClick={addItem}
          >
            Add Food
          </button>
        </form>
      </div>

      <ToastContainer position="top-right" />
    </>
  );
};

export default AddItmes;
