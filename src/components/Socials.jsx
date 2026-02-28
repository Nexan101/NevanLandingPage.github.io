import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import { socials, personal } from '../data/content'

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
}

export default function Socials() {
  const emailSocial = socials.find((s) => s.icon === 'mail')
  const emailAddress = emailSocial?.href?.replace('mailto:', '') || personal.email

  return (
    <>
      {/* Left sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="fixed left-6 bottom-0 z-40 hidden lg:flex flex-col items-center gap-4"
      >
        {socials.map(({ label, href, icon }) => {
          const Icon = iconMap[icon] || Mail
          return (
            <a
              key={label}
              href={href}
              target={icon !== 'mail' ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="text-[#a1a1aa] hover:text-[#6366f1] transition-all duration-200 hover:-translate-y-0.5"
            >
              <Icon size={18} />
            </a>
          )
        })}
        <div className="w-px h-20 bg-gradient-to-b from-[#c7d2fe] to-transparent" />
      </motion.div>

      {/* Right sidebar — email */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="fixed right-6 bottom-0 z-40 hidden lg:flex flex-col items-center gap-4"
      >
        <a
          href={`mailto:${emailAddress}`}
          className="text-xs text-[#a1a1aa] hover:text-[#6366f1] transition-colors tracking-widest"
          style={{ writingMode: 'vertical-rl' }}
        >
          {emailAddress}
        </a>
        <div className="w-px h-20 bg-gradient-to-b from-[#c7d2fe] to-transparent" />
      </motion.div>
    </>
  )
}
