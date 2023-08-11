/* eslint-disable no-console, indent*/
import { useRef, useState } from 'react'
import { setPostCommentsQuery, setUserCommentsQuery } from '@src/utils/setQueries'
import { getDocs, Query, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore'
import { CommentType } from 'src/customTypes/types'

function useInfiniteScrollComments() {
  const [comments, setComments] = useState<CommentType[]>([])
  const [lastDoc, setLastDocState] = useState<QueryDocumentSnapshot | null>(null)

  const lastDocRef = useRef<QueryDocumentSnapshot | null>(lastDoc)
  const setLastDoc = (newDoc: QueryDocumentSnapshot | null): void => {
    lastDocRef.current = newDoc
    setLastDocState(newDoc)
  }

  async function loadCommentScroll(
    postID: string | null,
    userID: string | null = null
  ): Promise<void> {
    let commentsQuery: Query
    if (userID) commentsQuery = setUserCommentsQuery(userID, lastDocRef.current)
    else commentsQuery = setPostCommentsQuery(postID!, lastDocRef.current)

    try {
      const querySnapshot: QuerySnapshot = await getDocs(commentsQuery)
      const tempComments: CommentType[] = []

      querySnapshot.forEach((currentDoc: QueryDocumentSnapshot) => {
        const comment = currentDoc.data() as CommentType
        tempComments.push(comment)
      })

      // If there are no new comments, exit early
      if (tempComments.length === 0) return

      setComments((prevComments) => {
        const filteredComments = tempComments.filter(
          (comment: CommentType) =>
            !prevComments.some((prevComment: CommentType) => prevComment.ID === comment.ID)
        )
        return [...prevComments, ...filteredComments]
      })

      const tempLastDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
      setLastDoc(tempLastDoc)
    } catch (error) {
      console.error('Error loading users comments:', error)
      throw error
    }
  }

  function clearComments(): void {
    setComments([])
    setLastDoc(null)
  }

  return {
    comments,
    loadCommentScroll,
    clearComments
  }
}

export default useInfiniteScrollComments
