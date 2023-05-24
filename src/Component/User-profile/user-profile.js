import React, { useState } from "react";
import "./user-profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function User() {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const open = () => {
    setIsOpen(true);
  };

  const handleAddPost = () => {
    setShowForm(true);
  };

  const handlecancelPost = () => {
    setShowForm(false);
  };
  const close = () => {
    setIsOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const initialValues = {
    email: "example@example.com",
    password: "",
    city: "City Name",
    building: "Building Name",
    street: "Street Name",
    phone: "1234567890",
  };

  const [formValues, setFormValues] = useState(initialValues);

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formValues);
    close();
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-img">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAI4AAACOCAMAAADQI8A6AAAAPFBMVEX///+ZmZmWlpa0tLSSkpKdnZ37+/v19fXAwMDw8PDi4uLOzs6np6ff39+8vLyPj4/Y2Njo6Oiurq7GxsZmKkxsAAAEhElEQVR4nO1b27ajIAytCHjDS/X//3WU09NahYQE7OmaxX44D7MKsw25kYTbLSMjIyMjIyMjIyPjGuhqRdM061/9t0yqtqtLo4S0EMqUdddXf0Kl6QclNhQrVPED+w9m6JvPctFTqVZxFG6IUZXT5w6uHUYvlV9Gchzaj5Dp5wLh8mBUzP3lIurNGMLlISIzXUrmboIE8yIkzP0yMroWNDaWUH3RifV0Mhuk6K9gU7PIWAnVyck0RnLZrAIyif1iq9iysfJRSZ3QFEVm4yMTmnwXy2aF7FKxmcI9H4AxkXy6CCV+45NEPtF680QKB9QGsHnmPdjvou2rUej/sWaBc1nOa1YokB8LFet/sJgpxmFqbFTSzTSM2K9NHJsaVmNRLG+pcbXAdJSMihc9/LWO9AFLQWLUWcNby8G1aED8Aj/fgIO4cLJZ+cCr2Md1B/eVpWeZLmE+3PwQVgPllboG7Z1rXbA7FkAIQlbytBkUjpihpTPIhyWeHozjEvxEZC0nts/QjoDmbEC0B5SsG3Do9Bn5LxBjp2sPsiGSu8D5I/YxZ+gRljeSKiBpyUh1zUhCivky2IPSlRn2rIVAEpcGWe7z6L7tsEQqTjoFMQ/rkbAcSwd2WyfAdhVrWWTbwu7AWJqA1ReEorCp0HtBjFe2fCj1Xvw2M4KOp0XvraQ7Dn4pj4nodj3lShpQWoLiDpLx2+WUHBVxgnY/IGsJKAZRHKE26Ha+e8SGQaKavH5NeNiq8O22HRf36iWoxqDCTQu3cwvp5LOE1V8Ill4FVnTEfAo9VRm4VobTaUILTKI42GsX1q/Y6IQH0WA6WzlluT++s7ovWCPncjq27zAPdT2URlCWEehUAZb6ziis+sWmQ+AhdyDQIqhykKELMUpTLt0blvXIsBLYYzmBToBXFaZ2N/N0X5sAGRHcoMYrgmYCtqt6g1cJCXcbJITKGc1W2hmpKlLuEmCCIYol4Ms0XLUkJRhQ+hXc3gSrlqT0C8ifxBysgxWQFJKqBn5LlzNBBYEqISl1v/ksnVrY850X7WLju/aRmwqNJ08lXvs81TRJLsLe3fZOvBS7Swa+dBSCO1WlStmphPDV0w3tOi5qQeU2OYTM6/am2emsPKQw84IrAJKLcQ7bIjnSHc6tXfJZrTHwLB3mkNnZpzJ6ovrg4RW/cXg8LU6Z+1SP457V+bSITucHRxVk96GOhUKmmA9tIH7T+eBTue3QN/EwzXyDPmzE3OZNyAzjfOLNxfMPfd9FT0UnYvJq37imd1le2LtUETEot0tSE9GJm1J59ejT0PFX8MLwNIokdGJHQnbZpSnZeH5T9MDMqwAv+HgeeIJxvYTDVkmG0bokg3HpRvXSDOqlG2RMMcbIz0/OYM4G79kknev+rhHYbxsQvn3Z+PSNrUDimuFy3uh9cdno/c3W10iELn2YsKGnqLQ0F53TDtMcJiEh5uvJbOiHERPR9uTnM2Q22AdRPiEJIT/6IMri+Vxsn5ZbqI8/F3vA9Ziu/ZvHdE/on5eGX/DUMCMjIyMjIyMjI+M/xj9b3C9X7TS7dQAAAABJRU5ErkJggg=="
              width="200"
              alt="Profile Image"
            />
          </div>
        </div>
        <div className="main-bd">
          <div className="left-side">
            <div className="profile-side">
              <div className="profile-nav-info">
                <h3 className="user-name">Business name</h3>
                <div className="address">
                  <p id="state" className="state">
                    lebanon,
                  </p>
                  <span id="country" className="country">
                    triploi.
                  </span>
                </div>
              </div>
              <div className="profile-btn">
                <button className="button" onClick={open}>
                  Edit profile
                </button>
              </div>
            </div>
          </div>
          <div className="profile-info">
            <div className="nav">
              <ul>
                <button className="user-post active">Posts</button>
                <button className="user-setting" onClick={handleAddPost}>
                  Add post
                </button>
              </ul>
            </div>

            <div className="profile-posts">
              <div className="post">
                <div className="post__image">
                  <img
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="Salad"
                  />
                </div>
                <div className="post__info">
                  <div className="post__info--title">
                    <h3>Salad</h3>
                    <div className="Food__info">
                      <p>Fresh & sweet</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="post">
                <div className="post__image">
                  <img
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="Salad"
                  />
                </div>
                <div className="post__info">
                  <div className="post__info--title">
                    <h3>Salad</h3>
                    <div className="Food__info">
                      <p>Fresh & sweet</p>
                    </div>
                    <div className="post__actions">
                      <button className="edit-button" onClick={openModal}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="delete-button">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
                {isModalOpen && (
                  <div className="modal2">
                    <div className="modal2-content">
                      <span className="close1" onClick={closeModal}>
                        &times;
                      </span>
                      <div className="title">
                        <h1>Edit post</h1>
                      </div>
                      <form
                        className="profile-form"
                        onSubmit={handleFormSubmit}
                      >
                        <div className="group">
                          <label htmlFor="Foodname" className="label">
                            Food name
                          </label>
                          <input
                            type="text"
                            name="Food name"
                            required={true}
                            // value={formValues.postTitle}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="group">
                          <label htmlFor="Foodname" className="label">
                            Quantity
                          </label>
                          <input
                            type="number"
                            name="quantity"
                            required={true}
                            // value={formValues.postTitle}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="group">
                          <label htmlFor="Foodname" className="label">
                            expire-date
                          </label>
                          <input
                            type="Date"
                            name="expire-date"
                            required={true}
                            value={formValues.postTitle}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="group">
                          <label htmlFor="Foodname" className="label">
                            description
                          </label>
                          <input
                            className="input"
                            type="text"
                            name="description"
                            required={true}
                            // value={formValues.postTitle}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="group">
                          <label htmlFor="Foodname" className="label">
                            image
                          </label>
                          <input
                            type="file"
                            name="image"
                            required={true}
                            // value={formValues.postTitle}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="group">
                          <select
                            className="select"
                            name="category"
                            required={true}
                            onChange={handleInputChange}
                          >
                            <option value="" style={{ display: "none" }}>
                              Select a category{" "}
                            </option>
                            <option value="category1">
                              Fruits and Vegetables
                            </option>
                            <option value="category2">Prepared Meals</option>
                            <option value="category3">Meat and Poultry</option>
                            <option value="category3">
                              Packaged Foods and Snacks
                            </option>
                          </select>
                        </div>
                        <div className="post-btn-group">
                          <div className="cancel-button">
                            <button
                              type="button"
                              className="cancel"
                              onClick={closeModal}
                            >
                              Cancel
                            </button>
                          </div>
                          <button type="submit" className="cancel">
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              <div className="post">
                <div className="post__image">
                  <img
                    src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                    alt="Salad"
                  />
                </div>
                <div className="post__info">
                  <div className="post__info--title">
                    <h3>Salad</h3>
                    <div className="post__info">
                      <p>Fresh & sweet</p>
                    </div>
                  </div>
                </div>
              </div>
              {showForm && (
                <div className="post-form-popup">
                  <div className="post-container">
                    <span className="close" onClick={handlecancelPost}>
                      &times;
                    </span>
                    <div className="title">
                      <h1>Add post</h1>
                    </div>
                    <form
                      className="register-inputs"
                      onSubmit={handleFormSubmit}
                    >
                      <div className="input-group">
                        <input
                          className="input"
                          type="text"
                          name="Food name"
                          required={true}
                          // value={formValues.postTitle}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="Foodname" className="input-label">
                          Food name
                        </label>
                      </div>
                      <div className="input-group">
                        <input
                          className="input"
                          type="number"
                          name="quantity"
                          required={true}
                          // value={formValues.postTitle}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="Foodname" className="input-label">
                          Quantity
                        </label>
                      </div>
                      <div className="input-group">
                        <input
                          className="input"
                          type="Date"
                          name="expire-date"
                          required={true}
                          value={formValues.postTitle}
                          onChange={handleInputChange}
                        />
                        {/* <label htmlFor="Foodname" className="input-label">
            expire-date
            </label> */}
                      </div>
                      <div className="input-group">
                        <input
                          className="input"
                          type="text"
                          name="description"
                          required={true}
                          // value={formValues.postTitle}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="Foodname" className="input-label">
                          description
                        </label>
                      </div>
                      <div className="input-group">
                        <input
                          className="input"
                          type="file"
                          name="image"
                          required={true}
                          // value={formValues.postTitle}
                          onChange={handleInputChange}
                        />
                        {/* <label htmlFor="Foodname" className="input-label">
            image
            </label> */}
                      </div>
                      <div className="input-group">
                        <select
                          className="select"
                          name="category"
                          required={true}
                          onChange={handleInputChange}
                        >
                          <option value="" style={{ display: "none" }}>
                            Select a category
                          </option>
                          <option value="category1">
                            Fruits and Vegetables
                          </option>
                          <option value="category2">Prepared Meals</option>
                          <option value="category3">Meat and Poultry</option>
                          <option value="category3">
                            Packaged Foods and Snacks
                          </option>
                        </select>
                      </div>
                      <div className="post-btn-group">
                        <div className="cancel-button">
                          <button
                            type="submit"
                            className="cancel"
                            onClick={handlecancelPost}
                          >
                            Cancel
                          </button>
                        </div>
                        <button type="submit" className="cancel">
                          Add
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="modal2" style={{ display: isOpen ? "block" : "none" }}>
        <div className="modal2-content">
          <span className="close1" onClick={close}>
            &times;
          </span>
          <div className="title">
            <h1>Edit Profile</h1>
          </div>
          <form className="profile-form" onSubmit={handleFormSubmit}>
            <div className="group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formValues.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="group">
              <label htmlFor="building">Building</label>
              <input
                type="text"
                id="building"
                name="building"
                value={formValues.building}
                onChange={handleInputChange}
              />
            </div>
            <div className="group">
              <label htmlFor="street">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formValues.street}
                onChange={handleInputChange}
              />
            </div>
            <div className="group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="post-btn-group">
              <div className="cancel-button">
                <button type="submit" className="cancel">
                  Cancel
                </button>
              </div>
              <button type="submit" className="cancel">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;
