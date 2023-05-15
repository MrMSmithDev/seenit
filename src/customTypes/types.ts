export interface PostType {
  id: string
  timeStamp: string
  author: string
  title: string
  body: string
  edited?: boolean
}

export type PostCollection = Array<PostType>
