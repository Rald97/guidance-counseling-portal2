import React from 'react'
import ReactDOM from 'react-dom/client'

// Base styles are imported first so component styles can override them.
import './styles/variables.css'
import './styles/base.css'

import App from './App.jsx'
import ErrorBoundary from './components/ErrorBoundary.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
