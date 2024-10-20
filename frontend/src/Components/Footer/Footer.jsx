import React from 'react'
import './Footer.css'
import logo from '../Assets/logo.png'
import instagram_icon from '../Assets/instagram_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import youtube_icon from '../Assets/youtube_icon.png'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <Link to='/'><img src={logo} alt="" /></Link>
            <p>estify</p>
        </div>
       <div className="footer-about">
        <ul className='footer-links'>
                <Link to='/'><li>Products</li></Link>
                <Link to='/'><li>Stores</li></Link>
                <Link to='/'><li>Company</li></Link>
                <Link to='/'><li>About</li></Link>
                <Link to='/'><li>Contact</li></Link>
            </ul>
       </div>
       <div className="footer-social">
        <Link to='/'><img src={instagram_icon} alt="" /></Link>
        <Link to='/'><img src={whatsapp_icon} alt="" /></Link>
        <Link to='/'><img src={youtube_icon} alt="" /></Link>
        <Link to='/'><img src={youtube_icon} alt="" /></Link>
       </div>
       <hr />
       <p>coypyright @ 2024 - All Rights Reserved</p>
    </div>
  )
}
