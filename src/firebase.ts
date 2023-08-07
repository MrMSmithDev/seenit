/* eslint-disable no-console */
import { FirebaseStorage, getStorage } from '@firebase/storage'
import { initializeApp, FirebaseApp } from '@firebase/app'
import { Auth, getAuth } from '@firebase/auth'
import { Firestore, getFirestore } from '@firebase/firestore'
import { firebaseConfig } from './firebaseConfig'

let app: FirebaseApp

try {
  app = initializeApp(firebaseConfig)
} catch (error) {
  console.error('Error loading firebase:', error)
}

export const auth: Auth = getAuth(app!)
export const firestore: Firestore = getFirestore(app!)
export const storage: FirebaseStorage = getStorage(app!)
