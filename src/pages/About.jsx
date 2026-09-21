import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiCheck, FiTarget, FiEye, FiAward, FiUsers, FiClock, FiShield, FiGlobe, FiLinkedin, FiTwitter, FiGithub, FiBox, FiUser, FiMessageSquare, FiLayers, FiCode } from 'react-icons/fi'
import { Card, SectionHeading } from '../components/Button'
import SEO from '../components/SEO'


const founderImage = 'https://res.cloudinary.com/dxjodwemx/image/upload/v1789963003/pasport.png'
const gadImage = 'https://res.cloudinary.com/dxjodwemx/image/upload/v1789962991/Gad.webp'
const dannyImage = 'https://res.cloudinary.com/dxjodwemx/image/upload/v1789962989/danny.webp'

const values = [
  {
    icon: FiShield,
    title: 'Quality First',
    description: 'We maintain the highest standards of quality in every project we deliver, ensuring lasting results for our clients.',
  },
  {
    icon: FiClock,
    title: 'Reliable Delivery',
    description: 'We commit to delivering projects on time, every time, with transparent communication throughout.',
  },
  {
    icon: FiUsers,
    title: 'Client Partnership',
    description: 'We build lasting relationships through trust, transparency, and exceptional service.',
  },
  {
    icon: FiAward,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, continuously improving our skills and processes.',
  },
]

