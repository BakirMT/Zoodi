import React, { useState } from 'react';
import {
  Check,
  CreditCard,
  MapPin,
  Truck,
  ShieldCheck,
  Wallet,
  Building,
  Banknote,
  Edit2,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CheckoutScreen: React.FC = () => {
  const {
    cart,
    cartTotal,
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    placeOrder,
    navigate,
    showToast,
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [deliveryOption, setDeliveryOption] = useState<'Standard' | 'Express'>('Standard');
  const [paymentMethod, setPaymentMethod] = useState<string>('UPI');
  const [upiId, setUpiId] = useState('afneel@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('842');
  const [showAddressPicker, setShowAddressPicker] = useState(false);

  const currentAddress =
    addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handlePlaceOrder = () => {
    if (!currentAddress) {
      showToast('Please select or add a shipping address', 'error');
      return;
    }
    const order = placeOrder({
      address: currentAddress,
      deliveryOption,
      paymentMethod,
    });
    navigate('order_placed', { orderId: order.id });
  };

  const finalAmount =
    cartTotal + (deliveryOption === 'Express' ? 49 : 0);

  return (
    <div className="pb-36 p-4 flex flex-col gap-4">
      {/* Stepper (1 Shipping, 2 Payment, 3 Review) */}
      <div className="flex items-center justify-between px-3 py-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-1.5">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step >= 1 ? 'bg-pink-500 text-white' : 'bg-slate-200 text-slate-500'
            }`}
          >
            1
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Shipping
          </span>
        </div>

        <div className="w-6 h-0.5 bg-slate-200 dark:bg-slate-700" />

        <div className="flex items-center gap-1.5">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step >= 2 ? 'bg-pink-500 text-white' : 'bg-slate-200 text-slate-500'
            }`}
          >
            2
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Payment
          </span>
        </div>

        <div className="w-6 h-0.5 bg-slate-200 dark:bg-slate-700" />

        <div className="flex items-center gap-1.5">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
              step >= 3 ? 'bg-pink-500 text-white' : 'bg-slate-200 text-slate-500'
            }`}
          >
            3
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
            Review
          </span>
        </div>
      </div>

      {/* Shipping Address Card (Matching Screenshot 9) */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-pink-500" />
            <span>Shipping Address</span>
          </h3>
          <button
            type="button"
            onClick={() => setShowAddressPicker(true)}
            className="text-xs font-bold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1"
          >
            <Edit2 className="w-3 h-3" />
            <span>Change</span>
          </button>
        </div>

        {currentAddress ? (
          <div className="text-xs text-slate-600 dark:text-slate-300">
            <p className="font-bold text-slate-900 dark:text-white text-sm">
              {currentAddress.name}
            </p>
            <p className="mt-1">
              {currentAddress.addressLine}, {currentAddress.city} - {currentAddress.pincode}
            </p>
            <p className="text-slate-400 dark:text-slate-500 mt-1">
              Phone: {currentAddress.phone}
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => navigate('addresses')}
            className="w-full py-3 rounded-xl border border-dashed border-pink-500 text-pink-500 text-xs font-bold"
          >
            + Add Shipping Address
          </button>
        )}
      </div>

      {/* Delivery Options (Matching Screenshot 9) */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-teal-500" />
          <span>Delivery Options</span>
        </h3>

        <div className="flex flex-col gap-2.5">
          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="delivery"
                checked={deliveryOption === 'Standard'}
                onChange={() => setDeliveryOption('Standard')}
                className="accent-pink-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Standard Delivery
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Estimated 3-5 business days
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              FREE
            </span>
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="delivery"
                checked={deliveryOption === 'Express'}
                onChange={() => setDeliveryOption('Express')}
                className="accent-pink-500"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Express Delivery
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Estimated 1-2 business days
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              ₹49
            </span>
          </label>
        </div>
      </div>

      {/* Payment Method (Matching Screenshot 9) */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xs">
        <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5 text-pink-500" />
          <span>Payment Method</span>
        </h3>

        <div className="flex flex-col gap-2">
          {/* UPI */}
          <label className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'UPI'}
                  onChange={() => setPaymentMethod('UPI')}
                  className="accent-pink-500"
                />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  UPI (Google Pay / PhonePe / Paytm)
                </span>
              </div>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-bold bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded">
                Instant
              </span>
            </div>
            {paymentMethod === 'UPI' && (
              <div className="pl-6 pt-1">
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="Enter UPI ID (e.g. mobile@upi)"
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-pink-500"
                />
              </div>
            )}
          </label>

          {/* Credit / Debit Card */}
          <label className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'Card'}
                  onChange={() => setPaymentMethod('Card')}
                  className="accent-pink-500"
                />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Credit / Debit Card
                </span>
              </div>
            </div>
            {paymentMethod === 'Card' && (
              <div className="pl-6 pt-1 flex flex-col gap-2">
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Card Number"
                  className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-pink-500"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-pink-500"
                  />
                  <input
                    type="password"
                    maxLength={3}
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="CVV"
                    className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>
            )}
          </label>

          {/* Cash on Delivery */}
          <label className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'COD'}
                onChange={() => setPaymentMethod('COD')}
                className="accent-pink-500"
              />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Cash on Delivery
              </span>
            </div>
            <Banknote className="w-4 h-4 text-slate-400" />
          </label>

          {/* Net Banking */}
          <label className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 cursor-pointer flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'NetBanking'}
                onChange={() => setPaymentMethod('NetBanking')}
                className="accent-pink-500"
              />
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                Net Banking
              </span>
            </div>
            <Building className="w-4 h-4 text-slate-400" />
          </label>
        </div>
      </div>

      {/* Sticky Place Order CTA (Matching Screenshot 9) */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 shadow-lg">
        <button
          type="button"
          onClick={handlePlaceOrder}
          className="w-full h-12 rounded-2xl bg-pink-500 hover:bg-pink-600 active:scale-[0.98] text-white font-bold text-sm shadow-md shadow-pink-500/25 flex items-center justify-center gap-2 transition-all"
        >
          <span>Place Order • ₹{finalAmount.toLocaleString('en-IN')}</span>
        </button>
        <p className="text-[10px] text-center text-slate-400 mt-1.5">
          You will be redirected to secure payment
        </p>
      </div>

      {/* Address Picker Modal */}
      {showAddressPicker && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white dark:bg-slate-900 w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
              Select Delivery Address
            </h3>
            <div className="flex flex-col gap-2.5">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => {
                    setSelectedAddressId(addr.id);
                    setShowAddressPicker(false);
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedAddressId === addr.id
                      ? 'border-pink-500 bg-pink-50/50 dark:bg-pink-950/20'
                      : 'border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {addr.name} ({addr.type})
                    </span>
                    {selectedAddressId === addr.id && (
                      <span className="w-2 h-2 rounded-full bg-pink-500" />
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {addr.addressLine}, {addr.city} - {addr.pincode}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{addr.phone}</p>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  setShowAddressPicker(false);
                  navigate('addresses');
                }}
                className="mt-2 py-2.5 rounded-xl border border-dashed border-pink-500 text-pink-500 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add / Manage Addresses</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
