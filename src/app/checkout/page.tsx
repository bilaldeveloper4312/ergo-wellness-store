"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState({ text: "", type: "" });
  const router = useRouter();

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    if (couponCode.toUpperCase() === "WELCOME10") {
      setDiscount(0.10); // 10% discount
      setCouponMessage({ text: "10% discount applied successfully!", type: "success" });
    } else {
      setDiscount(0);
      setCouponMessage({ text: "Invalid or expired coupon code.", type: "error" });
    }
  };

  const discountAmount = cartTotal * discount;
  const finalTotal = cartTotal - discountAmount;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
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

  if (isProcessing) {
    return (
      <div className="bg-slate-50 min-h-screen flex flex-col items-center justify-center p-4 z-50 fixed inset-0">
        <div className="bg-white p-10 rounded-2xl shadow-xl flex flex-col items-center max-w-md text-center">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-brand-primary rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Processing Payment...</h2>
          <p className="text-slate-500">Please wait while we secure your order. This may take a few seconds. Do not close this window.</p>
        </div>
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
              
              <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                
                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Express Checkout</h3>
                  <p className="text-slate-600 mb-4">
                    Complete your purchase securely with PayPal. Your shipping address and contact details will be automatically collected during the PayPal checkout process.
                  </p>
                </div>

                {/* Shipping Method */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Shipping Method</h3>
                  <div className="border border-brand-primary bg-blue-50 rounded-lg p-4 flex justify-between items-center cursor-pointer">
                    <div className="flex items-center">
                      <input id="shipping_standard" name="shipping" type="radio" checked readOnly className="h-4 w-4 text-brand-primary focus:ring-brand-primary" />
                      <label htmlFor="shipping_standard" className="ml-3 cursor-pointer">
                        <span className="block text-sm font-bold text-slate-900">Standard Insured Shipping</span>
                        <span className="block text-xs text-slate-500">Delivery in 7-12 Business Days</span>
                      </label>
                    </div>
                    <span className="font-bold text-brand-primary">Free</span>
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">Payment</h3>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
                    <PayPalScriptProvider options={{ clientId: "BAAj6U3OpYjbcJ7SL1C0Xc--NDOpfFbw8VojfUcgOf8hei_D2rThqVV0tls9uuMZuyvcgobJ7ZJ8MD_MCU", currency: "USD" }}>
                      <PayPalButtons 
                        style={{ layout: "vertical", shape: "rect", color: "gold" }}
                        createOrder={(data, actions) => {
                          // Note: Store is now natively in USD, no conversion needed.
                          const totalUsd = finalTotal.toFixed(2);
                          return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                              {
                                amount: {
                                  currency_code: "USD",
                                  value: totalUsd,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order!.capture().then(async (details) => {
                            setIsProcessing(true);
                            
                            const orderPayload = {
                              payment_method: "paypal",
                              payment_method_title: "PayPal",
                              set_paid: true,
                              transaction_id: details.id,
                              billing: {
                                first_name: details.payer?.name?.given_name || "",
                                last_name: details.payer?.name?.surname || "",
                                email: details.payer?.email_address || "",
                                address_1: details.purchase_units?.[0]?.shipping?.address?.address_line_1 || "",
                                address_2: details.purchase_units?.[0]?.shipping?.address?.address_line_2 || "",
                                city: details.purchase_units?.[0]?.shipping?.address?.admin_area_2 || "",
                                state: details.purchase_units?.[0]?.shipping?.address?.admin_area_1 || "",
                                postcode: details.purchase_units?.[0]?.shipping?.address?.postal_code || "",
                                country: details.purchase_units?.[0]?.shipping?.address?.country_code || "",
                              },
                              shipping: {
                                first_name: details.payer?.name?.given_name || "",
                                last_name: details.payer?.name?.surname || "",
                                address_1: details.purchase_units?.[0]?.shipping?.address?.address_line_1 || "",
                                address_2: details.purchase_units?.[0]?.shipping?.address?.address_line_2 || "",
                                city: details.purchase_units?.[0]?.shipping?.address?.admin_area_2 || "",
                                state: details.purchase_units?.[0]?.shipping?.address?.admin_area_1 || "",
                                postcode: details.purchase_units?.[0]?.shipping?.address?.postal_code || "",
                                country: details.purchase_units?.[0]?.shipping?.address?.country_code || "",
                              },
                              line_items: cartItems.map(item => ({
                                product_id: item.productId,
                                quantity: item.quantity
                              })),
                              coupon_lines: discount > 0 ? [{ code: "WELCOME10", discount: discountAmount.toString() }] : []
                            };
                            
                            try {
                              const { processCheckoutAction } = await import("@/lib/actions");
                              await processCheckoutAction(orderPayload);
                              clearCart();
                              router.push("/checkout/success");
                            } catch (error) {
                              console.error("Order sync failed:", error);
                              alert("Payment was successful, but order sync failed. Please contact support.");
                              clearCart();
                              router.push("/checkout/success");
                            }
                          });
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                </div>
                
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
              
              {/* Discount Code Input */}
              <div className="py-4 border-t border-slate-100">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Discount code" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none text-sm uppercase"
                  />
                  <button 
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-slate-800 text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-slate-900 transition-colors disabled:opacity-50"
                    disabled={!couponCode.trim()}
                  >
                    Apply
                  </button>
                </div>
                {couponMessage.text && (
                  <p className={`text-xs mt-2 ${couponMessage.type === "success" ? "text-green-600 font-medium" : "text-red-500"}`}>
                    {couponMessage.text}
                  </p>
                )}
              </div>

              <div className="space-y-3 text-sm text-slate-600 mb-6 border-t border-slate-100 pt-6">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="font-medium text-slate-900">${cartTotal.toFixed(2)}</p>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <p>Discount (10%)</p>
                    <p>-${discountAmount.toFixed(2)}</p>
                  </div>
                )}
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p className="font-medium text-green-600">Free</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center border-t border-slate-100 pt-6">
                <p className="text-base font-bold text-slate-900">Total</p>
                <p className="text-2xl font-extrabold text-slate-900"><span className="text-sm font-normal text-slate-500 mr-1">$</span>{finalTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
