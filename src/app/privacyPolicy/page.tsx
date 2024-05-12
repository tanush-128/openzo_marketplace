export default function privacyPolicyPage() {
  return (
    <div className="bg-gray-100 text-gray-800">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold">Welcome to Openzo</h1>

        <p className="mb-6">
          We prioritize the privacy of our visitors. This Privacy Policy
          outlines the types of information we collect and how we utilize it.
        </p>

        <h2 className="mb-2 text-2xl font-bold">Consent</h2>
        <p className="mb-6">
          By using our website, you hereby consent to our Privacy Policy and
          agree to its terms.
        </p>

        <h2 className="mb-2 text-2xl font-bold">Information We Collect</h2>
        <p className="mb-6">
          When you visit Openzo, we may ask you to provide personal information
          that will be used to contact or identify you. Information we request
          will be made clear at the time of collection.
        </p>
        <p className="mb-6">
          If you reach out to us directly, we may receive additional details
          such as your name, email address, phone number, the content of your
          message, and/or attachments you may send us, along with any other
          information you choose to provide.
        </p>

        <h2 className="mb-2 text-2xl font-bold">How We Use Your Information</h2>
        <ul className="mb-6 list-disc pl-6">
          <li>Operate and maintain Openzo</li>
          <li>Enhance, personalize, and expand our website</li>
          <li>Comprehend and analyze how you engage with Openzo</li>
          <li>Develop new products, services, and features</li>
          <li>
            Communicate with you, directly or through one of our partners, for
            customer service, updates, and promotional purposes
          </li>
          <li>Send you emails</li>
          <li>Detect and prevent fraud</li>
        </ul>

        <h2 className="mb-2 text-2xl font-bold">Log Files</h2>
        <p className="mb-6">
          Openzo follows a standard procedure of using log files. These files
          log visitors when they visit websites. The information collected
          includes IP addresses, browser type, Internet Service Provider (ISP),
          date and time stamps, referring/exit pages, and possibly the number of
          clicks. This data is not linked to any personally identifiable
          information.
        </p>

        <h2 className="mb-2 text-2xl font-bold">Contact Us</h2>
        <p className="mb-6">
          For any questions or suggestions about our Privacy Policy, please
          don’t hesitate to contact us at{" "}
          <a href="mailto:business@openzo.in" className="text-blue-500">
            business@openzo.in
          </a>
        </p>
      </div>
    </div>
  );
}
