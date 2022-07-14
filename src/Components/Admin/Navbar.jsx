import React, { useState } from "react";
import "./Navbar.css";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <h2>Admin</h2>
        </div>

        {/* 2nd menu part  */}
        <div
          className={"menu-link mobile-menu-link"}
        >
          <ul>
            <li><NavLink to='/admin'> Orders </NavLink></li>
            <li><NavLink to='/admin'> Manage </NavLink></li>
            <li><NavLink to='/admin'> Executives </NavLink></li>
            <li><NavLink to='/admin'> Tailors </NavLink></li>
          </ul>
        </div>

        {/* 3rd social media links */}
        <div className="logout">LogOut</div>
      </nav>
    </>
  );
};

export default Navbar;
