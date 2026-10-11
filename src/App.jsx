import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Features from './components/Features.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import SystemPreview from './components/SystemPreview.jsx'
import About from './components/About.jsx'
import UserAccess from './components/UserAccess.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { InstallProvider } from './context/InstallContext.jsx'
import useReveal from './hooks/useReveal.js'

export default function App() {
  useReveal()

  return (
    <InstallProvider>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <Features />
        <HowItWorks />
        <SystemPreview />
        <About />
        <UserAccess />
        <Contact />
      </main>

      <Footer />
    </InstallProvider>
  )
}
