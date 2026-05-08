import React from 'react'
import { Link } from 'react-router-dom'
import { FiUsers, FiGlobe, FiHome, FiBriefcase, FiBookOpen, FiArrowRight } from 'react-icons/fi'

export default function Partnerships() {
  const categories = [
    { icon: FiUsers, title: 'NGOs' },
    { icon: FiGlobe, title: 'International Organizations' },
    { icon: FiBriefcase, title: 'SMEs' },
    { icon: FiHome, title: 'Government Institutions' },
    { icon: FiBookOpen, title: 'Schools & Universities' },
    { icon: FiUsers, title: 'Startups' },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">Strategic Partnership Opportunities</span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A]">DCINTELIX collaborates across sectors</h2>
          <p className="text-sm text-[#475569] max-w-2xl mx-auto mt-3">DCINTELIX collaborates with businesses, NGOs, startups, schools, universities, government institutions, and international organizations to build innovative digital solutions.</p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6">
          {categories.map((cat, i) => (
            <div key={i} className="card-modern p-5 glass">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#0F766E] text-white flex items-center justify-center">
                  <cat.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0F172A]">{cat.title}</h3>
                  <p className="text-xs text-[#64748B] mt-1">Partner with us to co-design programs, pilots, and enterprise solutions that deliver measurable impact.</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
            Become a Partner
            <FiArrowRight className="w-4 h-4" />
          </Link>
          <a href="https://wa.me/250789356233" target="_blank" rel="noreferrer" className="btn-outline inline-flex items-center gap-2">
            Schedule Meeting
            <FiArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
