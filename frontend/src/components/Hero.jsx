import React, { useState } from 'react';
import { Button } from './ui/button';
import { heroProduct } from '../data/mock';

const Hero = ({ onEarlyAccessClick }) => {
  const [showBack, setShowBack] = useState(false);
  
  const currentImage = showBack ? heroProduct.backImage : heroProduct.image;

  return (
    <section className="hero-section">
      <div className="hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">RAZE</h1>
          <p className="hero-tagline">BUILT BY DISCIPLINE</p>
          <p className="hero-description">
            Minimalist performance training wear engineered for gymnastics — Designed for those who value freedom of movement, in and out of training.
          </p>
          <div className="hero-cta">
            <Button 
              className="btn-primary"
              onClick={() => {
                document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              SHOP NOW
            </Button>
          </div>
        </div>

        <div className="hero-product-display">
          <div className="hero-image-container">
            <div className="hero-shirt-glow-layer" />
            <img 
              src={currentImage}
              alt={`Performance T-Shirt - ${showBack ? 'Back' : 'Front'} View`}
              className="hero-shirt-single"
            />
          </div>
          
          <div className="hero-view-toggle">
            <button 
              className={`toggle-btn ${!showBack ? 'active' : ''}`}
              onClick={() => setShowBack(false)}
            >
              Front
            </button>
            <button 
              className={`toggle-btn ${showBack ? 'active' : ''}`}
              onClick={() => setShowBack(true)}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
