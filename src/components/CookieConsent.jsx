import { useState, useEffect } from 'react'
import LegalModal from './LegalModal'

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('dcintelix-cookie-consent')
    if (!consent) {
      // Small delay to show animation smoothly
      setTimeout(() => {
        setIsVisible(true)
        setIsAnimating(true)
      }, 500)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('dcintelix-cookie-consent', 'accepted')
    setIsAnimating(false)
    setTimeout(() => setIsVisible(false), 300)
  }

  const handleDeny = () => {
    localStorage.setItem('dcintelix-cookie-consent', 'denied')
    setIsAnimating(false)
    setTimeout(() => setIsVisible(false), 300)
  }

  if (!isVisible) return null

  return (
    <>
      <LegalModal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)} 
        type="privacy" 
      />
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 p-2 sm:p-3 transition-all duration-300 ${
        isAnimating 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-full opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div 
          className={`
            relative overflow-hidden
            bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
            dark:from-slate-800 dark:via-slate-700 dark:to-slate-800
            rounded-lg sm:rounded-xl shadow-2xl border border-slate-600/30
            backdrop-blur-sm
            animate-scale-in
          `}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative p-2 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <svg 
                  className="w-3.5 h-3.5 text-teal-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                  />
                </svg>
                <h3 className="text-white font-semibold text-xs sm:text-sm">
                  We Value Your Privacy
                </h3>
              </div>
              <p className="text-slate-300 text-[10px] sm:text-xs leading-tight">
                We use cookies to enhance your browsing experience. 
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault()
                    setShowPrivacyModal(true)
                  }}
                  className="text-teal-400 hover:text-teal-300 underline ml-1 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </a>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={handleAccept}
                className="
                  group relative px-3 py-1.5 sm:px-4 sm:py-2
                  bg-gradient-to-r from-teal-600 to-teal-500
                  hover:from-teal-500 hover:to-teal-400
                  text-white font-medium text-[10px] sm:text-xs rounded-lg sm:rounded-xl
                  shadow-lg shadow-teal-500/20
                  transition-all duration-300
                  hover:shadow-xl hover:shadow-teal-500/30
                  hover:-translate-y-0.5
                  active:translate-y-0
                  flex items-center justify-center gap-1.5
                  overflow-hidden
                "
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Accept
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
              
              <button
                onClick={handleDeny}
                className="
                  px-3 py-1.5 sm:px-4 sm:py-2
                  bg-transparent border border-slate-500/50
                  hover:border-red-400/50 hover:bg-red-500/10
                  text-slate-300 hover:text-red-400
                  font-medium text-[10px] sm:text-xs rounded-lg sm:rounded-xl
                  transition-all duration-300
                  hover:-translate-y-0.5
                  flex items-center justify-center gap-1.5
                "
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Deny
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
