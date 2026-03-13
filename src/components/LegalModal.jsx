import { FiX, FiShield, FiFileText } from 'react-icons/fi'

const privacyPolicyContent = (
  <div className="space-y-4 text-[#475569]">
    <p>
      At DCintelix, we value your privacy and are committed to protecting your personal information. 
      This Privacy Policy outlines how we collect, use, and safeguard your data when you use our services.
    </p>
    
    <h4 className="font-semibold text-[#1E293B]">1. Information We Collect</h4>
    <p>
      We collect information you provide directly to us, including name, email address, phone number, 
      and any other information you choose to provide when contacting us or using our services.
    </p>
    
    <h4 className="font-semibold text-[#1E293B]">2. How We Use Your Information</h4>
    <p>
      We use the information we collect to:
    </p>
    <ul className="list-disc list-inside space-y-1 ml-2">
      <li>Provide and improve our services</li>
      <li>Respond to your inquiries and requests</li>
      <li>Send you important updates and communications</li>
      <li>Analyze usage patterns to enhance user experience</li>
    </ul>
    
    <h4 className="font-semibold text-[#1E293B]">3. Keeping Your Information Safe</h4>
    <p>
      We use appropriate security measures to protect your personal information 
      from unauthorized access, changes, sharing, or deletion.
    </p>
    
    <h4 className="font-semibold text-[#1E293B]">4. Information Sharing</h4>
    <p>
      We do not sell, trade, or otherwise transfer your personal information to outside parties. 
      We may share information with trusted third parties who assist us in operating our website 
      and conducting our business, as long as they agree to keep this information confidential.
    </p>
    
    <h4 className="font-semibold text-[#1E293B]">5. Your Rights</h4>
    <p>
      You have the right to access, correct, or delete your personal information at any time. 
      Contact us at dcintelix@gmail.com to exercise these rights.
    </p>
    
    <h4 className="font-semibold text-[#1E293B]">6. Contact Us</h4>
    <p>
      If you have any questions about this Privacy Policy, please contact us at dcintelix@gmail.com.
    </p>
  </div>
)

const termsOfServiceContent = (
  <div className="space-y-4 text-[#475569]">
    <p>
      Welcome to DCintelix. By accessing and using our website and services, you agree to be 
      bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
    </p>
    
    <h4 className="font-semibold text-[#1E293B]">1. Acceptance of Terms</h4>
    <p>
      By accessing and using DCintelix's website and services, you accept and agree to be bound 
      by the terms and provision of this agreement.
    </p>
    
    <h4 className="font-semibold text-[#1E293B]">2. Services Provided</h4>
    <p>
      DCintelix provides digital solutions including:
    </p>
    <ul className="list-disc list-inside space-y-1 ml-2">
      <li>Website Creation and Development</li>
      <li>Web Application</li>
      <li>Online Stores</li>
      <li>Phone Apps</li>
    </ul>
    
    <h4 className="font-semibold text-[#1E293B]">3. Ownership Rights</h4>
    <p>
      All content, designs, and materials on this website are the intellectual property of DCintelix 
      and may not be reproduced, distributed, or modified without our prior written consent.
    </p>
    
    <h4 className="font-semibold text-[#1E293B]">4. User Responsibilities</h4>
    <p>
      You agree to use our services only for lawful purposes and in accordance with these Terms of Service. 
      You agree not to:
    </p>
    <ul className="list-disc list-inside space-y-1 ml-2">
      <li>Violate any applicable laws or regulations</li>
      <li>Infringe upon the rights of others</li>
      <li>Attempt to gain unauthorized access to our systems</li>
      <li>Transmit any viruses or harmful code</li>
    </ul>
    
    <h4 className="font-semibold text-[#1E293B]">5. Limitation of Liability</h4>
    <p>
      DCintelix shall not be liable for any indirect, incidental, special, consequential, or punitive 
      damages resulting from your use of or inability to use our services.
    </p>
    
    <h4 className="font-semibold text-[#1E293B]">6. Changes to Terms</h4>
    <p>
      We reserve the right to modify these Terms of Service at any time. Your continued use of our 
      services after any changes constitutes your acceptance of the new terms.
    </p>
    
    <h4 className="font-semibold text-[#1E293B]">7. Contact Information</h4>
    <p>
      For questions about these Terms of Service, please contact us at dcintelix@gmail.com.
    </p>
  </div>
)

export default function LegalModal({ isOpen, onClose, type }) {
  if (!isOpen) return null

  const content = type === 'privacy' ? privacyPolicyContent : termsOfServiceContent
  const title = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service'
  const icon = type === 'privacy' ? <FiShield className="w-6 h-6" /> : <FiFileText className="w-6 h-6" />

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[80vh] mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-modal">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0F766E] text-white flex items-center justify-center">
              {icon}
            </div>
            <h2 className="text-xl font-semibold text-[#1E293B]">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#E2E8F0] hover:bg-[#CBD5E1] flex items-center justify-center text-[#64748B] hover:text-[#1E293B] transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto max-h-[calc(80vh-80px)]">
          {content}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E2E8F0] bg-[#F8FAFC]">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-[#0F766E] hover:bg-[#0D9488] text-white font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