const whyChooseUs = [
  {
    title: 'Experienced Team',
    description: 'Years of combined experience delivering flexible, scalable digital solutions across various industries.',
  },
  {
    title: 'Modern Tools & Technologies',
    description: 'We utilize the latest technologies and best practices to ensure optimal results for your project.',
  },
  {
    title: 'Business-Focused Solutions',
    description: 'Solutions designed to drive measurable results and ROI for your business.',
  },
  {
    title: 'End-to-End Service',
    description: 'From concept to launch, we handle every aspect of your digital transformation journey.',
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
        title="About DCintelix - Our Team & Mission"
        description="Learn about DCintelix - a leading digital solutions company in Rwanda. Our experienced team delivers professional web development, mobile apps, and custom software solutions."
        keywords="about DCintelix, web development company Rwanda, digital agency, our team, company mission, values, Rwanda technology company"
        url="https://www.dcintelix.rw/about"
      />
      <div className="pt-16 bg-[#F8FAFC]">
        <section className="relative overflow-hidden py-12 md:py-16 lg:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(13,109,99,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.06),transparent_30%)]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 lg:gap-14 items-center">
              <FadeIn>
                <span className="inline-block text-[#0D6D63] font-medium text-xs uppercase tracking-wider mb-3">
                  About Us
                </span>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-4 leading-tight">
                  Driving Digital Transformation
                </h1>
                <p className="text-sm md:text-base text-[#475569] max-w-xl leading-relaxed">
                  We are a leading digital solutions provider in Rwanda, delivering innovative technology solutions that empower businesses to succeed in the digital age. No fancy jargon — just solid solutions for real business needs.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#0D6D63] text-white font-medium text-sm rounded-lg hover:bg-[#0b5c53] transition-all duration-200 shadow-sm hover:shadow-lg"
                  >
                    Get in Touch
                    <FiArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 px-5 py-3 border border-[#D8E2E5] bg-white text-[#0F172A] font-medium text-sm rounded-lg hover:border-[#0D6D63] hover:text-[#0D6D63] transition-all duration-200"
                  >
                    View Our Work
                  </Link>
                </div>
              </FadeIn>

              <FadeIn delay={150}>
                <div className="relative">
                  <div className="rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)] p-5 md:p-6">
                    <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#E2E8F0]">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#64748B]">Company snapshot</p>
                        <h3 className="mt-2 text-lg font-semibold text-[#0F172A]">DCintelix</h3>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-[#0D6D63]/10 flex items-center justify-center">
                        <FiGlobe className="w-6 h-6 text-[#0D6D63]" />
                      </div>
                    </div>

                    <div className="mt-6 grid sm:grid-cols-2 gap-4">
                      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center">
                        <div className="text-xl md:text-2xl font-bold text-[#0F172A]">100%</div>
                        <div className="mt-1 text-[11px] uppercase tracking-wider text-[#64748B]">Satisfaction</div>
                      </div>
                      <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-4 text-center">
                        <div className="text-xl md:text-2xl font-bold text-[#0F172A]">24/7</div>
                        <div className="mt-1 text-[11px] uppercase tracking-wider text-[#64748B]">Support</div>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl bg-[#0D6D63] p-4 text-white">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-white/70">Focus</p>
                      <p className="mt-2 text-sm leading-relaxed text-white/90">
                        Web development, digital systems, e-commerce, and business transformation built for measurable growth.
                      </p>
                    </div>
                  </div>
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-[#F59E0B]/15 blur-xl" />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center">
              <FadeIn>
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
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={150}>
                <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 md:p-6 shadow-sm">
                  <div className="space-y-4">
                    {[
                      'Design-led digital products that align with your business goals.',
                      'Practical systems that improve how teams operate and serve customers.',
                      'Digital platforms built for scale, speed, and long-term value.',
                    ].map((item, index) => (
                      <div key={item} className="flex gap-3 items-start rounded-xl bg-white p-3 border border-[#E2E8F0]">
                        <div className="w-7 h-7 rounded-full bg-[#0D6D63]/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-[#0D6D63] text-[11px] font-semibold">0{index + 1}</span>
                        </div>
                        <p className="text-xs md:text-sm text-[#475569] leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14 lg:py-16 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <FadeIn>
                <h2 className="text-xl md:text-2xl font-bold text-[#0F172A]">Types of Websites We Build</h2>
              </FadeIn>
              <FadeIn delay={100}>
                <p className="text-sm md:text-base text-[#475569] max-w-2xl mx-auto mt-3">From landing pages to full e-commerce platforms — we deliver business-ready websites with clear ROI. Starting prices shown in RWF.</p>
              </FadeIn>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {[
                ['Landing / Small Business', 'From RWF 200,000'],
                ['Business Website', 'From RWF 1,500,000'],
                ['E-commerce / Custom', 'From RWF 5,000,000+'],
              ].map(([title, price], index) => (
                <FadeIn key={title} delay={index * 100}>
                  <div className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow duration-200 text-center h-full">
                    <div className="text-sm font-semibold text-[#0F172A] mb-2">{title}</div>
                    <div className="text-lg font-bold text-[#0F172A]">{price}</div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <FadeIn>
                <Card className="h-full p-5 md:p-6 shadow-sm hover:shadow-xl">
                  <div className="w-12 h-12 bg-[#0D6D63]/10 rounded-xl flex items-center justify-center mb-4">
                    <FiTarget className="w-6 h-6 text-[#0D6D63]" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-3">Our Mission</h3>
                  <p className="text-xs md:text-sm text-[#475569] leading-relaxed">
                    To empower businesses with professional digital solutions that drive growth, enhance operations, and create lasting value.
                  </p>
                </Card>
              </FadeIn>

              <FadeIn delay={100}>
                <Card className="h-full p-5 md:p-6 shadow-sm hover:shadow-xl">
                  <div className="w-12 h-12 bg-[#0D6D63]/10 rounded-xl flex items-center justify-center mb-4">
                    <FiEye className="w-6 h-6 text-[#0D6D63]" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#0F172A] mb-3">Our Vision</h3>
                  <p className="text-xs md:text-sm text-[#475569] leading-relaxed">
                    To be a leading digital solutions company known for delivering exceptional quality, innovation, and business value.
                  </p>
                </Card>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <FadeIn>
                <span className="inline-block text-[#0D6D63] font-medium text-xs uppercase tracking-wider mb-2">
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
                <FadeIn key={value.title} delay={index * 100}>
                  <Card className="h-full text-center p-5 md:p-6 shadow-sm hover:shadow-xl">
                    <div className="w-12 h-12 bg-[#0D6D63]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-[#0D6D63]" />
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-[#0F172A] mb-2">
                      {value.title}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <FadeIn>
                <SectionHeading subtitle="Why Choose Us">
                  Partner with DCintelix
                </SectionHeading>
                <div className="mt-6 space-y-4">
                  {whyChooseUs.map((item, index) => (
                    <div key={item.title} className="flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-white p-3 shadow-sm">
                      <div className="w-5 h-5 bg-[#0D6D63]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FiCheck className="w-3 h-3 text-[#0D6D63]" />
                      </div>
                      <div>
                        <h4 className="text-xs md:text-sm font-medium text-[#0F172A]">{item.title}</h4>
                        <p className="text-xs text-[#64748B] leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              <FadeIn delay={200}>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-[#E2E8F0]">
                    <FiGlobe className="w-6 h-6 text-[#0D6D63] mb-2" />
                    <h4 className="text-sm font-semibold text-[#0F172A] mb-1">Global Reach</h4>
                    <p className="text-xs text-[#64748B]">Serving clients worldwide</p>
                  </div>
                  <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-[#E2E8F0]">
                    <FiClock className="w-6 h-6 text-[#0D6D63] mb-2" />
                    <h4 className="text-sm font-semibold text-[#0F172A] mb-1">Fast Delivery</h4>
                    <p className="text-xs text-[#64748B]">Quick turnaround times</p>
                  </div>
                  <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-[#E2E8F0]">
                    <FiShield className="w-6 h-6 text-[#F59E0B] mb-2" />
                    <h4 className="text-sm font-semibold text-[#0F172A] mb-1">Secure</h4>
                    <p className="text-xs text-[#64748B]">Best security practices</p>
                  </div>
                  <div className="bg-white p-4 md:p-5 rounded-xl shadow-sm border border-[#E2E8F0]">
                    <FiAward className="w-6 h-6 text-[#0D6D63] mb-2" />
                    <h4 className="text-sm font-semibold text-[#0F172A] mb-1">Quality</h4>
                    <p className="text-xs text-[#64748B]">Industry-leading standards</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              <FadeIn>
                <div className="relative max-w-xs mx-auto lg:mx-0">
                  <img
                    src={founderImage}
                    alt="Christian Dushime - Founder and Business Leader at DCintelix - Technology Specialist and Web Application Developer"
                    className="w-full aspect-square max-w-[280px] mx-auto object-cover rounded-2xl shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-3 -right-3 w-20 h-20 md:w-24 md:h-24 bg-[#F59E0B] rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl md:text-3xl">CD</span>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={200}>
                <div>
                  <span className="inline-block text-[#0D6D63] font-medium text-xs uppercase tracking-wider mb-2">
                    Founder & Business Leader
                  </span>
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-1">
                    Christian Dushime
                  </h2>
                  <p className="text-sm text-[#0D6D63] font-medium mb-4">
                    Building solutions that matter
                  </p>
                  <div className="space-y-3 text-xs md:text-sm text-[#475569] leading-relaxed mb-6">
                    <p>
                      Christian Dushime is a technology specialist with strong experience in building web applications and digital systems. His work includes creating connections, server systems, flexible platforms, and modern digital products using various web development tools.
                    </p>
                    <p>
                      He has worked on platforms for transportation, tourism, healthcare, and content services. His experience and leadership ensure that every project delivered by DCintelix meets the highest standards of quality and reliability.
                    </p>
                    <p>
                      His leadership makes DCintelix a company built on real experience and practical results.
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

        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <FadeIn>
                <span className="inline-block text-[#0D6D63] font-medium text-xs uppercase tracking-wider mb-2">
                  Our Team
                </span>
              </FadeIn>
              <FadeIn delay={100}>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-3">
                  Meet the Experts Behind DCintelix
                </h2>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="text-sm md:text-base text-[#475569] max-w-xl mx-auto">
                  A passionate team of developers, designers, and strategists dedicated to delivering exceptional results.
                </p>
              </FadeIn>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                { name: 'Christian Dushime', role: 'Founder & CEO', image: founderImage, linkedin: 'https://www.linkedin.com/in/christian-dushime/', github: 'https://github.com/dushimec' },
                { name: 'Gad IRAHARI', role: 'UI/UX Designer', image: gadImage, linkedin: '', github: '' },
                { name: 'Danny GIKUNDIRO', role: 'Senior Developer', image: dannyImage, linkedin: '', github: '' },
              ].map((member, index) => (
                <FadeIn key={member.name} delay={index * 100}>
                  <div className="group">
                    <div className="relative overflow-hidden rounded-xl md:rounded-2xl mb-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex gap-2 justify-center">
                          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#0D6D63] transition-colors">
                            <FiLinkedin className="w-4 h-4" />
                          </a>
                          <a href={member.github} target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#0D6D63] transition-colors">
                            <FiGithub className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-sm md:text-base font-semibold text-[#0F172A]">{member.name}</h3>
                      <p className="text-xs md:text-sm text-[#64748B]">{member.role}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-12">
              <FadeIn>
                <span className="inline-block text-[#0D6D63] font-medium text-xs uppercase tracking-wider mb-2">
                  How We Work
                </span>
              </FadeIn>
              <FadeIn delay={100}>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A] mb-3">
                  Our Development Process
                </h2>
              </FadeIn>
              <FadeIn delay={200}>
                <p className="text-sm md:text-base text-[#475569] max-w-xl mx-auto">
                  A streamlined approach to delivering high-quality digital solutions.
                </p>
              </FadeIn>
            </div>

            <div className="grid md:grid-cols-4 gap-4 md:gap-6 relative">
              <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-[#0D6D63]/20"></div>

              {[
                { step: '01', icon: FiMessageSquare, title: 'Consultation', description: 'We discuss your goals, requirements, and vision for the project.' },
                { step: '02', icon: FiLayers, title: 'Planning', description: 'Our team creates a detailed project plan with timelines and milestones.' },
                { step: '03', icon: FiCode, title: 'Development', description: 'We build your solution using modern technologies and best practices.' },
                { step: '04', icon: FiCheck, title: 'Delivery', description: 'Final testing, deployment, and ongoing support for your project.' },
              ].map((process, index) => (
                <FadeIn key={process.title} delay={index * 100}>
                  <div className="relative text-center">
                    <div className="relative z-10 w-16 h-16 bg-[#0D6D63] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <process.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 hidden md:block">
                      <span className="text-[10px] font-bold text-[#0D6D63] bg-white px-2 py-0.5 rounded">{process.step}</span>
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-[#0F172A] mb-2 mt-4">{process.title}</h3>
                    <p className="text-xs md:text-sm text-[#64748B] leading-relaxed">{process.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-[#0D6D63] to-[#0D6D63]">
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
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white text-[#0D6D63] font-semibold text-sm rounded-lg hover:bg-[#F8FAFC] transition-all duration-200 hover:shadow-xl"
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

