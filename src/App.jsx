import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Socials from './components/Socials'
import KalshiTracker from './pages/KalshiTracker'
import { personal } from './data/content'

function Footer() {
  return (
    <footer className="py-8 border-t border-[#e4e4e7] bg-[#fafafa] text-center">
      <p className="text-xs text-[#a1a1aa]">
        Designed &amp; Built by{' '}
        <span className="text-[#6366f1] font-medium">{personal.name}</span>
        {' '}· {new Date().getFullYear()}
      </p>
    </footer>
  )
}

function Portfolio() {
  return (
    <div className="bg-[#fafafa] text-[#18181b] min-h-screen">
      <Navbar />
      <Socials />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/NevanLandingPage.github.io">
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/kalshi-tracker" element={<KalshiTracker />} />
      </Routes>
    </BrowserRouter>
  )
}
