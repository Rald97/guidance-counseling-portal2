/**
 * End-to-end verification of the built GCAS promotional website.
 * Uses the system Microsoft Edge (no bundled browser download needed).
 *
 * Run it with the preview server already running:
 *   npm run preview      (terminal 1)
 *   npm run verify       (terminal 2)
 */
import { chromium } from 'playwright-core'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const BASE = 'http://localhost:4173'
const PORTAL = 'https://portal.cdmconnect.online/'
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const shots = path.join(root, 'verification-shots')

const results = []
const check = (name, pass, extra = '') => {
  results.push({ name, pass, extra })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${extra ? ` — ${extra}` : ''}`)
}

async function main() {
  await mkdir(shots, { recursive: true })
  const browser = await chromium.launch({ channel: 'msedge', headless: true })

  /* ---------------- Desktop ---------------- */
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await desktop.newPage()
  const consoleErrors = []
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text())
  })
  page.on('pageerror', (err) => consoleErrors.push(String(err)))

  await page.goto(BASE, { waitUntil: 'networkidle' })

  check('Page title mentions GCAS', (await page.title()).includes('GCAS'))

  // Every navigation link resolves to a section on the page
  const navLinks = await page.$$eval('.navbar__links a', (els) =>
    els.map((el) => ({ label: el.textContent.trim(), href: el.getAttribute('href') })),
  )
  check('Navigation has 6 links', navLinks.length === 6, navLinks.map((l) => l.label).join(', '))
  for (const link of navLinks) {
    const target = await page.$(link.href)
    check(`Nav target exists: ${link.href}`, Boolean(target))
  }

  // Smooth scrolling is enabled
  const smooth = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  )
  check('Smooth scrolling enabled', smooth === 'smooth', smooth)

  // Portal links: correct URL, same tab, no fake login
  const portalLinks = await page.$$eval('a[href="https://portal.cdmconnect.online/"]', (els) =>
    els.map((el) => ({ text: el.textContent.trim(), target: el.getAttribute('target') })),
  )
  check(
    'All portal links open in the same tab',
    portalLinks.length > 0 && portalLinks.every((l) => !l.target),
    `${portalLinks.length} links`,
  )

  // Access cards
  const cards = await page.$$eval('.access-card', (els) =>
    els.map((el) => ({
      name: el.querySelector('h3').textContent.trim(),
      visible: el.offsetParent !== null,
    })),
  )
  check('4 access cards rendered', cards.length === 4, cards.map((c) => c.name).join(', '))
  check(
    'Guidance Admin visible on desktop',
    cards.some((c) => c.name === 'Guidance Admin' && c.visible),
  )

  // Mockups are labeled as illustrative
  const tags = await page.$$eval('.mockup__tag', (els) => els.map((el) => el.textContent.trim()))
  check(
    'All 3 mockups labeled "Illustrative mockup"',
    tags.length === 3 && tags.every((t) => t === 'Illustrative mockup'),
  )

  // Sections present
  for (const id of ['home', 'features', 'how-it-works', 'preview', 'about', 'access', 'contact']) {
    check(`Section present: #${id}`, Boolean(await page.$(`#${id}`)))
  }

  // Service worker registered
  await page.waitForFunction(() => navigator.serviceWorker?.controller !== undefined, null, {
    timeout: 10000,
  })
  const swReady = await page.evaluate(async () => {
    const reg = await navigator.serviceWorker.getRegistration()
    return Boolean(reg)
  })
  check('Service worker registered', swReady)

  // Theme color + manifest
  const theme = await page.evaluate(
    () => document.querySelector('meta[name="theme-color"]')?.content,
  )
  check('Theme color is #106A2E', theme === '#106A2E', String(theme))

  // Scroll through the page so scroll-reveal animations trigger,
  // then return to the top for the screenshots.
  const scrollSweep = async (targetPage) => {
    await targetPage.evaluate(async () => {
      const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
      const height = document.body.scrollHeight
      for (let y = 0; y <= height; y += 280) {
        window.scrollTo(0, y)
        await wait(130)
      }
      window.scrollTo(0, 0)
      await wait(300)
    })
  }

  await scrollSweep(page)

  // Every scroll-reveal element should now be visible
  const hiddenReveals = await page.$$eval('[data-reveal]', (els) =>
    els.filter((el) => !el.classList.contains('is-visible')).length,
  )
  check('All scroll-reveal elements activated', hiddenReveals === 0, `${hiddenReveals} still hidden`)

  await page.screenshot({ path: path.join(shots, 'desktop-full.png'), fullPage: true })
  await page.screenshot({ path: path.join(shots, 'desktop-hero.png') })

  check('No console errors on desktop', consoleErrors.length === 0, consoleErrors.join(' | '))

  /* ---------------- Mobile ---------------- */
  const mobile = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 2,
  })
  const mpage = await mobile.newPage()
  const mobileErrors = []
  mpage.on('pageerror', (err) => mobileErrors.push(String(err)))

  await mpage.goto(BASE, { waitUntil: 'networkidle' })

  const adminCardVisibleMobile = await mpage.evaluate(() => {
    const card = [...document.querySelectorAll('.access-card')].find((el) =>
      el.textContent.includes('Guidance Admin'),
    )
    return card ? card.offsetParent !== null : false
  })
  check('Guidance Admin hidden on mobile', adminCardVisibleMobile === false)

  const adminLinksMobile = await mpage.$$eval(
    'a[href="https://portal.cdmconnect.online/"]',
    (els) =>
      els.filter(
        (el) => el.textContent.includes('Guidance Admin') && el.offsetParent !== null,
      ).length,
  )
  check('No Guidance Admin link visible on mobile', adminLinksMobile === 0)

  // The compact "Open Portal" navbar button is hidden on small screens
  // (the mobile menu provides its own portal button instead).
  const navPortalVisible = await mpage.evaluate(() => {
    const el = document.querySelector('.navbar__portal')
    return el ? el.offsetParent !== null : false
  })
  check('Compact navbar portal button hidden on mobile', navPortalVisible === false)

  const studentBtnMobile = await mpage.$$eval(
    'a[href="https://portal.cdmconnect.online/"]',
    (els) => els.some((el) => el.textContent.includes('Student')),
  )
  check('Student access button present on mobile', studentBtnMobile)

  // Mobile menu works
  await mpage.click('.navbar__toggle')
  await mpage.waitForTimeout(400)
  const menuOpen = await mpage.evaluate(
    () => document.querySelector('.navbar__mobile')?.classList.contains('navbar__mobile--open'),
  )
  check('Mobile menu opens', Boolean(menuOpen))
  await mpage.screenshot({ path: path.join(shots, 'mobile-menu.png') })

  await mpage.click('.navbar__mobile a[href="#features"]')
  await mpage.waitForTimeout(700)
  const menuClosed = await mpage.evaluate(
    () => !document.querySelector('.navbar__mobile')?.classList.contains('navbar__mobile--open'),
  )
  check('Mobile menu closes after choosing a link', menuClosed)

  await scrollSweep(mpage)
  await mpage.screenshot({ path: path.join(shots, 'mobile-full.png'), fullPage: true })

  // No horizontal overflow on mobile
  const overflow = await mpage.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  check('No horizontal overflow on mobile', overflow <= 1, `${overflow}px`)

  check('No page errors on mobile', mobileErrors.length === 0, mobileErrors.join(' | '))

  /* ---------------- Tablet ---------------- */
  const tablet = await browser.newContext({ viewport: { width: 768, height: 1024 } })
  const tpage = await tablet.newPage()
  await tpage.goto(BASE, { waitUntil: 'networkidle' })
  const tabletOverflow = await tpage.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  check('No horizontal overflow on tablet', tabletOverflow <= 1, `${tabletOverflow}px`)
  await scrollSweep(tpage)
  await tpage.screenshot({ path: path.join(shots, 'tablet-full.png'), fullPage: true })

  /* ---------------- PWA ---------------- */

  // 1) Offline reload should still render the precached promotional site.
  const pwa = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const ppage = await pwa.newPage()
  await ppage.goto(BASE, { waitUntil: 'networkidle' })
  await pwa.setOffline(true)
  await ppage.reload({ waitUntil: 'load' })
  const offlineTitle = await ppage.textContent('h1')
  check(
    'Site still renders while offline (precached)',
    Boolean(offlineTitle && offlineTitle.includes('Guidance counseling')),
    offlineTitle?.replace(/\s+/g, ' ').slice(0, 40),
  )
  await pwa.setOffline(false)

  // 2) Install button appears when the browser fires beforeinstallprompt.
  await ppage.evaluate(() => {
    const event = new Event('beforeinstallprompt', { cancelable: true, bubbles: true })
    event.prompt = () => {
      window.__gcasPromptCalled = true
    }
    event.userChoice = Promise.resolve({ outcome: 'accepted' })
    window.dispatchEvent(event)
  })
  await ppage.waitForSelector('.install--nav .install__button', {
    state: 'visible',
    timeout: 5000,
  })
  check('Install App button appears when installation is supported', true)

  await ppage.locator('.install--nav .install__button').click()
  const promptCalled = await ppage.evaluate(() => window.__gcasPromptCalled === true)
  check('Install button triggers the browser prompt', promptCalled)

  // The message lives in a shared context and should appear within a moment.
  await ppage
    .waitForFunction(
      () => {
        const el = document.querySelector('.install--nav .install__message')
        return el && el.textContent.trim().length > 0
      },
      null,
      { timeout: 5000 },
    )
    .catch(() => {})
  const installMsg = await ppage
    .locator('.install--nav .install__message')
    .textContent()
    .catch(() => '')
  check(
    'Install button shows feedback after use',
    Boolean(installMsg && installMsg.trim().length > 0),
    installMsg?.trim().slice(0, 60),
  )

  // 3) On iPhone/iPad the button explains the manual install steps instead.
  //    Real Edge fires beforeinstallprompt even with an iPhone user agent, so
  //    we suppress that event to emulate Safari, which has no install prompt.
  const ios = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  })
  const ipage = await ios.newPage()
  await ipage.addInitScript(() => {
    window.addEventListener(
      'beforeinstallprompt',
      (event) => {
        event.stopImmediatePropagation()
      },
      true,
    )
  })
  await ipage.goto(BASE, { waitUntil: 'networkidle' })
  // On small screens the install button lives inside the mobile menu.
  await ipage.click('.navbar__toggle')
  await ipage.waitForSelector('.navbar__mobile--open', { timeout: 5000 })
  await ipage.waitForSelector('#mobile-menu .install--inline .install__button', {
    state: 'visible',
    timeout: 5000,
  })
  await ipage.locator('#mobile-menu .install--inline .install__button').click()
  await ipage.waitForTimeout(400)
  const iosMsg = await ipage
    .locator('#mobile-menu .install--inline .install__message')
    .textContent()
  check(
    'iOS shows "Add to Home Screen" instructions',
    Boolean(iosMsg && iosMsg.includes('Add to Home Screen')),
    iosMsg?.trim().slice(0, 60),
  )

  await browser.close()

  const failed = results.filter((r) => !r.pass)
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`)
  if (failed.length) {
    console.log('Failed checks:', failed.map((f) => f.name).join(', '))
    process.exit(1)
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
