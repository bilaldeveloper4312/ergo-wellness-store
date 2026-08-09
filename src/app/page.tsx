import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/api";

export default async function Home() {
  // Fetch up to 4 products for the Best Sellers section
  const allProducts = await getAllProducts();
  const bestSellers = allProducts.slice(0, 4);

  return (
    <div className="flex flex-col font-sans text-slate-800 w-full">
      
      {/* Hero Section */}
      <section className="bg-brand-light py-20 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="lg:w-1/2 text-center lg:text-left space-y-6">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-brand-primary text-sm font-semibold tracking-wide border border-blue-200 shadow-sm">
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Physiotherapist Recommended
              </span>
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight">
              Fix Your Posture, <br className="hidden sm:block"/>
              <span className="text-brand-primary relative">
                Stop The Pain.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-yellow-300 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none"/></svg>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
              Premium ergonomic solutions designed for desk workers. Alleviate neck strain and lower back pain with our clinically backed products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center lg:justify-start">
              <Link href="/shop" className="bg-brand-primary hover:bg-brand-dark text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all text-center flex items-center justify-center">
                Shop All Solutions
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="#pain-points" className="bg-white text-slate-700 hover:text-brand-primary font-bold py-4 px-8 rounded-xl shadow-sm border border-slate-200 hover:border-brand-primary transition-all text-center">
                Find My Pain Point
              </Link>
            </div>
            <div className="pt-6 flex items-center justify-center lg:justify-start space-x-4 text-sm text-slate-500 font-medium">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-slate-500 border-2 border-white"></div>
              </div>
              <p>Trusted by 50,000+ desk workers</p>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full max-w-lg mx-auto bg-white p-4 sm:p-8 rounded-3xl shadow-2xl transform lg:rotate-2 hover:rotate-0 transition duration-500 border border-slate-100">
             <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50">
               <Image 
                 src="/hero-product.jpg" 
                 alt="Premium Posture Corrector" 
                 fill
                 style={{ objectFit: 'cover' }}
                 className="hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-white font-bold text-slate-800 text-sm flex items-center">
                 <span className="flex text-yellow-400 mr-2">★★★★★</span> 4.9/5 Rating
               </div>
             </div>
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-brand-primary opacity-5 blur-3xl"></div>
      </section>

      {/* As Featured In (Trust Authority) */}
      <section className="border-y border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">As Featured In</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            <div className="text-xl font-black font-serif">Healthline</div>
            <div className="text-xl font-black font-sans tracking-tighter">TechRadar</div>
            <div className="text-xl font-black font-serif italic">Forbes</div>
            <div className="text-xl font-black font-sans uppercase">Wellness Today</div>
          </div>
        </div>
      </section>

      {/* Intent Grid: Shop By Pain Point */}
      <section id="pain-points" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Shop By Pain Point</h2>
            <p className="text-lg text-slate-600">Don't know where to start? Select the area that bothers you most to find targeted ergonomic solutions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Neck & Shoulders', desc: 'Relieve "Tech Neck" and upper back tension.', color: 'bg-blue-100', text: 'text-blue-600' },
              { title: 'Lower Back', desc: 'Lumbar support and active sitting solutions.', color: 'bg-green-100', text: 'text-green-600' },
              { title: 'Overall Posture', desc: 'Full-back correctors to rebuild muscle memory.', color: 'bg-purple-100', text: 'text-purple-600' }
            ].map((category, i) => (
              <Link href="/shop" key={i} className="group bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center">
                <div className={`w-20 h-20 rounded-2xl ${category.color} ${category.text} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{category.title}</h3>
                <p className="text-slate-600 mb-6">{category.desc}</p>
                <span className="text-brand-primary font-bold mt-auto group-hover:underline flex items-center">
                  Shop Solutions <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Best Sellers from WooCommerce */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Our Best Sellers</h2>
              <p className="text-lg text-slate-600">The most popular ergonomic gear trusted by professionals globally.</p>
            </div>
            <Link href="/shop" className="hidden md:flex text-brand-primary font-bold hover:underline items-center">
              View All Products <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
          
          {bestSellers.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-slate-500">No products found. Please add products to WooCommerce.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestSellers.map((product: any) => (
                <Link href={`/shop/${product.databaseId}`} key={product.databaseId} className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="relative aspect-square bg-slate-50 overflow-hidden p-6 border-b border-slate-100">
                    <Image 
                      src={product.image?.sourceUrl || "/hero-product.jpg"} 
                      alt={product.image?.altText || product.name} 
                      fill
                      style={{ objectFit: 'contain' }}
                      className="p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-brand-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex text-yellow-400 text-xs mb-3">★★★★★ <span className="text-slate-400 ml-1">(4.8)</span></div>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-lg font-black text-slate-900">{product.price ? product.price.replace(/&nbsp;/g, ' ') : 'Free'}</span>
                      <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-colors text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-8 text-center md:hidden">
            <Link href="/shop" className="inline-block border-2 border-brand-primary text-brand-primary font-bold py-3 px-8 rounded-xl w-full">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Real Relief for Desk Workers</h2>
            <p className="text-slate-400 text-lg">Don't just take our word for it. Read reviews from people who fixed their posture.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Sarah J.', role: 'Software Engineer', text: 'After 3 years of chronic neck pain from coding, this posture corrector completely changed my life. I felt relief on day one.', stars: 5 },
              { name: 'Michael T.', role: 'Accountant', text: 'The lumbar support cushion is incredible. It forces my spine into the correct alignment. I can finally work 8 hours pain-free.', stars: 5 },
              { name: 'Jessica L.', role: 'Graphic Designer', text: 'I tried 4 different ergonomic setups before finding ErgoWellness. Their adjustable stand is by far the most sturdy and effective.', stars: 5 }
            ].map((review, i) => (
              <div key={i} className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl relative">
                <div className="text-brand-primary mb-4">
                  <svg className="w-10 h-10 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                </div>
                <p className="text-slate-300 italic mb-6 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white">{review.name}</h4>
                    <p className="text-slate-500 text-sm">{review.role}</p>
                  </div>
                  <div className="flex text-yellow-400 text-sm">
                    {Array(review.stars).fill(0).map((_, idx) => <span key={idx}>★</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
