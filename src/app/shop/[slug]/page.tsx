import Image from "next/image";
import Link from "next/link";
import ProductGallery from "@/components/ProductGallery";
import ProductOptions from "@/components/ProductOptions";
import { getProductBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

// Generate Dynamic SEO Meta Tags based on the WooCommerce Product
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);
  
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} | ErgoWellness US/UK`,
    description: product.description ? product.description.replace(/<[^>]*>?/gm, '').substring(0, 155) : 'Shop ergonomic solutions at ErgoWellness.',
    openGraph: {
      title: product.name,
      images: [product.image?.sourceUrl || '/hero-product.jpg'],
    },
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const createMarkup = (html: string) => {
    return { __html: html };
  };

  // Extract images from the CJ Dropshipping description HTML
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
  const galleryImages: string[] = [];
  let match;
  while ((match = imgRegex.exec(product.description || '')) !== null) {
    if (match[1] && !match[1].includes('data:image')) {
      galleryImages.push(match[1]);
    }
  }

  // Remove all images from the description text for a clean, professional look
  const cleanDescription = product.description 
    ? product.description.replace(/<img[^>]*>/gi, '') 
    : '';

  // Structured Data (JSON-LD) for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.image?.sourceUrl || 'https://ergowellness.com/hero-product.jpg',
    description: product.description ? product.description.replace(/<[^>]*>?/gm, '') : '',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price ? product.price.replace(/[^0-9.]/g, '') : '0.00',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'ErgoWellness'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '124'
    }
  };

  return (
    <div className="flex flex-col font-sans w-full">
      {/* Inject SEO Schema invisibly into the head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumbs for SEO */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 w-full">
          <div className="text-sm text-slate-500 flex items-center space-x-2 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-brand-primary">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-brand-primary">Shop</Link>
            <span>/</span>
            <span className="text-slate-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-16">
          <div className="flex flex-col md:flex-row">
            
            {/* Interactive Product Image Gallery */}
            <ProductGallery 
              mainImage={product.image?.sourceUrl || "/hero-product.jpg"} 
              altText={product.image?.altText || product.name} 
              galleryImages={galleryImages} 
            />

            {/* Product Info & Buy Box */}
            <div className="md:w-1/2 p-8 lg:p-12">
              <span className="text-green-600 font-bold tracking-wider text-sm uppercase mb-3 flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                In Stock & Ready to Ship
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 text-lg">★★★★★</div>
                <span className="text-slate-600 text-sm ml-2 font-medium underline cursor-pointer">4.8 (124 Reviews)</span>
              </div>

              <ProductOptions product={product} />
            </div>
          </div>
          
          {/* Full-width Description Section */}
          {cleanDescription && cleanDescription.trim().length > 10 && (
            <div className="border-t border-slate-100 bg-white p-8 lg:p-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Product Details</h2>
              <div 
                className="text-slate-600 text-base leading-relaxed prose prose-slate max-w-none w-full"
                dangerouslySetInnerHTML={createMarkup(cleanDescription)}
              />
            </div>
          )}
        </div>

        {/* SEO FAQ Accordion Section (People Also Ask target) */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex justify-between items-center cursor-pointer">
                How quickly will this relieve my pain?
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mt-2">Many customers report feeling relief within the first 1-2 hours of use. For long-term postural correction and chronic pain relief, consistent daily use over 2-3 weeks is recommended to rebuild muscle memory.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex justify-between items-center cursor-pointer">
                Is this suitable for all body types?
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mt-2">Yes, our ergonomic solutions feature highly adjustable straps and universal sizing to comfortably fit chest sizes ranging from 28 to 48 inches.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex justify-between items-center cursor-pointer">
                Can I wear this under my work clothes?
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mt-2">Absolutely. The slim-profile, breathable material is designed to be completely invisible under a standard office button-down shirt or blouse.</p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
