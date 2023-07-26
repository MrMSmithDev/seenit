import { useEffect, useState } from 'react'
import { FilterQuery, PostType } from 'src/customTypes/types'

import {
  collection,
  CollectionReference,
  DocumentReference,
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

function useInfiniteScroll(queryConstraints: FilterQuery, userID: string | null = null) {
  const postDB: CollectionReference = collection(getFirestore(), 'posts')

  const [posts, setPosts] = useState<PostType[]>([])
  const [postsQuery, setPostsQuery] = useState<Query>(
    query(postDB, orderBy(queryConstraints.attribute, queryConstraints.order), limit(10))
  )

  useEffect(() => {
    if (userID) {
      const queryWithUser: Query = query(
        query(
          postDB,
          where('authorID', '==', userID),
          orderBy(queryConstraints.attribute, queryConstraints.order),
          limit(10)
        )
      )
      setPostsQuery(queryWithUser)
    }
  }, [])

  useEffect(() => {
    const loadPosts = async () => {
      try {
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
    }
    loadPosts()
  }, [])

  return {
    posts
  }
}

export default useInfiniteScroll
