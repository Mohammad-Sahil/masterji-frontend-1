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
    <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'></link>
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
          {/* <li className="nav-text sidebar-footer"> */}
            {/* <div className="row">
              <div className="col-3">
              <img color="white" src="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-user-icon-image_1187018.jpg" alt="" />
              </div>
              <div className="col-6">
              &nbsp;&nbsp;John Doe <br/><p style={{fontSize:15}}>&nbsp;&nbsp;Admin</p>
              </div>
              <div className="col-3">
              <a href="#" class="log-out">&nbsp;&nbsp;&nbsp;<i class='fa fa-sign-out'></i></a>
              </div>
            </div> */}
            {/* <span><img src="https://www.citypng.com/public/uploads/preview/profile-user-round-white-icon-symbol-png-11639594348fn8rlcxrqo.png" alt="" /></span><span>John Doe <br/><p style={{fontSize:15}}>Admin</p></span><span><a href="#" class="log-out">&nbsp;&nbsp;&nbsp;<i class='fa fa-sign-out'></i></a></span>
          </li>  */}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
