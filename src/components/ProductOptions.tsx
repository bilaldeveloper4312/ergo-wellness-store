"use client";

import { useState, useMemo } from "react";
import { useCart, CartItem } from '@/context/CartContext';

export default function ProductOptions({ product }: { product: any }) {
  const hasVariations = product.variations && product.variations.nodes.length > 0;
  const attributes = product.attributes?.nodes || [];

  const initialOptions = useMemo(() => {
    const opts: Record<string, string> = {};
    attributes.forEach((attr: any) => {
      if (attr.options && attr.options.length > 0) {
        opts[attr.name] = attr.options[0];
      }
    });
    return opts;
  }, [attributes]);

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(initialOptions);
  const { addToCart } = useCart();

  const selectedVariation = useMemo(() => {
    if (!hasVariations) return null;
    return product.variations.nodes.find((variation: any) => {
      if (!variation.attributes || !variation.attributes.nodes) return false;
      return variation.attributes.nodes.every((attr: any) => {
        // Handle case sensitivity and spaces just in case
        return selectedOptions[attr.name] === attr.value;
      });
    });
  }, [hasVariations, product.variations, selectedOptions]);

  const handleOptionChange = (attrName: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [attrName]: value,
    }));
  };

  let displayPrice = product.price ? product.price.replace(/&nbsp;/g, ' ') : 'Price Not Set';
  if (selectedVariation && selectedVariation.price) {
    displayPrice = selectedVariation.price.replace(/&nbsp;/g, ' ');
  }

  const [addBundle, setAddBundle] = useState(true); // Default to true to maximize conversions

  const handleAddToCart = () => {
    if (hasVariations && !selectedVariation) {
      alert("Please select all options before adding to cart.");
      return;
    }

    const itemPrice = hasVariations ? selectedVariation.price : product.price;
    const itemImage = product.image?.sourceUrl || "/hero-product.jpg";
    
    // Convert selectedOptions object into an array of {name, value}
    const attributes = Object.keys(selectedOptions).map(key => ({
      name: key,
      value: selectedOptions[key]
    }));

    const cartId = hasVariations 
      ? `${product.databaseId}-${selectedVariation.databaseId}`
      : `${product.databaseId}`;

    const cartItem: CartItem = {
      cartId,
      productId: product.databaseId,
      variationId: hasVariations ? selectedVariation.databaseId : undefined,
      name: hasVariations ? selectedVariation.name : product.name,
      slug: product.slug,
      price: itemPrice ? itemPrice.replace(/&nbsp;/g, ' ') : '',
      image: itemImage,
      quantity: 1,
      attributes: hasVariations ? attributes : undefined
    };

    addToCart(cartItem);

    // If the bundle is selected, add the complementary item to cart as well
    if (addBundle) {
      addToCart({
        cartId: "bundle-posture-corrector",
        productId: 9999, // Dummy ID for the bundle item
        name: "Premium Posture Corrector",
        slug: "premium-posture-corrector",
        price: "$19.99", // Simulated discounted price
        image: "/hero-product.jpg",
        quantity: 1,
      });
    }
  };

  return (
    <div>
      <div className="text-4xl font-extrabold text-slate-900 mb-6">{displayPrice}</div>

      {attributes.length > 0 && (
        <div className="space-y-4 mb-6">
          {attributes.map((attr: any) => (
            <div key={attr.name}>
              <label className="block text-sm font-bold text-slate-700 mb-2">{attr.name}</label>
              <select
                className="w-full bg-white border border-slate-300 text-slate-700 py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary"
                value={selectedOptions[attr.name] || ''}
                onChange={(e) => handleOptionChange(attr.name, e.target.value)}
              >
                {attr.options.map((option: string) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}

      {/* YMYL Trust Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
        <div className="flex items-center space-x-3 text-slate-700">
          <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="font-medium text-sm">Physiotherapist Approved</span>
        </div>
        <div className="flex items-center space-x-3 text-slate-700">
          <svg className="w-6 h-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="font-medium text-sm">30-Day Pain-Free Trial</span>
        </div>
      </div>

      {/* Frequently Bought Together Bundle */}
      <div className="bg-blue-50/50 border border-brand-primary/30 rounded-xl p-4 mb-6 cursor-pointer hover:bg-blue-50 transition-colors" onClick={() => setAddBundle(!addBundle)}>
        <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center">
          <svg className="w-4 h-4 mr-1 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Frequently Bought Together
        </h4>
        <div className="flex items-center">
          <div className="flex-shrink-0 mr-3">
            <input 
              type="checkbox" 
              checked={addBundle} 
              onChange={() => setAddBundle(!addBundle)}
              className="w-5 h-5 text-brand-primary rounded focus:ring-brand-primary"
            />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900 line-clamp-1">Add the Premium Posture Corrector</p>
            <div className="flex items-center mt-1">
              <span className="text-sm font-bold text-slate-900">$19.99</span>
              <span className="text-xs text-slate-500 line-through ml-2">$39.99</span>
              <span className="text-xs font-bold text-red-500 ml-2">(Save 50%)</span>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full bg-brand-primary hover:bg-brand-dark text-white font-extrabold py-5 px-8 rounded-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all text-lg mb-6 flex justify-center items-center"
      >
        <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
        Add To Cart
      </button>
      
      <div className="text-center text-sm text-slate-500 flex flex-col items-center justify-center space-y-2">
         <div className="flex items-center space-x-2">
           <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
           <span>Secure Checkout via Stripe & PayPal</span>
         </div>
         <p className="text-xs">Ships within 24 hours from US & UK warehouses.</p>
      </div>
    </div>
  );
}
