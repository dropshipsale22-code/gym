import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from './ui/badge';
import { Star } from 'lucide-react';

const ProductCard = ({ product, onClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      // If onClick prop is provided, use it (for modal behavior)
      onClick(product);
    } else if (product.inStock) {
      // Otherwise, navigate to product detail page
      navigate(`/products/${product.id}`);
    }
  };

  const getStockStatus = () => {
    if (!product.inStock) return 'Sold Out';
    return null;
  };

  const stockStatus = getStockStatus();

  return (
    <div 
      className={`product-card-shop ${product.inStock || onClick ? 'clickable' : ''}`}
      onClick={handleClick}
    >
      <div className="product-image-wrapper-shop">
        {product.images?.[0] ? (
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="product-image-shop"
          />
        ) : (
          <div className="product-placeholder-shop">
            <span className="placeholder-text-shop">{stockStatus || product.name}</span>
          </div>
        )}
        {product.mostPopular && (
          <Badge className="product-badge-shop popular">
            <Star size={10} fill="currentColor" /> Most Popular
          </Badge>
        )}
        {stockStatus && (
          <Badge className="product-badge-shop soldout">{stockStatus}</Badge>
        )}
      </div>
      
      <div className="product-info-shop">
        <h3 className="product-name-shop">{product.name}</h3>
        <p className="product-variant-shop">{product.variant}</p>
        <p className="product-description-shop">{product.description}</p>
        
        <div className="product-footer-shop">
          {product.inStock ? (
            <>
              <div className="product-price-shop">
                {product.originalPrice && (
                  <span className="original-price">${product.originalPrice}</span>
                )}
                <span className="current-price">${product.price}</span>
              </div>
              <span className="shop-link">Shop →</span>
            </>
          ) : (
            <span className="product-status-shop">{stockStatus}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
