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
  where
} from 'firebase/firestore'

function useInfiniteScroll() {
  const postDB: CollectionReference = collection(getFirestore(), 'posts')

  const [posts, setPosts] = useState<PostType[]>([])
  const [postsQuery, setPostsQuery] = useState<Query>(
    query(postDB, orderBy('timeStamp', 'desc'), limit(10))
  )

  const [lastRef, setLastRef] = useState<DocumentReference>()

  function setQuery(queryConstraints: FilterQuery, userID: string | null = null): void {
    let queryToSet: Query
    if (userID) {
      queryToSet = query(
        query(
          postDB,
          where('authorID', '==', userID),
          orderBy(queryConstraints.attribute, queryConstraints.order),
          limit(10)
        )
      )
    } else {
      queryToSet = query(
        query(
          postDB,
          where('authorID', '==', userID),
          orderBy(queryConstraints.attribute, queryConstraints.order),
          limit(10)
        )
      )
    }
    setPostsQuery(queryToSet)
  }

  async function startFeed(): void {
    try {
      const querySnapshot: QuerySnapshot = await getDocs(postsQuery)
      const tempPosts: PostType[] = []

      querySnapshot.forEach((currentDoc: QueryDocumentSnapshot) => {
        const post = currentDoc.data() as PostType
        tempPosts.push(post)
      })
      setPosts(tempPosts)

      const [lastDoc] = querySnapshot.docs.slice(-1)
      setLastRef(lastDoc.ref)
    } catch (error) {
      console.error('Error loading users posts:', error)
      throw error
    }
  }

  const loadNextPosts = () => {
    if (lastRef) console.log(lastRef)
  }

  return {
    posts,
    loadNextPosts
  }
}

export default useInfiniteScroll
