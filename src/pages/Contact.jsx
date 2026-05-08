import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiLoader, FiHome, FiUsers, FiClock } from 'react-icons/fi'
import { Card, SectionHeading } from '../components/Button'
import SEO from '../components/SEO'
import { submitContact, resetSubmitStatus, updateFormData, resetFormData } from '../store/contactSlice'

const faqs = [
  {
    question: "What services does DCintelix provide?",
    answer: "We provide comprehensive digital solutions including custom website development, web application development, e-commerce platforms, mobile app development, and ongoing technical support.",
  },
  {
    question: "Do you build custom business websites?",
    answer: "Yes, we specialize in building custom business websites tailored to your specific requirements. Each website we create is uniquely designed to reflect your brand identity and achieve your business objectives.",
  },
  {
    question: "Can you develop mobile applications?",
    answer: "Absolutely! We develop native and cross-platform mobile applications for both iOS and Android. Our apps are designed to deliver exceptional user experiences while seamlessly integrating with your existing systems.",
  },
  {
    question: "Do you offer website redesign services?",
    answer: "Yes, we provide comprehensive website redesign services. We can modernize your existing website, enhance its functionality, improve user experience, and ensure optimal performance across all devices.",
  },
  {
    question: "How can I start a project with DCintelix?",
    answer: "Starting a project is straightforward. Simply contact us through this form, email, or phone. We'll schedule a consultation to discuss your project requirements, timeline, and budget before providing a detailed proposal.",
  },
]


function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            ref.current?.classList.add('animate-slide-up')
          }, delay)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  )
}

