import { firebaseConfig } from '@src/firebaseConfig'
import { attachCustomCommands } from 'cypress-firebase'
import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'

firebase.initializeApp(firebaseConfig)

attachCustomCommands({ Cypress, cy, firebase })
