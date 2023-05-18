export interface PostType {
  ID: string
  timeStamp: string
  author: string
  title: string
  body: string
  image?: File
  imageId?: string
  edited?: boolean
  comments?: Array<Comment>
}

export interface Comment {
  id: string
  postID: string
  timeStamp: string
  author: string
  body: string
}

export type PostCollection = Array<PostType>
