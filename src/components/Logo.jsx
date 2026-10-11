import { useState } from 'react'
import './Logo.css'

/**
 * Official CDM OneServe logo (downloaded from the portal).
 * If the image ever fails to load, a simple text logo is shown instead.
 */
export default function Logo({ compact = false }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="logo logo--fallback" aria-label="Colegio de Montalban — CDM OneServe">
        <span className="logo__fallback-mark" aria-hidden="true">
          CDM
        </span>
        <span className="logo__fallback-text">
          <strong>GCAS</strong>
          <small>Colegio de Montalban</small>
        </span>
      </span>
    )
  }

  return (
    <span className={`logo ${compact ? 'logo--compact' : ''}`.trim()}>
      <img
        src="/logo/cdm-logo.png"
        alt="Colegio de Montalban — CDM OneServe"
        width="110"
        height="34"
        onError={() => setFailed(true)}
      />
    </span>
  )
}
