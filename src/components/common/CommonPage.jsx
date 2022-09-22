import React from "react";
import "./CommonPage.css";
import hero1 from "../../assets/images/hero1.png";
import hero2 from "../../assets/images/hero-2.png";
import hero31 from '../../assets/images/hero3-img1.png'
import hero32 from '../../assets/images/hero3-img2.png'
import hero33 from '../../assets/images/hero3-img3.png'
import { useNavigate } from "react-router-dom";

function CommonPage() {

   

  return (
    <React.Fragment>
      <section className="container hero">
        <div className="row hero-1 d-flex">
          <div className="col-lg-6 p-2 order-md-2 order-lg-1">
            <h1 className="hero-1-heading">
              Make the best move to choose your new job
            </h1>
            <p className="hero-1-desc">
              Jobsilo will help and recommend a place to work that fits your
              criteria. Fast, Safe and reliable
            </p>
          </div>
          <div className="col-lg-6 mx-auto text-center order-md-1 order-lg-2">
            <img className="" src={hero1} alt="" />
          </div>
        </div>
      </section>

      <section className="container hero mb-3">
        <div className="row hero-2">
          <div className="col-lg-5 col-md-12 text-center">
            <img className="hero2img mx-auto" src={hero2} alt="" />
            <button className="hire-button">Hire Now</button>
          </div>
          <div className="col-lg-7 col-md-12">
            <h1 className="hero-2-heading">
            A recruiting software that brings big ideas & talents together.
            </h1>
          </div> 
        </div>
      </section>

      <section className="container">
        <div className="text-center">
          <p className=" why-heading">Why choose us ?</p>
          <p className="hero3-desc"> Make the right hires, find the right job, faster with the world’s leading recruiting software. </p>
        </div>
        <div className="row hero3-carousel text-center">
          <div className="col-lg-4 col-md-6">
            <img src={hero31} alt="" />
          </div>
          <div className="col-lg-4 col-md-6">
            <img src={hero32} alt="" />
          </div>
          <div className="col-lg-4 col-md-12">
           <img src={hero33} alt="" />
          </div>
        </div>
       
      </section>
    </React.Fragment>
  );
}

export default CommonPage;
