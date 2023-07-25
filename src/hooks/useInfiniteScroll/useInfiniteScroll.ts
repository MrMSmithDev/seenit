import { useEffect, useState } from 'react'
import { FilterQuery, PostType } from 'src/customTypes/types'

import {
  collection,
  CollectionReference,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where
} from 'firebase/firestore'

function useModal(queryConstraints: FilterQuery, userID: string | null = null) {
  const [posts, setPosts] = useState<PostType[]>([])
  const firestoreDB = getFirestore()

  useEffect(() => {
    try {
      const postDB: CollectionReference = collection(firestoreDB, 'posts')
      const postsQuery: Query = query(
        postDB,
        where('authorID', '==', userID),
        orderBy(queryConstraints.attribute, queryConstraints.order),
        limit(20)
      )

      const querySnapshot: QuerySnapshot = await getDocs(postsQuery)
      const tempPosts: PostType[] = []

      querySnapshot.forEach((currentDoc: QueryDocumentSnapshot) => {
        const post = currentDoc.data() as PostType
        tempPosts.push(post)
      })
      setPosts(tempPosts)
    } catch (error) {
      console.error('Error loading users posts:', error)
      throw error
    }
  }, [])

  return {
    posts
  }
}

export default useModal
