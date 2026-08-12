import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/api";

export const revalidate = 60; // Refresh blog index every 60 seconds

export default async function BlogList() {
  const posts = await getAllPosts();

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
        {posts.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            No blog posts published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => {
              const formattedDate = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
              const categoryName = post.categories?.nodes?.[0]?.name || "Wellness";
              const imageUrl = post.featuredImage?.node?.sourceUrl || "/hero-product.jpg";
              const cleanExcerpt = post.excerpt ? post.excerpt.replace(/<[^>]*>?/gm, '') : '';

              return (
                <Link href={`/blog/${post.slug}`} key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col">
                  <div className="h-48 bg-slate-200 relative">
                    <Image src={imageUrl} alt={post.title} fill style={{ objectFit: 'cover' }} className="opacity-90" />
                    <div className="absolute top-4 left-4 bg-white text-brand-dark text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {categoryName}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-slate-400 text-sm mb-2">{formattedDate}</span>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-slate-600 mb-6 line-clamp-3 flex-grow">{cleanExcerpt}</p>
                    <span className="text-brand-primary font-semibold flex items-center">
                      Read Article 
                      <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

    </div>
  );
}
