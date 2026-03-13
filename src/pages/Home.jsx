import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiCode, FiGlobe, FiSmartphone, FiShoppingCart, FiLayers, FiShield, FiTrendingUp, FiClock, FiUser } from 'react-icons/fi'
import { Card, SectionHeading } from '../components/Button'
import heroImage from '../assets/hero.png'
import founderImage from '../assets/pasport.png'
import gadImage from '../assets/Gad.png'
import dannyImage from '../assets/danny.jpeg'

const services = [
  {
    icon: FiGlobe,
    title: 'Website Creation',
    description: 'Professional websites that look great and work well on any device.',
  },
  {
    icon: FiCode,
    title: 'Web Application',
    description: 'Custom Web Application built for your business needs.',
  },
  {
    icon: FiShoppingCart,
    title: 'Online Stores',
    description: 'Powerful online stores that help you sell more.',
  },
  {
    icon: FiSmartphone,
    title: 'Phone Apps',
    description: 'Apps for iPhone and Android that connect with your customers.',
  },
]

const features = [
  {
    icon: FiLayers,
    title: 'Complete Development',
    description: 'We handle everything from data organization to the user interface.',
  },
  {
    icon: FiShield,
    title: 'Flexible Systems',
    description: 'Built to grow with your business using professional methods.',
  },
  {
    icon: FiTrendingUp,
    title: 'Business-Focused',
    description: 'Solutions designed to solve real business problems.',
  },
  {
    icon: FiClock,
    title: 'On-Time Delivery',
    description: 'Reliable project completion with clear timelines.',
  },
]

const featuredProjects = [
  {
    id: 1,
    title: 'CoRoute Ride Sharing Platform',
    category: 'Online Tool',
    description: 'A transportation service that helps people request rides, coordinate trips, and match with drivers.',
  },
  {
    id: 2,
    title: 'OldFox Tourism Platform',
    category: 'Online Platform',
    description: 'A travel and tourism service with booking features and easy-to-use tools.',
  },
  {
    id: 3,
    title: 'TraumaHelp Rwanda Platform',
    category: 'Healthcare Tool',
    description: 'A secure service for therapists and patients to communicate, book appointments, and share documents.',
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

const stats = [
  { number: 7, suffix: '+', label: 'Projects Delivered' },
  { number: 5, suffix: '+', label: 'Years Experience' },
  { number: 4, suffix: '+', label: 'Industries Served' },
  { number: 24, suffix: '/7', label: 'Reliable Support' },
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
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-white py-14 md:py-20 lg:py-24">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmMWY1YzkiIGZpbGwtb3BhY2l0eT0iLjAyIi8+PC9nPjwvc3ZnPg==')] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left - Hero Content */}
            <div className="max-w-2xl">
              <FadeIn delay={100}>
                <span className="inline-block px-3 py-1.5 bg-[#0F766E]/10 text-[#0F766E] text-xs font-medium rounded-full mb-4">
                  Digital Solutions Company
                </span>
              </FadeIn>
              
              <FadeIn delay={200}>
                <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#0F172A] leading-tight mb-4">
                  Build Powerful Digital Solutions That Grow Your Business
                </h1>
              </FadeIn>
              
              <FadeIn delay={300}>
                <p className="text-sm md:text-base text-[#475569] mb-3 leading-relaxed">
                  DCintelix helps businesses grow with professional websites, online stores, 
                  phone apps, and reliable methods.
                </p>
              </FadeIn>
              
              <FadeIn delay={400}>
                <p className="text-xs md:text-sm text-[#64748B] mb-6 leading-relaxed">
                  We create flexible systems that help businesses operate better, 
                  reach more customers, and grow faster.
                </p>
              </FadeIn>
              
              <FadeIn delay={500}>
                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#0F766E] text-white text-sm font-medium rounded-lg hover:bg-[#0D6D63] transition-all duration-300 hover:shadow-lg hover:shadow-[#0F766E]/25 hover:-translate-y-0.5"
                  >
                    Get Started
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-5 py-3 border-2 border-[#0F766E] text-[#0F766E] text-sm font-medium rounded-lg hover:bg-[#0F766E] hover:text-white transition-all duration-300"
                  >
                    View Projects
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Right - Hero Image */}
            <FadeIn delay={300}>
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="DCintelix Digital Solutions" 
                  className="w-full h-auto object-contain animate-[float_6s_ease-in-out_infinite]"
                />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <FadeIn key={index} delay={600 + (index * 100)}>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F766E] mb-1">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-[#64748B]">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
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
                Comprehensive Digital Solutions
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-sm md:text-base text-[#475569] max-w-xl mx-auto">
                We offer end-to-end digital services tailored to your business needs.
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

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeIn>
              <SectionHeading subtitle="Why Choose DCintelix">
                Building Digital Products That Drive Business Growth
              </SectionHeading>
              <p className="text-xs md:text-sm text-[#475569] mt-4 mb-6 leading-relaxed">
                We combine years of experience with business understanding to deliver 
                solutions that create real value. Our approach focuses on flexibility, 
                reliability, and making things easy for users.
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
                Featured Projects
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
                  <div className="h-36 md:h-44 bg-gradient-to-br from-[#0F766E]/20 to-[#14B8A6]/20 rounded-lg mb-4 flex items-center justify-center">
                    <FiLayers className="w-10 h-10 md:w-12 md:h-12 text-[#0F766E]/40" />
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
                Our Team
              </span>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-3">
                Meet Our Team Members
              </h2>
            </FadeIn>
            <FadeIn delay={200}>
              <p className="text-sm md:text-base text-[#475569] max-w-xl mx-auto">
                The talented people behind DCintelix who make it all possible.
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
                    UI/UX Designer
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-2">
                    Gad
                  </h3>
                  <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">
                    A creative designer focused on crafting beautiful and intuitive user interfaces 
                    that deliver exceptional user experiences.
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
  )
}


