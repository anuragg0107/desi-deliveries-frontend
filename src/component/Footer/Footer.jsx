import React from "react";
import "./Footer.css";
import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <>
      <section className="contact-area" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 offset-lg-3">
              <div className="contact-content text-center">
                <a href="/">
                  <img src={logo} alt="logo" />
                </a>
                <p>
                Savor the Flavors, Delivered Desi-style!
                </p>
                <div className="hr"></div>
                <h6>1120 Lorem ipsum dolor sit amet, KC 179050, Satna.</h6>
                <h6>
                  +91 9754388825<span>|</span>+91 1234567890
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <p>
          Copyright &copy; 2024
          <img src={logo} alt="logo" /> All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
