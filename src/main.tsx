import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { firebaseApp, getFirebaseAnalytics } from './lib/firebase'
import './index.css'

// Ensure Firebase is initialized on app start
void firebaseApp
void getFirebaseAnalytics()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
