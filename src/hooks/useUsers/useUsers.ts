/* eslint-disable no-console */
import { UserType } from 'src/customTypes/types'

import { User } from 'firebase/auth'
import { getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore'

function useUsers() {
  async function updateUserProfile(currentUser: User) {
    try {
      const userRef = doc(collection(getFirestore(), 'users'), currentUser.uid)
      const userDoc = await getDoc(userRef)
      if (userDoc.exists()) {
        await setDoc(
          userRef,
          {
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL
          },
          { merge: true }
        )
      } else {
        await setDoc(userRef, {
          uid: currentUser?.uid,
          displayName: currentUser?.displayName,
          photoURL: currentUser?.photoURL,
          favorites: []
        })
      }
    } catch (error) {
      console.error('Error updating user information:', error)
      throw error
    }
  }

  async function loadUserProfile(uid: string): Promise<UserType> {
    try {
      const userRef = doc(collection(getFirestore(), 'users'), uid)
      const userDoc = await getDoc(userRef)
      return userDoc.data() as UserType
    } catch (error) {
      console.error('Error loading userProfile:', error)
      throw error
    }
  }

  return {
    updateUserProfile,
    loadUserProfile
  }
}

export default useUsers
