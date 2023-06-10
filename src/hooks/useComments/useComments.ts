/* eslint-disable no-console */
import {
  addDoc,
  arrayUnion,
  collection,
  limit,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  updateDoc,
  where,
  CollectionReference,
  Query,
  QuerySnapshot,
  Firestore,
  QueryDocumentSnapshot
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
    const postDB: CollectionReference = collection(getFirestore(), 'posts')
    const querySnapshot: QuerySnapshot = await getDocs(query(postDB, where('ID', '==', postID)))

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
  const firestoreDB: Firestore = getFirestore()
  const { user } = useAuth()

  async function writeComment(postID: string, commentBody: string): Promise<boolean> {
    const commentID: string = generateCommentID()

    try {
      const commentDB: CollectionReference = collection(firestoreDB, 'comments')
      await addDoc(commentDB, {
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
        const commentDB: CollectionReference = collection(firestoreDB, 'comments')
        const commentQuery: Query = query(commentDB, where('ID', '==', id))

        const querySnapshot: QuerySnapshot = await getDocs(commentQuery)
        const commentDoc: QueryDocumentSnapshot = querySnapshot.docs[0]

        if (commentDoc?.exists()) comments.push(commentDoc.data() as CommentType)
      })

      return comments
    } catch (error) {
      console.error('Error loading comments:', error)
      throw error
    }
  }

  async function loadUsersComments(userID: string): Promise<CommentType[]> {
    try {
      const commentsDB: CollectionReference = collection(firestoreDB, 'comments')
      const commentsQuery: Query = query(commentsDB, where('authorID', '==', userID), limit(20))

      const querySnapshot: QuerySnapshot = await getDocs(commentsQuery)
      const comments: CommentType[] = []

      querySnapshot.forEach((currentDoc: QueryDocumentSnapshot) => {
        const comment = currentDoc.data() as CommentType
        comments.push(comment)
      })
      return comments
    } catch (error) {
      console.error('Error loading users comments:', error)
      throw error
    }
  }

  // Comment points
  // async function loadCommentUserPoint(): Promise<boolean> {
  //   try {
  //     const userRef = doc(collection(getFirestore(), 'users'), user?.uid)
  //     const userDoc = await getDoc(userRef)

  //   } catch (error) {
  //     console.error('Error loading comment points:', error)
  //     throw error
  //   }
  // }

  return {
    writeComment,
    loadCommentFeed,

    loadUsersComments
  }
}

export default useComments
