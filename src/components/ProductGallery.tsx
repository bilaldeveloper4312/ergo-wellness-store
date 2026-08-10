"use client";

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  mainImage: string;
  altText: string;
  galleryImages: string[];
}

export default function ProductGallery({ mainImage, altText, galleryImages }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(mainImage);
  
  // Combine main image and gallery images, remove duplicates
  const allImages = Array.from(new Set([mainImage, ...galleryImages]));

  return (
    <div className="md:w-1/2 p-8 lg:p-12 bg-slate-50 border-r border-slate-100 flex flex-col">
      {/* Main Active Image */}
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-sm bg-white border border-slate-200 mb-6">
        <Image 
          src={activeImage} 
          alt={altText} 
          fill
          priority
          style={{ objectFit: 'contain' }}
          className="p-8 transition-opacity duration-300"
        />
      </div>

      {/* Scrollable Thumbnail Strip */}
      {allImages.length > 1 && (
        <div className="flex overflow-x-auto space-x-4 pb-2 snap-x scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          {allImages.map((src, idx) => (
            <div 
              key={idx} 
              onClick={() => setActiveImage(src)}
              className={`relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 cursor-pointer transition-all snap-start ${
                activeImage === src ? 'border-brand-primary opacity-100 ring-2 ring-brand-primary/20' : 'border-slate-200 opacity-60 hover:opacity-100'
              }`}
            >
               <Image src={src} alt={`Thumbnail ${idx + 1}`} fill style={{ objectFit: 'cover' }} className="bg-white" sizes="100px" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
