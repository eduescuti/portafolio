import { MotionConfig } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import GlobalBackground from './components/GlobalBackground'
import SmoothScroll from './components/SmoothScroll'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <GlobalBackground />
      <div className="relative min-h-screen overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Projects />
          <Timeline />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
        <Analytics />
      </div>
    </MotionConfig>
  )
}
