import React from 'react';
import { Link } from 'react-router-dom';

const Head = () => {
    return (
        <div className="page-wrapper">
            <header id="header" className="fixed-top d-flex align-items-center">
                <div className="container d-flex align-items-center justify-content-between">
                    <div className="logo">
                        <h1>
                            <Link to={"/"}>HoliCare</Link>
                        </h1>
                    </div>
                    <nav id="navbar" className="navbar">
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>
                </div>
            </header>
        </div>
    )
}

export default Head