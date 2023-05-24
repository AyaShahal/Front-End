import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./header.css";
import logo from "../Savior-removebg-preview.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleSelector() {
    setIsSelectorOpen(!isSelectorOpen);
  }

  const closeToggle = () => {
    setIsSelectorOpen(false);
  };

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header>
      
      <div className="navbar">
    
        <nav>
        
          <div className="nav-link">
          <div className="toogle">
        <button className="menu-toggle" onClick={handleMenuClick}>
              {isOpen ? (
                <FontAwesomeIcon icon={faTimes} className="menu-icon" />
              ) : (
                <FontAwesomeIcon icon={faBars} className="menu-icon" />
              )}
            </button>
            </div>
            <img src={logo} alt="" height="100px" width="100px" />
            <div className="link">
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
                <NavLink
                  to="/userProfile"
                  className="selector-link"
                  onClick={closeToggle}
                >
                  View Profile
                </NavLink>
                <NavLink
                  to="/Logout"
                  className="selector-link"
                  onClick={closeToggle}
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="mobile-menu__items">
            <div className="mobile-menu-link">
              <span className="close1" onClick={handleMenuClick}>
                &times;
              </span>
              <NavLink
                to="/"
                className="mobile-menu__item nav-link"
                onClick={handleLinkClick}
              >
                Home
              </NavLink>
              <NavLink
                to="/About"
                className="mobile-menu__item nav-link"
                onClick={handleLinkClick}
              >
                About
              </NavLink>
              <NavLink
                to="/Food"
                className="mobile-menu__item nav-link"
                onClick={handleLinkClick}
              >
                Surplus Food
              </NavLink>
              <NavLink
                to="/Contact Us"
                className="mobile-menu__item nav-link"
                onClick={handleLinkClick}
              >
                Contact Us
              </NavLink>
              <NavLink
                to="/Login"
                className="mobile-menu__item nav-link login"
                onClick={handleLinkClick}
              >
                Login
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
