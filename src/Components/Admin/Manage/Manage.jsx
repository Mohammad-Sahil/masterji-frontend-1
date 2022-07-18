import React, { useEffect } from 'react'
import Navbar from '../Navbar';
import { Outlet , Routes, Route, useNavigate } from 'react-router-dom';

import FashionConsultants from './FashionConsultants';
import Fabric from './Fabric';
import Garments from './Garments';
import FAQs from './FAQs';
import About from './About';
import Users from './Users';
import Queries from './Queries';
import ConsultantBooking from './ConsultantBooking';



const Manage = () => {
  const Navigate = useNavigate()
  useEffect(() => {
    Navigate('/admin/manage/fashion')
  }, [])
  
  return (
    <>
        <div>
            <Navbar />
            <Outlet />
        </div>
    </>
  )
}

export default Manage