export default function Contact() {
  const formRef = useRef()
  const dispatch = useDispatch()
  const { submitStatus, submitError, formData } = useSelector((state) => state.contact)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    if (submitStatus === 'succeeded') {
      setIsSubmitted(true)
      dispatch(resetFormData())
    }
  }, [submitStatus, dispatch])

  const handleChange = (e) => {
    dispatch(updateFormData({
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(submitContact(formData))
  }

  const resetForm = () => {
    setIsSubmitted(false)
    dispatch(resetSubmitStatus())
    dispatch(resetFormData())
  }

  return (
    <>
      <SEO 
        title="Contact DCintelix - Get in Touch"
        description="Contact DCintelix for professional web development, mobile apps, and digital solutions in Rwanda. Get a free consultation and quote within 24 hours."
        keywords="contact DCintelix, web development inquiry, get a quote, digital agency contact, free consultation, Rwanda web development"
        url="https://www.dcintelix.rw/contact"
      />
      <div className="pt-16">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-3">
              Contact Us
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">
              Let's Discuss Your Project
            </h1>
            <p className="text-sm md:text-base text-[#475569] max-w-xl">
              Whether you have a specific project in mind or simply want to explore possibilities, 
              we'd love to hear from you. Reach out today for a free consultation.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Office Image / Visual */}
            <FadeIn>
              <div className="space-y-6">
                {/* Office image placeholder */}
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden">
                  <div className="h-64 md:h-80 bg-gradient-to-br from-[#0F172A] to-[#1E293B] flex items-center justify-center">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-10 left-10 w-32 h-32 bg-[#14B8A6] rounded-full blur-3xl"></div>
                      <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#0F766E] rounded-full blur-3xl"></div>
                    </div>
                    
                    {/* Office content illustration */}
                    <div className="relative z-10 text-center text-white px-4">
                      <FiHome className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 text-[#14B8A6]" />
                      <h3 className="text-lg md:text-xl font-bold mb-2">DCintelix Kigali</h3>
                      <p className="text-sm text-white/80 max-w-md mx-auto">
                        Our headquarters in the heart of Kigali, Rwanda
                      </p>
                    </div>
                  </div>
                  
                  {/* Location badge */}
                  <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                    <div className="flex items-center gap-2 text-white text-xs">
                      <FiMapPin className="w-3.5 h-3.5" />
                      <span>Kigali, Rwanda</span>
                    </div>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 text-center">
                    <div className="w-10 h-10 bg-[#0F766E]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <FiClock className="w-5 h-5 text-[#0F766E]" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#0F172A] mb-1">24/7 Support</h4>
                    <p className="text-xs text-[#64748B]">Always here to help</p>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="w-10 h-10 bg-[#14B8A6]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <FiUsers className="w-5 h-5 text-[#14B8A6]" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#0F172A] mb-1">Expert Team</h4>
                    <p className="text-xs text-[#64748B]">Skilled professionals</p>
                  </Card>
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn>
              <div>
                <SectionHeading subtitle="Send Us a Message">
                  Let's Start a Conversation
                </SectionHeading>
                <p className="text-xs md:text-sm text-[#475569] mt-3 mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>

                {isSubmitted ? (
                  <Card className="bg-[#14B8A6]/10 border-[#14B8A6]/30">
                    <div className="text-center py-6">
                      <div className="w-12 h-12 bg-[#14B8A6] rounded-full flex items-center justify-center mx-auto mb-3">
                        <FiCheck className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-base font-semibold text-[#0F172A] mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-xs md:text-sm text-[#475569]">
                        Thank you for reaching out. We'll get back to you soon.
                      </p>
                    </div>
                  </Card>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-medium text-[#0F172A] mb-1.5">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
                          placeholder="Kalisa Jean"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-xs font-medium text-[#0F172A] mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-xs font-medium text-[#0F172A] mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
                          placeholder="+250 781111111"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-xs font-medium text-[#0F172A] mb-1.5">
                          Subject *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors"
                        >
                          <option value="">Select</option>
                          <option value="website">Website Design</option>
                          <option value="webapp">Web Applications</option>
                          <option value="ecommerce">E-commerce Development</option>
                          <option value="mobile">Mobile Apps</option>
                          <option value="logo">Logo Design</option>
                          <option value="flyer">Flyer Design</option>
                          <option value="support">Support</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-medium text-[#0F172A] mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F766E] focus:border-transparent transition-colors resize-none"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    {submitError && (
                      <p className="text-red-500 text-xs">{submitError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="btn-primary w-full justify-center inline-flex items-center gap-2"
                    >
                      {submitStatus === 'loading' ? (
                        <>
                          <FiLoader className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FiSend className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* Contact Information */}
            <FadeIn delay={200}>
              <div>
                <SectionHeading subtitle="Contact Information">
                  Reach Out Directly
                </SectionHeading>
                <p className="text-xs md:text-sm text-[#475569] mt-3 mb-6">
                  Prefer to reach out directly? Here's how you can contact us.
                </p>

                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#0F766E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiMail className="w-5 h-5 text-[#0F766E]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[#0F172A] mb-0.5">Email</h4>
                        <a
                          href="mailto:dcintelix@gmail.com"
                          className="text-xs text-[#475569] hover:text-[#0F766E] transition-colors block"
                        >
                          dcintelix@gmail.com
                        </a>
                        <a
                          href="mailto:dushimec515@gmail.com"
                          className="text-xs text-[#475569] hover:text-[#0F766E] transition-colors block"
                        >
                          dushimec515@gmail.com
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-[#14B8A6]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FiPhone className="w-5 h-5 text-[#14B8A6]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-[#0F172A] mb-0.5">Phone</h4>
                        <a
                          href="tel:+250789356233"
                          className="text-xs text-[#475569] hover:text-[#14B8A6] transition-colors block"
                        >
                          +250 789 356 233
                        </a>
                        <a
                          href="tel:+250794027348"
                          className="text-xs text-[#475569] hover:text-[#14B8A6] transition-colors block"
                        >
                          +250 794 027 348
                        </a>
                        <a
                          href="tel:+250781591552"
                          className="text-xs text-[#475569] hover:text-[#14B8A6] transition-colors block"
                        >
                          +250 781 591 552
                        </a>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
  <div className="flex items-start gap-3">
    <div className="w-10 h-10 bg-[#F59E0B]/10 rounded-lg flex items-center justify-center flex-shrink-0">
      <FiMapPin className="w-5 h-5 text-[#F59E0B]" />
    </div>
    <div>
      <h4 className="text-xs font-medium text-[#0F172A] mb-0.5">Location</h4>
      <p className="text-xs text-[#475569]">
        KK 3 Rd, Kigali, Rwanda
      </p>
    </div>
  </div>
</Card>
                </div>

                {/* Google Maps Embed */}
                <div className="mt-6 rounded-xl overflow-hidden border border-[#E6EEF2]">
                  <iframe
                    title="DCintelix location"
                    src="https://maps.google.com/maps?q=KK%203%20Rd%2C%20Kigali%2C%20Rwanda&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="260"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <FadeIn>
              <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">
                FAQ
              </span>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-3">
                Frequently Asked Questions
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-xs md:text-sm text-[#475569]">
                Find answers to common questions about our services.
              </p>
            </FadeIn>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FadeIn key={index} delay={index * 100}>
                <Card padding="none" className="overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between"
                  >
                    <span className="text-xs md:text-sm font-medium text-[#0F172A] pr-3">
                      {faq.question}
                    </span>
                    <span className={`flex-shrink-0 text-[#0F766E] transition-transform duration-200 ${openFaq === index ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className="px-4 pb-3 text-xs text-[#475569]">
                      {faq.answer}
                    </p>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-[#0F766E] to-[#14B8A6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-sm text-white/80 mb-6 max-w-xl mx-auto">
              Let's discuss your project and create something amazing together. Get a free consultation and quote within 24 hours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0F766E] text-sm font-semibold rounded-lg hover:bg-[#F8FAFC] transition-all duration-200 hover:shadow-lg"
              >
                Get Free Quote
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+250789356233"
                className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                Call Now
                <FiPhone className="w-4 h-4" />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
    </>
  )
}
