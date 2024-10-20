import React from 'react'
import './CSS/Signup.css'
import { Link } from 'react-router-dom'

export const Signup = () => {

  const sign_up = async ()=>{
    console.log("signup executed");
  }

  return (
    <div className='signup'>
        
      <p>SIGN UP</p>
      <hr />
      <div className='signup-container'>
        <div className="signup-usr-pass">
          Name: <input placeholder='Full Name' type="text" />
          email: <input placeholder='Enter New Email' type="text" />
          username: <input placeholder='Username(Unique)' type="text" />
          password: <input placeholder='Choose a Password' type="" name="" id="" />
          confirm password: <input placeholder='ReEnter Password' type="" name="" id="" />
          <button onClick={sign_up()}>Submit</button>
        </div>
        <div className="signup-login">
          
        </div>
      </div>
    
    </div>
  )
}
