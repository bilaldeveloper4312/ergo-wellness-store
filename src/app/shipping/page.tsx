export const metadata = {
  title: "Shipping Policy | ErgoWellness",
  description: "Learn about ErgoWellness shipping times and policies.",
};

export default function ShippingPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8 pb-4 border-b border-slate-100">Shipping Policy</h1>
          
          <div className="prose prose-slate max-w-none space-y-6">
            <p>At ErgoWellness, our goal is to offer you the best shipping options, no matter where you live. We deliver to hundreds of customers across the world every day, and we strive to provide you with services of the highest level.</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Order Processing Time</h3>
            <p>All orders are sent to the fulfillment center for dispatch within <strong>24 to 72 hours</strong> after the order is placed. Tracking numbers will be automatically emailed to you once your order has been dispatched.</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Shipping Times</h3>
            <p>We are proud to offer international shipping. Please note that shipping times are estimates and start from the date of dispatch, rather than the date of your order.</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li><strong>United States:</strong> 7 - 12 Business Days</li>
              <li><strong>United Kingdom:</strong> 6 - 10 Business Days</li>
              <li><strong>Canada & Australia:</strong> 8 - 14 Business Days</li>
              <li><strong>Rest of World:</strong> 10 - 20 Business Days</li>
            </ul>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Tracking Your Order</h3>
            <p>Once your order ships, you will receive an email containing your tracking number. You can track your order using our Track Order page or on the courier's website. Please note that it may take a few days for tracking information to update in the system.</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Customs, Duties and Taxes</h3>
            <p>ErgoWellness is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. Damages & Lost Packages</h3>
            <p>If your package arrives damaged, or if it is lost in transit, please contact us immediately at <strong>support@getergowellness.com</strong> so we can investigate and arrange a replacement for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
