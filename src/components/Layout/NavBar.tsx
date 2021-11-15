/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react'

const NavBar = (): JSX.Element => {
  return (
    <div className="nav-wrapper">
      <div className="grad-bar"></div>
      <nav className="navbar">
        <span className="logo">Next-Crowdfunding</span>
        <div className="menu-toggle" id="mobile-menu">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <a>Home</a>
          </li>
          <li className="nav-item">
            <a>About</a>
          </li>
          <li className="nav-item">
            <a>Contact Us</a>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
