import React, { useState, useEffect } from 'react';
import { Flame, Clock, Users } from 'lucide-react';
import { calculateSpotsRemaining } from '../utils/waitlistSpots';

const WaitlistBanner = ({ onClick }) => {
  const [spotsRemaining, setSpotsRemaining] = useState(null);

  useEffect(() => {
    const spots = calculateSpotsRemaining();
    setSpotsRemaining(spots);
  }, []);

  return (
    <div className="waitlist-banner" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div className="banner-content">
        <div className="banner-left">
          <Flame size={20} className="banner-icon" />
          <span className="sold-out-text">FIRST DROP SOLD OUT</span>
        </div>
        
        <div className="banner-center">
          <Clock size={16} />
          <span>Next Drop: <strong>Feb 2</strong> • Waitlist Only</span>
        </div>
        
        <div className="banner-right">
          <Users size={16} />
          <span>
            {spotsRemaining !== null ? (
              <>Only <strong>{spotsRemaining}</strong> {spotsRemaining === 1 ? 'spot' : 'spots'} left</>
            ) : (
              'Limited spots'
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WaitlistBanner;
