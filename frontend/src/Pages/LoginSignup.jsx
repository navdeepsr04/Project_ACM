import React, { useState } from 'react'
import './CSS/LoginSignup.css'
import { Link } from 'react-router-dom'

export const LoginSignup = () => {

  const[state, setState] = useState("Login");
  const[formData, setformData] = useState({
    // username:"",
    password:"",
    email:""
  })

  const [confirmPassword, setConfirmPassword] = useState(''); 

  const changeHandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  // ------login
  const log_in = async () => {
    let responseData;
  
    try {
      const response = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json', 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      responseData = await response.json();
  
      if (response.ok && responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        alert('Logged In Successfully');
        window.location.replace('/');
        console.log('Logged in', formData);
  
      } else {
        console.error('Login failed:', responseData.error || 'Unknown error');
        alert("Incorrect email or password");
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert("server side error, sorry for inconvenience");
    }
  };
  


  //-----signUp
  const sign_up = async () => {
    if (formData.password !== confirmPassword) {
      console.error("Passwords don't match");
      return;
    }

    // console.log('signup executed', formData);
    let responseData;

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json', 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), 
      });

      responseData = await response.json();

      if (response.ok && responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        alert('Account created successFully');
        window.location.replace('/');
      } else {
        console.error('Signup failed:', responseData.message || 'Unknown error');
        alert("Account already exis");
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      alert("Account already exis");
    }
  };

  

  return (
    <div className='login'>
      <p>{state}</p>
      <hr />
      <div className='login-container'>
        <div className="login-usr-pass">
          {/* username: <input name='username' value={formData.username} onChange={changeHandler} placeholder='Username' type="text" /> */}

          {/* {state==='Signup'?<></>:<></>}
           */}
           email: <input name='email' value={formData.email} onChange={changeHandler} placeholder='Enter New Email' type="text" />

          password: <input name='password' value={formData.password} onChange={changeHandler} placeholder='Enter Password' type="password" id="" />

          {state==='Signup'?<>confirm password: <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='ReEnter Password' type="password" id="" /></>:<></>}
          
          {state==='Login'?<button onClick={()=>{state==='Login'?log_in():sign_up()}}>Login</button>:<></>}
          {state==='Signup'?<button onClick={()=>{state==='Login'?log_in():sign_up()}}>Create Account</button>:<></>}
        </div>
        <div className="login-forgot-signup">
          <Link>forgot password?</Link>
          {state==='Signup'?<Link onClick={()=>{setState("Login")}}>already have an account?</Link>:<></>}
          {state==='Login'?<Link onClick={()=>{setState("Signup")}}>create account?</Link>:<></>}
          
        </div>
      </div>
    </div>
  )
}
