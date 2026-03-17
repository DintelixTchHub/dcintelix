import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiCode, FiGlobe, FiSmartphone, FiShoppingCart, FiLayers, FiShield, FiTrendingUp, FiClock, FiUser, FiBox, FiImage, FiDatabase, FiServer, FiSettings, FiTarget } from 'react-icons/fi'
import { Card, SectionHeading } from '../components/Button'
import SEO from '../components/SEO'
import heroImage from '../assets/hero.png'
import founderImage from '../assets/pasport.png'
import gadImage from '../assets/Gad.png'
import dannyImage from '../assets/danny.jpeg'

const services = [
  {
    icon: FiGlobe,
    title: 'Website Design',
    description: 'We build custom websites that actually look good and work smoothly—on any screen size.',
  },
  {
    icon: FiCode,
    title: 'Web Applications',
    description: 'Custom web apps built specifically for what your business needs.',
  },
  {
    icon: FiShoppingCart,
    title: 'E-commerce Development',
    description: 'Online stores that help you sell more without the headache.',
  },
  {
    icon: FiSmartphone,
    title: 'Mobile Apps',
    description: 'Apps for iPhone and Android that your customers will actually want to use.',
  },
  {
    icon: FiImage,
    title: 'Logo Design',
    description: 'Unique logos that represent your brand and make you stand out.',
  },
  {
    icon: FiBox,
    title: 'Flyer Design',
    description: 'Eye-catching flyers and promotional materials for your business.',
  },
]

const features = [
  {
    icon: FiLayers,
    title: 'We Handle Everything',
    description: 'From setting up your data to designing the interface—we take care of it all.',
  },
  {
    icon: FiShield,
    title: 'Systems That Scale',
    description: 'Built to grow with you, using solid engineering practices.',
  },
  {
    icon: FiTrendingUp,
    title: 'Real Business Solutions',
    description: 'We build things that actually solve your problems.',
  },
  {
    icon: FiClock,
    title: 'On-Time, Every Time',
    description: 'We deliver when we say we will—no excuses.',
  },
]

const featuredProjects = [
  {
    id: 1,
    title: 'Car Wash Booking Application',
    category: 'Phone Apps',
    description: 'A booking service that helps users schedule car wash appointments easily.',
    image: 'data:image/jpeg;base64,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',
  },
  {
    id: 2,
    title: 'OldFox Tourism Platform',
    category: 'Online Platform',
    description: 'A travel and tourism service with booking features and easy-to-use tools.',
    image: 'https://www.oldfoxtours.com/assets/logo-CcAoAWD-.jpg',
  },
  {
    id: 3,
    title: 'TraumaHelp Rwanda Platform',
    category: 'Healthcare Tool',
    description: 'A secure service for therapists and patients to communicate, book appointments, and share documents.',
    image: 'https://thr.org.rw/assets/logo-tD9r3Hdz.png',
  },
]

