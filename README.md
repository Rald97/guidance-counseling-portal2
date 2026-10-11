# GCAS Promotional Website

A modern, responsive, installable (PWA) promotional website for the **Guidance Counseling and
Appointment System (GCAS)** of **Colegio de Montalban**, part of the official
[CDM OneServe portal](https://portal.cdmconnect.online/).

> **Important:** this site is purely informational and promotional. It does **not** host accounts,
> handle logins, or duplicate the portal. Every "access" button simply opens the official portal
> at <https://portal.cdmconnect.online/> in the same tab.

## ✨ What's inside

- **Landing page sections:** hero, features, how it works, system preview, about GCAS, user
  access cards, contact band, and footer.
- **Green theme** matched to the official CDM OneServe palette (forest green `#106A2E`,
  deep green `#0B3D22`, mint `#10B981`, white).
- **Fully responsive** — desktop, tablet, and mobile, with a slide-down mobile menu.
- **Role-based access cards:** Counselor, Student, and Faculty Members (mobile-friendly) plus
  Guidance Admin (desktop only — hidden below 768 px).
- **PWA:** web app manifest, generated icons, service worker with offline caching of the public
  site assets, and an **Install App** button with friendly fallback messages.
- **Accessibility:** semantic HTML, skip link, keyboard focus styles, `aria-*` attributes, and
  `prefers-reduced-motion` support.
- **System previews** are clearly labeled **illustrative mockups** built with CSS — they are not
  real screenshots and contain no real data.

## 🛠 Tech stack

| Tool | Purpose |
| --- | --- |
| [React 18](https://react.dev/) | UI library |
| [Vite 5](https://vitejs.dev/) | Dev server & production build |
| [vite-plugin-pwa](https://vite-plugin-pwa.netlify.app/) | Manifest + Workbox service worker |
| [sharp](https://sharp.pixelplumbing.com/) | Generates the PNG app icons (dev only) |
| Plain CSS | Design tokens + one stylesheet per component |

## 🚀 Getting started

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build → dist/
npm run build

# 4. Preview the production build locally (http://localhost:4173)
npm run preview
```

Regenerate the app icons (only needed if you change the artwork):

```bash
npm run icons
```

## 📁 Project structure

```
├─ public/
│  ├─ icons/                  # PWA icons (192, 512, maskable) — generated
│  ├─ logo/cdm-logo.png       # Official CDM OneServe logo
│  ├─ apple-touch-icon.png
│  └─ favicon.svg
├─ scripts/
│  └─ generate-icons.mjs      # npm run icons
├─ src/
│  ├─ components/             # One .jsx + .css per section/component
│  │  ├─ Navbar  Hero  Features  HowItWorks  SystemPreview
│  │  ├─ About  UserAccess  Contact  Footer
│  │  ├─ InstallAppButton    # PWA install button
│  │  ├─ Logo  Icon  SectionHeading  ErrorBoundary
│  ├─ data/content.js         # All text, links, roles, features (edit here)
│  ├─ hooks/
│  │  ├─ usePWAInstall.js     # beforeinstallprompt handling
│  │  └─ useReveal.js         # Scroll-reveal animations
│  ├─ styles/
│  │  ├─ variables.css        # Design tokens (colors, fonts, shadows)
│  │  └─ base.css             # Reset, buttons, utilities
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ vite.config.js             # React + PWA (manifest + Workbox) config
└─ package.json
```

## 📲 PWA notes

- Manifest: name, icons, `theme_color #106A2E`, standalone display, start/scope `/`.
- The service worker **precaches only this site's public assets** (HTML, JS, CSS, icons, logo).
  It **never caches** the official portal, its API, credentials, or any private data — offline
  support is limited to this promotional website.
- The **Install App** button appears when the browser supports installation (Chromium) or on
  iPhone/iPad, where it explains the manual "Add to Home Screen" steps. When installation is not
  supported, it explains that instead.

## 🔗 Portal integration

All portal links point to `https://portal.cdmconnect.online/` (defined once in
`src/data/content.js` as `PORTAL_URL`). They open in the **same tab**. No authentication,
booking, or data exchange is implemented on this site — that all belongs to the official portal.

## 🖼 Content policy

To stay accurate, this website:

- does not publish invented statistics, user counts, or success rates;
- shows only clearly labeled **illustrative mockups** instead of screenshots;
- describes features at a high level and links to the real system for actual use.
