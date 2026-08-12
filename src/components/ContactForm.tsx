"use client";

import { useSearchParams } from "next/navigation";

export default function ContactForm() {
  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";

  if (isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
        <p>Thank you for reaching out. We will get back to you at the email provided as soon as possible.</p>
        <a 
          href="/contact"
          className="mt-4 inline-block text-brand-primary font-bold hover:underline"
        >
          Send another message
        </a>
      </div>
    );
  }

  return (
    <form action="https://formsubmit.co/support@getergowellness.com" method="POST" className="space-y-4">
      {/* FormSubmit Configuration */}
      <input type="hidden" name="_next" value="https://www.getergowellness.com/contact?success=true" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="New Contact Form Submission - ErgoWellness" />
      <input type="hidden" name="_autoresponse" value="Thank you for contacting ErgoWellness! We have received your message and will get back to you within 24 hours." />

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
        <input type="text" name="name" required className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="John Doe" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
        <input type="email" name="email" required className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="john@example.com" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Order Number (Optional)</label>
        <input type="text" name="order_number" className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="#EW12345" />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
        <textarea name="message" required rows={4} className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="How can we help?"></textarea>
      </div>
      <button 
        type="submit" 
        className="w-full bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-lg transition-colors flex justify-center items-center"
      >
        Send Message
      </button>
      
      <div className="text-xs text-center text-slate-500 mt-4">
        We aim to reply within 24 hours.
      </div>
    </form>
  );
}
