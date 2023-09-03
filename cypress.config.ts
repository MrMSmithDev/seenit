import { defineConfig } from 'cypress'
import { plugin as cypressFirebasePlugin } from 'cypress-firebase'
import admin from 'firebase-admin'

import serviceAccount from './serviceAccount.json'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      return cypressFirebasePlugin(on, config, admin, {
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
      })
    }
  }
})
