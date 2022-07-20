import React, { useEffect } from 'react'
import Navbar from '../Navbar';
import { Outlet , Routes, Route, useNavigate } from 'react-router-dom';
import Metadata from '../../Metadata';



const Manage = () => {
  const Navigate = useNavigate()
  useEffect(() => {
    Navigate('/admin/manage/fashion')
  }, [])
  
  return (
    <>
    <Metadata title='Manage | Admin | Masterji'/>
        <div>
            <Navbar />
            <Outlet />
        </div>
    </>
  )
}

export default Manage