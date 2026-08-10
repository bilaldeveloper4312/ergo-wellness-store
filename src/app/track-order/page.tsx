export const metadata = {
  title: "Track My Order | ErgoWellness",
  description: "Track the shipping status of your ErgoWellness order.",
};

export default function TrackOrder() {
  return (
    <div className="bg-slate-50 min-h-[70vh] py-16 flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-10 text-center">
          <div className="w-16 h-16 bg-blue-100 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Track Your Order</h1>
          <p className="text-slate-600 mb-8">
            Enter your order number and email address below to see the latest shipping updates for your package.
          </p>
          
          <form className="space-y-4 text-left">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Order Number</label>
              <input type="text" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="e.g. #EW12345" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input type="email" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-primary" placeholder="Email used at checkout" />
            </div>
            <button type="button" className="w-full bg-brand-primary hover:bg-brand-dark text-white font-bold py-3 px-4 rounded-lg transition-colors mt-2">
              Track Package
            </button>
          </form>
          
          <div className="mt-8 text-sm text-slate-500 bg-slate-50 p-4 rounded-lg">
            <p><strong>Note:</strong> Tracking numbers can take 2-4 days to update in the carrier's system after your order has been dispatched.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
