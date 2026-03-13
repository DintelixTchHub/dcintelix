import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiLayers, FiGlobe, FiSmartphone, FiShoppingBag, FiGrid, FiX } from 'react-icons/fi'
import { Card, SectionHeading } from '../components/Button'

const projects = [
  {
    id: 1,
    title: 'CoRoute Ride Sharing Platform',
    category: 'Web Application',
    shortDescription: 'A ride-sharing service that helps people request rides, coordinate trips, and connect with drivers.',
    detailedDescription: 'A transportation service where DCintelix helped build the system that handles ride requests, trip coordination, and user connections.',
    tags: ['Web Application', 'Travel Service', 'Connections', 'System Building'],
    image: 'coroute',
  },
  {
    id: 2,
    title: 'OldFox Tourism Platform',
    category: 'Online Platforms',
    shortDescription: 'A travel and tourism service designed to help users discover and manage travel experiences.',
    detailedDescription: 'A travel-focused service with booking features, easy-to-use dashboards, and smooth performance.',
    tags: ['Web Application', 'Travel', 'Bookings', 'User Dashboard'],
    image: 'oldfox',
  },
  {
    id: 3,
    title: 'TraumaHelp Rwanda Platform',
    category: 'Online Platforms',
    shortDescription: 'A secure service that helps therapists and patients communicate, book appointments, and share documents.',
    detailedDescription: 'A professional healthcare solution with secure access and reliable systems for managing therapy appointments.',
    tags: ['Healthcare', 'Secure Access', 'Appointments', 'Documents'],
    image: 'traumahelp',
  },
  {
    id: 4,
    title: 'KaryKelly Content Platform',
    category: 'Online Platforms',
    shortDescription: 'A content service with flexible backend tools, dashboard features, and easy updates.',
    detailedDescription: 'A clean professional service with backend development, improved performance, and content management tools.',
    tags: ['Content', 'Dashboard', 'Updates', 'Performance'],
    image: 'karykelly',
  },
  {
    id: 5,
    title: 'Car Rental Mobile Application',
    category: 'Phone Apps',
    shortDescription: 'A phone app that lets users browse and book vehicles with live availability and easy booking.',
    detailedDescription: 'A complete car rental solution enabling users to browse vehicle options, check live availability, and complete bookings through an easy-to-use phone interface.',
    tags: ['Phone App', 'Booking', 'Live Availability', 'Vehicle Rental'],
    image: 'carrental',
  },
  {
    id: 6,
    title: 'Car Wash Booking Application',
    category: 'Phone Apps',
    shortDescription: 'A booking service that helps users schedule car wash appointments easily.',
    detailedDescription: 'A convenient phone app for scheduling car wash services with an easy booking process and appointment management.',
    tags: ['Phone App', 'Booking', 'Appointments', 'Scheduling'],
    image: 'carwash',
  },
  {
    id: 7,
    title: 'Weather Application',
    category: 'Phone Apps',
    shortDescription: 'A weather app that provides live updates and changes its look based on day or night.',
    detailedDescription: 'A weather app that gives real-time forecasts with themes that automatically adjust between day and night modes.',
    tags: ['Phone App', 'Weather', 'Live Updates', 'Auto Theme'],
    image: 'weather',
  },
]

const categories = [
  { name: 'All', icon: FiGrid },
  { name: 'Web Application', icon: FiLayers },
  { name: 'Online Platforms', icon: FiGlobe },
  { name: 'Phone Apps', icon: FiSmartphone },
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

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory)

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#F8FAFC] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <span className="inline-block text-[#14B8A6] font-medium text-sm uppercase tracking-wider mb-4">
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-6">
              Projects
            </h1>
            <p className="text-lg text-[#475569] max-w-2xl">
              Explore our portfolio of successful projects across Web Application, 
              platforms, and phone solutions.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-[#E2E8F0] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.name
                    ? 'bg-[#0F766E] text-white shadow-lg shadow-[#0F766E]/20'
                    : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0] hover:text-[#0F172A]'
                }`}
              >
                <category.icon className="w-4 h-4" />
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 100}>
                <Card className="h-full flex flex-col" padding="none">
                  {/* Project Image */}
                  <div className="h-48 bg-gradient-to-br from-[#0F766E]/20 to-[#14B8A6]/20 rounded-t-xl flex items-center justify-center">
                    <FiLayers className="w-16 h-16 text-[#0F766E]/30" />
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs text-[#14B8A6] font-medium uppercase tracking-wider mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[#64748B] mb-4 flex-1">
                      {project.shortDescription}
                    </p>
                    
                    {/* View Button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-[#0F766E] font-medium text-sm hover:gap-3 transition-all"
                    >
                      View Details
                      <FiArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          ></div>
          <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 bg-[#F1F5F9] rounded-lg text-[#475569] hover:bg-[#E2E8F0] transition-colors z-10"
            >
              <FiX className="w-5 h-5" />
            </button>
            
            {/* Modal Content */}
            <div className="h-64 bg-gradient-to-br from-[#0F766E]/20 to-[#14B8A6]/20 rounded-t-2xl flex items-center justify-center">
              <FiLayers className="w-20 h-20 text-[#0F766E]/30" />
            </div>
            
            <div className="p-8">
              <div className="text-xs text-[#14B8A6] font-medium uppercase tracking-wider mb-2">
                {selectedProject.category}
              </div>
              <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
                {selectedProject.title}
              </h3>
              <p className="text-[#475569] mb-6 leading-relaxed">
                {selectedProject.detailedDescription}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1.5 bg-[#F1F5F9] text-[#475569] text-sm rounded-lg"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <Link
                to="/contact"
                onClick={() => setSelectedProject(null)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F766E] text-white font-medium rounded-lg hover:bg-[#0D6D63] transition-colors"
              >
                Start Similar Project
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-[#0F766E] to-[#14B8A6]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Have a Project in Mind?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Let's discuss your project requirements and how we can help bring your vision to life.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0F766E] font-semibold rounded-lg hover:bg-[#F8FAFC] transition-all duration-200 hover:shadow-xl"
            >
              Get in Touch
              <FiArrowRight className="w-5 h-5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  )
}
