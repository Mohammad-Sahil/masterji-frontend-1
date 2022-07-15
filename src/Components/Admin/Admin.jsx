import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import './Admin.css';
import { Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <>
        <div className="admin_container">
        <div className="row p-0 m-0">
          <div className="col col-2 p-0">
          <Sidebar/>
          </div>
          <div className="col col-10 p-0">
            <Navbar/>
            <div className="container main-container m-0 p-0">
              <Outlet/>
            </div>
          </div>
        </div>
        
        </div>
    </>
  )
}

export default Admin