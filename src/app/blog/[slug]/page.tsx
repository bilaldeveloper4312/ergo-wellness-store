import Link from "next/link";
import Image from "next/image";
import { getPostBySlug } from "@/lib/api";
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
        
        {/* Shop CTA at bottom of every post */}
        <div className="my-16 bg-brand-light p-8 rounded-2xl border border-blue-100 flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 relative flex-shrink-0 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white">
            <Image src="/hero-product.jpg" alt="Posture Corrector" fill style={{ objectFit: 'cover' }} />
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-900 mt-0 mb-2">Ready to stop the pain?</h4>
            <p className="text-slate-600 mb-4 text-base">Browse our premium, physiotherapist-recommended posture correctors and ergonomic desk accessories today.</p>
            <Link href="/shop" className="inline-block bg-brand-primary text-white font-semibold py-3 px-8 rounded-xl hover:bg-brand-dark transition-colors shadow-md">
              Shop All Solutions →
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
