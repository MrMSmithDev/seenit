/* eslint-disable no-console */
import { UserType } from 'src/customTypes/types'

import { User } from 'firebase/auth'
import { getFirestore, collection, setDoc, doc, getDoc } from 'firebase/firestore'

function useUsers() {
  const firestoreDB = getFirestore()

  async function updateUserProfile(currentUser: User) {
    try {
      const userRef = doc(collection(firestoreDB, 'users'), currentUser.uid)
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
      const userRef = doc(collection(firestoreDB, 'users'), uid)
      const userDoc = await getDoc(userRef)
      return userDoc.data() as UserType
    } catch (error) {
      console.error('Error loading userProfile:', error)
      throw error
    }
  }

  async function getUsersDisplayName(uid: string): Promise<string> {
    try {
      const userRef = doc(collection(firestoreDB, 'users'), uid)
      const userDoc = await getDoc(userRef)
      const userData = userDoc.data() as UserType
      return userData.displayName
    } catch (error) {
      console.error('Error loading users display name:', error)
      throw error
    }
  }

  return {
    updateUserProfile,

    loadUserProfile,
    getUsersDisplayName
  }
}

export default useUsers
