import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Github, Linkedin, Lock } from 'lucide-react'
import { personal, socials } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const iconMap = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, message } = formState
    const subject = encodeURIComponent(`Portfolio contact from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  const onChange = (e) =>
    setFormState((s) => ({ ...s, [e.target.name]: e.target.value }))

  return (
    <section id="contact" className="py-24 bg-white border-t border-[#e4e4e7]">
      <div className="section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="section-label">Contact</motion.p>
          <motion.h2 variants={fadeUp} className="section-heading">Get In Touch</motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left */}
            <motion.div variants={fadeUp} className="space-y-6">
              <p className="text-[#52525b] leading-relaxed">
                Whether you have a project in mind, a question, or just want to say hello — my inbox is always open. I&apos;ll do my best to get back to you!
              </p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eef2ff] flex items-center justify-center flex-shrink-0">
                  <Mail size={17} className="text-[#6366f1]" />
                </div>
                <a
                  href={`mailto:${personal.email}`}
                  className="text-sm text-[#52525b] hover:text-[#6366f1] transition-colors"
                >
                  {personal.email}
                </a>
              </div>

              <div className="pt-2">
                <p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest mb-4">
                  Find me on
                </p>
                <div className="flex gap-3">
                  {socials.map(({ label, href, icon }) => {
                    const Icon = iconMap[icon] || Mail
                    return (
                      <a
                        key={label}
                        href={href}
                        target={icon !== 'mail' ? '_blank' : undefined}
                        rel="noreferrer"
                        aria-label={label}
                        className="w-10 h-10 rounded-xl border border-[#e4e4e7] flex items-center justify-center text-[#a1a1aa] hover:text-[#6366f1] hover:border-[#c7d2fe] hover:bg-[#eef2ff] transition-all duration-200"
                      >
                        <Icon size={17} />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* ── Payment section ── */}
              <div className="pt-2 border-t border-[#e4e4e7]">
                <p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest mb-4">
                  Send a Payment
                </p>
                <p className="text-sm text-[#71717a] mb-4 leading-relaxed">
                  Working together or want to send a payment? Use the secure checkout.
                </p>
                <a
                  href="https://buy.stripe.com/5kQ4gr5b66HS4jlfAM0VO00"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  <Lock size={15} />
                  Send a Payment
                </a>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div variants={fadeUp}>
              {submitted ? (
                <div className="card text-center py-10">
                  <div className="w-12 h-12 rounded-xl bg-[#eef2ff] flex items-center justify-center mx-auto mb-4">
                    <Send size={22} className="text-[#6366f1]" />
                  </div>
                  <p className="font-semibold text-[#18181b] mb-1">Email client opened!</p>
                  <p className="text-[#71717a] text-sm">Send the pre-filled message to reach me.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-outline mt-6 text-sm"
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#71717a] uppercase tracking-wider mb-1.5">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formState.name}
                      onChange={onChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-lg px-4 py-2.5 text-[#18181b] text-sm placeholder-[#d4d4d8] focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#eef2ff] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#71717a] uppercase tracking-wider mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formState.email}
                      onChange={onChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-lg px-4 py-2.5 text-[#18181b] text-sm placeholder-[#d4d4d8] focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#eef2ff] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#71717a] uppercase tracking-wider mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={onChange}
                      required
                      rows={5}
                      placeholder="What's on your mind?"
                      className="w-full bg-[#fafafa] border border-[#e4e4e7] rounded-lg px-4 py-2.5 text-[#18181b] text-sm placeholder-[#d4d4d8] focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#eef2ff] transition-all resize-none"
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    <Send size={14} />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
