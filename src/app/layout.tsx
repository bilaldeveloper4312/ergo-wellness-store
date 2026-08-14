import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import { CartProvider } from "@/context/CartContext";
import CartSlideout from "@/components/CartSlideout";
import CartIcon from "@/components/CartIcon";
import NewsletterForm from "@/components/NewsletterForm";
import NewsletterPopup from "@/components/NewsletterPopup";
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
  title: "ErgoWellness | Ergonomic Posture Correctors & Desk Accessories",
  description: "Shop top-rated ergonomic desk accessories, posture correctors, and lumbar support cushions to relieve back and neck pain. Free shipping in US & UK.",
  keywords: ["posture corrector", "ergonomic desk accessories", "neck pain relief", "lumbar support cushion", "tech neck corrector", "ergonomic posture correctors"],
  openGraph: {
    title: "ErgoWellness | Ergonomic Posture Correctors & Desk Accessories",
    description: "Shop top-rated ergonomic desk accessories, posture correctors, and lumbar support cushions to relieve back and neck pain.",
    url: "https://www.getergowellness.com",
    siteName: "ErgoWellness",
    images: [
      {
        url: "/images/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "ErgoWellness Ergonomic Products"
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ErgoWellness | Ergonomic Posture Correctors",
    description: "Shop top-rated ergonomic desk accessories and posture correctors.",
    creator: "@ErgoWellness",
  },
  alternates: {
    canonical: "https://www.getergowellness.com",
  },
  verification: {
    other: {
      "p:domain_verify": "4f6b310bc94cd3463315134d50ca2ab2"
    }
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen flex flex-col bg-slate-50 font-sans">
        <CartProvider>
          <CartSlideout />
          <NewsletterPopup />
        
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
                  <li><Link href="/ambassadors" className="hover:text-brand-primary transition-colors text-green-400 font-bold">Ambassador Program</Link></li>
                </ul>
                
                <h4 className="text-white font-bold mt-8 mb-4 tracking-wide uppercase text-sm">Corporate Office</h4>
                <address className="not-italic text-sm text-slate-400 space-y-1">
                  <p>ErgoWellness Inc.</p>
                  <p>1209 Orange Street</p>
                  <p>Wilmington, DE 19801, USA</p>
                </address>
              </div>

              {/* Customer Service & Shipping */}
              <div>
                <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Customer Support</h4>
                <ul className="space-y-3 text-sm text-slate-400">
                  <li><a href="mailto:support@getergowellness.com" className="hover:text-brand-primary transition-colors flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> support@getergowellness.com</a></li>
                  <li><Link href="/about" className="hover:text-brand-primary transition-colors">About Us</Link></li>
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
                {/* Follow Us & Social Media */}
                <div className="mt-8">
                  <h4 className="text-white font-bold mb-4 tracking-wide uppercase text-sm">Follow Us</h4>
                  <div className="flex space-x-5">
                    <a href="https://instagram.com/getergowellness" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-primary transition-colors hover:scale-110 transform">
                      <span className="sr-only">Instagram</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                    </a>
                    <a href="https://tiktok.com/@getergowellness" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-primary transition-colors hover:scale-110 transform">
                      <span className="sr-only">TikTok</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.28 6.28 0 005 15.65a6.3 6.3 0 0011.3 3.73v-7.15a8.32 8.32 0 003.27.67V9.38a4.84 4.84 0 01-2-.69z"/></svg>
                    </a>
                    <a href="https://pinterest.com/ergowellnesssocial" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-primary transition-colors hover:scale-110 transform">
                      <span className="sr-only">Pinterest</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.624 0 12.017 0z"/></svg>
                    </a>
                  </div>
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
