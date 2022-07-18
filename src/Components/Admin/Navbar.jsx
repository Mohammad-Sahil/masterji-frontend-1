import React, { useState } from "react";
import "./Navbar.css";

import { NavLink } from "react-router-dom";

const Navbar = () => {
  const data = [
    {
      title: "Fashion Consultant",
      path: "/admin/manage/fashion",
      cName: "nav-text",
    },
    {
      title: "Fabric Shops",
      path: "/admin/manage/fabric",
      cName: "nav-text",
    },
    {
      title: "Garments",
      path: "/admin/manage/garments",
      cName: "nav-text",
    },
    {
      title: "FAQ",
      path: "/admin/manage/faq",
      cName: "nav-text",
    },
    {
      title: "About Us",
      path: "/admin/manage/about",
      cName: "nav-text",
    },
    {
      title: "Users",
      path: "/admin/manage/users",
      cName: "nav-text",
    },
    {
      title: "Queries",
      path: "/admin/manage/queries",
      cName: "nav-text",
    },
    {
      title: "Consultant Booking",
      path: "/admin/manage/consultant",
      cName: "nav-text",
    },
  ];
  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        {/* <div className="logo">
          <h2>Admin</h2>
        </div> */}

        {/* 2nd menu part  */}
        <div className={"menu-link mobile-menu-link"}>
          <ul>
            {data.map((item, index) => {
              return (
                <li key={index} className={item.title==='Fashion Consultant' && 'active'}>
                  <NavLink to={item.path}>{item.title}</NavLink>
                </li>
              );
            })}
          </ul>
        </div>

        {/* 3rd social media links */}
        {/* <div className="logout">LogOut</div> */}
      </nav>
    </>
  );
};

export default Navbar;
