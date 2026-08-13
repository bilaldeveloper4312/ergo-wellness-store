import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | ErgoWellness",
  description: "Learn about our mission to eradicate desk pain through clinically-designed ergonomic solutions.",
};

export default function AboutUs() {
  return (
    <div className="flex flex-col font-sans w-full">
      {/* Hero Section */}
      <section className="bg-brand-dark text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our Mission to Eradicate Desk Pain</h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            We believe that modern work shouldn't come at the cost of your physical health. 
            ErgoWellness was founded on a simple principle: <span className="text-brand-primary font-bold">pain-free productivity.</span>
          </p>
        </div>
      </section>

      {/* The Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">The Desk Worker Epidemic</h2>
              <div className="prose prose-lg prose-slate text-slate-600">
                <p>
                  Millions of professionals spend over 8 hours a day hunched over keyboards and screens. 
                  This unnatural posture leads to what medical professionals call "Tech Neck," chronic lower back pain, 
                  and spinal misalignment.
                </p>
                <p>
                  ErgoWellness started when a small team of wellness advocates and product designers realized 
                  that traditional office chairs and standing desks weren't enough. People needed targeted, 
                  clinical-grade solutions to rebuild their muscle memory and force their spine back into its natural curve.
                </p>
                <p>
                  Today, we partner with top-tier manufacturers to bring physiotherapist-recommended posture 
                  correctors and ergonomic accessories directly to consumers worldwide.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 w-full">
              <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="/hero-product.jpg" 
                  alt="Ergonomic Workspace" 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals & Values */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Everything we do is guided by clinical research and a commitment to customer wellbeing.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Clinical Quality</h3>
              <p className="text-slate-600 text-sm leading-relaxed">We refuse to sell cheap gimmicks. Every product in our store is rigorously tested and proven to assist with postural alignment.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">30-Day Guarantee</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Health is personal. If our products don't relieve your pain within 30 days, we offer a hassle-free, no-questions-asked refund policy.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm text-center">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Global Accessibility</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Pain knows no borders. We operate out of our US headquarters while providing fast, reliable shipping to customers across the US and UK.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to fix your posture?</h2>
        <Link href="/shop" className="inline-block bg-brand-primary text-white font-bold py-4 px-10 rounded-xl hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
          Explore Our Solutions
        </Link>
      </section>
    </div>
  );
}
