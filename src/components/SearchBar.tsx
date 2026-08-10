"use client";

import { useState, useEffect, useRef } from "react";
import { searchProductsAction } from "@/lib/actions";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Debounced search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await searchProductsAction(query);
        setResults(data || []);
        setIsOpen(true);
      } catch (error) {
        console.error("Search error", error);
      } finally {
        setIsSearching(false);
      }
    }, 150);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-sm z-50">
      <form onSubmit={handleSubmit} className="relative">
        <input 
          type="text" 
          aria-label="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (results.length > 0) setIsOpen(true);
          }}
          placeholder="Search solutions..." 
          className="bg-slate-50 border border-slate-200 text-sm rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent w-full transition-all"
        />
        <button type="submit" aria-label="Submit Search" className="absolute right-3 top-2 text-slate-400 hover:text-brand-primary">
          {isSearching ? (
             <svg className="animate-spin h-5 w-5 text-brand-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
             </svg>
          ) : (
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          )}
        </button>
      </form>

      {/* Autocomplete Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden max-h-96 overflow-y-auto">
          <ul>
            {results.slice(0, 5).map((product) => (
              <li key={product.databaseId} className="border-b border-slate-50 last:border-0">
                <Link 
                  href={`/shop/${product.slug || product.databaseId}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center p-3 hover:bg-slate-50 transition-colors"
                >
                  <div className="relative w-12 h-12 rounded bg-slate-100 overflow-hidden shrink-0">
                    <Image 
                      src={product.image?.sourceUrl || "/hero-product.jpg"} 
                      alt={product.image?.altText || product.name} 
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div className="ml-3 flex-grow">
                    <p className="text-sm font-bold text-slate-900 line-clamp-1">{product.name}</p>
                    <p className="text-xs text-brand-primary font-bold mt-1">
                      {product.price ? product.price.replace(/&nbsp;/g, ' ') : 'View'}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
            {results.length > 5 && (
              <li>
                <Link 
                  href={`/shop?q=${encodeURIComponent(query.trim())}`}
                  onClick={() => setIsOpen(false)}
                  className="block text-center p-3 text-sm font-bold text-brand-primary hover:bg-slate-50"
                >
                  View all {results.length} results
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
      
      {isOpen && query.length >= 2 && results.length === 0 && !isSearching && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 p-4 text-center text-slate-500 text-sm">
          No products found for "{query}".
        </div>
      )}
    </div>
  );
}
