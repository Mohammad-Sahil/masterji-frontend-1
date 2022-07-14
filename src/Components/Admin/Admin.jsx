import React from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Admin = () => {
  return (
    <>
        <div className="admin_container">
        <Navbar/>
        <Sidebar/>
        </div>
    </>
  )
}

export default Admin