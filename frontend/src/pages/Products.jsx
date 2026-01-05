import React from 'react';
import { products } from '../data/mock';
import { Link } from 'react-router-dom';
import { Lock, Star, Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

const Products = () => {
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleWishlistToggle = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      variant: product.variant,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  return (
    <div className="products-page">
      <div className="container">
        <div className="section-header">
          <h1 className="section-title">All Products</h1>
          <p className="section-subtitle">Performance gear built for discipline</p>
        </div>

        <div className="products-grid-page">
          {products.map((product, index) => (
            <div key={product.id} className="product-card">
              {index === 0 && (
                <div className="popular-badge">
                  <Star size={12} fill="currentColor" /> Most Popular
                </div>
              )}
              
              <button 
                className={`wishlist-heart ${isInWishlist(product.id, product.variant) ? 'active' : ''}`}
                onClick={(e) => handleWishlistToggle(e, product)}
              >
                <Heart size={18} fill={isInWishlist(product.id, product.variant) ? 'currentColor' : 'none'} />
              </button>
              
              <div className="product-image-wrapper">
                <img 
                  src={product.image} 
                  alt={`${product.name} - ${product.variant}`}
                  className="product-image"
                />
              </div>
              
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-variant">{product.variant}</div>
                <div className="product-price-row">
                  {product.originalPrice && (
                    <span className="product-original-price">${product.originalPrice}</span>
                  )}
                  <span className="product-price">${product.price}</span>
                </div>
                
                <button className="btn-add-to-cart waitlist-btn">
                  <Lock size={16} /> Join Waitlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
