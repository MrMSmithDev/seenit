import { Timestamp } from 'firebase/firestore'
import { OrderByDirection } from 'firebase/firestore'

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
  blurb: string
  favorites?: string[]
}

export type PostCollection = PostType[]

export interface UserInteraction {
  [id: string]: number
}

export interface CommentType {
  ID: string
  postID: string
  timeStamp: Timestamp
  authorID: string
  body: string
  score: number
  userInteractions: UserInteraction[]
}

export interface FilterQuery {
  attribute: string
  order: OrderByDirection
}
