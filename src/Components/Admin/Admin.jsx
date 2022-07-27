import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

import './Admin.css';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Metadata from '../Metadata';



const Admin = () => {
  const Location = useLocation()
  const Navigate = useNavigate()
  useEffect(() => {
    if(Location.pathname==='/admin'){
      Navigate('orders')
    }
  }, [])
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