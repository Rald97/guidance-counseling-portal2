import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import InstallAppButton from './InstallAppButton.jsx'
import { navLinks, PORTAL_URL } from '../data/content.js'
import './Navbar.css'

/**
 * Sticky navigation bar with smooth-scroll links, a mobile menu,
 * the PWA install button, and a link to the official portal.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')

  // Add a shadow once the visitor starts scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the link of the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean)

    if (!('IntersectionObserver' in window)) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  // Close the mobile menu when the viewport grows (e.g. rotating a phone).
  useEffect(() => {
    const media = window.matchMedia('(min-width: 981px)')
    const onChange = (event) => {
      if (event.matches) setOpen(false)
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  // Lock background scrolling while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <>
      <header className={`navbar ${scrolled || open ? 'navbar--scrolled' : ''}`}>
        <nav className="navbar__inner container" aria-label="Main navigation">
          <a className="navbar__brand" href="#home" onClick={closeMenu}>
            <Logo compact />
            <span className="navbar__brand-text">
              <strong>GCAS</strong>
              <small>Colegio de Montalban</small>
            </span>
          </a>

          <ul className={`navbar__links ${open ? 'navbar__links--open' : ''}`}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={activeSection === link.href ? 'is-active' : ''}
                  onClick={closeMenu}
                  aria-current={activeSection === link.href ? 'page' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar__actions">
            <span className="navbar__install">
              <InstallAppButton variant="nav" />
            </span>
            <a className="btn btn--primary btn--sm navbar__portal" href={PORTAL_URL}>
              Open Portal
            </a>
            <button
              type="button"
              className="navbar__toggle"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              <Icon name={open ? 'close' : 'menu'} size={22} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu. It sits outside <header> on purpose: the header's
          backdrop-filter would otherwise clip a position:fixed panel. */}
      <div id="mobile-menu" className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`}>
        <div className="container navbar__mobile-inner">
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className={activeSection === link.href ? 'is-active' : ''}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="navbar__mobile-footer">
            <InstallAppButton variant="inline" />
            <a className="btn btn--primary btn--wide" href={PORTAL_URL} onClick={closeMenu}>
              Open the Official Portal
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
