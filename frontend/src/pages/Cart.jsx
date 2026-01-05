import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotals } = useCart();
  const totals = getCartTotals();

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h1 className="cart-title">Your Cart</h1>
          <div className="cart-empty">
            <ShoppingBag size={48} strokeWidth={1} />
            <p>Your cart is empty</p>
            <Link to="/products" className="btn-cta">Shop Now</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Your Cart ({totals.itemCount} items)</h1>
        
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={`${item.productId}-${item.color}-${item.size}-${index}`} className="cart-item">
              {item.image && (
                <img src={item.image} alt={item.productName} className="cart-item-image" />
              )}
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.productName}</h3>
                <p className="cart-item-meta">{item.color} / {item.size}</p>
                <p className="cart-item-price">${item.price}</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity - 1)}
                    className="qty-btn"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.productId, item.color, item.size, item.quantity + 1)}
                    className="qty-btn"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item.productId, item.color, item.size)}
                  className="remove-btn"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${totals.subtotal.toFixed(2)}</span>
          </div>
          {totals.discount > 0 && (
            <div className="summary-row discount">
              <span>Discount</span>
              <span>-${totals.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="cart-total">
            <span>Total</span>
            <span>${totals.total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
