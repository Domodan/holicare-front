import React from 'react';

import '../../../assets/css/style.css';
import '../../../assets/css/bootstrap/css/bootstrap.min.css';

import Footer from '../../includes/Footer';
import Head from '../../includes/Head';
import Hero from '../../includes/Hero';

import germs1 from '../../../assets/img/gm1.png';
import germs2 from '../../../assets/img/gm2.png';
import germs3 from '../../../assets/img/gm3.png';
import child from '../../../assets/img/child.png';

const Home = () => {

    const handleClick = () => {
        localStorage.setItem("landing", false);
        window.location.reload();
    }

    return (
        <div>
            <Head />
            <Hero />
            <section id="testimonials" className="testimonials section-bg" style={{background: "#000", color: "lavender"}}>
                <div className="container">
                    <div className="section-title" style={{paddingBottom: "50px"}}>
                        <p>Our doctors specialize in complex health issues ignored<br/> by conventional medicine.</p>
                    </div>
                    <div className="container" style={{paddingTop: "50px"}}>
                        <div className="row" style={{textAlign: "center"}}>
                            <div className="col-lg-4 col-md-6">
                                <div className="container" style={{paddingBottom: "30px"}}>
                                    <img src={ germs3 } alt=""/>
                                </div>
                                <h6>
                                    <b>Hormone issues</b>
                                </h6>
                                <p>Fatigue, menopause, fertility, thyroid issues, cycle optimization</p>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="container" style={{paddingBottom: "30px"}}>
                                    <img src={ germs1 } alt=""/>
                                </div>
                                <h6>
                                    <b>Autoimmunity</b>
                                </h6>
                                <p>Chronic breakouts, pain & other confusing symptoms</p>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="container" style={{paddingBottom: "30px"}}>
                                    <img src={ germs2 } alt=""/>
                                </div>
                                <h6>
                                    <b>Digestive issues</b>
                                </h6>
                                <p>Inflammatory bowel, SBO, gas, bloating</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="pricing" className="pricing" style={{backgroundImage: `url(${child})`, backgroundRepeat: "no-repeat", backgroundSize: "cover", height: "500px"}}>
                <div className="container" style={{textAlign: "center", width: "700px", padding: "50px", background: "#fff", opacity: "0.8"}} >
                    <p style={{paddingBottom: "20px"}}>
                        <i>
                            <b>We thrive where conventional disease diagnosis is ignored.</b>
                        </i>
                    </p>
                    <h1>
                        <b>Point of Care Instruments</b>
                    </h1>
                    <p>
                        Detailed diagnosis using a POC-instrument performing simultaneous nucleic acid amplification
                        (LAMP) for pathogen identification and immunoassays for host biomarker quantification.
                    </p>
                    <button onClick={handleClick} className="btn btn-success" style={{borderRadius: "20px", padding: "10px"}}>Learn more</button> 
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Home