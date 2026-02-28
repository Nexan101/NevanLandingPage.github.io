import { motion } from 'framer-motion'
import { Briefcase, ExternalLink } from 'lucide-react'
import { experience } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-[#fafafa] border-t border-[#e4e4e7]">
      <div className="section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="section-label">Experience</motion.p>
          <motion.h2 variants={fadeUp} className="section-heading">Where I&apos;ve Worked</motion.h2>

          <div className="relative pl-8">
            <div className="timeline-line" />

            <div className="space-y-8">
              {experience.map((job, index) => (
                <motion.div key={job.id} variants={fadeUp} className="relative">
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 + 0.2, type: 'spring', stiffness: 300 }}
                    className="absolute -left-[2.15rem] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#6366f1] shadow-[0_0_0_3px_#eef2ff]"
                  />

                  <div className="card hover:shadow-md transition-shadow duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="text-[#18181b] font-semibold text-lg tracking-tight">{job.role}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <Briefcase size={12} className="text-[#6366f1]" />
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#6366f1] text-sm font-medium hover:underline inline-flex items-center gap-1"
                          >
                            {job.company}
                            <ExternalLink size={10} />
                          </a>
                        </div>
                      </div>
                      <span className="text-xs text-[#71717a] bg-[#f4f4f5] px-3 py-1 rounded-full border border-[#e4e4e7] whitespace-nowrap font-medium">
                        {job.period}
                      </span>
                    </div>

                    <p className="text-[#71717a] text-sm mb-4 leading-relaxed">{job.description}</p>

                    <ul className="space-y-2">
                      {job.bullets.map((bullet, i) => (
                        <li key={i} className="flex gap-3 text-sm text-[#52525b]">
                          <span className="text-[#6366f1] mt-0.5 flex-shrink-0">▸</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
