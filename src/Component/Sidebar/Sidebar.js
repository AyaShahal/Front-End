import React from "react";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import { FaUsers } from 'react-icons/fa';
import { FaProductHunt } from "react-icons/fa";
import { MdRateReview, MdOutlineLogout, MdDescription } from "react-icons/md";
import logo from "../Savior-removebg-preview.png";

const activeStyle = {
  backgroundColor: "var(--primary-color)",
  color: "#fff",
  borderRadius: "5px",
  transition: "all 0.3s ease-in",
  width: "200px",
  boxShadow: "0px 1px 5px var(--primary-color)",
  fontWeight: "bold",
};

function Sidebar() {
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
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-main">
        <img src={logo} alt="" height="100px" width="100px" />
        {link.map((e, index) => {
          return (
            <ul key={index}>
              <li>
                <NavLink
                  style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                  }
                  to={e.path}
                  className="link-name"
                >
                  {e.icon}
                  {e.name}
                </NavLink>
              </li>
            </ul>
          );
        })}
      </div>

      <ul className="sidebar-end">
        <li>
          <Link to="#">
            <MdOutlineLogout />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
