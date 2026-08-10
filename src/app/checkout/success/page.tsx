import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <div className="bg-slate-50 min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full text-center border-t-8 border-green-500">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Order Confirmed!</h1>
        <p className="text-slate-600 mb-2">Thank you for choosing ErgoWellness.</p>
        <p className="text-sm text-slate-500 mb-8">We've sent a confirmation email with your order details and tracking link.</p>
        
        <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left border border-slate-100">
          <p className="text-sm text-slate-500 mb-1">Order Number:</p>
          <p className="font-bold text-slate-900 mb-4">#EW{Math.floor(Math.random() * 90000) + 10000}</p>
          <p className="text-sm text-slate-500 mb-1">Status:</p>
          <p className="font-bold text-green-600">Processing</p>
        </div>

        <Link href="/shop" className="block w-full bg-brand-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-dark transition-all hover:-translate-y-1 shadow-lg hover:shadow-xl">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
