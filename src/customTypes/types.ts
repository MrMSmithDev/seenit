export interface PostType {
  id: string
  timeStamp: string
  author: string
  title: string
  body: string
  edited?: boolean
  comments?: Array<Comment>
}

export interface Comment {
  id: string
  timeStamp: string
  author: string
  body: string
}

export type PostCollection = Array<PostType>
