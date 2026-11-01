'use client'

import { useState, useEffect, useRef } from 'react'
import { Link } from '@/lib/router-compat'
import { useDispatch, useSelector } from 'react-redux'
import { FiArrowRight, FiSearch, FiCalendar, FiUser, FiClock, FiChevronLeft, FiChevronRight, FiSend, FiCheck, FiLoader } from 'react-icons/fi'
import { Card, SectionHeading } from '../components/Button'
import SEO from '../components/SEO'
import { subscribeNewsletter, resetSubscribeStatus } from '../store/newsletterSlice'

// API URL - Update this to your backend URL in production
const API_URL = 'http://localhost:5000/api'

const blogs = [
  {
    id: 1,
    title: "Why Every Business Needs a Professional Website",
    excerpt: "A well designed website helps customers understand what your business offers, find key information, and get in touch. Here's what makes a business website useful.",
    content: "A website gives people a place to learn about your business, explore your products or services, and find out how to contact you. It can also help you reach customers who are searching online.\n\nA clear, up-to-date website can build confidence in your business. Visitors should be able to understand what you offer, see the information they need, and know what to do next.\n\nYour website can also support your marketing. Useful content, clear service pages, and simple contact options can help turn a visit into an inquiry. The right approach depends on your customers and your goals.",
    author: "Christian Dushime",
    date: "March 5, 2026",
    readTime: "5 min read",
    category: "Business",
    image: "website",
  },
  {
    id: 2,
    title: "How Custom Web Applications Improve Business Operations",
    excerpt: "Custom web applications can be designed around your workflows, helping your team manage tasks and connect the tools you already use.",
    content: "Off-the-shelf software may not match the way your business works. A custom web application can be built around your processes, goals, and the needs of your users.\n\nFor example, an application can reduce repetitive data entry, bring information into one place, or connect with systems you already rely on. The right features depend on the problems your team needs to solve.\n\nIt is worth planning for future needs as well as current ones. A well-structured application can be extended over time, though the best solution should match your budget and the scale of your operations.",
    author: "Danny Gikundiro",
    date: "February 28, 2026",
    readTime: "7 min read",
    category: "Technology",
    image: "webapp",
  },
  {
    id: 3,
    title: "Key Benefits of Mobile Applications for Growing Companies",
    excerpt: "A mobile app can make it easier for customers to book services, place orders, and stay connected with your business.",
    content: "A mobile app can be useful when customers need to access your services regularly or complete tasks while on the go. Whether an app makes sense depends on what your customers need and how they currently interact with your business.\n\nFeatures such as booking, order tracking, account management, or support can make common tasks easier. Notifications can also share timely updates, as long as they are useful and not overwhelming.\n\nBefore building an app, consider whether a mobile-friendly website could meet the same needs. Start with the problem you want to solve, then choose the simplest option that works for your customers.",
    author: "Christian Dushime",
    date: "February 20, 2026",
    readTime: "6 min read",
    category: "Mobile",
    image: "mobile",
  },
  {
    id: 4,
    title: "What Makes a Digital Product Scalable",
    excerpt: "Thoughtful architecture, reliable data handling, and regular performance checks can help a digital product grow with your business.",
    content: "A digital product should be able to handle changing needs as a business grows. Planning for that growth can help avoid performance problems and costly rebuilds later.\n\nA few areas deserve attention:\n\n1. **Maintainable architecture**: Keep the system organized so features can be updated without affecting unrelated parts.\n\n2. **Database performance**: Design data structures carefully and review slow queries as usage increases.\n\n3. **Infrastructure**: Choose hosting and services that fit current requirements and can be expanded when needed.\n\n4. **Ongoing monitoring**: Track performance and address bottlenecks before they affect users.\n\nThere is no single architecture that suits every product. Start with the needs you have today, while keeping future changes in mind.",
    author: "Christian Dushime",
    date: "February 12, 2026",
    readTime: "8 min read",
    category: "Technology",
    image: "scalable",
  },
  {
    id: 5,
    title: "How Good UI and UX Build Customer Trust",
    excerpt: "Clear layouts and easy-to-use features help customers find what they need and feel confident using your website or app.",
    content: "User interface (UI) is how a digital product looks and responds. User experience (UX) is how easy and useful it feels to use. Both affect how customers interact with your website or app.\n\nA clear layout helps people find information without unnecessary effort. Consistent design, readable text, and familiar controls can make a product easier to use.\n\nGood UX also means paying attention to the whole task a visitor is trying to complete. Make common actions easy to find, explain what happens next, and remove steps that do not help the user.\n\nTesting designs with real users can reveal problems early. Small improvements based on feedback can make a product easier to use and more welcoming.",
    author: "Gad Irahari",
    date: "February 5, 2026",
    readTime: "6 min read",
    category: "Design",
    image: "uiux",
  },
]

