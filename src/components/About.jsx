import { motion } from 'framer-motion'
import { MapPin, Zap } from 'lucide-react'
import { personal } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-white border-t border-[#e4e4e7]">
      <div className="section">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.p variants={fadeUp} className="section-label">About</motion.p>
          <motion.h2 variants={fadeUp} className="section-heading">Who I Am</motion.h2>

          <div className="grid md:grid-cols-2 gap-14 items-center">
            {/* Text */}
            <motion.div variants={fadeUp} className="space-y-5">
              <p className="text-[#52525b] leading-relaxed text-[1.05rem]">
                {personal.bio}
              </p>
              <div className="flex items-center gap-2 text-[#71717a] text-sm">
                <MapPin size={14} className="text-[#6366f1]" />
                {personal.location}
              </div>
              <div className="flex items-center gap-2 text-[#71717a] text-sm">
                <Zap size={14} className="text-[#6366f1]" />
                {personal.availability}
              </div>
              <div className="pt-2">
                <a href={`mailto:${personal.email}`} className="btn-primary inline-flex">
                  Get in Touch
                </a>
              </div>
            </motion.div>

            {/* Avatar + stats */}
            <motion.div variants={fadeUp} className="flex flex-col items-center gap-8">
              {/* Avatar */}
              <div className="relative">
                <div className="w-48 h-48 rounded-2xl border border-[#e4e4e7] overflow-hidden shadow-sm">
                  <img
                    src="/avatar.png"
                    alt={personal.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 border-b-2 border-r-2 border-[#6366f1] rounded-br-sm" />
                <div className="absolute -top-2 -left-2 w-7 h-7 border-t-2 border-l-2 border-[#6366f1] rounded-tl-sm" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 w-full">
                {personal.stats.map(({ label, value }) => (
                  <div key={label} className="card text-center py-4">
                    <p className="font-bold text-2xl text-[#18181b] tracking-tight">{value}</p>
                    <p className="text-[#a1a1aa] text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
