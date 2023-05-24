import React, { createContext, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserProvider";
function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { setUser, registerUser } = useContext(UserContext);
  const Navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    city: "",
    street: "",
    building: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked!");

    if (validate()) {
      const role = userType === "Business" ? "Business" : "Organization";
      const updatedFormData = { ...formData, role };

      try {
        const response = await registerUser(updatedFormData);
        if (response) {
          Navigate("/Login");
        } else {
          console.log("Registration failed");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const [userType, setUserType] = useState("");

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    setFormData({ ...formData, role: event.target.value });
  };

  const validate = () => {
    let errors = {};

    if (!formData.username.trim()) {
      errors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
    } else if (formData.password.trim().length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      errors.phone = "Phone is invalid";
    }

    if (!formData.city.trim()) {
      errors.city = "city is required";
    }

    if (!formData.building.trim()) {
      errors.building = "building is required";
    }

    if (!formData.city.trim()) {
      errors.address = "street is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <div className="signupForm">
      <div className="section1">
        <h1>Signup now </h1>
        <p>
          Join the movement to fight food waste and hunger. Sign up now and make
          a difference.
        </p>
      </div>
      <div className="section2">
        <form className="register-inputs" onSubmit={handleSubmit}>
          <div className="input-section">
            <div className="input-radio">
              <span> Are you a business or organization?</span>
            </div>
            <div className="input-radio">
              <label htmlFor="business" className="radio-label">
                Business
              </label>
              <input
                type="radio"
                id="business"
                name="role"
                value="Business"
                checked={userType === "Business"}
                onChange={handleUserTypeChange}
              />
            </div>
            <div className="input-radio">
              <label htmlFor="organization" className="radio-label">
                Organization
              </label>
              <input
                type="radio"
                id="organization"
                name="role"
                value="Organization"
                checked={userType === "Organization"}
                onChange={handleUserTypeChange}
              />
            </div>
          </div>
          <div className="input-section">
            {errors.username && <p className="error">{errors.username}</p>}
            <div className="input-group">
              <input
                className="input"
                type="text"
                name="username"
                required={true}
                value={formData.username}
                onChange={handleChange}
              />
              <label htmlFor="username" className="input-label">
                Username
              </label>
            </div>
            <div className="input-group">
              <input
                className="input"
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
              />
              <label htmlFor="phone" className="input-label">
                Phone
              </label>
              {errors.phone && <p className="error">{errors.phone}</p>}
            </div>
          </div>
          <div className="input-section">
            <div className="input-group">
              <input
                className="input"
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
              />
              <label htmlFor="City" className="input-label">
                City
              </label>
              {errors.City && <p className="error">{errors.city}</p>}
            </div>
            <div className="input-group">
              <input
                className="input"
                type="text"
                name="building"
                required
                value={formData.builiding}
                onChange={handleChange}
              />
              <label htmlFor="Building" className="input-label">
                Building
              </label>
              {errors.building && <p className="error">{errors.buliding}</p>}
            </div>
          </div>
          <div className="input-section">
            <div className="input-group">
              <input
                className="input"
                type="email"
                name="email"
                required={true}
                value={formData.email}
                onChange={handleChange}
                autoComplete="username"
              />
              <label htmlFor="email" className="input-label">
                Email
              </label>
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="input-group">
              <input
                className="input"
                type={showPassword ? "text" : "password"}
                name="password"
                required={true}
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <FontAwesomeIcon
                icon={faEye}
                className="showing-password"
                onClick={handleTogglePassword}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
          </div>{" "}
          <div className="register-buttons">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
