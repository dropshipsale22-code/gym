import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch(`${API_URL}/api/auth/me`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'Login failed');
    }

    setUser(data.user);
    return data.user;
  };

  const register = async (email, password, name, additionalInfo = {}) => {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ 
        email, 
        password, 
        name,
        gymnastics_type: additionalInfo.gymnastics_type,
        gender: additionalInfo.gender,
        age: additionalInfo.age
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'Registration failed');
    }

    setUser(data.user);
    return data.user;
  };

  const loginWithGoogle = () => {
    const redirectUrl = window.location.origin + '/auth/callback';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  const exchangeSession = async (sessionId) => {
    const response = await fetch(`${API_URL}/api/auth/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ session_id: sessionId })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'Session exchange failed');
    }

    setUser(data.user);
    return data.user;
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
  };

  const getUserOrders = async () => {
    const response = await fetch(`${API_URL}/api/auth/orders`, {
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }

    return response.json();
  };

  const hasFirstOrderDiscount = () => {
    return user && !user.has_used_first_order_discount && user.first_order_discount_code;
  };

  const getFirstOrderDiscountCode = () => {
    if (hasFirstOrderDiscount()) {
      return user.first_order_discount_code;
    }
    return null;
  };

  const validateFirstOrderDiscount = async (code) => {
    const response = await fetch(`${API_URL}/api/auth/validate-first-order-discount`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ code })
    });

    return response.json();
  };

  const useFirstOrderDiscount = async () => {
    const response = await fetch(`${API_URL}/api/auth/use-first-order-discount`, {
      method: 'POST',
      credentials: 'include'
    });

    if (response.ok) {
      setUser(prev => ({
        ...prev,
        has_used_first_order_discount: true,
        order_count: (prev.order_count || 0) + 1
      }));
    }

    return response.json();
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      loginWithGoogle,
      exchangeSession,
      logout,
      checkAuth,
      getUserOrders,
      isAuthenticated: !!user,
      hasFirstOrderDiscount,
      getFirstOrderDiscountCode,
      validateFirstOrderDiscount,
      useFirstOrderDiscount
    }}>
      {children}
    </AuthContext.Provider>
  );
};
