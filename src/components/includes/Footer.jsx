import React, { useState, useEffect } from 'react';

const Footer = () => {
    const [year, setYear] = useState();
  
    useEffect(() => {
        return () => {
            const date = new Date();
            setYear(date.getFullYear());
        }
    }, []);
    
    return (
        <div className="page-wrapper mt-3">
            <footer id="footer">
                <div className="container">
                    <div className="row d-flex align-items-center">
                        <div className="col-lg-3"></div>
                        <div className="col-lg-6 text-lg-left text-center">
                            <div className="copyright">
                                Copyright <strong>&copy; { year } - Holicare</strong>. All Rights Reserved
                            </div>
                        </div>
                        <div className="col-lg-3"></div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer