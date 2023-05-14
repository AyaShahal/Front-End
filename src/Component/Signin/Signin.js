import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./Signin.css";

function Signin() {
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      phone: "",
      Address: "",
    });
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
    const [userType, setUserType] = useState('');
  
    const handleUserTypeChange = (event) => {
      setUserType(event.target.value);
    };
    const validate = () => {
      let errors = {};
      
            
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
            
            
          
  
      setErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    return (
        <div className="signupForm">
        <div className="section1">
          <h1>Login </h1>
          <p>
            Join the movement to fight food waste and hunger. Login now and make
            a difference.
          </p>
        </div>
        <div className="section3">
          <form className="register-inputs">
        
          <div className="login-section">
          <div className="input-group">
            <input
              className="input"
              type="email"
              name="email"
              required={true}
              // value={formData.email}
              // onChange={handleChange}
              // autoComplete="username"
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
              // value={formData.password}
              // onChange={handleChange}
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
          <div className="forgot-password">
          <NavLink to="/">Forgot password?</NavLink>
          </div>
        </div>
            
        
  
  
          </form>
  
          <div className="register-buttons">
            <button type="submit">Login</button>
          </div>
        </div>
      </div>
    );
}

export default Signin;