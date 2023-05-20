/* eslint-disable no-console */
import { PostType } from 'src/customTypes/types'

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
  getDocs,
  where
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
      const userRef = doc(collection(getFirestore(), 'users', currentUser.uid))
      await setDoc(userRef, {
        uid: currentUser?.uid,
        displayName: currentUser?.displayName,
        photoURL: currentUser?.photoURL
      })
    } catch (error) {
      console.error('Error updating user information:', error)
      throw error
    }
  }

  async function loadUserProfile(uid: string) {
    try {
      const userDB = collection(getFirestore(), 'users')
      const querySnapshot = await getDocs(query(userDB, where('uid', '==', uid)))

      const userDoc = querySnapshot.docs[0].data()
      return userDoc
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
        author: post.authorID,
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
    const postDB = collection(getFirestore(), 'posts')
    const recentPostsQuery = query(postDB, orderBy('timestamp', 'desc'), limit(20))

    try {
      const querySnapshot = await getDocs(recentPostsQuery)
      const posts: PostType[] = []

      querySnapshot.forEach((currentDoc) => {
        const post = currentDoc.data() as PostType
        posts.push(post)
      })
      return posts
    } catch (error) {
      console.error('Error loading posts:', error)
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
    loadPostFeed
  }
}

export default useFirestore
