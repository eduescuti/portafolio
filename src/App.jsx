import { MotionConfig, LazyMotion, domMax } from 'framer-motion'
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
import CustomCursor from './components/CustomCursor'

export default function App() {
  return (
    // LazyMotion + `m` cargan solo el subset necesario de Motion (bundle inicial mucho
    // menor). domMax incluye layout animations (layoutId del modal de Projects).
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        <SmoothScroll />
        <GlobalBackground />
        <CustomCursor />
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
    </LazyMotion>
  )
}
