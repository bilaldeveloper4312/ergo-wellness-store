"use client";

import { useState } from "react";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { submitContactForm } from "@/app/actions/contact";

function ContactFormInner() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    setStatus("submitting");

    try {
      // 1. Get reCAPTCHA token
      const token = await executeRecaptcha("contact_form");

      const form = e.currentTarget;
      const formData = new FormData(form);

      const dataObj = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        order_number: formData.get("order_number") as string,
        message: formData.get("message") as string,
        recaptchaToken: token,
      };

      // 2. Call Server Action
      const result = await submitContactForm(dataObj);

      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "An error occurred.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage("An unexpected error occurred.");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
        <p>Thank you for reaching out. We will get back to you at the email provided as soon as possible.</p>
        <button 
          onClick={() => setStatus("idle")}
          className="mt-4 text-brand-primary font-bold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {status === "error" && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-200">
          {errorMessage}
        </div>
      )}

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
        disabled={status === "submitting" || !executeRecaptcha}
        className="w-full bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 flex justify-center items-center"
      >
        {status === "submitting" ? (
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : (
          "Send Message"
        )}
      </button>
      
      <div className="text-xs text-center text-slate-500 mt-4">
        This site is protected by reCAPTCHA and the Google 
        <a href="https://policies.google.com/privacy" className="text-brand-primary hover:underline ml-1">Privacy Policy</a> and 
        <a href="https://policies.google.com/terms" className="text-brand-primary hover:underline ml-1">Terms of Service</a> apply.
      </div>
    </form>
  );
}

export default function ContactForm() {
  return (
    <GoogleReCaptchaProvider reCaptchaKey="6LeJZIItAAAAAPG51ziS0JBmF_bfAQb1UC26qfQn">
      <ContactFormInner />
    </GoogleReCaptchaProvider>
  );
}
