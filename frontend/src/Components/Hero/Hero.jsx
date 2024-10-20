import React from 'react'
import './Hero.css'
import Hero_image from '../Assets/men_formal_image.webp';
import Festival_image from '../Assets/festival_pop.webp'
import Kids_image from '../Assets/kids.webp'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='hero'>
        <Link to='/men'><img className='img1' src={Hero_image} alt="" /></Link>
        <Link to='/women'><img className='img2' src={Festival_image} alt="" /></Link>
        <Link to='/kids'><img className='img3' src={Kids_image} alt="" /></Link>
        
    </div>
  )
}
export default Hero
