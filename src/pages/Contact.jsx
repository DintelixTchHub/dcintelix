import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiMail, FiPhone, FiMapPin, FiSend, FiCheck, FiLoader } from 'react-icons/fi'
import emailjs from '@emailjs/browser'
import { Card, SectionHeading } from '../components/Button'
import SEO from '../components/SEO'

const faqs = [
  {
    question: "What services does DCintelix provide?",
    answer: "We provide complete digital solutions including website creation, custom Web Application, online stores, phone apps, and ongoing support.",
  },
  {
    question: "Do you build custom business websites?",
    answer: "Yes, we specialize in building custom business websites tailored to your specific needs. Every website we create is unique and designed to reflect your brand and meet your business goals.",
  },
  {
    question: "Can you develop phone apps?",
    answer: "Absolutely! We develop phone apps for iPhone and Android. Our apps are designed to provide great user experiences and work well with your existing systems.",
  },
  {
    question: "Do you redesign existing websites?",
    answer: "Yes, we offer website redesign services. We can modernize your existing website, improve its functionality, make it easier to use, and ensure it works well on all devices.",
  },
  {
    question: "How can I start a project with DCintelix?",
    answer: "Starting a project is easy! Simply contact us through this form, email, or phone. We'll schedule a chat to discuss your project needs, timeline, and budget. Then we'll provide a detailed proposal.",
  },
]

// Email configuration - Replace with your actual credentials
// Get free credentials at https://www.emailjs.com/
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      // Send email using EmailJS
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('EmailJS Error:', error)
      setSubmitError('Failed to send message. Please try again or email us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SEO 
        title="Contact Us - Get in Touch"
        description="Contact DCintelix for professional web development and digital solutions. Reach out for a free consultation and let's discuss your project."
        keywords="contact DCintelix, web development inquiry, get a quote, digital agency contact, free consultation"
        url="https://dcintelix.netlify.app/contact"
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
              Get in Touch
            </h1>
            <p className="text-sm md:text-base text-[#475569] max-w-xl">
              Have a project in mind? We'd love to hear from you. Let's discuss how we can help bring your vision to life.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
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
                          <option value="website">Website Creation</option>
                          <option value="webapp">Online Tool</option>
                          <option value="ecommerce">Online Store</option>
                          <option value="mobile">Phone App</option>
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
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0F766E] text-white text-sm font-medium rounded-lg hover:bg-[#0D6D63] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
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
                          Kigali, Rwanda
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Map placeholder */}
                <div className="mt-6 h-36 bg-gradient-to-br from-[#0F766E]/10 to-[#14B8A6]/10 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <FiMapPin className="w-6 h-6 text-[#0F766E]/40 mx-auto mb-1" />
                    <p className="text-[#64748B] text-xs">Serving clients worldwide</p>
                  </div>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-sm text-white/80 mb-6 max-w-xl mx-auto">
              Let's discuss your project and create something amazing together.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0F766E] text-sm font-semibold rounded-lg hover:bg-[#F8FAFC] transition-all duration-200 hover:shadow-lg"
            >
              View Our Work
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
    </>
  )
}
