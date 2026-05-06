import { FiPhone } from 'react-icons/fi'

export default function StickyWhatsApp() {
  return (
    <a
      href="https://wa.me/250789356233"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 px-4 py-3 bg-[#25D366] text-white rounded-full shadow-lg whatsapp-button"
      aria-label="Chat on WhatsApp"
    >
      <FiPhone className="w-5 h-5 whatsapp-icon" />
      <span className="text-sm font-medium hidden sm:inline">WhatsApp</span>
    </a>
  )
}
