import React from 'react';
import { useNavigate } from 'react-router-dom';

import doctor from '../../assets/img/test.png';

const Hero = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/dashboard", { replace: true })
    }

    return (
        <section id="hero" className="d-flex align-items-center">
            <div className="container" style={{textAlign: "left"}}>
                <div className="row">
                    <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
                        <h1>Healthcare <br/>Diagnostics tool <br/>you can trust</h1>
                        <p  data-aos-delay="400">
                            A holistic approach in patient management and epidemic surveillance through
                            convergence of dignostic technologies, capacity building, and stakeholder management.
                        </p>
                        <div data-aos-delay="800">
                            
                            <button onClick={handleClick} className="btn-get-started scrollto">Get Started</button> &nbsp;
                            <button onClick={handleClick} className="btn-get-started">Learn more</button>
                        </div>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos-delay="200">
                        <img src={ doctor } style={{width: "400px", float: "right"}} className="img-fluid " alt=""/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero