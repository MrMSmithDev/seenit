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

// function loadComments
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
  // function loadCommentFeed(postID)
  return {
    writeComment
  }
}

export default useComments
