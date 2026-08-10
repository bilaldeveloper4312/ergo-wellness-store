"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const dataObj = Object.fromEntries(formData.entries());

    fetch("https://formsubmit.co/ajax/5ef7a388329abf3bffad11cc18e49b8f", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dataObj)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success === "true" || data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("idle");
      }
    })
    .catch(error => {
      console.error(error);
      setStatus("idle");
    });
  };

  if (status === "success") {
    return (
      <div className="bg-green-900 border border-green-800 text-green-100 rounded-lg p-3 text-sm flex items-center mb-8">
        <svg className="w-5 h-5 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        Thanks! We will send you tips shortly.
      </div>
    );
  }

  return (
    <form 
      action="https://formsubmit.co/support@getergowellness.com" 
      method="POST" 
      onSubmit={handleSubmit}
      className="flex mb-8"
    >
      <input type="text" name="_honey" style={{ display: "none" }} />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="New Newsletter Subscription - ErgoWellness" />
      <input type="hidden" name="_autoresponse" value="Thank you for subscribing to ErgoWellness! You'll receive our best ergonomic tips and exclusive discounts shortly." />
      
      <input 
        type="email" 
        name="email" 
        required
        placeholder="Email address" 
        className="bg-slate-800 border-none text-sm text-white px-4 py-2 rounded-l-lg w-full focus:ring-1 focus:ring-brand-primary outline-none" 
      />
      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="bg-brand-primary hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg font-bold text-sm transition-colors disabled:opacity-50"
      >
        {status === "submitting" ? "..." : "Join"}
      </button>
    </form>
  );
}
