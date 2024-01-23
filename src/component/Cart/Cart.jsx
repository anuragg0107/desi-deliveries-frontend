import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinus,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";


const Cart = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get("https://backend-desideliveries.onrender.com/api/cart");
      const cartData = await response.data;
      setData(cartData);
    } catch (err) {
      toast.error("Cart is emprty please add food", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const calculateTotal = () => {
    return data.reduce((total, item) => total + item.price, 0);
  };

  const handleDecrement = (itemId) => {
    const updatedData = data.map((item) => {
      if (item._id === itemId) {
        // Decrease quantity but not below 1
        item.quantity = Math.max(item.quantity - 1, 1);
      }
      return item;
    });

    setData(updatedData);
  };

  const handleQuantityChange = (event, itemId) => {
    const updatedData = data.map((item) => {
      if (item._id === itemId) {
        item.quantity = Math.max(parseInt(event.target.value) || 1, 1);
      }
      return item;
    });

    setData(updatedData);
  };

  const handleIncrement = (itemId) => {
    const updatedData = data.map((item) => {
      if (item._id === itemId) {
        item.quantity++;
      }
      return item;
    });
    setData([...updatedData]); 
  };

  const handleDeleteFromCart = (itemId) => {
    const updatedData = data.filter((item) => item._id !== itemId);
    setData(updatedData);
  };

  return (
    <>
      <Navbar />

      <section className="h-100 gradient-custom">
        <div className="container py-5">
          <div className="row d-flex justify-content-center my-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Cart - {data.length} items</h5>
                </div>
                <div className="card-body">
                  {data.map((el) => {
                    return (
                      <>
                        <div key={el._id} className="row mb-3">
                          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                            <div
                              className="bg-image hover-overlay hover-zoom ripple rounded"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={el.image}
                                className="w-100 rounded"
                                alt={el.title}
                              />
                              <a href="#!">
                                <div
                                  className="mask"
                                  style={{
                                    backgroundColor: "rgba(251, 251, 251, 0.2)",
                                  }}
                                ></div>
                              </a>
                            </div>
                          </div>
                          <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                            <p>
                              <strong>{el.title}</strong>
                            </p>
                            {/* <p>Color: red</p>
                        <p>Size: M</p> */}
                            <p>
                              <strong>Price: ₹{el.price}</strong>
                            </p>
                          </div>
                          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                            <div
                              className="d-flex mb-4"
                              style={{ maxWidth: "300px" }}
                            >
                              <button
                                className="btn btn-primary"
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  marginRight: "5px",
                                }}
                                onClick={() => handleDecrement(el._id)}
                                disabled={el.quantity <= 1}
                              >
                                <FontAwesomeIcon
                                  icon={faMinus}
                                  style={{ color: "#FFF" }}
                                />
                              </button>

                              <div className="form-outline">
                                <input
                                  id="form1"
                                  name="quantity"
                                  value={el.quantity} 
                                  type="number"
                                  className="form-control text-center"
                                  onChange={(e) =>
                                    handleQuantityChange(e, el._id)
                                  }
                                />
                              </div>

                              <button
                                className="btn btn-primary"
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  marginLeft: "5px",
                                }}
                                onClick={() => handleIncrement(el._id)}
                              >
                                <FontAwesomeIcon icon={faPlus} />
                              </button>

                              <button
                                className="btn btn-danger"
                                style={{
                                  height: "40px",
                                  width: "40px",
                                  marginLeft: "5px",
                                }}
                                onClick={() => handleDeleteFromCart(el._id)}
                              >
                                <FontAwesomeIcon icon={faTrash} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header py-3">
                  <h5 className="mb-0">Summary</h5>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Total
                      <span>₹{calculateTotal().toFixed(2)}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                      Shipping
                      <span>Free</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                        <strong>
                          <p className="mb-0">(including All TAX)</p>
                        </strong>
                      </div>
                      <span>
                        <strong>₹{calculateTotal().toFixed(2)}</strong>
                      </span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="btn btn-primary btn-lg btn-block"
                  >
                    Go to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer position="top-right" />
    </>
  );
};

export default Cart;
