import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import HeroBg from './ParticlesBg'
import { personal } from '../data/content'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const nameLetters = personal.name.split('')

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#fafafa] dot-grid">
      <HeroBg />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-4xl"
      >
        {/* Availability pill */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#e4e4e7] text-sm text-[#52525b] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {personal.availability}
          </span>
        </motion.div>

        {/* Staggered name */}
        <h1 className="font-bold text-[clamp(3rem,10vw,6.5rem)] leading-none tracking-tight mb-5 flex justify-center gap-[0.01em] flex-wrap">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="text-[#18181b] inline-block"
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-[clamp(1rem,2.5vw,1.3rem)] text-[#52525b] font-normal mb-10 max-w-lg mx-auto leading-relaxed"
        >
          {personal.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex gap-3 justify-center flex-wrap">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            View My Work
          </button>
          <a href={`mailto:${personal.email}`} className="btn-outline">
            <Mail size={15} />
            Get in Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.button
        onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-[#a1a1aa] hover:text-[#6366f1] transition-colors"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.button>
    </section>
  )
}
