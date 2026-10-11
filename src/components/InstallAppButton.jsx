import { useEffect, useId, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { useInstall } from '../context/InstallContext.jsx'
import './InstallAppButton.css'

/**
 * "Install App" button for the PWA.
 *
 * The install state lives in InstallContext (one prompt listener, one message)
 * so this button is safe to render in more than one place — for example the
 * desktop navbar and the mobile menu.
 */
export default function InstallAppButton({ variant = 'nav' }) {
  const { canInstall, isInstalled, isInstallable, install, message } = useInstall()
  const [showMessage, setShowMessage] = useState(false)
  const hideTimer = useRef(null)
  const messageId = useId()

  // Clean up the auto-hide timer if the button unmounts.
  useEffect(() => () => window.clearTimeout(hideTimer.current), [])

  if (!canInstall) return null

  const handleClick = async () => {
    await install()
    setShowMessage(true)
    window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => setShowMessage(false), 10000)
  }

  return (
    <div className={`install install--${variant}`}>
      <button
        type="button"
        className={`btn install__button ${variant === 'nav' ? 'btn--sm btn--outline' : 'btn--outline'}`}
        onClick={handleClick}
        disabled={isInstalled}
        aria-describedby={messageId}
        title={
          isInstalled
            ? 'The GCAS app is installed on this device'
            : isInstallable
              ? 'Install this website as an app'
              : 'How to install this app'
        }
      >
        <Icon name={isInstalled ? 'check' : 'download'} size={16} />
        {isInstalled ? 'Installed' : 'Install App'}
      </button>

      <p
        id={messageId}
        role="status"
        aria-live="polite"
        className={`install__message ${showMessage && message ? 'install__message--visible' : ''}`}
      >
        {message}
      </p>
    </div>
  )
}
