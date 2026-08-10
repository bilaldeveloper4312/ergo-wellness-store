import Image from "next/image";
import Link from "next/link";
import { getAllProducts } from "@/lib/api";

export const revalidate = 15;

export default async function Shop({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams.q || "";

  // Fetch real products from WooCommerce via GraphQL
  const products = await getAllProducts(searchQuery);

  return (
    <div className="flex flex-col font-sans">

      {/* Shop Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Ergonomic Solutions</h1>
          <p className="text-lg text-slate-600 max-w-3xl">
            Browse our curated collection of clinically backed posture correctors and ergonomic desk accessories. Find your pain-relief solution today.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        
        {/* Filters and Sort */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
          <p className="text-slate-500 font-medium">{products.length} products found</p>
          <select className="bg-white border border-slate-300 text-slate-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Highest Rated</option>
          </select>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            <h2 className="text-2xl font-bold mb-2">No products found</h2>
            <p>Make sure you have added products in your WooCommerce dashboard.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product: any) => (
              <Link href={`/shop/${product.slug || product.databaseId}`} key={product.databaseId} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group block">
                <div className="relative aspect-square bg-slate-100 overflow-hidden">
                  <Image 
                    src={product.image?.sourceUrl || "/hero-product.jpg"} 
                    alt={product.image?.altText || product.name} 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100 mix-blend-multiply"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-brand-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  {/* Safely stripping HTML from short description if needed, or just relying on title for grid */}
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-extrabold text-slate-900">{product.price ? product.price.replace(/&nbsp;/g, ' ') : 'Free'}</span>
                    <span className="text-brand-primary font-medium text-sm">View Details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
