/* eslint-disable no-console */
//*******************//
//***** Comments ****//
//*******************//
import {
  addDoc,
  arrayUnion,
  collection,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  where
} from 'firebase/firestore'
import useAuth from '@hooks/useAuth'
import { CommentType } from 'src/customTypes/types'

// function editComment
// function deleteComment
// function loadMyComments
const generateCommentID = (): string => {
  const commentID: number = Math.floor(Math.random() * Date.now())
  const formattedID: string = commentID.toLocaleString(undefined, { maximumSignificantDigits: 9 })
  return formattedID.replaceAll(',', '')
}

async function addCommentToPost(postID: string, commentID: string): Promise<void> {
  try {
    const postDB = collection(getFirestore(), 'posts')
    const querySnapshot = await getDocs(query(postDB, where('ID', '==', postID)))

    const postRef = querySnapshot.docs[0].ref
    await updateDoc(postRef, {
      comments: arrayUnion(commentID)
    })
  } catch (error) {
    console.error('Error adding comment to post:', error)
    throw error
  }
}

function useComments() {
  const firestoreDB = getFirestore()
  const { user } = useAuth()

  async function writeComment(postID: string, commentBody: string): Promise<boolean> {
    const commentID = generateCommentID()
    console.log(commentID)

    try {
      await addDoc(collection(firestoreDB, 'comments'), {
        postID,
        ID: commentID,
        timeStamp: serverTimestamp(),
        authorID: user?.uid,
        body: commentBody
      })
      addCommentToPost(postID, commentID)
      return true
    } catch (error) {
      console.error('Error writing comment:', error)
      throw error
    }
  }

  function loadCommentFeed(commentIDs: string[]): CommentType[] {
    try {
      const comments: CommentType[] = []

      commentIDs.forEach(async (id) => {
        const commentDB = collection(firestoreDB, 'comments')
        const commentQuery = query(commentDB, where('ID', '==', id))

        const querySnapshot = await getDocs(commentQuery)
        const commentDoc = querySnapshot.docs[0]

        if (commentDoc?.exists()) comments.push(commentDoc.data() as CommentType)
      })

      return comments
    } catch (error) {
      console.error('Error loading comments:', error)
      throw error
    }
  }

  return {
    writeComment,
    loadCommentFeed
  }
}

export default useComments
