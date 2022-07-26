import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import Metadata from '../../Metadata';

const Portal = () => {
    const Navigate = useNavigate()
    const [tab, settab] = useState('Users');
    const navdata = [
      {
        title: "Users",
        cName: "nav-text",
        active: tab === "Users" ? true : false,
        path: "/admin/portal/users",
    },
      {
        title: "Register",
        cName: "nav-text",
        active: tab === "Register" ? true : false,
        path: "/admin/portal/register",
      }
    ];
    
    const tabhandle = (e) => {
        settab(e.target.innerHTML);
      };
      useEffect(() => {
        if(window.location.pathname.includes('/users')){
            settab('Users')
        }else if(window.location.pathname.includes('/register')){  
            settab('Register')
        }else{
          Navigate('users')
        }
      }, [])
      

      return (
          <>
      <Metadata title="Portal | Admin | Masterji" />
    <nav className="main-nav">
          <div className={"menu-link mobile-menu-link"}>
            <ul>
              {navdata.map((item, index) => {
                return (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className={item.active && "active"}
                      onClick={tabhandle}
                    >
                      {item.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
        <Outlet/>
    </>
  )
}

export default Portal