"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call to backend
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      router.push("/checkout/success");
    }, 2000);
  };

  if (cartItems.length === 0 && !isProcessing) {
    return (
      <div className="bg-slate-50 min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-6">
          <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h1>
        <Link href="/shop" className="bg-brand-primary text-white px-8 py-3 rounded-lg font-bold hover:bg-brand-dark transition-colors">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Checkout Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Checkout</h2>
              
              <form onSubmit={handleCheckout} className="space-y-8">
                
                {/* Contact Info */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Contact Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                      <input required type="email" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none" placeholder="you@example.com" />
                    </div>
                  </div>
                </div>
                
                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Shipping Address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                      <input required type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                      <input required type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                      <input required type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none" placeholder="123 Main St" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                      <input required type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">State / Province</label>
                      <input required type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">ZIP / Postal Code</label>
                      <input required type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Country</label>
                      <select required className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none bg-white">
                        <option value="US">United States</option>
                        <option value="GB">United Kingdom</option>
                        <option value="CA">Canada</option>
                        <option value="AU">Australia</option>
                        <option value="AE">United Arab Emirates</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Shipping Method</h3>
                  <div className="border border-brand-primary bg-blue-50 rounded-lg p-4 flex justify-between items-center cursor-pointer">
                    <div className="flex items-center">
                      <input type="radio" checked readOnly className="h-4 w-4 text-brand-primary focus:ring-brand-primary" />
                      <div className="ml-3">
                        <span className="block text-sm font-bold text-slate-900">Standard Insured Shipping</span>
                        <span className="block text-xs text-slate-500">Delivery in 7-12 Business Days</span>
                      </div>
                    </div>
                    <span className="font-bold text-brand-primary">Free</span>
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Payment</h3>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center">
                    <svg className="w-8 h-8 text-slate-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    <p className="text-sm text-slate-500 mb-4">This is a demo checkout. In production, Stripe or PayPal elements will be rendered here.</p>
                    <div className="flex items-center justify-center space-x-2">
                       <input type="radio" checked readOnly className="h-4 w-4 text-brand-primary" />
                       <span className="text-sm font-bold text-slate-700">Cash on Delivery (Demo Mode)</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full bg-brand-primary hover:bg-brand-dark text-white font-extrabold py-4 px-8 rounded-xl shadow-xl transition-all text-lg flex justify-center items-center disabled:opacity-70"
                >
                  {isProcessing ? (
                     <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</>
                  ) : `Pay ${cartTotal.toFixed(2)} د.إ`}
                </button>
                
                <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 mt-4">
                  <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <span>256-bit SSL Encrypted Secure Checkout</span>
                </div>

              </form>
            </div>
          </div>
          
          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h2>
              
              <ul className="divide-y divide-slate-100 mb-6">
                {cartItems.map(item => (
                  <li key={item.cartId} className="py-4 flex">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-slate-100 bg-slate-50 relative">
                      <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                      <div className="absolute -top-2 -right-2 bg-slate-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full z-10">{item.quantity}</div>
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-center">
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-2">{item.name}</h3>
                      {item.attributes && (
                        <p className="text-xs text-slate-500 mt-1">
                          {item.attributes.map(a => a.value).join(' / ')}
                        </p>
                      )}
                    </div>
                    <div className="ml-4 flex items-center">
                      <p className="text-sm font-bold text-slate-900">{item.price ? item.price.replace(/&nbsp;/g, ' ') : ''}</p>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="space-y-3 text-sm text-slate-600 mb-6 border-t border-slate-100 pt-6">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="font-medium text-slate-900">{cartTotal.toFixed(2)} د.إ</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p className="font-medium text-green-600">Free</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                <p className="text-base font-bold text-slate-900">Total</p>
                <p className="text-2xl font-extrabold text-slate-900">{cartTotal.toFixed(2)} <span className="text-sm font-normal text-slate-500">د.إ</span></p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
