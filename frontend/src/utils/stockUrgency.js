// Generate random stock numbers per device

const STORAGE_KEY = 'raze_stock_counts';

const generateRandomStock = () => Math.floor(Math.random() * 15) + 1;

export const getStockCount = (productId) => {
  try {
    let stockCounts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    
    if (!stockCounts[productId]) {
      stockCounts[productId] = generateRandomStock();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stockCounts));
    }
    
    return stockCounts[productId];
  } catch (e) {
    return generateRandomStock();
  }
};

export const initializeStockCounts = (productIds) => {
  try {
    let stockCounts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    let updated = false;
    
    productIds.forEach(id => {
      if (!stockCounts[id]) {
        stockCounts[id] = generateRandomStock();
        updated = true;
      }
    });
    
    if (updated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stockCounts));
    }
    
    return stockCounts;
  } catch (e) {
    const counts = {};
    productIds.forEach(id => {
      counts[id] = generateRandomStock();
    });
    return counts;
  }
};
