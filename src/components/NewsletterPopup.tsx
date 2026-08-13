"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    // Check if the user has already seen the popup or closed it
    const hasSeenPopup = localStorage.getItem("ergo_newsletter_seen");
    
    if (!hasSeenPopup) {
      // Show popup after 6 seconds of browsing
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("ergo_newsletter_seen", "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    
    // Simulate API call to save email (e.g. Mailchimp/Klaviyo in the future)
    setTimeout(() => {
      setStatus("success");
      // Keep them marked as seen so they don't get the popup again
      localStorage.setItem("ergo_newsletter_seen", "true");
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden relative animate-in zoom-in-95 duration-500">
        
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors shadow-sm"
          aria-label="Close popup"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Left Side: Image */}
        <div className="md:w-5/12 bg-slate-100 relative hidden md:block min-h-[400px]">
          <Image 
            src="/hero-product.jpg" 
            alt="Posture Corrector" 
            fill
            style={{ objectFit: 'cover' }}
            className="grayscale-[30%]"
          />
          <div className="absolute inset-0 bg-brand-primary/10 mix-blend-multiply"></div>
          <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
            <div className="flex text-yellow-400 text-sm mb-1">★★★★★</div>
            <p className="text-xs text-slate-800 font-medium italic">"Completely fixed my tech neck. Best purchase of the year!"</p>
          </div>
        </div>

        {/* Right Side: Content & Form */}
        <div className="md:w-7/12 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white relative overflow-hidden">
          {/* Decorative Blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 opacity-70"></div>
          
          <div className="relative z-10">
            {status === "success" ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-3xl font-extrabold text-slate-900 mb-4">You're in!</h3>
                <p className="text-slate-600 text-lg mb-8">Use the code below at checkout to get <span className="font-bold text-brand-primary">10% OFF</span> your entire order.</p>
                <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-4 mb-8">
                  <span className="text-2xl font-black text-slate-900 tracking-widest font-mono">WELCOME10</span>
                </div>
                <button 
                  onClick={handleClose}
                  className="w-full bg-brand-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-brand-dark hover:-translate-y-0.5 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <>
                <span className="inline-block py-1 px-3 rounded-full bg-red-100 text-red-600 text-xs font-bold tracking-widest uppercase mb-4">Limited Time Offer</span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">Take 10% Off Your First Order</h2>
                <p className="text-slate-600 text-lg mb-8">
                  Join our community of 50,000+ desk workers. Get exclusive ergonomic tips and an instant discount code delivered to your screen.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="email" 
                      required
                      placeholder="Enter your email address" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all outline-none text-slate-700 text-lg placeholder:text-slate-400"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full bg-brand-dark text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:bg-black hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                  >
                    {status === "loading" ? (
                      <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                      "Get My 10% Off"
                    )}
                  </button>
                  <p className="text-xs text-center text-slate-400 mt-4">By subscribing, you agree to our Terms & Privacy Policy. No spam, ever.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
