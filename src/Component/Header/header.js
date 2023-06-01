import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { MdOutlineLogout} from "react-icons/md";
import "./header.css";
import logo from "../Savior-removebg-preview.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";

function Header() {
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [organizationName, setOrganizationName]=useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Open, setOpen] = useState(false);
 
  useEffect(() => {
    const token = Cookies.get("jwt");
    const auth = Cookies.get("auth");
  
    if (token) {
      const storedUser = localStorage.getItem("userResponse");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const fullName = `${parsedUser.user.username}`;
        setUserName(fullName);
        setIsLoggedIn(true);
      }
    } else if (auth) {
      const storedOrganization = localStorage.getItem("organizationResponse");
      if (storedOrganization) {
        const parsedOrganization = JSON.parse(storedOrganization);
        const organizationName = `${parsedOrganization.user.username}`;
        setOrganizationName(organizationName);
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  
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
  const handleLogout = () => {
    Cookies.remove("jwt");
    setIsLoggedIn(false);
    localStorage.removeItem("userResponse");
  };
  
  
  const handleOrganizationLogout = () => {
    Cookies.remove("auth");
    setIsLoggedIn(false);
    localStorage.clear("organizationResponse");
  };
  


  const handleClick = () => {
    setOpen(!Open);
  };
const close=()=>{
  setOpen(false);
}

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
        {isLoggedIn ? (
  <>
    {organizationName !== "Organization" ? (
      <div className="user-profile" onClick={toggleSelector}>
        <div className="user">
          <div className="user-name">{userName}</div>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        {isSelectorOpen && (
          <div className="selector-content">
            <div className="settings">
              <NavLink
                to="/userProfile"
                className="selector-link"
                onClick={closeToggle}
              >
                <FontAwesomeIcon icon={faUser} />
                View Profile
              </NavLink>
            </div>
            <div className="settings">
              <NavLink to="/" className="selector-link" onClick={handleLogout}>
                <MdOutlineLogout />
                Logout
              </NavLink>
            </div>
          </div>
        )}
      </div>
    ) : (
      <div className="user" onClick={toggleSelector}>
        <div className="user-name">{organizationName}</div>
        <FontAwesomeIcon icon={faCaretDown} />
        {isSelectorOpen && (
          <div className="selector-content">
            <div className="settings">
              <NavLink to="/" className="selector-link" onClick={handleOrganizationLogout}>
                <MdOutlineLogout />
                Logout
              </NavLink>
            </div>
          </div>
        )}
      </div>
    )}
  </>
) : (
    <>
    <div className="dropdown">
      <div className="dropdown-toggle" onClick={handleClick}>
        Login
      </div>
      {Open && (
        <div className="dropdown-menu">
          <NavLink to="/login" className="links"   onClick={close}>
            User 
          </NavLink>
          <NavLink to="/adminLogin" className="links" onClick={close}>
            Admin 
          </NavLink>
        </div>
      )}
    </div>
   
      <NavLink to="/Signup" className="button">
        Sign Up
      </NavLink>
    </>
  )}
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
                to="/signup"
                className="mobile-menu__item nav-link login"
                onClick={handleLinkClick}
              >
                Signup
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