const categories = ['All', 'Business', 'Technology', 'Mobile', 'Design']

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

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const dispatch = useDispatch()
  const { subscribeStatus, subscribeError } = useSelector((state) => state.newsletter)

  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = activeCategory === 'All' || blog.category === activeCategory
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredBlog = blogs[0]

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    dispatch(subscribeNewsletter(newsletterEmail))
  }

  return (
    <>
      <SEO 
        title="Web Development & Digital Business Insights | DCintelix"
        description="Practical insights on web development, mobile apps, user experience, and digital growth from the DCintelix team."
        keywords="blog, articles, web development tips, digital marketing, business growth, technology insights"
        url="https://www.dcintelix.rw/blogs"
      />
      <div className="pt-16">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span className="inline-block text-[#0D6D63] font-medium text-sm uppercase tracking-wider mb-4">
              Insights & News
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Our Blog
            </h1>
            <p className="text-lg text-[#475569] max-w-2xl">
              Read practical ideas on building websites and software, improving user experience, and solving everyday business challenges.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-[#0D6D63] text-white'
                      : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="relative">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 pl-11 pr-4 py-2.5 bg-[#F1F5F9] border-0 rounded-lg text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0D6D63]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div 
              className="relative bg-gradient-to-br from-[#0D6D63] to-[#0D6D63] rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setSelectedBlog(featuredBlog)}
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
              <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
                    Featured Article
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {featuredBlog.title}
                  </h2>
                  <p className="text-white/80 mb-6 max-w-xl">
                    {featuredBlog.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-white/70 text-sm">
                    <span className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4" />
                      {featuredBlog.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <FiClock className="w-4 h-4" />
                      {featuredBlog.readTime}
                    </span>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <FiArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredBlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog, index) => (
                <FadeIn key={blog.id} delay={index * 100}>
                  <Card className="h-full flex flex-col" padding="none">
                    {/* Blog Image */}
                    <div className="h-48 bg-gradient-to-br from-[#0D6D63]/20 to-[#0D6D63]/20 rounded-t-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-[#0D6D63]/60 font-medium uppercase tracking-wider">
                          {blog.category}
                        </div>
                      </div>
                    </div>
                    
                    {/* Blog Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-xs text-[#64748B] mb-3">
                        <span className="flex items-center gap-1">
                          <FiCalendar className="w-3.5 h-3.5" />
                          {blog.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <FiClock className="w-3.5 h-3.5" />
                          {blog.readTime}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-[#0F172A] mb-2 line-clamp-2">
                        {blog.title}
                      </h3>
                      <p className="text-sm text-[#64748B] mb-4 flex-1 line-clamp-3">
                        {blog.excerpt}
                      </p>
                      
                      <button
                        onClick={() => setSelectedBlog(blog)}
                        className="inline-flex items-center gap-2 text-[#0D6D63] font-medium text-sm hover:gap-3 transition-all"
                      >
                        Read More
                        <FiArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#64748B]">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Blog Detail Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm"
            onClick={() => setSelectedBlog(null)}
          ></div>
          <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-4 right-4 p-2 bg-[#F1F5F9] rounded-lg text-[#475569] hover:bg-[#E2E8F0] transition-colors z-10"
            >
              ×
            </button>
            
            {/* Modal Content */}
            <div className="h-48 bg-gradient-to-br from-[#0D6D63]/20 to-[#0D6D63]/20 rounded-t-2xl flex items-center justify-center">
              <span className="text-[#0D6D63]/60 font-medium">{selectedBlog.category}</span>
            </div>
            
            <div className="p-8">
              <div className="flex items-center gap-4 text-sm text-[#64748B] mb-4">
                <span className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  {selectedBlog.date}
                </span>
                <span className="flex items-center gap-2">
                  <FiClock className="w-4 h-4" />
                  {selectedBlog.readTime}
                </span>
                <span className="flex items-center gap-2">
                  <FiUser className="w-4 h-4" />
                  {selectedBlog.author}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
                {selectedBlog.title}
              </h2>
              
              <div className="prose prose-sm max-w-none text-[#475569]">
                {selectedBlog.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
                <Link
                  to="/contact"
                  onClick={() => setSelectedBlog(null)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D6D63] text-white font-medium rounded-lg hover:bg-[#0D6D63] transition-colors"
                >
                  Get in Touch
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-[#475569] mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest insights on web development, 
              digital solutions, and technology trends.
            </p>
            {subscribeStatus === 'succeeded' ? (
              <div className="bg-[#0D6D63]/10 border border-[#0D6D63]/30 rounded-lg p-6 max-w-md mx-auto">
                <FiCheck className="w-12 h-12 text-[#0D6D63] mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                  Thanks for subscribing!
                </h3>
                <p className="text-[#475569]">
                  You'll receive our latest updates in your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 px-5 py-3 bg-[#F1F5F9] border-0 rounded-lg text-[#0F172A] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#0D6D63]"
                />
                <button 
                  type="submit"
                  disabled={subscribeStatus === 'loading'}
                  className="px-6 py-3 bg-[#0D6D63] text-white font-medium rounded-lg hover:bg-[#0D6D63] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {subscribeStatus === 'loading' ? (
                    <>
                      <FiLoader className="w-4 h-4 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      Subscribe
                    </>
                  )}
                </button>
              </form>
            )}
            {subscribeError && (
              <p className="text-red-500 mt-4">{subscribeError}</p>
            )}
          </FadeIn>
        </div>
      </section>
    </div>
    </>
  )
}
