import Link from "next/link";
import Image from "next/image";

export default function BlogPost() {
  return (
    <div className="flex flex-col font-sans">

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Article Header */}
        <div className="mb-8 text-center border-b border-slate-200 pb-8">
          <Link href="/blog" className="text-brand-primary font-semibold text-sm uppercase tracking-wider mb-4 inline-block hover:underline">← Back to Blog</Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">5 Stretches To Stop Desk Neck Pain Immediately</h1>
          <div className="flex items-center justify-center space-x-4 text-slate-500 text-sm">
            <span>By Dr. Sarah Jenkins</span>
            <span>•</span>
            <span>Aug 10, 2026</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-80 md:h-96 rounded-2xl overflow-hidden mb-12 shadow-sm">
           <Image src="/hero-product.jpg" alt="Neck stretches" fill style={{ objectFit: 'cover' }} />
        </div>

        {/* Article Content (SEO Heavy) */}
        <article className="prose prose-lg prose-slate max-w-none prose-a:text-brand-primary hover:prose-a:text-brand-dark">
          <p className="lead text-xl text-slate-700 font-medium">If you spend more than 4 hours a day staring at a computer monitor, you are likely experiencing the phenomenon known as "Desk Neck" or "Tech Neck."</p>
          
          <p>When you lean your head forward just one inch, it adds approximately 10 pounds of pressure to your cervical spine. Over an 8-hour workday, this causes severe muscle strain, tension headaches, and long-term postural issues.</p>
          
          <h2>1. The Chin Tuck (Cervical Retraction)</h2>
          <p>The chin tuck is the absolute best exercise for combating the forward head posture caused by looking at screens.</p>
          <ul>
            <li>Sit up straight in your ergonomic chair.</li>
            <li>Pull your chin straight back, as if you are trying to make a double chin.</li>
            <li>Hold for 5 seconds and repeat 10 times.</li>
          </ul>

          <h2>2. Scapular Squeezes</h2>
          <p>When we type, our shoulders naturally round forward. This stretch reverses that action by engaging the rhomboids.</p>
          
          {/* Embedded Product Pitch */}
          <div className="my-10 bg-brand-light p-8 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 relative flex-shrink-0 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
              <Image src="/hero-product.jpg" alt="Posture Corrector" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 mt-0 mb-2">Struggling to keep your shoulders back?</h4>
              <p className="text-slate-600 mb-4 text-base">Our Premium Posture Corrector gently pulls your shoulders into alignment, building the muscle memory you need to stop slouching effortlessly.</p>
              <Link href="/shop/1" className="inline-block bg-brand-primary text-white font-semibold py-2 px-6 rounded-lg hover:bg-brand-dark transition-colors">
                View Posture Brace →
              </Link>
            </div>
          </div>

          <h2>Conclusion</h2>
          <p>Consistency is key. Combine these daily stretches with a proper ergonomic setup—including a lumbar support cushion and a screen at eye level—and you will see a dramatic reduction in daily neck pain.</p>
        </article>

      </main>
    </div>
  );
}
