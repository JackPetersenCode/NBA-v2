import React, {useState} from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import './App.css';


function Navbar() {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const navLinks = document.querySelectorAll('.nav-item')
  navLinks.forEach((l) => {
    l.addEventListener('click', () =>  setIsNavExpanded(!isNavExpanded))
  })

  return (
    
    <nav className="nav">
      <div id="headtag" className="navdiv">
        <div className="nav-ball">
          <Link to="/">
            <img src="ball7.png" className="ball" alt="Home"/>
          </Link>
        </div>
        <div className="nav-burger" style={{justifyContent: 'right'}}>
          <button className="hamburger" onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}>
              {/* icon from heroicons.com */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="white"
              >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
              </svg>
          </button>
        </div>
        <div className={
            isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
          }>
          <div className="nav-item">
            <a className="link" href="/fantasy">
                                          FANTASY DRAFT
                                          MINI GAME</a>
          </div>
          <div className="nav-item">
            <Link  className="link" to="/shotCharts">SHOT
                                                      CHARTS</Link>
          </div>
          <div className="nav-item">
            <Link  className="link" to="/jackarithm">ODDS &
                                                      PREDICTIONS</Link>
          </div> 
          <div className="nav-item">
            <Link  className="link" to="/">ADVANCED STATS</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;