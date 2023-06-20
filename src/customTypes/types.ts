import { Timestamp } from 'firebase/firestore'

export interface PostType {
  ID: string
  timeStamp?: Timestamp
  authorID: string
  title: string
  body: string
  image?: File
  imageId?: string
  edited?: boolean
  comments?: string[]
  favorites?: number
}

export interface UserType {
  uid: string
  displayName: string
  photoURL: string
  blurb?: string
  favorites?: string[]
}

export type PostCollection = PostType[]

interface UserInteraction {
  [key: string]: number
}

export interface CommentType {
  ID: string
  postID: string
  timeStamp: Timestamp
  authorID: string
  body: string
  userInteractions: UserInteraction[]
}
