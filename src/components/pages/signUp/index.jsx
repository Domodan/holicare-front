import React, {useState} from "react";
import dr from "../../../assets/img/dr.png";
import { Link } from 'react-router-dom';

export const SignUp = () => {
    const [email, setEmail]= useState('');
    const [pass, setPass]= useState('');
    const [name, setName]= useState('');
    const [phone, setPhone]= useState('');


    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
   
   }

    return(
        <>

        <div className="container" >
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                            <h1>Welcome back</h1>
                            <p>Please enter your details below</p>
                            <div className="mb-3">
                                <label htmlFor='name' className="form-label">Full Name</label>
                                <input className="form-control" value={name} onChange={(e)=>setName(e.target.value)} type='text' placeholder="Ryan George" id="name" name="name" />
                            </div>
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
                                <input value={pass} onChange={(e)=>setPass(e.target.value)}  type='password' placeholder="*******" id="password" name="password" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor='password' className="form-label">Confirm Password</label>
                                <input value={pass} onChange={(e)=>setPass(e.target.value)}  type='password' placeholder="*******" id="pass" name="pass" />
                            </div>
                            <button type="submit" className="btn btn-dark">Sign Up</button>
                    </form>
                    <Link to= '/Login'>Already have an account? <b>Login</b> </Link>
               </div>
               <div className="col-md-6">
                <img src={dr} className="rounded img-fluid img-thumbnail" alt="..."/>
               </div>
            </div>  
        </div>
   
        </>
    )
}