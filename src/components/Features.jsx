import SectionHeading from './SectionHeading.jsx'
import Icon from './Icon.jsx'
import { features } from '../data/content.js'
import './Features.css'

/**
 * Feature cards describing what GCAS offers.
 */
export default function Features() {
  return (
    <section id="features" className="section" aria-labelledby="features-title">
      <div className="container">
        <div id="features-title">
          <SectionHeading
            center
            eyebrow="Features"
            title="Everything students need to reach the guidance office"
            description="GCAS brings the essential guidance counseling tools into one simple, secure online experience inside the CDM OneServe portal."
          />
        </div>

        <ul className="features__grid">
          {features.map((feature, index) => (
            <li
              key={feature.title}
              className="feature-card"
              data-reveal
              style={{ '--reveal-delay': `${index * 0.09}s` }}
            >
              <span className="feature-card__icon">
                <Icon name={feature.icon} size={22} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className="feature-card__shine" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
