import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaShieldAlt, FaCookieBite, FaUserLock, FaEnvelope, FaDatabase, FaHandshake, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa'

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const lastUpdated = "March 13, 2026"

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
              <FaShieldAlt className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 animate-fade-in">
              Privacy Policy
            </h1>
            <p className="text-xl text-teal-100 max-w-2xl mx-auto animate-slide-up">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
            </p>
            <p className="mt-4 text-teal-200 text-sm">
              Last Updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium mb-8 transition-colors group"
          >
            <FaArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <FaUserLock className="text-teal-600" />
                Introduction
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                DC Intelix Digital Solutions ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, disclosed, and safeguarded by us when you visit our website, use our services, or interact with us in any way.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4">
                By accessing or using our website, you agree to the terms of this Privacy Policy. If you do not agree with the practices described herein, please do not use our website.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <FaDatabase className="text-teal-600" />
                Information We Collect
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Personal Information</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    We may collect personal information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-2 space-y-1 ml-2">
                    <li>Fill out a contact form</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Request a quote or consultation</li>
                    <li>Submit your resume or job application</li>
                    <li>Communicate with us via email or social media</li>
                  </ul>
                  <p className="text-slate-600 dark:text-slate-300 mt-2">
                    This information may include your name, email address, phone number, company name, job title, and any other details you choose to provide.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Automatically Collected Information</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    When you visit our website, we automatically collect certain information including:
                  </p>
                  <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-2 space-y-1 ml-2">
                    <li>IP address and browser type</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>Referring/exit URLs</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cookies */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <FaCookieBite className="text-teal-600" />
                Cookies & Tracking Technologies
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from. Cookies are small files that are placed on your device when you visit a website.
              </p>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Types of Cookies We Use:</h3>
                <ul className="space-y-3 mt-2">
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-full text-sm font-bold shrink-0">1</span>
                    <div>
                      <strong className="text-slate-800 dark:text-white">Essential Cookies:</strong>
                      <p className="text-slate-600 dark:text-slate-300">Necessary for the website to function properly. These cannot be switched off in our system.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-full text-sm font-bold shrink-0">2</span>
                    <div>
                      <strong className="text-slate-800 dark:text-white">Analytics Cookies:</strong>
                      <p className="text-slate-600 dark:text-slate-300">Help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-teal-100 dark:bg-teal-900/30 text-teal-600 rounded-full text-sm font-bold shrink-0">3</span>
                    <div>
                      <strong className="text-slate-800 dark:text-white">Marketing Cookies:</strong>
                      <p className="text-slate-600 dark:text-slate-300">Used to track visitors across websites to display relevant and engaging advertisements.</p>
                    </div>
                  </li>
                </ul>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mt-4">
                You can manage your cookie preferences at any time through your browser settings. However, disabling certain cookies may affect your experience on our website.
              </p>
            </div>

            {/* How We Use Information */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <FaHandshake className="text-teal-600" />
                How We Use Your Information
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Providing and maintaining our services",
                  "Responding to your inquiries and requests",
                  "Sending you marketing and promotional communications",
                  "Analyzing usage patterns to improve user experience",
                  "Detecting and preventing fraudulent activities",
                  "Complying with legal obligations",
                  "Customizing content and recommendations",
                  "Communicating about updates and new features"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                    <span className="text-slate-700 dark:text-slate-200 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Security */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <FaShieldAlt className="text-teal-600" />
                Data Security
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-4 space-y-2 ml-2">
                <li>SSL/TLS encryption for data in transit</li>
                <li>Secure server infrastructure</li>
                <li>Regular security audits and assessments</li>
                <li>Employee training on data protection</li>
                <li>Access controls and authentication protocols</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-300 mt-4">
                While we strive to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>

            {/* Third Party Disclosure */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-3">
                <FaExclamationTriangle className="text-teal-600" />
                Third-Party Disclosure
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to outside parties unless we provide you with advance notice. This does not include:
              </p>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 mt-4 space-y-2 ml-2">
                <li>Trusted third parties who assist us in operating our website</li>
                <li>Conducting our business</li>
                <li>Serving you</li>
                <li>As long as those parties agree to keep this information confidential</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-300 mt-4">
                We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FaEnvelope className="text-teal-200" />
                Contact Us
              </h2>
              <p className="text-teal-100 leading-relaxed mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="space-y-3">
                <Link 
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-teal-700 font-semibold rounded-xl hover:bg-teal-50 transition-colors"
                >
                  Contact Us
                  <FaArrowLeft className="w-4 h-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
