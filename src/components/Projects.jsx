import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Github, ExternalLink } from 'lucide-react'
import { projects } from '../data/content'

// Double the list so the loop is seamless
const looped = [...projects, ...projects]

function BannerCard({ project }) {
  const hasImage = Boolean(project.image)
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (project.route) navigate(project.route)
    else if (project.live) window.open(project.live, '_blank', 'noreferrer')
  }

  return (
    <motion.div
      onClick={handleCardClick}
      className="relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer group/card"
      style={{
        background: hasImage ? '#111' : '#c8c8cc',
        height: '400px',
        willChange: 'width',
      }}
      initial={{ width: '150px' }}
      whileHover={{ width: hasImage ? '420px' : '220px' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Real project: photo background ── */}
      {hasImage && (
        <img
          src={`${import.meta.env.BASE_URL}${project.image.replace(/^\//, '')}`}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-top opacity-70"
          draggable={false}
        />
      )}

      {/* ── Placeholder: coming soon or named internal project ── */}
      {!hasImage && !project.route && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#d1d1d6]">
          <span
            className="text-[#4b4b52] font-bold text-xs tracking-[0.25em] uppercase whitespace-nowrap drop-shadow-sm"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            Coming Soon
          </span>
        </div>
      )}

      {/* ── Internal route project: dark card with vertical title ── */}
      {!hasImage && project.route && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#18181b] group-hover/card:bg-[#111] transition-colors duration-300">
          <span
            className="text-white/80 group-hover/card:text-white font-bold text-xs tracking-[0.22em] uppercase whitespace-nowrap transition-colors duration-200"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {project.title}
          </span>
          <span
            className="absolute bottom-5 text-white/40 group-hover/card:text-white/70 text-[10px] tracking-widest uppercase transition-colors duration-200"
          >
            View →
          </span>
        </div>
      )}

      {/* ── Real project collapsed: vertical title ── */}
      {hasImage && (
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover/card:opacity-0 pointer-events-none">
          <span
            className="text-white font-bold text-sm tracking-[0.18em] whitespace-nowrap"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              textShadow: '0 1px 8px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)',
            }}
          >
            {project.title}
          </span>
        </div>
      )}

      {/* ── Real project expanded: content overlay ── */}
      {hasImage && (
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 delay-[60ms] px-6 pt-6 pb-8">
          <div className="translate-y-4 group-hover/card:translate-y-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-[50ms]">
            <h3 className="text-white font-bold text-[1.1rem] tracking-tight mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
              {project.title}
            </h3>
            <p className="text-white/75 text-sm leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((t) => (
                <span key={t} className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/15 text-white border border-white/20">
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4 border-t border-white/15 pt-4" onMouseDown={(e) => e.stopPropagation()}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors">
                  <Github size={14} /> GitHub
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors">
                  <ExternalLink size={14} /> Live Site
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="pt-28 pb-24 bg-[#fafafa] border-t border-[#e4e4e7]">
      {/* Heading */}
      <div className="px-6 max-w-6xl mx-auto mb-12">
        <p className="section-label">Projects</p>
        <h2 className="section-heading mb-0">Things I&apos;ve Built</h2>
      </div>

      {/* Marquee track */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="overflow-hidden marquee-wrap"
      >
        <div className="marquee-track flex gap-4 w-max pb-3 px-4">
          {looped.map((project, i) => (
            <BannerCard
              key={`${project.id}-${i}`}
              project={project}
              index={i % projects.length}
            />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
