/* eslint-disable no-console, indent*/
import { useState, useRef } from 'react'
import { FilterQuery, PostType } from 'src/customTypes/types'
import { setQuery } from '@utils/setQueries'

import { getDocs, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'

function useInfiniteScrollPosts() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [lastDoc, setLastDocState] = useState<QueryDocumentSnapshot | null>(null)

  const lastDocRef = useRef<QueryDocumentSnapshot | null>(lastDoc)
  const setLastDoc = (newDoc: QueryDocumentSnapshot | null): void => {
    lastDocRef.current = newDoc
    setLastDocState(newDoc)
  }

  async function loadScroll(
    queryConstraints: FilterQuery,
    userID: string | null = null
  ): Promise<void> {
    const postsQuery = setQuery(queryConstraints, userID, lastDocRef.current)
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

export default useInfiniteScrollPosts
