import React, { useContext } from 'react';
import './CartItems.css';
import remove_icon from '../Assets/cart_cross_icon.png';
import { ShopContext } from '../../Context/ShopContext';

export const CartItems = () => {
  const {getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);

  if (!cartItems || !all_product) {
    return <p className='loading'>Loading...</p>; 
  }

  const cartProducts = all_product.filter(product => cartItems[product.id] > 0);

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {cartProducts.length > 0 ? (
        cartProducts.map((product) => (
          <div key={product.id}>
            <div className="space">

            </div>
            <div className='cartitems-format cartitems-format-main'>
              <img className='cartitems-product-icon' src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>${product.new_price.toFixed(2)}</p>
              <span className='cartitems-quantity'>{cartItems[product.id]}</span>
              <p>Rs {(product.new_price * cartItems[product.id]).toFixed(2)}</p>
              <img 
                className='cartitems-remove-icon' 
                src={remove_icon} 
                onClick={() => removeFromCart(product.id)} 
                alt="Remove from cart" 
                role="button" 
                aria-label={`Remove ${product.name} from cart`} 
              />
            </div>
            <hr />
          </div>
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div className="cartitems-total-items">
            <p>SUbtotal</p>
            <p>Rs {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cartitems-total-items">
            <p>Shipping fee</p>
            <p>Rs {getTotalCartAmount()>0?40:0}</p>
          </div>
          <hr />
          <div className="cartitems-total-items">
            <h3>Total</h3>
            <h3>Rs {getTotalCartAmount() + (getTotalCartAmount()>0?40:0)}</h3>
          </div>
          <hr />
          <button>PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </div>
  );
};
