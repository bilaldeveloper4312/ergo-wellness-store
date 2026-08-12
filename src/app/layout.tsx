import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { CartProvider } from "@/context/CartContext";
import CartSlideout from "@/components/CartSlideout";
import CartIcon from "@/components/CartIcon";
import NewsletterForm from "@/components/NewsletterForm";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.getergowellness.com'),
  title: "ErgoWellness | Premium Posture & Ergonomic Solutions",
  description: "Doctor-recommended ergonomic desk accessories and posture correctors designed to relieve back and neck pain. Shop now with free shipping in US & UK.",
  keywords: ["posture corrector", "ergonomic chair", "neck pain relief", "standing desk", "ergonomic accessories", "back pain support"],
  openGraph: {
    title: "ErgoWellness | Premium Posture & Ergonomic Solutions",
    description: "Doctor-recommended ergonomic desk accessories and posture correctors designed to relieve back and neck pain.",
    url: "https://www.getergowellness.com",
    siteName: "ErgoWellness",
    images: [
      {
        url: "/images/og-image.jpg", // We will use a placeholder or they can upload one later
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ErgoWellness | Premium Posture & Ergonomic Solutions",
    description: "Doctor-recommended ergonomic desk accessories and posture correctors.",
    creator: "@ErgoWellness",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-slate-50 font-sans">
        <CartProvider>
          <CartSlideout />
        
        {/* Top SEO Banner / US-UK Region Toggle */}
        <div className="bg-brand-dark text-white text-xs py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex space-x-4">
              <span className="flex items-center text-green-400">
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Free Shipping in US & UK
              </span>
              <span className="hidden sm:inline">| 30-Day Pain-Free Guarantee</span>
            </div>
            <div className="flex space-x-3 items-center">
              <select className="bg-transparent border-none text-white text-xs focus:ring-0 cursor-pointer uppercase font-bold">
                <option value="us" className="text-black">🇺🇸 USD ($)</option>
                <option value="uk" className="text-black">🇬🇧 GBP (£)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Global Mega Menu Header */}
        <header className="bg-white shadow-sm sticky top-0 z-[9999] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center">
            <Link href="/" className="text-3xl font-extrabold text-brand-dark tracking-tight">Ergo<span className="text-brand-primary">Wellness</span></Link>
            
            <nav className="hidden md:flex space-x-10">
              <div className="group relative">
                <button className="text-slate-700 font-bold hover:text-brand-primary flex items-center py-2">
                  Shop by Pain Point
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {/* Mega Menu Dropdown */}
                <div className="absolute left-0 mt-2 w-64 bg-white shadow-xl rounded-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-4 grid grid-cols-1 gap-2">
                  <Link href="/shop" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium">Neck Pain Relief</Link>
                  <Link href="/shop" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium">Lower Back Support</Link>
                  <Link href="/shop" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-brand-primary rounded-lg font-medium">Posture Correction</Link>
                </div>
              </div>
              <Link href="/shop" className="text-slate-700 font-bold hover:text-brand-primary py-2">All Products</Link>
              <Link href="/blog" className="text-slate-700 font-bold hover:text-brand-primary py-2">Wellness Blog</Link>
            </nav>

            <div className="flex items-center space-x-6">
              <SearchBar />
              <CartIcon />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow w-full">
          {children}
        </main>

        {/* Fat Footer (YMYL Trust Signals) */}
        <footer className="bg-slate-900 pt-16 pb-8 border-t-4 border-brand-primary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              
              {/* Brand & Medical Disclaimer */}
              <div className="col-span-1 lg:col-span-1">
                <div className="text-2xl font-bold text-white mb-4">Ergo<span className="text-brand-primary">Wellness</span></div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Clinically designed ergonomic solutions to reverse desk posture and eliminate pain.
                </p>
                <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs text-slate-400">
                  <span className="font-bold text-slate-300 block mb-1">Medical Disclaimer:</span>
                  Information provided is not a substitute for professional medical advice. Always consult your physician.
                </div>
              </div>

              {/* Shopping Links */}
              <div>
                <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Shop Solutions</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li><Link href="/shop" className="hover:text-brand-primary transition-colors">Posture Correctors</Link></li>
                  <li><Link href="/shop" className="hover:text-brand-primary transition-colors">Lumbar Support</Link></li>
                  <li><Link href="/shop" className="hover:text-brand-primary transition-colors">Standing Desks</Link></li>
                  <li><Link href="/shop" className="hover:text-brand-primary transition-colors">Ergonomic Chairs</Link></li>
                </ul>
              </div>

              {/* Customer Service & Shipping */}
              <div>
                <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Customer Support</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li><a href="mailto:support@getergowellness.com" className="hover:text-brand-primary transition-colors flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> support@getergowellness.com</a></li>
                  <li><Link href="/contact" className="hover:text-brand-primary transition-colors">Contact Us</Link></li>
                  <li><Link href="/track-order" className="hover:text-brand-primary transition-colors">Track My Order</Link></li>
                  <li><Link href="/shipping" className="hover:text-brand-primary transition-colors flex items-center">Shipping Policy</Link></li>
                  <li><Link href="/returns" className="hover:text-brand-primary transition-colors">30-Day Returns</Link></li>
                </ul>
              </div>

              {/* Newsletter & Trust Badges */}
              <div>
                <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Get Posture Tips</h4>
                <p className="text-sm text-slate-400 mb-4">Join 50,000+ others receiving weekly ergonomic advice.</p>
                <NewsletterForm />
                {/* Simulated Payment Badges */}
                <div className="flex space-x-3 text-slate-500">
                  <div className="h-8 w-12 bg-slate-800 rounded flex items-center justify-center text-xs border border-slate-700">Visa</div>
                  <div className="h-8 w-12 bg-slate-800 rounded flex items-center justify-center text-xs border border-slate-700">MC</div>
                  <div className="h-8 w-12 bg-slate-800 rounded flex items-center justify-center text-xs border border-slate-700">Amex</div>
                  <div className="h-8 w-12 bg-slate-800 rounded flex items-center justify-center text-xs border border-slate-700">PayPal</div>
                </div>
              </div>

            </div>

            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
              <p>&copy; {new Date().getFullYear()} ErgoWellness Inc. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white">Terms of Service</Link>
              </div>
            </div>
          </div>
        </footer>
        </CartProvider>
      </body>
      <GoogleAnalytics gaId="G-N0QFDL993K" />
    </html>
  );
}
