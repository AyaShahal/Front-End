import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import "./user-profile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import Loader from "../Loader/loader";
import { Navigate } from "react-router-dom";
function User() {
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [edit, setEdit] = useState(null);
  const [isFormModified, setIsFormModified] = useState(false);
  const [posts, setPosts] = useState([]);
  const [previousImage, setPreviousImage] = useState("");
  const [postToEdit, setPostToEdit] = useState(null);

  const [postFormValues, setPostFormValues] = useState({
    name: "",
    quantity: "",
    expirydate: "",
    description: "",
    image: "",
    Category: "",
  });
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
  const userResponse = JSON.parse(localStorage.getItem("userResponse"));
  let id;

  if (!userResponse || !userResponse.user || !userResponse.user.id) {
    id = null;
  } else {
    id = userResponse.user.id;
    console.log(id);
  }

  if (id === null) {
    Navigate("/404");
  }

  useEffect(() => {
    console.log("userResponse:", userResponse);
  }, []);

  const open = () => {
    setIsOpen(true);
  };
  const handleCancel = () => {
    setIsOpen(false);
    setFormValues(initialValues);
  };

  const handleAddPost = () => {
    setShowForm(true);
  };

  const handlecancelPost = () => {
    setShowForm(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const initialValues = {
    email: userResponse.user.email,
    username: userResponse.user.username,
    password: userResponse.user.password,
    city: userResponse.user.address[0].city,
    building: userResponse.user.address[0].building,
    street: userResponse.user.address[0].street,
    phone: userResponse.user.phone,
  };

  const [formValues, setFormValues] = useState(initialValues);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://surplus-app-api.onrender.com/api/category"
      );
      const categories = response.data;
      setCategories(categories);
      console.log(categories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setIsFormModified(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isFormModified) {
      setIsOpen(false);
      return;
    }

    try {
      const token = Cookies.get("jwt");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      setLoading(true);
      const response = await axios.put(
        `https://surplus-app-api.onrender.com/api/user/edit/${id}`,
        {
          email: formValues.email,
          username: formValues.username,
          password: formValues.password,
          address: [
            {
              city: formValues.city,
              building: formValues.building,
              street: formValues.street,
            },
          ],
          phone: formValues.phone,
        },
        { headers }
      );

      console.log(response.data);

      setEdit(response.data);
      setIsOpen(false);
      setLoading(false);
      const updatedUserResponse = { ...userResponse };

      updatedUserResponse.user.email = formValues.email;
      updatedUserResponse.user.username = formValues.username;
      updatedUserResponse.user.password = formValues.password;
      updatedUserResponse.user.address[0].city = formValues.city;
      updatedUserResponse.user.address[0].building = formValues.building;
      updatedUserResponse.user.address[0].street = formValues.street;
      updatedUserResponse.user.phone = formValues.phone;
      localStorage.setItem("userResponse", JSON.stringify(updatedUserResponse));

      Swal.fire({
        title: "Are you sure?",
        text: "This action will edit your profile.",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: "success",
            title: "Edit Successful",
            text: "Your profile has been updated.",
          });
        } else {
          setIsOpen(false);
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating your profile.",
      });
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://surplus-app-api.onrender.com/api/Food/user/${id}`
      );

      const products = response.data.foods;
      setPosts(products);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while fetching user posts.",
      });
    }
  };

  const handlePostInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "Category") {
      const selectedCategoryId = value;
      const selectedCategory = categories.response.find(
        (category) => category._id === selectedCategoryId
      );

      console.log("Selected Category:", selectedCategory);

      setPostFormValues((prevValues) => ({
        ...prevValues,
        Category: selectedCategory ? selectedCategory._id : "",
      }));
    } else {
      setPostFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = Cookies.get("jwt");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      formData.append("name", postFormValues.name);
      formData.append("quantity", postFormValues.quantity);
      formData.append("expirydate", postFormValues.expirydate);
      formData.append("description", postFormValues.description);
      formData.append("image", e.target.image.files[0]);
      formData.append("Category", postFormValues.Category);
      formData.append("User", id);

      const response = await axios.post(
        "https://surplus-app-api.onrender.com/api/Food",
        formData,
        { headers }
      );

      setShowForm(false);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Post Successful",
        text: "Your form data has been posted.",
      });

      const newPost = response.data;
      handleNewPost(newPost);

      setPostFormValues({
        name: "",
        quantity: "",
        expirydate: "",
        description: "",
        Category: "",
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while posting the form data.",
      });
    }
  };

  const handleNewPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const token = Cookies.get("jwt");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      const formData = new FormData();
      formData.append("name", postToEdit.name);
      formData.append("quantity", postToEdit.quantity);
      formData.append("expirydate", postToEdit.expirydate);
      formData.append("description", postToEdit.description);

      if (e.target.elements.image.files.length > 0) {
        const file = e.target.elements.image.files[0];
        formData.append("image", file);
      } else {
        formData.append("image", previousImage);
      }

      const response = await axios.patch(
        `https://surplus-app-api.onrender.com/api/Food/${postToEdit._id}`,
        formData,
        { headers }
      );

      console.log("Post updated:", response.data);

      setIsModalOpen(false);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Post Updated",
        text: "Your post has been updated successfully.",
      });

      const updatedPost = response.data;

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post._id === updatedPost._id) {
            return updatedPost;
          } else {
            return post;
          }
        })
      );
    } catch (error) {
      console.error("Error updating post:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the post.",
      });
    }
  };

  const handlepostChange = (e) => {
    const { name, value } = e.target;
    console.log("Input change:", name, value);
    setPostToEdit((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPostToEdit((prevPost) => ({ ...prevPost, image: file }));
  };

  const deletePost = async (postId) => {
    try {
      setLoading(true);
      const confirmResult = await Swal.fire({
        title: "Are you sure?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
      });

      if (confirmResult.isConfirmed) {
        const token = Cookies.get("jwt");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        await axios.delete(
          `https://surplus-app-api.onrender.com/api/Food/${postId}`,
          {
            headers,
          }
        );

        setPosts((prevPosts) =>
          prevPosts.filter((post) => post._id !== postId)
        );

        Swal.fire({
          icon: "success",
          title: "Post Deleted",
          text: "The post has been deleted successfully.",
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the post.",
      });
    }
  };
  return (
    <div className="profile">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-img">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_5vRSzfNq8yKeZ0xk4EUDyeBU_4Q6lMT_3Q&usqp=CAU"
              width="200"
              alt="Profile Image"
            />
          </div>
        </div>
        <div className="main-bd">
          <div className="left-side">
            <div className="profile-side">
              <div className="profile-nav-info">
                <h3 className="user-name">{userResponse.user.username}</h3>
                <div className="address">
                  <p id="state" className="state">
                    lebanon,
                  </p>
                  <span id="country" className="country">
                    {userResponse.user.address[0].city}
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
            {loading ? (
              <Loader />
            ) : (
              <div className="profile-posts">
                {Array.isArray(posts) && posts.length > 0 ? (
                  posts.map((post, index) => (
                    <div className="post" key={index}>
                      <div className="post__image">
                        <img
                          src={
                            "https://surplus-app-api.onrender.com/" + post.image
                          }
                          alt={post.name}
                        />
                      </div>
                      <div className="post__info">
                        <div className="post__info--title">
                          <h3>{post.name}</h3>
                          <div className="Food__info">
                            <p>{post.description}</p>
                          </div>
                          <div className="post__actions">
                            <button
                              className="edit-button"
                              onClick={() => {
                                setIsModalOpen(true);
                                setPostToEdit(post);
                              }}
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </button>
                            <button
                              className="delete-button"
                              onClick={() => deletePost(post._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No posts available.</p>
                )}

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
                        key={postToEdit._id}
                        onSubmit={handleUpdatePost}
                      >
                        <input
                          type="text"
                          name="name"
                          value={postToEdit.name}
                          onChange={(e) => handlepostChange(e, postToEdit)}
                        />

                        <input
                          type="number"
                          name="quantity"
                          required={true}
                          value={postToEdit.quantity}
                          onChange={handlepostChange}
                        />

                        <input
                          type="text"
                          name="description"
                          required={true}
                          value={postToEdit.description}
                          onChange={handlepostChange}
                        />

                        <input
                          type="date"
                          name="expirydate"
                          required={true}
                          value={postToEdit.expirydate.slice(0, 10)}
                          onChange={handlepostChange}
                        />
                        <input
                          type="file"
                          name="image"
                          // required={true}
                          onChange={(e) => handleFileChange(e, postToEdit._id)}
                        />

                        <div className="group">
                          <select
                            className="select"
                            name="Category"
                            required={true}
                            value={postToEdit.Category}
                            onChange={handlepostChange}
                          >
                            <option value={postToEdit.Category} hidden>
                              {postToEdit.Category
                                ? postToEdit.Category.name
                                : "Select Category"}
                            </option>

                            {categories &&
                              categories.success &&
                              categories.response &&
                              categories.response.map((category) => (
                                <option key={category._id} value={category._id}>
                                  {category.name}
                                </option>
                              ))}
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
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
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
                        className="register-inputs add-post"
                        onSubmit={handlePostSubmit}
                      >
                        <div className="input-group">
                          <input
                            className="input"
                            type="text"
                            name="name"
                            required={true}
                            value={formValues.name}
                            onChange={handlePostInputChange}
                          />
                          <label htmlFor="Foodname" className="input-label">
                            Food name
                          </label>
                        </div>
                        <div
                          className="
input-group"
                        >
                          <input
                            className="input"
                            type="number"
                            name="quantity"
                            required={true}
                            value={formValues.quantity}
                            onChange={handlePostInputChange}
                          />
                          <label htmlFor="Foodname" className="input-label">
                            Quantity
                          </label>
                        </div>
                        <div className="input-group">
                          <input
                            className="input"
                            type="Date"
                            name="expirydate"
                            required={true}
                            value={formValues.expiredate}
                            onChange={handlePostInputChange}
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
                            value={formValues.description}
                            onChange={handlePostInputChange}
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
                            value={formValues.image}
                            onChange={handlePostInputChange}
                          />
                          {/* <label htmlFor="Foodname" className="input-label">
            image
            </label> */}
                        </div>
                        <div className="input-group">
                          <select
                            className="select"
                            name="Category"
                            required={true}
                            onChange={handlePostInputChange}
                          >
                            <option value="" style={{ display: "none" }}>
                              Select a category
                            </option>
                            {categories &&
                              categories.success &&
                              categories.response &&
                              categories.response.map((category) => (
                                <option key={category._id} value={category._id}>
                                  {category.name}
                                </option>
                              ))}
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
          </div>
        </div>
      </div>
      <div className="modal2" style={{ display: isOpen ? "block" : "none" }}>
        <div className="modal2-content">
          <span className="close1" onClick={handleCancel}>
            &times;
          </span>
          <div className="title">
            <h1>Edit Profile</h1>
          </div>
          <form className="profile-form" onSubmit={handleFormSubmit}>
            <div className="group">
              <label htmlFor="email">username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formValues.username}
                onChange={handleInputChange}
              />
            </div>
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
                <button type="submit" className="cancel" onClick={handleCancel}>
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
