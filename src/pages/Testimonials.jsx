import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiArrowLeft, FiCheck, FiLoader, FiMessageSquare, FiSend } from 'react-icons/fi'
import SEO from '../components/SEO'
import { resetTestimonialSubmitStatus, submitTestimonial } from '../store/testimonialsSlice'

const initialForm = { name: '', email: '', role: '', testimonial: '' }

export default function Testimonials() {
  const dispatch = useDispatch()
  const { submitStatus, submitError } = useSelector((state) => state.testimonials)
  const [form, setForm] = useState(initialForm)

  useEffect(() => {
    dispatch(resetTestimonialSubmitStatus())
  }, [dispatch])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(submitTestimonial({
      name: form.name,
      email: form.email,
      role: form.role,
      testimonial: form.testimonial,
    }))
  }

  const handleReset = () => {
    setForm(initialForm)
    dispatch(resetTestimonialSubmitStatus())
  }

  return (
    <>
      <SEO
        title="Share Your DCintelix Testimonial"
        description="Tell us about your experience working with DCintelix and share your testimonial."
        url="https://www.dcintelix.rw/testimonials"
      />
      <main className="min-h-screen bg-[#F9FAFC] pt-16">
        <section className="bg-[#0D6D63] py-10 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 mb-4 md:w-14 md:h-14 md:rounded-2xl md:mb-5">
              <FiMessageSquare className="w-5 h-5 md:w-7 md:h-7" />
            </div>
            <p className="text-xs md:text-sm uppercase tracking-wider text-white/75 font-medium mb-2 md:mb-3">Your experience matters</p>
            <h1 className="text-2xl md:text-5xl font-bold mb-3 md:mb-4">Share Your Testimonial</h1>
            <p className="max-w-2xl mx-auto text-sm md:text-lg text-white/85">
              Tell us how DCintelix helped your organization. Your feedback helps other businesses choose the right digital partner.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/" className="inline-flex items-center gap-2 text-[#0D6D63] font-medium text-sm mb-8 hover:text-[#09534C]">
              <FiArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <div className="bg-white border border-[#E6EEF0] rounded-2xl p-6 md:p-8 shadow-sm">
              {submitStatus === 'succeeded' ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-[#0D6D63] flex items-center justify-center mx-auto mb-4">
                    <FiCheck className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Thank you for sharing</h2>
                  <p className="text-[#475569] mb-6">We have received your testimonial and will review it before publishing.</p>
                  <button type="button" onClick={handleReset} className="btn-outline">Submit another testimonial</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="testimonial-name" className="block text-sm font-medium text-[#0F172A] mb-2">Your name *</label>
                      <input id="testimonial-name" name="name" required value={form.name} onChange={handleChange} className="w-full px-4 py-3 bg-[#F9FAFC] border border-[#DCE5E8] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0D6D63]" placeholder="Your full name" />
                    </div>
                    <div>
                      <label htmlFor="testimonial-email" className="block text-sm font-medium text-[#0F172A] mb-2">Email address *</label>
                      <input id="testimonial-email" name="email" type="email" required value={form.email} onChange={handleChange} className="w-full px-4 py-3 bg-[#F9FAFC] border border-[#DCE5E8] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0D6D63]" placeholder="you@example.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="testimonial-role" className="block text-sm font-medium text-[#0F172A] mb-2">Role or organization</label>
                    <input id="testimonial-role" name="role" value={form.role} onChange={handleChange} className="w-full px-4 py-3 bg-[#F9FAFC] border border-[#DCE5E8] rounded-lg text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0D6D63]" placeholder="For example, Founder at Acme Ltd" />
                  </div>

                  <div>
                    <label htmlFor="testimonial-message" className="block text-sm font-medium text-[#0F172A] mb-2">Your testimonial *</label>
                    <textarea id="testimonial-message" name="testimonial" required minLength={20} rows={7} value={form.testimonial} onChange={handleChange} className="w-full px-4 py-3 bg-[#F9FAFC] border border-[#DCE5E8] rounded-lg text-[#0F172A] resize-y focus:outline-none focus:ring-2 focus:ring-[#0D6D63]" placeholder="Tell us about your experience working with DCintelix..." />
                  </div>

                  {submitError && <p className="text-sm text-red-600" role="alert">{submitError}</p>}

                  <button type="submit" disabled={submitStatus === 'loading'} className="btn-primary inline-flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
                    {submitStatus === 'loading' ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiSend className="w-4 h-4" />}
                    {submitStatus === 'loading' ? 'Sending...' : 'Submit testimonial'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}