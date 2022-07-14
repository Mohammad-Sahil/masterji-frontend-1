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
    path: '/admin',
    cName: 'nav-text'
  },
  {
    title: 'Fashion Consultant',
    path: '/admin',
    cName: 'nav-text'
  },
  {
    title: 'Garments',
    path: '/admin',
    cName: 'nav-text'
  },
  {
    title: 'FAQ',
    path: '/admin',
    cName: 'nav-text'
  },
  {
    title: 'About Us',
    path: '/admin',
    cName: 'nav-text'
  },
  {
    title: 'Users',
    path: '/admin',
    cName: 'nav-text'
  },
  {
    title: 'Queries',
    path: '/admin',
    cName: 'nav-text'
  },
  {
    title: 'Consultant Booking',
    path: '/admin',
    cName: 'nav-text'
  }
];

const [sidebar, setSidebar] = useState(false);
const showSidebar = () => setSidebar(!sidebar);

  return (<>
<div className='navbar'>
        </div>
        <nav className='nav-menu active'>
          <ul className='nav-menu-items'>
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