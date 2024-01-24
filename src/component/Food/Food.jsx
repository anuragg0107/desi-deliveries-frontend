import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import Loading from "../Loader/Loading";
import foodhome from "../../images/food.gif";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

const Food = () => {
  const [food, setFood] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [searchFood, setSearchFood] = useState("");
  const [foodTypeFilter, setFoodTypeFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://backend-desideliveries.onrender.com/api/food"
      );
      const setdata = await response.data;

      let filteredData = setdata.filter((el) => {
        return (
          (foodTypeFilter === "" || el.category === foodTypeFilter) &&
          (searchFood.toLocaleLowerCase() === "" ||
            el.title.toLocaleLowerCase().includes(searchFood))
        );
      });
      if (sortOption === "lowToHigh") {
        filteredData = filteredData.sort((a, b) => a.price - b.price);
      } else if (sortOption === "highToLow") {
        filteredData = filteredData.sort((a, b) => b.price - a.price);
      }

      setFood(filteredData);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [foodTypeFilter, searchFood]);

  useEffect(() => {
    const savedFilter = localStorage.getItem("foodTypeFilter");
    if (savedFilter) {
      setFoodTypeFilter(savedFilter);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("foodTypeFilter", foodTypeFilter);
  }, [foodTypeFilter]);

  const handleAddToCart = async (foodId) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
      // User is not login, redirect to the login page
      window.location.href = "/login";
    } else {
      try {
        const selectedItem = food.find((item) => item.id === foodId);
        const response = await axios.post(
          "https://backend-desideliveries.onrender.com/api/cart",
          {
            title: selectedItem.title,
            price: selectedItem.price,
            image: selectedItem.image,
            category: selectedItem.category,
            description: selectedItem.description,
            size: "Half",
          }
        );

        const responseData = response.data;
        toast.success("Item added to your cart!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast.error("Error adding item to cart", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const handleQuantityChange = () => {};

  const handleSizeChange = () => {};

  return (
    <>
      <Navbar />
      <div className="mt-5 position-relative">
        <img
          src={foodhome}
          alt="food"
          style={{ width: "100%", maxHeight: "500px" }}
        />
        <h1
          className="position-absolute text-center w-100 text-black"
          style={{ top: "80%", transform: "translateY(-50%)" }}
        >
          Welcome to DesiDeliveries
        </h1>
      </div>

      <div className="text-center mt-2 mb-2">
        <h1>Search Food</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mx-auto mt-lg-1">
              <div className="d-flex align-items-center justify-content-center">
                <Form className="mb-3 flex-grow-1">
                  <InputGroup>
                    <Form.Control
                      type="search"
                      placeholder="Search favorite food"
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                      onChange={(e) => setSearchFood(e.target.value)}
                    />
                  </InputGroup>
                </Form>
                <select
                  className="form-control mb-3 w-25 border-1"
                  style={{ marginLeft: "14px" }}
                  value={foodTypeFilter}
                  onChange={(e) => setFoodTypeFilter(e.target.value)}
                >
                  {["Veg", "Non-veg"].map((value) => (
                    <option key={value} value={value.toLowerCase()}>
                      {value}
                    </option>
                  ))}
                </select>
                <select
                  className="form-control mb-3 w-25 border-1"
                  style={{ marginLeft: "14px" }}
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="default">Sort by</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ borderTop: "2px solid #000" }} />
      </div>
      <div
        className="container my-5 border p-2 rounded"
        style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.5)" }}
      >
        <div className="row">
          {loading ? (
            <Loading />
          ) : food.length > 0 ? (
            food
              .filter((el) => {
                return (
                  (foodTypeFilter === "" || el.category === foodTypeFilter) &&
                  (searchFood.toLocaleLowerCase() === "" ||
                    el.title.toLocaleLowerCase().includes(searchFood))
                );
              })
              .sort((a, b) => {
                if (sortOption === "lowToHigh") {
                  return a.price - b.price;
                } else if (sortOption === "highToLow") {
                  return b.price - a.price;
                }
                return 0;
              })
              .map((el) => (
                <div key={el.id} className="col-md-4 mb-4">
                  <div className="card">
                    <h5 className="card-title text-center mb-2 mt-2">
                      {el.title}
                    </h5>
                    <img
                      src={el.image}
                      className="card-img-top"
                      alt={el.title}
                    />
                    <div className="card-body">
                      <p className="card-text">{el.description}</p>
                      <p className="card-text">Price: ₹{el.price}</p>
                      <p className="card-text">Category: {el.category}</p>
                      <div className="form-group d-flex">
                        <label htmlFor={`quantity-${el.id}`}>Size:</label>
                        <select
                          id={`quantity-${el.id}`}
                          className="form-control mb-3 w-25 border-1"
                          style={{ marginLeft: "14px" }}
                          value={"Half"}
                          onChange={(e) =>
                            handleSizeChange(el.id, parseInt(e.target.value))
                          }
                        >
                          {["Half", "Full"].map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div>
                      {/* <div className="form-group d-flex">
                        <label htmlFor={`quantity-${el.id}`}>Quantity:</label>
                        <select
                          id={`quantity-${el.id}`}
                          className="form-control mb-3 w-25 border-1"
                          style={{ marginLeft: "14px" }}
                          value={1}
                          onChange={(e) =>
                            handleQuantityChange(
                              el.id,
                              parseInt(e.target.value, 10)
                            )
                          }
                        >
                          {[1, 2, 3, 4, 5].map((value) => (
                            <option key={value} value={value}>
                              {value}
                            </option>
                          ))}
                        </select>
                      </div> */}
                      <Button
                        className="btn btn-primary w-100"
                        onClick={() => handleAddToCart(el.id)}
                      >
                        <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <h5 className="text-center">No matching items found.</h5>
          )}
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-right" />
    </>
  );
};

export default Food;
