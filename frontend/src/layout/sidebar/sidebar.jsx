import React, { useState } from 'react';
import RahatLogo from '../../assets/img/rahat_logo.png';
import { Link, useLocation } from 'react-router-dom'; 

const Sidebar = () => { // <-- Change to uppercase 'Sidebar'
  // State to manage the collapse of sections

  const location = useLocation();
  const isActive = (route) => location.pathname.includes(route);


  const [isDashboardOpen, setDashboardOpen] = useState(false);

  const toggleDashboard = () => {
    setDashboardOpen(!isDashboardOpen);
  };


 
  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        <div className="logo-header" data-background-color="dark">
          <a href="" className="logo">
            <img
              src={RahatLogo}
              alt="navbar brand"
              className="navbar-brand"
              height="80px"
            />
          </a>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="gg-menu-right"></i>
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="gg-menu-left"></i>
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt"></i>
          </button>
        </div>
      </div>
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            {/* Dashboard Section */}
            <li className="nav-item active">
              <Link
                onClick={toggleDashboard}
                className={`collapsed ${isDashboardOpen ? 'show' : ''}`}
                aria-expanded={isDashboardOpen}
                to={'/dashboard'}
                
              >
                <i className="fas fa-home"></i>
                <p>Dashboard</p>
              </Link>
            </li>

            {/* CRM Lead / Queries Management */}
            <li className="nav-item">
              <Link
                to={'/pnr_list'}
              >
                <i className="fas fa-layer-group"></i>
                <p>PNR List</p>
              </Link>
            </li>

            {/*Booking Management */}
            <li className="nav-item">
                <Link
                  to={'/booking_list'}
                >
                  <i className="fas fa-layer-group"></i>
                  <p>Booking List</p>
                </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; // <-- Make sure export name matches the component name
