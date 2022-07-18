import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import "./Sidebar.css";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation()
  const data = [
    {
      title: "Orders",
      path: "/admin/orders",
      cName: "nav-text",
    },
    {
      title: "Manage",
      path: location.pathname.includes("/admin/manage") ? location.pathname : '/admin/manage',
      cName: "nav-text",
    },
    {
      title: "Executives",
      path: "/admin/executives",
      cName: "nav-text",
    },
    {
      title: "Tailors",
      path: "/admin/tailors",
      cName: "nav-text",
    },
  ];

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <nav className="nav-menu active">
        <ul className="nav-menu-items">
          <li className="nav-text" style={{ color: "white", fontSize: 30, height: 100 }}>
            <span>MasterJi</span>
          </li>
          {data.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <NavLink activeclassname="active" to={item.path} >
                  <span>{item.title}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
