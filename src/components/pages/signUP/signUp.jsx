import React, {useState} from "react";

export const signUp = () => {
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [name, setName]= useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
   
   }

    return(
        <>
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
            <Link to= '/signUp'>Already have an account? <b>Login</b> </Link>
            
           
        </div>
        </>
    )
}