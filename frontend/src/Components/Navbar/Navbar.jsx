import React from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart.png'
import wishlist_icon from '../Assets/wishlist.png'
import { Link } from 'react-router-dom'


export const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="" />
        </div>
        <div className="nav-menu">
            <li><Link style={{textDecoration:'none'}} to='/'>Home</Link></li>
            <li><Link style={{textDecoration:'none'}} to='/men'>Men</Link></li>
            <li><Link style={{textDecoration:'none'}} to='/women'>Women</Link></li>
            <li><Link style={{textDecoration:'none'}} to='/kids'>Kids</Link></li>
            <li><Link style={{textDecoration:'none'}} to='/footwear'>Footwear</Link></li>
        </div>
        <div className="nav-login-cart">
            {localStorage.getItem('auth-token')
            ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:<Link to={'/login'}><button>SignIn</button></Link>}
            
            <Link to={'/wishlist'}><img src={wishlist_icon} alt="" /></Link>

            <Link to={'/cart'}><img src={cart_icon} alt="" /></Link>
            {/* <div className="nav-cart-count">0</div> */}
        </div>
    </div>
  )
}
