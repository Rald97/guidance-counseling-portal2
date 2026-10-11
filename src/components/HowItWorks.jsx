import SectionHeading from './SectionHeading.jsx'
import Icon from './Icon.jsx'
import { steps, PORTAL_URL } from '../data/content.js'
import './HowItWorks.css'

/**
 * Step-by-step guide for students.
 */
export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section section--tint" aria-labelledby="how-title">
      <div className="container">
        <div id="how-title">
          <SectionHeading
            center
            eyebrow="How it works"
            title="From question to counseling in four simple steps"
            description="No forms to print, no long queues. Here is how students can reach the guidance office using GCAS."
          />
        </div>

        <ol className="steps">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="step"
              data-reveal
              style={{ '--reveal-delay': `${index * 0.1}s` }}
            >
              <span className="step__number" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>

        <p className="steps__note" data-reveal>
          <Icon name="external" size={15} />
          General overview only — the live portal may look slightly different. All access happens
          on the official site at{' '}
          <a href={PORTAL_URL}>portal.cdmconnect.online</a>.
        </p>
      </div>
    </section>
  )
}
