import { Timestamp } from 'firebase/firestore'

export interface PostType {
  ID: string
  timeStamp: Timestamp
  authorID: string
  title: string
  body: string
  image?: File
  imageId?: string
  edited?: boolean
  comments?: Comment[]
}

export interface CommentType {
  id: string
  postID: string
  timeStamp: string
  author: string
  body: string
}

export interface UserType {
  uid: string
  displayName: string
  photoURL: string
  favorites?: string[]
}

export type PostCollection = PostType[]
