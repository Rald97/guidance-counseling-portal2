import SectionHeading from './SectionHeading.jsx'
import Icon from './Icon.jsx'
import { roles, PORTAL_URL } from '../data/content.js'
import './UserAccess.css'

/**
 * Access cards: one per role, each opening the official portal.
 * The Guidance Admin card is desktop-only (hidden on small screens).
 */
export default function UserAccess() {
  return (
    <section id="access" className="section" aria-labelledby="access-title">
      <div className="container">
        <div id="access-title">
          <SectionHeading
            center
            eyebrow="Get started"
            title="Choose your role to open the portal"
            description="GCAS is part of the CDM OneServe portal. Pick the role that matches you and sign in with your CDM account."
          />
        </div>

        <ul className="access__grid">
          {roles.map((role, index) => (
            <li
              key={role.name}
              className={`access-card ${role.desktopOnly ? 'access-card--desktop-only' : ''}`}
              data-reveal
              style={{ '--reveal-delay': `${index * 0.08}s` }}
            >
              <span className="access-card__icon">
                <Icon name={role.icon} size={22} />
              </span>
              <h3>{role.name}</h3>
              <p>{role.description}</p>
              <a className="btn btn--primary btn--wide" href={PORTAL_URL}>
                {role.action}
                <Icon name="arrowRight" size={16} />
              </a>
              {role.desktopOnly ? (
                <span className="access-card__desktop-note">
                  <Icon name="monitor" size={14} /> Best on desktop or laptop
                </span>
              ) : (
                <span className="access-card__mobile-note">
                  <Icon name="phone" size={14} /> Works great on mobile
                </span>
              )}
            </li>
          ))}
        </ul>

        <p className="access__admin-note">
          <Icon name="monitor" size={15} />
          <span>
            <strong>Guidance Admin</strong> access is intended for desktop use and is hidden on
            mobile devices.
          </span>
        </p>
      </div>
    </section>
  )
}
