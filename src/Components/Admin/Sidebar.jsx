import React from "react";
import "./Sidebar.css";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutuseraction } from "../../Actions/useraction";

const Sidebar = () => {
  const {user} =useSelector(state=>state.User)
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
      title: "Portal",
      path: location.pathname.includes("/admin/portal/users") ? location.pathname : (location.pathname.includes("/admin/portal/register") ? location.pathname : '/admin/portal/users'),
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
                <NavLink to={item.path} >
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
            <img src="https://walr.com/app/uploads/2022/03/audience-access.svg" alt="" /><span className="profileName">{user.name}<br/><p style={{fontSize:13}}>{user.role}</p></span>
          </li> 
          <li className="nav-text logout-footer">
            <a onClick={logouthandle} style={{color:'white'}}>
              <span>Log Out</span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
