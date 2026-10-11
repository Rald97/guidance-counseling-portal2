import Icon from './Icon.jsx'
import { PORTAL_URL, school } from '../data/content.js'
import './Contact.css'

/**
 * Contact band: points visitors to the guidance office through the official portal.
 */
export default function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__panel" data-reveal>
          <div className="contact__text">
            <span className="eyebrow eyebrow--light">Contact</span>
            <h2 id="contact-title">Questions? The guidance office is here for you.</h2>
            <p>
              For appointment concerns and other guidance matters, reach the{' '}
              {school.office} through the official CDM OneServe portal. Simply open the portal,
              sign in, and head to the Guidance Counseling module.
            </p>
          </div>

          <div className="contact__actions">
            <a className="btn btn--light" href={PORTAL_URL}>
              Open the official portal
              <Icon name="arrowRight" size={17} />
            </a>
            <p className="contact__disclaimer">
              This promotional website does not handle accounts, bookings, or logins.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
