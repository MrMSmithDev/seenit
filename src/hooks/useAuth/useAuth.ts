/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User as FirebaseUser
} from 'firebase/auth'
import { auth } from '@src/firebase'

function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userChange) => {
      setUser(userChange)
    })

    return () => unsubscribe()
  }, [])

  async function signIn(): Promise<void> {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  async function signOutUser(): Promise<void> {
    await signOut(auth)
  }

  function getUserName(): string | null {
    return user?.displayName || null
  }

  function getUserGoogleImage(): string | null {
    return user?.photoURL || null
  }

  return {
    user,
    signIn,
    signOutUser,

    getUserName,
    getUserGoogleImage
  }
}

export default useAuth
