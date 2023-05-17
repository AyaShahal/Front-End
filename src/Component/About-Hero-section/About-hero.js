import React from "react";
import "./About-hero.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
function Abouthero() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div>
      <img src="https://cdnimg.webstaurantstore.com/images/articles/140/reducefoodwaste_header.jpg" width="100%"/>

      <div className="about-section">
        <div className="about-title">
          <h6>What We Do .</h6>
          <h1>something great</h1>
          <p>
            Through our innovative web application, we provide businesses with a
            platform to showcase and donate their surplus food
          </p>
        </div>
        <Slider {...settings} style={{ width: "30%" }}>
          <div className="about-content">
            <img
              src="https://img.freepik.com/free-photo/female-chef-kitchen-preparing-plate-steak_23-2149720770.jpg?t=st=1684177048~exp=1684177648~hmac=2955dd242f90bf8f09cd6259dc42098f7be325dd7f9b573d9b7cea60c20d3ea9"
              className="circle-image"
              alt="Your Image"
            />
          </div>
          <div className="about-content">
            <img
              src="https://img.freepik.com/free-photo/delicious-preserved-food-arrangement_23-2149238970.jpg?size=626&ext=jpg&ga=GA1.1.945197146.1682429182&semt=ais"
              className="circle-image"
              alt="Your Image"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default Abouthero;
