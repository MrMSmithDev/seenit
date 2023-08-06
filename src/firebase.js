import { initializeApp, getApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from './firebaseConfig'

let app

try {
  app = initializeApp(firebaseConfig)
} catch (error) {
  console.error('Error loading firebase:', error)
}

export const auth = getApp(app)
export const firestore = getFirestore(app)
