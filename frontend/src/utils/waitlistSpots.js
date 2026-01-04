// Shared waitlist spots calculation logic

export const calculateSpotsRemaining = () => {
  const STORAGE_KEY = 'raze_waitlist_spots';
  const TIMESTAMP_KEY = 'raze_waitlist_timestamp';
  
  const now = Date.now();
  const stored = localStorage.getItem(STORAGE_KEY);
  const timestamp = localStorage.getItem(TIMESTAMP_KEY);
  
  if (!stored || !timestamp) {
    const initialSpots = Math.floor(Math.random() * 39) + 51; // 51-89
    localStorage.setItem(STORAGE_KEY, initialSpots.toString());
    localStorage.setItem(TIMESTAMP_KEY, now.toString());
    return initialSpots;
  }
  
  const timeDiff = now - parseInt(timestamp);
  const twoHours = 2 * 60 * 60 * 1000;
  
  if (timeDiff >= twoHours) {
    const currentSpots = parseInt(stored);
    const newSpots = Math.max(1, currentSpots - 2);
    
    localStorage.setItem(STORAGE_KEY, newSpots.toString());
    localStorage.setItem(TIMESTAMP_KEY, now.toString());
    return newSpots;
  }
  
  return parseInt(stored);
};
