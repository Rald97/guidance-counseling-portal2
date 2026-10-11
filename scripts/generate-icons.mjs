/**
 * Generates the PWA icons for the GCAS promotional website.
 *
 * The icons are drawn as SVG and rasterized to PNG with sharp, so they stay
 * crisp at every size. Run it once with:  npm run icons
 *
 * Output:
 *   public/favicon.svg            - browser tab icon
 *   public/apple-touch-icon.png   - iOS home screen icon (180x180)
 *   public/icons/icon-192.png     - manifest icon (192x192)
 *   public/icons/icon-512.png     - manifest icon (512x512)
 *   public/icons/maskable-512.png - Android maskable icon (512x512)
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const iconsDir = path.join(root, 'public', 'icons')

/** Shared artwork: a white speech bubble with a mint heart on a green gradient. */
const artwork = `
  <circle cx="416" cy="96" r="170" fill="#10B981" opacity="0.16"/>
  <circle cx="86" cy="436" r="150" fill="#6EE7B7" opacity="0.10"/>
  <path d="M176 128 H376 a40 40 0 0 1 40 40 V312 a40 40 0 0 1 -40 40 H268 L188 420 V352 H176 a40 40 0 0 1 -40 -40 V168 a40 40 0 0 1 40 -40 Z" fill="#FFFFFF"/>
  <path d="M276 300 C216 262 186 230 186 192 C186 162 208 140 236 140 C254 140 269 148 276 162 C283 148 298 140 316 140 C344 140 366 162 366 192 C366 230 336 262 276 300 Z" fill="#10B981"/>
`

const background = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#14813B"/>
      <stop offset="0.55" stop-color="#106A2E"/>
      <stop offset="1" stop-color="#0B3D22"/>
    </linearGradient>
  </defs>
`

/** Rounded-square icon (favicon, manifest icons, Apple touch icon). */
const roundedIcon = (radius) => `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    ${background}
    <rect width="512" height="512" rx="${radius}" fill="url(#bg)"/>
    ${artwork}
  </svg>
`

/** Maskable icon: full-bleed background with the artwork inside the safe zone. */
const maskableIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    ${background}
    <rect width="512" height="512" fill="url(#bg)"/>
    <g transform="translate(256 252) scale(0.62) translate(-256 -256)">
      ${artwork}
    </g>
  </svg>
`

const toPng = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer()

async function main() {
  await mkdir(iconsDir, { recursive: true })
  await mkdir(path.join(root, 'public'), { recursive: true })

  // SVG favicon
  await writeFile(path.join(root, 'public', 'favicon.svg'), roundedIcon(112).trim())

  // PNG icons
  const jobs = [
    [path.join(root, 'public', 'apple-touch-icon.png'), roundedIcon(96), 180],
    [path.join(iconsDir, 'icon-192.png'), roundedIcon(112), 192],
    [path.join(iconsDir, 'icon-512.png'), roundedIcon(112), 512],
    [path.join(iconsDir, 'maskable-512.png'), maskableIcon, 512],
  ]

  for (const [file, svg, size] of jobs) {
    await writeFile(file, await toPng(svg, size))
    console.log('created', path.relative(root, file))
  }

  console.log('All icons generated.')
}

main().catch((error) => {
  console.error('Icon generation failed:', error)
  process.exit(1)
})
