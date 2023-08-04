/* eslint-disable no-console, indent*/
import { useState, useRef } from 'react'
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
  const [lastDoc, setLastDocState] = useState<QueryDocumentSnapshot | null>(null)

  const lastDocRef = useRef<QueryDocumentSnapshot | null>(lastDoc)
  const setLastDoc = (newDoc: QueryDocumentSnapshot | null): void => {
    lastDocRef.current = newDoc
    setLastDocState(newDoc)
  }

  function setQuery(queryConstraints: FilterQuery, userID: string | null): Query {
    let queryToSet: Query
    if (lastDocRef.current) {
      queryToSet = userID
        ? query(
            postDB,
            where('authorID', '==', userID),
            orderBy(queryConstraints.attribute, queryConstraints.order),
            startAfter(lastDocRef.current),
            limit(10)
          )
        : query(
            postDB,
            orderBy(queryConstraints.attribute, queryConstraints.order),
            startAfter(lastDocRef.current),
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
    return queryToSet
  }

  async function loadScroll(
    queryConstraints: FilterQuery,
    userID: string | null = null
  ): Promise<void> {
    const postsQuery = setQuery(queryConstraints, userID)
    try {
      const querySnapshot: QuerySnapshot = await getDocs(postsQuery)
      const tempPosts: PostType[] = []

      querySnapshot.forEach((currentDoc: QueryDocumentSnapshot) => {
        const post = currentDoc.data() as PostType
        tempPosts.push(post)
      })

      // If there are no new posts, exit early
      if (tempPosts.length === 0) return

      setPosts((prevPosts) => {
        const filteredPosts = tempPosts.filter(
          (post: PostType) => !prevPosts.some((prevPost: PostType) => prevPost.ID === post.ID)
        )
        return [...prevPosts, ...filteredPosts]
      })

      const tempLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
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
