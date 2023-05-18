/* eslint-disable no-console */
import { useEffect, useState } from 'react'
import { PostType } from 'src/customTypes/types'

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  QuerySnapshot,
  getDocs
} from 'firebase/firestore'

function generateID(): string {
  return Date.now().toString()
}

function useFirestore() {
  // Posts
  async function writePost(post: PostType) {
    const postID = generateID()

    try {
      await addDoc(collection(getFirestore(), 'posts'), {
        ID: postID,
        timeStamp: serverTimestamp(),
        author: post.author,
        title: post.title,
        body: post.body
      })

      if (post.image) {
        console.log('Add image here')
      }
    } catch (error) {
      console.error('Could not upload post:', error)
    }
  }

  async function loadPostFeed(): Promise<PostType[]> {
    const recentPostsQuery = query(
      collection(getFirestore(), 'posts'),
      orderBy('timestamp', 'desc'),
      limit(20)
    )

    try {
      const querySnapshot = await getDocs(recentPostsQuery)
      const posts: PostType[] = []

      querySnapshot.forEach((currentDoc) => {
        const post = currentDoc.data() as PostType
        posts.push(post)
      })
      return posts
    } catch (error) {
      console.error('Error loading posts:', error)
      throw error
    }
  }
  // function createPost
  // function editPost
  // function deletePost
  // function retrievePost (return as: ({post: post, comments: Array of [comments]}))
  // function retrieveFavorites
  // function retrieveComments

  return {
    writePost,
    loadPostFeed
  }
}

export default useFirestore
