export interface PostType {
  id: string
  dateTime: string
  author: string
  title: string
  body: string
}

export type PostCollection = Array<PostType>
