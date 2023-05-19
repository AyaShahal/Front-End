import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import logo from "../Savior-removebg-preview.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
function Header() {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  function toggleSelector() {
    setIsSelectorOpen(!isSelectorOpen);
  }
  const closeToggle = () => {
    setIsSelectorOpen(false);
  };
  return (
    <header>
      <div className="navbar">
        <nav>
          <div className="nav-link">
            <img src={logo} alt="" height="100px" width="100px" />
            <NavLink to="/" className="links">
              Home
            </NavLink>
            <NavLink to="/About" className="links">
              About
            </NavLink>
            <NavLink to="/Food" className="links">
              Surplus Food
            </NavLink>
            <NavLink to="/Contact Us" className="links">
              Contact Us
            </NavLink>
          </div>
        </nav>
        <div className="auth-buttons">
          <NavLink to="/Login" className="links">
            Login
          </NavLink>
          <NavLink to="/Signup" className="button">
            Sign Up
          </NavLink>
          <div className="user-profile">
      <div className="user">
        <FontAwesomeIcon icon={faUser} />
        <div className="profile-selector" onClick={toggleSelector}>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
      {isSelectorOpen && (
        <div className="selector-content">
          <NavLink to="/userProfile" className="selector-link" onClick={closeToggle}>
            View Profile
          </NavLink>
          <NavLink to="/Logout" className="selector-link" onClick={closeToggle}>
            Logout
          </NavLink>
        </div>
      )}
    </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
