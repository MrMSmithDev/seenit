/* eslint-disable no-console */
import {
  UserType,
  PostType,
  FilterQuery,
  ImageUploadData,
  ApiReturn,
  PostEdit
} from 'src/customTypes/types'
import resizeImage from '@utils/resizeImage'
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  setDoc,
  doc,
  serverTimestamp,
  getDoc,
  getDocs,
  updateDoc,
  where,
  getFirestore,
  increment,
  Firestore,
  DocumentReference,
  DocumentSnapshot,
  CollectionReference,
  QuerySnapshot,
  Query,
  QueryDocumentSnapshot
} from 'firebase/firestore'
import {
  ref,
  getStorage,
  StorageReference,
  uploadBytesResumable,
  getDownloadURL,
  UploadMetadata,
  deleteObject
} from 'firebase/storage'
import deletedPost from '@utils/placeholders/deletedPost'

function generateID(): string {
  return Date.now().toString()
}

function usePosts() {
  const firestoreDB: Firestore = getFirestore()
  //*******************//
  //****** Posts ******//
  //*******************//

  async function writeImage(
    image: File,
    postID: string,
    authorID: string
  ): Promise<ImageUploadData> {
    try {
      const filePath = `${authorID}/${postID}`
      const newImageRef: StorageReference = ref(getStorage(), filePath)
      const metaData: UploadMetadata = {
        contentType: 'image/jpeg'
      }
      const resizedImage = await resizeImage(image, 1080)
      await uploadBytesResumable(newImageRef, resizedImage, metaData)

      const imageURL: string = await getDownloadURL(newImageRef)
      return { publicUrl: imageURL, imageRef: newImageRef }
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  async function writePost(post: PostType): Promise<ApiReturn> {
    let imageData: ImageUploadData | null = null
    const postID = generateID()

    try {
      const postDB: CollectionReference = collection(firestoreDB, 'posts')
      if (post.image) {
        imageData = await writeImage(post.image, postID, post.authorID)
      }
      const result: DocumentReference = await addDoc(postDB, {
        ID: postID,
        timeStamp: serverTimestamp(),
        authorID: post.authorID,
        title: post.title,
        body: post.body,
        comments: 0,
        imageUrl: imageData?.publicUrl || null,
        favorites: 0
      })
      if (result) return { success: true, reference: result }
    } catch (error) {
      console.error(error)
      // If image has been uploaded, but post fails to upload, remove the
      // uploaded image
      if (imageData) {
        deleteObject(imageData.imageRef)
      }
    }
    return { success: false, reference: null, error: 'Error publishing post' }
  }

  async function editPost(editedPost: PostEdit): Promise<ApiReturn> {
    const postDB: CollectionReference = collection(firestoreDB, 'posts')

    try {
      const querySnapshot: QuerySnapshot = await getDocs(
        query(postDB, where('ID', '==', editedPost.ID))
      )
      const postDoc: QueryDocumentSnapshot = querySnapshot.docs[0]
      console.log(postDoc)
      if (postDoc.exists()) {
        await setDoc(
          postDoc.ref,
          {
            title: editedPost.title,
            body: editedPost.body,
            edited: true
          },
          { merge: true }
        )
        return { success: true, reference: postDoc.ref }
      }
    } catch (error) {
      console.log('Error editing post:', error)
    }
    return { success: false, reference: null, error: 'Error editing post' }
  }

  async function loadPostFeed(queryConstraints: FilterQuery): Promise<PostType[]> {
    try {
      const postDB: CollectionReference = collection(firestoreDB, 'posts')
      const postsQuery: Query = query(
        postDB,
        orderBy(queryConstraints.attribute, queryConstraints.order),
        limit(20)
      )

      const querySnapshot: QuerySnapshot = await getDocs(postsQuery)
      const posts: PostType[] = []

      querySnapshot.forEach((currentDoc: QueryDocumentSnapshot) => {
        const post = currentDoc.data() as PostType
        posts.push(post)
      })
      return posts
    } catch (error) {
      console.error('Error loading posts:', error)
    }
    return []
  }

  async function loadUserPostFeed(
    userID: string,
    queryConstraints: FilterQuery
  ): Promise<PostType[]> {
    try {
      const postDB: CollectionReference = collection(firestoreDB, 'posts')
      const postsQuery: Query = query(
        postDB,
        where('authorID', '==', userID),
        orderBy(queryConstraints.attribute, queryConstraints.order),
        limit(20)
      )

      const querySnapshot: QuerySnapshot = await getDocs(postsQuery)
      const posts: PostType[] = []

      querySnapshot.forEach((currentDoc: QueryDocumentSnapshot) => {
        const post = currentDoc.data() as PostType
        posts.push(post)
      })
      return posts
    } catch (error) {
      console.error('Error loading users posts:', error)
      throw error
    }
  }

  async function loadUserFavorites(
    userID: string,
    queryConstraints: FilterQuery
  ): Promise<PostType[]> {
    try {
      let userFavoriteIDs: string[] = []

      // Retrieve favorites list from user
      const userRef: DocumentReference = doc(collection(firestoreDB, 'users'), userID)
      const userDoc: DocumentSnapshot = await getDoc(userRef)
      if (userDoc.exists()) userFavoriteIDs = userDoc.data().favorites

      const postDB: CollectionReference = collection(firestoreDB, 'posts')
      const posts: PostType[] = []

      for (const favoriteID of userFavoriteIDs) {
        const postQuery: Query = query(postDB, where('ID', '==', favoriteID), limit(1))
        const querySnapshot: QuerySnapshot = await getDocs(postQuery)
        const postDocs: QueryDocumentSnapshot[] = querySnapshot.docs

        if (postDocs.length > 0) {
          const postDoc: QueryDocumentSnapshot = postDocs[0]
          posts.push(postDoc.data() as PostType)
        }
      }

      console.log(queryConstraints)
      // posts.sort((a: PostType, b: PostType) => {
      //   if (a[queryConstraints.attribute] < b[queryConstraints.attribute]) return -1
      //   if (a[queryConstraints.attribute] > b[queryConstraints.attribute]) return 1
      //   return 0
      // })

      return posts
    } catch (error) {
      console.error('Error loading users favorites:', error)
    }
    return []
  }

  async function loadCurrentPost(postID: string): Promise<PostType> {
    try {
      const postDB: CollectionReference = collection(firestoreDB, 'posts')
      const querySnapshot: QuerySnapshot = await getDocs(query(postDB, where('ID', '==', postID)))

      const postDoc: QueryDocumentSnapshot = querySnapshot.docs[0]
      return postDoc.data() as PostType
    } catch (error) {
      console.error('Error loading post:', error)
    }
    return deletedPost
  }

  async function setFavoriteStatus(userID: string, postID: string): Promise<void> {
    try {
      const userRef: DocumentReference = doc(collection(firestoreDB, 'users'), userID)
      const userDoc: DocumentSnapshot = await getDoc(userRef)
      const userFavoritesArr: string[] = userDoc.data()?.favorites

      if (userFavoritesArr.includes(postID)) {
        const IDIndex: number = userFavoritesArr.indexOf(postID)
        userFavoritesArr.splice(IDIndex, 1)
      } else {
        userFavoritesArr.push(postID)
      }

      await setDoc(
        userRef,
        {
          favorites: userFavoritesArr
        },
        { merge: true }
      )
    } catch (error) {
      console.error('Error changing favorite status:', error)
    }
  }

  async function checkFavoriteStatus(userID: string, postID: string): Promise<boolean> {
    try {
      const userRef: DocumentReference = doc(collection(firestoreDB, 'users'), userID)
      const userDoc: DocumentSnapshot = await getDoc(userRef)
      const userData = userDoc?.data() as UserType
      if (userData?.favorites?.includes(postID)) return true
    } catch (error) {
      console.error('Error checking favorites:', error)
    }
    return false
  }

  async function incrementFavoriteCount(postID: string, incrementAmount: number): Promise<void> {
    try {
      const postDB: CollectionReference = collection(firestoreDB, 'posts')
      const querySnapshot: QuerySnapshot = await getDocs(query(postDB, where('ID', '==', postID)))

      const postRef: DocumentReference = querySnapshot.docs[0].ref

      await updateDoc(postRef, {
        favorites: increment(incrementAmount)
      })
    } catch (error) {
      console.error('Error incrementing favorite count:', error)
    }
  }

  return {
    writePost,
    editPost,

    loadPostFeed,
    loadUserPostFeed,
    loadUserFavorites,
    loadCurrentPost,

    setFavoriteStatus,
    checkFavoriteStatus,
    incrementFavoriteCount
  }
}

export default usePosts
