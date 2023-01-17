import React from 'react';

const Hero = () => {
    return (
        <div>
            <section id="hero" class="d-flex align-items-center">

<div className="container" style={{textAlign: "left"}}>
  <div class="row">
    <div className="col-lg-6 pt-5 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
      <h1>Healthcare <br/>Diagnostics tool <br/>you can trust</h1>
      <p  data-aos-delay="400">A holistic approach in patient management and epidemic surveillance through
        convergence of dignostic technologies, capacity building, and stakeholder management.
      </p>
      <div data-aos-delay="800">
        <a href="#about" class="btn-get-started scrollto">Get Started</a> &nbsp;
        <a href="#about" class="btn-get-started">Learn more</a>
      </div>
    </div>
    <div className="col-lg-6 order-1 order-lg-2 hero-img" data-aos-delay="200">
      <img src="assets/img/test.png" style={{width: "400px", float: "right"}} class="img-fluid " alt=""/>
    </div>
  </div>
</div>

</section>
</div>
        
    );
}

export default Hero;
