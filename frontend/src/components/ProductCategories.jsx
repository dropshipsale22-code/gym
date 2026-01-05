import React, { useState, useEffect } from 'react';
import { shirts, shorts } from '../data/mock';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ShoppingBag, Clock, Star, Heart, Lock } from 'lucide-react';
import { initializeStockCounts } from '../utils/stockUrgency';

const URGENCY_PRODUCT_IDS = [1, 3, 5];
const WAITLIST_MODE = true;

const ProductCategories = () => {
  const [selectedSizes, setSelectedSizes] = useState({});
  const [selectedGender, setSelectedGender] = useState({});
  const [addedToCart, setAddedToCart] = useState({});
  const [stockCounts, setStockCounts] = useState({});
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const counts = initializeStockCounts(URGENCY_PRODUCT_IDS);
    setStockCounts(counts);
  }, []);

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };

  const handleWishlistToggle = (e, product) => {
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

  const handleAddToCart = (product, isShirt = true) => {
    if (WAITLIST_MODE) {
      alert('Join our waitlist! First drop sold out - next drop Feb 2.');
      return;
    }
    
    const selectedSize = selectedSizes[product.id] || 'M';
    
    addToCart({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      colors: [{ name: product.variant, hex: product.hex, image: product.image }]
    }, product.variant, selectedSize, 1);
    
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section className="collection-section" id="collection">
      <div className="container">
        <div className="collection-header">
          <h2 className="collection-title">THE COLLECTION</h2>
          <p className="collection-subtitle">Performance pieces built for discipline</p>
        </div>

        <div className="bundle-banner">
          <div className="bundle-banner-content">
            <span className="bundle-main">Complete the set — Performance Shirt + Shorts for <span className="bundle-original-price">$100</span> <strong>$69</strong></span>
            <span className="bundle-subtext">Built to move together. Save $31.</span>
          </div>
        </div>

        <div className="product-row">
          <h3 className="row-title">Performance T-Shirts</h3>
          <div className="product-grid shirts-grid">
            {shirts.map((shirt, index) => {
              const selectedSize = selectedSizes[shirt.id] || 'M';
              const isAdded = addedToCart[shirt.id];
              const isMostPopular = index === 0;
              const isBlackShirt = shirt.color === 'Black';
              
              return (
                <div key={shirt.id} className={`product-card ${isMostPopular ? 'most-popular' : ''} ${isBlackShirt ? 'black-product' : ''}`}>
                  {isMostPopular && (
                    <div className="popular-badge">
                      <Star size={12} fill="currentColor" /> Most Popular
                    </div>
                  )}
                  
                  <button 
                    className={`wishlist-heart ${isInWishlist(shirt.id, shirt.variant) ? 'active' : ''}`}
                    onClick={(e) => handleWishlistToggle(e, shirt)}
                    title={isInWishlist(shirt.id, shirt.variant) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart size={18} fill={isInWishlist(shirt.id, shirt.variant) ? 'currentColor' : 'none'} />
                  </button>
                  
                  <div className="product-image-wrapper clickable">
                    <img 
                      src={shirt.image} 
                      alt={`${shirt.name} - ${shirt.variant}`}
                      className="product-image"
                    />
                    <div className="view-details-hint">Click to view</div>
                  </div>
                  
                  <div className="product-info">
                    <div className="product-variant">{shirt.variant}</div>
                    <div className="product-price-row">
                      {shirt.price < 65 && (
                        <span className="product-original-price">$65</span>
                      )}
                      <span className="product-price">${shirt.price}</span>
                    </div>
                    
                    <div className="size-selector">
                      {shirt.sizes.map((size) => (
                        <button
                          key={size}
                          className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                          onClick={() => handleSizeSelect(shirt.id, size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    <button 
                      className={`btn-add-to-cart ${isAdded ? 'added' : ''} waitlist-btn`}
                      onClick={() => handleAddToCart(shirt, true)}
                    >
                      <Lock size={16} /> Join Waitlist
                    </button>

                    <p className="bundle-upsell">
                      Pair with matching shorts — <span className="bundle-link">Bundle for $69</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="product-row shorts-row">
          <h3 className="row-title">Performance Shorts</h3>
          <p className="row-subtitle">Designed for full-range movement — built to match Performance T-Shirts</p>
          
          <div className="product-grid shorts-grid">
            {shorts.map((short) => {
              const gender = selectedGender[short.id] || 'mens';
              const sizes = gender === 'mens' ? short.mensSizes : short.womensSizes;
              const selectedSize = selectedSizes[short.id] || (gender === 'mens' ? 'M' : 'S');
              const isAdded = addedToCart[short.id];
              const isComingSoon = short.status === 'coming_soon';
              const isBlackShort = short.color === 'Black';
              
              return (
                <div key={short.id} className={`product-card ${isComingSoon ? 'coming-soon' : ''} ${isBlackShort ? 'black-product' : ''}`}>
                  {!isComingSoon && (
                    <button 
                      className={`wishlist-heart ${isInWishlist(short.id, short.variant) ? 'active' : ''}`}
                      onClick={(e) => handleWishlistToggle(e, short)}
                      title={isInWishlist(short.id, short.variant) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart size={18} fill={isInWishlist(short.id, short.variant) ? 'currentColor' : 'none'} />
                    </button>
                  )}
                  
                  <div className={`product-image-wrapper ${!isComingSoon ? 'clickable' : ''}`}>
                    {short.image ? (
                      <img 
                        src={short.image} 
                        alt={`${short.name} - ${short.variant}`}
                        className="product-image"
                      />
                    ) : (
                      <div className="product-placeholder">
                        <div className="placeholder-content">
                          <Clock size={32} />
                          <span>Coming Soon</span>
                        </div>
                      </div>
                    )}
                    {!isComingSoon && <div className="view-details-hint">Click to view</div>}
                  </div>
                  
                  <div className="product-info">
                    <div className="product-variant">{short.variant}</div>
                    <div className="product-price-row">
                      {short.price < 75 && (
                        <span className="product-original-price">$75</span>
                      )}
                      <span className="product-price">${short.price}</span>
                    </div>
                    
                    <div className="size-selector">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          className={`size-btn ${selectedSize === size ? 'active' : ''} ${isComingSoon ? 'disabled' : ''}`}
                          onClick={() => !isComingSoon && handleSizeSelect(short.id, size)}
                          disabled={isComingSoon}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    {isComingSoon ? (
                      <button className="btn-coming-soon" disabled>
                        <Clock size={16} /> Coming Soon
                      </button>
                    ) : (
                      <button 
                        className="btn-add-to-cart waitlist-btn"
                        onClick={() => handleAddToCart(short, false)}
                      >
                        <Lock size={16} /> Join Waitlist
                      </button>
                    )}

                    <p className="bundle-upsell">
                      Complete the set — <span className="bundle-link">Bundle for $69</span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
