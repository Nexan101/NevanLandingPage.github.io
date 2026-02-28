import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Send, Github, Linkedin, CreditCard } from 'lucide-react'
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

              {/* ── Stripe payment section ── */}
              <div className="pt-2 border-t border-[#e4e4e7]">
                <p className="text-xs font-semibold text-[#a1a1aa] uppercase tracking-widest mb-4">
                  Send a Payment
                </p>
                <p className="text-sm text-[#71717a] mb-4 leading-relaxed">
                  Working together or want to send a payment? Use the secure Stripe checkout.
                </p>
                <Link
                  to="/pay"
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border border-[#e4e4e7] bg-white hover:border-[#635BFF] hover:bg-[#f5f4ff] text-[#18181b] hover:text-[#635BFF] font-medium text-sm transition-all duration-200 shadow-sm group"
                >
                  <CreditCard size={16} className="group-hover:text-[#635BFF] transition-colors" />
                  Pay with Stripe
                  {/* Stripe wordmark */}
                  <svg viewBox="0 0 60 25" className="h-4 ml-1 opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                    <path d="M59.64 14.28c0-4.23-2.05-7.57-5.97-7.57-3.94 0-6.33 3.34-6.33 7.54 0 4.97 2.81 7.49 6.85 7.49 1.97 0 3.46-.45 4.59-1.07v-3.3c-1.13.57-2.42.9-4.07.9-1.61 0-3.04-.57-3.22-2.53h8.12c0-.22.03-.87.03-1.46zm-8.18-1.57c0-1.88 1.15-2.66 2.19-2.66 1.01 0 2.09.78 2.09 2.66h-4.28zM37.96 6.71c-1.62 0-2.65.76-3.23 1.29l-.21-1.02h-3.63v19.1l4.12-.88.01-4.63c.6.43 1.48.96 2.93.96 2.96 0 5.66-2.38 5.66-7.62-.01-4.8-2.74-7.2-5.65-7.2zm-.99 11.07c-.97 0-1.55-.35-1.95-.78l-.02-6.16c.43-.48 1.02-.81 1.97-.81 1.51 0 2.55 1.7 2.55 3.87 0 2.21-1.02 3.88-2.55 3.88zM27.2 5.54l4.13-.89V1.06l-4.13.88v3.6zM27.2 6.98h4.13v14.7H27.2V6.98zM22.22 8.14l-.26-1.16h-3.56v14.7h4.12v-9.96c.97-1.27 2.62-1.04 3.13-.87V6.98c-.53-.19-2.46-.53-3.43 1.16zM14.7 3.76l-4.02.85-.02 13.1c0 2.42 1.82 4.2 4.24 4.2 1.34 0 2.32-.25 2.86-.54v-3.35c-.52.21-3.08.96-3.08-1.44V10.5h3.08V6.98h-3.08l.02-3.22zM4.25 10.63c0-.64.53-.89 1.4-.89 1.25 0 2.83.38 4.08 1.05V7.29c-1.37-.54-2.72-.76-4.08-.76C2.13 6.53 0 8.1 0 10.79c0 4.18 5.75 3.51 5.75 5.31 0 .76-.66 1.01-1.58 1.01-1.36 0-3.1-.56-4.48-1.31v3.55c1.52.66 3.06.93 4.48.93 3.42 0 5.77-1.69 5.77-4.41-.01-4.51-5.69-3.71-5.69-5.24z" fill="#635BFF"/>
                  </svg>
                </Link>
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
