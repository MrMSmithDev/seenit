import { attachCustomCommands } from 'cypress-firebase'
import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
import 'firebase/compat/database'
import 'firebase/compat/firestore'

import serviceAccount from '../../serviceAccount.json'
import { firebaseConfig } from '../../src/firebaseConfig'

firebase.initializeApp({ ...firebaseConfig, serviceAccountId: serviceAccount.client_id })

attachCustomCommands({ Cypress, cy, firebase })
