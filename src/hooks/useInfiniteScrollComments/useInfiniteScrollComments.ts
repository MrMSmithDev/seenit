/* eslint-disable no-console, indent*/
import { useState, useRef } from 'react'
import { FilterQuery, PostType } from 'src/customTypes/types'
import { setFavoritesQuery, setQuery } from '@utils/setQueries'

import {
  collection,
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getDocs,
  Query,
  QueryDocumentSnapshot,
  QuerySnapshot
} from 'firebase/firestore'
import { firestore } from '@src/firebase'

async function getUsersFavorites(userID: string): Promise<string[]> {
  let userFavoriteIDs: string[] = []

  const userRef: DocumentReference = doc(collection(firestore, 'users'), userID)
  const userDoc: DocumentSnapshot = await getDoc(userRef)

  if (userDoc.exists()) userFavoriteIDs = userDoc.data().favorites
  return userFavoriteIDs
}

function useInfiniteScrollPosts() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [lastDoc, setLastDocState] = useState<QueryDocumentSnapshot | null>(null)
  const [usersFavorites, setUsersFavorites] = useState<string[]>([])

  const lastDocRef = useRef<QueryDocumentSnapshot | null>(lastDoc)
  const setLastDoc = (newDoc: QueryDocumentSnapshot | null): void => {
    lastDocRef.current = newDoc
    setLastDocState(newDoc)
  }

  const favoritesRef = useRef<string[]>(usersFavorites)
  const setFavorites = (newFavoritesArr: string[]): void => {
    favoritesRef.current = newFavoritesArr
    setUsersFavorites(newFavoritesArr)
  }

  async function loadScroll(
    queryConstraints: FilterQuery,
    userID: string | null = null,
    constraint: 'favorites' | null = null
  ): Promise<void> {
    let postsQuery: Query
    if (userID && constraint) {
      // If searching for a user's favorites
      if (!favoritesRef.current.length) {
        const favoritesList = await getUsersFavorites(userID)
        setFavorites(favoritesList)
      }
      postsQuery = setFavoritesQuery(queryConstraints, favoritesRef.current, lastDocRef.current)
      // If not searching for a users favorites
    } else postsQuery = setQuery(queryConstraints, userID, lastDocRef.current)

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
    setFavorites([])
  }

  return {
    posts,
    loadScroll,
    clearPosts
  }
}

export default useInfiniteScrollPosts
