import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import './Admin.css';
import { Outlet } from 'react-router-dom';
import Metadata from '../Metadata';

const Admin = () => {
  return (
    <>
    <Metadata title='Admin | Masterji'/>
        <div className="admin_container" >
        <div className="row p-0 m-0 h-100" >
          <div className="col col-2 p-0">
            <Sidebar/>
          </div>
          <div className="col col-10 p-0 main-container">
              <Outlet/>
          </div>
        </div>
        </div>
    </>
  )
}

export default Admin