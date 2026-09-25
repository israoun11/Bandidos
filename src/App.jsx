import { useRef, useState } from 'react'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Experience from './three/Experience'
import { useLenis } from './hooks/useLenis'

import Hero from './sections/Hero'
import IngredientsSection from './sections/IngredientsSection'
import PreparationSection from './sections/PreparationSection'
import FireSection from './sections/FireSection'
import PlatingSection from './sections/PlatingSection'
import FinalDishSection from './sections/FinalDishSection'
import MenuSection from './sections/MenuSection'
import AboutSection from './sections/AboutSection'
import LocationSection from './sections/LocationSection'
import ContactSection from './sections/ContactSection'

export default function App() {
  const [loading, setLoading] = useState(true)
  const trackRef = useRef(null)

  useLenis(trackRef)

  return (
    <>
      <div className="grain" />
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <CustomCursor />
      <ScrollProgress />
      <Nav />

      {/* the persistent 3D canvas — fixed behind the cinematic track only */}
      <Experience />

      <main className="relative z-10">
        {/* HOME — the cinematic, camera-choreographed burger journey */}
        <div ref={trackRef}>
          <Hero />
          <IngredientsSection />
          <PreparationSection />
          <FireSection />
          <PlatingSection />
          <FinalDishSection />
        </div>

        {/* MENU / ABOUT / LOCATION / CONTACT — real restaurant content */}
        <MenuSection />
        <AboutSection />
        <LocationSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  )
}
