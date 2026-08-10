"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function CartSlideout() {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="relative z-[100]" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Background overlay */}
      <div 
        className="fixed inset-0 bg-slate-900/75 transition-opacity backdrop-blur-sm" 
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <div className="pointer-events-auto w-screen max-w-md transform transition-transform duration-500 ease-in-out">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-2xl">
                
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-2xl font-extrabold text-slate-900" id="slide-over-title">Shopping Cart</h2>
                    <div className="ml-3 flex h-7 items-center">
                      <button 
                        type="button" 
                        aria-label="Close cart"
                        className="relative -m-2 p-2 text-slate-400 hover:text-slate-500 transition-colors"
                        onClick={() => setIsCartOpen(false)}
                      >
                        <span className="absolute -inset-0.5"></span>
                        <span className="sr-only">Close panel</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      {cartItems.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                          </div>
                          <p className="text-slate-500 mb-6 font-medium">Your cart is currently empty.</p>
                          <button 
                            onClick={() => setIsCartOpen(false)}
                            className="text-brand-primary font-bold hover:text-blue-700"
                          >
                            Continue Shopping &rarr;
                          </button>
                        </div>
                      ) : (
                        <ul role="list" className="-my-6 divide-y divide-slate-100">
                          {cartItems.map((item) => (
                            <li key={item.cartId} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-slate-100 bg-slate-50 relative">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div className="flex justify-between text-base font-medium text-slate-900">
                                    <h3 className="line-clamp-2 text-sm font-bold pr-4">
                                      <Link href={`/shop/${item.slug || item.productId}`} onClick={() => setIsCartOpen(false)}>{item.name}</Link>
                                    </h3>
                                    <p className="ml-4 font-extrabold whitespace-nowrap">{item.price ? item.price.replace(/&nbsp;/g, ' ') : ''}</p>
                                  </div>
                                  {item.attributes && item.attributes.length > 0 && (
                                    <p className="mt-1 text-xs text-slate-500">
                                      {item.attributes.map(attr => `${attr.name}: ${attr.value}`).join(' | ')}
                                    </p>
                                  )}
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm mt-4">
                                  <div className="flex items-center border border-slate-200 rounded-lg">
                                    <button 
                                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                      aria-label={`Decrease quantity of ${item.name}`}
                                      className="px-3 py-1 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-l-lg"
                                    >-</button>
                                    <span className="px-3 py-1 font-medium border-x border-slate-200">{item.quantity}</span>
                                    <button 
                                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                      aria-label={`Increase quantity of ${item.name}`}
                                      className="px-3 py-1 text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-r-lg"
                                    >+</button>
                                  </div>

                                  <div className="flex">
                                    <button 
                                      type="button" 
                                      aria-label={`Remove ${item.name} from cart`}
                                      className="font-medium text-red-500 hover:text-red-700 transition-colors text-xs uppercase tracking-wide"
                                      onClick={() => removeFromCart(item.cartId)}
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t border-slate-100 px-4 py-6 sm:px-6 bg-slate-50">
                    <div className="flex justify-between text-base font-bold text-slate-900 mb-2">
                      <p>Subtotal</p>
                      <p>{cartTotal.toFixed(2)} د.إ</p>
                    </div>
                    <div className="flex justify-between text-sm text-green-600 font-medium mb-4">
                      <p>Shipping</p>
                      <p>Free Insured Shipping</p>
                    </div>
                    <div className="flex justify-between text-xl font-extrabold text-slate-900 mb-6 border-t border-slate-200 pt-4">
                      <p>Total</p>
                      <p>{cartTotal.toFixed(2)} د.إ</p>
                    </div>
                    
                    <p className="mt-0.5 text-sm text-slate-500 mb-6 text-center">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <Link
                        href="/checkout"
                        onClick={() => setIsCartOpen(false)}
                        className="flex items-center justify-center rounded-xl border border-transparent bg-brand-primary px-6 py-4 text-base font-bold text-white shadow-lg hover:bg-brand-dark transition-all hover:-translate-y-1 hover:shadow-xl w-full"
                      >
                        Secure Checkout
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-slate-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="font-medium text-brand-primary hover:text-blue-700"
                          onClick={() => setIsCartOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                    
                    {/* Safe checkout badges */}
                    <div className="mt-6 flex justify-center space-x-2 grayscale opacity-60">
                       <div className="h-6 w-10 bg-slate-200 rounded"></div>
                       <div className="h-6 w-10 bg-slate-200 rounded"></div>
                       <div className="h-6 w-10 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
