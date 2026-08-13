import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ambassador Program | ErgoWellness",
  description: "Join the ErgoWellness Affiliate Program. Earn 15% commission promoting premium ergonomic products.",
};

export default function AmbassadorProgram() {
  return (
    <div className="flex flex-col font-sans w-full bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="bg-brand-dark py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden text-center text-white">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-green-500/20 text-green-400 text-sm font-bold tracking-widest uppercase mb-6 border border-green-500/30">
            Partner With Us
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            Earn <span className="text-brand-primary">15% Commission</span> Helping People Live Pain-Free.
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed mb-8">
            Are you a fitness influencer, chiropractor, physical therapist, or wellness content creator? 
            Join the ErgoWellness Ambassador program and monetize your audience by recommending clinical-grade ergonomic gear.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Three simple steps to start generating passive income while improving your audience's health.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
              <div className="w-16 h-16 bg-blue-100 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black">1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Apply</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Fill out the application form below. We review all applications within 24-48 hours to ensure brand alignment.</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 text-center relative">
              <div className="hidden md:block absolute top-1/2 -left-4 w-8 h-0.5 bg-slate-200"></div>
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-slate-200"></div>
              <div className="w-16 h-16 bg-blue-100 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black">2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Share</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Get your unique tracking link and a custom 10% OFF discount code to share with your audience.</p>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
              <div className="w-16 h-16 bg-blue-100 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-black">3</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Earn</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Earn a flat 15% commission on every successful sale. Payouts are sent directly to your PayPal on the 1st of every month.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2 text-center">Apply Now</h2>
            <p className="text-slate-500 text-center mb-8">Start your journey as an ErgoWellness Ambassador.</p>
            
            {/* Direct FormSubmit Integration */}
            <form 
              action="https://formsubmit.co/support@getergowellness.com" 
              method="POST" 
              className="space-y-6"
            >
              {/* FormSubmit Configuration */}
              <input type="hidden" name="_subject" value="New Affiliate Ambassador Application!" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                  <input type="text" id="name" name="name" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                  <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none" />
                </div>
              </div>
              
              <div>
                <label htmlFor="platform" className="block text-sm font-bold text-slate-700 mb-2">Primary Social Media or Website Link *</label>
                <input type="url" id="platform" name="platform" placeholder="https://instagram.com/yourhandle" required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none" />
              </div>

              <div>
                <label htmlFor="audience" className="block text-sm font-bold text-slate-700 mb-2">Audience Size / Followers</label>
                <select id="audience" name="audience" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none">
                  <option value="Under 5k">Under 5,000</option>
                  <option value="5k - 50k">5,000 - 50,000</option>
                  <option value="50k - 250k">50,000 - 250,000</option>
                  <option value="250k+">250,000+</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">How do you plan to promote ErgoWellness? *</label>
                <textarea id="message" name="message" rows={4} required className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-brand-primary outline-none resize-none"></textarea>
              </div>

              <button type="submit" className="w-full bg-brand-primary text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition-colors shadow-lg">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
