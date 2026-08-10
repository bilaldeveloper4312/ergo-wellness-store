"use client";

import { useState } from "react";
import Image from "next/image";

interface Review {
  id: number;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  verified: boolean;
}

const mockReviews: Review[] = [
  {
    id: 1,
    author: "Sarah Jenkins",
    avatar: "/avatars/sarah.jpg", // We will use UI avatars or placeholder
    rating: 5,
    date: "August 2, 2026",
    content: "I've been dealing with upper back pain from sitting at my desk all day. This product completely changed how I work. The relief was almost instant, and the quality is far better than the cheap alternatives I've tried before. Highly recommend!",
    verified: true,
  },
  {
    id: 2,
    author: "Michael T.",
    avatar: "/avatars/michael.jpg",
    rating: 5,
    date: "July 28, 2026",
    content: "Exactly what I was looking for. Fast shipping, great packaging, and it actually works. My physical therapist even commented that my posture has improved significantly over the last month.",
    verified: true,
  },
  {
    id: 3,
    author: "Emily R.",
    avatar: "/avatars/emily.jpg",
    rating: 4,
    date: "July 15, 2026",
    content: "Really solid build quality and definitely helps with my neck strain. The only reason for 4 stars is that it took me a few days to get used to it, but now I can't work without it.",
    verified: true,
  }
];

export default function ProductReviews() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowForm(false);
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto mb-16 px-4 sm:px-0">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Customer Reviews</h2>
      
      {/* Aggregate Rating Summary */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between mb-8 shadow-sm">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <div className="text-5xl font-extrabold text-slate-900 mb-2">4.8</div>
          <div className="flex text-yellow-400 text-xl mb-1">★★★★★</div>
          <p className="text-slate-500 text-sm font-medium">Based on 124 reviews</p>
        </div>
        
        {/* Progress Bars */}
        <div className="flex-1 max-w-md w-full px-0 md:px-8 space-y-2">
          {[
            { stars: 5, pct: 85 },
            { stars: 4, pct: 10 },
            { stars: 3, pct: 3 },
            { stars: 2, pct: 1 },
            { stars: 1, pct: 1 },
          ].map((bar) => (
            <div key={bar.stars} className="flex items-center text-sm">
              <span className="w-12 text-slate-600 font-medium">{bar.stars} stars</span>
              <div className="flex-1 mx-3 bg-slate-100 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-yellow-400 h-full rounded-full" 
                  style={{ width: `${bar.pct}%` }}
                ></div>
              </div>
              <span className="w-8 text-right text-slate-500">{bar.pct}%</span>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-0 flex-shrink-0">
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Write a Review Form (Collapsible) */}
      {showForm && (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 mb-8 animate-fade-in">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Write your review</h3>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              Thank you for your feedback! Your review has been submitted for moderation.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input required type="text" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none" />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input required type="email" className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                <select className="border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none bg-white">
                  <option value="5">5 Stars - Excellent</option>
                  <option value="4">4 Stars - Good</option>
                  <option value="3">3 Stars - Average</option>
                  <option value="2">2 Stars - Poor</option>
                  <option value="1">1 Star - Terrible</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Review</label>
                <textarea required rows={4} className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-primary outline-none resize-none"></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium shadow-md"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Review List */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-4">
            <div className="flex-shrink-0 flex items-center md:items-start gap-4 md:gap-0 md:flex-col md:w-48">
              <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-lg mb-2 overflow-hidden border border-slate-100">
                {/* Fallback avatar generator using initials */}
                {review.author.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900">{review.author}</h4>
                {review.verified && (
                  <span className="text-xs font-semibold text-green-600 flex items-center mt-1">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    Verified Buyer
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div className="flex text-yellow-400 text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < review.rating ? "opacity-100" : "opacity-30"}>★</span>
                  ))}
                </div>
                <span className="text-slate-400 text-sm">{review.date}</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                "{review.content}"
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button className="px-6 py-2 border-2 border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all">
          Load More Reviews
        </button>
      </div>

    </div>
  );
}
