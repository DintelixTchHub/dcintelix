import { Link } from 'react-router-dom'
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiTwitter, FiGithub } from 'react-icons/fi'
import { useState } from 'react'
import logo from "../assets/logo.png";
import LegalModal from './LegalModal'

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
]

const services = [
  { name: 'Website Creation', path: '/projects' },
  { name: 'Web Application', path: '/projects' },
  { name: 'Online Stores', path: '/projects' },
  { name: 'Phone Apps', path: '/projects' },
]

export default function Footer() {
  const [legalModal, setLegalModal] = useState({ isOpen: false, type: 'privacy' })

  const openLegalModal = (type) => {
    setLegalModal({ isOpen: true, type })
  }

  const closeLegalModal = () => {
    setLegalModal({ ...legalModal, isOpen: false })
  }

  return (
    <footer className="bg-[#0F172A] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
               {/* Logo */}
                     <Link to="/" className="flex items-center space-x-2 ">
                       <div className="w-[150px] h-8  rounded-full flex items-center justify-center bg-white">
                         <img
                           src={logo}
                           alt="DCintelix Digital Solutions"
                           className="w-full h-28 object-contain "
                         />
                       </div>
                     </Link>
            <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
              Building smart digital solutions for businesses. We create professional websites, 
              Web Application, online stores, and phone apps that help businesses grow.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-[#1E293B] rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#0F766E] hover:text-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#1E293B] rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#0F766E] hover:text-white transition-all duration-200"
                aria-label="Twitter"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#1E293B] rounded-lg flex items-center justify-center text-[#94A3B8] hover:bg-[#0F766E] hover:text-white transition-all duration-200"
                aria-label="GitHub"
              >
                <FiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#94A3B8] hover:text-[#14B8A6] transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-[#94A3B8] hover:text-[#14B8A6] transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start">
            <h4 className="text-white font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiMail className="w-5 h-5 text-[#14B8A6] mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <a
                    href="mailto:dcintelix@gmail.com"
                    className="text-[#94A3B8] hover:text-[#14B8A6] transition-colors duration-200 text-sm block"
                  >
                    dcintelix@gmail.com
                  </a>
                  <a
                    href="mailto:dushimec515@gmail.com"
                    className="text-[#94A3B8] hover:text-[#14B8A6] transition-colors duration-200 text-sm block"
                  >
                    dushimec515@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-5 h-5 text-[#14B8A6] flex-shrink-0" />
                <div className="space-y-1">
                  <a
                    href="tel:+250789356233"
                    className="text-[#94A3B8] hover:text-[#14B8A6] transition-colors duration-200 text-sm block"
                  >
                    +250 789 356 233
                  </a>
                  <a
                    href="tel:+250794027348"
                    className="text-[#94A3B8] hover:text-[#14B8A6] transition-colors duration-200 text-sm block"
                  >
                    +250 794 027 348
                  </a>
                  <a
                    href="tel:+250781591552"
                    className="text-[#94A3B8] hover:text-[#14B8A6] transition-colors duration-200 text-sm block"
                  >
                    +250 781 591 552
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="w-5 h-5 text-[#14B8A6] mt-0.5 flex-shrink-0" />
                <span className="text-[#94A3B8] text-sm">
                  Kigali, Rwanda
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#64748B] text-sm">
              © {new Date().getFullYear()} DCintelix. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button 
                onClick={() => openLegalModal('privacy')} 
                className="text-[#64748B] hover:text-[#14B8A6] text-sm transition-colors cursor-pointer bg-transparent border-none"
              >
                Privacy Policy
              </button>
              <button 
                onClick={() => openLegalModal('terms')} 
                className="text-[#64748B] hover:text-[#14B8A6] text-sm transition-colors cursor-pointer bg-transparent border-none"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
      <LegalModal 
        isOpen={legalModal.isOpen} 
        onClose={closeLegalModal} 
        type={legalModal.type} 
      />
    </footer>
  )
}
