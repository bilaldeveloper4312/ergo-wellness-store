import Link from "next/link";
import Image from "next/image";

// Mock data for our SEO blog posts
const posts = [
  {
    id: 1,
    slug: "5-stretches-to-stop-desk-neck-pain",
    title: "5 Stretches To Stop Desk Neck Pain Immediately",
    excerpt: "If you spend 8 hours a day staring at a monitor, your cervical spine is under massive strain. Learn these 5 quick stretches you can do right at your desk.",
    date: "Aug 10, 2026",
    category: "Pain Relief",
  },
  {
    id: 2,
    slug: "how-to-set-up-ergonomic-home-office",
    title: "The Ultimate Ergonomic Home Office Setup Guide",
    excerpt: "Stop hunching over your laptop on the couch. Follow this physical therapist-approved guide to setting up a pain-free workstation.",
    date: "Aug 05, 2026",
    category: "Office Setup",
  },
  {
    id: 3,
    slug: "do-posture-correctors-actually-work",
    title: "Do Posture Correctors Actually Work? A Medical Review",
    excerpt: "We look at the science behind posture braces and how they can retrain your muscles to naturally hold a healthier position.",
    date: "Jul 28, 2026",
    category: "Product Reviews",
  }
];

export default function BlogList() {
  return (
    <div className="flex flex-col font-sans">

      {/* Blog Header */}
      <div className="bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Wellness & Ergonomics Blog</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Expert advice on fixing your posture, optimizing your workspace, and living a pain-free life.
          </p>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <div className="h-48 bg-slate-200 relative">
                {/* Reusing hero image as a placeholder for blog thumbnails */}
                <Image src="/hero-product.jpg" alt="Blog cover" fill style={{ objectFit: 'cover' }} className="opacity-80" />
                <div className="absolute top-4 left-4 bg-white text-brand-dark text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {post.category}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-slate-400 text-sm mb-2">{post.date}</span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-slate-600 mb-6 line-clamp-3 flex-grow">{post.excerpt}</p>
                <span className="text-brand-primary font-semibold flex items-center">
                  Read Article 
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

    </div>
  );
}
