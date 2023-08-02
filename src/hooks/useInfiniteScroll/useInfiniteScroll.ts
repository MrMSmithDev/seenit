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
  startAfter,
  where
} from 'firebase/firestore'

function useInfiniteScroll() {
  const postDB: CollectionReference = collection(getFirestore(), 'posts')

  const [posts, setPosts] = useState<PostType[]>([])
  const [postsQuery, setPostsQuery] = useState<Query>(
    query(postDB, orderBy('timeStamp', 'desc'), limit(10))
  )

  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot | null>(null)

  useEffect(() => {
    console.log(lastDoc)
  }, [lastDoc])

  function setQuery(queryConstraints: FilterQuery, userID: string | null): void {
    console.log(lastDoc)
    let queryToSet: Query
    if (lastDoc) {
      queryToSet = userID
        ? query(
            postDB,
            where('authorID', '==', userID),
            orderBy(queryConstraints.attribute, queryConstraints.order),
            startAfter(lastDoc),
            limit(10)
          )
        : query(
            postDB,
            orderBy(queryConstraints.attribute, queryConstraints.order),
            startAfter(lastDoc),
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

      // If there are no new posts, exit early
      if (tempPosts.length === 0) return

      setPosts((prevPosts) => [...prevPosts, ...tempPosts])

      const [tempLastDoc] = querySnapshot.docs.slice(-1)
      console.log(tempLastDoc)
      setLastDoc(tempLastDoc)
    } catch (error) {
      console.error('Error loading users posts:', error)
      throw error
    }
  }

  function clearPosts(): void {
    setPosts([])
    setLastDoc(null)
  }

  return {
    posts,
    loadScroll,
    clearPosts
  }
}

export default useInfiniteScroll
