import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiCode, FiGlobe, FiSmartphone, FiShoppingCart, FiLayers, FiShield, FiTrendingUp, FiClock, FiUser, FiBox, FiImage, FiDatabase, FiServer, FiSettings, FiTarget, FiMonitor, FiPhone, FiSend, FiLoader } from 'react-icons/fi'
import { Card, SectionHeading } from '../components/Button'
import SEO from '../components/SEO'
const Partnerships = lazy(() => import('../components/Partnerships'))
import { submitContact, resetSubmitStatus, updateFormData, resetFormData } from '../store/contactSlice'
import heroImage from '../assets/hero.webp'
import founderImage from '../assets/pasport.webp'
import gadImage from '../assets/Gad.webp'
import dannyImage from '../assets/danny.webp'
import ecuruzaImage from '../assets/ecuruza.webp'
import mooorHallBranding from '../assets/moor hall branding.png'
import mooorHallLogo from '../assets/moor logo.png'
const CaseStudies = lazy(() => import('../components/CaseStudies'))
const BlogPreview = lazy(() => import('../components/BlogPreview'))


// Image optimization: Add loading strategies
const LAZY_LOAD = 'lazy'
const EAGER_LOAD = 'eager'

const services = [
  {
    icon: FiGlobe,
    title: 'Websites That Attract Clients',
    description: 'High-converting websites focused on lead capture, clarity of message, and measurable business outcomes.',
    color: 'from-[#0F766E] to-[#14B8A6]',
  },
  {
    icon: FiShoppingCart,
    title: 'E‑commerce That Sells',
    description: 'Optimized stores with checkout performance, trust signals, and conversion-focused UX.',
    color: 'from-[#0F766E] to-[#6366F1]',
  },
  {
    icon: FiSmartphone,
    title: 'Mobile Experiences That Retain',
    description: 'Fast, intuitive mobile apps that keep users engaged and boost retention.',
    color: 'from-[#14B8A6] to-[#0F766E]',
  },
  {
    icon: FiImage,
    title: 'Branding That Builds Trust',
    description: 'Visual identity and messaging that increases perceived value and trust with customers.',
    color: 'from-[#EC4899] to-[#F43F5E]',
  },
  {
    icon: FiBox,
    title: 'Marketing Collateral That Converts',
    description: 'Sales-focused materials and landing pages designed to drive inquiries and purchases.',
    color: 'from-[#0F766E] to-[#6366F1]',
  },
  {
    icon: FiMonitor,
    title: 'Web Apps & Platforms',
    description: 'Scalable web applications and platforms tailored to enterprise needs.',
    color: 'from-[#6366F1] to-[#0F766E]',
  },
]

const features = [
  {
    icon: FiCode,
    title: 'Modern & Scalable Technologies',
    description: 'We build with the latest technologies that grow with your business and ensure long-term sustainability.',
  },
  {
    icon: FiImage,
    title: 'Clean & Professional UI/UX Design',
    description: 'User-friendly interfaces designed to enhance user experience and maximize engagement.',
  },
  {
    icon: FiClock,
    title: 'Reliable Support & Maintenance',
    description: 'Ongoing support and maintenance to ensure your systems operate flawlessly at all times.',
  },
  {
    icon: FiTarget,
    title: 'Business-Tailored Solutions',
    description: 'Custom solutions designed specifically to address your unique business challenges and goals.',
  },
]

const featuredProjects = [
 {
    id: 1,
    title: 'TraumaHelp Rwanda Platform',
    category: 'Web Applications',
    description: 'A secure service that helps therapists and patients communicate, book appointments, and share documents.',
    image: 'https://thr.org.rw/assets/logo-tD9r3Hdz.png',
  },
  {
    id: 2,
    title: 'Moor Logo Design',
    category: 'Logo Design',
    description: 'A clean, modern logo design featuring bold typography and minimalist aesthetics.',
    image: mooorHallLogo,
  },
   {
    id: 3,
    title: 'Moor Hall Branding Package',
    category: 'Logo Design',
    description: 'Comprehensive branding solution including logo, color scheme, and visual guidelines.',
    image: mooorHallBranding,
  },
]

