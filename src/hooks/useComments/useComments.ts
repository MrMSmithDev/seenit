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
  QueryDocumentSnapshot,
  DocumentReference,
  increment,
  setDoc
} from 'firebase/firestore'
import useAuth from '@hooks/useAuth'
import { CommentType, UserInteraction } from 'src/customTypes/types'

// function editComment
// function deleteComment

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
  const commentDB: CollectionReference = collection(firestoreDB, 'comments')
  const { user } = useAuth()

  async function writeComment(postID: string, commentBody: string): Promise<boolean> {
    const commentID: string = generateCommentID()

    try {
      await addDoc(commentDB, {
        postID,
        ID: commentID,
        timeStamp: serverTimestamp(),
        authorID: user?.uid,
        body: commentBody,
        score: 0,
        userInteractions: []
      })
      addCommentToPost(postID, commentID)
      return true
    } catch (error) {
      console.error('Error writing comment:', error)
    }
    return false
  }

  async function editComment(commentID: string, commentBody: string): Promise<boolean> {
    try {
      const commentQuery: Query = query(commentDB, where('ID', '==', commentID))
      const querySnapshot: QuerySnapshot = await getDocs(commentQuery)

      const commentDoc: QueryDocumentSnapshot = querySnapshot.docs[0]
      if (commentDoc.exists()) {
        await setDoc(
          commentDoc.ref,
          {
            body: commentBody
          },
          { merge: true }
        )
      }
      return true
    } catch (error) {
      console.error('Error editing comment:', error)
    }
    return false
  }

  async function loadCommentFeed(commentIDs: string[]): Promise<CommentType[]> {
    try {
      const commentPromises: Promise<CommentType | undefined>[] = commentIDs.map(async (id) => {
        const commentQuery: Query = query(commentDB, where('ID', '==', id))

        const querySnapshot: QuerySnapshot = await getDocs(commentQuery)
        const commentDoc: QueryDocumentSnapshot = querySnapshot.docs[0]

        if (commentDoc?.exists()) return commentDoc.data() as CommentType
        return undefined
      })

      const commentArr: Array<CommentType | undefined> = await Promise.all(commentPromises)
      return commentArr.filter((comment): comment is CommentType => comment !== undefined)
    } catch (error) {
      console.error('Error loading comments:', error)
      throw error
    }
  }

  async function loadUsersComments(userID: string): Promise<CommentType[]> {
    try {
      const commentsQuery: Query = query(commentDB, where('authorID', '==', userID), limit(20))

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

  async function updateUserInteractions(
    commentID: string,
    userID: string,
    newInteraction: number
  ): Promise<void> {
    try {
      const commentsQuery: Query = query(commentDB, where('ID', '==', commentID))
      const querySnapshot: QuerySnapshot = await getDocs(commentsQuery)

      const commentRef: DocumentReference = querySnapshot?.docs[0]?.ref
      const interactionData: UserInteraction[] = querySnapshot?.docs[0]?.data()?.userInteraction

      let hasFound = false

      // Map out array of interaction based on previous, changing user interaction of current uid
      // to updated data. If no user interaction already exists, initialize a new array and push
      // to that
      const updatedInteractionData: UserInteraction[] =
        interactionData?.map((interaction) => {
          const key = Object.keys(interaction)[0]
          if (key === userID) {
            hasFound = true
            return { [key]: newInteraction }
          } else {
            return interaction
          }
        }) || []
      if (!hasFound) {
        updatedInteractionData.push({ [userID]: newInteraction })
      }
      await updateDoc(commentRef, {
        userInteractions: updatedInteractionData
      })
    } catch (error) {
      console.error('Error updating comment points:', error)
      throw error
    }
  }

  async function incrementCommentScore(commentID: string, incrementAmount: number): Promise<void> {
    try {
      const querySnapshot: QuerySnapshot = await getDocs(
        query(commentDB, where('ID', '==', commentID))
      )

      const commentRef: DocumentReference = querySnapshot.docs[0].ref

      await updateDoc(commentRef, {
        score: increment(incrementAmount)
      })
    } catch (error) {
      console.error('Error incrementing favorite count:', error)
      throw error
    }
  }

  return {
    writeComment,
    editComment,

    loadCommentFeed,
    loadUsersComments,

    updateUserInteractions,
    incrementCommentScore
  }
}

export default useComments
