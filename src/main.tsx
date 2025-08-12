import React from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from "react-error-boundary";

// Ensure React is available globally for hooks
;(window as any).React = React

import App from './App.tsx'
import { ErrorFallback } from './ErrorFallback.tsx'

import "./index.css"
import "@github/spark/spark"

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <App />
   </ErrorBoundary>
)
