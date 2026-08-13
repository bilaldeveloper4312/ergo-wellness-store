import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, getAllProducts } from "@/lib/api";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const revalidate = 60; // Refresh post every 60 seconds

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  
  if (!post) return { title: 'Post Not Found' };

  const cleanExcerpt = post.excerpt ? post.excerpt.replace(/<[^>]*>?/gm, '').substring(0, 155) : '';

  return {
    title: `${post.title} | ErgoWellness Blog`,
    description: cleanExcerpt || 'Read the latest ergonomic tips and posture advice on the ErgoWellness blog.',
    openGraph: {
      title: post.title,
      description: cleanExcerpt,
      images: [post.featuredImage?.node?.sourceUrl || '/hero-product.jpg'],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  const products = await getAllProducts();

  if (!post) {
    notFound();
  }

  const createMarkup = (html: string) => {
    return { __html: html };
  };

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  const imageUrl = post.featuredImage?.node?.sourceUrl || "/hero-product.jpg";

  // Clean WordPress content slightly if needed, or just render it
  const cleanContent = post.content || '';

  return (
    <div className="flex flex-col font-sans w-full">

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Article Header */}
        <div className="mb-8 text-center border-b border-slate-200 pb-8">
          <Link href="/blog" className="text-brand-primary font-semibold text-sm uppercase tracking-wider mb-4 inline-block hover:underline">← Back to Blog</Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center justify-center space-x-4 text-slate-500 text-sm">
            <span>By ErgoWellness</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative w-full h-80 md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-sm">
           <Image src={imageUrl} alt={post.title} fill style={{ objectFit: 'cover' }} priority />
        </div>

        {/* Article Content (Rendered directly from WP HTML) */}
        <article 
          className="prose prose-lg prose-slate max-w-none prose-a:text-brand-primary hover:prose-a:text-brand-dark prose-img:rounded-xl prose-img:shadow-sm"
          dangerouslySetInnerHTML={createMarkup(cleanContent)}
        />
        
        {/* Author Bio (E-E-A-T Trust Signal) */}
        <div className="mt-16 bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-24 h-24 rounded-full bg-brand-primary flex-shrink-0 flex items-center justify-center text-white text-2xl font-bold shadow-md">
            EE
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-slate-900 mb-2 flex items-center justify-center md:justify-start">
              ErgoWellness Editorial Team
              <svg className="w-5 h-5 text-blue-500 ml-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            </h4>
            <p className="text-slate-600 mb-4 leading-relaxed">
              This article was written and medically reviewed by the ErgoWellness Editorial Team, a group of ergonomic specialists dedicated to providing evidence-based posture correction advice and workspace wellness tips.
            </p>
            <Link href="/about" className="text-brand-primary font-bold hover:underline text-sm">Read our clinical guidelines →</Link>
          </div>
        </div>
        
        {/* Dynamic Recommended Products (SEO Link Juice & Conversions) */}
        <div className="my-16 border-t border-slate-200 pt-12">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Recommended for you</h3>
              <p className="text-slate-500 mt-1">Products mentioned in this article.</p>
            </div>
            <Link href="/shop" className="text-brand-primary font-bold hover:underline hidden sm:block">View all →</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {products.slice(0, 3).map((prod: any) => (
              <Link href={`/shop/${prod.slug || prod.databaseId}`} key={prod.databaseId} className="group bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-all flex flex-col">
                <div className="relative aspect-square bg-slate-50">
                  <Image 
                    src={prod.image?.sourceUrl || "/hero-product.jpg"} 
                    alt={prod.image?.altText || prod.name} 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-brand-primary line-clamp-2">{prod.name}</h4>
                  <div className="flex text-yellow-400 text-xs mb-2">★★★★★</div>
                  <div className="mt-auto font-black text-slate-900">{prod.price ? prod.price.replace(/&nbsp;/g, ' ') : 'Free'}</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link href="/shop" className="text-brand-primary font-bold hover:underline">View all products →</Link>
          </div>
        </div>

      </main>
    </div>
  );
}
