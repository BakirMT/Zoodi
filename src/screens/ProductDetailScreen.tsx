import React, { useState } from 'react';
import {
  Star,
  Heart,
  Share2,
  Check,
  ShoppingBag,
  Sparkles,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  Scale,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductImage } from '../components/ProductImage';

export const ProductDetailScreen: React.FC = () => {
  const {
    selectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    toggleCompare,
    compareIds,
    showToast,
    navigate,
  } = useApp();

  const product = selectedProduct;

  const [selectedColor, setSelectedColor] = useState<string>(product?.color || 'Yellow');
  const [selectedSize, setSelectedSize] = useState<string>(product?.size || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-sm text-slate-500">No product selected.</p>
        <button
          onClick={() => navigate('home')}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-xl text-xs"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const gallery =
    product.images && product.images.length > 0 ? product.images : [product.image];

  const wishlisted = isInWishlist(product.id);
  const isCompared = compareIds.includes(product.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    } else {
      showToast('Link ready to share!');
    }
  };

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  return (
    <div className="pb-40 flex flex-col">
      {/* Product Image Stage */}
      <div className="relative aspect-4/5 w-full bg-slate-100 dark:bg-slate-800">
        <ProductImage
          src={gallery[activeImageIdx % gallery.length] || product.image}
          alt={product.name}
          category={product.category}
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Multi-image photo count badge */}
        {gallery.length > 1 && (
          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold z-10">
            {activeImageIdx + 1} / {gallery.length}
          </span>
        )}

        {/* Top Floating Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-2 z-10">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share product"
            className="w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-sm active:scale-90 transition-transform"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            aria-label="Toggle wishlist"
            className="w-9 h-9 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-xs flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-sm active:scale-90 transition-transform"
          >
            <Heart
              className={`w-4 h-4 ${
                wishlisted ? 'fill-pink-500 text-pink-500' : 'text-slate-700 dark:text-slate-300'
              }`}
            />
          </button>
        </div>

        {/* Discount badge */}
        {product.discountPercent > 0 && (
          <span className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-pink-500 text-white text-xs font-bold shadow-md z-10">
            {product.discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Multi-Image Gallery Thumbnails Strip */}
      {gallery.length > 1 && (
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {gallery.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIdx(idx)}
              className={`relative w-14 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                activeImageIdx === idx
                  ? 'border-[#DF1951] ring-2 ring-rose-500/20 scale-105'
                  : 'border-slate-200 dark:border-slate-700 opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Main Info */}
      <div className="p-4 flex flex-col gap-4">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold">
              ZOODI {product.category}
            </span>

            {/* Compare Button */}
            <button
              type="button"
              onClick={() => toggleCompare(product.id)}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                isCompared
                  ? 'bg-teal-500 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Scale className="w-3 h-3" />
              <span>{isCompared ? 'In Compare' : 'Compare'}</span>
            </button>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-1.5">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              ({product.reviewsCount.toLocaleString()} reviews)
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold ml-auto">
              In Stock
            </span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-slate-400 dark:text-slate-500 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs font-bold text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/50 px-2 py-0.5 rounded-md">
              {product.discountPercent}% OFF
            </span>
          </div>
        </div>

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Color: <span className="font-normal text-slate-500">{selectedColor}</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => {
                const isSelected = selectedColor === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? 'ring-2 ring-pink-500 ring-offset-2 dark:ring-offset-slate-900 scale-110'
                        : 'hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {isSelected && (
                      <Check
                        className={`w-4 h-4 stroke-[3] ${
                          c.hex.toLowerCase() === '#ffffff' ? 'text-black' : 'text-white'
                        }`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Size Selection */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Size: <span className="font-normal text-slate-500">{selectedSize}</span>
              </span>
              <button
                type="button"
                onClick={() => setShowSizeGuide(true)}
                className="text-xs text-pink-600 dark:text-pink-400 font-semibold hover:underline flex items-center gap-1"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => {
                const isSelected = selectedSize === s;
                return (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-10 h-10 px-3 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                      isSelected
                        ? 'bg-pink-500 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 dark:text-white">Quantity</span>
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-6 h-6 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white active:scale-90"
            >
              -
            </button>
            <span className="text-xs font-bold w-4 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-6 h-6 flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 hover:text-black dark:hover:text-white active:scale-90"
            >
              +
            </button>
          </div>
        </div>

        {/* Product Details Section (Matching Screenshot 7) */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
            Product Details
          </h3>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            {Object.entries(product.specs || {}).map(([key, val]) => (
              <li key={key} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0" />
                <span>
                  <strong className="text-slate-900 dark:text-white">{key}:</strong> {val}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-2 py-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-3 text-center border border-slate-100 dark:border-slate-800">
          <div className="flex flex-col items-center">
            <Truck className="w-4 h-4 text-teal-500 mb-1" />
            <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">
              Free Delivery
            </span>
            <span className="text-[9px] text-slate-400">On ₹999+</span>
          </div>
          <div className="flex flex-col items-center">
            <RotateCcw className="w-4 h-4 text-amber-500 mb-1" />
            <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">
              7 Days Return
            </span>
            <span className="text-[9px] text-slate-400">Easy refund</span>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
            <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">
              100% Genuine
            </span>
            <span className="text-[9px] text-slate-400">Verified seller</span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar above BottomNav */}
      <div className="fixed bottom-[60px] left-0 right-0 max-w-md mx-auto z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-3 flex items-center gap-3 shadow-lg">
        <button
          type="button"
          aria-label="Wishlist"
          onClick={() => toggleWishlist(product.id)}
          className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
            wishlisted
              ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/40 text-pink-500'
              : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
          }`}
        >
          <Heart className={`w-5 h-5 ${wishlisted ? 'fill-pink-500' : ''}`} />
        </button>

        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 h-12 rounded-2xl bg-pink-500 hover:bg-pink-600 active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-pink-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 w-full max-w-sm border border-slate-200 dark:border-slate-800 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Standard Size Guide
              </h3>
              <button
                type="button"
                onClick={() => setShowSizeGuide(false)}
                className="p-1 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-4 overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400">
                    <th className="py-2">Size</th>
                    <th className="py-2">Bust (in)</th>
                    <th className="py-2">Waist (in)</th>
                    <th className="py-2">Hip (in)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                  <tr>
                    <td className="py-2 font-bold">XS</td>
                    <td>32</td>
                    <td>26</td>
                    <td>35</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold">S</td>
                    <td>34</td>
                    <td>28</td>
                    <td>37</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold">M</td>
                    <td>36</td>
                    <td>30</td>
                    <td>39</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold">L</td>
                    <td>38</td>
                    <td>32</td>
                    <td>41</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold">XL</td>
                    <td>40</td>
                    <td>34</td>
                    <td>43</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={() => setShowSizeGuide(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
