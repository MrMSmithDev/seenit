/* eslint-disable no-console */
import { UserType, PostType } from 'src/customTypes/types'
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  setDoc,
  doc,
  serverTimestamp,
  getDoc,
  getDocs,
  where,
  getFirestore
} from 'firebase/firestore'

function generateID(): string {
  return Date.now().toString()
}

function usePosts() {
  const firestoreDB = getFirestore()
  //*******************//
  //****** Posts ******//
  //*******************//

  async function writePost(post: PostType) {
    const postID = generateID()

    try {
      await addDoc(collection(firestoreDB, 'posts'), {
        ID: postID,
        timeStamp: serverTimestamp(),
        authorID: post.authorID,
        title: post.title,
        body: post.body,
        comments: 0
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
      const postDB = collection(firestoreDB, 'posts')
      const recentPostsQuery = query(postDB, orderBy('timeStamp', 'desc'), limit(20))

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

  async function loadCurrentPost(postID: string): Promise<PostType> {
    try {
      const postDB = collection(firestoreDB, 'posts')
      const querySnapshot = await getDocs(query(postDB, where('ID', '==', postID)))

      const postData = querySnapshot.docs[0].data()
      return postData as PostType
    } catch (error) {
      console.error('Error loading post:', error)
      throw error
    }
  }

  async function setFavoriteStatus(userID: string, postID: string): Promise<void> {
    try {
      const userRef = doc(collection(firestoreDB, 'users'), userID)
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
      const userRef = doc(collection(firestoreDB, 'users'), userID)
      const userDoc = await getDoc(userRef)
      const userData = userDoc?.data() as UserType
      if (userData?.favorites?.includes(postID)) return true
      return false
    } catch (error) {
      console.error('Error checking favorites:', error)
      throw error
    }
  }

  async function incrementFavoriteCount(postID: string): Promise<void> {
    try {
      const postDB = collection(firestoreDB, 'posts')
      const querySnapshot = await getDocs(query(postDB, where('ID', '==', postID)))

      const postRef = querySnapshot.docs[0].ref
      const postData = querySnapshot.docs[0].data() as PostType

      const currentFavorites = postData?.favorites
      await setDoc(
        postRef,
        {
          favorites: currentFavorites! + 1
        },
        { merge: true }
      )
    } catch (error) {
      console.error('Error incrementing favorite count:', error)
      throw error
    }
  }

  async function decrementFavoriteCount(postID: string): Promise<void> {
    try {
      const postDB = collection(firestoreDB, 'posts')
      const querySnapshot = await getDocs(query(postDB, where('ID', '==', postID)))

      const postRef = querySnapshot.docs[0].ref
      const postData = querySnapshot.docs[0].data() as PostType

      const currentFavorites = postData?.favorites
      await setDoc(
        postRef,
        {
          favorites: currentFavorites! - 1
        },
        { merge: true }
      )
    } catch (error) {
      console.error('Error decrementing favorite count:', error)
      throw error
    }
  }

  // async function editPost(post: PostType): Promise<void> {
  //   const
  // }
  // function deletePost

  return {
    writePost,
    loadPostFeed,
    loadCurrentPost,

    setFavoriteStatus,
    checkFavoriteStatus,
    incrementFavoriteCount,
    decrementFavoriteCount
  }
}

export default usePosts
