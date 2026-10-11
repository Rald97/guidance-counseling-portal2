import Logo from './Logo.jsx'
import Icon from './Icon.jsx'
import { navLinks, roles, PORTAL_URL, school } from '../data/content.js'
import './Footer.css'

/**
 * Site footer: school information, quick links, role access, and the official portal.
 */
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        {/* Brand */}
        <div className="footer__brand">
          <Logo />
          <p>
            The Guidance Counseling and Appointment System (GCAS) of{' '}
            <strong>{school.name}</strong> — helping students connect with the{' '}
            {school.office}, online.
          </p>
          <span className="footer__location">
            <Icon name="map" size={15} />
            {school.location}
          </span>
        </div>

        {/* Quick links */}
        <nav className="footer__col" aria-label="Footer navigation">
          <h3>Explore</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Access by role */}
        <nav className="footer__col" aria-label="Portal access by role">
          <h3>Portal access</h3>
          <ul>
            {roles.map((role) => (
              <li key={role.name}>
                <a
                  href={PORTAL_URL}
                  className={role.desktopOnly ? 'footer__link--desktop' : ''}
                >
                  {role.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Official portal */}
        <div className="footer__col footer__official">
          <h3>Official portal</h3>
          <p>
            GCAS runs inside {school.portalName}. Signing in, bookings, and records all happen on
            the official site.
          </p>
          <a className="btn btn--light btn--sm" href={PORTAL_URL}>
            portal.cdmconnect.online
            <Icon name="external" size={15} />
          </a>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {school.name} · {school.office}
        </p>
        <p>
          This is an independent promotional website for GCAS. It is not the official portal and
          does not collect, store, or process any personal information.
        </p>
      </div>
    </footer>
  )
}
