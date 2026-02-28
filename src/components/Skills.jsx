import { motion } from 'framer-motion'
import Tilt from 'react-parallax-tilt'
import { skillGroups } from '../data/content'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-white border-t border-[#e4e4e7]">
      <div className="section">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="section-label">Skills</motion.p>
          <motion.h2 variants={fadeUp} className="section-heading">Tech I Work With</motion.h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skillGroups.map((group) => (
              <motion.div key={group.category} variants={fadeUp}>
                <Tilt
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  glareEnable
                  glareMaxOpacity={0.05}
                  glareColor="#6366f1"
                  scale={1.01}
                  transitionSpeed={600}
                  className="h-full"
                >
                  <div className="card h-full">
                    <h3 className="text-xs font-semibold text-[#6366f1] tracking-widest uppercase mb-4">
                      {group.category}
                    </h3>
                    <motion.div
                      variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                      className="flex flex-wrap gap-2"
                    >
                      {group.skills.map((skill) => (
                        <motion.span
                          key={skill}
                          variants={badgeVariants}
                          className="px-2.5 py-1 rounded-md bg-[#f4f4f5] border border-[#e4e4e7] text-[#52525b] text-xs font-medium hover:bg-[#eef2ff] hover:border-[#c7d2fe] hover:text-[#4f46e5] transition-all duration-200 cursor-default"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
