import React, { useState } from "react";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { FaProductHunt } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { AiOutlineMessage } from "react-icons/ai";
import { MdClose, MdMenu } from "react-icons/md";
import logo from "../Savior-removebg-preview.png";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const activeStyle = {
    backgroundColor: "var(--primary-color)",
    color: "#fff",
    borderRadius: "5px",
    transition: "all 0.3s ease-in",
    width: "200px",
    boxShadow: "0px 1px 5px var(--primary-color)",
    fontWeight: "bold",
  };
  const closedActiveStyle = {
    width: "50px",
    borderRadius: "5px",
    backgroundColor: "var(--primary-color)",
    boxShadow: "0px 1px 5px var(--primary-color)",
    fontWeight: "bold",
    color: "#fff",
    fontWeight: "bold",
  };
  const link = [
    {
      path: "/Dashboard/Admin",
      name: "Admins",
      icon: <RiAdminFill />,
    },
    {
      path: "/Dashboard/categories",
      name: "Categories",
      icon: <BiCategory />,
    },
    {
      path: "/Dashboard/Product",
      name: "Products",
      icon: <FaProductHunt />,
    },
    {
      path: "/Dashboard/User",
      name: "Users",
      icon: <FaUsers />,
    },
    {
      path: "/Dashboard/Messages",
      name: "Messages",
      icon: <AiOutlineMessage />,
    },
  ];

  const handleLogout = () => {
    Cookies.remove("jwt");
    localStorage.clear("adminResponse");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "" : "closed"}`}>
      <div className="sidebar-main">
        <div className="logo-container">
          <div className="sidebar-toggle" onClick={toggleSidebar}>
            <MdMenu size={24} />
          </div>
          <div
            className="logo"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isSidebarOpen && (
              <img src={logo} alt="" height="100px" width="100px" />
            )}
          </div>
        </div>

        {link.map((e, index) => {
          return (
            <ul key={index}>
              <li>
                <NavLink
                  style={({ isActive }) =>
                    isActive
                      ? isSidebarOpen
                        ? activeStyle
                        : closedActiveStyle
                      : undefined
                  }
                  to={e.path}
                  className="link-name"
                >
                  {e.icon}
                  {isSidebarOpen ? e.name : ""}
                </NavLink>
              </li>
            </ul>
          );
        })}
      </div>

      <ul className="sidebar-end">
        <li>
          <Link to="/" onClick={handleLogout}>
            <MdOutlineLogout />
            {isSidebarOpen && <span className="link-text">Logout</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
