import React from 'react';

const Header = () => {
    return (
        <div className="page-wrapper">
             <header id="header" class="fixed-top d-flex align-items-center">
    <div className="container d-flex align-items-center justify-content-between">

      <div className="logo">
        <h1><a href="index.html">HoliCare</a></h1>
        
      </div>

      <nav id="navbar" class="navbar">
       
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
        </div>
    );
}

export default Header;
