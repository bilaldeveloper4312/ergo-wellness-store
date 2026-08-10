export const metadata = {
  title: "Privacy Policy | ErgoWellness",
  description: "Privacy Policy for ErgoWellness.",
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-10">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-8 pb-4 border-b border-slate-100">Privacy Policy</h1>
          
          <div className="prose prose-slate max-w-none space-y-6">
            <p>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            <p>At ErgoWellness, accessible from getergowellness.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ErgoWellness and how we use it.</p>
            
            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Information We Collect</h3>
            <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
            <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
            <p>When you register for an Account or make a purchase, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.</p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">How We Use Your Information</h3>
            <p>We use the information we collect in various ways, including to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>Develop new products, services, features, and functionality</li>
              <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
              <li>Send you emails</li>
              <li>Find and prevent fraud</li>
            </ul>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Cookies and Web Beacons</h3>
            <p>Like any other website, ErgoWellness uses "cookies". These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>

            <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4">Contact Us</h3>
            <p>If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at support@getergowellness.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
