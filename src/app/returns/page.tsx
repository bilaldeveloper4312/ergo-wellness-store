export const metadata = {
  title: "Returns & Refunds | ErgoWellness",
  description: "Our 30-Day Pain-Free Returns Policy.",
};

export default function ReturnsPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8 pb-4 border-b border-slate-100">Returns & Refunds Policy</h1>
          
          <div className="prose prose-slate max-w-none space-y-6">
            <h2 className="text-2xl font-bold text-brand-primary">Our 30-Day Pain-Free Guarantee</h2>
            <p>We believe in the quality of our ergonomic solutions. If you are not completely satisfied with your purchase, or if you aren't experiencing the relief you expected, you may return the item within <strong>30 days of receiving it</strong> for a full refund or exchange.</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Eligibility for Returns</h3>
            <p>To be eligible for a return, your item must be:</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>In the same condition that you received it.</li>
              <li>In the original packaging.</li>
              <li>Accompanied by the receipt or proof of purchase.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. How to Initiate a Return</h3>
            <p>To start a return, please contact our support team at <strong>support@getergowellness.com</strong> with your Order Number and the reason for your return. We will provide you with instructions on how and where to send your package.</p>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mt-4 text-sm text-orange-800">
              <strong>Please note:</strong> Items sent back to us without first requesting a return will not be accepted. Do not send your purchase back to the manufacturer.
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Return Shipping Costs</h3>
            <p>You will be responsible for paying for your own shipping costs for returning your item unless the item received was damaged or defective. Shipping costs are non-refundable.</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Refunds</h3>
            <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your credit card or original method of payment within 3-5 business days.</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. Damaged or Defective Items</h3>
            <p>If you receive a defective or damaged product, please contact us immediately with a photo of the defect. We will arrange a replacement to be sent to you at no additional cost.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
