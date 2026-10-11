import { Component } from 'react'

/**
 * Catches unexpected rendering errors so visitors see a friendly message
 * instead of a blank page.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('GCAS site error:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            padding: '2rem',
            textAlign: 'center',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div>
            <h1 style={{ color: '#106A2E' }}>Something went wrong</h1>
            <p style={{ color: '#4B5D52', marginTop: '.5rem' }}>
              Please refresh the page, or open the official portal directly at{' '}
              <a href="https://portal.cdmconnect.online/">portal.cdmconnect.online</a>.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                marginTop: '1rem',
                padding: '.7rem 1.4rem',
                borderRadius: '.8rem',
                border: 'none',
                background: '#106A2E',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reload page
            </button>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}
