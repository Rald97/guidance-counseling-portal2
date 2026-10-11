import SectionHeading from './SectionHeading.jsx'
import Icon from './Icon.jsx'
import './SystemPreview.css'

/** Small shared "browser window" frame for the mockups. */
function BrowserFrame({ label, children }) {
  return (
    <figure className="mockup" data-reveal>
      <div className="mockup__window" aria-hidden="true">
        <div className="mockup__bar">
          <span className="mockup__dots">
            <i /> <i /> <i />
          </span>
          <span className="mockup__url">portal.cdmconnect.online</span>
        </div>
        <div className="mockup__screen">{children}</div>
      </div>
      <figcaption className="mockup__caption">
        <span className="mockup__tag">Illustrative mockup</span>
        <p>{label}</p>
      </figcaption>
    </figure>
  )
}

/**
 * System preview: stylized illustrations of the guidance experience,
 * clearly labeled as mockups (no real screenshots or real data).
 */
export default function SystemPreview() {
  return (
    <section id="preview" className="section" aria-labelledby="preview-title">
      <div className="container">
        <div id="preview-title">
          <SectionHeading
            center
            eyebrow="System preview"
            title="A look inside the guidance experience"
            description="A stylized preview of how the guidance module can look on the CDM OneServe portal. These are illustrative mockups with sample data — not real screenshots."
          />
        </div>

        <div className="mockups">
          {/* 1 — Student guidance dashboard */}
          <BrowserFrame label="Student dashboard — open the guidance module and start a request.">
            <div className="screen">
              <div className="screen__hero">
                <span className="screen__pill">
                  <i className="screen__pulse" /> Guidance Counseling
                </span>
                <p className="screen__hello">Hello, Student!</p>
                <p className="screen__sub">How can we support you today?</p>
              </div>
              <div className="screen__tiles">
                <div className="screen__tile">
                  <span className="screen__tile-icon">
                    <Icon name="calendar" size={16} />
                  </span>
                  <div>
                    <strong>Book an appointment</strong>
                    <small>Request a counseling schedule</small>
                  </div>
                </div>
                <div className="screen__tile">
                  <span className="screen__tile-icon screen__tile-icon--amber">
                    <Icon name="bell" size={16} />
                  </span>
                  <div>
                    <strong>Updates</strong>
                    <small>See the status of your requests</small>
                  </div>
                </div>
              </div>
            </div>
          </BrowserFrame>

          {/* 2 — Appointment request */}
          <BrowserFrame label="Appointment request — choose a date and one of the available time slots.">
            <div className="screen">
              <p className="screen__title">Request an appointment</p>
              <div className="calendar" aria-hidden="true">
                <div className="calendar__head">
                  <span>M</span>
                  <span>T</span>
                  <span>W</span>
                  <span>T</span>
                  <span>F</span>
                  <span>S</span>
                  <span>S</span>
                </div>
                <div className="calendar__grid">
                  {Array.from({ length: 28 }, (_, day) => (
                    <span
                      key={day}
                      className={
                        day === 15 ? 'calendar__day calendar__day--active' : 'calendar__day'
                      }
                    >
                      {day + 1}
                    </span>
                  ))}
                </div>
              </div>
              <div className="slots">
                <span className="slot slot--taken">9:00 AM · Booked</span>
                <span className="slot slot--free">10:30 AM · Available</span>
                <span className="slot slot--free">1:00 PM · Available</span>
              </div>
              <span className="screen__fake-btn">Request appointment</span>
            </div>
          </BrowserFrame>

          {/* 3 — Counselor view */}
          <BrowserFrame label="Counselor view — review incoming appointment requests and their status.">
            <div className="screen">
              <p className="screen__title">Appointment requests</p>
              <ul className="requests">
                <li className="request">
                  <span className="request__avatar" />
                  <div className="request__info">
                    <strong>Student · 3rd Year</strong>
                    <small>Today · 10:30 AM</small>
                  </div>
                  <span className="request__status request__status--pending">Pending</span>
                </li>
                <li className="request">
                  <span className="request__avatar request__avatar--mint" />
                  <div className="request__info">
                    <strong>Student · 1st Year</strong>
                    <small>Tomorrow · 1:00 PM</small>
                  </div>
                  <span className="request__status request__status--confirmed">Confirmed</span>
                </li>
                <li className="request">
                  <span className="request__avatar request__avatar--amber" />
                  <div className="request__info">
                    <strong>Student · 4th Year</strong>
                    <small>Friday · 9:00 AM</small>
                  </div>
                  <span className="request__status request__status--pending">Pending</span>
                </li>
              </ul>
            </div>
          </BrowserFrame>
        </div>
      </div>
    </section>
  )
}
