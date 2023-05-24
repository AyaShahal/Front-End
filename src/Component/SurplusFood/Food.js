import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Food.css";

function Surplus() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };
  return (
    <div>
      <div className="wrapper">
        <h2 className="head-title">Food Surplus</h2>
        <div className="Categories-links">
          <nav>
            <NavLink to="/Product">All</NavLink>
            <NavLink to="/Product">Fruits and Vegetables</NavLink>
            <NavLink to="/Product">Meat and Poultry</NavLink>
            <NavLink to="/Product">Packaged Foods and Snacks</NavLink>
            <NavLink to="/Product">Prepared Meals</NavLink>
          </nav>
        </div>
        <div className="Categories-dropdown">
            <select
              id="categorySelect"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Products</option>
              <option value="Homemade">Homemade</option>
              <option value="Recycling">Recycling</option>
              <option value="Hygienic">Hygienic</option>
            </select>
          </div>

        <div className="cards">
          <div className="card1">
            <div className="card__image">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Salad"
              />
            </div>
            <div className="card__info">
              <div className="card__info--title">
                <h3>Salad</h3>
                <div className="Food__info">
                  <p>Fresh & sweet</p>
                  <button className="btn-primary1" onClick={openModal}>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card1">
            <div className="card__image">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Salad"
              />
            </div>
            <div className="card__info">
              <div className="card__info--title">
                <h3>Salad</h3>
                <div className="Food__info">
                  <p>Fresh & sweet</p>
                  <button className="btn-primary1" onClick={openModal}>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card1">
            <div className="card__image">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Salad"
              />
            </div>
            <div className="card__info">
              <div className="card__info--title">
                <h3>Salad</h3>
                <div className="Food__info">
                  <p>Fresh & sweet</p>
                  <button className="btn-primary1" onClick={openModal}>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card1">
            <div className="card__image">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Salad"
              />
            </div>
            <div className="card__info">
              <div className="card__info--title">
                <h3>Salad</h3>
                <div className="Food__info">
                  <p>Fresh & sweet</p>
                  <button className="btn-primary1" onClick={openModal}>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card1">
            <div className="card__image">
              <img
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt="Salad"
              />
            </div>
            <div className="card__info">
              <div className="card__info--title">
                <h3>Salad</h3>
                <div className="Food__info">
                  <p>Fresh & sweet</p>
                  <button className="btn-primary1" onClick={openModal}>
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
            <span className="close1" onClick={closeModal}>
                &times;
              </span>
              <div className="card2__image">
                <img
                  src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt="Salad" width="500px" height="333px"
                />
                <div className="card__info--title">
                  <div className="info">
                    <div className="product-name">
                      <h3>Salad</h3>
                    </div>
                    <div className="details1">
                      <span>Quantity: </span>
                      <p> 10</p>
                    </div>
                    <div className="details1">
                      <span>Expiration Date: </span>
                      <p> 2023-05-31</p>
                    </div>
                  </div>
                  <div className="Food__info1">
                    <p>Fresh &amp; sweet</p>
                    <p>
                      Food Description: Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit.
                    </p>
                    
                  </div>
                </div>
              </div>
              <div className="more-info">
                <h2>Business Name</h2>
                <div className="details">
                  <span>City: </span> <p>New York</p>
                </div>
                <div className="details">
                  <span>Building: </span> <p> ABC Building</p>
                </div>

                <div className="details">
                  <span>Street: </span> <p> Main Street</p>
                </div>
                <div className="details">
                  <span>Phone Number: </span> <p>123-456-7890</p>
                </div>
                <div className="donate-button">
                <button className="btn-primary1" onClick={openModal}>
                  Donate
                  </button>
                  </div>
              </div>
              <span className="close" onClick={closeModal}>
                &times;
              </span>

            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}

export default Surplus;
