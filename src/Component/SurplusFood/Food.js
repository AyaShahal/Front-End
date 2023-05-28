import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Food.css";
import axios from "axios";

function Surplus() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCardDetails, setSelectedCardDetails] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [data, setData] = useState([]);

 

  const closeModal = () => {
    setSelectedCardId(null);
    setSelectedCardDetails(null);
    setIsModalOpen(false);
  };

  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/Food");
        console.log(response);
        setData(response.data);
      } catch (error) {
        console.log("An error occurred while fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const openModal = (cardId) => {
    console.log("Selected Card ID:", cardId);
  
    const selectedCard = data.find((item) => item._id === cardId);
    console.log("Selected Card:", selectedCard);
  
    if (selectedCard) {
      setSelectedCardId(cardId);
      setSelectedCardDetails(selectedCard);
      setIsModalOpen(true);
    } else {
      console.log('Item not found!');
    }
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
          {data.map((item) => (
            <div className="card1" key={item.id}>
              <div className="card__image">
                <img
                  src={"http://localhost:7000/" + item.image}
                  alt={item.title}
                  width="370px"
                />
              </div>
              <div className="card__info">
                <div className="card__info--title">
                  <h3>{item.name}</h3>
                  <div className="Food__info">
                    <p>{item.description}</p>
                    <button
                      className="btn-primary1"
                      onClick={() => openModal(item._id)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && selectedCardDetails && (
          <div className="modal">
            <div className="modal-content">
              <span className="close1" onClick={closeModal}>
                &times;
              </span>
              <div className="card2__image">
                <img
                  src={"http://localhost:7000/" + selectedCardDetails.image}
                  alt={selectedCardDetails.name}
                  width="500px"
                  height="333px"
                />
                <div className="card__info--title">
                  <div className="info">
                    <div className="product-name">
                      <h3>{selectedCardDetails.name}</h3>
                    </div>
                    <div className="details1">
                      <span>Quantity: </span>
                      <p>{selectedCardDetails.quantity}</p>
                    </div>
                    <div className="details1">
                      <span>Expiration Date: </span>
                      <p>{selectedCardDetails.expirydate.split("T")[0]}</p>
                    </div>
                  </div>
                  <div className="Food__info1">
                    <p>{selectedCardDetails.description}</p>
                    <p>Food Description: {selectedCardDetails.description}</p>
                  </div>
                </div>
              </div>
              <div className="more-info">
                <h2>{selectedCardDetails.User.username}</h2>
                <div className="details">
                  <span>City: </span>{" "}
                  <p>{selectedCardDetails.User.address[0].city}</p>
                </div>
                <div className="details">
                  <span>Building: </span>{" "}
                  <p>{selectedCardDetails.User.address[0].building}</p>
                </div>

                <div className="details">
                  <span>Street: </span> <p>Main Street</p>
                </div>
                <div className="details">
                  <span>Phone Number: </span>{" "}
                  <p>{selectedCardDetails.User.phone}</p>
                </div>
                <div className="donate-button">
                  <button className="btn-primary1">Donate</button>
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
