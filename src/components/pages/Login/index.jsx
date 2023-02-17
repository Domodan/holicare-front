import React, {useState} from "react";
//import dr from "../../../assets/img/dr.png";
import { Link } from 'react-router-dom';

import Footer from '../../includes/Footer';
import Head from '../../includes/Head';
import Hero from '../../includes/Hero';


export const Login= () => {
    const [email, setEmail]= useState('');
    const [pass, setPass]= useState('');
    const [phone,setPhone]=useState('');
    
    const handleSubmit = (e) =>{
         e.preventDefault();
         console.log(email);
    
    }

    return(
    <>
       <Head />
       <Hero />
        <div style={{ display: 'flex' }}>
            <form onSubmit={handleSubmit}>
                <h1>Welcome back</h1>
                <p>Please enter your details below</p>
                <label htmlFor='email'>Email address</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder="name@company.com" id="email" name="email" />

                <label htmlFor='tel'>Phone Number</label>
                <input value={phone} onChange={(e)=>setPhone(e.target.value)} type='tel' placeholder="0780000000" id="tel" name="tel" />

                <label htmlFor='password'>Password</label>
                <input value={pass} onChange={(e)=>setPass(e.target.value)}  type='password' placeholder="*******" id="password" name="password" />

                <button type="submit">Log in</button>
            </form>
            <Link to= '/signUp'>Don't have an account? <b>Sign up here</b> </Link>
        </div>
        <Footer/>    
    </>

    )
}