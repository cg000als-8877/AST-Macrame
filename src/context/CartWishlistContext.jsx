import React, { createContext, useContext, useState, useEffect } from 'react';

import b1 from '../assets/products/Black/1.webp';
import n1 from '../assets/products/Navy/1.webp';
import br1 from '../assets/products/Brown/1.webp';
import m1 from '../assets/products/Maroon/1.webp';
import k1 from '../assets/products/Khaki/1.webp';

export const colorImageMap = {
  Black: b1,
  Navy: n1,
  Brown: br1,
  Maroon: m1,
  Khaki: k1,
};

const CartWishlistContext = createContext();

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};

// Strategic volume pricing formula (850 base price)
export const calculateTierPriceBDT = (totalQty) => {
  if (totalQty <= 0) return 0;
  if (totalQty === 1) return 850;
  if (totalQty === 2) return 1600; // 800/pc (Save 100)
  if (totalQty === 3) return 2250; // 750/pc (Save 300)
  if (totalQty === 4) return 2880; // 720/pc (Save 520)
  return totalQty * 690;           // 690/pc (Save 800+ for 5)
};

export const CartWishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('ast_sample_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ast_sample_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Localization state
  const [localCurrency, setLocalCurrency] = useState('BDT');
  const [currencySymbol, setCurrencySymbol] = useState('৳');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [userCountry, setUserCountry] = useState('Bangladesh');
  const [userCountryCode, setUserCountryCode] = useState('BD');
  const [userCallingCode, setUserCallingCode] = useState('+880');
  const [shippingCostLocal, setShippingCostLocal] = useState(120);

  useEffect(() => {
    try {
      localStorage.setItem('ast_sample_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('ast_sample_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  // Fetch localization
  useEffect(() => {
    let isMounted = true;
    const fetchLocalization = async () => {
      try {
        const ipRes = await fetch('https://ipapi.co/json/');
        const ipData = await ipRes.json();
        
        const currencyCode = ipData.currency || 'USD';
        const country = ipData.country_name || 'United States';
        const countryCode = ipData.country_code || 'US';
        const callingCode = ipData.country_calling_code || '+1';
        
        const symbolMap = { 'USD': '$', 'EUR': '€', 'GBP': '£', 'BDT': '৳', 'CAD': 'C$', 'AUD': 'A$' };
        const symbol = symbolMap[currencyCode] || currencyCode + ' ';
        
        if (!isMounted) return;
        setUserCountry(country);
        setUserCountryCode(countryCode);
        setUserCallingCode(callingCode);
        setLocalCurrency(currencyCode);
        setCurrencySymbol(symbol);

        const erRes = await fetch('https://api.exchangerate-api.com/v4/latest/BDT');
        const erData = await erRes.json();
        const rate = erData.rates[currencyCode] || 1;
        
        if (!isMounted) return;
        setExchangeRate(rate);

        let baseShippingBDT = 2500;
        if (ipData.country_code === 'US') baseShippingBDT = 1500;
        else if (ipData.continent_code === 'EU') baseShippingBDT = 2000;
        else if (ipData.country_code === 'BD') baseShippingBDT = 130;
        
        setShippingCostLocal(baseShippingBDT * rate);
      } catch (err) {
        console.error("Failed to load localization data", err);
      }
    };

    fetchLocalization();
    return () => { isMounted = false; };
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2600);
  };

  // Wishlist actions
  const addToWishlist = (item) => {
    const id = `${item.color || 'Black'}-${item.size || 'M'}`;
    const exists = wishlist.some(w => w.id === id);
    if (!exists) {
      const newItem = {
        id,
        title: item.title || 'AST Handmade Macramé Belt',
        color: item.color || 'Black',
        size: item.size || 'M',
        priceBDT: 850,
        image: colorImageMap[item.color] || b1,
        addedAt: Date.now()
      };
      setWishlist(prev => [newItem, ...prev]);
      showToast('Added to Wishlist ❤️');
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(prev => prev.filter(w => w.id !== id));
    showToast('Removed from Wishlist');
  };

  const isInWishlist = (color, size) => {
    const id = `${color}-${size}`;
    return wishlist.some(w => w.id === id);
  };

  const toggleWishlist = (item) => {
    const id = `${item.color || 'Black'}-${item.size || 'M'}`;
    if (wishlist.some(w => w.id === id)) {
      removeFromWishlist(id);
      return false;
    } else {
      addToWishlist(item);
      return true;
    }
  };

  // Cart actions
  const addToCart = (item, qty = 1) => {
    const id = `${item.color || 'Black'}-${item.size || 'M'}`;
    setCart(prev => {
      const existingIndex = prev.findIndex(c => c.id === id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty
        };
        return updated;
      } else {
        const newItem = {
          id,
          title: item.title || 'AST Handmade Macramé Belt',
          color: item.color || 'Black',
          size: item.size || 'M',
          quantity: qty,
          basePriceBDT: 850,
          image: colorImageMap[item.color] || b1
        };
        return [...prev, newItem];
      }
    });
    showToast(`Added ${qty} ${qty > 1 ? 'items' : 'item'} to Sample Cart 🛍️`);
  };

  const updateCartQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    showToast('Removed from Cart');
  };

  const clearCart = () => {
    setCart([]);
  };

  const moveToCartFromWishlist = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item.id);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
  };

  // Aggregated calculations
  const totalCartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistCount = wishlist.length;

  const totalPriceBDT = calculateTierPriceBDT(totalCartQuantity);
  const regularPriceBDT = totalCartQuantity * 850;
  const savingsBDT = Math.max(0, regularPriceBDT - totalPriceBDT);

  const totalPriceLocal = totalPriceBDT * exchangeRate;
  const regularPriceLocal = regularPriceBDT * exchangeRate;
  const savingsLocal = savingsBDT * exchangeRate;
  const unitPriceLocal = totalCartQuantity > 0 ? totalPriceLocal / totalCartQuantity : 850 * exchangeRate;

  return (
    <CartWishlistContext.Provider
      value={{
        wishlist,
        cart,
        isWishlistOpen,
        setIsWishlistOpen,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        moveToCartFromWishlist,
        totalCartQuantity,
        totalWishlistCount,
        totalPriceBDT,
        regularPriceBDT,
        savingsBDT,
        totalPriceLocal,
        regularPriceLocal,
        savingsLocal,
        unitPriceLocal,
        localCurrency,
        currencySymbol,
        exchangeRate,
        userCountry,
        userCountryCode,
        userCallingCode,
        shippingCostLocal,
        showToast
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};
