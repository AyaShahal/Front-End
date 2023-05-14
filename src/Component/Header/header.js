import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import logo from '../savior.svg'
function header() {
  return (
    <header>
      <div className="navbar">
        <nav>
          <div className="nav-link">
          <img
            src={logo}
            alt=""
            height="100px"
            width="100px"
          />
            <NavLink to="/ " className="links">
              Home{" "}
            </NavLink>
            <NavLink to="/About" className="links">
              About{" "}
            </NavLink>
            <NavLink to="/Food" className="links">
              Surplus Food{" "}
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
        </div>
      </div>
    </header>
  );
}

export default header;
