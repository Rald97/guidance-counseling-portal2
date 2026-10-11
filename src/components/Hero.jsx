import Icon from './Icon.jsx'
import InstallAppButton from './InstallAppButton.jsx'
import { PORTAL_URL } from '../data/content.js'
import './Hero.css'

/**
 * Hero section: headline, short description, calls to action,
 * and a decorative mockup of the guidance experience.
 */
export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__blob hero__blob--one" />
        <span className="hero__blob hero__blob--two" />
        <span className="hero__blob hero__blob--three" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge" data-reveal>
            <Icon name="sparkle" size={15} />
            Part of CDM OneServe · Guidance &amp; Counseling Office
          </span>

          <h1 id="hero-title" data-reveal style={{ '--reveal-delay': '0.08s' }}>
            Guidance counseling,
            <br />
            now just a <span className="hero__highlight">few taps away</span>.
          </h1>

          <p className="hero__lead" data-reveal style={{ '--reveal-delay': '0.16s' }}>
            The Guidance Counseling and Appointment System (GCAS) lets Colegio de Montalban
            students request a counseling appointment online, check when counselors are
            available, and receive updates — all through the official CDM OneServe portal.
          </p>

          <div className="hero__cta" data-reveal style={{ '--reveal-delay': '0.24s' }}>
            <a className="btn btn--light hero__cta-primary" href={PORTAL_URL}>
              Open the GCAS Portal
              <Icon name="arrowRight" size={17} />
            </a>
            <a className="btn btn--ghost-light" href="#how-it-works">
              See how it works
            </a>
          </div>

          <div className="hero__install" data-reveal style={{ '--reveal-delay': '0.3s' }}>
            <InstallAppButton variant="inline" />
          </div>

          <ul className="hero__chips" data-reveal style={{ '--reveal-delay': '0.36s' }}>
            <li>
              <Icon name="phone" size={15} /> Works on mobile, tablet &amp; desktop
            </li>
            <li>
              <Icon name="shield" size={15} /> Secure role-based access
            </li>
            <li>
              <Icon name="download" size={15} /> Installable as an app
            </li>
          </ul>
        </div>

        {/* Decorative mockup — a stylized illustration, not a real screenshot */}
        <div className="hero__visual" data-reveal style={{ '--reveal-delay': '0.2s' }} aria-hidden="true">
          <div className="hero-card">
            <div className="hero-card__header">
              <span className="hero-card__pill">
                <span className="hero-card__dot" /> Guidance Counseling
              </span>
              <p className="hero-card__hello">Hello, Student!</p>
              <p className="hero-card__sub">How can we support you today?</p>
            </div>

            <div className="hero-card__body">
              <div className="hero-card__tile">
                <span className="hero-card__tile-icon hero-card__tile-icon--green">
                  <Icon name="calendar" size={18} />
                </span>
                <div>
                  <strong>Book an appointment</strong>
                  <small>Pick a counselor and schedule</small>
                </div>
              </div>
              <div className="hero-card__tile">
                <span className="hero-card__tile-icon hero-card__tile-icon--mint">
                  <Icon name="clock" size={18} />
                </span>
                <div>
                  <strong>My appointments</strong>
                  <small>Track requests and updates</small>
                </div>
              </div>
            </div>
          </div>

          <span className="hero-float hero-float--confirmed">
            <Icon name="check" size={15} /> Appointment confirmed
          </span>
          <span className="hero-float hero-float--available">
            <Icon name="chat" size={15} /> Counselor available
          </span>
        </div>
      </div>

      <div className="hero__wave" aria-hidden="true" />
    </section>
  )
}
