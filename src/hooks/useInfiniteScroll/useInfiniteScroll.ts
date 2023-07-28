import { useState } from 'react'
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
  startAfter,
  where
} from 'firebase/firestore'

function useInfiniteScroll() {
  const postDB: CollectionReference = collection(getFirestore(), 'posts')

  const [posts, setPosts] = useState<PostType[]>([])
  const [postsQuery, setPostsQuery] = useState<Query>(
    query(postDB, orderBy('timeStamp', 'desc'), limit(10))
  )

  const [lastRef, setLastRef] = useState<DocumentReference>()

  function setQuery(queryConstraints: FilterQuery, userID: string | null): void {
    let queryToSet: Query
    if (lastRef) {
      queryToSet = userID
        ? query(
            postDB,
            where('authorID', '==', userID),
            orderBy(queryConstraints.attribute, queryConstraints.order),
            startAfter(lastRef),
            limit(10)
          )
        : query(
            postDB,
            orderBy(queryConstraints.attribute, queryConstraints.order),
            startAfter(lastRef),
            limit(10)
          )
    } else {
      queryToSet = userID
        ? query(
            postDB,
            where('authorID', '==', userID),
            orderBy(queryConstraints.attribute, queryConstraints.order),
            limit(10)
          )
        : query(postDB, orderBy(queryConstraints.attribute, queryConstraints.order), limit(10))
    }
    setPostsQuery(queryToSet)
  }

  async function loadScroll(
    queryConstraints: FilterQuery,
    userID: string | null = null
  ): Promise<void> {
    setQuery(queryConstraints, userID)
    try {
      const querySnapshot: QuerySnapshot = await getDocs(postsQuery)
      const tempPosts: PostType[] = []

      querySnapshot.forEach((currentDoc: QueryDocumentSnapshot) => {
        const post = currentDoc.data() as PostType
        tempPosts.push(post)
      })
      setPosts((prevPosts) => [...prevPosts, ...tempPosts])

      const [lastDoc] = querySnapshot.docs.slice(-1)
      setLastRef(lastDoc.ref)
    } catch (error) {
      console.error('Error loading users posts:', error)
      throw error
    }
  }

  return {
    posts,
    loadScroll
  }
}

export default useInfiniteScroll
