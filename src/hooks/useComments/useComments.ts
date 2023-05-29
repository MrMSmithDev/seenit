/* eslint-disable no-console */
//*******************//
//***** Comments ****//
//*******************//
import { addDoc, collection, getFirestore, serverTimestamp } from 'firebase/firestore'
import useAuth from '@hooks/useAuth'

// function loadComments
// function editComment
// function deleteComment
// function loadMyComments
const generateCommentID = (): string => {
  const commentID: number = Math.floor(Math.random()) * Date.now()
  const formattedID: string = commentID.toLocaleString(undefined, { maximumSignificantDigits: 9 })
  return formattedID
}

function useComments() {
  const firestoreDB = getFirestore()
  const { user } = useAuth()

  async function writeComment(postID: string, commentBody: string) {
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
    } catch (error) {
      console.error('Error writing comment:', error)
      throw error
    }
  }

  // function addCommentToPost(postID, commentID) {
  //     try {

  //     } catch (error) {
  //         console.error('Error adding comment to post:', error)
  //         throw error
  //     }
  // }

  // function loadCommentFeed(postID)
  return {
    writeComment
  }
}

export default useComments
