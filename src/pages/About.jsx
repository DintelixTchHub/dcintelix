import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiTarget, FiEye, FiAward, FiUsers, FiClock, FiShield, FiGlobe } from 'react-icons/fi'
import { Card, SectionHeading } from '../components/Button'
import SEO from '../components/SEO'
import founderImage from '../assets/pasport.webp'

const values = [
  {
    icon: FiShield,
    title: 'Quality First',
    description: 'We never compromise on the quality of our work.',
  },
  {
    icon: FiClock,
    title: 'Reliable Delivery',
    description: 'On-time delivery is our commitment.',
  },
  {
    icon: FiUsers,
    title: 'Client Partnership',
    description: 'Building lasting relationships through trust.',
  },
  {
    icon: FiAward,
    title: 'Excellence',
    description: 'Striving for excellence in everything we do.',
  },
]

const whyChooseUs = [
  {
    title: 'Experienced Team',
    description: 'Years of combined experience in building flexible digital solutions.',
  },
  {
    title: 'Modern Tools',
    description: 'Using the latest and best methods for your project.',
  },
  {
    title: 'Business Focus',
    description: 'Solutions that drive real results for your business.',
  },
  {
    title: 'Complete Service',
    description: 'From idea to launch, we handle everything.',
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

export default function About() {
  return (
    <>
      <SEO 
        title="About Us - Who We Are"
        description="Learn about DCintelix - we're a team that builds digital things that work. No jargon, just solid solutions for real business needs."
        keywords="about DCintelix, web development company, digital agency, our team, company mission, values"
        url="https://dcintelix.netlify.app/about"
      />
      <div className="pt-16">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">
              About Us
            </span>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4">
              Who We Are
            </h1>
            <p className="text-sm md:text-base text-[#475569] max-w-xl">
              We're a small team that builds digital things that actually work. 
              No fancy jargon—just solid solutions for real business needs.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* About DCintelix */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <div className="bg-gradient-to-br from-[#0F766E] to-[#14B8A6] rounded-xl md:rounded-2xl p-5 md:p-8 text-white">
                  <div className="grid grid-cols-2 gap-3 md:gap-6">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl font-bold mb-1">7+</div>
                      <div className="text-xs text-white/80">Projects</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl font-bold mb-1">5+</div>
                      <div className="text-xs text-white/80">Years</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl font-bold mb-1">100%</div>
                      <div className="text-xs text-white/80">Satisfaction</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 md:p-4 text-center">
                      <div className="text-xl md:text-2xl font-bold mb-1">24/7</div>
                      <div className="text-xs text-white/80">Support</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-3 -right-3 w-16 h-16 md:w-20 md:h-20 bg-[#F59E0B]/20 rounded-full blur-xl"></div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div>
                <SectionHeading subtitle="Who We Are">
                  About DCintelix
                </SectionHeading>
                <div className="mt-4 space-y-3 text-xs md:text-sm text-[#475569] leading-relaxed">
                  <p>
                    DCintelix is a technology company focused on building modern digital solutions for businesses and organizations. We specialize in developing professional websites, web applications, ecommerce platforms, and custom software systems that help companies operate more efficiently in the digital world.
                  </p>
                  <p>
                    Our goal is simple: to help businesses grow by providing reliable technology solutions that improve how they work, connect with customers, and deliver their services.
                  </p>
                  <p>
                    At DCintelix, we combine clean design, scalable technology, and practical problem-solving to create digital products that are both powerful and easy to use.
                  </p>
                  <p>
                    In addition to client projects, we are also building our own digital platforms, including <strong>E-Curuza</strong>, a multivendor ecommerce marketplace designed to support online commerce and connect businesses with customers. E-Curuza is currently under development and not yet launched.
                  </p>
                  <p>
                    As a registered technology company based in Kigali, Rwanda, DCintelix is committed to helping businesses succeed in the modern digital economy.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <FadeIn>
              <Card className="h-full p-5 md:p-6">
                <div className="w-12 h-12 bg-[#0F766E]/10 rounded-xl flex items-center justify-center mb-4">
                  <FiTarget className="w-6 h-6 text-[#0F766E]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-3">Our Mission</h3>
                <p className="text-xs md:text-sm text-[#475569] leading-relaxed">
                  To empower businesses with professional digital solutions that drive growth, 
                  enhance operations, and create lasting value.
                </p>
              </Card>
            </FadeIn>

            <FadeIn delay={100}>
              <Card className="h-full p-5 md:p-6">
                <div className="w-12 h-12 bg-[#14B8A6]/10 rounded-xl flex items-center justify-center mb-4">
                  <FiEye className="w-6 h-6 text-[#14B8A6]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-3">Our Vision</h3>
                <p className="text-xs md:text-sm text-[#475569] leading-relaxed">
                  To be a leading digital solutions company known for delivering exceptional 
                  quality, innovation, and business value.
                </p>
              </Card>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-12">
            <FadeIn>
              <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">
                What We Stand For
              </span>
            </FadeIn>
            <FadeIn delay={100}>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-3">
                Our Core Values
              </h2>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => (
              <FadeIn key={index} delay={index * 100}>
                <Card className="h-full text-center p-5 md:p-6">
                  <div className="w-12 h-12 bg-[#0F766E]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-[#0F766E]" />
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-[#0F172A] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-xs text-[#64748B]">
                    {value.description}
                  </p>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <FadeIn>
              <SectionHeading subtitle="Why Choose Us">
                Partner with DCintelix
              </SectionHeading>
              <div className="mt-6 space-y-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-[#14B8A6]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FiCheck className="w-3 h-3 text-[#14B8A6]" />
                    </div>
                    <div>
                      <h4 className="text-xs md:text-sm font-medium text-[#0F172A]">{item.title}</h4>
                      <p className="text-xs text-[#64748B]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-[#E2E8F0]">
                  <FiGlobe className="w-6 h-6 text-[#0F766E] mb-2" />
                  <h4 className="text-sm font-semibold text-[#0F172A] mb-1">Global Reach</h4>
                  <p className="text-xs text-[#64748B]">Serving clients worldwide</p>
                </div>
                <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-[#E2E8F0]">
                  <FiClock className="w-6 h-6 text-[#14B8A6] mb-2" />
                  <h4 className="text-sm font-semibold text-[#0F172A] mb-1">Fast Delivery</h4>
                  <p className="text-xs text-[#64748B]">Quick turnaround times</p>
                </div>
                <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-[#E2E8F0]">
                  <FiShield className="w-6 h-6 text-[#F59E0B] mb-2" />
                  <h4 className="text-sm font-semibold text-[#0F172A] mb-1">Secure</h4>
                  <p className="text-xs text-[#64748B]">Best security practices</p>
                </div>
                <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-[#E2E8F0]">
                  <FiAward className="w-6 h-6 text-[#0F766E] mb-2" />
                  <h4 className="text-sm font-semibold text-[#0F172A] mb-1">Quality</h4>
                  <p className="text-xs text-[#64748B]">Industry-leading standards</p>
                </div>
              </div>
            </FadeIn>
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
                  alt="Christian Dushime - Founder and Business Leader at DCintelix - Technology Specialist and Web Application Developer" 
                  className="w-full aspect-square max-w-[280px] mx-auto object-cover rounded-xl md:rounded-2xl"
                  loading="eager"
                  width="280"
                  height="280"
                />
                <div className="absolute -bottom-3 -right-3 w-20 h-20 md:w-24 md:h-24 bg-[#F59E0B] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl md:text-3xl">CD</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div>
                <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">
                  Founder & Business Leader
                </span>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-1">
                  Christian Dushime
                </h2>
                <p className="text-sm text-[#14B8A6] font-medium mb-4">
                  Building solutions that matter
                </p>
                <div className="space-y-3 text-xs md:text-sm text-[#475569] leading-relaxed mb-6">
                  <p>
                    Christian Dushime is a technology specialist with strong experience in 
                    building Web Application and applications. His work includes creating 
                    connections, server systems, flexible platforms, and modern digital 
                    products using various web development tools.
                  </p>
                  <p>
                    He has worked on platforms for transportation, tourism, healthcare, 
                    and content services. His experience and leadership ensure 
                    that every project delivered by DCintelix meets the highest standards of 
                    quality and reliability.
                  </p>
                  <p>
                    His leadership makes DCintelix a company built on real experience 
                    and practical results.
                  </p>
                </div>
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

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#0F766E] to-[#14B8A6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4">
              Let's Build Something Great Together
            </h2>
            <p className="text-sm md:text-base text-white/80 mb-6 max-w-xl mx-auto">
              Ready to start your project? We'd love to hear about your ideas.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#0F766E] font-semibold text-sm rounded-lg hover:bg-[#F8FAFC] transition-all duration-200 hover:shadow-xl"
              >
                Get in Touch
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
