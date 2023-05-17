// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from '@components/app'

import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebaseConfig'

import '@styles/styles.scss'

try {
  initializeApp(firebaseConfig)
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('Could not initialize Firestore', error)
}

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
