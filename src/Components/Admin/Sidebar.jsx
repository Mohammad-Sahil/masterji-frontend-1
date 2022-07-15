import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import './Sidebar.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Sidebar = () => {
const data = [
  {
    title: 'Fabric Shops',
    path: '/admin/manage/fabric',
    cName: 'nav-text'
  },
  {
    title: 'Fashion Consultant',
    path: '/admin/manage/fashion',
    cName: 'nav-text'
  },
  {
    title: 'Garments',
    path: '/admin/manage/garments',
    cName: 'nav-text'
  },
  {
    title: 'FAQ',
    path: '/admin/manage/faq',
    cName: 'nav-text'
  },
  {
    title: 'About Us',
    path: '/admin/manage/about',
    cName: 'nav-text'
  },
  {
    title: 'Users',
    path: '/admin/manage/users',
    cName: 'nav-text'
  },
  {
    title: 'Queries',
    path: '/admin/manage/queries',
    cName: 'nav-text'
  },
  {
    title: 'Consultant Booking',
    path: '/admin/manage/consultant',
    cName: 'nav-text'
  }
];

const [sidebar, setSidebar] = useState(false);
const showSidebar = () => setSidebar(!sidebar);

  return (<>
        <div className='navbar'></div>
        <nav className='nav-menu active'>
          <ul className='nav-menu-items'>
          <li className='nav-text' style={{color:'white', fontSize:30, height:100}}>
                  <span>MasterJi</span>
              </li>
            {data.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
           })}
          </ul>
        </nav>
    
  </>
  )
}

export default Sidebar