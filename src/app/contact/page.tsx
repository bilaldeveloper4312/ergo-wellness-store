export const metadata = {
  title: "Contact Us | ErgoWellness",
  description: "Get in touch with the ErgoWellness support team. We're here to help you live a pain-free life.",
};

export default function Contact() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-brand-primary p-10 text-center">
            <h1 className="text-3xl font-extrabold text-white mb-2">Get in Touch</h1>
            <p className="text-blue-100">We're here to help you live pain-free.</p>
          </div>
          
          <div className="p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Contact Information</h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                  Have a question about an order, our products, or need advice on improving your desk setup? Our ergonomic specialists are standing by.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-6 h-6 text-brand-primary mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    <div className="ml-4">
                      <p className="font-bold text-slate-900">Email Us</p>
                      <p className="text-slate-600 text-sm">support@getergowellness.com</p>
                      <p className="text-slate-400 text-xs mt-1">We aim to reply within 24 hours.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start mt-6">
                    <svg className="w-6 h-6 text-brand-primary mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <div className="ml-4">
                      <p className="font-bold text-slate-900">Business Hours</p>
                      <p className="text-slate-600 text-sm">Monday - Friday</p>
                      <p className="text-slate-600 text-sm">9:00 AM - 5:00 PM (EST)</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input type="text" className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Order Number (Optional)</label>
                    <input type="text" className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="#EW12345" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea rows={4} className="w-full border border-slate-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="How can we help?"></textarea>
                  </div>
                  <button type="button" className="w-full bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-lg transition-colors">
                    Send Message
                  </button>
                </form>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
