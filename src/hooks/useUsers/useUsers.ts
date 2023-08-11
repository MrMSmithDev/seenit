/* eslint-disable no-console */
import { getDownloadURL, ref, StorageReference, uploadBytesResumable } from '@firebase/storage'
import useAuth from '@hooks/useAuth'
import { firestore, storage } from '@src/firebase'
import emptyUser from '@utils/placeholders/emptyUser'
import resizeImage from '@utils/resizeImage'
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  increment,
  onSnapshot,
  Query,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore'
import { ApiReturn, ImageUploadData, PostType, StatsType, UserType } from 'src/customTypes/types'

function useUsers() {
  const { getUserGoogleImage } = useAuth()

  async function updateUserImage(image: File, currentUid: string): Promise<ImageUploadData> {
    try {
      const filePath = `${currentUid}/profileImage${image}`
      const newImageRef: StorageReference = ref(storage, filePath)
      const metaData = {
        contentType: 'image/jpeg'
      }
      const compressedImage = await resizeImage(image, 400)
      await uploadBytesResumable(newImageRef, compressedImage, metaData)

      const imageURL: string = await getDownloadURL(newImageRef)
      return { publicUrl: imageURL, imageRef: newImageRef }
    } catch (error) {
      console.error('Error uploading profile picture', error)
      throw error
    }
  }

  async function updateUserProfile(currentUid: string, newUserInfo: UserType): Promise<ApiReturn> {
    let imageData: ImageUploadData | null = null
    let imageURL: string

    const userDB: CollectionReference = collection(firestore, 'users')
    const userRef: DocumentReference = doc(userDB, currentUid)

    try {
      const userDoc: DocumentSnapshot = await getDoc(userRef)
      if (newUserInfo.image) {
        imageData = await updateUserImage(newUserInfo.image, currentUid)
        imageURL = imageData.publicUrl
      } else {
        imageURL = newUserInfo.photoURL
      }
      if (userDoc.exists()) {
        await setDoc(
          userRef,
          {
            displayName: newUserInfo?.displayName,
            blurb: newUserInfo?.blurb,
            photoURL: imageURL
          },
          { merge: true }
        )
      } else {
        await setDoc(userRef, {
          uid: currentUid,
          displayName: newUserInfo?.displayName,
          blurb: newUserInfo?.blurb,
          favorites: [],
          posts: 0,
          comments: 0
        })
      }
      return { success: true, reference: userRef }
    } catch (error) {
      console.error(error)
      // If image has been uploaded, but profile fails to update, revert photoURL
      // to google profile image
      try {
        if (imageData) {
          await setDoc(
            userRef,
            {
              photoURL: getUserGoogleImage()
            },
            { merge: true }
          )
        }
      } catch (nestedError) {
        console.error(nestedError)
      }
      return { success: false, reference: null, error: 'Error updating user information' }
    }
  }

  function setProfileListener(uid: string, updateCurrentUser: (userData: UserType) => void): void {
    try {
      const userDB: CollectionReference = collection(firestore, 'users')
      const userRef: DocumentReference = doc(userDB, uid)

      // Listener for any changes
      onSnapshot(userRef, (snapshot: DocumentSnapshot) => {
        if (snapshot.exists()) {
          const updatedData: UserType = snapshot.data() as UserType
          updateCurrentUser(updatedData)
        }
      })
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
  }

  async function loadUserProfile(uid: string): Promise<UserType> {
    try {
      const userDB: CollectionReference = collection(firestore, 'users')
      const userRef: DocumentReference = doc(userDB, uid)
      const userDoc: DocumentSnapshot = await getDoc(userRef)
      if (userDoc) return userDoc.data() as UserType
    } catch (error) {
      console.error('Error loading user profile:', error)
    }
    return emptyUser
  }

  async function loadProfileImage(uid: string): Promise<string> {
    try {
      const userData = await loadUserProfile(uid)
      return userData.photoURL
    } catch (error) {
      console.error('Error loading profile image:', error)
    }
    return ''
  }

  async function getUsersDisplayName(uid: string): Promise<string> {
    try {
      const userDB: CollectionReference = collection(firestore, 'users')
      const userRef: DocumentReference = doc(userDB, uid)
      const userDoc: DocumentSnapshot = await getDoc(userRef)
      const userData: UserType = userDoc.data() as UserType
      return userData.displayName
    } catch (error) {
      console.error('Error loading users display name:', error)
    }
    return ''
  }

  async function getUsersFavoriteCount(uid: string): Promise<number> {
    try {
      const postDB: CollectionReference = collection(firestore, 'posts')
      const postsQuery: Query = query(postDB, where('authorID', '==', uid))

      const querySnapshot: QuerySnapshot = await getDocs(postsQuery)
      const result = querySnapshot.docs.reduce(
        (total: number, currentDoc: QueryDocumentSnapshot) => {
          const docData = currentDoc.data() as PostType
          return total + (docData.favorites || 0)
        },
        0
      )

      return result
    } catch (error) {
      console.error('Error loading users favorite count:', error)
    }
    return 0
  }

  async function getUsersStats(uid: string): Promise<StatsType> {
    try {
      const userDB: CollectionReference = collection(firestore, 'users')
      const userRef: DocumentReference = doc(userDB, uid)
      const userDoc: DocumentSnapshot = await getDoc(userRef)
      const userData: UserType = userDoc.data() as UserType

      return {
        favorites: userData.favorites?.length || 0,
        posts: userData.posts || 0,
        comments: userData.comments || 0
      }
    } catch (error) {
      console.error('Error loading users post count:', error)
    }
    return { favorites: 0, posts: 0, comments: 0 }
  }

  async function incrementPostCount(uid: string): Promise<void> {
    try {
      const userDB: CollectionReference = collection(firestore, 'users')
      const userRef: DocumentReference = doc(userDB, uid)

      await updateDoc(userRef, {
        favorites: increment(1)
      })
    } catch (error) {
      console.error('Error incrementing post count:', error)
    }
  }

  async function incrementCommentCount(uid: string): Promise<void> {
    try {
      const userDB: CollectionReference = collection(firestore, 'users')
      const userRef: DocumentReference = doc(userDB, uid)

      await updateDoc(userRef, {
        comments: increment(1)
      })
    } catch (error) {
      console.error('Error incrementing comment count:', error)
    }
  }

  return {
    updateUserProfile,

    setProfileListener,
    loadUserProfile,
    loadProfileImage,

    getUsersDisplayName,
    getUsersFavoriteCount,
    getUsersStats,

    incrementPostCount,
    incrementCommentCount
  }
}

export default useUsers
