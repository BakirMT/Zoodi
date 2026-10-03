import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Address,
  Order,
  NotificationItem,
  UserProfile,
  ScreenId,
  SortOption,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_ADDRESSES,
  INITIAL_PRODUCTS,
  INITIAL_CART,
  INITIAL_ORDERS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

interface AppContextType {
  // Navigation
  currentScreen: ScreenId;
  screenParams: any;
  navigationHistory: { screen: ScreenId; params?: any }[];
  navigate: (screen: ScreenId, params?: any) => void;
  goBack: () => void;
  
  // View & Theme
  isDarkMode: boolean;
  toggleDarkMode: (value?: boolean) => void;
  viewMode: 'mobile' | 'responsive';
  setViewMode: (mode: 'mobile' | 'responsive') => void;
  
  // User & Auth
  user: UserProfile;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  register: (name: string, email: string, phone: string, pass: string) => boolean;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  topUpWallet: (amount: number) => void;

  // Products
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedSubcategory: string;
  setSelectedSubcategory: (sub: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, color?: string, size?: string, quantity?: number) => void;
  updateCartQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartDeliveryCharge: number;
  cartTotal: number;
  couponCode: string;
  appliedCouponDiscount: number;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;

  // Wishlist
  wishlistIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCartFromWishlist: (productId: string) => void;

  // Addresses
  addresses: Address[];
  selectedAddressId: string;
  setSelectedAddressId: (id: string) => void;
  addAddress: (addr: Omit<Address, 'id'>) => void;
  updateAddress: (addr: Address) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;

  // Orders
  orders: Order[];
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  placeOrder: (options: {
    address: Address;
    deliveryOption: 'Standard' | 'Express';
    paymentMethod: string;
  }) => Order;
  cancelOrder: (orderId: string) => void;

  // Compare
  compareIds: string[];
  toggleCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;

  // Notifications
  notifications: NotificationItem[];
  unreadNotifCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  deleteNotification: (id: string) => void;

  // Settings
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
  clearCache: () => void;
  cacheSizeMB: string;

  // Toast
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation & History
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [screenParams, setScreenParams] = useState<any>({});
  const [navigationHistory, setNavigationHistory] = useState<{ screen: ScreenId; params?: any }[]>([
    { screen: 'home' },
  ]);

