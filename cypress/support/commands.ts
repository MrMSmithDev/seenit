import { attachCustomCommands } from 'cypress-firebase'
import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'

firebase.initializeApp({
  apiKey: 'AIzaSyC0HUz0CDc2mo3kLF60VRKzSeRqpSY9ggo',
  authDomain: 'seenit-9e81d.firebaseapp.com',
  projectId: 'seenit-9e81d',
  storageBucket: 'seenit-9e81d.appspot.com',
  messagingSenderId: '197060165111',
  appId: '1:197060165111:web:90182ba92872e64b01c2f2'
})

attachCustomCommands({ Cypress, cy, firebase })
