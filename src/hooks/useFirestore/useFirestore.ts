/* eslint-disable no-console */
import { UserType, PostType } from 'src/customTypes/types'

import { User } from 'firebase/auth'
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  // onSnapshot,
  setDoc,
  // updateDoc,
  doc,
  serverTimestamp,
  // QuerySnapshot,
  getDoc,
  getDocs
} from 'firebase/firestore'

function generateID(): string {
  return Date.now().toString()
}

function useFirestore() {
  //*******************//
  //****** Users ******//
  //*******************//
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
  //*******************//
  //****** Posts ******//
  //*******************//

  async function writePost(post: PostType) {
    const postID = generateID()

    try {
      await addDoc(collection(getFirestore(), 'posts'), {
        ID: postID,
        timeStamp: serverTimestamp(),
        authorID: post.authorID,
        title: post.title,
        body: post.body
      })

      if (post.image) {
        console.log('Add image here')
      }
    } catch (error) {
      console.error('Error writing post:', error)
      throw error
    }
  }

  async function loadPostFeed(): Promise<PostType[]> {
    try {
      const postDB = collection(getFirestore(), 'posts')
      const recentPostsQuery = query(postDB, orderBy('timeStamp', 'desc'), limit(20))

      const querySnapshot = await getDocs(recentPostsQuery)
      const posts: PostType[] = []

      querySnapshot.forEach((currentDoc) => {
        const post = currentDoc.data() as PostType
        console.log(post)
        posts.push(post)
      })
      return posts
    } catch (error) {
      console.error('Error loading posts:', error)
      throw error
    }
  }

  async function setFavoriteStatus(userID: string, postID: string): Promise<void> {
    try {
      const userRef = doc(collection(getFirestore(), 'users'), userID)
      const userDoc = await getDoc(userRef)
      const userFavoritesArr: string[] = userDoc.data()?.favorites

      if (userFavoritesArr.includes(postID)) {
        const IDIndex: number = userFavoritesArr.indexOf(postID)
        userFavoritesArr.splice(IDIndex, 1)
      } else {
        userFavoritesArr.push(postID)
      }

      await setDoc(
        userRef,
        {
          favorites: userFavoritesArr
        },
        { merge: true }
      )
    } catch (error) {
      console.error('Error changing favorite status:', error)
      throw error
    }
  }

  async function checkFavoriteStatus(userID: string, postID: string): Promise<boolean> {
    try {
      const userRef = doc(collection(getFirestore(), 'users'), userID)
      const userDoc = await getDoc(userRef)
      const userData = userDoc?.data() as UserType
      if (userData.favorites?.includes(postID)) return true
      return false
    } catch (error) {
      console.error('Error checking favorites:', error)
      throw error
    }
  }

  // async function editPost(post: PostType): Promise<void> {
  //   const
  // }
  // function deletePost
  // function retrievePost
  // function loadMyFavorites

  //*******************//
  //***** Comments ****//
  //*******************//

  // function writeComment
  // function loadComments
  // function editComment
  // function deleteComment
  // function loadMyComments

  return {
    updateUserProfile,
    loadUserProfile,

    writePost,
    loadPostFeed,

    setFavoriteStatus,
    checkFavoriteStatus
  }
}

export default useFirestore
