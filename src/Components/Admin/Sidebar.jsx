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
    title: 'Orders',
    path: '/admin',
    cName: 'nav-text'
  },
  {
    title: 'Manage',
    path: '/admin',
    cName: 'nav-text'
  },
  {
    title: 'Executives',
    path: '/admin',
    cName: 'nav-text'
  },
  {
    title: 'Tailors',
    path: '/admin',
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