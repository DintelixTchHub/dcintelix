import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function CaseStudies({ projects = [] }) {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">Case Studies</span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A]">Project Results & Impact</h2>
          <p className="text-sm text-[#475569] max-w-2xl mx-auto mt-3">Short deep dives showing the business problem, our solution, and the measurable results.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div whileHover={{ scale: 1.03 }} key={p.id} className="card-modern overflow-hidden">
              <div className="relative">
                <div className="h-44 bg-[#F8FAFC] flex items-center justify-center overflow-hidden">
                  {p.image ? (
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : null}
                </div>

                <div className="p-4">
                  <div className="text-xs text-[#14B8A6] font-medium uppercase tracking-wider mb-1">{p.category}</div>
                  <h3 className="text-sm md:text-base font-semibold text-[#0F172A] mb-2">{p.title}</h3>
                  <p className="text-xs text-[#64748B] mb-3 line-clamp-3">{p.description}</p>
                  <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-[#0F766E]">View Case Study</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