const testimonials = [
  {
    quote: "DCintelix delivered a professional website that has significantly improved our online presence. The team was responsive and understood our business needs perfectly.",
    author: "Sarah M.",
    role: "Business Owner",
  },
  {
    quote: "Their technical expertise in backend systems is impressive. They built a scalable platform that handles our growing user base seamlessly.",
    author: "James K.",
    role: "Tech Startup Founder",
  },
  {
    quote: "Working with DCintelix was a great experience. They delivered our mobile app on time and the quality exceeded our expectations.",
    author: "Michael R.",
    role: "Entrepreneur",
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
        url="https://dcintelix.netlify.app/"
      />
      <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-white py-14 md:py-20 lg:py-24">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmMWY1YzkiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Hero Content */}
            <div className="max-w-2xl">
              <span className="inline-block px-3 py-1.5 bg-[#0F766E]/10 text-[#0F766E] text-xs font-medium rounded-full mb-4">
                  Digital Solutions Company
                </span>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0F172A] leading-tight mb-4">
                  We Build Digital Solutions That Actually Help Your Business Grow
                </h1>
              
              <p className="text-sm md:text-base text-[#475569] mb-3 leading-relaxed">
                  At DCintelix, we create websites, online stores, and phone apps that work.
                  No jargon, no fluff—just solid digital products that get results.
                </p>
              
              <p className="text-xs md:text-sm text-[#64748B] mb-6 leading-relaxed">
                  We believe in building things that are practical, reliable,
                  and actually make your life easier.
                </p>
              
              <div className="flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#0F766E] text-white text-sm font-medium rounded-lg hover:bg-[#0D6D63] transition-colors"
                  >
                    Get Started
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-5 py-3 border-2 border-[#0F766E] text-[#0F766E] text-sm font-medium rounded-lg hover:bg-[#0F766E] hover:text-white transition-colors"
                  >
                    View Projects
                  </Link>
                </div>
            </div>

            {/* Right - Hero Image */}
            <div className="relative">
              <img
                src={heroImage}
                alt="DCintelix Digital Solutions"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 -right-16 md:-right-20 w-48 md:w-64 lg:w-80 h-48 md:h-64 lg:h-80 bg-[#14B8A6]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -left-16 md:-left-20 w-40 md:w-48 lg:w-60 h-40 md:h-48 lg:h-60 bg-[#F59E0B]/10 rounded-full blur-3xl"></div>
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
                What We Actually Do
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-sm md:text-base text-[#475569] max-w-xl mx-auto">
                Here's what we're good at. Real solutions, no buzzwords.
              </p>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {services.map((service, index) => (
              <FadeIn key={index} delay={index * 100}>
                <Card className="h-full">
                  <div className="w-10 h-10 bg-[#0F766E]/10 rounded-lg flex items-center justify-center mb-3">
                    <service.icon className="w-5 h-5 text-[#0F766E]" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-[#0F172A] mb-2">
                    {service.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

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
              <SectionHeading subtitle="Why Work With Us">
                We Build Digital Products That Actually Drive Results
              </SectionHeading>
              <p className="text-xs md:text-sm text-[#475569] mt-4 mb-6 leading-relaxed">
                We're not here to just make things look pretty. We combine years of hands-on 
                experience with a real understanding of how businesses work. Our approach? 
                Keep things simple, make them work, and don't overcomplicate things.
              </p>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#14B8A6]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheck className="w-3 h-3 text-[#14B8A6]" />
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-medium text-[#0F172A]">{feature.title}</h4>
                      <p className="text-xs text-[#64748B] hidden md:block">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#0F766E] to-[#14B8A6] rounded-xl md:rounded-2xl p-5 md:p-8 text-white">
                  <div className="grid grid-cols-2 gap-3 md:gap-6">
                    {features.map((feature, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4">
                        <feature.icon className="w-6 h-6 md:w-8 md:h-8 mb-2" />
                        <h4 className="text-xs font-medium">{feature.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-3 -right-3 w-16 h-16 md:w-20 md:h-20 bg-[#F59E0B]/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-3 -left-3 w-20 h-20 md:w-24 md:h-24 bg-[#14B8A6]/20 rounded-full blur-xl"></div>
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
                Stuff We've Built
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
                  Founder & Business Leader
                </span>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-2">
                  Christian Dushime
                </h2>
                <p className="text-sm text-[#14B8A6] font-medium mb-4">
                  Building solutions that matter
                </p>
                <p className="text-xs md:text-sm text-[#475569] mb-4 leading-relaxed">
                  A technology specialist with strong experience in building Web Application 
                  and applications. His work includes creating connections, server systems, 
                  flexible platforms, and modern digital products.
                </p>
                <p className="text-xs md:text-sm text-[#64748B] mb-5 leading-relaxed">
                  He has worked on platforms for transportation, tourism, healthcare, 
                  and content services. His leadership helps DCintelix deliver real results 
                  for businesses.
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
                Meet The Team
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
                    Creative Designer
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-2">
                    Gad
                  </h3>
                  <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                    Gad brings designs to life that people actually enjoy using. 
                    He cares about making things look good AND work well.
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
                    Frontend Developer
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-2">
                    Danny
                  </h3>
                  <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                    A skilled frontend developer specializing in building responsive and 
                    interactive web applications with modern frameworks.
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

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#0F766E] to-[#14B8A6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Build Your Digital Solution?
            </h2>
            <p className="text-sm md:text-base text-white/80 mb-6 max-w-xl mx-auto">
              Let's discuss your project and how we can help you achieve your business goals.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#0F766E] font-semibold text-sm rounded-lg hover:bg-[#F8FAFC] transition-all duration-200 hover:shadow-xl"
              >
                Get Started
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


