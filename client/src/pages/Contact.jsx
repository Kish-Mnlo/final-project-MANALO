import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

const CONTACTS = [
  {
    icon: faEnvelope,
    label: 'Email',
    value: 'vxviiuwu@gmail.com',
    href: 'mailto:vxviiuwu@gmail.com',
  },
  {
    icon: faInstagram,
    label: 'Instagram',
    value: '@kiwi.um',
    href: '#',
  },
  {
    icon: faXTwitter,
    label: 'Twitter',
    value: '@kiwiium',
    href: '#',
  },
  {
    icon: faDiscord,
    label: 'Discord',
    value: 'kiwium',
  },
]

export default function Contact() {
  return (
    <div className="contact-panel">
      <span className="contact-panel__title">Contact Me</span>

      <p className="contact-panel__intro">
        This is where I'm most reacheable, my preferred is Discord. Whether you
        have a question or a commission idea, I'd love to hear from you!
      </p>

      <div className="contact-list">
        {CONTACTS.map((item) => {
          const content = (
            <>
              <span className="contact-row__icon" aria-hidden="true">
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <span className="contact-row__info">
                <span className="contact-row__label">{item.label}</span>
                <span className="contact-row__value">{item.value}</span>
              </span>
            </>
          )

          return item.href ? (
            <a className="contact-row contact-row--link" href={item.href} key={item.label}>
              {content}
            </a>
          ) : (
            <div className="contact-row" key={item.label}>
              {content}
            </div>
          )
        })}
      </div>

      <p className="contact-panel__note">
        I reply within the day, if not, bump the message up!
      </p>

      <Link to="/commission" className="btn btn--primary contact-panel__btn">
        View Commission Info
      </Link>
    </div>
  )
}