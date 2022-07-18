import React from 'react'
import Navbar from '../Navbar';
import { Outlet , Routes, Route } from 'react-router-dom';

import FashionConsultants from './FashionConsultants';
import Fabric from './Fabric';
import Garments from './Garments';
import FAQs from './FAQs';
import About from './About';
import Users from './Users';
import Queries from './Queries';
import ConsultantBooking from './ConsultantBooking';



const Manage = () => {
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