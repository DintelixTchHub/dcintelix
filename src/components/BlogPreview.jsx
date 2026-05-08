import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const samplePosts = [
  { id: 1, title: 'AI for SMEs in Rwanda: Practical Steps', category: 'AI', excerpt: 'How small and medium businesses can adopt AI to automate operations and increase revenue.', date: 'Mar 2, 2026' },
  { id: 2, title: 'Digital Transformation Roadmap', category: 'Transformation', excerpt: 'A step-by-step roadmap to digitally transform legacy processes and scale.', date: 'Feb 14, 2026' },
  { id: 3, title: 'Securing Your Platform: Essentials', category: 'Security', excerpt: 'Practical cybersecurity measures for startups and NGOs.', date: 'Jan 28, 2026' },
]

export default function BlogPreview() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="inline-block text-[#14B8A6] font-medium text-xs uppercase tracking-wider mb-2">Insights</span>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#0F172A]">From Our Blog</h2>
          <p className="text-sm text-[#475569] max-w-2xl mx-auto mt-3">Latest thinking on AI, automation, and technology strategy for African businesses.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {samplePosts.map((post) => (
            <motion.article whileHover={{ translateY: -6 }} key={post.id} className="card-modern p-5">
              <div className="text-xs text-[#14B8A6] font-medium uppercase tracking-wider mb-2">{post.category}</div>
              <h3 className="text-sm md:text-base font-semibold mb-2">{post.title}</h3>
              <p className="text-xs text-[#64748B] mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#475569]">{post.date}</span>
                <Link to="/blogs" className="text-[#0F766E] font-medium">Read</Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
