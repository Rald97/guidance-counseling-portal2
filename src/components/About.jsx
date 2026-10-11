import SectionHeading from './SectionHeading.jsx'
import Icon from './Icon.jsx'
import { aboutBenefits, portalModules, school } from '../data/content.js'
import './About.css'

/**
 * About GCAS: purpose and benefits.
 */
export default function About() {
  return (
    <section id="about" className="section section--tint" aria-labelledby="about-title">
      <div className="container about__inner">
        <div className="about__text">
          <div id="about-title">
            <SectionHeading
              eyebrow="About GCAS"
              title="Supporting every student, one conversation at a time"
            />
          </div>

          <div className="about__body" data-reveal>
            <p>
              The Guidance Counseling and Appointment System (GCAS) is the guidance office module
              of <strong>{school.portalName}</strong>, the integrated campus service platform of{' '}
              <strong>{school.name}</strong>. It gives students and faculty a simple, organized way
              to connect with guidance counselors — without walking to the office just to book a
              schedule.
            </p>
            <p>
              Whether a student needs someone to talk to, wants academic advice, or simply has a
              concern they cannot handle alone, GCAS makes reaching out easier, faster, and more
              comfortable.
            </p>
          </div>

          <ul className="about__benefits" data-reveal>
            {aboutBenefits.map((benefit) => (
              <li key={benefit}>
                <span className="about__check">
                  <Icon name="check" size={14} strokeWidth={2.6} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <aside className="about__aside" data-reveal style={{ '--reveal-delay': '0.12s' }}>
          <div className="about-card">
            <span className="about-card__icon">
              <Icon name="sparkle" size={22} />
            </span>
            <h3>One portal, many services</h3>
            <p>
              GCAS lives inside {school.portalName}, alongside other campus services that students
              already use:
            </p>
            <ul className="about-card__modules">
              {portalModules.map((module) => (
                <li key={module}>
                  <Icon name="check" size={13} strokeWidth={2.6} />
                  {module}
                </li>
              ))}
            </ul>
            <p className="about-card__note">
              This website is an informational promotional site for GCAS. It does not host
              accounts or handle logins — everything happens on the official portal.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