  // View mode and Dark mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('zoodi_dark') === 'true';
  });
  const [viewMode, setViewMode] = useState<'mobile' | 'responsive'>('mobile');

  // Sync dark class on html root & body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      root.classList.add('dark');
      body.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem('zoodi_dark', 'true');
    } else {
      root.classList.remove('dark');
      body.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('zoodi_dark', 'false');
    }
  }, [isDarkMode]);

  const toggleDarkMode = (val?: boolean) => {
    setIsDarkMode((prev) => {
      const next = val !== undefined ? val : !prev;
      showToast(next ? 'Dark Mode enabled' : 'White / Light Mode enabled', 'info');
      return next;
    });
  };

  // Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(
    null
  );
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 2800);
  };

  // User & Auth
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('zoodi_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('zoodi_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('Women');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(INITIAL_PRODUCTS[0]);

  // Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('zoodi_wishlist');
    return saved
      ? JSON.parse(saved)
      : ['prod_1', 'prod_8', 'prod_10', 'prod_5', 'prod_11', 'prod_6'];
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('zoodi_cart');
    return saved ? JSON.parse(saved) : INITIAL_CART;
  });
  const [couponCode, setCouponCode] = useState<string>('');
  const [appliedCouponDiscount, setAppliedCouponDiscount] = useState<number>(1200);

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>(() => {
    const saved = localStorage.getItem('zoodi_addresses');
    return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
  });
  const [selectedAddressId, setSelectedAddressId] = useState<string>('addr_1');

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('zoodi_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [activeOrder, setActiveOrder] = useState<Order | null>(INITIAL_ORDERS[0]);

  // Compare
  const [compareIds, setCompareIds] = useState<string[]>(['prod_8', 'prod_9']);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('zoodi_notifs');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Settings
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>('English');
  const [cacheSizeMB, setCacheSizeMB] = useState<string>('12.4 MB');

  // Save to localStorage automatically
  useEffect(() => {
    localStorage.setItem('zoodi_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('zoodi_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('zoodi_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('zoodi_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('zoodi_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('zoodi_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('zoodi_notifs', JSON.stringify(notifications));
  }, [notifications]);

  // Navigation handlers
  const navigate = (screen: ScreenId, params: any = {}) => {
    setScreenParams(params);
    setCurrentScreen(screen);
    setNavigationHistory((prev) => [...prev, { screen, params }]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop(); // remove current
      const previous = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentScreen(previous.screen);
      setScreenParams(previous.params || {});
    } else {
      setCurrentScreen('home');
      setNavigationHistory([{ screen: 'home' }]);
    }
  };

  // Auth operations
  const login = (email: string, _pass: string) => {
    setIsAuthenticated(true);
    setUser((prev) => ({
      ...prev,
      email: email || prev.email,
    }));
    showToast('Welcome back! Logged in successfully.');
    navigate('home');
    return true;
  };

  const register = (name: string, email: string, phone: string, _pass: string) => {
    setIsAuthenticated(true);
    setUser({
      name: name || 'Valued Shopper',
      email: email || 'user@zoodi.com',
      phone: phone || '+91 98765 00000',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      walletBalance: 100, // bonus welcome credits
    });
    showToast('Account created! Welcome to ZOODI Collection.');
    navigate('home');
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('Logged out successfully.', 'info');
    navigate('login');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...data }));
    showToast('Profile updated successfully.');
  };

  const topUpWallet = (amount: number) => {
    setUser((prev) => ({ ...prev, walletBalance: prev.walletBalance + amount }));
    showToast(`Added ₹${amount} to ZOODI Wallet!`);
  };

  // Product operations
  const addProduct = (prodData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...prodData,
      id: `prod_${Date.now()}`,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Added "${newProduct.name}" to catalog.`);
  };

  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProduct?.id === updated.id) {
      setSelectedProduct(updated);
    }
    showToast(`Product "${updated.name}" updated.`);
  };

  const deleteProduct = (id: string) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((c) => c.productId !== id));
    setWishlistIds((prev) => prev.filter((wId) => wId !== id));
    showToast(`Deleted "${target?.name || 'Product'}" from catalog.`, 'info');
  };

  // Cart operations
  const addToCart = (
    product: Product,
    color?: string,
    size?: string,
    quantity: number = 1
  ) => {
    const selectedColor = color || product.color;
    const selectedSize = size || product.size;
    const existingIndex = cart.findIndex(
      (item) =>
        item.productId === product.id &&
        item.color === selectedColor &&
        item.size === selectedSize
    );

    if (existingIndex > -1) {
      setCart((prev) =>
        prev.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      const newItem: CartItem = {
        id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        productId: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        color: selectedColor,
        size: selectedSize,
        quantity,
        image: product.image,
      };
      setCart((prev) => [...prev, newItem]);
    }
    showToast(`Added "${product.name}" to cart!`);
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    const item = cart.find((c) => c.id === id);
    setCart((prev) => prev.filter((c) => c.id !== id));
    showToast(`Removed "${item?.name || 'Item'}" from cart.`, 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart totals calculation
  const cartSubtotal = cart.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const cartRealPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  // Default discount difference or coupon
  const cartDiscount = Math.max(0, cartSubtotal - cartRealPrice + appliedCouponDiscount);
  const cartDeliveryCharge = cart.length === 0 || cartRealPrice > 999 ? 0 : 49;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartDeliveryCharge);

  const applyCoupon = (code: string) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'ZOODI50' || trimmed === 'FLAT50') {
      setCouponCode(trimmed);
      setAppliedCouponDiscount(1500);
      showToast('Coupon ZOODI50 applied! Flat ₹1500 OFF.');
      return { success: true, message: 'Coupon applied successfully!' };
    }
    if (trimmed === 'WELCOME100') {
      setCouponCode(trimmed);
      setAppliedCouponDiscount(500);
      showToast('Coupon WELCOME100 applied! ₹500 OFF.');
      return { success: true, message: 'Coupon applied successfully!' };
    }
    showToast('Invalid coupon code. Try ZOODI50 or WELCOME100', 'error');
    return { success: false, message: 'Invalid or expired coupon code' };
  };

  const removeCoupon = () => {
    setCouponCode('');
    setAppliedCouponDiscount(1200);
    showToast('Coupon removed.', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    const exists = wishlistIds.includes(productId);
    if (exists) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from wishlist.', 'info');
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      showToast('Saved to wishlist!');
    }
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  const moveToCartFromWishlist = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      addToCart(prod);
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
    }
  };

  // Addresses
  const addAddress = (addrData: Omit<Address, 'id'>) => {
    const newAddr: Address = {
      ...addrData,
      id: `addr_${Date.now()}`,
    };
    if (newAddr.isDefault) {
      setAddresses((prev) => [
        ...prev.map((a): Address => ({ ...a, isDefault: false })),
        newAddr,
      ]);
    } else {
      setAddresses((prev) => [...prev, newAddr]);
    }
    setSelectedAddressId(newAddr.id);
    showToast('Address saved successfully.');
  };

  const updateAddress = (updated: Address) => {
    setAddresses((prev) =>
      prev.map((a) => {
        if (a.id === updated.id) return updated;
        if (updated.isDefault) return { ...a, isDefault: false };
        return a;
      })
    );
    showToast('Address updated successfully.');
  };

  const deleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedAddressId === id) {
      const remaining = addresses.filter((a) => a.id !== id);
      if (remaining.length > 0) setSelectedAddressId(remaining[0].id);
    }
    showToast('Address deleted.', 'info');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    setSelectedAddressId(id);
    showToast('Default address updated.');
  };

  // Orders
  const placeOrder = ({
    address,
    deliveryOption,
    paymentMethod,
  }: {
    address: Address;
    deliveryOption: 'Standard' | 'Express';
    paymentMethod: string;
  }) => {
    const randomNum = Math.floor(100000000 + Math.random() * 900000000);
    const orderId = `#ZC${randomNum}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Processing',
      items: cart.map((c) => ({
        productId: c.productId,
        name: c.name,
        price: c.price,
        color: c.color,
        size: c.size,
        quantity: c.quantity,
        image: c.image,
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      deliveryCharge: deliveryOption === 'Express' ? 49 : cartDeliveryCharge,
      total:
        cartTotal + (deliveryOption === 'Express' && cartDeliveryCharge === 0 ? 49 : 0),
      shippingAddress: address,
      deliveryOption,
      paymentMethod,
      trackingId: `DLIV${Math.floor(100000000 + Math.random() * 900000000)}`,
      deliveryPartner: {
        name: 'Ramesh Kumar',
        phone: '+91 98450 12345',
        rating: 4.8,
        reviews: '2.3k',
        estimatedTime: 'Expected within 2-3 business days',
        currentLocation: 'Order Processing at Warehouse',
      },
      timeline: [
        {
          status: 'Placed',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: 'Today',
          completed: true,
          current: true,
        },
        { status: 'Packed', time: '--', date: 'Expected Tomorrow', completed: false },
        { status: 'Shipped', time: '--', date: 'Upcoming', completed: false },
        { status: 'Out for Delivery', time: '--', date: 'Upcoming', completed: false },
        { status: 'Delivered', time: '--', date: 'Upcoming', completed: false },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();

    // Add order notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      title: 'Order Placed Successfully!',
      message: `Your order ${orderId} has been placed. We are preparing it for dispatch.`,
      time: 'Just now',
      type: 'order',
      read: false,
      targetScreen: 'track_order',
      targetId: orderId,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newOrder;
  };

  const cancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'Cancelled',
              timeline: [
                ...o.timeline,
                {
                  status: 'Cancelled',
                  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                  date: 'Today',
                  completed: true,
                  current: true,
                },
              ],
            }
          : o
      )
    );
    showToast(`Order ${orderId} has been cancelled.`, 'info');
  };

  // Compare
  const toggleCompare = (productId: string) => {
    if (compareIds.includes(productId)) {
      setCompareIds((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from compare.', 'info');
    } else {
      if (compareIds.length >= 3) {
        showToast('You can compare maximum 3 products at a time.', 'error');
        return;
      }
      setCompareIds((prev) => [...prev, productId]);
      showToast('Added to product comparison!');
    }
  };

  const removeFromCompare = (productId: string) => {
    setCompareIds((prev) => prev.filter((id) => id !== productId));
    showToast('Removed product from comparison.', 'info');
  };

  const clearCompare = () => {
    setCompareIds([]);
    showToast('Cleared all products from comparison.', 'info');
  };

  // Notifications
  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Clear cache
  const clearCache = () => {
    setCacheSizeMB('0.0 KB');
    showToast('Cache cleared successfully! 12.4 MB freed.');
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        screenParams,
        navigationHistory,
        navigate,
        goBack,
        isDarkMode,
        toggleDarkMode,
        viewMode,
        setViewMode,
        user,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
        topUpWallet,
        products,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedSubcategory,
        setSelectedSubcategory,
        sortBy,
        setSortBy,
        selectedProduct,
        setSelectedProduct,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartDeliveryCharge,
        cartTotal,
        couponCode,
        appliedCouponDiscount,
        applyCoupon,
        removeCoupon,
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        moveToCartFromWishlist,
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        activeOrder,
        setActiveOrder,
        placeOrder,
        cancelOrder,
        compareIds,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        notifications,
        unreadNotifCount,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        notificationsEnabled,
        setNotificationsEnabled,
        language,
        setLanguage,
        clearCache,
        cacheSizeMB,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
