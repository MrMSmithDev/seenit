/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from 'react'
import useUsers from '@hooks/useUsers'
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User as FirebaseUser
} from 'firebase/auth'

function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const { updateUserProfile } = useUsers()

  useEffect(() => {
    const updateProfileInfo = async () => {
      const auth = getAuth()
      if (auth.currentUser) await updateUserProfile(auth.currentUser)
      const unsubscribe = onAuthStateChanged(auth, (userChange) => {
        setUser(userChange)
      })

      return () => unsubscribe()
    }

    updateProfileInfo()
  }, [])

  async function signIn(): Promise<void> {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(getAuth(), provider)
  }

  async function signOutUser(): Promise<void> {
    await signOut(getAuth())
  }

  function getUserName(): string | null {
    return user?.displayName || null
  }

  function getUserImage(): string | null {
    return user?.photoURL || null
  }

  return {
    user,
    signIn,
    signOutUser,

    getUserName,
    getUserImage
  }
}

export default useAuth
