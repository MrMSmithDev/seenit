import { StorageReference } from '@firebase/storage'
import { OrderByDirection, Timestamp } from 'firebase/firestore'

export interface PostType {
  ID: string
  timeStamp?: Timestamp
  authorID: string
  title: string
  body: string
  image?: File
  imageURL?: string
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
  image?: File | null
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

export interface ImageUploadData {
  publicUrl: string
  imageRef: StorageReference
}
