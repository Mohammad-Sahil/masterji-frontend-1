import React from 'react'
import FashionConsultants from './fashionConsultants'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import './Admin.css';

const Admin = () => {
  return (
    <>
        <div className="admin_container">
        <div className="row">
          <div className="col col-2">
          <Sidebar/>
          </div>
          <div className="col col-10 p-0">
            <Navbar/>
            <div className="container main-container">
              <FashionConsultants/>
            </div>
          </div>
        </div>
        
        </div>
    </>
  )
}

export default Admin