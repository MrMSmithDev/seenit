/* eslint-disable no-console */
//*******************//
//***** Comments ****//
//*******************//
import {
  addDoc,
  arrayUnion,
  collection,
  // getDoc,
  getDocs,
  getFirestore,
  orderBy,
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
  const commentID: number = Math.floor(Math.random()) * Date.now()
  const formattedID: string = commentID.toLocaleString(undefined, { maximumSignificantDigits: 9 })
  console.log(formattedID)
  return formattedID
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
        author: user?.uid,
        body: commentBody
      })
      addCommentToPost(postID, commentID)
      return true
    } catch (error) {
      console.error('Error writing comment:', error)
      throw error
    }
  }

  async function loadCommentFeed(postID: string): Promise<CommentType[]> {
    try {
      const commentDB = collection(firestoreDB, 'comments')
      const commentQuery = query(commentDB, where('postID', '==', postID), orderBy('timestamp'))

      const querySnapshot = await getDocs(commentQuery)
      const comments: CommentType[] = []

      querySnapshot?.forEach((currentDoc) => {
        const comment = currentDoc.data() as CommentType
        comments.push(comment)
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
