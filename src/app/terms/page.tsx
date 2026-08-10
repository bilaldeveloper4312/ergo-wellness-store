export const metadata = {
  title: "Terms of Service | ErgoWellness",
  description: "Terms of Service for ErgoWellness.",
};

export default function TermsOfService() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8 pb-4 border-b border-slate-100">Terms of Service</h1>
          
          <div className="prose prose-slate max-w-none space-y-6">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">1. Agreement to Terms</h3>
            <p>By viewing or using this website, which can be accessed at getergowellness.com, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site.</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">2. Use License</h3>
            <p>Permission is granted to temporarily download one copy of the materials on ErgoWellness's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>modify or copy the materials;</li>
              <li>use the materials for any commercial purpose or for any public display;</li>
              <li>attempt to reverse engineer any software contained on ErgoWellness's Website;</li>
              <li>remove any copyright or other proprietary notations from the materials; or</li>
              <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">3. Medical Disclaimer</h3>
            <p>The products and information provided on this website are for general informational purposes only and are not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition or pain management. Reliance on any information provided by ErgoWellness is solely at your own risk.</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">4. Limitations</h3>
            <p>ErgoWellness or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on ErgoWellness's Website, even if ErgoWellness or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage.</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">5. Revisions and Errata</h3>
            <p>The materials appearing on ErgoWellness's Website may include technical, typographical, or photographic errors. ErgoWellness will not promise that any of the materials in this Website are accurate, complete, or current. ErgoWellness may change the materials contained on its Website at any time without notice.</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">6. Site Terms of Use Modifications</h3>
            <p>ErgoWellness may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Contact Information</h3>
            <p>For any questions regarding these Terms of Service, please contact us at support@getergowellness.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
