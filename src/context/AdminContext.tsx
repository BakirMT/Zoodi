import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AdminTab,
  AdminBanner,
  BannerSettings,
  AdminCustomer,
  AdminCoupon,
} from '../types/admin';

interface AdminContextType {
  isStoreMode: boolean;
  setIsStoreMode: (storeMode: boolean) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  // Banners
  banners: AdminBanner[];
  bannerSettings: BannerSettings;
  updateBannerSettings: (settings: Partial<BannerSettings>) => void;
  addBanner: (banner: Omit<AdminBanner, 'id'>) => void;
  updateBanner: (banner: AdminBanner) => void;
  deleteBanner: (id: string) => void;
  toggleBannerStatus: (id: string) => void;

  // Customers
  customers: AdminCustomer[];
  selectedCustomerId: string;
  setSelectedCustomerId: (id: string) => void;

  // Selected drill-down IDs
  selectedOrderId: string;
  setSelectedOrderId: (id: string) => void;
  selectedBannerId: string;
  setSelectedBannerId: (id: string) => void;
  selectedAdminProductId: string;
  setSelectedAdminProductId: (id: string) => void;

  // Coupons
  coupons: AdminCoupon[];
  addCoupon: (coupon: Omit<AdminCoupon, 'id' | 'usageCount'>) => void;
  deleteCoupon: (id: string) => void;

  // Metrics
  totalRevenue: number;
  totalOrdersCount: number;
}

const INITIAL_BANNERS: AdminBanner[] = [
  {
    id: 'ban_1',
    title: 'Style for Every You',
    tag: 'NEW SEASON 2026',
    buttonText: 'Shop Now →',
    linkType: 'category',
    targetCategory: 'Women',
    targetProductId: 'prod_1',
    type: 'Main Banner',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    status: 'Active',
    startDate: '02 Oct 2026',
    endDate: '31 Oct 2026',
  },
  {
    id: 'ban_2',
    title: 'Autumn Elegance Collection',
    tag: 'TRENDING NOW',
    buttonText: 'Explore Collection →',
    linkType: 'category',
    targetCategory: 'Women',
    targetProductId: 'prod_1',
    type: 'Offer Banner',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
    status: 'Active',
    startDate: '01 Oct 2026',
    endDate: '15 Oct 2026',
  },
  {
    id: 'ban_3',
    title: 'Summer Vintage Archive',
    tag: 'CLEARANCE',
    buttonText: 'View Archive →',
    linkType: 'category',
    targetCategory: 'Men',
    targetProductId: 'prod_2',
    type: 'Category Banner',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    status: 'Inactive',
    startDate: '15 Aug 2026',
    endDate: '30 Sep 2026',
  },
  {
    id: 'ban_4',
    title: 'Festive Season Grand Sale',
    tag: 'FLAT 50% OFF',
    buttonText: 'Claim Deals →',
    linkType: 'product',
    targetCategory: 'Footwear',
    targetProductId: 'prod_3',
    type: 'Offer Banner',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80',
    status: 'Active',
    startDate: '10 Oct 2026',
    endDate: '05 Nov 2026',
  },
];

const INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: 'cust_1',
    name: 'Ayesha Khan',
    email: 'ayesha@gmail.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    joinedDate: '12-09-2026',
    totalOrders: 3,
    totalSpent: 8497,
    walletBalance: 500,
  },
  {
    id: 'cust_2',
    name: 'Fathima Noushad',
    email: 'fathima@gmail.com',
    phone: '+91 98765 43211',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    joinedDate: '08-09-2026',
    totalOrders: 2,
    totalSpent: 3899,
    walletBalance: 250,
  },
  {
    id: 'cust_3',
    name: 'Muhammed Rizwan',
    email: 'rizwan@gmail.com',
    phone: '+91 98765 43212',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    joinedDate: '02-09-2026',
    totalOrders: 5,
    totalSpent: 12450,
    walletBalance: 1200,
  },
  {
    id: 'cust_4',
    name: 'Sadiya P',
    email: 'sadiya@gmail.com',
    phone: '+91 98765 43213',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    joinedDate: '28-08-2026',
    totalOrders: 4,
    totalSpent: 9600,
    walletBalance: 800,
  },
  {
    id: 'cust_5',
    name: 'Amal K',
    email: 'amal@gmail.com',
    phone: '+91 98765 43214',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    joinedDate: '22-08-2026',
    totalOrders: 1,
    totalSpent: 1199,
    walletBalance: 100,
  },
];