// Normalize any embedded data-URI images to use the local `ecuruzaImage` asset
featuredProjects.forEach(p => { if (typeof p.image === 'string' && p.image.startsWith('data:')) p.image = ecuruzaImage; });

const testimonials = [
  {
    quote: "DCintelix delivered an exceptional e-commerce website that significantly boosted our online sales within the first month. Their deep understanding of the Rwanda market combined with technical expertise resulted in a platform that perfectly meets our business needs.",
    author: "Mugisha Joseph",
    role: "Owner, Kigali Fashion Hub",
  },
  {
    quote: "Working with DCintelix was a seamless experience. They developed a custom booking system for our tourism company that efficiently handles all customer operations. The team demonstrated professionalism throughout the project with excellent local support.",
    author: "Mukamana Florence",
    role: "Director, Rwanda Eco Tours",
  },
  {
    quote: "They built a comprehensive healthcare platform that connects therapists with patients seamlessly. The system functions flawlessly and the ongoing support has been outstanding. I highly recommend DCintelix to any business in Rwanda seeking quality digital solutions.",
    author: "Dr. Niyonkuru Pasteur",
    role: "Founder, TraumaHelp Rwanda",
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

function AnimatedCounter({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          let startTime
          const step = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = Math.min((timestamp - startTime) / duration, 1)
            setCount(Math.floor(progress * end))
            if (progress < 1) {
              requestAnimationFrame(step)
            }
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [end, duration, hasAnimated])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Home() {
  return (
    <>
      <SEO 
        title="DCintelix - Digital Solutions for Your Business"
        description="DCintelix provides professional web development, digital marketing, and custom software solutions. Transform your business with our expert digital services."
        keywords="web development, digital marketing, software solutions, custom websites, SEO, mobile apps, business solutions"
        url="https://www.dcintelix.rw/"
      />
      <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-white to-[#F0FDFA] py-14 md:py-20 lg:py-24">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmMWY1YzkiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
          
           {/* Floating Orbs */}
           <div className="absolute top-20 left-10 w-72 h-72 bg-[#0F766E]/5 rounded-full blur-3xl animate-pulse"></div>
           <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#14B8A6]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F59E0B]/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Hero Content */}
            <div className="max-w-2xl">
              <FadeIn>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#0F766E]/10 text-[#0F766E] text-sm font-semibold rounded-full mb-6">
                  <span className="w-2 h-2 bg-[#0F766E] rounded-full animate-pulse"></span>
                  Digital Solutions Company
                </span>
              </FadeIn>
              
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#0F172A] leading-tight mb-6 section-heading">
                  Empowering Rwanda Through AI & Digital Innovation
                </h1>

                <p className="text-base md:text-lg text-[#475569] mb-6 leading-relaxed max-w-xl">
                  We help businesses, schools, NGOs, startups, and enterprises automate operations, grow digitally, and scale using modern AI-powered technology solutions.
                </p>

                <div className="flex flex-col items-center gap-3 min-[375px]:flex-row min-[375px]:items-center">
                  <Link
                    to="/contact"
                    className="inline-flex w-full min-[375px]:w-auto justify-center items-center gap-2 btn-primary"
                  >
                    Start a Project
                    <FiArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/contact"
                    className="inline-flex w-full min-[375px]:w-auto justify-center items-center gap-2 btn-outline"
                  >
                    Partner With Us
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>

              <FadeIn delay={400}>
                <div className="mt-6 text-sm text-[#475569]">
                  <span className="font-medium text-[#0F172A]">Trusted by growing businesses in Rwanda</span>
                </div>
              </FadeIn>
            </div>

            {/* Right - Hero Image with floating elements */}
            <div className="relative">
              <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
                <div className="relative">
                  {/* Floating gradient accents */}
                  <div className="floating-gradient" style={{ width: 320, height: 320, top: -40, left: -40, background: 'radial-gradient(circle at 30% 30%, rgba(13,109,99,0.12), transparent 30%)' }}></div>
                  <div className="floating-gradient" style={{ width: 420, height: 420, bottom: -80, right: -60, background: 'radial-gradient(circle at 70% 70%, rgba(245,158,11,0.08), transparent 35%)' }}></div>

                  {/* Main Image */}
                  <img
                    src={heroImage}
                    alt="DCintelix Digital Solutions"
                    className="w-full h-auto object-contain relative z-10"
                    loading="eager"
                    fetchPriority="high"
                  />
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-[#0F766E] to-[#14B8A6] rounded-2xl opacity-20 rotate-12"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-2xl opacity-20 -rotate-12"></div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 50C120 30 240 60 360 50C480 40 600 20 720 30C840 40 960 60 1080 50C1200 40 1320 20 1440 50V100H0V50Z" fill="white"/>
          </svg>
        </div>
      </section>
     


      {/* Problem / Psychology Section */}
      <section className="py-10 md:py-14 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <FadeIn>
              <h2 className="text-xl md:text-2xl font-bold text-[#0F172A]">Why Most Business Websites Fail</h2>
            </FadeIn>
            <FadeIn delay={100}>
              <p className="text-sm md:text-base text-[#475569] max-w-2xl mx-auto mt-3">
                Simple reasons: unclear message, slow load times, and no focus on converting visitors into clients. We fix these core issues so your site becomes a client-generating asset.
              </p>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <FadeIn>
              <div className="p-5 border rounded-lg">
                <h4 className="text-sm font-semibold text-[#0F172A] mb-2">No clear message</h4>
                <p className="text-xs text-[#64748B]">Visitors should know within 3 seconds how you help them. We craft headlines and funnels that convert.</p>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="p-5 border rounded-lg">
                <h4 className="text-sm font-semibold text-[#0F172A] mb-2">Slow performance</h4>
                <p className="text-xs text-[#64748B]">Speed kills bounce rate. We optimize performance for real-world users and search engines.</p>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="p-5 border rounded-lg">
                <h4 className="text-sm font-semibold text-[#0F172A] mb-2">Poor funnel</h4>
                <p className="text-xs text-[#64748B]">Design without a funnel loses leads. We guide users from discovery to contact with deliberate CTAs and trust builders.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <FadeIn>
              <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">
                Our Services
              </span>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-3">
                Comprehensive Digital Solutions
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-sm md:text-base text-[#475569] max-w-xl mx-auto">
                We deliver end-to-end digital services tailored to transform your business and drive measurable results.
              </p>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
              <FadeIn key={index} delay={index * 100}>
                <Card className="h-full card-modern glass group overflow-hidden border-transparent">
                  <div className="relative">
                    <div className={`h-28 bg-gradient-to-br ${service.color} flex items-center justify-center`}></div>

                    <div className="absolute -top-8 left-6">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md transform group-hover:scale-105 transition-transform">
                        <service.icon className="w-7 h-7 text-[#0F172A]" />
                      </div>
                    </div>

                    <div className="p-5 pt-8">
                      <h3 className="text-base font-semibold text-[#0F172A] mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-[#64748B] leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-4">
                        <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-medium text-[#0F766E] hover:underline">
                          Talk about this
                          <FiArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Social Proof Section */}
      <section className="py-10 md:py-14 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <FadeIn>
                <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">
                  Trusted & Proven
                </span>
              </FadeIn>
              <FadeIn delay={100}>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A] mb-4">
                  Trusted by organizations across Rwanda
                </h2>
              </FadeIn>

              <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-3 items-center mb-6">
                {[ecuruzaImage, ecuruzaImage, ecuruzaImage, ecuruzaImage].map((logo, i) => (
                  <div key={i} className="flex items-center justify-center p-3 bg-[#F8FAFC] rounded-lg">
                    <img src={logo} alt={`client-${i}`} className="h-10 object-contain" loading="lazy" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-md mb-6">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl counter"><AnimatedCounter end={20} suffix="+" duration={1600} /></div>
                  <div className="text-sm text-[#64748B]">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl counter"><AnimatedCounter end={18} duration={1600} /></div>
                  <div className="text-sm text-[#64748B]">Satisfied Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl counter">Fast</div>
                  <div className="text-sm text-[#64748B]">Support</div>
                </div>
              </div>

              <FadeIn delay={200}>
                <div className="card-modern p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#0F766E] flex items-center justify-center text-white font-semibold">M</div>
                    <div>
                      <div className="text-sm font-semibold text-[#0F172A]">"{testimonials[0].quote.split('.').slice(0,1).join('.')}."</div>
                      <div className="text-xs text-[#64748B] mt-1">{testimonials[0].author} — {testimonials[0].role}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>

            <div>
              <FadeIn>
                <div className="bg-[#F8FAFC] p-6 rounded-xl">
                  <h3 className="text-lg font-semibold mb-3">AI-Powered Solutions & Rwanda-Based Innovation</h3>
                  <p className="text-sm text-[#475569] mb-4">We combine local market knowledge with modern AI-driven workflows to deliver systems that scale and perform.</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3"><FiCheck className="text-[#14B8A6] mt-1" /> <span className="text-sm text-[#475569]">AI automation that reduces manual work</span></li>
                    <li className="flex items-start gap-3"><FiCheck className="text-[#14B8A6] mt-1" /> <span className="text-sm text-[#475569]">Fast local support & SLA options</span></li>
                    <li className="flex items-start gap-3"><FiCheck className="text-[#14B8A6] mt-1" /> <span className="text-sm text-[#475569]">Enterprise-grade integrations</span></li>
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By / Clients Section - Marquee */}
       <section className="py-8 md:py-12 bg-white border-y border-[#E2E8F0]">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-8">
             <FadeIn>
               <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">
                 Trusted By
               </span>
             </FadeIn>
             <FadeIn delay={100}>
               <h2 className="text-lg md:text-xl font-bold text-[#0F172A] mb-2">
                 Companies & Organizations We've Worked With
               </h2>
             </FadeIn>
           </div>

           <FadeIn delay={200}>
             <div className="marquee-container">
               <div className="marquee-content">
                 {/* First set of clients */}
                 {[
                   'Kigali Fashion Hub',
                   'Rwanda Eco Tours',
                   'TraumaHelp Rwanda',
                   'OldFox Tours',
                   'E-Curuza',
                   'Local Businesses',
                 ].map((client, index) => (
                   <div
                     key={index}
                     className="marquee-item h-16 md:h-20 bg-gradient-to-r from-[#F8FAFC] to-[#E2E8F0] rounded-lg flex items-center justify-center px-4 hover:from-[#0F766E]/5 hover:to-[#14B8A6]/5 transition-colors"
                   >
                     <span className="text-xs md:text-sm font-medium text-[#64748B] text-center">
                       {client}
                     </span>
                   </div>
                 ))}
                 {/* Duplicate set for seamless loop */}
                 {[
                   'Kigali Fashion Hub',
                   'Rwanda Eco Tours',
                   'TraumaHelp Rwanda',
                   'OldFox Tours',
                   'E-Curuza',
                   'Local Businesses',
                 ].map((client, index) => (
                   <div
                     key={`dup-${index}`}
                     className="marquee-item h-16 md:h-20 bg-gradient-to-r from-[#F8FAFC] to-[#E2E8F0] rounded-lg flex items-center justify-center px-4 hover:from-[#0F766E]/5 hover:to-[#14B8A6]/5 transition-colors"
                   >
                     <span className="text-xs md:text-sm font-medium text-[#64748B] text-center">
                       {client}
                     </span>
                   </div>
                 ))}
               </div>
             </div>
           </FadeIn>
         </div>
       </section>

      <Suspense fallback={<div className="py-8" />}>
        <Partnerships />
      </Suspense>

      {/* Coming Soon Services */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <FadeIn>
              <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">
                Coming Soon
              </span>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-3">
                More Services On The Way
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-sm md:text-base text-[#475569] max-w-xl mx-auto">
                We're working on adding more services to help your business grow even more.
              </p>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: FiDatabase, title: 'Domain Registration' },
              { icon: FiServer, title: 'Web Hosting' },
              { icon: FiSettings, title: 'System Maintenance' },
              { icon: FiTarget, title: 'Digital Marketing' },
            ].map((service, index) => (
              <FadeIn key={index} delay={index * 100}>
                <Card className="h-full">
                  <div className="w-10 h-10 bg-[#0F766E]/10 rounded-lg flex items-center justify-center mb-3">
                    <service.icon className="w-5 h-5 text-[#0F766E]" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-[#0F172A] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                    Coming soon
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeIn>
              <SectionHeading subtitle="Why Choose DCintelix">
                We Build Digital Products That Actually Drive Results
              </SectionHeading>
              <p className="text-xs md:text-sm text-[#475569] mt-4 mb-6 leading-relaxed">
                We're not here to just make things look pretty. We combine years of hands-on
                experience with a real understanding of how businesses work. Our approach?
                Keep things simple, make them work, and don't overcomplicate things.
              </p>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F8FAFC] transition-colors">
                    <div className="w-6 h-6 bg-[#14B8A6] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-semibold text-[#0F172A] mb-1">{feature.title}</h4>
                      <p className="text-xs text-[#64748B]">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="relative">
                {/* Main visual - illustration of development process */}
                <div className="relative rounded-xl md:rounded-2xl overflow-hidden">
                  <div className="h-80 bg-gradient-to-br from-[#0F766E] via-[#14B8A6] to-[#0F766E] p-6 md:p-8 flex items-center justify-center">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                      <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-2xl"></div>
                    </div>
                    
                    {/* Central graphic */}
                    <div className="relative z-10 text-center text-white">
                      <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiCode className="w-12 h-12 md:w-16 md:h-16" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold mb-2">Quality Code</h3>
                      <p className="text-sm text-white/80 max-w-xs mx-auto">
                        Clean, maintainable, and scalable solutions
                      </p>
                    </div>
                  </div>
                  
                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#F59E0B] rounded-xl flex items-center justify-center shadow-lg">
                    <FiShield className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#6366F1] rounded-xl flex items-center justify-center shadow-lg">
                    <FiTrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
            <FadeIn>
              <SectionHeading subtitle="Our Work">
                Our Projects
              </SectionHeading>
            </FadeIn>
            <FadeIn delay={100}>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-xs md:text-sm text-[#0F766E] font-medium hover:gap-3 transition-all"
              >
                View All Projects
                <FiArrowRight className="w-3.5 h-4" />
              </Link>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {featuredProjects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 100}>
                <Card className="h-full overflow-hidden">
                  {/* Project Image */}
                  <div className="h-36 md:h-44 bg-gradient-to-br from-[#0F766E]/20 to-[#14B8A6]/20 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiLayers className="w-10 h-10 md:w-12 md:h-12 text-[#0F766E]/40" />
                    )}
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-3 md:p-4 pt-0">
                    <div className="text-xs text-[#14B8A6] font-medium uppercase tracking-wider mb-1.5">
                      {project.category}
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-[#0F172A] mb-1.5">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#64748B] mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <Link
                      to="/projects"
                      className="inline-flex items-center gap-1.5 text-xs text-[#0F766E] font-medium hover:gap-2.5 transition-all"
                    >
                      View Details
                      <FiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-8" />}>
        <CaseStudies projects={featuredProjects} />
      </Suspense>

      {/* Founder Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <FadeIn>
              <div className="relative max-w-xs mx-auto lg:mx-0">
                <img 
                  src={founderImage} 
                  alt="Christian Dushime - Founder" 
                  className="w-full aspect-square max-w-[280px] mx-auto object-cover rounded-xl md:rounded-2xl"
                />
                <div className="absolute -bottom-3 -right-3 w-20 h-20 md:w-24 md:h-24 bg-[#F59E0B] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg md:text-xl">CD</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div>
                <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">
                  Founder & Chief Executive Officer
                </span>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-2">
                  Christian Dushime
                </h2>
                <p className="text-sm text-[#14B8A6] font-medium mb-4">
                  Driving Innovation Through Technology
                </p>
                <p className="text-xs md:text-sm text-[#475569] mb-4 leading-relaxed">
                  A visionary technology leader with extensive experience in building enterprise web applications and scalable systems. His expertise spans backend architecture, API development, cloud infrastructure, and delivering innovative digital solutions that transform businesses.
                </p>
                <p className="text-xs md:text-sm text-[#64748B] mb-5 leading-relaxed">
                  With a proven track record spanning transportation, tourism, healthcare, and content platforms, his strategic leadership guides DCintelix in delivering impactful solutions that help businesses achieve their goals.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Web Development', 'Web Application', 'Data Systems', 'Cloud Services', 'User Interfaces'].map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#F1F5F9] text-[#475569] text-xs rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <FadeIn>
              <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">
                Meet our Team
              </span>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-3">
                The People Behind DCintelix
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-sm md:text-base text-[#475569] max-w-xl mx-auto">
                Real people working on real solutions. That's us.
              </p>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto">
            {/* Gad */}
            <FadeIn>
              <Card className="h-full">
                <div className="flex flex-col items-center text-center p-4">
                  <img 
                    src={gadImage} 
                    alt="Gad Irahari - UI/UX Designer at DCintelix - Creative Designer Specializing in Beautiful and Intuitive User Interfaces" 
                    className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full mb-4 border-4 border-[#0F766E]/20"
                    loading="lazy"
                    width="160"
                    height="160"
                  />
                  <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-1">
                    Senior UI/UX Designer
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-2">
                    Gad
                  </h3>
                  <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                    Expertise in creating intuitive user interfaces and visually compelling designs that enhance user experience and engagement.
                  </p>
                </div>
              </Card>
            </FadeIn>

            {/* Danny */}
            <FadeIn delay={100}>
              <Card className="h-full">
                <div className="flex flex-col items-center text-center p-4">
                  <img 
                    src={dannyImage} 
                    alt="Danny - Frontend Developer at DCintelix - Specialist in Responsive and Interactive Web Applications with Modern Frameworks" 
                    className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full mb-4 border-4 border-[#0F766E]/20"
                    loading="lazy"
                    width="160"
                    height="160"
                  />
                  <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-1">
                    Senior Frontend Developer
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-2">
                    Danny
                  </h3>
                  <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                    Expertise in building responsive, high-performance web applications using modern frameworks and best practices.
                  </p>
                </div>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <FadeIn>
              <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">
                Testimonials
              </span>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A]">
                What Our Clients Say
              </h2>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((testimonial, index) => (
              <FadeIn key={index} delay={index * 100}>
                <Card className="h-full">
                  <div className="mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-[#F59E0B] text-xs">★</span>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-[#475569] mb-4 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <div className="text-xs md:text-sm font-medium text-[#0F172A]">{testimonial.author}</div>
                    <div className="text-xs text-[#64748B]">{testimonial.role}</div>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-8" />}>
        <BlogPreview />
      </Suspense>

      {/* Pricing Preview Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white border-t border-b border-[#E6EEF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <FadeIn>
              <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">Pricing Preview</span>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-lg md:text-xl font-bold text-[#0F172A] mb-2">Simple Packages Pick What Fits Your Business</h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-sm text-[#475569] max-w-2xl mx-auto">Transparent starting points to filter serious projects custom quotes provided after brief discovery.</p>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            <FadeIn>
              <div className="p-6 border rounded-lg text-center">
                <div className="text-xs text-[#64748B] uppercase mb-3">Starter</div>
                <div className="text-2xl font-bold text-[#0F172A] mb-3">RWF 200,000</div>
                <ul className="text-xs text-[#475569] mb-4 space-y-2">
                  <li>Landing / Small business website</li>
                  <li>Mobile-friendly</li>
                  <li>Basic SEO & lead capture</li>
                </ul>
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Get Started</Link>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div className="p-6 border-2 border-[#0F766E] rounded-lg text-center bg-[#F8FEFA]">
                <div className="text-xs text-[#64748B] uppercase mb-3">Business</div>
                <div className="text-2xl font-bold text-[#0F172A] mb-3">RWF 1,500,000</div>
                <ul className="text-xs text-[#475569] mb-4 space-y-2">
                  <li>Multi page business website</li>
                  <li>Conversion focused design & analytics</li>
                  <li>Performance, SEO & basic integrations</li>
                </ul>
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Choose Business</Link>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="p-6 border rounded-lg text-center">
                <div className="text-xs text-[#64748B] uppercase mb-3">Premium</div>
                <div className="text-2xl font-bold text-[#0F172A] mb-3">RWF 5,000,000+</div>
                <ul className="text-xs text-[#475569] mb-4 space-y-2">
                  <li>E‑commerce or custom platform</li>
                  <li>Advanced integrations & automations</li>
                  <li>Premium support & SLAs</li>
                </ul>
                <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Contact Sales</Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

       {/* Quick Contact Form (inline) - bottom of Home page */}
      <section className="py-12 md:py-16 lg:py-20 bg-white border-t border-b border-[#E6EEF2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <FadeIn>
              <div>
                <SectionHeading subtitle="Quick Contact">
                  Send a message we'll reply <br/> within 24 hours
                </SectionHeading>
                <p className="text-sm text-[#475569] mt-2">Prefer a short note? Use this quick form or visit the full contact page for more details.</p>
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <div>
                {/* Inline contact form using existing contact slice */}
                <InlineContactForm />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#0F766E] to-[#14B8A6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              Let’s build your business online today
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-3 max-w-xl mx-auto">
              Limited slots available this week — book a quick discovery to secure your spot.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#0F766E] font-semibold text-sm rounded-lg hover:bg-[#F8FAFC] transition-all duration-200 hover:shadow-xl"
              >
                Start Now
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-5 py-3 border-2 border-white/30 text-white font-semibold text-sm rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                View Our Work
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      
    </div>
    </>
  )
}

function InlineContactForm() {
  const dispatch = useDispatch()
  const { formData, submitStatus, submitError } = useSelector((state) => state.contact)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (submitStatus === 'succeeded') {
      setIsSubmitted(true)
      dispatch(resetFormData())
      setTimeout(() => {
        setIsSubmitted(false)
        dispatch(resetSubmitStatus())
      }, 4000)
    }
  }, [submitStatus, dispatch])

  const handleChange = (e) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(submitContact(formData))
  }

  return (
    <div>
      {isSubmitted ? (
        <Card className="bg-[#14B8A6]/10 border-[#14B8A6]/30">
          <div className="text-center py-6">
            <div className="w-12 h-12 bg-[#14B8A6] rounded-full flex items-center justify-center mx-auto mb-3">
              <FiCheck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-base font-semibold text-[#0F172A] mb-2">Message Sent!</h3>
            <p className="text-xs md:text-sm text-[#475569]">Thanks — we'll be in touch shortly.</p>
          </div>
        </Card>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <input name="name" required placeholder="Your name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg" />
            <input name="email" type="email" required placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg" />
          </div>
          <select name="subject" required value={formData.subject} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
            <option value="">Service</option>
            <option value="website">Website Design</option>
            <option value="ecommerce">E-commerce</option>
            <option value="webapp">Web Application</option>
            <option value="mobile">Mobile App</option>
            <option value="other">Other</option>
          </select>
          <textarea name="message" required rows={4} placeholder="Short message" value={formData.message} onChange={handleChange} className="w-full px-3 py-2 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg resize-none" />
          {submitError && <p className="text-red-500 text-xs">{submitError}</p>}
          <button type="submit" disabled={submitStatus === 'loading'} className="btn-primary inline-flex items-center gap-2">
            {submitStatus === 'loading' ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                Send Message <FiSend className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
  
}