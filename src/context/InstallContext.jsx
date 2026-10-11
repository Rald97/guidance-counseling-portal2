import { createContext, useCallback, useContext, useEffect, useState } from 'react'

/**
 * Single source of truth for the PWA install flow.
 *
 * Why a provider? The "Install App" button appears in two places (the desktop
 * navbar and the mobile menu). If each button kept its own state, we'd register
 * the `beforeinstallprompt` listener twice and could show two different
 * messages. Holding the state here means exactly one listener, one prompt, and
 * one message no matter how many buttons are rendered.
 */

const InstallContext = createContext(null)

/** True for iOS Safari, which has no automatic install prompt. */
function detectIOSSafari() {
  const ua = window.navigator.userAgent
  // An iOS device …
  const iOSDevice = /iPad|iPhone|iPod/.test(ua)
  // … or a Mac claiming to be an iPad (iPadOS "desktop site" mode).
  const iPadOSMac = /Macintosh/.test(ua) && 'ontouchend' in document
  // … but not Chrome/Firefox/Edge on iOS, which use CriOS/FxiOS/EdgiOS.
  const notOtherIOSBrowser = !/CriOS|FxiOS|EdgiOS/.test(ua)
  return (iOSDevice || iPadOSMac) && notOtherIOSBrowser
}

export function InstallProvider({ children }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)
  // `hasPrompt` stays true after the prompt is consumed. A `beforeinstallprompt`
  // event only proves this browser supports installation — it is not a
  // one-shot resource for visibility purposes — so we must not let the button
  // disappear the moment the prompt is used up, or the user would never see
  // the confirmation message.
  const [hasPrompt, setHasPrompt] = useState(false)
  const [message, setMessage] = useState('')

  const isIOS = detectIOSSafari()

  // Detect if the browser already considers this an installed app.
  useEffect(() => {
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true
    if (standalone) setIsInstalled(true)
  }, [])

  // Capture the browser's install prompt before it disappears.
  useEffect(() => {
    const onBeforeInstallPrompt = (event) => {
      event.preventDefault()
      setHasPrompt(true)
      setDeferredPrompt(event)
    }
    const onInstalled = () => setIsInstalled(true)

    window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  const install = useCallback(async () => {
    // 1. The browser gave us a real prompt — use it.
    if (deferredPrompt) {
      try {
        deferredPrompt.prompt()
        const choice = await deferredPrompt.userChoice
        if (choice?.outcome === 'accepted') {
          setMessage('Thank you! The GCAS app is being installed.')
        } else {
          setMessage('No problem — you can install the app later from this page.')
        }
      } catch (error) {
        console.error('GCAS install prompt failed:', error)
        setMessage(
          'The install prompt could not be shown. Please try again, or use your browser menu to install.',
        )
      } finally {
        setDeferredPrompt(null)
      }
      return
    }

    // 2. Already installed.
    if (isInstalled) {
      setMessage('The GCAS app is already installed on this device.')
      return
    }

    // 3. iOS Safari — explain the manual steps.
    if (isIOS) {
      setMessage(
        'To install on iPhone or iPad: tap the Share button in Safari, then choose "Add to Home Screen".',
      )
      return
    }

    // 4. No installation support in this browser.
    setMessage(
      'This browser does not support app installation. You can still bookmark this page, or open the portal any time at portal.cdmconnect.online.',
    )
  }, [deferredPrompt, isInstalled, isIOS])

  const value = {
    // Show the button when this browser can install the app, on iOS, or when
    // it is already installed. `hasPrompt` (not the consumed `deferredPrompt`)
    // drives this so the button and its feedback stay on screen after use.
    canInstall: hasPrompt || isIOS || isInstalled,
    isInstalled,
    isInstallable: hasPrompt && !isInstalled,
    install,
    message,
  }

  return <InstallContext.Provider value={value}>{children}</InstallContext.Provider>
}

/** Read the install state. Must be used under <InstallProvider>. */
export function useInstall() {
  const context = useContext(InstallContext)
  if (!context) {
    throw new Error('useInstall must be used within an <InstallProvider>')
  }
  return context
}
