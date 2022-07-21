import React from "react";
import "./Sidebar.css";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutuseraction } from "../../Actions/useraction";

const Sidebar = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const data = [
    {
      title: "Orders",
      path: location.pathname.includes("/admin/orders") ? location.pathname : '/admin/orders',
      cName: "nav-text",
    },
    {
      title: "Manage",
      path: location.pathname.includes("/admin/manage") ? location.pathname : '/admin/manage',
      cName: "nav-text",
    },
    {
      title: "Executives",
      path: location.pathname.includes("/admin/executives") ? location.pathname : '/admin/executives',
      cName: "nav-text",
    },
    {
      title: "Tailors",
      path: location.pathname.includes("/admin/tailors") ? location.pathname : '/admin/tailors',
      cName: "nav-text",
    },
    {
      title: "Register",
      path: location.pathname.includes("/admin/register") ? location.pathname : '/admin/register',
      cName: "nav-text",
    },
  ];

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const logouthandle = (e)=>{
    e.preventDefault()
    dispatch(logoutuseraction())
  }

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
          <li className="nav-text sidebar-footer">
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
            <img src="https://walr.com/app/uploads/2022/03/audience-access.svg" alt="" /><span className="profileName">Yash Deorah <br/><p style={{fontSize:13}}>Admin</p></span>
          </li> 
          <li className="nav-text logout-footer">
            <NavLink activeclassname="active" to={'/'} onClick={logouthandle} >
              <span>Log Out</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