const INITIAL_COUPONS: AdminCoupon[] = [
  {
    id: 'coup_1',
    code: 'ZOODI50',
    discountPercent: 50,
    minPurchase: 999,
    expiryDate: '31 Oct 2026',
    status: 'Active',
    usageCount: 428,
  },
  {
    id: 'coup_2',
    code: 'WELCOME100',
    discountPercent: 15,
    minPurchase: 500,
    expiryDate: '31 Dec 2026',
    status: 'Active',
    usageCount: 890,
  },
  {
    id: 'coup_3',
    code: 'FESTIVE25',
    discountPercent: 25,
    minPurchase: 1499,
    expiryDate: '15 Nov 2026',
    status: 'Active',
    usageCount: 165,
  },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mode: false = Admin view, true = Storefront view
  const [isStoreMode, setIsStoreMode] = useState<boolean>(() => {
    return localStorage.getItem('zoodi_mode') === 'store';
  });

  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Selected items
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('cust_1');
  const [selectedOrderId, setSelectedOrderId] = useState<string>('#ZC10324');
  const [selectedBannerId, setSelectedBannerId] = useState<string>('ban_1');
  const [selectedAdminProductId, setSelectedAdminProductId] = useState<string>('prod_1');

  // Banners
  const [banners, setBanners] = useState<AdminBanner[]>(() => {
    const saved = localStorage.getItem('zoodi_admin_banners');
    if (!saved) return INITIAL_BANNERS;
    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0) return INITIAL_BANNERS;
      if (!parsed[0].tag || parsed[0].image.includes('1483985988355')) {
        return INITIAL_BANNERS;
      }
      return parsed;
    } catch {
      return INITIAL_BANNERS;
    }
  });

  const [bannerSettings, setBannerSettings] = useState<BannerSettings>(() => {
    try {
      const saved = localStorage.getItem('zoodi_banner_settings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { autoSlide: true, intervalSeconds: 3, pauseOnHover: true };
  });

  const updateBannerSettings = (newSettings: Partial<BannerSettings>) => {
    setBannerSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      try {
        localStorage.setItem('zoodi_banner_settings', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  useEffect(() => {
    localStorage.setItem('zoodi_admin_banners', JSON.stringify(banners));
  }, [banners]);

  // Customers
  const [customers, setCustomers] = useState<AdminCustomer[]>(() => {
    const saved = localStorage.getItem('zoodi_admin_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  // Coupons
  const [coupons, setCoupons] = useState<AdminCoupon[]>(() => {
    const saved = localStorage.getItem('zoodi_admin_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const addBanner = (bannerData: Omit<AdminBanner, 'id'>) => {
    const newBanner: AdminBanner = {
      ...bannerData,
      id: `ban_${Date.now()}`,
    };
    setBanners((prev) => [newBanner, ...prev]);
  };

  const updateBanner = (updated: AdminBanner) => {
    setBanners((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  const deleteBanner = (id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  };

  const toggleBannerStatus = (id: string) => {
    setBanners((prev) =>
      prev.map((b) =>
        b.id === id
          ? { ...b, status: b.status === 'Active' ? 'Inactive' : 'Active' }
          : b
      )
    );
  };

  const addCoupon = (coupData: Omit<AdminCoupon, 'id' | 'usageCount'>) => {
    const newC: AdminCoupon = {
      ...coupData,
      id: `coup_${Date.now()}`,
      usageCount: 0,
    };
    setCoupons((prev) => [newC, ...prev]);
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSetIsStoreMode = (storeMode: boolean) => {
    setIsStoreMode(storeMode);
    localStorage.setItem('zoodi_mode', storeMode ? 'store' : 'admin');
  };

  return (
    <AdminContext.Provider
      value={{
        isStoreMode,
        setIsStoreMode: handleSetIsStoreMode,
        adminTab,
        setAdminTab,
        sidebarOpen,
        setSidebarOpen,
        banners,
        bannerSettings,
        updateBannerSettings,
        addBanner,
        updateBanner,
        deleteBanner,
        toggleBannerStatus,
        customers,
        selectedCustomerId,
        setSelectedCustomerId,
        selectedOrderId,
        setSelectedOrderId,
        selectedBannerId,
        setSelectedBannerId,
        selectedAdminProductId,
        setSelectedAdminProductId,
        coupons,
        addCoupon,
        deleteCoupon,
        totalRevenue: 428750,
        totalOrdersCount: 1248,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
