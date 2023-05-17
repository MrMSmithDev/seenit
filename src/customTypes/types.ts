export interface PostType {
  ID: string
  timeStamp: string
  author: string
  title: string
  body: string
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
