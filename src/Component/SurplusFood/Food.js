import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Food.css";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Loader from "../Loader/loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "sweetalert2/dist/sweetalert2.css";
function Surplus() {
  const Navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [selectedCardDetails, setSelectedCardDetails] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const token = Cookies.get("auth");
  let id;

  const organizationResponse = JSON.parse(
    localStorage.getItem("organizationResponse")
  );

  if (
    organizationResponse &&
    organizationResponse.user &&
    organizationResponse.user.id
  ) {
    id = organizationResponse.user.id;
  } else {
    id = null;
  }

  console.log(id);
  const closeModal = () => {
    setSelectedCardId(null);
    setSelectedCardDetails(null);
    setIsModalOpen(false);
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCategory(selectedValue);
  };
  const handleDonation = async (selectedCard) => {
    try {
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login before donating.",
        }).then(() => {
          Navigate("/Signup");
        });
        return;
      }
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      const response = await axios.post(
        "https://surplus-app-api.onrender.com/api/donation",
        {
          Food: selectedCard._id,
          donationDateTime: formattedDate,
          date: formattedDate,
          User: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      closeModal();
      Swal.fire({
        icon: "success",
        title: "Donation Successful",
        text: "Thank you for your donation!",
      });

      console.log("Donation successful:", response.data);
    } catch (error) {
      let errorMessage =
        error.response?.data?.error || "An error occurred during the donation.";

      if (error.response?.data?.error === "jwt expired") {
        errorMessage += " Please log in again.";
        Swal.fire({
          icon: "error",
          title: "Donation Error",
          text: errorMessage,
        }).then(() => {
          Navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Donation Error",
          text: errorMessage,
        });
      }

      console.log("An error occurred during donation:", error);
    }
  };
  useEffect(() => {
    setLoading(true);
  
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://surplus-app-api.onrender.com/api/Food",
          {
            params: {
              page: page,
            },
          }
        );
  
        setData(response.data.products);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (error) {
        console.log("An error occurred while fetching data:", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [page]);
  

  const getFilteredProducts = () => {
    let products = [...data];

    if (selectedCategory !== "") {
      products = products.filter(
        (product) =>
          product.Category && product.Category.name === selectedCategory
      );
    }

    return products;
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://surplus-app-api.onrender.com/api/Food?city=${searchQuery}`
      );
      setFilteredProducts(response.data.products);
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const openModal = (cardId) => {
    console.log("Selected Card ID:", cardId);

    const selectedCard = data.find((item) => item._id === cardId);
    console.log("Selected Card:", selectedCard);

    if (selectedCard) {
      setSelectedCardId(cardId);
      setSelectedCardDetails(selectedCard);
      setIsModalOpen(true);
    } else {
      console.log("Item not found!");
    }
  };

  return (
    <div>
      <div className="wrapper">
        <h2 className="head-title">Food Surplus</h2>
        <div className="Categories-links">
          <nav className="navlink">
            <NavLink to="/Food" onClick={() => setSelectedCategory("")}>
              All
            </NavLink>
            <NavLink
              to="/Fruits and Vegetables"
              onClick={() => setSelectedCategory("Fruits and Vegetables")}
            >
              Fruits and Vegetables
            </NavLink>

            <NavLink
              to="/Meat and Poultry"
              onClick={() => setSelectedCategory("Meat and Poultry")}
            >
              Meat and Poultry
            </NavLink>
            <NavLink
              to="/Packaged Foods and Snacks"
              onClick={() => setSelectedCategory("Packaged Foods and Snacks")}
            >
              Packaged Foods and Snacks
            </NavLink>
            <NavLink
              to="/Prepared Meals"
              onClick={() => setSelectedCategory("Prepared Meals")}
            >
              Prepared Meals
            </NavLink>
          </nav>
          <div className="search-bar" onClick={handleSearch}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="search-input"
            />

            <FontAwesomeIcon icon={faSearch} className="search-button " />
          </div>
          <div className="Categories-dropdown">
            <select
              id="categorySelect"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Products</option>
              <option value="Fruits and Vegetables">
                Fruits and Vegetables
              </option>
              <option value="Packaged Foods ">Packaged Foods</option>
              <option value="Meat and Poultry">Meat and Poultry</option>
              <option value="Prepared Meals">Prepared Meals</option>
            </select>
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="cards">
            <>
              {searchQuery ? (
                filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <div className="card1" key={item.id}>
                      <div className="card__image">
                        <img
                          src={
                            "https://surplus-app-api.onrender.com/" + item.image
                          }
                          alt={item.title}
                          width="370px"
                        />
                      </div>
                      <div className="card__info">
                        <div className="card__info--title">
                          <h3>{item.name}</h3>
                          <div className="Food__info">
                            <p>{item.description}</p>
                            {item.donations.length > 0 ? (
                              <span>Donated</span>
                            ) : (
                              <button
                                className="btn-primary1"
                                onClick={() => openModal(item._id)}
                              >
                                View
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products found.</p>
                )
              ) : getFilteredProducts().length > 0 ? (
                getFilteredProducts().map((item) => (
                  <div className="card1" key={item.id}>
                    <div className="card__image">
                      <img
                        src={
                          "https://surplus-app-api.onrender.com/" + item.image
                        }
                        alt={item.title}
                        width="370px"
                      />
                    </div>
                    <div className="card__info">
                      <div className="card__info--title">
                        <h3>{item.name}</h3>
                        <div className="Food__info">
                          <p>{item.description}</p>
                          {item.donations.length > 0 ? (
                            <span>Donated</span>
                          ) : (
                            <button
                              className="btn-primary1"
                              onClick={() => openModal(item._id)}
                            >
                              View
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products available.</p>
              )}
            </>
          </div>
        )}
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {page} of {totalPages}
          </span>
          <button
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>

        {isModalOpen && selectedCardDetails && (
          <div className="modal">
            <div className="modal-content">
              <span className="close1" onClick={closeModal}>
                &times;
              </span>
              <div className="card2__image">
                <img
                  src={
                    "https://surplus-app-api.onrender.com/" +
                    selectedCardDetails.image
                  }
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
                  <button
                    className="btn-primary1"
                    onClick={() => handleDonation(selectedCardDetails)}
                  >
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
