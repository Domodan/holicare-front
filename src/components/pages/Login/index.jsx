import React, {useState} from "react";
import dr from "../../../assets/img/dr.png";
import { Link } from 'react-router-dom';
import Head from '../../includes/Head';
import Footer from '../../includes/Footer';


export const Login= () => {
    //capturing states
    const [email, setEmail]= useState('');
    const [pass, setPass]= useState('');
    const [phone,setPhone]=useState('');
    
    const handleSubmit = (e) =>{
         e.preventDefault();
         console.log(email);
         localStorage.setItem("login", true);
    
    }

    return(
    <>
        
        <Head/>
        <hr style={{ marginTop: "50px", marginBottom: "50px" }} />

     <div className="container" style={{marginTop:"50px", marginBottom:"30px", paddingTop:"70px"}}>
    
        <div className="row">
            <div className="col-md-6" >

            <form onSubmit={handleSubmit}>
                <h1>Welcome back</h1>
                <p>Please enter your details below</p>
                <div className="mb-3">
                    <label htmlFor='email' className="form-label">Email address</label>
                    <input className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder="name@company.com" id="email" name="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor='tel' className="form-label">Phone Number</label>
                    <input className="form-control" value={phone} onChange={(e)=>setPhone(e.target.value)} type='tel' placeholder="0780000000" id="tel" name="tel" />
                </div>
                <div className="mb-3">
                    <label htmlFor='password' className="form-label">Password</label>
                    <input className="form-control" value={pass} onChange={(e)=>setPass(e.target.value)}  type='password' placeholder="*******" id="password" name="password" />
                </div>
                <div className="mb-3">
                <button type="submit" className="btn btn-dark" style={{width:"300px"}}>Log in</button>
                </div>
            </form>
            <Link to= '/Register'>Don't have an account? <b>Sign up here</b> </Link>

            </div>
            <div className="col-md-6">
                <img src={dr} className="rounded img-fluid img-thumbnail" alt="..."/>
            </div>
        </div>   
    </div>
    <hr style={{ marginTop: "50px", marginBottom: "50px" }} />
    <Footer/> 
    </>
    )
}