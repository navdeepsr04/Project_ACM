import React, { useContext } from 'react'
import './ProductDisplay.css'
import Star_icon from '../Assets/star_icon.png'
import Star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'

export const ProductDisplay = (props) => {
    const {product} = props;

    const {addToCart} = useContext(ShopContext);

  return (
    <div className='pd'>
        <div className="pd-left">
            <div className="pd-left-imglist">
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
                <img src={product.image} alt="" />
            </div>
            {/* <div className="pd-left-img">
                <img className='pd-main-img' src={product.image} alt="" />
            </div> */}
        </div>
        <div className="pd-right">
            <h1>{product.name}</h1>
            <div className="pd-right-star">
                <img src={Star_icon} alt="" />
                <img src={Star_icon} alt="" />
                <img src={Star_icon} alt="" />
                <img src={Star_icon} alt="" />
                <img src={Star_dull_icon} alt="" /> (1024)
            </div>
            
            <div className="pd-right-price">
                <div className="pd-right-old-price">Rs. {product.old_price}</div>
                <div className="pd-right-new-price">Rs. {product.new_price}</div>
            </div>
            <div className="pd-right-description">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium modi eligendi veniam vel beatae, in, totam expedita commodi dignissimos nihil distinctio consequatur odit voluptatem nobis eum velit rem, dolores sequi.
            </div>
            <div className="pd-right-select-size">
                <p>Select size</p>
                <div className="pd-right-size">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={()=>{addToCart(product.id)}}>Add To Cart</button>
        </div>
    </div>
  )
}
